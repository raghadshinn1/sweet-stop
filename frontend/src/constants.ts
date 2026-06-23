// ============================================
// Sweet Stop - Constants & Configuration
// ============================================

export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'About Us', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact Us', href: '/contact' },
] as const

export const CONTACT_INFO = {
  address: '15277 Castle Downs Rd NW #116, Edmonton, AB T5X 3N5',
  phone: '(780) 880-4567',
  email: 'Sweetstopyeg@gmail.com',
  hours: 'Daily: 11:00 AM - 10:00 PM',
  mapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2366.5!2d-113.513!3d53.623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53a023b7c0e3e4e1%3A0x7c0e3e4e1c0e3e4e!2s15277%20Castle%20Downs%20Rd%20NW%20%23116%2C%20Edmonton%2C%20AB%20T5X%203N5!5e0!3m2!1sen!2sca!4v1700000000000!5m2!1sen!2sca',
  instagram: 'https://instagram.com/sweetstop',
  facebook: 'https://facebook.com/sweetstop',
  twitter: 'https://twitter.com/sweetstop',

} as const

export const COLORS = {
  primary: '#f05584',
  primaryLight: '#fa6193',
  primaryDark: '#e05582',
  accent: '#E91E8C',
  brown: '#3E2723',
  brownLight: '#5D4037',
  brownLighter: '#8D6E63',
  pinkBg: '#f9dce0',
  pinkLight: '#fce4ec',
  pinkLighter: '#FFF0F5',
  pinkLightest: '#FFF5F7',
  white: '#ffffff',
  darkBg: '#1a1a2e',
  darkCard: '#1e1e36',
  darkHeader: '#2f2f4e',
  darkText: '#f0f0f0',
} as const

export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
} as const

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'