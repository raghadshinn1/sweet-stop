import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Edit2, Save, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// ============ Types ============
interface AddressObject {
  street?: string;
  city?: string;
  province?: string;
  postalCode?: string;
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
}

// ============ Helpers ============
const addressToString = (addr: string | AddressObject | undefined): string => {
  if (!addr) return '';
  if (typeof addr === 'string') return addr;
  const parts = [addr.street, addr.city, addr.province, addr.postalCode].filter(Boolean);
  return parts.join(', ');
};

const stringToAddress = (str: string): AddressObject => {
  const parts = str.split(',').map(s => s.trim()).filter(Boolean);
  return {
    street: parts[0] || '',
    city: parts[1] || '',
    province: parts[2] || '',
    postalCode: parts[3] || ''
  };
};

// ============ Main Component ============
const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: addressToString(user.address as string | AddressObject | undefined)
      });
    }
  }, [user]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = {
        name: profile.name,
        phone: profile.phone,
        address: stringToAddress(profile.address)
      };
      
      const result = await updateProfile(payload);
      
      if (!result.success) {
        console.error('Failed to update profile:', result.message);
        return;
      }

      setEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid #fce4ec',
    borderRadius: '12px',
    fontSize: '16px',
    fontFamily: 'Poppins, sans-serif',
    color: '#3E2723',
    background: editing ? 'white' : '#f9f9f9',
    outline: 'none',
    boxSizing: 'border-box'
  };

  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px', background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <button onClick={() => navigate(-1)} style={{
            background: 'white', border: 'none', borderRadius: '50%',
            width: '40px', height: '40px', display: 'flex', alignItems: 'center',
            justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <ArrowLeft size={20} color="#fa6193" />
          </button>
          <h1 style={{ fontFamily: "'Sacramento', cursive", fontSize: '36px', color: '#fa6193', margin: 0 }}>
            My Profile
          </h1>
        </div>

        {/* Profile Card */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          
          {/* Avatar */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{
              width: '100px', height: '100px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #fa6193, #f8bbd0)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto', fontSize: '40px', color: 'white'
            }}>
              {profile.name?.charAt(0).toUpperCase() || <User size={40} />}
            </div>
          </div>

          {/* Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666', fontSize: '14px', marginBottom: '6px', fontFamily: 'Poppins, sans-serif' }}>
                <User size={16} color="#fa6193" /> Full Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={e => setProfile({...profile, name: e.target.value})}
                disabled={!editing}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666', fontSize: '14px', marginBottom: '6px', fontFamily: 'Poppins, sans-serif' }}>
                <Mail size={16} color="#fa6193" /> Email
              </label>
              <input
                type="email"
                value={profile.email}
                disabled
                style={inputStyle}
              />
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666', fontSize: '14px', marginBottom: '6px', fontFamily: 'Poppins, sans-serif' }}>
                <Phone size={16} color="#fa6193" /> Phone
              </label>
              <input
                type="tel"
                value={profile.phone}
                onChange={e => setProfile({...profile, phone: e.target.value})}
                disabled={!editing}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666', fontSize: '14px', marginBottom: '6px', fontFamily: 'Poppins, sans-serif' }}>
                <MapPin size={16} color="#fa6193" /> Address
              </label>
              <textarea
                value={profile.address}
                onChange={e => setProfile({...profile, address: e.target.value})}
                disabled={!editing}
                rows={3}
                style={{...inputStyle, resize: 'none'}}
                placeholder={editing ? 'Street, City, Province, Postal Code' : ''}
              />
            </div>

          </div>

          {/* Buttons */}
          <div style={{ marginTop: '24px' }}>
            {!editing ? (
              <button onClick={() => setEditing(true)} style={{
                width: '100%', padding: '14px', background: '#fa6193', color: 'white',
                border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 600,
                cursor: 'pointer', fontFamily: 'Poppins, sans-serif',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
              }}>
                <Edit2 size={18} /> Edit Profile
              </button>
            ) : (
              <button onClick={handleSave} disabled={loading} style={{
                width: '100%', padding: '14px', background: loading ? '#ccc' : '#4CAF50', color: 'white',
                border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'Poppins, sans-serif',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
              }}>
                <Save size={18} /> {loading ? 'Saving...' : 'Save Changes'}
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;