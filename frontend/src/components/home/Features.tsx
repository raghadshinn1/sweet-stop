import React from 'react'
import { useTheme } from '../../hooks/useTheme'

const Features: React.FC = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const features = [
    {
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 19.5 C 4.5 19.5, 3 10.5, 11.5 6.5 C 16 4.5, 19.5 4.5, 19.5 4.5 C 19.5 4.5, 19.5 8, 17.5 12.5 C 13.5 21, 4.5 19.5, 4.5 19.5 Z" />
          <path d="M4.5 19.5 C 7.5 16.5, 12 12, 19.5 4.5" />
          <path d="M4.5 19.5 L 2.5 21.5" />
        </svg>
      ),
      title: '100% Fresh Ingredients',
      desc: 'Only the best for the sweetest taste.'
    },
    {
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      ),
      title: 'Made with Love',
      desc: 'Every treat is crafted with care and passion.'
    },
    {
      icon: (
        <svg width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 4c-1.5 0-2.5 1-2.5 2.5 0 .2 0 .4.1.6C8 7.3 7 8.5 7 10c0 .3 0 .6.1.8C5.8 11.3 5 12.5 5 14c0 1.7 1.3 3 3 3h8c1.7 0 3-1.3 3-3 0-1.5-.8-2.7-2.1-3.2.1-.2.1-.5.1-.8 0-1.5-1-2.7-2.6-2.9.1-.2.1-.4.1-.6C14.5 5 13.5 4 12 4z" />
          <path d="M7.5 17l1.5 5h6l1.5-5" />
          <line x1="9.5" y1="17" x2="10" y2="22" />
          <line x1="11.2" y1="17" x2="11.3" y2="22" />
          <line x1="12.8" y1="17" x2="12.7" y2="22" />
          <line x1="14.5" y1="17" x2="14" y2="22" />
        </svg>
      ),
      title: 'Wide Variety of Sweets',
      desc: 'Something delicious for everyone!'
    },
    {
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 12 20 22 4 22 4 12" />
          <rect x="2" y="7" width="20" height="5" />
          <line x1="12" y1="22" x2="12" y2="7" />
          <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
          <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
        </svg>
      ),
      title: 'Perfect for Any Occasion',
      desc: 'Celebrate moments with sweetness.'
    }
  ]

  return (
    <section style={{
      width: '100%',
      padding: '0 24px 30px',
      background: isDark
        ? 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)'
        : 'linear-gradient(180deg, #fadde1 0%, #fadde1 100%)',
      display: 'flex',
      justifyContent: 'center',
      marginTop: '-10px',
      position: 'relative',
      zIndex: 20,
      transition: 'background 0.3s',
    }}>
      <div className="features-container" style={{
        maxWidth: '1200px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: isDark ? '#1e1e36' : '#ffffff',
        borderRadius: '24px',
        padding: '30px 20px',
        boxShadow: isDark ? '0 8px 30px rgba(0,0,0,0.3)' : '0 8px 30px rgba(0,0,0,0.04)',
        border: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid #f0f0f0',
        transition: 'all 0.3s',
      }}>
        {features.map((feature, i) => (
          <div key={i} className="feature-item" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            padding: '0 20px',
            borderRight: i < features.length - 1 ? (isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #f5e6eb') : 'none',
            flex: 1
          }}>
            <div style={{
              width: '55px',
              height: '55px',
              minWidth: '55px',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {[0, 45, 90, 135].map((deg) => (
                <div key={deg} style={{
                  position: 'absolute',
                  width: '46px',
                  height: '46px',
                  backgroundColor: '#fa6193',
                  borderRadius: '12px',
                  transform: `rotate(${deg}deg)`,
                  boxSizing: 'border-box'
                }} />
              ))}
              <div style={{
                position: 'absolute',
                width: '45px',
                height: '45px',
                backgroundColor: '#fa6193',
                borderRadius: '50%',
                zIndex: 1
              }} />
              <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {feature.icon}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <h3 style={{
                fontSize: '17px',
                fontWeight: 700,
                color: '#fa6193',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                margin: 0,
                lineHeight: 1.2
              }}>
                {feature.title}
              </h3>
              <p style={{
                fontSize: '13px',
                color: isDark ? 'rgba(255,255,255,0.6)' : '#706668',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                margin: 0,
                lineHeight: 1.4,
                transition: 'color 0.3s',
              }}>
                {feature.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
  @media (max-width: 1024px) {
    .features-container { flex-wrap: wrap !important; gap: 20px !important; padding: 24px !important; }
    .feature-item { 
      flex: 1 1 45% !important; 
      border-right: none !important; 
      border-bottom: 1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#f5e6eb'} !important; 
      padding-bottom: 20px !important; 
    }
    .feature-item:last-child { border-bottom: none !important; }
  }
  
  @media (max-width: 768px) {
    .features-container { 
      flex-direction: row !important; 
      flex-wrap: wrap !important;
      gap: 16px !important; 
      padding: 20px !important; 
    }
    .feature-item { 
      flex: 1 1 45% !important; 
      border: none !important; 
      padding: 0 !important; 
      text-align: center !important; 
      flex-direction: column !important; 
    }
    .feature-item:nth-child(3),
    .feature-item:nth-child(4) {
      border-bottom: none !important;
    }
  }
`}</style>
    </section>
  )
}

export default Features