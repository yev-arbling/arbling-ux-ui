'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function RippleDemo() {
  const [ripples, setRipples] = React.useState([]);

  const addRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 1000);
  };

  return (
    <>
      <h2 className="demo-title">Ripple Effect</h2>
      <p className="demo-subtitle">Material-style ripple animation on click. Multiple ripples can exist simultaneously.</p>
      <div className="demo-area">
        <div style={{ display: 'flex', gap: 20 }}>
          {['Primary', 'Secondary', 'Accent'].map((label, i) => {
            const colors = ['#667eea', '#f093fb', '#4facfe'];
            return (
              <motion.button
                key={label}
                onClick={addRipple}
                style={{
                  padding: '18px 50px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#fff',
                  background: colors[i],
                  border: 'none',
                  borderRadius: 12,
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span style={{ position: 'relative', zIndex: 1 }}>{label}</span>
                <AnimatePresence>
                  {ripples.map((ripple) => (
                    <motion.span
                      key={ripple.id}
                      initial={{ scale: 0, opacity: 0.5 }}
                      animate={{ scale: 4, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      style={{
                        position: 'absolute',
                        left: ripple.x,
                        top: ripple.y,
                        width: 100,
                        height: 100,
                        marginLeft: -50,
                        marginTop: -50,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.4)',
                        pointerEvents: 'none'
                      }}
                    />
                  ))}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </div>
    </>
  );
}
