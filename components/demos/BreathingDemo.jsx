'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function BreathingDemo() {
  return (
    <>
      <h2 className="demo-title">Breathing Glow</h2>
      <p className="demo-subtitle">Smooth pulsing glow effect. Creates a living, organic feel.</p>
      <div className="demo-area">
        <div style={{ display: 'flex', gap: 40 }}>
          {[
            { color: '#667eea', icon: '💜' },
            { color: '#f093fb', icon: '💖' },
            { color: '#4facfe', icon: '💙' }
          ].map((item, i) => (
            <motion.div
              key={i}
              style={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${item.color}40 0%, transparent 70%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                position: 'relative'
              }}
              animate={{
                boxShadow: [
                  `0 0 20px ${item.color}40, 0 0 40px ${item.color}20`,
                  `0 0 40px ${item.color}60, 0 0 80px ${item.color}40`,
                  `0 0 20px ${item.color}40, 0 0 40px ${item.color}20`
                ]
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
              >
                {item.icon}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
