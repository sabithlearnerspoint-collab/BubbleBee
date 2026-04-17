import { motion } from 'framer-motion';
import { Droplets, Car, Shield, Gauge } from 'lucide-react';

const services = [
  {
    icon: <Droplets size={32} color="var(--primary)" />,
    title: 'Bubble Wash Main',
    description: 'Our signature exterior wash utilizing premium snow foam and pH-neutral shampoos to ensure a swirl-free, immaculate finish.'
  },
  {
    icon: <Car size={32} color="var(--primary)" />,
    title: 'Interior Detailing',
    description: 'Deep cleaning of all interior surfaces, including leather conditioning, stain removal, and odor elimination.'
  },
  {
    icon: <Shield size={32} color="var(--primary)" />,
    title: 'Ceramic Coating',
    description: 'Long-lasting nano-ceramic protection that enhances gloss and shields your paint from UV rays and contaminants.'
  },
  {
    icon: <Gauge size={32} color="var(--primary)" />,
    title: 'Engine Bay Detailing',
    description: 'Safe and thorough degreasing and dressing of the engine compartment, restoring it to a factory-fresh look.'
  }
];

const Services = () => {
  return (
    <section id="services" className="section-padding" style={{ position: 'relative' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '16px' }}>Our <span className="heading-gradient">Services</span></h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          We provide a comprehensive range of detailing services designed to restore, protect, and maintain your vehicle's aesthetic.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '30px',
        position: 'relative',
        zIndex: 1
      }}>
        {services.map((service, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="glass-card" 
            style={{ padding: '40px 30px', textAlign: 'left' }}
          >
            <div style={{ marginBottom: '24px', background: 'rgba(255,215,0,0.1)', width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {service.icon}
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', color: '#fff' }}>{service.title}</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
