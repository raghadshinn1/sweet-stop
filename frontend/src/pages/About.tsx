import React from 'react'
import { useTheme } from '../hooks/useTheme'
import HeaderBar from '../components/layout/HeaderBar'
import AboutHero from '../components/about/AboutHero'
import EveryTreat from '../components/about/EveryTreat'

const About: React.FC = () => {
  const { theme } = useTheme()

  return (
    <div style={{
      margin: 0,
      padding: 0,
      width: '100%',
      background: theme === 'dark'
        ? 'linear-gradient(180deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)'
        : 'linear-gradient(180deg, #f7e5e5 0%, #fce4ec 40%, #fd6f99 100%)',
      minHeight: '100vh',
      overflowX: 'hidden'
    }}>
      <HeaderBar />
      <AboutHero />
      <EveryTreat />
    </div>
  )
}

export default About