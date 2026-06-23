import React, { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react'
import styles from './Auth.module.css'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
interface LoginFormData {
  email: string
  password: string
}

interface FormErrors {
  email?: string
  password?: string
}

const Login: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [generalError, setGeneralError] = useState('')

  // ✅ خذي المصدر اللي جاي منه المستخدم
  const from = (location.state as any)?.from || '/'
  const message = (location.state as any)?.message

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGeneralError('')
    
    if (!validate()) return
    
    setLoading(true)

    try {
      const result = await login(formData.email, formData.password)
      if (result.success) {
        // ✅ بعد ما يسجل دخول، رجعه للصفحة اللي كان فيها
        navigate(from, { replace: true })
      } else {
        setGeneralError(result.message || 'Login failed')
      }
    } catch (err: any) {
      setGeneralError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{
            fontFamily: "'Sacramento', cursive",
            fontSize: '42px',
            color: '#fa6193',
            margin: 0
          }}>
            Sweet Stop
          </h1>
          <p style={{
            color: '#5D4037',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '14px',
            marginTop: '5px'
          }}>
            Welcome back! 🍰
          </p>
        </div>

        {/* ✅ رسالة إذا جاي من Checkout */}
        {message && (
          <div style={{
            background: '#fff3e0',
            color: '#e65100',
            padding: '12px 16px',
            borderRadius: '10px',
            marginBottom: '20px',
            fontSize: '14px',
            fontFamily: 'Poppins, sans-serif',
            textAlign: 'center'
          }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#5D4037',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '14px',
              fontWeight: 500
            }}>
              Email
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#fa6193'
              }} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className={styles.input}
                style={{ paddingLeft: '42px' }}
              />
            </div>
            {errors.email && (
              <span style={{ color: '#e74c3c', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                {errors.email}
              </span>
            )}
          </div>

          {/* Password */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#5D4037',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '14px',
              fontWeight: 500
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#fa6193'
              }} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={styles.input}
                style={{ paddingLeft: '42px', paddingRight: '42px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#fa6193'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <span style={{ color: '#e74c3c', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                {errors.password}
              </span>
            )}
          </div>

          {/* Forgot Password */}
          <div style={{ textAlign: 'right', marginBottom: '20px' }}>
            <Link to="/forgot-password" style={{
              color: '#fa6193',
              fontSize: '13px',
              textDecoration: 'none',
              fontFamily: 'Poppins, sans-serif'
            }}>
              Forgot password?
            </Link>
          </div>

          {/* Error */}
          {generalError && <div className={styles.error}>{generalError}</div>}

          {/* Submit */}
          <button type="submit" disabled={loading} className={styles.btn}>
            {loading ? (
              <>
                <span className={styles.spinner} />
                Signing In...
              </>
            ) : (
              <>
                Sign In <ArrowRight size={18} style={{ marginLeft: '8px', verticalAlign: 'middle' }} />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          margin: '24px 0',
          gap: '12px'
        }}>
          <div style={{ flex: 1, height: '1px', background: '#fce4ec' }} />
          <span style={{ color: '#5D4037', fontSize: '13px', fontFamily: 'Poppins, sans-serif' }}>
            or
          </span>
          <div style={{ flex: 1, height: '1px', background: '#fce4ec' }} />
        </div>

       {/* Social Login - Google */}
<button
  type="button"
  onClick={async () => {
    setLoading(true)
    try {
      const { data: _data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'http://localhost:5175/auth/callback'
        }
      })
      if (error) {
        setGeneralError(error.message)
      }
    } catch (err: any) {
      setGeneralError(err.message || 'Google sign in failed')
    } finally {
      setLoading(false)
    }
  }}
  disabled={loading}
  style={{
    width: '100%',
    padding: '12px',
    borderRadius: '15px',
    border: '2px solid #fce4ec',
    background: 'white',
    color: '#5D4037',
    fontSize: '14px',
    fontFamily: 'Poppins, sans-serif',
    cursor: loading ? 'not-allowed' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.3s',
    opacity: loading ? 0.7 : 1
  }}
  onMouseEnter={(e) => {
    if (!loading) {
      e.currentTarget.style.background = '#fff5f7'
      e.currentTarget.style.borderColor = '#fa6193'
    }
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = 'white'
    e.currentTarget.style.borderColor = '#fce4ec'
  }}
>
  <img 
    src="https://www.google.com/favicon.ico" 
    alt="Google" 
    style={{ width: '18px', height: '18px' }} 
  />
  {loading ? 'Loading...' : 'Continue with Google'}
</button>
        {/* Footer */}
        <p style={{
          textAlign: 'center',
          marginTop: '24px',
          color: '#5D4037',
          fontSize: '14px',
          fontFamily: 'Poppins, sans-serif'
        }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#fa6193', fontWeight: 600, textDecoration: 'none' }}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login