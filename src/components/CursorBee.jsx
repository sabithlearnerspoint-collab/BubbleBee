import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CursorBee = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [bubbles, setBubbles] = useState([]);
  const bubbleIdRef = useRef(0);
  const lastBubbleTimeRef = useRef(0);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });

      // Throttle bubble creation (spawn roughly every 50ms if moving)
      const now = Date.now();
      if (now - lastBubbleTimeRef.current > 60) {
        lastBubbleTimeRef.current = now;
        
        // Randomize bubble size between 4px and 14px
        const size = Math.random() * 10 + 4;
        
        const newBubble = {
          id: bubbleIdRef.current++,
          x: e.clientX + (Math.random() * 20 - 10), // slight random offset
          y: e.clientY + (Math.random() * 20 - 10),
          size,
        };

        setBubbles((prev) => [...prev, newBubble]);
        
        // Remove this bubble after 1.5 seconds (when animation finishes)
        setTimeout(() => {
          setBubbles((currentBubbles) => 
            currentBubbles.filter((b) => b.id !== newBubble.id)
          );
        }, 1500);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  const beeVariants = {
    default: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      rotate: (mousePosition.x % 10) - 5 // slight dynamic rotation based on position
    },
  };

  return (
    <>
      {/* The trailing bubbles */}
      <AnimatePresence>
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            initial={{ opacity: 0.8, scale: 0.5, x: bubble.x, y: bubble.y }}
            animate={{ 
              opacity: 0, 
              scale: 1.5, 
              y: bubble.y - 60, // floats upwards 
              x: bubble.x + (Math.random() * 30 - 15) // small horizontal drift
            }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              borderRadius: '50%',
              border: '1px solid rgba(255, 255, 255, 0.6)',
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(255, 170, 0, 0.2))',
              pointerEvents: 'none',
              zIndex: 9998,
              boxShadow: '0 0 4px rgba(255, 170, 0, 0.3)'
            }}
          />
        ))}
      </AnimatePresence>

      {/* The main SVG bee cursor */}
      <motion.div
        variants={beeVariants}
        animate="default"
        transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.5 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          filter: 'drop-shadow(0px 2px 4px rgba(255, 170, 0, 0.5))'
        }}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
           {/* Custom SVG Bee Profile Outline */}
           <path d="M12 18h-2a4 4 0 0 1-4-4v-1" />
           <path d="M14 18h2a4 4 0 0 0 4-4v-1" />
           <circle cx="12" cy="11" r="3" fill="#000" />
           <path d="M12 8V4" />
           <path d="M15 6h-6" />
           <path d="M9 11v.01" />
           <path d="M15 11v.01" />
           <path d="M3 13s2-4 9-4 9 4 9 4" />
           {/* Wings */}
           <path d="M12 7c-3-4-8-3-8 0 0 4 8 4 8 4" />
           <path d="M12 7c3-4 8-3 8 0 0 4-8 4-8 4" />
        </svg>
      </motion.div>
    </>
  );
};

export default CursorBee;
