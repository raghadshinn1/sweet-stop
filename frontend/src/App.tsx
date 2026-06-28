import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import CartSidebar from './components/layout/CartSidebar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import CheckoutPage from './pages/CheckoutPage'
import Menu from './pages/Menu'
import About from './pages/About'
import Gallery from './pages/Gallery'
import PaymentSuccess from './pages/PaymentSuccess'
import PaymentMethods from './pages/PaymentMethods'
import PaymentPage from "./pages/PaymentPage";
import CardPaymentPage from './pages/CardPaymentPage';
import Orders from './pages/Orders';
import ScrollTrophy from './components/ScrollTrophy'
import StripePaymentPage from './pages/StripePaymentPage';
import FallingFlags from "./components/FallingFlags";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <CartSidebar />
          <ScrollTrophy />
          <FallingFlags />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/checkout" element={<CheckoutPage />} /> */}
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          {/* <Route path="/payment-methods" element={<PaymentMethods />} /> */}
          <Route path="/payment" element={<PaymentPage />} />
          {/* <Route path="/card-payment" element={<CardPaymentPage />} /> */}
          <Route path="/orders" element={<Orders />} />
          {/* <Route path="/stripe-payment" element={<StripePaymentPage />} /> */}
        </Routes>
      </CartProvider>
    </AuthProvider>
  )
}

export default App