// src/types.ts
export interface Product {
  _id:  number ;
  id?: string;  // ✅ للـ backward compatibility
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  image?: string;  // ✅ للـ backward compatibility
  stock: number;
  ratings: number;
  numReviews: number;
  isFeatured: boolean;
  isActive: boolean;
}

export interface Category {
  id: string;
  name: string;
  title?: string;  // ✅ للـ backward compatibility
  products: Product[];
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    province?: string;
    postalCode?: string;
  };
}

export interface LoginData {
  accessToken: string;
  refreshToken: string;
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data: T;
  count?: number;
  total?: number;
  totalPages?: number;
  currentPage?: number;
}
export interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}