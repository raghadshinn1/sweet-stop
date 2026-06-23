import React from 'react'
import { ChevronRight, ArrowRight } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { useNavigate } from 'react-router-dom'

const Treats: React.FC = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const navigate = useNavigate()

  const treats = [
    { title: 'Fruits Cup', desc: 'Fresh, juicy, and full of flavor!', img: 'images/fruits-cup.png' },
    { title: 'Ice Cream Cup', desc: 'Creamy, dreamy, and oh-so-good!', img: 'images/ice-cream-cup.png' },
    { title: 'Mini Dutch Pancake', desc: 'Bite-sized happiness in every piece!', img: 'images/mini-dutch.png' },
    { title: 'Cheesecake on a Stick', desc: "Cheesecake like you've never had before!", img: 'images/cheesecake-stick.png' },
    { title: 'Spaghetti Crepes & Frozen Sweets', desc: 'A unique twist on your favorite desserts!', img: 'images/spaghetti-crepes.png' },
    { title: 'Croffles', desc: 'Crispy, chewy, and irresistibly tasty!', img: 'images/croffles.png' },
    { title: 'Cream Puffs', desc: 'Light, fluffy, and filled with joy!', img: 'images/cream-puffs.png' },
    { title: 'Frozen Sweets', desc: 'Cool, creamy, and absolutely delightful!', img: 'images/frozen-sweets.png' },
  ]

  return (
    <section style={{
      width: '100%',
      background: isDark
        ? 'linear-gradient(180deg, #16213e 0%, #0f3460 100%)'
        : 'linear-gradient(180deg, #FCE4EC 0%, #FFF0F5 100%)',
      transition: 'background 0.3s',
    }}>
      <div style={{
        padding: '20px 24px 0px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '5px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#fa6193"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/></svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#fa6193"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/></svg>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#fa6193"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/></svg>
          </div>

          <h2 className="treats-title" style={{
            fontSize: '36px',
            fontWeight: 800,
            color: isDark ? '#f0f0f0' : '#3E2723',
            fontFamily: "'Core Sans A', 'Poppins', sans-serif",
            textAlign: 'center',
            margin: 0,
            transition: 'color 0.3s',
          }}>
            Our Irresistible Treats
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#fa6193"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/></svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#fa6193"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/></svg>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#fa6193"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/></svg>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
          <div style={{ width: '40px', height: '2px', background: '#fa6193', borderRadius: '2px', opacity: 0.5 }}></div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fa6193" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          <div style={{ width: '40px', height: '2px', background: '#fa6193', borderRadius: '2px', opacity: 0.5 }}></div>
        </div>
      </div>

      <div className="treats-grid" style={{
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '25px',
        padding: '0px 40px 40px'
      }}>
        {treats.map((treat, i) => (
          <div key={i} className="treat-card" style={{
            background: isDark ? '#1e1e36' : '#FFF5F7',
            borderRadius: '24px',
            padding: '13px',
            border: isDark ? '2px solid rgba(250,97,147,0.3)' : '2px solid #FFD1DC',
            boxShadow: isDark ? '0 2px 10px rgba(0,0,0,0.4)' : '0 2px 10px rgba(0,0,0,0.04)',
            transition: 'all 0.3s',
            cursor: 'pointer',
            height: '280px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)'
            e.currentTarget.style.boxShadow = isDark ? '0 20px 40px rgba(0,0,0,0.4)' : '0 20px 40px rgba(0,0,0,0.1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = isDark ? '0 2px 10px rgba(0,0,0,0.4)' : '0 2px 10px rgba(0,0,0,0.04)'
          }}
          >
            <h3 style={{
              fontSize: '17px',
              fontWeight: 700,
              color: isDark ? '#f0f0f0' : '#3E2723',
              fontFamily: 'Poppins, sans-serif',
              textAlign: 'center',
              margin: '0 0 4px 0',
              lineHeight: 1.2,
              flexShrink: 0,
              transition: 'color 0.3s',
            }}>
              {treat.title}
            </h3>

            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              width: '80%',
              height: '110px',
              background: isDark ? '#252545' : '#FFF5F7',
              flexShrink: 0,
              transition: 'background 0.3s',
            }}>
              <img src={treat.img} alt={treat.title} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
            </div>

            <p style={{
              fontSize: '12px',
              color: isDark ? 'rgba(255,255,255,0.65)' : '#4e4a4a',
              lineHeight: 1.3,
              fontFamily: 'Poppins, sans-serif',
              textAlign: 'center',
              margin: 0,
              flexShrink: 0,
              transition: 'color 0.3s',
            }}>
              {treat.desc}
            </p>

            <button
              onClick={() => navigate('/menu')}
              style={{
                width: '85%',
                border: '2px solid #fa6193',
                color: '#fa6193',
                background: 'transparent',
                padding: '6px',
                borderRadius: '20px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                transition: 'all 0.3s',
                fontFamily: 'Poppins, sans-serif',
                flexShrink: 0
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#fa6193'; e.currentTarget.style.color = 'white' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fa6193' }}
            >
              View More <ChevronRight size={12} />
            </button>
          </div>
        ))}
      </div>

      <div className="banner-container" style={{
        maxWidth: '1200px',
        width: '100%',
        margin: '-30px auto 5px',
        padding: '0 30px',
        position: 'relative',
        borderRadius: '24px',
        overflow: 'hidden'
      }}>
        <img
          src="/images/banner.png"
          alt="Sweet Moments"
          style={{
            width: '100%',
            height: '150px',
            objectFit: 'cover',
            display: 'block',
            borderRadius: '24px',
            border: isDark ? '3px solid rgba(250,97,147,0.3)' : '3px solid #FFD1DC',
            transition: 'border 0.3s',
          }}
        />

        {isDark && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(10,10,30,0.55)',
            borderRadius: '24px',
            pointerEvents: 'none',
          }} />
        )}

        <div className="banner-content" style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          zIndex: 2,
          width: '90%'
        }}>
          <h2 className="banner-title" style={{
            fontSize: '36px',
            fontWeight: 700,
            color: isDark ? '#ffb3cc' : '#fa6193',
            fontFamily: "'Brush Script MT', 'Dancing Script', cursive, sans-serif",
            fontStyle: 'italic',
            margin: '0 0 2px 0',
            letterSpacing: '1px',
            textShadow: isDark ? '2px 2px 4px rgba(0,0,0,0.6)' : '2px 2px 4px rgba(255,255,255,0.8)',
            transition: 'color 0.3s',
          }}>
            Sweet Moments, Every Day!
          </h2>
          <p className="banner-text" style={{
            fontSize: '16px',
            color: isDark ? '#f0c0d0' : '#8B5A5A',
            fontFamily: 'Poppins, sans-serif',
            margin: '0 0 14px 0',
            lineHeight: 1.5,
            textShadow: isDark ? '1px 1px 3px rgba(0,0,0,0.6)' : '1px 1px 2px rgba(255,255,255,0.9)',
            transition: 'color 0.3s',
          }}>
            Treat yourself or surprise someone special.<br />
            Sweet Stop is here to make every moment sweeter.
          </p>
          <button
            onClick={() => navigate('/menu')}
            className="banner-btn"
            style={{
              background: '#fa6193',
              color: 'white',
              border: 'none',
              padding: '12px 25px',
              borderRadius: '30px',
              fontSize: '16px',
              fontWeight: 600,
              position: 'relative',
              top: '-13px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s',
              fontFamily: 'Poppins, sans-serif',
              boxShadow: '0 4px 15px rgba(250, 97, 147, 0.4)'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#e05582'; e.currentTarget.style.transform = 'scale(1.05)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#fa6193'; e.currentTarget.style.transform = 'scale(1)' }}
          >
            Order Now <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .treats-grid { grid-template-columns: repeat(2, 1fr) !important; padding: 0 24px 30px !important; }
          .treat-card { height: auto !important; min-height: 280px !important; }
        }
        @media (max-width: 768px) {
          .treats-title { font-size: 28px !important; }
          .treats-grid { grid-template-columns: 1fr !important; padding: 0 16px 24px !important; gap: 16px !important; }
          .treat-card { height: auto !important; min-height: 260px !important; }
          .banner-container { padding: 0 16px !important; margin: 10px auto !important; }
          .banner-content { width: 95% !important; }
          .banner-title { font-size: 24px !important; }
          .banner-text { font-size: 13px !important; }
          .banner-btn { padding: 10px 20px !important; font-size: 14px !important; }
        }
        @media (max-width: 480px) {
          .treats-title { font-size: 24px !important; }
          .treat-card { min-height: 240px !important; }
        }
      `}</style>
    </section>
  )
}

export default Treats