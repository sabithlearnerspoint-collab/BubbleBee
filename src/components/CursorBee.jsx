import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CursorBee = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
    },
  };

  return (
    <motion.div
      variants={variants}
      animate="default"
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '32px',
        height: '32px',
        backgroundImage: 'url("/bee.png")',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        pointerEvents: 'none',
        zIndex: 9999,
        // Optional glow effect for the bee
        filter: 'drop-shadow(0px 0px 8px rgba(255, 215, 0, 0.8))'
      }}
    />
  );
};

export default CursorBee;
