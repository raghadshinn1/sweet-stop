import React, { useState, useEffect } from 'react'
import { useTheme } from '../../hooks/useTheme'
import ProductsSection from './ProductsSection'

const EveryTreat: React.FC = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')

  useEffect(() => {
    const checkScreen = () => {
      const width = window.innerWidth
      if (width < 768) setScreenSize('mobile')
      else if (width < 1024) setScreenSize('tablet')
      else setScreenSize('desktop')
    }
    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  const isMobile = screenSize === 'mobile'
  const isTablet = screenSize === 'tablet'

  const features = [
    {
      icon: (
        <svg width={isMobile ? 40 : 60} height={isMobile ? 40 : 60} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 19.5 C 4.5 19.5, 3 10.5, 11.5 6.5 C 16 4.5, 19.5 4.5, 19.5 4.5 C 19.5 4.5, 19.5 8, 17.5 12.5 C 13.5 21, 4.5 19.5, 4.5 19.5 Z" />
          <path d="M4.5 19.5 C 7.5 16.5, 12 12, 19.5 4.5" />
          <path d="M4.5 19.5 L 2.5 21.5" />
        </svg>
      ),
      title: 'Premium Ingredients'
    },
    {
      icon: (
        <svg width={isMobile ? 40 : 60} height={isMobile ? 35 : 50} viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      ),
      title: 'Made with Love'
    },
    {
      icon: (
        <svg width={isMobile ? 40 : 60} height={isMobile ? 40 : 60} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 4c-1.5 0-2.5 1-2.5 2.5 0 .2 0 .4.1.6C8 7.3 7 8.5 7 10c0 .3 0 .6.1.8C5.8 11.3 5 12.5 5 14c0 1.7 1.3 3 3 3h8c1.7 0 3-1.3 3-3 0-1.5-.8-2.7-2.1-3.2.1-.2.1-.5.1-.8 0-1.5-1-2.7-2.6-2.9.1-.2.1-.4.1-.6C14.5 5 13.5 4 12 4z" />
          <path d="M7.5 17l1.5 5h6l1.5-5" />
          <line x1="9.5" y1="17" x2="10" y2="22" />
          <line x1="11.2" y1="17" x2="11.3" y2="22" />
          <line x1="12.8" y1="17" x2="12.7" y2="22" />
          <line x1="14.5" y1="17" x2="14" y2="22" />
        </svg>
      ),
      title: 'Wide Variety of Sweets'
    },
    {
      icon: (
        <svg width={isMobile ? 40 : 60} height={isMobile ? 35 : 50} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 12 20 22 4 22 4 12" />
          <rect x="2" y="7" width="20" height="5" />
          <line x1="12" y1="22" x2="12" y2="7" />
          <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
          <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
        </svg>
      ),
      title: 'Perfect for Any Occasion'
    }
  ]

  return (
    <section style={{
      width: '100%',
      padding: isMobile ? '0 15px' : '0 40px',
      boxSizing: 'border-box',
      marginTop: '-15px',
      position: 'relative',
      zIndex: 30
    }}>
      <div className="treat-container" style={{
        position: 'relative',
        width: '100%',
        minHeight: isMobile ? 'auto' : '750px',
        backgroundColor: isDark ? '#1e1e36' : 'white',
        borderRadius: isMobile ? '25px' : '45px',
        boxShadow: isDark ? '0 20px 40px rgba(0,0,0,0.3)' : '0 20px 40px rgba(0,0,0,0.05)',
        backgroundImage: isDark ? 'none' : 'url(images/treat.png)',
        backgroundSize: '100% auto',
        backgroundPosition: 'center 40px',
        backgroundRepeat: 'no-repeat',
        padding: isMobile ? '30px 15px' : '60px 40px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'visible'
      }}>

        <div className="left-images" style={{
          position: isMobile  ? 'relative' : 'absolute',
          left: isMobile  ? 'auto' : '-10px',
          bottom: isMobile  ? 'auto' : '38%',
          top: isMobile ? '0' : '470px',
          transform: isMobile  ? 'none' : 'translateY(-40%)',
          zIndex: 50,
          display: isMobile  ? 'none' : 'flex',
          flexDirection: isMobile || isTablet ? 'row' : 'column',
          alignItems: 'center',
          gap: isMobile || isTablet ? '0' : '100px',
          width: isMobile || isTablet ? '100%' : '200px',
          justifyContent: isMobile || isTablet ? 'center' : 'flex-start',
          marginBottom: isMobile || isTablet ? '15px' : '0',
          pointerEvents: 'none'
        }}>
          <img
            src="/images/crofflesDu.png"
            alt="Croffles"
            className="treat-side-img"
            style={{
              width: isMobile  ? '80px' : 'clamp(320px, 18vw, 320px)',
              height: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.15))',
              position: 'relative',
              right: isMobile || isTablet ? '0' : 'clamp(20px, 2vw, 30px)',
              top: isMobile || isTablet ? '0' : 'clamp(-285px, -18vw, -200px)',
              transform: isMobile || isTablet ? 'rotate(-5deg)' : 'none',
            }}
          />
          <img
            src="/images/Stcup.jpg"
            alt="Sweet Cup"
            className="treat-side-img"
            style={{
              width: isMobile ? '60px' : 'clamp(190px, 14vw, 230px)',
              left: isMobile ? '0' : 'clamp(29px, 2vw, 30px)',
              height: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.15))',
              transform: isMobile  ? 'rotate(5deg)' : 'rotate(9deg)',
              marginTop: isMobile ? '0' : 'clamp(-40px, -3vw, -25px)',
              position: 'relative',
              top: isMobile  ? '10px' : 'clamp(-269px, -16vw, -275px)',
            }}
          />
        </div>

        <div className="right-images" style={{
          position: isMobile || isTablet ? 'relative' : 'absolute',
          right: isMobile || isTablet ? 'auto' : '-40px',
          top: isMobile || isTablet ? 'auto' : '22%',
          bottom: isMobile || isTablet ? '0' : 'auto',
          transform: isMobile || isTablet ? 'none' : 'translateY(-50%)',
          zIndex: 50,
          display: isMobile || isTablet ? 'none' : 'flex',
          flexDirection: isMobile || isTablet ? 'row' : 'column',
          alignItems: 'center',
          gap: isMobile || isTablet ? '5px' : '5px',
          width: isMobile  ? '100%' : 'auto',
          justifyContent: isMobile ? 'center' : 'flex-start',
          marginTop: isMobile ? '15px' : '8px',
          pointerEvents: 'none'
        }}>
          <img
            src="/images/cheesecake.png"
            alt="Cheesecake"
            className="treat-side-img"
            style={{
              width: isMobile  ? '70px' : 'clamp(190px, 13vw, 220px)',
              height: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.15))',
              transform: isMobile ? 'rotate(3deg)' : 'rotate(-3deg)',
              marginTop: isMobile  ? '0' : 'clamp(-50px, -10vw, -100px)',

            }}
          />
          <img
            src="/images/spaghetti.png"
            alt="Spaghetti Dessert"
            className="treat-side-img"
            style={{
              width: isMobile  ? '65px' : 'clamp(180px, 14vw, 240px)',
              height: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.15))',
              transform: isMobile  ? 'rotate(-5deg)' : 'rotate(-9deg)',
              marginTop: isMobile  ? '0' : 'clamp(-20px, -1.5vw, -10px)',
              position: 'relative',
              right: isMobile  ? '0' : 'clamp(20px, 3vw, 40px)',
              top: isMobile ? '10px' : 'clamp(90px, 3vw, 50px)'
            }}
          />
        </div>

        <div style={{
          maxWidth: '1200px',
          width: '100%',
          textAlign: 'center',
          marginTop: isMobile || isTablet ? '0' : '-23px',
          position: 'relative',
          zIndex: 10
        }}>

          <h2 style={{
            fontSize: isMobile ? '28px' : '37px',
            fontWeight: 600,
            color: isDark ? '#f0f0f0' : '#562d00',
            fontFamily: 'Allura, sans-serif',
            margin: '0 0 15px 0'
          }}>
            Every Treat is Made to Delight!
          </h2>

          <p style={{
            fontSize: isMobile ? '14px' : '16px',
            color: isDark ? 'rgba(255,255,255,0.7)' : '#5f3f35',
            fontFamily: 'Poppins, sans-serif',
            lineHeight: 1.6,
            margin: '0 auto 50px auto',
            maxWidth: '700px',
            padding: isMobile ? '0 10px' : '0'
          }}>
            We craft every item with premium ingredients, rich flavors, and a lot of love.<br />
            From our creamy cups to our dreamy desserts, every bite is made to make you happy.
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: isMobile ? '20px' : '40px',
            marginBottom: '30px',
            flexWrap: isMobile ? 'wrap' : 'nowrap'
          }}>
            {features.map((feature, i) => (
              <div key={i} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                width: isMobile ? '45%' : 'auto'
              }}>
                <div style={{
                  width: isMobile ? '60px' : '90px',
                  height: isMobile ? '60px' : '90px',
                  minWidth: isMobile ? '60px' : '80px',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {[0, 30, 60, 90, 120, 150].map((deg) => (
                    <div key={deg} style={{
                      position: 'absolute',
                      width: isMobile ? '55px' : '83.6px',
                      height: isMobile ? '55px' : '83.6px',
                      backgroundColor: '#fa6193',
                      borderRadius: '12px',
                      transform: `rotate(${deg}deg)`,
                      boxSizing: 'border-box'
                    }} />
                  ))}
                  <div style={{
                    position: 'absolute',
                    width: isMobile ? '48px' : '72px',
                    height: isMobile ? '48px' : '72px',
                    backgroundColor: '#fa6193',
                    borderRadius: '50%',
                    zIndex: 1
                  }} />
                  <div style={{
                    position: 'absolute',
                    width: isMobile ? '54px' : '82px',
                    height: isMobile ? '54px' : '82px',
                    zIndex: 3,
                    pointerEvents: 'none'
                  }}>
                    {[0, 30, 60, 90, 120, 150].map((deg) => (
                      <div key={deg} style={{
                        position: 'absolute',
                        width: isMobile ? '54px' : '82px',
                        height: isMobile ? '54px' : '82px',
                        transform: `rotate(${deg}deg)`,
                      }}>
                        <div style={{
                          position: 'absolute',
                          top: '0',
                          left: '0',
                          width: isMobile ? '12px' : '18.5px',
                          height: isMobile ? '12px' : '18.5px',
                          borderTop: '2px solid white',
                          borderLeft: '2px solid white',
                          borderRadius: '12px 0 0 0'
                        }} />
                        <div style={{
                          position: 'absolute',
                          bottom: '0',
                          right: '0',
                          width: isMobile ? '12px' : '18.5px',
                          height: isMobile ? '12px' : '18.5px',
                          borderBottom: '2px solid white',
                          borderRight: '2px solid white',
                          borderRadius: '0 0 12px 0'
                        }} />
                      </div>
                    ))}
                  </div>
                  <div style={{
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {feature.icon}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'center' }}>
                  <h3 style={{
                    fontSize: isMobile ? '13px' : '16px',
                    fontWeight: 600,
                    color: isDark ? '#f0f0f0' : '#5D4037',
                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    margin: 0,
                    lineHeight: 1.3,
                    whiteSpace: 'pre-line'
                  }}>
                    {feature.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <h3 style={{
            fontSize: isMobile ? '28px' : '38px',
            fontWeight: 700,
            color: '#fa6193',
            fontFamily: "'Sacramento', 'Dancing Script', cursive",
            fontStyle: 'italic',
            margin: '0 0 15px 0'
          }}>
            So Many Ways to Indulge! ♡
          </h3>

          <p style={{
            fontSize: isMobile ? '14px' : '16px',
            color: isDark ? 'rgba(255,255,255,0.7)' : '#5D4037',
            fontFamily: 'Poppins, sans-serif',
            lineHeight: 1.6,
            margin: '0 auto',
            maxWidth: '600px',
            padding: isMobile ? '0 10px' : '0'
          }}>
            Whether you love something fruity, chocolatey, creamy, or crunchy –<br />
            we have the perfect treat waiting for you.
          </p>

          <ProductsSection />

          <div style={{ marginTop: '50px', width: '100%' }}>
            <div style={{
              backgroundColor: isDark ? '#2a2a4a' : '#fce4ec',
              borderRadius: '24px',
              border: `2px dashed ${isDark ? 'rgba(250,97,147,0.5)' : '#fa6193'}`,
              padding: '0',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: isDark
                ? '0 8px 32px rgba(0,0,0,0.3)'
                : '0 8px 32px rgba(250,97,147,0.15)',
            }}>
              <div style={{
                display: 'flex',
                animation: 'ticker-scroll 25s linear infinite',
                whiteSpace: 'nowrap',
                width: 'fit-content',
                padding: '20px 0',
                alignItems: 'center',
              }}>
                {[...Array(3)].map((_, i) => (
                  <div key={i} style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '60px',
                    paddingRight: '60px',
                  }}>
                    <span style={{
                      fontSize: 'clamp(16px, 2.5vw, 24px)',
                      fontWeight: 400,
                      color: '#fa6193',
                      fontFamily: "'Sacramento', 'Dancing Script', cursive",
                      fontStyle: 'italic',
                      flexShrink: 0,
                    }}>
                      ✦ Life is Sweet. Make it Sweeter! ✦
                    </span>

                    <img
                      src="/images/logo.png"
                      alt="Sweet Stop"
                      style={{
                        width: '40px',
                        height: '40px',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.2))',
                        flexShrink: 0,
                      }}
                    />

                    <span style={{
                      fontSize: 'clamp(12px, 1.8vw, 14px)',
                      color: isDark ? 'rgba(255,255,255,0.8)' : '#5D4037',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 500,
                      flexShrink: 0,
                    }}>
                      Treat yourself, share the joy!
                    </span>

                    <img
                      src="/images/logo.png"
                      alt="Sweet Stop"
                      style={{
                        width: '40px',
                        height: '40px',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.2))',
                        flexShrink: 0,
                      }}
                    />

                    <span style={{
                      fontSize: 'clamp(13px, 2vw, 16px)',
                      fontWeight: 700,
                      color: isDark ? '#f0f0f0' : '#5D4037',
                      fontFamily: 'Poppins, sans-serif',
                      flexShrink: 0,
                    }}>
                      You deserve something sweet! <span style={{ color: '#fa6193' }}>♡</span>
                    </span>

                    <img
                      src="/images/logo.png"
                      alt="Sweet Stop"
                      style={{
                        width: '40px',
                        height: '40px',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.2))',
                        flexShrink: 0,
                      }}
                    />
                  </div>
                ))}
              </div>

              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '80px',
                height: '100%',
                background: `linear-gradient(to right, ${isDark ? '#2a2a4a' : '#fce4ec'}, transparent)`,
                pointerEvents: 'none',
                zIndex: 2,
              }} />
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '80px',
                height: '100%',
                background: `linear-gradient(to left, ${isDark ? '#2a2a4a' : '#fce4ec'}, transparent)`,
                pointerEvents: 'none',
                zIndex: 2,
              }} />
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  )
}

export default EveryTreat