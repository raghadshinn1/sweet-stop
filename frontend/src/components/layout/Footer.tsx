import React, { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Heart, Instagram, Cake, ExternalLink } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { CONTACT_INFO } from '../../constants'

const Footer: React.FC = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [hoveredSocial, setHoveredSocial] = useState<number | null>(null)

  
  const hoursText = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      <span>Mon–Fri: 11 AM – 11 PM</span>
      <span>Sat–Sun: 11 AM – 1 AM</span>
    </div>
  )

  const socialLinks = [
    { icon: <Instagram size={18} />, href: (CONTACT_INFO as any).instagram || '#', label: 'Instagram' },
    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>, href: (CONTACT_INFO as any).tiktok || '#', label: 'TikTok' },   
  ]

  const footerBg = isDark
    ? 'linear-gradient(180deg, #2f2f4e 0%, #1e1e36 100%)'
    : 'linear-gradient(180deg, #f05584 0%, #fa6193 100%)'

  return (
    <footer id="contact-footer" style={{
      width: '100%',
      background: footerBg,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Top line */}
      <div style={{
        height: '3px',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px 16px' }}>
        
        {/* Main Row: Brand | Trust Badges | Contact | Map */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr 1fr 1fr',
          gap: '32px',
          alignItems: 'start',
          marginBottom: '24px'
        }} className="footer-main">
          
          {/* Brand + Social */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Cake size={20} color="white" />
              <span style={{
                fontSize: '24px',
                fontWeight: 700,
                color: 'white',
                fontFamily: "'Brush Script MT', 'Dancing Script', cursive, Poppins, sans-serif",
              }}>
                Sweet Stop
              </span>
            </div>
            <p style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: '12px',
              fontFamily: 'Poppins, sans-serif',
              lineHeight: 1.5,
              margin: '0 0 12px 0'
            }}>
              Finest desserts in Edmonton. Crafted with love, served with a smile.
            </p>
            
            <div style={{ display: 'flex', gap: '6px' }}>
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  onMouseEnter={() => setHoveredSocial(i)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: hoveredSocial === i ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    transform: hoveredSocial === i ? 'translateY(-2px)' : 'translateY(0)'
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ✅ TRUST BADGES — بالطول */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              background: 'rgba(255,255,255,0.12)',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)'
            }}>
              <span style={{ fontSize: '22px' }}>🕌</span>
              <div>
                <p style={{ 
                  color: 'white', 
                  fontWeight: 700, 
                  fontSize: '12px',
                  fontFamily: 'Poppins, sans-serif',
                  margin: 0,
                  letterSpacing: '0.5px'
                }}>
                  100% HALAL
                </p>
                <p style={{ 
                  color: 'rgba(255,255,255,0.6)', 
                  fontSize: '10px',
                  fontFamily: 'Poppins, sans-serif',
                  margin: '2px 0 0'
                }}>
                  Certified & Trusted
                </p>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              background: 'rgba(255,255,255,0.12)',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)'
            }}>
              <span style={{ fontSize: '22px' }}>🇨🇦</span>
              <div>
                <p style={{ 
                  color: 'white', 
                  fontWeight: 700, 
                  fontSize: '12px',
                  fontFamily: 'Poppins, sans-serif',
                  margin: 0,
                  letterSpacing: '0.5px'
                }}>
                  CANADIAN OWNED
                </p>
                <p style={{ 
                  color: 'rgba(255,255,255,0.6)', 
                  fontSize: '10px',
                  fontFamily: 'Poppins, sans-serif',
                  margin: '2px 0 0'
                }}>
                  Local & Fresh
                </p>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              background: 'rgba(255,255,255,0.12)',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)'
            }}>
              <span style={{ fontSize: '22px' }}>❤️</span>
              <div>
                <p style={{ 
                  color: 'white', 
                  fontWeight: 700, 
                  fontSize: '12px',
                  fontFamily: 'Poppins, sans-serif',
                  margin: 0,
                  letterSpacing: '0.5px'
                }}>
                  MADE WITH LOVE
                </p>
                <p style={{ 
                  color: 'rgba(255,255,255,0.6)', 
                  fontSize: '10px',
                  fontFamily: 'Poppins, sans-serif',
                  margin: '2px 0 0'
                }}>
                  Handcrafted Daily
                </p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{
              color: 'white',
              fontSize: '13px',
              fontWeight: 600,
              fontFamily: 'Poppins, sans-serif',
              margin: '0 0 10px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <MapPin size={13} /> Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{
                display: 'flex', alignItems: 'flex-start', gap: '6px',
                color: 'rgba(255,255,255,0.75)', fontSize: '11px',
                fontFamily: 'Poppins, sans-serif'
              }}>
                <MapPin size={12} style={{ marginTop: '2px', flexShrink: 0 }} />
                <span>{CONTACT_INFO.address}</span>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                color: 'rgba(255,255,255,0.75)', fontSize: '11px',
                fontFamily: 'Poppins, sans-serif'
              }}>
                <Phone size={12} />
                {CONTACT_INFO.phone}
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                color: 'rgba(255,255,255,0.75)', fontSize: '11px',
                fontFamily: 'Poppins, sans-serif'
              }}>
                <Mail size={12} />
                {CONTACT_INFO.email}
              </div>
              {/* ⏰ ساعات العمل - التنتين مع بعض */}
              <div style={{
                display: 'flex', alignItems: 'flex-start', gap: '6px',
                color: 'rgba(255,255,255,0.75)', fontSize: '11px',
                fontFamily: 'Poppins, sans-serif'
              }}>
                <Clock size={12} style={{ marginTop: '2px', flexShrink: 0 }} />
                {hoursText}
              </div>
            </div>
          </div>

          {/* Map with Open in Maps */}
          <div style={{
            borderRadius: '12px',
            overflow: 'hidden',
            border: '2px solid rgba(255,255,255,0.2)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
            height: '150px',
            position: 'relative'
          }}>
            <iframe
              src={CONTACT_INFO.mapsUrl}
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              loading="lazy"
              title="Location"
            />
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(CONTACT_INFO.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(240, 85, 132, 0.8)',
                color: 'white',
                textDecoration: 'none',
                fontSize: '12px',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 600,
                opacity: 0,
                transition: 'opacity 0.2s',
                gap: '6px'
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '1'}
              onMouseLeave={e => e.currentTarget.style.opacity = '0'}
            >
              <ExternalLink size={14} /> Open in Maps
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.15)',
          paddingTop: '14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          <span style={{
            fontSize: '11px',
            color: 'rgba(255,255,255,0.6)',
            fontFamily: 'Poppins, sans-serif',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Heart size={11} fill="white" color="white" style={{ opacity: 0.5 }} />
            Sweet Stop — Edmonton, AB
          </span>
          <span style={{
            fontSize: '10px',
            color: 'rgba(255,255,255,0.4)',
            fontFamily: 'Poppins, sans-serif'
          }}>
            &copy; {new Date().getFullYear()} All rights reserved
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .footer-main { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
          .footer-main > div:last-child { grid-column: span 2; height: 160px !important; }
        }
        @media (max-width: 600px) {
          .footer-main { grid-template-columns: 1fr !important; gap: 20px !important; }
          .footer-main > div:last-child { grid-column: span 1; height: 140px !important; }
        }
      `}</style>
    </footer>
  )
}

export default Footer