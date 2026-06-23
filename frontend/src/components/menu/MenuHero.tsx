import React from 'react'
import { useTheme } from '../../hooks/useTheme'

const MenuHero: React.FC = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

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
            width: 'clamp(90px, 17vw, 208px)',
            height: 'auto',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </div>

      {/* Hero Image */}
      <img
        src="/images/hero.jpg"
        alt="Sweet Stop Hero"
        className="hero-main-img"
        style={{
          width: '100%',
          display: 'block',
          margin: 0,
          padding: 0
        }}
      />

      {/* Text — على اليسار فوق الصورة */}
      <div className="hero-text" style={{
        position: 'absolute',
        top: 'clamp(80px, 12vw, 190px)',
        left: 'clamp(16px, 5vw, 60px)',
        zIndex: 10,
        maxWidth: 'clamp(280px, 45vw, 500px)',
        textAlign: 'left'
      }}>
        <p className="hero-subtitle" style={{
          color: isDark ? '#ff8fab' : '#E91E8C',
          fontSize: 'clamp(20px, 3vw, 42px)',
          fontStyle: 'italic',
          fontWeight: 400,
          marginBottom: '5px',
          fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
          transition: 'color 0.3s',
          textShadow: '0 2px 8px rgba(255,255,255,0.5)',
        }}>
          Welcome to
        </p>

        <h1 className="hero-title" style={{
          fontSize: 'clamp(28px, 5vw, 72px)',
          fontWeight: 900,
          color: isDark ? '#3E2723' : '#3E2723',
          lineHeight: 1.05,
          marginBottom: '10px',
          letterSpacing: '-1px',
          fontFamily: 'Poppins, sans-serif',
          textTransform: 'uppercase',
          transition: 'color 0.3s',
          textShadow: '0 2px 10px rgba(255,255,255,0.4)',
        }}>
          SWEET STOP
        </h1>

        <p className="hero-desc" style={{
          color: isDark ? '#ff8fab' : '#E91E8C',
          fontSize: 'clamp(14px, 2vw, 28px)',
          fontStyle: 'italic',
          fontWeight: 400,
          marginBottom: '20px',
          fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
          transition: 'color 0.3s',
          textShadow: '0 2px 8px rgba(255,255,255,0.5)',
        }}>
          Indulge in Sweet Moments..♡
        </p>
      </div>

      <style>{`
      @media (max-width: 1440px) {
          .hero-logo { top: -60px !important; left: 76px !important; }
          .hero-logo-img { width: 170px !important; }
          .hero-text { top: 100px !important; left: 20px !important; max-width: 350px !important; }
          .hero-subtitle { font-size: 76px !important; }
          .hero-title { font-size: 88px !important; }
          .hero-desc { font-size: 52px !important; }
        }
        @media (max-width: 1024px) {
          .hero-logo { top: -50px !important; left: 20px !important; }
          .hero-logo-img { width: 120px !important; }
          .hero-text { top: 100px !important; left: 20px !important; max-width: 350px !important; }
          .hero-subtitle { font-size: 58px !important; }
          .hero-title { font-size: 55px !important; }
          .hero-desc { font-size: 42px !important; }
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
            font-size: 44px !important; 
            margin-bottom: 4px !important;
          }
          .hero-title { 
            font-size: 34px !important; 
            letter-spacing: 1px !important; 
            margin-bottom: 8px !important;
          }
          .hero-desc { 
            font-size: 28px !important; 
            line-height: 1.4 !important;
            margin-bottom: 12px !important;
            max-width: 190px !important;
          }
        }
          
        @media (max-width: 480px) {
          .hero-logo { 
            top: -40px !important;    
            left: 10px !important;
          }
          .hero-logo-img { width: 65px !important; }
          .hero-main-img { max-height: 220px !important; }
          .hero-text { 
            max-width: 60% !important; 
            left: 12px !important;
          }
          .hero-subtitle { font-size: 22px !important; }
          .hero-title { font-size: 27px !important; }
          .hero-desc { font-size: 15px !important; }
        }
        
        @media (max-width: 320px) {
          .hero-logo { 
            top: -30px !important; 
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
            font-size: 21px !important; 
            margin-bottom: 2px !important;
          }
          .hero-title { 
            font-size: 18px !important; 
            margin-bottom: 4px !important;
          }
          .hero-desc { 
            font-size: 10px !important; 
            line-height: 1.3 !important;
            margin-bottom: 9px !important;
            max-width: 150px !important;
          }
        }
      `}</style>
    </section>
  )
}

export default MenuHero