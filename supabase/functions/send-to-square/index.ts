import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const order = await req.json();
    console.log("Received order:", JSON.stringify(order));

    if (!order.id) {
      return new Response(JSON.stringify({ error: "No order id" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const items = Array.isArray(order.items) ? order.items : [];

    if (items.length === 0) {
      console.warn("Order has no items, skipping Square request");
      return new Response(JSON.stringify({ error: "Order has no items" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const squareApiUrl = Deno.env.get("SQUARE_API_URL") ?? "https://connect.squareup.com";
    const accessToken = Deno.env.get("SQUARE_ACCESS_TOKEN");
    const locationId = Deno.env.get("SQUARE_LOCATION_ID");

    if (!accessToken || !locationId) {
      console.error("Missing Square credentials");
      return new Response(JSON.stringify({ error: "Missing Square credentials" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const subtotal = order.subtotal ?? items.reduce(
      (sum: number, item: any) => sum + ((item.price ?? 0) * (item.quantity ?? item.qty ?? 1)), 0
    );
    const tax = order.tax ?? (subtotal > 0 ? subtotal * 0.05 : 0);

    const squareBody: any = {
      order: {
        location_id: locationId,
        reference_id: order.order_number ?? order.id,
        line_items: items.map((item: any) => {
          const category = item.category ?? item.category_name ?? "";
          const baseName = item.name ?? item.title ?? "Item";
          const fullName = category ? `${category} - ${baseName}` : baseName;

          return {
            name: fullName,
            quantity: String(item.quantity ?? item.qty ?? 1),
            base_price_money: {
              amount: Math.round((item.price ?? 0) * 100),
              currency: "CAD",
            },
            note: item.notes ?? "",
          };
        }),
        fulfillments: [{
          type: "PICKUP",
          state: "PROPOSED",
          pickup_details: {
            note: [
              `Order #${order.order_number ?? order.id}`,
              `Payment: Card`,
              order.shipping_address?.notes ?? "",
            ].filter(Boolean).join(" | "),
            pickup_at: new Date(Date.now() + 15 * 60000).toISOString(),
          },
        }],
        taxes: (tax > 0 && subtotal > 0) ? [{
          name: "Tax",
          percentage: String(Math.round((tax / subtotal) * 100)),
          scope: "ORDER",
        }] : [],
      },
      idempotency_key: `order-${order.id}`,
    };

    console.log("Sending to Square:", JSON.stringify(squareBody));

    const squareRes = await fetch(`${squareApiUrl}/v2/orders`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "Square-Version": "2024-01-17",
      },
      body: JSON.stringify(squareBody),
    });

    const squareData = await squareRes.json();
    console.log("Square order response:", JSON.stringify(squareData));

    if (!squareRes.ok) {
      console.error("Square order error:", squareData);
      return new Response(JSON.stringify({ error: squareData }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const squareOrderId = squareData.order?.id;

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    await supabase
      .from("orders")
      .update({ payment_status: "sent_to_square" })
      .eq("id", order.id);

    return new Response(
      JSON.stringify({ success: true, squareOrderId }),
      { headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});