import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { ArrowRight, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react'

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { cartItems, totalPrice, updateQuantity, removeFromCart } = useCart()

  const handleProceedToPayment = () => {
    if (!user) {
      navigate('/login', { 
        state: { 
          from: '/checkout',
          message: 'Please login to complete your order' 
        } 
      })
    } else {
      navigate('/payment')
    }
  }

  if (cartItems.length === 0) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)',
        gap: '20px'
      }}>
        <ShoppingBag size={64} color="#fa6193" />
        <h2 style={{ color: '#5D4037', fontFamily: 'Poppins, sans-serif' }}>
          Your cart is empty
        </h2>
        <button
          onClick={() => navigate('/menu')}
          style={{
            padding: '14px 32px',
            background: '#fa6193',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontFamily: 'Poppins, sans-serif'
          }}
        >
          Browse Menu
        </button>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      padding: '40px 20px',
      background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{
          fontFamily: "'Sacramento', cursive",
          fontSize: '42px',
          color: '#fa6193',
          marginBottom: '32px',
          textAlign: 'center'
        }}>
          Your Cart
        </h1>

        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          {cartItems.map(item => (
            <div key={item.id} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '16px 0',
              borderBottom: '1px solid #fce4ec'
            }}>
              <img 
                src={item.image || '/placeholder-product.png'} 
                alt={item.name}
                style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }}
              />
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0, color: '#3E2723', fontFamily: 'Poppins, sans-serif', fontSize: '16px' }}>
                  {item.name}
                </h3>
                <p style={{ margin: '4px 0', color: '#fa6193', fontWeight: 'bold' }}>
                  ${item.price.toFixed(2)}
                </p>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  style={{
                    width: '32px', height: '32px', borderRadius: '8px',
                    border: '2px solid #fce4ec', background: 'white',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                >
                  <Minus size={16} color="#fa6193" />
                </button>
                <span style={{ fontWeight: 'bold', minWidth: '24px', textAlign: 'center' }}>
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  style={{
                    width: '32px', height: '32px', borderRadius: '8px',
                    border: '2px solid #fce4ec', background: 'white',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                >
                  <Plus size={16} color="#fa6193" />
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer', color: '#e74c3c'
                }}
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ 
            fontFamily: 'Poppins, sans-serif', 
            color: '#3E2723', 
            marginBottom: '20px',
            fontSize: '20px'
          }}>
            Order Summary
          </h2>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ color: '#666' }}>Subtotal</span>
            <span style={{ fontWeight: 'bold' }}>${totalPrice.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ color: '#666' }}>Tax (5%)</span>
            <span style={{ fontWeight: 'bold' }}>${(totalPrice * 0.05).toFixed(2)}</span>
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: '2px solid #fce4ec',
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#fa6193'
          }}>
            <span>Total:</span>
            <span>${(totalPrice * 1.05).toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={handleProceedToPayment}
          style={{
            width: '100%',
            padding: '18px',
            background: '#fa6193',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontFamily: 'Poppins, sans-serif',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            boxShadow: '0 4px 15px rgba(250, 97, 147, 0.3)'
          }}
        >
          Proceed to Payment
          <ArrowRight size={22} />
        </button>

        {!user && (
          <p style={{
            textAlign: 'center',
            marginTop: '12px',
            color: '#666',
            fontSize: '14px',
            fontFamily: 'Poppins, sans-serif'
          }}>
            You'll be asked to login before payment
          </p>
        )}
      </div>
    </div>
  )
}

export default CheckoutPage