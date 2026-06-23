import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
}

export const useStripePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPaymentIntent = useCallback(async (
    amount: number,
    orderId: string,
    metadata?: Record<string, string>
  ): Promise<PaymentIntentResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Please login first');
      }
      console.log('Sending to function:', { amount, currency: 'cad', order_id: orderId, metadata });
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-payment-intent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
            'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
          },
          body: JSON.stringify({
            amount,
            currency: 'cad',
            order_id: orderId,
            metadata,
          }),
        }
      );

      const result = await response.json();
      console.log('Function response:', result); 

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create payment intent');
      }

      return {
        clientSecret: result.clientSecret,
        paymentIntentId: result.paymentIntentId,
      };

    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createPaymentIntent, loading, error };
};