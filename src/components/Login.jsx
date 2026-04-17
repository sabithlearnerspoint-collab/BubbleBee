import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, LogIn, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // TODO: Connect this strictly to Supabase Auth once keys are provided
      console.log('Logging in with:', email);
      
      // Temporary mock authentication delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate navigation to the dashboard after successful login
      // navigate('/dashboard');
      setError('Database connection required. Please configure Supabase keys first.');
    } catch (err) {
      setError(err.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative'
    }}>
      {/* Background glow effects */}
      <div style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '300px',
          height: '300px',
          background: 'var(--primary)',
          filter: 'blur(150px)',
          opacity: 0.15,
          zIndex: 0
      }}></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '450px',
          padding: '40px',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <img src="/logo_fixed.png" alt="Bubble Bee" style={{ height: '70px', marginBottom: '20px' }} />
        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '8px' }}>Staff Portal</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px', textAlign: 'center' }}>
          Enter your credentials to access the backend dashboard.
        </p>

        {error && (
          <div style={{
            width: '100%',
            padding: '12px',
            background: 'rgba(255, 60, 60, 0.1)',
            border: '1px solid rgba(255, 60, 60, 0.3)',
            borderRadius: '8px',
            color: '#ff6b6b',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '20px',
            fontSize: '0.9rem'
          }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#ccc' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <User size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                placeholder="staff@bubblebee.com" 
                style={{ paddingLeft: '40px', marginBottom: 0 }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#ccc' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                placeholder="••••••••" 
                style={{ paddingLeft: '40px', marginBottom: 0 }}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={isLoading}
            style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              gap: '8px', 
              marginTop: '10px',
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? 'not-allowed' : 'none'
            }}
          >
            {isLoading ? 'Authenticating...' : 'Sign In'}
            {!isLoading && <LogIn size={18} />}
          </button>
        </form>

        <a href="/" style={{ marginTop: '30px', color: 'var(--text-muted)', fontSize: '0.9rem', textDecoration: 'underline' }}>
          Return to public website
        </a>
      </motion.div>
    </section>
  );
};

export default Login;
