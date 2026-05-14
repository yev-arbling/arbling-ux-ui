'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function BorderBeamDemo() {
  const cards = [
    { icon: '⚡', title: 'Fast', desc: 'Optimized', colors: ['#667eea', '#764ba2'], duration: 4 },
    { icon: '🔒', title: 'Secure', desc: 'Enterprise-grade', colors: ['#f093fb', '#f5576c'], duration: 6 },
    { icon: '🚀', title: 'Scalable', desc: 'Built to grow', colors: ['#4facfe', '#00f2fe'], duration: 3 }
  ];
  return (
    <>
      <h2 className="demo-title">Border Beam</h2>
      <p className="demo-subtitle">Animated gradient beam travels around the border infinitely. Popular in SaaS landing pages.</p>
      <div className="demo-area">
        <div style={{ display: 'flex', gap: 30 }}>
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
              style={{
                width: 220,
                height: 140,
                borderRadius: 20,
                background: 'rgba(20,20,30,0.8)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                cursor: 'pointer'
              }}
            >
              <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 20,
                padding: 2,
                background: 'transparent',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'xor',
                WebkitMaskComposite: 'xor',
                overflow: 'hidden'
              }}>
                <motion.div
                  style={{
                    position: 'absolute',
                    width: 120,
                    height: 120,
                    background: `radial-gradient(circle, ${card.colors[0]} 0%, ${card.colors[1]} 50%, transparent 70%)`,
                    filter: 'blur(8px)'
                  }}
                  animate={{
                    left: ['0%', '100%', '100%', '0%', '0%'],
                    top: ['0%', '0%', '100%', '100%', '0%']
                  }}
                  transition={{
                    duration: card.duration,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
              </div>
              <span style={{ fontSize: '2rem' }}>{card.icon}</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>{card.title}</span>
              <span style={{ fontSize: '0.8rem', color: '#888' }}>{card.desc}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
