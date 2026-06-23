import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Check, ArrowRight, Package } from 'lucide-react';

const PaymentSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  const orderId = searchParams.get('order_id');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const sentToSquareRef = useRef(false);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId || !user) return;

      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (orderError) {
        console.error('Order fetch error:', orderError);
        setLoading(false);
        return;
      }

      if (!orderData) {
        console.warn('Order not found yet, retrying in 2s...');
        setTimeout(() => fetchOrder(), 2000);
        return;
      }

      const fullOrder = {
        ...orderData,
        items: orderData.items || [],
      };

      setOrder(fullOrder);

      if (orderData.payment_status !== 'sent_to_square' && !sentToSquareRef.current) {
        sentToSquareRef.current = true;
        try {
          const res = await fetch(
            `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-to-square`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
              },
              body: JSON.stringify(fullOrder),
            }
          );
          console.log('Square response status:', res.status);
          const resBody = await res.json();
          console.log('Square response body:', resBody);
        } catch (squareErr) {
          console.error('Send to Square error:', squareErr);
        }
      }

      setLoading(false);
    };

    fetchOrder();
  }, [orderId, user]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)' }}>
        <div style={{ color: '#fa6193', fontFamily: 'Poppins' }}>Loading...</div>
      </div>
    );
  }

  const items = order?.items || [];
  const subtotal = items.reduce((sum: number, item: any) => sum + ((item.price ?? 0) * (item.quantity ?? item.qty ?? 1)), 0);
  const tax = subtotal > 0 ? subtotal * 0.05 : 0;
  const total = order?.total_amount || (subtotal + tax);

  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px', background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>

        <div style={{
          width: '100px', height: '100px', borderRadius: '50%',
          background: '#4caf50', display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px', boxShadow: '0 8px 30px rgba(76, 175, 80, 0.3)'
        }}>
          <Check size={48} color="white" />
        </div>

        <h1 style={{ fontFamily: "'Sacramento', cursive", fontSize: '42px', color: '#fa6193', marginBottom: '8px' }}>
          Thank You!
        </h1>
        <p style={{ color: '#666', fontFamily: 'Poppins, sans-serif', marginBottom: '32px' }}>
          Your order has been placed successfully.
        </p>

        <div style={{
          background: 'white', borderRadius: '16px', padding: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)', textAlign: 'left', marginBottom: '24px'
        }}>
          <h3 style={{ color: '#3E2723', fontFamily: 'Poppins, sans-serif', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Package size={20} color="#fa6193" />
            Order #{order?.order_number ?? orderId?.slice(0, 8)}
          </h3>

          {items.map((item: any, idx: number) => (
            <div key={idx} style={{
              display: 'flex', justifyContent: 'space-between', padding: '10px 0',
              borderBottom: '1px solid #fce4ec'
            }}>
              <span style={{ color: '#5D4037', fontFamily: 'Poppins, sans-serif' }}>
                {item.name} x{item.quantity ?? item.qty ?? 1}
              </span>
              <span style={{ fontWeight: 'bold', color: '#3E2723' }}>
                ${((item.price ?? 0) * (item.quantity ?? item.qty ?? 1)).toFixed(2)}
              </span>
            </div>
          ))}

          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '2px solid #fce4ec' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#666' }}>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#666' }}>Tax (5%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div style={{
              display: 'flex', justifyContent: 'space-between', marginTop: '12px',
              paddingTop: '12px', borderTop: '2px solid #fa6193',
              fontSize: '20px', fontWeight: 'bold', color: '#fa6193'
            }}>
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #fce4ec' }}>
            <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
              Payment: <strong style={{ color: '#3E2723' }}>
                Credit Card
              </strong>
            </p>
            {order?.card_last_four && (
              <p style={{ color: '#666', fontSize: '14px', margin: '4px 0 0' }}>
                Card: •••• {order.card_last_four}
              </p>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={() => navigate('/menu')}
            style={{
              padding: '14px 28px', background: '#fa6193', color: 'white',
              border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold',
              cursor: 'pointer', fontFamily: 'Poppins, sans-serif', display: 'flex',
              alignItems: 'center', gap: '8px'
            }}
          >
            Order More <ArrowRight size={18} />
          </button>
          <button
            onClick={() => navigate('/orders')}
            style={{
              padding: '14px 28px', background: 'white', color: '#fa6193',
              border: '2px solid #fa6193', borderRadius: '12px', fontSize: '16px',
              fontWeight: 'bold', cursor: 'pointer', fontFamily: 'Poppins, sans-serif'
            }}
          >
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;