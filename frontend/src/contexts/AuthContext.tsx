import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// ============ Types ============
export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    province?: string;
    postalCode?: string;
  };
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; message?: string }>;
}

// ============ Context ============
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Check current user on mount + listen for changes
  useEffect(() => {
    const initAuth = async () => {
      const { data: _data, error } = await supabase.auth.getUser();
      
      if (error) {
        console.error('Auth init error:', error.message);
        setLoading(false);
        return;
      }

      const supabaseUser = _data?.user;
      
      if (supabaseUser) {
        setUser({
          id: supabaseUser.id,
          email: supabaseUser.email!,
          name: supabaseUser.user_metadata?.name || '',
          phone: supabaseUser.user_metadata?.phone || '',
          address: supabaseUser.user_metadata?.address || {},
        });
      }
      setLoading(false);
    };

    initAuth();

    // 🔥 Listen for auth state changes (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata?.name || '',
          phone: session.user.user_metadata?.phone || '',
          address: session.user.user_metadata?.address || {},
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // ✅ LOGIN
  const login = async (email: string, password: string) => {
    try {
      const { data: _data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          return { success: false, message: 'Invalid email or password' };
        }
        throw error;
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, message: err.message || 'Login failed' };
    }
  };

  // ✅ REGISTER
  const register = async (name: string, email: string, password: string) => {
    try {
      const { data: _data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      });

      if (error) throw error;

      return { success: true, message: 'Account created! Please check your email to confirm.' };
    } catch (err: any) {
      if (err.message.includes('already registered')) {
        return { success: false, message: 'This email is already registered' };
      }
      return { success: false, message: err.message || 'Registration failed' };
    }
  };

  // ✅ LOGOUT
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // ✅ UPDATE PROFILE — تحدّث الـ user state داخل الـ context
  const updateProfile = async (data: Partial<User>) => {
    try {
      const { data: _data, error } = await supabase.auth.updateUser({
        data: {
          name: data.name,
          phone: data.phone,
          address: data.address,
        },
      });

      if (error) throw error;

      // ✅ حدّث الـ user state مباشرة
      setUser(prev => prev ? { ...prev, ...data } : null);

      return { success: true };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

// ============ Hook ============
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};