import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { 
  CreditCard, 
  ArrowLeft, 
  Check,
  Lock,
  Loader2,
  AlertCircle
} from 'lucide-react';

interface CardDetails {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}


const detectCardBrand = (num: string): string => {
  if (/^4/.test(num)) return 'visa';
  if (/^5[1-5]/.test(num)) return 'mastercard';
  if (/^3[47]/.test(num)) return 'amex';
  if (/^6(?:011|5)/.test(num)) return 'discover';
  return 'unknown';
};

const CardPaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const { user } = useAuth();

  const orderId = searchParams.get('order_id');

  const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [saveCard, setSaveCard] = useState(false);

  // Format card number with spaces (xxxx xxxx xxxx xxxx)
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  // Format expiry date (MM/YY)
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'cardNumber') {
      setCardDetails(prev => ({ ...prev, [name]: formatCardNumber(value) }));
    } else if (name === 'expiryDate') {
      setCardDetails(prev => ({ ...prev, [name]: formatExpiryDate(value) }));
    } else {
      setCardDetails(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateCard = (): boolean => {
    const { cardNumber, cardHolder, expiryDate, cvv } = cardDetails;

    if (cardNumber.replace(/\s/g, '').length < 16) {
      setError('Please enter a valid 16-digit card number');
      return false;
    }
    if (cardHolder.trim().length < 3) {
      setError('Please enter the card holder name');
      return false;
    }
    if (expiryDate.length < 5) {
      setError('Please enter a valid expiry date (MM/YY)');
      return false;
    }
    if (cvv.length < 3) {
      setError('Please enter a valid CVV');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateCard()) return;
    if (!orderId) {
      setError('Order ID is missing');
      return;
    }
    if (!user) {
      setError('Please login first');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const cleanNumber = cardDetails.cardNumber.replace(/\s/g, '');
      const lastFour = cleanNumber.slice(-4);
      const [expMonth, expYear] = cardDetails.expiryDate.split('/');

      // ========== DEBUG ==========
      console.log('=== DEBUG INFO ===');
      console.log('User ID:', user?.id);
      console.log('Order ID:', orderId);
      console.log('Last Four:', lastFour);
      console.log('===================');
      // ===========================

      // 1. Update order payment status
      const { error: orderError } = await supabase
        .from('orders')
        .update({
          payment_status: 'paid',
          payment_method: 'card',
          card_last_four: lastFour,
          paid_at: new Date().toISOString()
        })
        .eq('id', orderId)
        .eq('user_id', user.id);

      if (orderError) {
        console.error('Order update error:', orderError);
        throw orderError;
      }

      // 2. Save card if checkbox is checked
      if (saveCard) {
        const brand = detectCardBrand(cleanNumber);
        
        const cardData = {
          user_id: user.id,
          card_number: cleanNumber,
          last_four: lastFour,
          expiry_month: expMonth,
          expiry_year: expYear,
          cardholder_name: cardDetails.cardHolder.toUpperCase(),
          brand: brand,
          created_at: new Date().toISOString()
        };

        console.log('Card data to save:', cardData);

        const { error: cardError } = await supabase
          .from('saved_cards')
          .insert(cardData);

        if (cardError) {
          console.error('Card save error:', cardError);
        }
      }

      clearCart();
      navigate('/payment-success?order_id=' + orderId);

    } catch (err: any) {
      console.error('Full error:', err);
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!orderId) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)'
      }}>
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '16px',
          textAlign: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <AlertCircle size={48} color="#c33" style={{ marginBottom: '16px' }} />
          <h2 style={{ color: '#3E2723', fontFamily: 'Poppins, sans-serif', marginBottom: '8px' }}>
            Invalid Order
          </h2>
          <p style={{ color: '#666', fontFamily: 'Poppins, sans-serif', marginBottom: '24px' }}>
            No order ID found. Please try again.
          </p>
          <button
            onClick={() => navigate('/checkout')}
            style={{
              padding: '12px 24px',
              background: '#fa6193',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontFamily: 'Poppins, sans-serif'
            }}
          >
            Go to Checkout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      padding: '40px 20px',
      background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)'
    }}>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>

        {/* Header */}
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
          <h1 style={{
            fontFamily: "'Sacramento', cursive",
            fontSize: '36px',
            color: '#fa6193',
            margin: 0
          }}>
            Card Payment
          </h1>
        </div>

        {/* Security Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '24px',
          padding: '16px',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
        }}>
          <Lock size={20} color="#4caf50" />
          <span style={{ color: '#666', fontSize: '13px', fontFamily: 'Poppins, sans-serif' }}>
            Your card details are encrypted and secure
          </span>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: '#fee',
            color: '#c33',
            padding: '16px',
            borderRadius: '12px',
            marginBottom: '20px',
            fontSize: '14px',
            fontFamily: 'Poppins, sans-serif',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        {/* Card Form */}
        <form onSubmit={handleSubmit} style={{
          background: 'white',
          borderRadius: '16px',
          padding: '28px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          {/* Card Number */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#3E2723',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              Card Number
            </label>
            <div style={{ position: 'relative' }}>
              <CreditCard 
                size={20} 
                color="#fa6193" 
                style={{ 
                  position: 'absolute', 
                  left: '14px', 
                  top: '50%', 
                  transform: 'translateY(-50%)' 
                }} 
              />
              <input
                type="text"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                style={{
                  width: '100%',
                  padding: '14px 14px 14px 44px',
                  border: '2px solid #fce4ec',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontFamily: 'Poppins, sans-serif',
                  outline: 'none',
                  transition: 'border-color 0.3s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#fa6193'}
                onBlur={(e) => e.target.style.borderColor = '#fce4ec'}
              />
            </div>
          </div>

          {/* Card Holder */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#3E2723',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              Card Holder Name
            </label>
            <input
              type="text"
              name="cardHolder"
              value={cardDetails.cardHolder}
              onChange={handleInputChange}
              placeholder="JOHN DOE"
              style={{
                width: '100%',
                padding: '14px',
                border: '2px solid #fce4ec',
                borderRadius: '10px',
                fontSize: '16px',
                fontFamily: 'Poppins, sans-serif',
                outline: 'none',
                transition: 'border-color 0.3s',
                textTransform: 'uppercase',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#fa6193'}
              onBlur={(e) => e.target.style.borderColor = '#fce4ec'}
            />
          </div>

          {/* Expiry & CVV */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
            <div style={{ flex: 1 }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#3E2723',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                Expiry Date
              </label>
              <input
                type="text"
                name="expiryDate"
                value={cardDetails.expiryDate}
                onChange={handleInputChange}
                placeholder="MM/YY"
                maxLength={5}
                style={{
                  width: '100%',
                  padding: '14px',
                  border: '2px solid #fce4ec',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontFamily: 'Poppins, sans-serif',
                  outline: 'none',
                  transition: 'border-color 0.3s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#fa6193'}
                onBlur={(e) => e.target.style.borderColor = '#fce4ec'}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#3E2723',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                CVV
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  maxLength={4}
                  style={{
                    width: '100%',
                    padding: '14px',
                    border: '2px solid #fce4ec',
                    borderRadius: '10px',
                    fontSize: '16px',
                    fontFamily: 'Poppins, sans-serif',
                    outline: 'none',
                    transition: 'border-color 0.3s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#fa6193'}
                  onBlur={(e) => e.target.style.borderColor = '#fce4ec'}
                />
              </div>
            </div>
          </div>

          {/* Save Card Checkbox */}
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '24px',
            cursor: 'pointer',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '14px',
            color: '#666'
          }}>
            <input
              type="checkbox"
              checked={saveCard}
              onChange={(e) => setSaveCard(e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: '#fa6193' }}
            />
            Save this card for future purchases
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '18px',
              background: loading ? '#ccc' : '#fa6193',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'Poppins, sans-serif',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              boxShadow: '0 4px 15px rgba(250, 97, 147, 0.3)'
            }}
          >
            {loading ? (
              <>
                <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                Processing...
              </>
            ) : (
              <>
                Pay Now
                <Check size={20} />
              </>
            )}
          </button>
        </form>

        {/* Order ID */}
        <div style={{
          marginTop: '20px',
          textAlign: 'center',
          color: '#999',
          fontSize: '12px',
          fontFamily: 'Poppins, sans-serif'
        }}>
          Order #{orderId}
        </div>
      </div>
    </div>
  );
};

export default CardPaymentPage;