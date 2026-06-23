import React, { useState } from 'react'
import { Send, Mail, User, MessageSquare, Tag } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { supabase } from '../../lib/supabase'

const ContactForm: React.FC = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const { error: supabaseError } = await supabase
        .from('contacts')
        .insert({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          created_at: new Date().toISOString()
        })

      if (supabaseError) throw supabaseError

      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const cardBg = isDark ? 'rgba(30, 30, 54, 0.8)' : 'rgba(255, 255, 255, 0.9)'
  const glassBorder = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(240, 85, 132, 0.2)'
  const inputBg = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(240, 85, 132, 0.05)'
  const inputBorder = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(240, 85, 132, 0.15)'
  const textColor = isDark ? '#f0f0f0' : '#3E2723'
  const subTextColor = isDark ? 'rgba(255,255,255,0.7)' : '#555555'

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 20px 60px',
      minHeight: 'calc(100vh - 64px)',
    }}>
      <h1 style={{
        fontSize: 'clamp(36px, 8vw, 64px)',
        fontWeight: 900,
        color: isDark ? '#f0f0f0' : '#3E2723',
        marginBottom: '8px',
        textAlign: 'center',
        lineHeight: 1.1,
      }}>
        Get In{' '}
        <span style={{
          background: 'linear-gradient(135deg, #f05584, #fa6193, #F8B500)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          Touch
        </span>
      </h1>

      <p style={{
        fontSize: '18px',
        color: subTextColor,
        marginBottom: '48px',
        textAlign: 'center',
        maxWidth: '500px',
      }}>
        Have a question or feedback? We'd love to hear from you!
      </p>

      <div style={{
        maxWidth: '600px',
        width: '100%',
        background: cardBg,
        borderRadius: '32px',
        padding: '48px 40px',
        boxShadow: isDark
          ? '0 25px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)'
          : '0 25px 80px rgba(240, 85, 132, 0.15), 0 0 0 1px rgba(240, 85, 132, 0.1)',
        border: `1px solid ${glassBorder}`,
        backdropFilter: 'blur(20px)',
      }}>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>✨</div>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#f05584', marginBottom: '12px' }}>
              Message Sent!
            </h2>
            <p style={{ color: subTextColor, fontSize: '16px', lineHeight: 1.6 }}>
              Thank you for reaching out. We'll get back to you soon!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: textColor, fontSize: '14px', fontWeight: 600 }}>
                <User size={16} color="#f05584" /> Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: '16px',
                  border: `1px solid ${inputBorder}`,
                  background: inputBg,
                  color: textColor,
                  fontSize: '15px',
                  fontFamily: 'Poppins, sans-serif',
                  outline: 'none',
                  transition: 'all 0.3s',
                  boxSizing: 'border-box',
                }}
                placeholder="Your name"
              />
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: textColor, fontSize: '14px', fontWeight: 600 }}>
                <Mail size={16} color="#f05584" /> Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: '16px',
                  border: `1px solid ${inputBorder}`,
                  background: inputBg,
                  color: textColor,
                  fontSize: '15px',
                  fontFamily: 'Poppins, sans-serif',
                  outline: 'none',
                  transition: 'all 0.3s',
                  boxSizing: 'border-box',
                }}
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: textColor, fontSize: '14px', fontWeight: 600 }}>
                <Tag size={16} color="#f05584" /> Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: '16px',
                  border: `1px solid ${inputBorder}`,
                  background: inputBg,
                  color: textColor,
                  fontSize: '15px',
                  fontFamily: 'Poppins, sans-serif',
                  outline: 'none',
                  transition: 'all 0.3s',
                  boxSizing: 'border-box',
                }}
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: textColor, fontSize: '14px', fontWeight: 600 }}>
                <MessageSquare size={16} color="#f05584" /> Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: '16px',
                  border: `1px solid ${inputBorder}`,
                  background: inputBg,
                  color: textColor,
                  fontSize: '15px',
                  fontFamily: 'Poppins, sans-serif',
                  outline: 'none',
                  transition: 'all 0.3s',
                  boxSizing: 'border-box',
                  resize: 'vertical',
                }}
                placeholder="Tell us what's on your mind..."
              />
            </div>

            {error && (
              <p style={{ color: '#ef4444', fontSize: '14px', textAlign: 'center', margin: 0 }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                background: isSubmitting ? '#ccc' : 'linear-gradient(135deg, #f05584, #fa6193)',
                color: 'white',
                border: 'none',
                padding: '16px',
                borderRadius: '50px',
                fontSize: '16px',
                fontWeight: 700,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                fontFamily: 'Poppins, sans-serif',
                transition: 'all 0.3s',
                boxShadow: '0 4px 20px rgba(240, 85, 132, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(240, 85, 132, 0.4)'
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(240, 85, 132, 0.3)'
              }}
            >
              <Send size={18} />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default ContactForm