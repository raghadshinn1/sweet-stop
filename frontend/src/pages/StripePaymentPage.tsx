import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useAuth } from '../contexts/AuthContext';
import { useStripePayment, PaymentIntentResponse } from '../hooks/useStripePayment';
import { supabase } from '../lib/supabase';
import StripeCardForm from '../components/StripeCardForm';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY, {
  locale: 'en'
});

const StripePaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading: authLoading } = useAuth();
  const { createPaymentIntent, loading: intentLoading, error: intentError } = useStripePayment();

  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState('');
  const [orderData, setOrderData] = useState<any>(null);

  const orderId = new URLSearchParams(location.search).get('order_id');

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      navigate('/login', { state: { from: `/stripe-payment?order_id=${orderId}` } });
      return;
    }

    if (!orderId) {
      setError('No order found');
      return;
    }

    const initPayment = async () => {
      try {
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .eq('user_id', user.id)
          .single();

        if (orderError || !order) {
          throw new Error('Order not found');
        }

        setOrderData(order);

        const items = order.items || [];
        const subtotal = order.subtotal ?? items.reduce(
          (sum: number, item: any) => sum + ((item.price ?? 0) * (item.quantity ?? 1)), 0
        );
        const totalAmount = order.total_amount ?? (subtotal * 1.05);
        const amountInCents = Math.round(totalAmount * 100);

        const result: PaymentIntentResponse | null = await createPaymentIntent(amountInCents, orderId, {
          customer_email: user.email || '',
          customer_name: (user as any).user_metadata?.full_name || user.email?.split('@')[0] || '',
        });

        if (!result || !result.clientSecret) {
          throw new Error('Failed to initialize payment');
        }

        setClientSecret(result.clientSecret);

      } catch (err: any) {
        setError(err.message);
      }
    };

    initPayment();
  }, [orderId, user, authLoading, navigate, createPaymentIntent]);

  const handlePaymentSuccess = async (piId: string) => {
    try {
      const { error: updateError } = await supabase
        .from('orders')
        .update({
          payment_status: 'paid',
          stripe_payment_intent_id: piId,
          paid_at: new Date().toISOString(),
        })
        .eq('id', orderId);

      if (updateError) throw updateError;

      // ✅ 2. جيب بيانات الطلب كاملة
      const { data: order } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();

      // ✅ 3. جيب cart_items
      const { data: cartItems } = await supabase
        .from('cart_items')
        .select('*')
        .eq('order_id', orderId);

      // ✅ 4. بعث لـ Square
      if (order) {
        try {
          await fetch(
            `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-to-square`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
              },
              body: JSON.stringify({
                ...order,
                items: cartItems && cartItems.length > 0 ? cartItems : (order.items || []),
              }),
            }
          );
        } catch (squareErr) {
          console.error('Square error (non-fatal):', squareErr);
        }
      }

      navigate('/payment-success?order_id=' + orderId);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handlePaymentError = (message: string) => {
    setError(message);
  };

  if (authLoading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)',
        flexDirection: 'column', gap: '16px'
      }}>
        <Loader2 size={40} color="#fa6193" style={{ animation: 'spin 1s linear infinite' }} />
        <p style={{ color: '#5D4037', fontFamily: 'Poppins, sans-serif', fontSize: '16px' }}>Loading...</p>
      </div>
    );
  }

  if (error || intentError) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)',
        padding: '20px'
      }}>
        <div style={{
          background: 'white', borderRadius: '16px', padding: '40px',
          maxWidth: '500px', width: '100%', textAlign: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <AlertCircle size={48} color="#e74c3c" style={{ marginBottom: '16px' }} />
          <h2 style={{ fontFamily: 'Poppins, sans-serif', color: '#3E2723', marginBottom: '8px' }}>Payment Error</h2>
          <p style={{ color: '#666', fontFamily: 'Poppins, sans-serif', marginBottom: '24px' }}>{error || intentError}</p>
          <button
            onClick={() => navigate('/payment')}
            style={{
              padding: '14px 32px', background: '#fa6193', color: 'white',
              border: 'none', borderRadius: '12px', fontSize: '16px',
              fontWeight: 'bold', cursor: 'pointer', fontFamily: 'Poppins, sans-serif'
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (intentLoading || !clientSecret) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)',
        flexDirection: 'column', gap: '16px'
      }}>
        <Loader2 size={40} color="#fa6193" style={{ animation: 'spin 1s linear infinite' }} />
        <p style={{ color: '#5D4037', fontFamily: 'Poppins, sans-serif', fontSize: '16px' }}>
          Preparing your secure payment...
        </p>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh', padding: '40px 20px',
      background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)'
    }}>
      <div style={{ maxWidth: '560px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <button
            onClick={() => navigate('/payment')}
            style={{
              background: 'white', border: 'none', borderRadius: '50%',
              width: '40px', height: '40px', display: 'flex', alignItems: 'center',
              justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <ArrowLeft size={20} color="#fa6193" />
          </button>
          <h1 style={{ fontFamily: "'Sacramento', cursive", fontSize: '36px', color: '#fa6193', margin: 0 }}>
            Secure Payment
          </h1>
        </div>

        <div style={{ background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                theme: 'stripe',
                variables: {
                  colorPrimary: '#fa6193',
                  colorBackground: '#ffffff',
                  colorText: '#3E2723',
                  colorDanger: '#e74c3c',
                  borderRadius: '12px',
                  fontFamily: 'Poppins, sans-serif',
                },
              },
            }}
          >
            <StripeCardForm
              amount={Math.round(orderData?.total_amount * 100) || 0}
              orderId={orderId!}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default StripePaymentPage;