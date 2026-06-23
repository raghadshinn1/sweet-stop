import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { getCart, addToCart as addToCartApi, updateQuantity as updateQuantityApi, removeFromCart as removeFromCartApi, clearCart as clearCartApi } from '../api';

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  category?: string
}

export interface CartContextType {
  cart: CartItem[]
  cartItems: CartItem[]
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  addToCart: (item: CartItem) => Promise<void>
  updateQuantity: (id: string, delta: number) => Promise<void>
  removeFromCart: (id: string) => Promise<void>
  totalItems: number
  totalPrice: number
  generateOrderId: () => string
  clearCart: () => void
  loading: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  })
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  // Sync with Supabase when user logs in
  useEffect(() => {
    if (user) {
      syncCartWithBackend()
    }
  }, [user])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const syncCartWithBackend = async () => {
    try {
      setLoading(true)
      const response = await getCart()
      const items = response.data?.items || []
      const backendItems = items.map((item: any) => ({
        id: item.product,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        category: item.category
      }))
      setCart(backendItems)
    } catch (error) {
      console.error('Sync cart error:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (item: CartItem) => {
    try {
      setLoading(true)
      if (user) {
        await addToCartApi(item.id, 1)
        await syncCartWithBackend()
      } else {
        setCart(prev => {
          const existing = prev.find(i => i.id === item.id)
          if (existing) {
            return prev.map(i => 
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            )
          }
          return [...prev, item]
        })
      }
      setIsCartOpen(true)
    } catch (error) {
      console.error('Add to cart error:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (id: string, delta: number) => {
    try {
      setLoading(true)
      const item = cart.find(i => i.id === id);
      const currentQuantity = item?.quantity ?? 0;
      const newQuantity = currentQuantity + delta;

      if (user) {
        if (newQuantity <= 0) {
          await removeFromCartApi(id)
        } else {
          await updateQuantityApi(id, newQuantity)
        }
        await syncCartWithBackend()
      } else {
        setCart(prev => prev.map(item => {
          if (item.id === id) {
            return { ...item, quantity: Math.max(0, item.quantity + delta) }
          }
          return item
        }).filter(item => item.quantity > 0))
      }
    } catch (error) {
      console.error('Update quantity error:', error)
    } finally {
      setLoading(false)
    }
  }

  const removeFromCart = async (id: string) => {
    try {
      setLoading(true)
      if (user) {
        await removeFromCartApi(id)
        await syncCartWithBackend()
      } else {
        setCart(prev => prev.filter(item => item.id !== id))
      }
    } catch (error) {
      console.error('Remove from cart error:', error)
    } finally {
      setLoading(false)
    }
  }

  const clearCart = useCallback(() => {
    setCart([])
    if (user) {
      clearCartApi().catch(console.error)
    }
  }, [user])

  const generateOrderId = useCallback(() => {
    return 'order-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
  }, [])

  const totalItems = cart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{
      cart,
      cartItems: cart,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      updateQuantity,
      removeFromCart,
      totalItems,
      totalPrice,
      generateOrderId,
      clearCart,
      loading
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = (): CartContextType => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}