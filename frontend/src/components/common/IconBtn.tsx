import React from 'react'

interface IconBtnProps {
  onClick?: () => void
  title?: string
  children: React.ReactNode
}

export const IconBtn: React.FC<IconBtnProps> = ({ onClick, title, children }) => (
  <button
    onClick={onClick}
    title={title}
    style={{
      background: 'none',
      border: 'none',
      color: 'white',
      cursor: 'pointer',
      padding: '8px',
      borderRadius: '50%',
      transition: 'all 0.3s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = 'white'
      e.currentTarget.style.color = '#f05584'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = 'transparent'
      e.currentTarget.style.color = 'white'
    }}
  >
    {children}
  </button>
)

export default IconBtn
