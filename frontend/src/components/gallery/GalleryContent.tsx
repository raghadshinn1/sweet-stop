import React, { useState, useEffect, useMemo } from 'react'
import { Mail, Camera, Sparkles, Heart, ArrowRight } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { copyToClipboard } from '../../utils/helpers'

const FloatingParticles: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const emojis = ['🍰', '🧁', '🍩', '🍪', '🎂', '🍭', '✨', '💖', '🍫', '🍬', '🍦', '🥐', '🍯', '🌸', '⭐', '🎀']

  const particles = useMemo(() => Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: `${(i * 37 + i * i * 7) % 100}%`,
    top: `${(i * 41 + i * i * 3) % 100}%`,
    size: (i % 4) * 6 + 10,
    delay: (i % 8) * 1.5,
    duration: (i % 6) * 2 + 10,
    emoji: emojis[i % emojis.length]
  })), [])

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 0,
    }}>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: p.left,
            top: p.top,
            fontSize: `${p.size}px`,
            opacity: isDark ? 0.1 : 0.18,
            animation: `floatParticle ${p.duration}s ease-in-out ${p.delay}s infinite`,
            filter: isDark ? 'brightness(1.5)' : 'none',
          }}
        >
          {p.emoji}
        </div>
      ))}
      <style>{`
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-30px) rotate(5deg); }
          50% { transform: translateY(-15px) rotate(-5deg); }
          75% { transform: translateY(-40px) rotate(3deg); }
        }
      `}</style>
    </div>
  )
}

