import React from 'react'
import { useTheme } from '../hooks/useTheme'
import HeaderBar from '../components/layout/HeaderBar'
import GalleryContent from '../components/gallery/GalleryContent'

const Gallery: React.FC = () => {
  const { theme } = useTheme()

  return (
    <div style={{
      minHeight: '100vh',
      background: theme === 'dark'
        ? 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)'
        : 'linear-gradient(180deg, #FFF5F7 0%, #FFE4EC 30%, #FFF0F5 60%, #FFE4EC 100%)',
      fontFamily: 'Poppins, sans-serif',
      transition: 'background 0.3s',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <HeaderBar />
      <GalleryContent />
    </div>
  )
}

export default Gallery