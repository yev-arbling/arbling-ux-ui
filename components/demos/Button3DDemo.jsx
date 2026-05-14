'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function Button3DDemo() {
  return (
    <>
      <h2 className="demo-title">3D Button</h2>
      <p className="demo-subtitle">Button with realistic 3D push effect using translateZ and shadows.</p>
      <div className="demo-area">
        <div style={{ display: 'flex', gap: 30 }}>
          {['Primary', 'Secondary', 'Danger'].map((label, i) => {
            const colors = ['#667eea', '#4facfe', '#f5576c'];
            const shadows = ['#4a5bc7', '#3a8ad4', '#d94a5a'];
            return (
              <motion.button
                key={label}
                style={{
                  padding: '18px 40px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#fff',
                  background: colors[i],
                  border: 'none',
                  borderRadius: 12,
                  cursor: 'pointer',
                  boxShadow: `0 6px 0 ${shadows[i]}, 0 8px 20px rgba(0,0,0,0.3)`,
                  position: 'relative'
                }}
                whileHover={{ y: -2, boxShadow: `0 8px 0 ${shadows[i]}, 0 12px 25px rgba(0,0,0,0.35)` }}
                whileTap={{ y: 4, boxShadow: `0 2px 0 ${shadows[i]}, 0 4px 10px rgba(0,0,0,0.2)` }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                {label}
              </motion.button>
            );
          })}
        </div>
      </div>
    </>
  );
}
