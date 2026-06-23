import React, { useState, useEffect } from 'react'
import { Package, ArrowLeft, Clock, CheckCircle, CreditCard, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

interface OrderItem {
  name: string
  quantity: number
  price: number
  image?: string
}

interface Order {
  id: string
  items: OrderItem[]
  total_amount: number
  payment_status: string
  payment_method: string
  status: string
  created_at: string
  shipping_address: any
  card_last_four?: string
}

const Orders: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [user])

  const fetchOrders = async () => {
    if (!user) {
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      const formatted = (data || []).map((order: any) => ({
        id: order.id,
        items: order.items || [],
        total_amount: order.total_amount || order.subtotal || 0,
        payment_status: order.payment_status || 'pending',
        payment_method: order.payment_method || 'cash',
        status: order.payment_status === 'paid' ? 'paid' : 'pending',
        created_at: order.created_at,
        shipping_address: order.shipping_address || {},
        card_last_four: order.card_last_four
      }))

      setOrders(formatted)
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const getPaymentIcon = () => {
  return <CreditCard size={14} color="#fa6193" />
}

  const getStatusBadge = (status: string) => {
    if (status === 'paid') {
      return (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '6px 14px', background: 'rgba(76, 175, 80, 0.12)',
          borderRadius: '50px', border: '1.5px solid rgba(76, 175, 80, 0.3)'
        }}>
          <CheckCircle size={14} color="#4CAF50" />
          <span style={{ color: '#4CAF50', fontWeight: 700, fontSize: '12px', fontFamily: 'Poppins, sans-serif' }}>
            Paid
          </span>
        </div>
      )
    }
    return (
      <div style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        padding: '6px 14px', background: 'rgba(255, 152, 0, 0.12)',
        borderRadius: '50px', border: '1.5px solid rgba(255, 152, 0, 0.3)'
      }}>
        <Clock size={14} color="#ff9800" />
        <span style={{ color: '#ff9800', fontWeight: 700, fontSize: '12px', fontFamily: 'Poppins, sans-serif' }}>
          Pending
        </span>
      </div>
    )
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)' }}>
        <div style={{ color: '#fa6193', fontFamily: 'Poppins, sans-serif' }}>Loading orders...</div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px', background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
          <button onClick={() => navigate(-1)} style={{
            background: 'white', border: 'none', borderRadius: '50%',
            width: '44px', height: '44px', display: 'flex', alignItems: 'center',
            justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(250,97,147,0.3)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.1)' }}
          >
            <ArrowLeft size={20} color="#fa6193" />
          </button>
          <h1 style={{ fontFamily: "'Sacramento', cursive", fontSize: '42px', color: '#fa6193', margin: 0 }}>
            My Orders
          </h1>
        </div>

        {/* Orders List */}
        {loading ? (
          <p style={{ textAlign: 'center', color: '#666', fontFamily: 'Poppins, sans-serif' }}>Loading orders...</p>
        ) : orders.length === 0 ? (
          <div style={{ 
            background: 'white', borderRadius: '24px', padding: '60px 40px', 
            textAlign: 'center', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' 
          }}>
            <Package size={72} color="#fce4ec" style={{ marginBottom: '20px' }} />
            <p style={{ color: '#3E2723', fontFamily: 'Poppins, sans-serif', fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
              No orders yet
            </p>
            <p style={{ color: '#999', fontSize: '14px', fontFamily: 'Poppins, sans-serif', marginBottom: '24px' }}>
              Your delicious orders will appear here
            </p>
            <button
              onClick={() => navigate('/menu')}
              style={{
                padding: '14px 32px', background: '#fa6193', color: 'white',
                border: 'none', borderRadius: '50px', cursor: 'pointer',
                fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '15px',
                boxShadow: '0 4px 20px rgba(250, 97, 147, 0.3)',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(250, 97, 147, 0.4)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(250, 97, 147, 0.3)' }}
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {orders.map((order, _index) => (
              <div key={order.id} style={{
                background: 'white',
                borderRadius: '24px',
                padding: '24px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px) scale(1.01)'
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(250, 97, 147, 0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.06)'
              }}
              >
                {/* Top accent line */}
                <div style={{
                  position: 'absolute', top: 0, left: '24px', right: '24px',
                  height: '3px', borderRadius: '0 0 4px 4px',
                  background: order.status === 'paid' 
                    ? 'linear-gradient(90deg, #4CAF50, #81C784)' 
                    : 'linear-gradient(90deg, #ff9800, #FFB74D)'
                }} />

                {/* Header */}
                <div style={{ 
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  marginBottom: '16px', marginTop: '4px'
                }}>
                  {getStatusBadge(order.status)}
                  <span style={{ 
                    color: '#999', fontSize: '13px', fontFamily: 'Poppins, sans-serif',
                    display: 'flex', alignItems: 'center', gap: '4px'
                  }}>
                    <Sparkles size={12} color="#fa6193" style={{ opacity: 0.5 }} />
                    {new Date(order.created_at).toLocaleDateString('en-CA', { 
                      year: 'numeric', month: 'short', day: 'numeric' 
                    })}
                  </span>
                </div>

                {/* Order Number */}
                <div style={{ 
                  display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' 
                }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '10px',
                    background: 'linear-gradient(135deg, #fa6193, #f05584)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <Package size={16} color="white" />
                  </div>
                  <div>
                    <p style={{ 
                      margin: 0, color: '#3E2723', fontWeight: 700, 
                      fontSize: '15px', fontFamily: 'Poppins, sans-serif' 
                    }}>
                      Order #{order.id.slice(-6).toUpperCase()}
                    </p>
                    <p style={{ 
                      margin: '2px 0 0', color: '#999', fontSize: '11px',
                      fontFamily: 'Poppins, sans-serif' 
                    }}>
                      {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                </div>

                {/* Items */}
                <div style={{ 
                  background: 'linear-gradient(135deg, #fff5f8, #ffffff)',
                  borderRadius: '16px', padding: '16px', marginBottom: '16px',
                  border: '1px solid #fce4ec'
                }}>
                  {order.items.map((item: any, i: number) => (
                    <div key={i} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: i !== order.items.length - 1 ? '0 0 10px' : '0',
                      marginBottom: i !== order.items.length - 1 ? '10px' : '0',
                      borderBottom: i !== order.items.length - 1 ? '1px dashed #fce4ec' : 'none'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '28px', height: '28px', borderRadius: '8px',
                          background: '#fa6193', color: 'white',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '11px', fontWeight: 700, fontFamily: 'Poppins, sans-serif'
                        }}>
                          {item.quantity}x
                        </div>
                        <span style={{ 
                          color: '#5D4037', fontFamily: 'Poppins, sans-serif',
                          fontSize: '14px', fontWeight: 500 
                        }}>
                          {item.name}
                        </span>
                      </div>
                      <span style={{ 
                        color: '#3E2723', fontWeight: 600, fontSize: '14px',
                        fontFamily: 'Poppins, sans-serif' 
                      }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '16px 20px', background: 'linear-gradient(135deg, #fa6193, #f05584)',
                  borderRadius: '16px', marginTop: '4px'
                }}>
                  <div>
                    <p style={{ 
                      margin: 0, color: 'rgba(255,255,255,0.8)', fontSize: '11px',
                      fontFamily: 'Poppins, sans-serif' 
                    }}>
                      Total Amount
                    </p>
                    <p style={{ 
                      margin: '2px 0 0', color: 'white', fontSize: '22px',
                      fontWeight: 800, fontFamily: 'Poppins, sans-serif' 
                    }}>
                      ${order.total_amount.toFixed(2)}
                    </p>
                  </div>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '8px 16px', background: 'rgba(255,255,255,0.2)',
                    borderRadius: '50px', backdropFilter: 'blur(10px)'
                  }}>
                   {getPaymentIcon()}
                    <span style={{ 
                      color: 'white', fontSize: '12px', fontWeight: 600,
                      fontFamily: 'Poppins, sans-serif' 
                    }}>
                      {`•••• ${order.card_last_four || '****'}`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default Orders