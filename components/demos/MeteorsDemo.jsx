'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function MeteorsDemo() {
  const [meteors, setMeteors] = React.useState([]);

  React.useEffect(() => {
    const newMeteors = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 3
    }));
    setMeteors(newMeteors);
  }, []);

  return (
    <>
      <h2 className="demo-title">Meteors</h2>
      <p className="demo-subtitle">Shooting stars streaking across the background. Great for hero sections.</p>
      <div className="demo-area">
        <div style={{
          width: 500,
          height: 300,
          background: 'linear-gradient(to bottom, #0a0a15 0%, #1a1a2e 100%)',
          borderRadius: 24,
          position: 'relative',
          overflow: 'hidden'
        }}>
          {meteors.map((m) => (
            <motion.div
              key={m.id}
              style={{
                position: 'absolute',
                left: `${m.left}%`,
                top: -10,
                width: 2,
                height: 2,
                background: '#fff',
                borderRadius: '50%',
                boxShadow: '0 0 6px 2px rgba(255,255,255,0.3)'
              }}
              animate={{
                x: [0, -150],
                y: [0, 300],
                opacity: [1, 1, 0]
              }}
              transition={{
                duration: m.duration,
                delay: m.delay,
                repeat: Infinity,
                ease: 'linear'
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 80,
                height: 1,
                background: 'linear-gradient(to left, rgba(255,255,255,0.6), transparent)',
                transform: 'rotate(45deg)',
                transformOrigin: 'left center'
              }} />
            </motion.div>
          ))}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#444', fontSize: '0.9rem' }}>Watch the meteors</span>
          </div>
        </div>
      </div>
    </>
  );
}
