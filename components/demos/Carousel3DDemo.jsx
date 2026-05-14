'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function Carousel3DDemo() {
  const [angle, setAngle] = React.useState(0);
  const items = ['🎨', '🚀', '💎', '⚡', '🔥'];
  const radius = 180;

  return (
    <>
      <h2 className="demo-title">3D Carousel</h2>
      <p className="demo-subtitle">Items arranged in a circle in 3D space. Click arrows to rotate.</p>
      <div className="demo-area">
        <div style={{ perspective: 1000, width: 400, height: 250 }}>
          <motion.div
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              transformStyle: 'preserve-3d'
            }}
            animate={{ rotateY: angle }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 100, damping: 20 }}
          >
            {items.map((item, i) => {
              const itemAngle = (360 / items.length) * i;
              return (
                <motion.div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: 100,
                    height: 120,
                    left: '50%',
                    top: '50%',
                    marginLeft: -50,
                    marginTop: -60,
                    background: 'linear-gradient(145deg, rgba(102, 126, 234, 0.9), rgba(118, 75, 162, 0.9))',
                    borderRadius: 16,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.5rem',
                    transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  {item}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
        <div style={{ display: 'flex', gap: 15, marginTop: 20 }}>
          <button className="replay-btn" onClick={() => setAngle(a => a - 72)}>← Prev</button>
          <button className="replay-btn" onClick={() => setAngle(a => a + 72)}>Next →</button>
        </div>
      </div>
    </>
  );
}
