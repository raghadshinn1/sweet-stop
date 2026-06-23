import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, ShoppingBag, Users, DollarSign, 
  Package, LogOut 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getAdminStats, getRecentOrders } from '../api';

interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalUsers: number;
  totalProducts: number;
}

interface RecentOrder {
  _id: string;
  customerName: string;
  total: number;
  status: string;
  createdAt: string;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0, totalRevenue: 0, totalUsers: 0, totalProducts: 0
  });
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, ordersRes] = await Promise.all([
        getAdminStats(),
        getRecentOrders()
      ]);
      setStats(statsRes.data);
      setRecentOrders(ordersRes.data || []);
    } catch (error) {
      console.error('Failed to fetch dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Total Orders', value: stats.totalOrders, icon: ShoppingBag, color: '#fa6193' },
    { title: 'Revenue', value: `$${stats.totalRevenue.toFixed(2)}`, icon: DollarSign, color: '#4CAF50' },
    { title: 'Users', value: stats.totalUsers, icon: Users, color: '#2196F3' },
    { title: 'Products', value: stats.totalProducts, icon: Package, color: '#FF9800' }
  ];

  // ============ Loading State ============
  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#f5f5f5',
        fontFamily: 'Poppins, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid #fce4ec',
            borderTop: '4px solid #fa6193',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }} />
          <p style={{ color: '#666', fontSize: '16px' }}>Loading dashboard...</p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      
      {/* Sidebar */}
      <div style={{
        position: 'fixed', left: 0, top: 0, width: '260px', height: '100vh',
        background: 'white', boxShadow: '2px 0 10px rgba(0,0,0,0.1)', padding: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #fa6193, #f8bbd0)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <LayoutDashboard size={20} color="white" />
          </div>
          <h2 style={{ margin: 0, fontFamily: "'Sacramento', cursive", fontSize: '28px', color: '#fa6193' }}>
            Sweet Stop
          </h2>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button style={navButtonStyle(true)} onClick={() => {}}>
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button style={navButtonStyle(false)} onClick={() => navigate('/admin/orders')}>
            <ShoppingBag size={20} /> Orders
          </button>
          <button style={navButtonStyle(false)} onClick={() => navigate('/admin/products')}>
            <Package size={20} /> Products
          </button>
          <button style={navButtonStyle(false)} onClick={() => navigate('/admin/users')}>
            <Users size={20} /> Users
          </button>
        </nav>

        <button onClick={logout} style={{
          position: 'absolute', bottom: '24px', left: '24px', right: '24px',
          padding: '12px', background: '#fee', color: '#e74c3c',
          border: 'none', borderRadius: '12px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          fontFamily: 'Poppins, sans-serif', fontWeight: 600
        }}>
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: '260px', padding: '40px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h1 style={{ margin: 0, fontFamily: 'Poppins, sans-serif', color: '#3E2723', fontSize: '28px' }}>
            Dashboard
          </h1>
          <button onClick={() => navigate('/')} style={{
            padding: '10px 20px', background: 'white', border: '2px solid #fce4ec',
            borderRadius: '12px', color: '#fa6193', cursor: 'pointer',
            fontFamily: 'Poppins, sans-serif', fontWeight: 600
          }}>
            Back to Site
          </button>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
          {statCards.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} style={{
                background: 'white', borderRadius: '16px', padding: '24px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ color: '#666', fontFamily: 'Poppins, sans-serif', fontSize: '14px' }}>
                    {stat.title}
                  </span>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: `${stat.color}15`, display: 'flex',
                    alignItems: 'center', justifyContent: 'center'
                  }}>
                    <Icon size={20} color={stat.color} />
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: '28px', fontWeight: 700, color: '#3E2723', fontFamily: 'Poppins, sans-serif' }}>
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Recent Orders */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 20px', fontFamily: 'Poppins, sans-serif', color: '#3E2723' }}>
            Recent Orders
          </h3>
          
          {recentOrders.length === 0 ? (
            <p style={{ color: '#999', textAlign: 'center', padding: '20px' }}>No orders yet</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #fce4ec' }}>
                  <th style={tableHeaderStyle}>Order ID</th>
                  <th style={tableHeaderStyle}>Customer</th>
                  <th style={tableHeaderStyle}>Total</th>
                  <th style={tableHeaderStyle}>Status</th>
                  <th style={tableHeaderStyle}>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order._id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                    <td style={tableCellStyle}>#{order._id.slice(-6)}</td>
                    <td style={tableCellStyle}>{order.customerName}</td>
                    <td style={{...tableCellStyle, color: '#fa6193', fontWeight: 600}}>${order.total.toFixed(2)}</td>
                    <td style={tableCellStyle}>
                      <span style={{
                        padding: '4px 12px', borderRadius: '20px', fontSize: '12px',
                        background: order.status === 'delivered' ? '#e8f5e9' : '#fff3e0',
                        color: order.status === 'delivered' ? '#4CAF50' : '#ff9800',
                        fontWeight: 600
                      }}>
                        {order.status}
                      </span>
                    </td>
                    <td style={{...tableCellStyle, color: '#999'}}>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
};

const navButtonStyle = (active: boolean) => ({
  padding: '12px 16px',
  borderRadius: '12px',
  border: 'none',
  background: active ? '#fce4ec' : 'transparent',
  color: active ? '#fa6193' : '#666',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  fontFamily: 'Poppins, sans-serif',
  fontWeight: active ? 600 : 400,
  fontSize: '15px',
  transition: 'all 0.2s'
});

const tableHeaderStyle = {
  textAlign: 'left' as const,
  padding: '12px',
  color: '#999',
  fontSize: '12px',
  fontWeight: 600,
  fontFamily: 'Poppins, sans-serif',
  textTransform: 'uppercase' as const
};

const tableCellStyle = {
  padding: '16px 12px',
  fontFamily: 'Poppins, sans-serif',
  fontSize: '14px',
  color: '#3E2723'
};

export default AdminDashboard;