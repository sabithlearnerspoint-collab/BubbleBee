import { Droplets, Car, Sparkles, Phone } from 'lucide-react';

const Header = () => {
  return (
    <header className="glass" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: '15px 5%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img src="/logo.jpg" alt="Bubble Bee Logo" style={{ height: '50px', mixBlendMode: 'lighten' }} />
      </div>
      
      <nav style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        <a href="#home" style={{ fontSize: '0.95rem', fontWeight: 500, transition: 'color 0.3s' }}>Home</a>
        <a href="#services" style={{ fontSize: '0.95rem', fontWeight: 500, transition: 'color 0.3s' }}>Services</a>
        <a href="#booking" style={{ fontSize: '0.95rem', fontWeight: 500, transition: 'color 0.3s' }}>Book a Wash</a>
        <a href="https://wa.me/917025603738" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Phone size={18} />
          Contact Us
        </a>
      </nav>
    </header>
  );
};

export default Header;
