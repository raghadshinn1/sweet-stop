import React from 'react'
import { ArrowRight } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { useNavigate } from 'react-router-dom'

const Hero: React.FC = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const navigate = useNavigate()

  return (
    <section style={{
      width: '100%',
      margin: 0,
      padding: 0,
      position: 'relative',
      backgroundColor: isDark ? '#1a1a2e' : 'transparent',
      transition: 'background-color 0.3s',
    }}>
      {}
      <div className="hero-logo" style={{
        position: 'absolute',
        top: 'clamp(-70px, -6vw, -90px)',
        left: 'clamp(16px, 5vw, 60px)',
        zIndex: 200
      }}>
        <img
          src="/images/logo.png"
          alt="Sweet Stop Logo"
          className="hero-logo-img"
          style={{
            width: 'clamp(90px, 14vw, 208px)',
            height: 'auto',
            objectFit: 'contain',
            display: 'block'
          }}
        />
      </div>

      {/* Hero Image */}
      <img
        src="/images/hero.jpg"
        alt="Sweet Stop Hero"
        className="hero-main-img"
        style={{ width: '100%', display: 'block', margin: 0, padding: 0 }}
      />

      {}
      <div className="hero-text" style={{
        position: 'absolute',
        top: 'clamp(60px, 10vw, 120px)',
        left: 'clamp(16px, 5vw, 60px)',
        zIndex: 10,
        maxWidth: 'clamp(280px, 45vw, 500px)'
      }}>
        <p className="hero-subtitle" style={{
          color: isDark ? '#ff8fab' : '#E91E8C',
          fontSize: 'clamp(20px, 3vw, 36px)',
          fontStyle: 'italic',
          fontWeight: 500,
          marginBottom: '8px',
          fontFamily: "'Brush Script MT', 'Dancing Script', cursive",
          transition: 'color 0.3s',
          textShadow: '0 2px 8px rgba(255,255,255,0.5)',
        }}>
          Life is Sweet, <span style={{ fontStyle: 'normal' }}>♡♡</span>
        </p>

        <h1 className="hero-title" style={{
          fontSize: 'clamp(28px, 6vw, 80px)',
          fontWeight: 900,
          color: isDark ? '#3e2723ef' : '#3E2723',
          lineHeight: 1.05,
          marginBottom: '15px',
          letterSpacing: '-2px',
          fontFamily: 'Poppins, sans-serif',
          transition: 'color 0.3s',
          textShadow: '0 2px 10px rgba(255,255,255,0.4)',
        }}>
          MAKE IT<br />SWEETER!
        </h1>

        <p className="hero-desc" style={{
          color: isDark ? '#707070' : '#5D4037',
          fontSize: 'clamp(12px, 1.8vw, 18px)',
          maxWidth: '400px',
          marginBottom: '20px',
          lineHeight: 1.5,
          fontFamily: 'Poppins, sans-serif',
          transition: 'color 0.3s',
          textShadow: '0 1px 5px rgba(255,255,255,0.4)',
        }}>
          Indulge in a world of irresistible treats <br />
          made with love and the finest ingredients.
        </p>

        <button className="hero-btn" style={{
          background: '#fa6193',
          color: 'white',
          padding: '14px 32px',
          borderRadius: '30px',
          border: 'none',
          fontSize: 'clamp(13px, 1.5vw, 16px)',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.3s',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          fontFamily: 'Poppins, sans-serif'
        }}
        onClick={() => navigate('/menu')}
        onMouseEnter={(e) => { e.currentTarget.style.background = '#C2185B'; e.currentTarget.style.transform = 'scale(1.05)' }}
        onMouseLeave={(e) => { e.currentTarget.style.background = '#E91E8C'; e.currentTarget.style.transform = 'scale(1)' }}
        >
          Explore Our Menu <ArrowRight size={18} />
        </button>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .hero-logo { top: -50px !important; left: 20px !important; }
          .hero-logo-img { width: 120px !important; }
          .hero-text { top: 80px !important; left: 20px !important; max-width: 350px !important; }
          .hero-title { font-size: 48px !important; }
        }
        
        @media (max-width: 768px) {
          .hero-logo { 
            top: -50px !important; 
            left: 12px !important; 
          }
          .hero-logo-img { 
            width: 80px !important; 
          }
          .hero-main-img { 
            max-height: 280px !important; 
            object-fit: cover !important; 
          }
          .hero-text { 
            top: 45% !important; 
            left: 16px !important; 
            transform: translateY(-50%) !important;
            max-width: 55% !important; 
            text-align: left !important; 
          }
          .hero-subtitle { 
            font-size: 38px !important; 
            margin-bottom: 4px !important;
          }
          .hero-title { 
            font-size: 32px !important; 
            letter-spacing: 1px !important; 
            margin-bottom: 8px !important;
          }
          .hero-desc { 
            font-size: 14px !important; 
            line-height: 1.4 !important;
            margin-bottom: 12px !important;
            max-width: 170px !important;
          }
          .hero-desc br { 
            display: none !important; 
          }
          .hero-btn { 
            display: none !important; 
          }
        }
          
        @media (max-width: 480px) {
          .hero-logo { 
            top: -60px !important;    
            left: 10px !important;
          }
          .hero-logo-img { width: 65px !important; }
          .hero-main-img { max-height: 220px !important; }
          .hero-text { 
            max-width: 60% !important; 
            left: 12px !important;
          }
          .hero-title { font-size: 10px !important; }
          .hero-subtitle { font-size: 16px !important; }
        }
           @media (max-width: 320px) {
    .hero-logo { 
      top: -50px !important; 
      left: 8px !important; 
    }
    .hero-logo-img { 
      width: 55px !important; 
    }
    .hero-main-img { 
      max-height: 180px !important; 
    }
    .hero-text { 
      top: 50% !important; 
      left: 10px !important; 
      max-width: 65% !important; 
    }
    .hero-subtitle { 
      font-size: 12px !important; 
      margin-bottom: 2px !important;
    }
    .hero-title { 
      font-size: 20px !important; 
      margin-bottom: 4px !important;
    }
    .hero-desc { 
      font-size: 9px !important; 
      line-height: 1.3 !important;
      margin-bottom: 10px !important;
      max-width: 150px !important;
    }
      `}
      </style>
    </section>
  )
}

export default Hero