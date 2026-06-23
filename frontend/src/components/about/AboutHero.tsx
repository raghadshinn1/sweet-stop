import React from 'react'
import { useTheme } from '../../hooks/useTheme'

const AboutHero: React.FC = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <section style={{ 
      width: '100%', 
      margin: 0, 
      padding: 0, 
      position: 'relative',
      background: isDark ? '#1a1a2e' : 'transparent',
      transition: 'background 0.3s',
    }}>
      {/* Logo */}
      <div className="about-logo" style={{
        position: 'absolute',
        top: 'clamp(-60px, -5vw, -90px)',
        left: 'clamp(16px, 4vw, 60px)',
        zIndex: 100
      }}>
        <img
          src="/images/logo.png"
          alt="Sweet Stop Logo"
          className="about-logo-img"
          style={{
            width: 'clamp(80px, 12vw, 208px)',
            height: 'auto',
            objectFit: 'contain',
            display: 'block',
            marginTop:'-35px',

          }}
        />
      </div>

      {}
      <img
        src="/images/hero.jpg"
        alt="Sweet Stop Hero"
        className="about-hero-img"
        style={{ 
          width: '100%', 
          display: 'block', 
          margin: 0, 
          padding: 0, 
          maxHeight: '500px', 
          objectFit: 'cover' 
        }}
      />

      {}
      <div className="about-hero-text" style={{
        position: 'absolute',
        top: 'clamp(60px, 10vw, 100px)',
        left: 'clamp(16px, 4vw, 60px)',
        zIndex: 10,
        maxWidth: 'clamp(200px, 45vw, 500px)'
      }}>
        <h1 className="about-title" style={{
          fontSize: 'clamp(28px, 7vw, 60px)',
          fontWeight: 900,
          color: isDark ? '#3E2723' : '#3E2723',
          lineHeight: 1.05,
          marginBottom: '5px',
          letterSpacing: '-2px',
          fontFamily: 'Poppins, sans-serif',
          transition: 'color 0.3s',
          textShadow: '0 2px 10px rgba(255,255,255,0.5)',
        }}>ABOUT</h1>
        <h2 className="about-subtitle" style={{
          fontSize: 'clamp(22px, 5vw, 60px)',
          fontWeight: 800,
          color: '#fa6193',
          lineHeight: 1.05,
          marginBottom: '10px',
          letterSpacing: '-1px',
          fontFamily: 'Poppins, sans-serif',
          textShadow: '0 2px 10px rgba(255,255,255,0.5)',
        }}>SWEET STOP <span style={{ fontSize: 'clamp(18px, 3vw, 40px)' }}>♡</span></h2>
        <p className="about-desc" style={{
          color: isDark ? '#5D4037' : '#5D4037',
          fontSize: 'clamp(12px, 2vw, 18px)',
          maxWidth: '400px',
          marginBottom: '15px',
          lineHeight: 1.5,
          fontFamily: 'Poppins, sans-serif',
          transition: 'color 0.3s',
          textShadow: '0 1px 5px rgba(255,255,255,0.6)',
        }}>
          At Sweet Stop, we believe life is sweeter<br />when you take a moment to indulge.
        </p>
        <div className="about-line" style={{ 
          width: 'clamp(80px, 20vw, 200px)', 
          height: '3px', 
          background: 'linear-gradient(90deg, #fa6193, transparent)', 
          borderRadius: '2px' 
        }} />
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
          .about-logo { 
            top: -25px !important; 
            left: 12px !important; 
          }
          .about-logo-img { 
            width: 130px !important; 
          }
          .about-hero-img { 
            max-height: 430px !important; 
          }
          .about-hero-text {
            top: 60% !important;
            left: 16px !important;
            transform: translateY(-60%) !important;
            max-width: 55% !important;
            text-align: left !important;
          }
          .about-title { 
            font-size: 48px !important; 
            margin-bottom: 2px !important;
          }
          .about-subtitle { 
            font-size: 32px !important; 
            margin-bottom: 6px !important;
          }
          .about-subtitle span {
            font-size: 28px !important;
          }
          .about-desc { 
            font-size: 19px !important; 
            line-height: 1.4 !important;
            margin-bottom: 8px !important;
          }
          .about-desc br { 
            display: none !important; 
          }
          .about-line {
            width: 60px !important;
            height: 2px !important;
          }
        }

        @media (max-width: 480px) {
          .about-logo { 
            top: -16px !important; 
            left: 10px !important; 
          }
          .about-logo-img { 
            width: 75px !important; 
          }
          .about-hero-img { 
            max-height: 350px !important; 
          }
          .about-hero-text {
            top: 60% !important;
            left: 16px !important;
            transform: translateY(-58%) !important;
            max-width: 60% !important;
            text-align: left !important;
          }
          .about-title { 
            font-size: 28px !important; 
            margin-bottom: 2px !important;
          }
          .about-subtitle { 
            font-size: 20px !important; 
            margin-bottom: 4px !important;
          }
          .about-subtitle span {
            font-size: 20px !important;
          }
          .about-desc { 
            font-size: 12px !important; 
            line-height: 1.4 !important;
            margin-bottom: 6px !important;
            max-width: 80% !important;
          }
          .about-line {
            width: 50px !important;
            height: 2px !important;
          }
        }

        @media (max-width: 320px) {
          .about-logo { 
            top: -6px !important; 
            left: 8px !important; 
          }
          .about-logo-img { 
            width: 65px !important;
          }
          .about-hero-img { 
            max-height: 250px !important; 
          }
          .about-hero-text {
            top: 50% !important;
            left: 10px !important;
            transform: translateY(-55%) !important;
            max-width: 65% !important;
            text-align: left !important;
          }
          .about-title { 
            font-size: 24px !important; 
            margin-bottom: 1px !important;
          }
          .about-subtitle { 
            font-size: 16px !important; 
            margin-bottom: 2px !important;
          }
          .about-subtitle span {
            font-size: 14px !important;
          }
          .about-desc { 
            font-size: 9px !important; 
            line-height: 1.3 !important;
            margin-bottom: 4px !important;
            max-width: 65% !important;
          }
          .about-line {
            width: 30px !important;
            height: 2px !important;
          }
        }
      `}</style>
    </section>
  )
}

export default AboutHero