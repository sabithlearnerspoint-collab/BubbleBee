import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Booking from './components/Booking';
import CursorBee from './components/CursorBee';

function App() {
  return (
    <>
      <CursorBee />
      <Header />
      <main>
        <Hero />
        <Services />
        <Booking />
      </main>
      
      <footer style={{
        background: '#020202',
        padding: '40px 5%',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        marginTop: '50px'
      }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 10px 0' }}>
          Bubble<span style={{ color: 'var(--primary)' }}>bee</span>
        </h3>
        <p style={{ color: 'var(--text-muted)' }}>
          Kothamangalam's Premier Auto Detailing<br/>
          Opposite Kozhippilly Park, Kothamangalam, Ernakulam
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '20px' }}>
          &copy; {new Date().getFullYear()} Bubble Bee Car Wash. All rights reserved.
        </p>
      </footer>
    </>
  );
}

export default App;
