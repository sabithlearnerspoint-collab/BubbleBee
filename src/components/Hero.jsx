import { Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      padding: '0 5%',
      overflow: 'hidden'
    }}>
      {/* Background Image Setup */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url("/hero.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: -2,
        filter: 'brightness(0.6) contrast(1.1)',
      }}></div>
      
      {/* Dark overlay to make text pop */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(90deg, rgba(5,5,5,0.9) 0%, rgba(5,5,5,0.5) 50%, rgba(5,5,5,0.1) 100%)',
        zIndex: -1,
      }}></div>

      <div style={{ maxWidth: '600px', zIndex: 1, marginTop: '80px' }}>
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,215,0,0.1)', padding: '8px 16px', borderRadius: '50px', border: '1px solid rgba(255,215,0,0.2)', marginBottom: '20px' }}>
            <Sparkles size={16} color="var(--primary)" />
            <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem' }}>Premium Care for Your Vehicle</span>
          </div>

          <h1 style={{ fontSize: '4.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '24px' }}>
            Unleash the <br/>
            <span className="heading-gradient">True Shine</span>
          </h1>

          <p style={{ fontSize: '1.1rem', color: '#ccc', marginBottom: '40px', lineHeight: 1.6 }}>
            Experience the pinnacle of auto detailing at Bubble Bee, Kothamangalam. Located opposite Kozhippilly Park, where precision meets luxury, and your car gets the royal treatment.
          </p>

          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#booking" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 32px', fontSize: '1.1rem' }}>
              Book Your Slot <ArrowRight size={20} />
            </a>
            <a href="#services" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', padding: '16px 32px', fontSize: '1.1rem' }}>
              Our Services
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
