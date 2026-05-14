'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function GradientTextDemo() {
  return (
    <>
      <h2 className="demo-title">Animated Gradient Text</h2>
      <p className="demo-subtitle">Text with flowing animated gradient. Eye-catching for headlines.</p>
      <div className="demo-area">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30, alignItems: 'center' }}>
          <motion.h2
            style={{
              fontSize: '3.5rem',
              fontWeight: 800,
              backgroundImage: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb, #667eea)',
              backgroundSize: '300% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            Magic Gradient
          </motion.h2>
          <motion.h2
            style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              backgroundImage: 'linear-gradient(90deg, #4facfe, #00f2fe, #f093fb, #4facfe)',
              backgroundSize: '300% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            Flowing Colors
          </motion.h2>
        </div>
      </div>
    </>
  );
}
