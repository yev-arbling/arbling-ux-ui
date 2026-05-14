'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function GlassDemo() {
  const cards = [
    { title: 'Analytics', icon: '📊', color: '#667eea' },
    { title: 'Messages', icon: '💬', color: '#f093fb' },
    { title: 'Settings', icon: '⚙️', color: '#4facfe' }
  ];

  return (
    <>
      <h2 className="demo-title">Glass Cards</h2>
      <p className="demo-subtitle">Glassmorphism cards with subtle hover animations and backdrop blur.</p>
      <div className="demo-area">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
          padding: 40,
          borderRadius: 24
        }}>
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{
                y: -10,
                boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
                transition: { type: 'spring', stiffness: 300, damping: 20 }
              }}
              style={{
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: 20,
                padding: 30,
                border: '1px solid rgba(255,255,255,0.2)',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: 15 }}>{card.icon}</div>
              <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{card.title}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
