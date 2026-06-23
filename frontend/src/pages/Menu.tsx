import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import HeaderBar from '../components/layout/HeaderBar';
import CartSidebar from '../components/layout/CartSidebar';
import MenuHero from '../components/menu/MenuHero';
import CategorySection from '../components/menu/CategorySection';
import { useCart } from '../contexts/CartContext';
import { useProducts } from '../hooks/useProducts';
import { Product } from '../types';

interface CategoryGroup {
  id: string;
  title: string; 
  products: Product[];
}

const Menu: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');

  // ✅ Fetch products from backend
  const { products, loading, error } = useProducts('', searchQuery);

  // ✅ Group products by category and SORT by count (descending)
  const categories = useMemo<CategoryGroup[]>(() => {
    const groups: Record<string, CategoryGroup> = {};

    products.forEach((product) => {
      if (!groups[product.category]) {
        groups[product.category] = {
          id: product.category.toLowerCase().replace(/\s+/g, '-'),
          title: product.category, 
          products: []
        };
      }
      groups[product.category].products.push(product);
    });

   
    return Object.values(groups).sort((a, b) => b.products.length - a.products.length);
  }, [products]);

  // ✅ Filter by search - useMemo for performance
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;

    const query = searchQuery.toLowerCase();
    return categories
      .map((category) => ({
        ...category,
        products: category.products.filter((product) =>
          product.name.toLowerCase().includes(query)
        )
      }))
      .filter((category) => category.products.length > 0);
  }, [categories, searchQuery]);

  const handleAddToCart = (product: Product) => {

    const image = product.images?.[0] || '/placeholder-product.png';

    addToCart({
      id: String(product._id),        
      name: product.name,
      price: product.price,
      quantity: 1,
      image,
      category: product.category
    });
  };

  return (
    <div 
      style={{ 
        margin: 0, 
        padding: 0, 
        width: '100%', 
        minHeight: '100vh',
        background: isDark
          ? 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
          : '#f9dce0',
        transition: 'background 0.3s ease',
      }}
    >
      <HeaderBar />
      <MenuHero />

      {/* Search Bar */}
      <div style={{
        maxWidth: '600px',
        margin: '30px auto',
        padding: '0 24px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: isDark ? '#2a2a4a' : 'white',
          padding: '14px 22px',
          borderRadius: '50px',
          boxShadow: isDark 
            ? '0 4px 15px rgba(0,0,0,0.3)' 
            : '0 4px 15px rgba(0,0,0,0.08)',
          border: isDark 
            ? '2px solid rgba(250,97,147,0.3)' 
            : '2px solid #fce4ec',
          transition: 'all 0.3s ease',
        }}>
          <Search size={20} color="#f05584" />
          <input
            type="text"
            placeholder="Search our treats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: 'none',
              outline: 'none',
              fontSize: '16px',
              fontFamily: 'Poppins, sans-serif',
              color: isDark ? '#f0f0f0' : '#3E2723',
              width: '100%',
              background: 'transparent'
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                background: 'none',
                border: 'none',
                color: '#f05584',
                cursor: 'pointer',
                fontSize: '14px',
                fontFamily: 'Poppins, sans-serif'
              }}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div style={{
          textAlign: 'center',
          padding: '60px 24px',
          color: isDark ? 'rgba(255,255,255,0.5)' : '#999'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #fa6193',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p style={{ 
            fontSize: '18px', 
            fontFamily: 'Poppins, sans-serif',
            color: isDark ? 'rgba(255,255,255,0.7)' : '#666'
          }}>
            Loading treats...
          </p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div style={{
          textAlign: 'center',
          padding: '60px 24px',
          color: '#f05584'
        }}>
          <p style={{ 
            fontSize: '18px', 
            fontFamily: 'Poppins, sans-serif',
            marginBottom: '16px'
          }}>
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: '#fa6193',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '30px',
              cursor: 'pointer',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '14px'
            }}
          >
            Retry
          </button>
        </div>
      )}

      {/* Categories */}
      {!loading && !error && (
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px 60px'
        }}>
          {filteredCategories.map((category) => (
  <CategorySection
    key={category.id}
    category={category}
    onAddToCart={handleAddToCart}
  />
))}
          {filteredCategories.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '80px 24px',
              color: isDark ? 'rgba(255,255,255,0.5)' : '#999'
            }}>
              <Search size={48} strokeWidth={1.5} style={{ marginBottom: '16px', opacity: 0.5 }} />
              <p style={{
                fontSize: '18px',
                fontFamily: 'Poppins, sans-serif',
                color: isDark ? 'rgba(255,255,255,0.7)' : '#666'
              }}>
                {searchQuery 
                  ? `No treats found for "${searchQuery}". Try a different search!`
                  : 'No treats available. Check back later!'
                }
              </p>
            </div>
          )}
        </div>
      )}

      <CartSidebar />
    </div>
  );
};

export default Menu;