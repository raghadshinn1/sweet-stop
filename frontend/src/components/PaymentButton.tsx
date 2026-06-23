import React from 'react';
import { CartItem } from '../contexts/CartContext';

interface PaymentButtonProps {
  items: CartItem[];
  orderId: string;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ items, orderId }) => {
  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/payment/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, orderId }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  return (
    <button onClick={handleCheckout} className="checkout-btn">
      Pay with Card
    </button>
  );
};

export default PaymentButton;