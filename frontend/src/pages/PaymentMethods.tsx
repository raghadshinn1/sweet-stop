import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { 
  CreditCard, 
  Plus, 
  Trash2, 
  Check, 
  ArrowLeft,
  Lock,
  Loader2
} from 'lucide-react';

interface SavedCard {
  id: string;
  user_id: string;
  last_four: string;
  brand: string;
  cardholder_name: string;
  expiry_month: string;
  expiry_year: string;
  created_at: string;
}

const PaymentMethodsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
  const orderId = new URLSearchParams(location.search).get('order_id');
  
  const [cards, setCards] = useState<SavedCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [paying, setPaying] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [error, setError] = useState('');

  // Form states
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');

  // Fetch saved cards
  const fetchCards = async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('saved_cards')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCards(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, [user]);

  // Detect card brand
  const getCardBrand = (num: string): string => {
    const clean = num.replace(/\s/g, '');
    if (/^4/.test(clean)) return 'visa';
    if (/^5[1-5]/.test(clean)) return 'mastercard';
    if (/^3[47]/.test(clean)) return 'amex';
    if (/^6(?:011|5)/.test(clean)) return 'discover';
    return 'unknown';
  };

  // Format card number
  const formatCardNumber = (value: string) => {
    const clean = value.replace(/\D/g, '').slice(0, 16);
    const parts = clean.match(/.{1,4}/g) || [];
    return parts.join(' ');
  };

  // Save new card
  const handleSaveCard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('Please login first');
      return;
    }

    try {
      setSaving(true);
      setError('');

      const cleanNumber = cardNumber.replace(/\s/g, '');
      
      if (cleanNumber.length < 13) {
        setError('Invalid card number');
        return;
      }

      const lastFour = cleanNumber.slice(-4);
      const brand = getCardBrand(cleanNumber);

      const { data, error: insertError } = await supabase
        .from('saved_cards')
        .insert({
          user_id: user.id,
          card_number: cleanNumber,
          last_four: lastFour,
          expiry_month: expiryMonth,
          expiry_year: expiryYear,
          cardholder_name: cardholderName,
          brand: brand,
          created_at: new Date().toISOString()
        })
        .select()

      if (insertError) throw insertError;

      // Reset form
      setCardNumber('');
      setExpiryMonth('');
      setExpiryYear('');
      setCvv('');
      setCardholderName('');
      setShowAddForm(false);
      
      // Refresh cards
      fetchCards();
      
      // Auto-select the new card
      const newCardId = data?.[0]?.id;
      setSelectedCardId(newCardId);



    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Delete card
  const handleDeleteCard = async (cardId: string) => {
    try {
      const { error } = await supabase
        .from('saved_cards')
        .delete()
        .eq('id', cardId)
        .eq('user_id', user?.id);

      if (error) throw error;
      fetchCards();
      if (selectedCardId === cardId) setSelectedCardId(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Pay with selected card
  const handlePayWithCard = async () => {
    if (!selectedCardId || !orderId) {
      setError('Please select a card');
      return;
    }

    const selectedCard = cards.find(c => c.id === selectedCardId);
    if (!selectedCard) return;

    try {
      setPaying(true);
      setError('');

      // Update order payment status in Supabase
      const { error: orderError } = await supabase
        .from('orders')
        .update({
          payment_status: 'paid',
          payment_method: 'card',
          card_last_four: selectedCard.last_four,
          card_brand: selectedCard.brand,
          paid_at: new Date().toISOString()
        })
        .eq('id', orderId)
        .eq('user_id', user?.id);

      if (orderError) throw orderError;

      // Go to success page
      navigate('/payment-success?order_id=' + orderId);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setPaying(false);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)' 
      }}>
        <Loader2 size={32} color="#fa6193" style={{ animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      padding: '40px 20px',
      background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <button 
            onClick={() => navigate('/payment')}
            style={{
              background: 'white', border: 'none', borderRadius: '50%',
              width: '40px', height: '40px', display: 'flex', alignItems: 'center',
              justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <ArrowLeft size={20} color="#fa6193" />
          </button>
          <h1 style={{
            fontFamily: "'Sacramento', cursive",
            fontSize: '36px',
            color: '#fa6193',
            margin: 0
          }}>
            {showAddForm ? 'Add New Card' : 'Select Card'}
          </h1>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: '#fee',
            color: '#c33',
            padding: '16px',
            borderRadius: '12px',
            marginBottom: '20px',
            fontSize: '14px',
            fontFamily: 'Poppins, sans-serif'
          }}>
            {error}
          </div>
        )}

        {/* ADD NEW CARD FORM */}
        {showAddForm ? (
          <form onSubmit={handleSaveCard} style={{
            background: 'white',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                color: '#5D4037', 
                fontFamily: 'Poppins, sans-serif', 
                fontSize: '14px',
                fontWeight: 500
              }}>
                Card Number
              </label>
              <input
                type="text"
                inputMode="numeric"
                autoComplete="cc-number"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  border: '2px solid #fce4ec',
                  fontSize: '16px',
                  fontFamily: 'Poppins, sans-serif',
                  outline: 'none',
                  transition: 'border-color 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#fa6193'}
                onBlur={(e) => e.target.style.borderColor = '#fce4ec'}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  color: '#5D4037', 
                  fontFamily: 'Poppins, sans-serif', 
                  fontSize: '14px',
                  fontWeight: 500
                }}>
                  Month
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="cc-exp-month"
                  placeholder="MM"
                  value={expiryMonth}
                  onChange={(e) => setExpiryMonth(e.target.value.replace(/\D/g, '').slice(0, 2))}
                  required
                  maxLength={2}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '12px',
                    border: '2px solid #fce4ec',
                    fontSize: '16px',
                    textAlign: 'center',
                    fontFamily: 'Poppins, sans-serif',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#fa6193'}
                  onBlur={(e) => e.target.style.borderColor = '#fce4ec'}
                />
              </div>
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  color: '#5D4037', 
                  fontFamily: 'Poppins, sans-serif', 
                  fontSize: '14px',
                  fontWeight: 500
                }}>
                  Year
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="cc-exp-year"
                  placeholder="YY"
                  value={expiryYear}
                  onChange={(e) => setExpiryYear(e.target.value.replace(/\D/g, '').slice(0, 2))}
                  required
                  maxLength={2}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '12px',
                    border: '2px solid #fce4ec',
                    fontSize: '16px',
                    textAlign: 'center',
                    fontFamily: 'Poppins, sans-serif',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#fa6193'}
                  onBlur={(e) => e.target.style.borderColor = '#fce4ec'}
                />
              </div>
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  color: '#5D4037', 
                  fontFamily: 'Poppins, sans-serif', 
                  fontSize: '14px',
                  fontWeight: 500
                }}>
                  CVV
                </label>
                <input
                  type="password"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  required
                  maxLength={4}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '12px',
                    border: '2px solid #fce4ec',
                    fontSize: '16px',
                    textAlign: 'center',
                    fontFamily: 'Poppins, sans-serif',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#fa6193'}
                  onBlur={(e) => e.target.style.borderColor = '#fce4ec'}
                />
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                color: '#5D4037', 
                fontFamily: 'Poppins, sans-serif', 
                fontSize: '14px',
                fontWeight: 500
              }}>
                Cardholder Name
              </label>
              <input
                type="text"
                autoComplete="cc-name"
                placeholder="JOHN DOE"
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value.toUpperCase())}
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  border: '2px solid #fce4ec',
                  fontSize: '16px',
                  fontFamily: 'Poppins, sans-serif',
                  textTransform: 'uppercase',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#fa6193'}
                onBlur={(e) => e.target.style.borderColor = '#fce4ec'}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                style={{
                  flex: 1,
                  padding: '16px',
                  background: '#fce4ec',
                  color: '#fa6193',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontFamily: 'Poppins, sans-serif',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#fa6193';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#fce4ec';
                  e.currentTarget.style.color = '#fa6193';
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                style={{
                  flex: 2,
                  padding: '16px',
                  background: saving ? '#ccc' : '#fa6193',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: saving ? 'not-allowed' : 'pointer',
                  fontFamily: 'Poppins, sans-serif',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.3s'
                }}
              >
                {saving ? (
                  <>
                    <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                    Saving...
                  </>
                ) : (
                  <>
                    <Lock size={18} />
                    Save Card
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <>
            {/* SAVED CARDS LIST */}
            {cards.length === 0 ? (
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '40px',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                marginBottom: '20px'
              }}>
                <CreditCard size={48} color="#fce4ec" style={{ marginBottom: '16px' }} />
                <p style={{ color: '#666', fontFamily: 'Poppins, sans-serif', marginBottom: '8px', fontSize: '16px' }}>
                  No saved cards yet
                </p>
                <p style={{ color: '#999', fontFamily: 'Poppins, sans-serif', fontSize: '13px' }}>
                  Add a card to pay for your order
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                {cards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => setSelectedCardId(card.id)}
                    style={{
                      background: 'white',
                      borderRadius: '16px',
                      padding: '20px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      border: selectedCardId === card.id ? '2px solid #fa6193' : '2px solid transparent',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      transition: 'all 0.3s'
                    }}
                  >
                    <div style={{
                      width: '48px', 
                      height: '48px', 
                      borderRadius: '12px',
                      background: selectedCardId === card.id ? '#fa6193' : '#fce4ec',
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      transition: 'all 0.3s'
                    }}>
                      <CreditCard size={24} color={selectedCardId === card.id ? 'white' : '#fa6193'} />
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <p style={{ 
                        margin: 0, 
                        fontWeight: 'bold', 
                        color: '#3E2723', 
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '15px'
                      }}>
                        {card.brand.charAt(0).toUpperCase() + card.brand.slice(1)} •••• {card.last_four}
                      </p>
                      <p style={{ 
                        margin: '4px 0 0', 
                        color: '#666', 
                        fontSize: '13px', 
                        fontFamily: 'Poppins, sans-serif' 
                      }}>
                        {card.cardholder_name} • Expires {card.expiry_month}/{card.expiry_year}
                      </p>
                    </div>

                    {selectedCardId === card.id && (
                      <Check size={24} color="#fa6193" />
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCard(card.id);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '8px',
                        borderRadius: '8px',
                        transition: 'background 0.3s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#fee'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <Trash2 size={18} color="#c33" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* ADD NEW CARD BUTTON */}
            <button
              onClick={() => setShowAddForm(true)}
              style={{
                width: '100%',
                padding: '18px',
                background: 'white',
                color: '#fa6193',
                border: '2px dashed #fa6193',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontFamily: 'Poppins, sans-serif',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginBottom: '20px',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#fff5f8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'white';
              }}
            >
              <Plus size={20} />
              Add New Card
            </button>

            {/* PAY BUTTON */}
            {cards.length > 0 && (
              <button
                onClick={handlePayWithCard}
                disabled={!selectedCardId || paying}
                style={{
                  width: '100%',
                  padding: '18px',
                  background: !selectedCardId || paying ? '#ccc' : '#fa6193',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  cursor: !selectedCardId || paying ? 'not-allowed' : 'pointer',
                  fontFamily: 'Poppins, sans-serif',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  boxShadow: '0 4px 15px rgba(250, 97, 147, 0.3)',
                  transition: 'all 0.3s'
                }}
              >
                {paying ? (
                  <>
                    <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <Lock size={20} />
                    Pay with Selected Card
                  </>
                )}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentMethodsPage;