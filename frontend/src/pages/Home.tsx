import React from 'react'
import { useTheme } from '../hooks/useTheme'
import HeaderBar from '../components/layout/HeaderBar'
import Footer from '../components/layout/Footer'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import Treats from '../components/home/Treats'


const Home: React.FC = () => {
  const { theme } = useTheme()

  return (
    <div style={{
      margin: 0,
      padding: 0,
      width: '100%',
      backgroundColor: theme === 'dark' ? '#0f0f1a' : '#f9dce0',
      transition: 'background-color 0.3s',
      minHeight: '100vh'
    }}>
      
      <HeaderBar />
      <Hero />
      <Features />
      <Treats />
      <Footer />
    </div>
  )
}

export default Home