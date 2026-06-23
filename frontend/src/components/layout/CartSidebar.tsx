import React from 'react'
import { useNavigate } from 'react-router-dom' 
import { X, Plus, Minus, Trash2, ShoppingCart } from 'lucide-react'
import { useCart } from '../../contexts/CartContext'

const CartSidebar: React.FC = () => {
  const navigate = useNavigate()
  const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice, loading } = useCart()

  if (!isCartOpen) return null

  const handleCheckout = () => {
    setIsCartOpen(false)
    navigate('/checkout')
  }

  return (
    <>
      <div
        onClick={() => setIsCartOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.4)',
          zIndex: 200,
          backdropFilter: 'blur(4px)'
        }}
      />
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '100%',
        maxWidth: '420px',
        height: '100vh',
        background: 'white',
        zIndex: 201,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-4px 0 20px rgba(0,0,0,0.1)',
        animation: 'slideInCart 0.3s ease'
      }}>
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h2 style={{
            fontSize: '22px',
            fontWeight: 700,
            color: '#3E2723',
            fontFamily: 'Poppins, sans-serif',
            margin: 0
          }}>
            Your Cart ({cartItems.length})
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666'
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{
            padding: '20px',
            textAlign: 'center',
            color: '#fa6193',
            fontFamily: 'Poppins, sans-serif'
          }}>
            Updating cart...
          </div>
        )}

        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          {cartItems.length === 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              gap: '16px',
              color: '#999'
            }}>
              <ShoppingCart size={48} strokeWidth={1.5} />
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px' }}>
                Your cart is empty
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cartItems.map((item) => (
                <div key={item.id} style={{
                  display: 'flex',
                  gap: '14px',
                  padding: '14px',
                  background: '#FFF5F7',
                  borderRadius: '16px',
                  alignItems: 'center'
                }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '70px',
                      height: '70px',
                      objectFit: 'contain',
                      borderRadius: '12px',
                      background: 'white'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <h4 style={{
                      fontSize: '15px',
                      fontWeight: 600,
                      color: '#3E2723',
                      fontFamily: 'Poppins, sans-serif',
                      margin: '0 0 4px 0'
                    }}>
                      {item.name}
                    </h4>
                    <p style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#f05584',
                      fontFamily: 'Poppins, sans-serif',
                      margin: 0
                    }}>
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={loading}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        border: '1px solid #f05584',
                        background: 'white',
                        color: '#f05584',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: loading ? 0.5 : 1
                      }}
                    >
                      <Minus size={14} />
                    </button>
                    <span style={{
                      fontSize: '15px',
                      fontWeight: 600,
                      fontFamily: 'Poppins, sans-serif',
                      minWidth: '24px',
                      textAlign: 'center'
                    }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      disabled={loading}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        border: '1px solid #f05584',
                        background: '#f05584',
                        color: 'white',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: loading ? 0.5 : 1
                      }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    disabled={loading}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#999',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      padding: '4px',
                      opacity: loading ? 0.5 : 1
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div style={{
            padding: '20px 24px',
            borderTop: '1px solid #f0f0f0',
            background: '#fafafa'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '16px'
            }}>
              <span style={{
                fontSize: '16px',
                color: '#666',
                fontFamily: 'Poppins, sans-serif'
              }}>
                Subtotal
              </span>
              <span style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#3E2723',
                fontFamily: 'Poppins, sans-serif'
              }}>
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            
            <button 
              onClick={handleCheckout}
              disabled={loading}
              style={{
                width: '100%',
                background: loading ? '#ccc' : '#f05584',
                color: 'white',
                border: 'none',
                padding: '16px',
                borderRadius: '30px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'Poppins, sans-serif',
                transition: 'all 0.3s',
                boxShadow: '0 4px 15px rgba(240, 85, 132, 0.3)'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = '#e05582'
                  e.currentTarget.style.transform = 'scale(1.02)'
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = '#f05584'
                  e.currentTarget.style.transform = 'scale(1)'
                }
              }}
            >
              {loading ? 'Updating...' : `Checkout — $${totalPrice.toFixed(2)}`}
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideInCart {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  )
}

export default CartSidebar