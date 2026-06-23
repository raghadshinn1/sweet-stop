import React from 'react'
import { useTheme } from '../hooks/useTheme'
import HeaderBar from '../components/layout/HeaderBar'
import Footer from '../components/layout/Footer'
import ContactForm from '../components/contact/ContactForm'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { CONTACT_INFO } from '../constants'

const Contact: React.FC = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const infoCards = [
    { icon: <MapPin size={28} strokeWidth={1.5} />, title: 'Visit Us', text: CONTACT_INFO.address },
    { icon: <Phone size={28} strokeWidth={1.5} />, title: 'Call Us', text: CONTACT_INFO.phone, href: `tel:${CONTACT_INFO.phone.replace(/[^0-9+]/g, '')}` },
    { icon: <Mail size={28} strokeWidth={1.5} />, title: 'Email Us', text: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
    { icon: <Clock size={28} strokeWidth={1.5} />, title: 'Working Hours', text: CONTACT_INFO.hours },
  ]

  return (
    <div style={{
      margin: 0,
      padding: 0,
      width: '100%',
      background: theme === 'dark'
        ? 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)'
        : 'linear-gradient(180deg, #FFF5F7 0%, #FFE4EC 30%, #FFF0F5 60%, #FFE4EC 100%)',
      minHeight: '100vh',
      fontFamily: 'Poppins, sans-serif',
      transition: 'background 0.3s',
    }}>
      <HeaderBar />

      {/* Info Cards Section */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 20px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '42px', fontWeight: 800,
            color: isDark ? '#fa6193' : '#fa6193',
            fontFamily: "'Brush Script MT', 'Dancing Script', cursive, Poppins, sans-serif",
            margin: '0 0 12px 0'
          }}>
            Contact Us
          </h1>
          <p style={{ color: isDark ? '#aaa' : '#666', fontSize: '16px', fontFamily: 'Poppins, sans-serif' }}>
            We'd love to hear from you! Reach out anytime.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          marginBottom: '40px'
        }} className="contact-info-grid">
          {infoCards.map((card, i) => {
            const Wrapper = card.href ? 'a' : 'div'
            return (
              <Wrapper
                key={i}
                {...(card.href ? { href: card.href } : {})}
                style={{
                  background: isDark ? 'rgba(255,255,255,0.05)' : 'white',
                  borderRadius: '20px',
                  padding: '28px 20px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  border: `2px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#fce4ec'}`,
                  transition: 'all 0.3s ease',
                  cursor: card.href ? 'pointer' : 'default',
                  boxShadow: isDark ? 'none' : '0 4px 20px rgba(250, 97, 147, 0.08)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-6px)'
                  e.currentTarget.style.boxShadow = isDark 
                    ? '0 10px 30px rgba(0,0,0,0.3)' 
                    : '0 10px 30px rgba(250, 97, 147, 0.15)'
                  e.currentTarget.style.borderColor = '#fa6193'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = isDark ? 'none' : '0 4px 20px rgba(250, 97, 147, 0.08)'
                  e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.1)' : '#fce4ec'
                }}
              >
                <div style={{
                  width: '56px', height: '56px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #fa6193, #ff8fab)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 16px',
                  color: 'white'
                }}>
                  {card.icon}
                </div>
                <h3 style={{
                  fontSize: '16px', fontWeight: 700,
                  color: isDark ? 'white' : '#3E2723',
                  fontFamily: 'Poppins, sans-serif',
                  margin: '0 0 8px 0'
                }}>
                  {card.title}
                </h3>
                <p style={{
                  fontSize: '13px', color: isDark ? '#aaa' : '#666',
                  fontFamily: 'Poppins, sans-serif',
                  margin: 0, lineHeight: 1.5
                }}>
                  {card.text}
                </p>
              </Wrapper>
            )
          })}
        </div>
      </div>

      {/* Contact Form */}
      <ContactForm />

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .contact-info-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .contact-info-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

export default Contact