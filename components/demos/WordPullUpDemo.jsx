'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function WordPullUpDemo() {
  const [key, setKey] = React.useState(0);
  const words = "Build something extraordinary today".split(" ");
  const gradients = [
    'linear-gradient(135deg, #667eea, #764ba2)',
    'linear-gradient(135deg, #f093fb, #f5576c)',
    'linear-gradient(135deg, #4facfe, #00f2fe)',
    'linear-gradient(135deg, #43e97b, #38f9d7)'
  ];

  const pullupVariant = {
    initial: { y: 100, opacity: 0 },
    animate: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.12,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <>
      <h2 className="demo-title">Word Pull Up</h2>
      <p className="demo-subtitle">Words animate up from below with staggered timing and gradient colors.</p>
      <div className="demo-area" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, height: 400, background: 'radial-gradient(circle, rgba(102,126,234,0.15) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div key={key} style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', overflow: 'hidden', padding: 30, position: 'relative', zIndex: 1 }}>
          {words.map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={pullupVariant}
              initial="initial"
              animate="animate"
              style={{ fontSize: '3rem', fontWeight: 800, background: gradients[i % gradients.length], WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textShadow: '0 0 40px rgba(102,126,234,0.3)' }}
            >
              {word}
            </motion.span>
          ))}
        </div>
        <button className="replay-btn" onClick={() => setKey(k => k + 1)}>Replay</button>
      </div>
    </>
  );
}
