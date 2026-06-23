import React from 'react'
import { Plus } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import type { Product } from '../../types'

interface CategorySectionProps {
  category: {
    id: string
    title: string
    products: Product[]
  }
  onAddToCart: (product: Product) => void
}

const CategorySection: React.FC<CategorySectionProps> = ({ category, onAddToCart }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div style={{ marginBottom: '50px' }}>
      {/* العنوان */}
      <div style={{
        textAlign: 'center',
        marginBottom: '30px',
        position: 'relative'
      }}>
        <h2 style={{
          fontSize: 'clamp(24px, 4vw, 32px)',
          fontWeight: 800,
          color: isDark ? '#f0f0f0' : '#3E2723',
          fontFamily: "'Core Sans A', 'Poppins', sans-serif",
          margin: 0,
          display: 'inline-block',
          position: 'relative',
          padding: '0 20px',
          transition: 'color 0.3s',
        }}>
          {category.title}
        </h2>
        <div style={{
          width: '80px',
          height: '3px',
          background: '#f05584',
          borderRadius: '3px',
          margin: '10px auto 0'
        }} />
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '20px',
        padding: '0 10px'
      }}>
        {category.products.map((product) => (
          <div key={product._id} style={{
            background: isDark ? '#1e1e36' : 'white',
            borderRadius: '20px',
            padding: '16px 12px',
            textAlign: 'center',
            boxShadow: isDark ? '0 4px 15px rgba(0,0,0,0.3)' : '0 4px 15px rgba(0,0,0,0.06)',
            transition: 'all 0.3s ease',
            border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #fce4ec',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-6px)'
            e.currentTarget.style.boxShadow = isDark 
              ? '0 12px 30px rgba(0,0,0,0.4)' 
              : '0 12px 30px rgba(0,0,0,0.1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = isDark 
              ? '0 4px 15px rgba(0,0,0,0.3)' 
              : '0 4px 15px rgba(0,0,0,0.06)'
          }}
          >
            {/* صورة المنتج */}
            <div style={{
              width: '100%',
              height: '140px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: isDark 
                ? 'linear-gradient(135deg, #2a2a4a 0%, #1e1e36 100%)' 
                : 'linear-gradient(135deg, #FFF5F7 0%, #FCE4EC 100%)',
              borderRadius: '16px',
              padding: '10px',
              marginBottom: '4px',
              transition: 'background 0.3s',
            }}>
              <img
                 src={`/${product.images?.[0]}` || '/placeholder-product.png'} 
                  alt={product.name} 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  transition: 'transform 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              />
            </div>

            {/* اسم المنتج */}
            <h3 style={{
              fontSize: '13px',
              fontWeight: 700,
              color: isDark ? '#f0f0f0' : '#3E2723',
              fontFamily: 'Poppins, sans-serif',
              margin: 0,
              lineHeight: 1.3,
              minHeight: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textTransform: 'uppercase',
              transition: 'color 0.3s',
            }}>
              {product.name}
            </h3>

            {/* السعر */}
            <p style={{
              fontSize: '16px',
              fontWeight: 800,
              color: '#f05584',
              fontFamily: 'Poppins, sans-serif',
              margin: 0
            }}>
              ${product.price.toFixed(2)}
            </p>

            {/* زر الإضافة */}
            <button
              onClick={() => onAddToCart(product)}
              style={{
                width: '100%',
                background: '#f05584',
                color: 'white',
                border: 'none',
                padding: '10px',
                borderRadius: '14px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                transition: 'all 0.3s',
                fontFamily: 'Poppins, sans-serif',
                boxShadow: '0 4px 12px rgba(240, 85, 132, 0.25)',
                marginTop: 'auto'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#e05582'
                e.currentTarget.style.transform = 'scale(1.03)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f05584'
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              <Plus size={16} />
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategorySection