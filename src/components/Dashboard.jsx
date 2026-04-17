import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { 
  Users, Calendar as CalendarIcon, CreditCard, PieChart, LogOut, 
  Clock, CheckCircle, Play, Sliders, DollarSign, Image as ImageIcon, Camera, Loader2, Send, AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('bookings');
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
      } else {
        const { data } = await supabase.from('staff_profiles').select('*').eq('id', user.id).single();
        setProfile(data);
        setLoading(false);
      }
    };
    checkUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (loading) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-color)', color: 'white' }}>Loading Dashboard...</div>;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-color)', color: 'white' }}>
      {/* Mobile-ready Sidebar/Nav */}
      <aside className="glass" style={{ width: '280px', flexShrink: 0, borderRight: '1px solid var(--surface-border)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '30px' }}>
          <img src="/logo_fixed.png" alt="Logo" style={{ width: '130px', transform: 'scale(1.5)', transformOrigin: 'left center' }} />
          <div style={{ marginTop: '40px', padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--surface-border)' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>MEMBER</p>
              <p style={{ fontWeight: 700, fontSize: '1.1rem' }}>{profile?.full_name || 'Staff Member'}</p>
              <div style={{ marginTop: '8px' }}>
                <span style={{ fontSize: '0.65rem', background: 'var(--primary)', color: 'black', padding: '3px 8px', borderRadius: '4px', fontWeight: 900 }}>{profile?.role || 'STAFF'}</span>
              </div>
           </div>
         </div>
 
         <nav style={{ flex: 1, padding: '0 15px' }}>
           <NavItem icon={CalendarIcon} label="Job Board" id="bookings" active={activeTab} onClick={setActiveTab} />
           {profile?.role !== 'STAFF' && <NavItem icon={DollarSign} label="Financials" id="expenses" active={activeTab} onClick={setActiveTab} />}
           {profile?.role !== 'STAFF' && <NavItem icon={Sliders} label="Schedules" id="slots" active={activeTab} onClick={setActiveTab} />}
           {profile?.role === 'OWNER' && <NavItem icon={Users} label="User Management" id="users" active={activeTab} onClick={setActiveTab} />}
           {profile?.role === 'OWNER' && <NavItem icon={PieChart} label="Analytics" id="reports" active={activeTab} onClick={setActiveTab} />}
         </nav>

        <button onClick={handleLogout} style={{ margin: '20px', padding: '15px', background: 'rgba(255,100,100,0.05)', border: 'none', color: '#ff6b6b', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <LogOut size={18} /> Logout
        </button>
      </aside>

      <main style={{ flex: 1, overflowY: 'auto', padding: '40px' }}>
        {activeTab === 'bookings' && <BookingsManager role={profile?.role || 'STAFF'} userId={profile?.id} />}
        {activeTab === 'expenses' && <ExpenseManager profile={profile} />}
        {activeTab === 'slots' && <SlotManager />}
        {activeTab === 'users' && <UsersManager />}
        {activeTab === 'reports' && <ReportsView />}
      </main>
    </div>
  );
};

const NavItem = ({ icon: Icon, label, id, active, onClick }) => (
  <div 
    onClick={() => onClick(id)}
    style={{
      display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 15px', marginBottom: '8px',
      borderRadius: '8px', cursor: 'pointer', transition: '0.2s',
      background: active === id ? 'rgba(255,170,0,0.1)' : 'transparent',
      color: active === id ? 'var(--primary)' : 'var(--text-muted)'
    }}
  >
    <Icon size={20} /> <span style={{ fontWeight: active === id ? 700 : 400 }}>{label}</span>
  </div>
);

// --- 1. BOOKINGS MANAGER ---
const BookingsManager = ({ role, userId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
    const subscription = supabase.channel('bookings_channel').on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, fetchBookings).subscribe();
    return () => { supabase.removeChannel(subscription); };
  }, []);

  async function fetchBookings() {
    const { data } = await supabase.from('bookings').select('*').order('date', { ascending: true }).order('time_slot', { ascending: true });
    setData(data || []);
    setLoading(false);
  }

  async function updateStatus(id, newStatus) {
    await supabase.from('bookings').update({ status: newStatus }).eq('id', id);
    // Future: Trigger WhatsApp/Email Webhook here
  }

  return (
    <div className="glass-card" style={{ padding: '30px' }}>
      <h2 style={{ marginBottom: '25px', fontSize: '1.8rem' }}>Operation <span className="heading-gradient">Workflow</span></h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', minWidth: '800px', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--surface-border)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              <th style={{ padding: '15px' }}>CUSTOMER / INFO</th>
              <th style={{ padding: '15px' }}>SLOT</th>
              <th style={{ padding: '15px' }}>SERVICE</th>
              <th style={{ padding: '15px' }}>STATUS</th>
              <th style={{ padding: '15px' }}>OPERATIONS</th>
            </tr>
          </thead>
          <tbody>
            {data.map(b => (
              <tr key={b.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                <td style={{ padding: '20px 15px' }}>
                  <p style={{ fontWeight: 700 }}>{b.customer_name}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{b.customer_phone}</p>
                </td>
                <td style={{ padding: '20px 15px' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}>
                     <CalendarIcon size={14} color="var(--primary)" /> {b.date}
                   </div>
                   <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{b.time_slot}</div>
                </td>
                <td style={{ padding: '20px 15px' }}>
                  <span style={{ fontSize: '0.85rem', background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '6px' }}>{b.service_type}</span>
                </td>
                <td style={{ padding: '20px 15px' }}>
                   <StatusBadge status={b.status} />
                </td>
                <td style={{ padding: '20px 15px' }}>
                   <div style={{ display: 'flex', gap: '8px' }}>
                      {b.status === 'PENDING' && <ActionButton icon={Play} label="Start" color="#4ade80" onClick={() => updateStatus(b.id, 'STARTED')} />}
                      {b.status === 'STARTED' && <ActionButton icon={CheckCircle} label="Complete" color="var(--primary)" onClick={() => updateStatus(b.id, 'COMPLETED')} />}
                      {role !== 'STAFF' && <ActionButton icon={AlertTriangle} label="Delay" color="#fb7185" onClick={() => updateStatus(b.id, 'DELAYED')} />}
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- 2. EXPENSE MANAGER ---
const ExpenseManager = ({ profile }) => {
  const [expenses, setExpenses] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [formData, setFormData] = useState({ amount: '', description: '' });

  useEffect(() => {
    fetchExpenses();
  }, []);

  async function fetchExpenses() {
    const { data } = await supabase.from('expenses').select('*').order('created_at', { ascending: false });
    setExpenses(data || []);
  }

  async function addExpense(e) {
    e.preventDefault();
    await supabase.from('expenses').insert([{ ...formData, submitted_by: profile.id }]);
    setFormData({ amount: '', description: '' });
    setShowAdd(false);
    fetchExpenses();
  }

  return (
    <div className="glass-card" style={{ padding: '30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <h2 style={{ fontSize: '1.8rem' }}>Expense <span className="heading-gradient">Log</span></h2>
        <button className="btn-primary" onClick={() => setShowAdd(!showAdd)} style={{ padding: '10px 20px' }}>+ New Entry</button>
      </div>

      {showAdd && (
        <form onSubmit={addExpense} style={{ marginBottom: '30px', padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
           <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '15px' }}>
              <input placeholder="Amount (INR)" type="number" required value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} />
              <input placeholder="Description" required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
           </div>
           <button type="submit" className="btn-primary" style={{ marginTop: '10px', width: '100%' }}>Save Expense Record</button>
        </form>
      )}

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              <th style={{ padding: '10px' }}>DATE</th>
              <th style={{ padding: '10px' }}>DESC</th>
              <th style={{ padding: '10px' }}>AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(ex => (
              <tr key={ex.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                <td style={{ padding: '15px 10px' }}>{ex.date}</td>
                <td style={{ padding: '15px 10px' }}>{ex.description}</td>
                <td style={{ padding: '15px 10px', color: '#fb7185', fontWeight: 700 }}>₹{ex.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- HELPER COMPONENTS ---
const StatusBadge = ({ status }) => {
  const colors = { PENDING: '#94a3b8', STARTED: 'var(--primary)', COMPLETED: '#4ade80', DELAYED: '#fb7185' };
  return (
    <span style={{ 
      fontSize: '0.7rem', fontWeight: 900, padding: '4px 10px', borderRadius: '20px', 
      background: `${colors[status]}20`, color: colors[status], border: `1px solid ${colors[status]}40` 
    }}>{status}</span>
  );
};

const ActionButton = ({ icon: Icon, label, color, onClick }) => (
  <button onClick={onClick} style={{ 
    background: 'rgba(255,255,255,0.03)', border: `1px solid ${color}40`, color,
    padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 600
  }}>
    <Icon size={14} /> {label}
  </button>
);

const SlotManager = () => <div className="glass-card" style={{ padding: '30px' }}><h2 className="heading-gradient">Schedule Controls</h2><p style={{ color: 'var(--text-muted)' }}>Slot capacity override module pending data configuration.</p></div>;

const UsersManager = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const { data } = await supabase.from('staff_profiles').select('*');
    setUsers(data || []);
    setLoading(false);
  }

  async function promoteUser(id, newRole) {
     await supabase.from('staff_profiles').update({ role: newRole }).eq('id', id);
     fetchUsers();
  }

  return (
    <div className="glass-card" style={{ padding: '30px' }}>
      <h2 style={{ marginBottom: '25px', fontSize: '1.8rem' }}>Staff <span className="heading-gradient">Accounts</span></h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Current staff registered in the system. Use the SQL editor or Auth tab to add new email accounts first.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {users.map(u => (
          <div key={u.id} className="glass" style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--surface-border)' }}>
            <p style={{ fontWeight: 700, marginBottom: '5px' }}>{u.full_name || 'New Staff'}</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '15px' }}>{u.id.substring(0, 8)}...</p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <button 
                onClick={() => promoteUser(u.id, 'STAFF')} 
                style={{ fontSize: '0.7rem', color: u.role === 'STAFF' ? 'black' : 'white', background: u.role === 'STAFF' ? 'var(--primary)' : 'rgba(255,255,255,0.05)', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
              >STAFF</button>
              <button 
                onClick={() => promoteUser(u.id, 'MANAGER')} 
                style={{ fontSize: '0.7rem', color: u.role === 'MANAGER' ? 'black' : 'white', background: u.role === 'MANAGER' ? 'var(--primary)' : 'rgba(255,255,255,0.05)', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
              >MANAGER</button>
              <button 
                onClick={() => promoteUser(u.id, 'OWNER')} 
                style={{ fontSize: '0.7rem', color: u.role === 'OWNER' ? 'black' : 'white', background: u.role === 'OWNER' ? 'var(--primary)' : 'rgba(255,255,255,0.05)', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
              >OWNER</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ReportsView = () => <div className="glass-card" style={{ padding: '30px' }}><h2 className="heading-gradient">Analytics Engine</h2><p style={{ color: 'var(--text-muted)' }}>Financial P&amp;L reporting module in development.</p></div>;

export default Dashboard;
