import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ShoppingCart, Menu as MenuIcon, X, Sun, Moon, User, ChevronDown, Package, Settings, LogOut } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { useCart } from '../../contexts/CartContext'
import { useWindowSize } from '../../hooks/useWindowSize'
import { NAV_ITEMS } from '../../constants'
import IconBtn from '../common/IconBtn'


 import { useAuth } from '../../contexts/AuthContext'

const HeaderBar: React.FC = () => {
  const { width } = useWindowSize()
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  const { totalItems, setIsCartOpen } = useCart()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  
   const { user, logout } = useAuth()

  
  const isMobile = width < 768
  const isTablet = width >= 768 && width < 1024
  const headerBg = isDark ? '#2f2f4e' : '#f05584'

  const handleLogout = () => {
    logout() 
    setProfileOpen(false)
    navigate('/login')
  }

  const scrollToFooter = () => {
    const footer = document.getElementById('contact-footer')
    if (footer) footer.scrollIntoView({ behavior: 'smooth' })
  }

  const handleContactClick = () => {
    if (location.pathname === '/') {
      // already on home — just scroll
      scrollToFooter()
    } else {
      // go home first, then scroll once the page has rendered
      navigate('/')
      setTimeout(() => {
        scrollToFooter()
      }, 300)
    }
  }

  return (
    <header style={{
      backgroundColor: headerBg,
      width: '100%',
      padding: isMobile ? '0 16px' : '0 32px',
      height: isMobile ? '56px' : '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxSizing: 'border-box',
      transition: 'background-color 0.3s',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      {!isMobile && !isTablet ? (
        <nav style={{ display: 'flex', gap: '4px', flex: 1, justifyContent: 'center' }}>
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.href
            const isContact = item.href === '/contact'

            if (isContact) {
              return (
                <button
                  key={item.label}
                  onClick={handleContactClick}
                  style={{
                    padding: '8px 20px',
                    borderRadius: '30px',
                    fontSize: '15px',
                    fontWeight: 500,
                    color: 'white',
                    backgroundColor: 'transparent',
                    transition: 'all 0.25s',
                    fontFamily: 'Poppins, sans-serif',
                    whiteSpace: 'nowrap',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.18)' }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent' }}
                >
                  {item.label}
                </button>
              )
            }

            return (
              <Link
                key={item.label}
                to={item.href}
                style={{
                  padding: '8px 20px',
                  borderRadius: '30px',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#f05584' : 'white',
                  backgroundColor: isActive ? '#fff' : 'transparent',
                  transition: 'all 0.25s',
                  fontFamily: 'Poppins, sans-serif',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.18)'
                    e.currentTarget.style.color = 'white'
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = 'white'
                  }
                }}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      ) : (
        <div style={{ flex: 1 }} />
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
        <IconBtn onClick={toggleTheme} title={isDark ? 'Light mode' : 'Dark mode'}>
          {isDark ? <Sun size={17} /> : <Moon size={17} />}
        </IconBtn>
        <IconBtn onClick={() => setIsCartOpen(true)} title="Cart">
          <div style={{ position: 'relative' }}>
            <ShoppingCart size={17} />
            {totalItems > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-10px',
                background: '#3E2723',
                color: 'white',
                borderRadius: '50%',
                width: '16px',
                height: '16px',
                fontSize: '10px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Poppins, sans-serif'
              }}>
                {totalItems}
              </span>
            )}
          </div>
        </IconBtn>

        {/* ============================================================ */}
        {/* USER MENU - تغيير الشكل حسب حالة الـ Login */}
        {/* ============================================================ */}
        {user ? (
          /* ====== ✅ مسجل دخول - زر باسم المستخدم + Dropdown ====== */
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                borderRadius: '30px',
                padding: isMobile ? '6px 10px' : '8px 16px',
                color: 'white',
                cursor: 'pointer',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '14px',
              }}
            >
              <User size={isMobile ? 16 : 18} />
              {!isMobile && <span>{user.name || 'My Account'}</span>}
              <ChevronDown size={14} style={{ 
                transform: profileOpen ? 'rotate(180deg)' : 'rotate(0)',
                transition: 'transform 0.3s'
              }} />
            </button>

            {profileOpen && (
              <>
                {/* Overlay - بسكر لما تضغط برا */}
                <div 
                  style={{ position: 'fixed', inset: 0, zIndex: -1 }}
                  onClick={() => setProfileOpen(false)}
                />
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  background: isDark ? '#2f2f4e' : 'white',
                  borderRadius: '16px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                  minWidth: '200px',
                  overflow: 'hidden',
                  zIndex: 200,
                }}>
                  {/* معلومات المستخدم */}
                  <div style={{ 
                    padding: '16px', 
                    borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#fce4ec'}` 
                  }}>
                    <p style={{ margin: 0, fontWeight: 'bold', color: isDark ? 'white' : '#3E2723', fontSize: '14px' }}>
                      {user.name || 'User'}
                    </p>
                    <p style={{ margin: '4px 0 0', color: isDark ? '#aaa' : '#666', fontSize: '12px' }}>
                      {user.email}
                    </p>
                  </div>
                  
                  {/* روابط */}                  
                  <Link to="/orders" style={dropdownItemStyle(isDark)} onClick={() => setProfileOpen(false)}>
                    <Package size={16} color="#fa6193" />
                    <span>My Orders</span>
                  </Link>
                  
                  <Link to="/payment-methods" style={dropdownItemStyle(isDark)} onClick={() => setProfileOpen(false)}>
                    <Settings size={16} color="#fa6193" />
                    <span>Payment Methods</span>
                  </Link>
                  
                  {/* Logout */}
                  <button onClick={handleLogout} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    color: '#e74c3c',
                    background: 'none',
                    border: 'none',
                    borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#fce4ec'}`,
                    width: '100%',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontFamily: 'Poppins, sans-serif',
                  }}>
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          /* ====== ❌ مش مسجل دخول - IconBtn + Login/Sign Up ====== */
          <div style={{ position: 'relative' }}>
            <IconBtn onClick={() => setUserMenuOpen(!userMenuOpen)} title="Account">
              <User size={17} />
            </IconBtn>
            
            {userMenuOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                background: isDark ? '#2f2f4e' : 'white',
                borderRadius: '16px',
                padding: '8px',
                minWidth: '160px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                zIndex: 101
              }}>
                <button
                  onClick={() => { setUserMenuOpen(false); navigate('/login') }}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '12px',
                    border: 'none',
                    background: 'transparent',
                    color: isDark ? 'white' : '#5D4037',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '14px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.1)' : '#fce4ec'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  Login
                </button>
                <button
                  onClick={() => { setUserMenuOpen(false); navigate('/register') }}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '12px',
                    border: 'none',
                    background: '#fa6193',
                    color: 'white',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '14px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontWeight: 600
                  }}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        )}
        {/* ============================================================ */}

        {(isMobile || isTablet) && (
          <IconBtn onClick={() => setMenuOpen(o => !o)}>
            {menuOpen ? <X size={19} /> : <MenuIcon size={19} />}
          </IconBtn>
        )}
      </div>

      {menuOpen && (isMobile || isTablet) && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: headerBg,
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          zIndex: 49,
          animation: 'slideDown 0.3s ease'
        }}>
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.href
            const isContact = item.href === '/contact'

            if (isContact) {
              return (
                <button
                  key={item.label}
                  onClick={() => { setMenuOpen(false); handleContactClick() }}
                  style={{
                    padding: '12px 20px',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    fontFamily: 'Poppins, sans-serif',
                    textAlign: 'center',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {item.label}
                </button>
              )
            }

            return (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  padding: '12px 20px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontWeight: isActive ? 700 : 600,
                  color: isActive ? '#f05584' : 'white',
                  backgroundColor: isActive ? '#fff' : 'rgba(255,255,255,0.1)',
                  fontFamily: 'Poppins, sans-serif',
                  textAlign: 'center',
                }}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  )
}

// Helper style
const dropdownItemStyle = (isDark: boolean): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '10px 16px',
  color: isDark ? 'white' : '#5D4037',
  textDecoration: 'none',
  fontSize: '14px',
  fontFamily: 'Poppins, sans-serif',
  borderRadius: '8px',
  transition: 'background 0.2s',
})

export default HeaderBar