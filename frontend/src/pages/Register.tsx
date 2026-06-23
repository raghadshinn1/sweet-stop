import React, { useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react'
import styles from './Auth.module.css'
import { useAuth } from '../contexts/AuthContext'

interface FormData {
  name: string
  email: string
  password: string
  confirmPassword: string
  agreeTerms: boolean
}

interface FormErrors {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
  agreeTerms?: string
}

const Register: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { register } = useAuth() 
  const [formData, setFormData] = useState<FormData>({  
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  })
  const [errors, setErrors] = useState<FormErrors>({})  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [generalError, setGeneralError] = useState('')
  const [success, setSuccess] = useState(false)

  const from = (location.state as any)?.from || '/'

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required'
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase and number'
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {  
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const getPasswordStrength = (): { label: string; color: string } => {
    const { password } = formData
    if (!password) return { label: '', color: '' }
    if (password.length < 6) return { label: 'Weak', color: '#e74c3c' }
    if (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(password) && password.length >= 8) {
      return { label: 'Strong', color: '#27ae60' }
    }
    return { label: 'Medium', color: '#f39c12' }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGeneralError('')
    setSuccess(false)
    
    if (!validate()) return
    
    setLoading(true)

    try {
      const result = await register(formData.name, formData.email, formData.password)
      if (result.success) {
        setSuccess(true)
        setTimeout(() => navigate(from, { replace: true }), 1500)
      } else {
        setGeneralError(result.message || 'Registration failed')
      }
    } catch (err: any) {
      setGeneralError(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const passwordStrength = getPasswordStrength()

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
            Create your account 🍰
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div style={{
            background: '#d4edda',
            color: '#155724',
            padding: '16px',
            borderRadius: '15px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '14px',
            animation: 'fadeIn 0.5s ease'
          }}>
            <CheckCircle2 size={20} />
            Account created successfully! Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#5D4037',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '14px',
              fontWeight: 500
            }}>
              Full Name
            </label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#fa6193'
              }} />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={styles.input}
                style={{ paddingLeft: '42px' }}
              />
            </div>
            {errors.name && (
              <span style={{ color: '#e74c3c', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                {errors.name}
              </span>
            )}
          </div>

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
          <div style={{ marginBottom: '16px' }}>
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
                placeholder="Min 6 characters"
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
            {formData.password && (
              <div style={{ marginTop: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  flex: 1,
                  height: '4px',
                  background: '#fce4ec',
                  borderRadius: '2px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: passwordStrength.label === 'Strong' ? '100%' : passwordStrength.label === 'Medium' ? '66%' : '33%',
                    height: '100%',
                    background: passwordStrength.color,
                    transition: 'all 0.3s'
                  }} />
                </div>
                <span style={{ fontSize: '12px', color: passwordStrength.color, fontFamily: 'Poppins, sans-serif' }}>
                  {passwordStrength.label}
                </span>
              </div>
            )}
            {errors.password && (
              <span style={{ color: '#e74c3c', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                {errors.password}
              </span>
            )}
          </div>

          {/* Confirm Password */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#5D4037',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '14px',
              fontWeight: 500
            }}>
              Confirm Password
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
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat password"
                className={styles.input}
                style={{ paddingLeft: '42px', paddingRight: '42px' }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <span style={{ color: '#e74c3c', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                {errors.confirmPassword}
              </span>
            )}
          </div>

          {/* Terms Checkbox */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              cursor: 'pointer',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '13px',
              color: '#5D4037'
            }}>
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                style={{ marginTop: '3px', accentColor: '#fa6193' }}
              />
              <span>
                I agree to the{' '}
                <Link to="/terms" style={{ color: '#fa6193', textDecoration: 'none' }}>
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" style={{ color: '#fa6193', textDecoration: 'none' }}>
                  Privacy Policy
                </Link>
              </span>
            </label>
            {errors.agreeTerms && (
              <span style={{ color: '#e74c3c', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                {errors.agreeTerms}
              </span>
            )}
          </div>

          {/* Error */}
          {generalError && <div className={styles.error}>{generalError}</div>}

          {/* Submit */}
          <button type="submit" disabled={loading || success} className={styles.btn}>
            {loading ? (
              <>
                <span className={styles.spinner} />
                Creating Account...
              </>
            ) : (
              <>
                Sign Up <ArrowRight size={18} style={{ marginLeft: '8px', verticalAlign: 'middle' }} />
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

        {/* Social Login */}
        <button style={{
          width: '100%',
          padding: '12px',
          borderRadius: '15px',
          border: '2px solid #fce4ec',
          background: 'white',
          color: '#5D4037',
          fontSize: '14px',
          fontFamily: 'Poppins, sans-serif',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          transition: 'all 0.3s'
        }}>
          <img src="https://www.google.com/favicon.ico" alt="Google" style={{ width: '18px' }} />
          Continue with Google
        </button>

        {/* Footer */}
        <p style={{
          textAlign: 'center',
          marginTop: '24px',
          color: '#5D4037',
          fontSize: '14px',
          fontFamily: 'Poppins, sans-serif'
        }}>
          Already have an account?{' '}
          <Link to="/login" state={{ from }} style={{ color: '#fa6193', fontWeight: 600, textDecoration: 'none' }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register