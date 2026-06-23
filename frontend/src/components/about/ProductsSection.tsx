import React, { useState, useEffect, useRef } from 'react'
import { useTheme } from '../../hooks/useTheme'

interface ProductCardProps {
  title: string
  description: string
  image: string
  fullWidth?: boolean
}

const ProductCard: React.FC<ProductCardProps> = ({ title, description, image, fullWidth = false }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
        paddingTop: '45px',
        width: '100%',
      }}
    >
      <div
        style={{
          position: 'relative',
          background: isDark ? '#2a2a4a' : '#fff8fa',
          border: isDark ? '1px solid rgba(255,255,255,0.1)' : '0.5px solid rgba(250,97,147,0.2)',
          borderRadius: '20px',
          padding: fullWidth ? '16px 24px 20px' : '12px 16px 18px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: isDark ? '0 2px 12px rgba(0,0,0,0.3)' : '0 2px 12px rgba(0,0,0,0.06)',
        }}
      >
        <div
          style={{
            width: fullWidth ? '110px' : '165px',
            height: fullWidth ? '110px' : '95px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: fullWidth ? '-55px' : '-45px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <img
            src={image}
            alt={title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.15))',
            }}
          />
        </div>

        <div style={{ marginTop: fullWidth ? '65px' : '55px', textAlign: 'center' }}>
          <h3
            style={{
              fontSize: fullWidth ? '18px' : '15px',
              fontWeight: 700,
              color: isDark ? '#f0f0f0' : '#5D4037',
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              margin: '0 0 6px 0',
              lineHeight: 1.2,
              whiteSpace: 'pre-line',
            }}
          >
            {title}
          </h3>
          <p
            style={{
              fontSize: fullWidth ? '14px' : '13px',
              color: isDark ? 'rgba(255,255,255,0.6)' : '#8D6E63',
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              margin: 0,
              lineHeight: 1.5,
              whiteSpace: 'pre-line',
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

const ProductsSection: React.FC = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')

  useEffect(() => {
    const checkScreen = () => {
      const width = window.innerWidth
      if (width < 640) setScreenSize('mobile')
      else if (width < 1024) setScreenSize('tablet')
      else setScreenSize('desktop')
    }
    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  const products = [
    {
      title: 'Fruits Cups',
      description: 'Fresh, juicy, and full of flavor!',
      image: 'images/fruits-cup.png'
    },
    {
      title: 'Ice Cream Cups',
      description: 'Creamy, dreamy, \nand oh so good!',
      image: 'images/ice-cream-cup.png'
    },
    {
      title: 'Mini DutchPancake',
      description: 'Bite-sized happiness\n in every piece!',
      image: 'images/mini-dutch.png'
    },
    {
      title: 'Cheesecake on a Stick',
      description: "Cheesecake like you've\n never had before!",
      image: 'images/cheesecake-stick.png'
    },
    {
      title: 'Spaghetti Crepes\n & Frozen Sweets',
      description: 'A unique twist on your\n favorite desserts!',
      image: 'images/spaghetti-crepes.png'
    },
    {
      title: 'Croffles',
      description: 'Crispy, chewy,\n and irresistibly tasty!',
      image: 'images/croffles.png'
    }
  ]

  const getGridStyle = () => {
    if (screenSize === 'mobile') {
      return {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px 12px',
        width: '100%',
      }
    }
    if (screenSize === 'tablet') {
      return {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px 16px',
        width: '100%',
      }
    }
    return {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '20px',
      width: '100%',
    }
  }

  return (
    <div
      style={{
        width: '100%',
        marginTop: 'clamp(30px, 5vw, 60px)',
        padding: 'clamp(20px, 3vw, 40px) 0 20px',
        borderTop: isDark
          ? '2px dashed rgba(250,97,147,0.3)'
          : '2px dashed rgba(250,97,147,0.2)',
      }}
    >
      <div style={{ ...getGridStyle(), paddingTop: '10px' }}>
        {products.map((product, i) => (
          <ProductCard
            key={i}
            title={product.title}
            description={product.description}
            image={product.image}
          />
        ))}
      </div>

      <div style={{
        marginTop: screenSize === 'mobile' ? '16px' : '24px',
        paddingTop: '10px',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <div style={{ width: screenSize === 'mobile' ? '50%' : '33.333%' }}>
          <ProductCard
            title="Cream Puffs"
            description="Light, fluffy, and filled with joy!"
            image="images/cream-puffs.png"
          />
        </div>
      </div>
    </div>
  )
}

export default ProductsSection