import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { 
  CreditCard, 
  ArrowLeft, 
  Truck,
  Clock,
} from 'lucide-react';

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const { } = useAuth();
  const { cartItems, totalPrice } = useCart();
  const [error] = useState('');

  const tax = totalPrice * 0.05;
  const finalTotal = totalPrice + tax;

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

        {/* Notice */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          textAlign: 'center',
          color: '#5D4037',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '15px'
        }}>
          🛠️ Online payment is temporarily unavailable. Please contact us to place your order.
        </div>

        {/* Disabled Button */}
        <button
          disabled={true}
          style={{
            width: '100%',
            padding: '18px',
            background: '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'not-allowed',
            fontFamily: 'Poppins, sans-serif',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
          }}
        >
          Online Payment Temporarily Unavailable
          <CreditCard size={20} />
        </button>

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
          We apologize for the inconvenience
        </div>
        
      </div>
    </div>
  );
};

export default PaymentPage;