import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, CreditCard, Send, CheckCircle } from 'lucide-react';

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    serviceType: 'Bubble Wash Main'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construct WhatsApp message
    const message = `*New Booking Request!*\n\nName: ${formData.name}\nService: ${formData.serviceType}\nDate: ${formData.date}\nTime: ${formData.time}\nPhone: ${formData.phone}\nEmail: ${formData.email}`;
    // The user's WhatsApp number (placeholder, user should replace this)
    const waNumber = "917025603738"; 
    const waURL = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    
    // Simulate form submisson & show success message
    setIsSubmitted(true);
    
    // Open WhatsApp in new tab
    window.open(waURL, '_blank');
  };

  return (
    <section id="booking" className="section-padding" style={{ background: '#0a0a0f', position: 'relative' }}>
      <div style={{
          position: 'absolute',
          top: '20%',
          right: '5%',
          width: '300px',
          height: '300px',
          background: 'var(--primary)',
          filter: 'blur(150px)',
          opacity: 0.1,
          zIndex: 0
      }}></div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '50px', position: 'relative', zIndex: 1 }}>
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '20px' }}>
            Book Your <br /><span className="heading-gradient">Wash Slot</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '40px', lineHeight: 1.6 }}>
            Reserve your appointment with Bubblebee Kothamangalam. We'll send an email confirmation and reach out via WhatsApp to confirm the details.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '50%' }}>
                <Calendar color="var(--primary)" />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>Pick a Date</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Choose your preferred day.</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '50%' }}>
                <Clock color="var(--primary)" />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>Select a Time</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>We operate 9 AM to 7 PM.</p>
              </div>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-card" 
          style={{ flex: '1 1 400px', padding: '40px' }}
        >
          {isSubmitted ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                transition={{ type: 'spring', bounce: 0.5 }}
                style={{ display: 'inline-block', marginBottom: '20px' }}
              >
                <CheckCircle size={64} color="var(--primary)" />
              </motion.div>
              <h3 style={{ fontSize: '2rem', marginBottom: '16px' }}>Slot Requested!</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Your booking details have been submitted. An email confirmation has been triggered, and we've opened WhatsApp for direct contact.
              </p>
              <button 
                onClick={() => setIsSubmitted(false)} 
                className="btn-outline" 
                style={{ marginTop: '30px' }}
              >
                Book Another Slot
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 calc(50% - 15px)' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#ccc' }}>Full Name</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="John Doe" />
                </div>
                <div style={{ flex: '1 1 calc(50% - 15px)' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#ccc' }}>Phone Number</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+91 0000 000 000" />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#ccc' }}>Email Address</label>
                <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="john@example.com" />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#ccc' }}>Service Selected</label>
                <select name="serviceType" value={formData.serviceType} onChange={handleChange}>
                  <option value="Bubble Wash Main">Bubble Wash Main</option>
                  <option value="Interior Detailing">Interior Detailing</option>
                  <option value="Ceramic / Graphene / Borophene Coating">Ceramic / Graphene / Borophene Coating (Specialty)</option>
                  <option value="Engine Bay Detailing">Engine Bay Detailing</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 calc(50% - 15px)' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#ccc' }}>Date</label>
                  <input type="date" name="date" required value={formData.date} onChange={handleChange} />
                </div>
                <div style={{ flex: '1 1 calc(50% - 15px)' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#ccc' }}>Time Slot</label>
                  <select name="time" required value={formData.time} onChange={handleChange}>
                    <option value="">Select Time</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="01:00 PM">01:00 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="05:00 PM">05:00 PM</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
                Confirm Booking
                <Send size={18} />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Booking;
