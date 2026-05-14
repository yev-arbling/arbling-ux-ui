'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function OrbitDemo() {
  const planets = [
    { icon: '🌍', name: 'Earth', color: '#4facfe' },
    { icon: '🌙', name: 'Moon', color: '#888' },
    { icon: '🔴', name: 'Mars', color: '#ef4444' },
    { icon: '⭐', name: 'Star', color: '#ffd93d' },
    { icon: '🚀', name: 'Ship', color: '#667eea' }
  ];

  return (
    <>
      <h2 className="demo-title">Orbit Animation</h2>
      <p className="demo-subtitle">Solar system style orbits with planets at different speeds and distances.</p>
      <div className="demo-area" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, height: 400, background: 'radial-gradient(circle, rgba(255,200,50,0.1) 0%, transparent 60%)', filter: 'blur(30px)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', width: 350, height: 350 }}>
          <motion.div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: 70,
              height: 70,
              marginLeft: -35,
              marginTop: -35,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, #ffd93d, #f59e0b)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              boxShadow: '0 0 60px rgba(255, 200, 50, 0.6), 0 0 100px rgba(255, 150, 50, 0.3)'
            }}
            animate={{ scale: [1, 1.08, 1], boxShadow: ['0 0 60px rgba(255, 200, 50, 0.6)', '0 0 80px rgba(255, 200, 50, 0.8)', '0 0 60px rgba(255, 200, 50, 0.6)'] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ☀️
          </motion.div>
          {planets.map((planet, i) => {
            const radius = 70 + i * 30;
            const duration = 6 + i * 2.5;
            const direction = i % 2 === 0 ? 1 : -1;
            return (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: 40,
                  height: 40,
                  marginLeft: -20,
                  marginTop: -20
                }}
                animate={{ rotate: 360 * direction }}
                transition={{ duration, repeat: Infinity, ease: 'linear' }}
              >
                <motion.div
                  style={{
                    position: 'absolute',
                    left: radius,
                    background: `linear-gradient(135deg, ${planet.color}40, ${planet.color}20)`,
                    backdropFilter: 'blur(4px)',
                    border: `1px solid ${planet.color}50`,
                    borderRadius: '50%',
                    width: 38 - i * 2,
                    height: 38 - i * 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 0 15px ${planet.color}30`
                  }}
                  animate={{ rotate: -360 * direction }}
                  transition={{ duration, repeat: Infinity, ease: 'linear' }}
                >
                  {planet.icon}
                </motion.div>
              </motion.div>
            );
          })}
          {planets.map((planet, i) => (
            <motion.div
              key={`orbit-${i}`}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: (70 + i * 30) * 2,
                height: (70 + i * 30) * 2,
                marginLeft: -(70 + i * 30),
                marginTop: -(70 + i * 30),
                border: `1px solid ${planet.color}20`,
                borderRadius: '50%',
                pointerEvents: 'none'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
