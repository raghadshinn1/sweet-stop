// ============================================
// Sweet Stop - API (Supabase Ready)
// ============================================
import { supabase, getCurrentUser } from '../lib/supabase'

// ============ PRODUCTS ============
export const getProducts = async (params?: { category?: string; search?: string; page?: number; limit?: number }) => {
  let query = supabase
    .from('products')
    .select('*')
    .eq('is_active', true)

  if (params?.category) {
    query = query.eq('category', params.category)
  }
  if (params?.search) {
    query = query.ilike('name', `%${params.search}%`)
  }

  const { data, error } = await query.order('created_at', { ascending: false })
  if (error) throw error
  return { data: data || [] }
}

export const getFeatured = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_featured', true)
    .eq('is_active', true)
    .limit(6)
  if (error) throw error
  return { data: data || [] }
}

export const getProduct = async (id: string) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return { data }
}

export const getByCategory = async (category: string) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .eq('is_active', true)
  if (error) throw error
  return { data: data || [] }
}

// ============ AUTH ============
export const register = async (data: { name: string; email: string; password: string }) => {
  const { data: authData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: { name: data.name }
    }
  })
  if (error) throw error
  return { data: authData }
}

export const login = async (data: { email: string; password: string }) => {
  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password
  })
  if (error) throw error
  return { data: authData }
}

export const logout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export const getMe = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return { data: user }
}

export const updateProfile = async (data: { name?: string; phone?: string; address?: any }) => {
  const { data: updateData, error } = await supabase.auth.updateUser({
    data: {
      name: data.name,
      phone: data.phone,
      address: data.address
    }
  })
  if (error) throw error
  return { data: updateData.user }
}

// ============ CART ============
export const getCart = async () => {
  const user = await getCurrentUser()
  if (!user) return { data: { items: [] } }

  const { data, error } = await supabase
    .from('cart_items')
    .select('*, products(*)')
    .eq('user_id', user.id)
  if (error) throw error

  const items = (data || []).map((item: any) => ({
    product: item.product_id,
    name: item.products?.name || '',
    image: item.products?.images?.[0] || '',
    price: item.products?.price || 0,
    quantity: item.quantity,
    category: item.products?.category || ''
  }))

  return { data: { items } }
}

export const addToCart = async (productId: string, quantity: number = 1) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('Please login first')

  const { data: existing } = await supabase
    .from('cart_items')
    .select('*')
    .eq('user_id', user.id)
    .eq('product_id', productId)
    .single()

  if (existing) {
    const { error } = await supabase
      .from('cart_items')
      .update({ quantity: existing.quantity + quantity })
      .eq('id', existing.id)
    if (error) throw error
  } else {
    const { error } = await supabase
      .from('cart_items')
      .insert({ user_id: user.id, product_id: productId, quantity })
    if (error) throw error
  }

  return { success: true }
}

export const updateQuantity = async (productId: string, quantity: number) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('Please login first')

  if (quantity <= 0) {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', user.id)
      .eq('product_id', productId)
    if (error) throw error
  } else {
    const { error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('user_id', user.id)
      .eq('product_id', productId)
    if (error) throw error
  }

  return { success: true }
}

export const removeFromCart = async (productId: string) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('Please login first')

  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', user.id)
    .eq('product_id', productId)
  if (error) throw error

  return { success: true }
}

export const clearCart = async () => {
  const user = await getCurrentUser()
  if (!user) return

  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', user.id)
  if (error) throw error
}

// ============ ORDERS ============
export const createOrder = async (data: { items: any[]; shippingAddress: any; paymentMethod: string }) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('Please login first')

  const { data: order, error } = await supabase
    .from('orders')
    .insert({
      user_id: user.id,
      items: data.items,
      shipping_address: data.shippingAddress,
      payment_method: data.paymentMethod,
      status: 'pending',
      is_paid: false
    })
    .select()
    .single()
  if (error) throw error

  // Clear cart after order
  await clearCart()

  return { data: order }
}

export const getMyOrders = async () => {
  const user = await getCurrentUser()
  if (!user) return { data: [] }

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
  if (error) throw error

  return { data: data || [] }
}

export const getOrder = async (id: string) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return { data }
}

export const cancelOrder = async (id: string) => {
  const { error } = await supabase
    .from('orders')
    .update({ status: 'cancelled' })
    .eq('id', id)
  if (error) throw error
  return { success: true }
}

// ============ CONTACT ============
export const submitContact = async (data: { name: string; email: string; subject: string; message: string }) => {
  const { error } = await supabase
    .from('contacts')
    .insert(data)
  if (error) throw error
  return { success: true }
}

// ============ GALLERY ============
export const getGallery = async (params?: { page?: number; limit?: number }) => {
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(params?.limit || 20)
  if (error) throw error
  return { data: data || [] }
}

export const likePhoto = async (id: string) => {
  const { error } = await supabase.rpc('increment_gallery_likes', { photo_id: id })
  if (error) throw error
  return { success: true }
}

// ============ PAYMENT ============
export const getSavedCards = async () => {
  const user = await getCurrentUser()
  if (!user) return { data: [] }

  const { data, error } = await supabase
    .from('saved_cards')
    .select('*')
    .eq('user_id', user.id)
  if (error) throw error
  return { data: data || [] }
}

export const saveCard = async (data: any) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('Please login first')

  const { error } = await supabase
    .from('saved_cards')
    .insert({ ...data, user_id: user.id })
  if (error) throw error
  return { success: true }
}

export const deleteCard = async (id: string) => {
  const { error } = await supabase
    .from('saved_cards')
    .delete()
    .eq('id', id)
  if (error) throw error
  return { success: true }
}

// ============ ADMIN ============
export const getAdminStats = async () => {
  const { data: orders } = await supabase.from('orders').select('total_price')
  const { data: users } = await supabase.from('profiles').select('*')
  const { data: products } = await supabase.from('products').select('*')
  

  return {
    data: {
      totalOrders: orders?.length || 0,
      totalRevenue: orders?.reduce((sum: number, o: any) => sum + (o.total_price || 0), 0) || 0,
      totalUsers: users?.length || 0,
      totalProducts: products?.length || 0
    }
  }
}

export const getRecentOrders = async () => {
  const { data, error } = await supabase
    .from('orders')
    .select('*, profiles(name)')
    .order('created_at', { ascending: false })
    .limit(10)
  if (error) throw error

  const formatted = (data || []).map((order: any) => ({
    _id: order.id,
    customerName: order.profiles?.name || 'Unknown',
    total: order.total_price || 0,
    status: order.status,
    createdAt: order.created_at
  }))
  

  return { data: formatted }
}