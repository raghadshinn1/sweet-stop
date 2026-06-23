import React, { useEffect, useState } from 'react'
import './ScrollTrophy.css'

const ScrollTrophy: React.FC = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ✅ دوران بنسبة السكرول
  const translateY = scrollY * 0.15
  const rotate = scrollY * 0.791

  return (
    <div 
      className="scroll-trophy"
      style={{
        transform: `translateY(${translateY}px) rotate(${rotate}deg)`
      }}
    >
      🏆
    </div>
  )
}

export default ScrollTrophy