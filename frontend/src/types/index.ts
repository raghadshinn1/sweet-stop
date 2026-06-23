// ============ USER ============
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  phone?: string;
  address?: Address;
}

export interface Address {
  street: string;
  city: string;
  province: string;
  postalCode: string;
}

// ============ PRODUCT ============
export interface Product {
  _id: string;
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  image?: string;
  stock: number;
  ratings: number;
  numReviews: number;
  isFeatured: boolean;
  isActive: boolean;
  reviews?: Review[];
}

export interface Review {
  user: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// ============ CART ============
export interface CartItem {
  id: string;
  product?: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  category?: string;
}

export interface Cart {
  user: string;
  items: CartItem[];
  coupon?: {
    code: string;
    discount: number;
    discountType: 'percentage' | 'fixed';
  };
  itemsPrice: number;
  discountAmount: number;
  totalPrice: number;
}

// ============ ORDER ============
export interface Order {
  _id: string;
  user: string;
  orderItems: CartItem[];
  shippingAddress: Address & { phone: string };
  paymentMethod: 'card' | 'cash' | 'pickup';
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
}

// ============ API ============
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  count?: number;
  total?: number;
  totalPages?: number;
  currentPage?: number;
}

// ============ AUTH ============
export interface LoginData {
  accessToken: string;
  refreshToken: string;
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

// ============ SUPABASE AUTH ============
export interface SupabaseUser {
  id: string;
  email: string;
  user_metadata?: {
    name?: string;
    phone?: string;
    address?: Address;
  };
}
// ============ WINDOW ============
export interface WindowSize {
  width: number;
  height: number;
}