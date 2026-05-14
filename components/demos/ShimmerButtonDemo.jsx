'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function ShimmerButtonDemo() {
  return (
    <>
      <h2 className="demo-title">Shimmer Button</h2>
      <p className="demo-subtitle">Buttons with animated shimmer/shine effect traveling across the surface.</p>
      <div className="demo-area">
        <div style={{ display: 'flex', gap: 20 }}>
          {['Get Started', 'Learn More', 'Contact Us'].map((text, i) => {
            const colors = [['#667eea', '#764ba2'], ['#f093fb', '#f5576c'], ['#4facfe', '#00f2fe']];
            return (
              <motion.button
                key={i}
                style={{
                  padding: '16px 40px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#fff',
                  background: `linear-gradient(135deg, ${colors[i][0]}, ${colors[i][1]})`,
                  border: 'none',
                  borderRadius: 12,
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span style={{ position: 'relative', zIndex: 1 }}>{text}</span>
                <motion.div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    transform: 'skewX(-20deg)'
                  }}
                  animate={{ left: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: 'easeInOut' }}
                />
              </motion.button>
            );
          })}
        </div>
      </div>
    </>
  );
}