const GalleryContent: React.FC = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const email = 'Sweetstopyeg@gmail.com'
  const [copied, setCopied] = useState(false)
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  const funnyMessages = [
    "📸 Your pics = Our happiness!",
    "🍰 Send a photo, get a surprise!",
    "🎁 Every pic = A chance to win!",
    "💝 Share your sweet moments!"
  ]

  const [currentMsg, setCurrentMsg] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMsg((prev) => (prev + 1) % funnyMessages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setIsVisible(true)
    })
    return () => cancelAnimationFrame(timer)
  }, [])

  const handleCopyEmail = async () => {
    const success = await copyToClipboard(email)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const steps = [
    { icon: <Camera size={32} />, title: 'Snap It', desc: 'Take a photo of your treat' },
    { icon: <Heart size={32} />, title: 'Tag It', desc: 'Write your name on it' },
    { icon: <Mail size={32} />, title: 'Send It', desc: 'Email it to us' },
    { icon: <Sparkles size={32} />, title: 'Enjoy It', desc: 'Wait for your surprise!' },
  ]

  const cardBg = isDark ? 'rgba(30, 30, 54, 0.8)' : 'rgba(255, 255, 255, 0.9)'
  const glassBorder = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(240, 85, 132, 0.2)'
  const subTextColor = isDark ? 'rgba(255,255,255,0.7)' : '#555555'

  return (
    <>
      <FloatingParticles isDark={isDark} />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 20px 60px',
          minHeight: 'calc(100vh - 64px)',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease-out',
        }}
      >
        <h1 style={{
          fontSize: 'clamp(36px, 8vw, 64px)',
          fontWeight: 900,
          color: isDark ? '#f0f0f0' : '#3E2723',
          marginBottom: '8px',
          textAlign: 'center',
          lineHeight: 1.1,
          transition: 'color 0.3s',
        }}>
          Sweet Stop{' '}
          <span style={{
            background: 'linear-gradient(135deg, #f05584, #fa6193, #F8B500)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Gallery
          </span>
        </h1>

        <div style={{
          height: '36px',
          marginBottom: '48px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <p
            key={currentMsg}
            style={{
              fontSize: '18px',
              fontWeight: 600,
              color: '#fa6193',
              margin: 0,
              animation: 'slideIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {funnyMessages[currentMsg]}
          </p>
        </div>

        <div style={{
          maxWidth: '680px',
          width: '100%',
          background: cardBg,
          borderRadius: '32px',
          padding: '48px 40px',
          textAlign: 'center',
          boxShadow: isDark
            ? '0 25px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)'
            : '0 25px 80px rgba(240, 85, 132, 0.15), 0 0 0 1px rgba(240, 85, 132, 0.1)',
          border: `1px solid ${glassBorder}`,
          position: 'relative',
          overflow: 'hidden',
          backdropFilter: 'blur(20px)',
          transition: 'all 0.3s',
        }}>
          <div style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(240, 85, 132, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-80px',
            left: '-80px',
            width: '160px',
            height: '160px',
            background: 'radial-gradient(circle, rgba(248, 181, 0, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }} />

          <div style={{
            position: 'absolute',
            top: 0,
            left: '10%',
            right: '10%',
            height: '4px',
            background: 'linear-gradient(90deg, transparent, #f05584, #F8B500, #f05584, transparent)',
            borderRadius: '2px',
          }} />

          <div style={{ fontSize: '40px', marginBottom: '20px', filter: 'drop-shadow(0 4px 8px rgba(240, 85, 132, 0.2))' }}>
            ✨ 🧁 ✨
          </div>

          <h2 style={{
            fontSize: 'clamp(22px, 4vw, 28px)',
            fontWeight: 800,
            color: '#f05584',
            marginBottom: '24px',
            lineHeight: 1.3,
          }}>
            Want to see yourself here?
          </h2>

          <p style={{
            fontSize: '16px',
            color: subTextColor,
            lineHeight: 1.8,
            marginBottom: '16px',
            maxWidth: '480px',
            margin: '0 auto 16px',
            transition: 'color 0.3s',
          }}>
            Easy peasy! 📸 Snap a pic of your treat (before you eat it 😄),
            write your name on it, and send it our way!
          </p>

          <p style={{
            fontSize: '16px',
            color: subTextColor,
            marginBottom: '6px',
            transition: 'color 0.3s',
          }}>
            <strong style={{ color: '#fa6193', fontSize: '18px' }}>
              And wait for the surprise... 🎁
            </strong>
          </p>

          <p style={{
            fontSize: '13px',
            color: isDark ? 'rgba(255,255,255,0.35)' : '#bbbbbb',
            fontStyle: 'italic',
            marginBottom: '36px',
          }}>
            (But not right now... patience is a virtue 😏)
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '12px',
            marginBottom: '36px',
          }}>
            {steps.map((step, i) => (
              <div
                key={step.title}
                onMouseEnter={() => setHoveredStep(i)}
                onMouseLeave={() => setHoveredStep(null)}
                style={{
                  background: hoveredStep === i
                    ? 'linear-gradient(135deg, #f05584, #fa6193)'
                    : isDark ? 'rgba(255,255,255,0.05)' : 'rgba(240, 85, 132, 0.05)',
                  borderRadius: '16px',
                  padding: '16px 8px',
                  transition: 'all 0.3s ease',
                  transform: hoveredStep === i ? 'translateY(-4px)' : 'translateY(0)',
                  cursor: 'default',
                }}
              >
                <div style={{
                  color: hoveredStep === i ? 'white' : '#f05584',
                  marginBottom: '8px',
                  display: 'flex',
                  justifyContent: 'center',
                  transition: 'color 0.3s',
                }}>
                  {step.icon}
                </div>
                <p style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: hoveredStep === i ? 'white' : (isDark ? '#f0f0f0' : '#3E2723'),
                  margin: '0 0 4px 0',
                  transition: 'color 0.3s',
                }}>
                  {step.title}
                </p>
                <p style={{
                  fontSize: '11px',
                  color: hoveredStep === i ? 'rgba(255,255,255,0.8)' : (isDark ? 'rgba(255,255,255,0.5)' : '#888888'),
                  margin: 0,
                  lineHeight: 1.3,
                  transition: 'color 0.3s',
                }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{
            background: isDark ? 'rgba(255,255,255,0.03)' : 'linear-gradient(135deg, rgba(255,245,247,0.8), rgba(255,228,236,0.8))',
            borderRadius: '20px',
            padding: '28px',
            border: `2px dashed ${isDark ? 'rgba(240, 85, 132, 0.4)' : '#fa6193'}`,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(240, 85, 132, 0.05) 0%, transparent 50%)',
              pointerEvents: 'none',
            }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' }}>
              <Mail size={18} color="#f05584" />
              <span style={{
                color: '#f05584',
                fontWeight: 700,
                fontSize: '15px',
              }}>
                Send your photos to:
              </span>
            </div>

            <span style={{
              color: '#fa6193',
              fontSize: 'clamp(15px, 3vw, 24px)',
              wordBreak: 'break-all',
              fontWeight: 900,
              letterSpacing: '0.5px',
              direction: 'ltr',
              fontFamily: 'monospace',
              position: 'relative',
            }}>
              {email}
            </span>

            <button
              onClick={handleCopyEmail}
              style={{
                marginTop: '4px',
                background: copied
                  ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                  : 'linear-gradient(135deg, #f05584, #fa6193)',
                color: 'white',
                border: 'none',
                padding: '14px 36px',
                borderRadius: '50px',
                fontSize: '15px',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'Poppins, sans-serif',
                transition: 'all 0.3s',
                boxShadow: copied
                  ? '0 4px 20px rgba(34, 197, 94, 0.3)'
                  : '0 4px 20px rgba(240, 85, 132, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                if (!copied) {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(240, 85, 132, 0.4)'
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.boxShadow = copied
                  ? '0 4px 20px rgba(34, 197, 94, 0.3)'
                  : '0 4px 20px rgba(240, 85, 132, 0.3)'
              }}
            >
              {copied ? 'Copied! ✓' : 'Copy Email'}
              {!copied && <ArrowRight size={16} />}
            </button>
          </div>
        </div>

        <div style={{
          marginTop: '32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}>
          <p style={{
            color: isDark ? 'rgba(255,255,255,0.3)' : '#cccccc',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <span style={{ animation: 'pulse 2s ease infinite', display: 'inline-block' }}>👀</span>
            Coming soon...
          </p>
          <div style={{
            width: '40px',
            height: '3px',
            background: 'linear-gradient(90deg, transparent, #fa6193, transparent)',
            borderRadius: '2px',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(25px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
      `}</style>
    </>
  )
}

export default GalleryContent