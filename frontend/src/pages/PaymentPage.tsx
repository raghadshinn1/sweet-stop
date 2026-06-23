import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { 
  CreditCard, 
  Banknote, 
  ArrowLeft, 
  Check, 
  Truck,
  Clock,
  Loader2
} from 'lucide-react';

type PaymentMethod = 'cash' | 'card';

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, totalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const tax = totalPrice * 0.05;
  const finalTotal = totalPrice + tax;

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      setError('');

      if (!user) {
        setError('Please login first');
        return;
      }

      // Create order in Supabase directly
      const orderData = {
        user_id: user.id,
        items: cartItems.map(item => ({
          product: item.id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
          category: item.category || 'general'
        })),
        shipping_address: {
          street: user?.address?.street || '',
          city: user?.address?.city || '',
          province: user?.address?.province || '',
          postalCode: user?.address?.postalCode || '',
          phone: user?.phone || ''
        },
        payment_method: paymentMethod,
        payment_status: 'pending',
        total_amount: finalTotal,
        subtotal: totalPrice,
        tax: tax,
        created_at: new Date().toISOString()
      };

      const { data, error: insertError } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        

      if (insertError) throw insertError;

      const orderId = data?.[0]?.id;

      if (paymentMethod === 'card') {
        navigate('/stripe-payment?order_id=' + orderId);
        return;
      }

      // Cash on Pick Up - go directly to success
      clearCart();
      navigate('/payment-success?order_id=' + orderId);

    } catch (err: any) {
      setError(err.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      padding: '40px 20px',
      background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)'
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <button 
            onClick={() => navigate('/checkout')}
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
            Payment
          </h1>
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
            fontFamily: 'Poppins, sans-serif'
          }}>
            {error}
          </div>
        )}

        {/* Order Summary */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ 
            fontFamily: 'Poppins, sans-serif', 
            color: '#3E2723', 
            marginBottom: '20px',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Truck size={20} color="#fa6193" />
            Order Summary
          </h2>

          {cartItems.map(item => (
            <div key={item.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px 0',
              borderBottom: '1px solid #fce4ec'
            }}>
              <span style={{ color: '#5D4037', fontFamily: 'Poppins, sans-serif' }}>
                {item.name} x{item.quantity}
              </span>
              <span style={{ fontWeight: 'bold', color: '#3E2723' }}>
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}

          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '2px solid #fce4ec' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#666' }}>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#666' }}>Tax (5%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginTop: '12px',
              paddingTop: '12px',
              borderTop: '2px solid #fa6193',
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#fa6193'
            }}>
              <span>Total:</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ 
            fontFamily: 'Poppins, sans-serif', 
            color: '#3E2723', 
            marginBottom: '20px',
            fontSize: '18px'
          }}>
            Choose Payment Method
          </h2>

          {/* Cash Option */}
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '20px',
            borderRadius: '12px',
            border: paymentMethod === 'cash' ? '2px solid #fa6193' : '2px solid #fce4ec',
            background: paymentMethod === 'cash' ? '#fff5f8' : 'white',
            cursor: 'pointer',
            marginBottom: '12px',
            transition: 'all 0.3s'
          }}>
            <input
              type="radio"
              name="payment"
              value="cash"
              checked={paymentMethod === 'cash'}
              onChange={() => setPaymentMethod('cash')}
              style={{ width: '20px', height: '20px', accentColor: '#fa6193' }}
            />
            <div style={{
              width: '48px', height: '48px', borderRadius: '12px',
              background: paymentMethod === 'cash' ? '#fa6193' : '#fce4ec',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Banknote size={24} color={paymentMethod === 'cash' ? 'white' : '#fa6193'} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0, color: '#3E2723', fontFamily: 'Poppins, sans-serif', fontSize: '16px' }}>
                Cash on Pick Up
              </h3>
              <p style={{ margin: '4px 0 0', color: '#666', fontSize: '13px', fontFamily: 'Poppins, sans-serif' }}>
                Pay when you pick up your order
              </p>
            </div>
            {paymentMethod === 'cash' && <Check size={24} color="#fa6193" />}
          </label>

          {/* Card Option */}
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '20px',
            borderRadius: '12px',
            border: paymentMethod === 'card' ? '2px solid #fa6193' : '2px solid #fce4ec',
            background: paymentMethod === 'card' ? '#fff5f8' : 'white',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}>
            <input
              type="radio"
              name="payment"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={() => setPaymentMethod('card')}
              style={{ width: '20px', height: '20px', accentColor: '#fa6193' }}
            />
            <div style={{
              width: '48px', height: '48px', borderRadius: '12px',
              background: paymentMethod === 'card' ? '#fa6193' : '#fce4ec',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <CreditCard size={24} color={paymentMethod === 'card' ? 'white' : '#fa6193'} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0, color: '#3E2723', fontFamily: 'Poppins, sans-serif', fontSize: '16px' }}>
                Credit / Debit Card
              </h3>
              <p style={{ margin: '4px 0 0', color: '#666', fontSize: '13px', fontFamily: 'Poppins, sans-serif' }}>
                Use saved card or add new one
              </p>
            </div>
            {paymentMethod === 'card' && <Check size={24} color="#fa6193" />}
          </label>
        </div>

        {/* Place Order Button */}
        <button
          onClick={handlePlaceOrder}
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
          ) : paymentMethod === 'cash' ? (
            <>
              Place Order - Cash on Pick Up
              <Check size={20} />
            </>
          ) : (
            <>
              Proceed to Card Payment
              <CreditCard size={20} />
            </>
          )}
        </button>

        {/* Pickup Info */}
        <div style={{
          marginTop: '20px',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          color: '#666',
          fontSize: '13px',
          fontFamily: 'Poppins, sans-serif'
        }}>
          <Clock size={16} />
          {paymentMethod === 'cash' 
            ? 'Thank you for your order! We\'re excited to prepare it for you 🍓'
            : 'You will be redirected to select your saved card'
          }
        </div>
        
      </div>
    </div>
  );
};

export default PaymentPage;