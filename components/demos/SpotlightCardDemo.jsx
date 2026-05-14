'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder, useMotionTemplate } from 'framer-motion';

export default function SpotlightCardDemo() {
  const cards = [
    { icon: '⚡', title: 'Lightning Fast', desc: 'Optimized for speed' },
    { icon: '🛡️', title: 'Secure', desc: 'Enterprise-grade security' },
    { icon: '🎨', title: 'Beautiful', desc: 'Stunning design system' }
  ];

  function Card({ icon, title, desc }) {
    const ref = React.useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e) => {
      const rect = ref.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    const background = useMotionTemplate`radial-gradient(250px circle at ${mouseX}px ${mouseY}px, rgba(102, 126, 234, 0.15), transparent 80%)`;

    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        style={{
          width: 200,
          padding: 30,
          borderRadius: 16,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer'
        }}
        whileHover={{ borderColor: 'rgba(102, 126, 234, 0.3)' }}
      >
        <motion.div style={{ position: 'absolute', inset: 0, background, pointerEvents: 'none' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: 15 }}>{icon}</div>
          <h3 style={{ fontSize: '1.1rem', marginBottom: 8 }}>{title}</h3>
          <p style={{ color: '#666', fontSize: '0.85rem' }}>{desc}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <h2 className="demo-title">Spotlight Cards</h2>
      <p className="demo-subtitle">Cards with mouse-following spotlight effect using radial gradients.</p>
      <div className="demo-area">
        <div style={{ display: 'flex', gap: 20 }}>
          {cards.map((card, i) => <Card key={i} {...card} />)}
        </div>
      </div>
    </>
  );
}
