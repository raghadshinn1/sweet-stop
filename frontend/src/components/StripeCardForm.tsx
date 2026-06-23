import React, { useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Lock, Loader2, ShieldCheck } from 'lucide-react';

interface StripeCardFormProps {
  amount: number;
  orderId: string;
  onSuccess: (paymentIntentId: string) => void;
  onError: (message: string) => void;
}

const StripeCardForm: React.FC<StripeCardFormProps> = ({ amount, orderId, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setMessage('');

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success?order_id=${orderId}`,
      },
      redirect: 'if_required',
    });

    if (error) {
      setMessage(error.message || 'Payment failed');
      onError(error.message || 'Payment failed');
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      onSuccess(paymentIntent.id);
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 16px',
        background: '#f0fdf4',
        borderRadius: '12px',
        marginBottom: '20px',
        border: '1px solid #bbf7d0'
      }}>
        <ShieldCheck size={20} color="#16a34a" />
        <span style={{ fontSize: '13px', color: '#166534', fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
          Your payment is secured with 256-bit SSL encryption
        </span>
      </div>

      <div style={{
        background: '#fff5f8',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '24px',
        textAlign: 'center',
        border: '2px solid #fce4ec'
      }}>
        <span style={{ fontSize: '14px', color: '#666', fontFamily: 'Poppins, sans-serif' }}>
          Amount to Pay
        </span>
        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#fa6193', fontFamily: 'Poppins, sans-serif' }}>
          ${(amount / 100).toFixed(2)} <span style={{ fontSize: '16px', color: '#666' }}>CAD</span>
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label style={{
          display: 'block',
          marginBottom: '12px',
          color: '#5D4037',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '14px',
          fontWeight: 500
        }}>
          Card Information
        </label>
        <div style={{
          padding: '16px',
          borderRadius: '12px',
          border: '2px solid #fce4ec',
          background: 'white'
        }}>
          <PaymentElement options={{ layout: 'tabs' }} />
        </div>
      </div>

      {message && (
        <div style={{
          background: '#fee',
          color: '#c33',
          padding: '12px 16px',
          borderRadius: '12px',
          marginBottom: '16px',
          fontSize: '14px',
          fontFamily: 'Poppins, sans-serif'
        }}>
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        style={{
          width: '100%',
          padding: '18px',
          background: !stripe || isProcessing ? '#ccc' : '#fa6193',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          fontSize: '18px',
          fontWeight: 'bold',
          cursor: !stripe || isProcessing ? 'not-allowed' : 'pointer',
          fontFamily: 'Poppins, sans-serif',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          boxShadow: '0 4px 15px rgba(250, 97, 147, 0.3)',
          transition: 'all 0.3s'
        }}
      >
        {isProcessing ? (
          <>
            <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
            Processing Payment...
          </>
        ) : (
          <>
            <Lock size={20} />
            Pay ${(amount / 100).toFixed(2)} CAD
          </>
        )}
      </button>
    </form>
  );
};

export default StripeCardForm;