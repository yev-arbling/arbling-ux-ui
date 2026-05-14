'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function HeroCenteredDemo() {
  const words = ['developers', 'designers', 'creators', 'teams'];
  const [wordIndex, setWordIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => setWordIndex(i => (i + 1) % words.length), 2500);
    return () => clearInterval(interval);
  }, []);

  // Floating decorative elements
  const floatingElements = [
    { emoji: '⚡', x: '10%', y: '20%', delay: 0 },
    { emoji: '🚀', x: '85%', y: '15%', delay: 0.5 },
    { emoji: '💎', x: '5%', y: '70%', delay: 1 },
    { emoji: '✨', x: '90%', y: '75%', delay: 1.5 },
    { emoji: '🎯', x: '15%', y: '85%', delay: 2 },
    { emoji: '⭐', x: '80%', y: '85%', delay: 2.5 }
  ];

  return (
    <>
      <h2 className="demo-title">Hero Centered</h2>
      <p className="demo-subtitle">Bold centered text with rotating word animation, floating elements, and trust indicators.</p>
      <div className="demo-area">
        <div style={{
          width: '100%',
          maxWidth: 900,
          padding: 60,
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 24
        }}>
          {/* Gradient background layers */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at 30% 20%, rgba(102, 126, 234, 0.2) 0%, transparent 50%)'
            }}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at 70% 80%, rgba(118, 75, 162, 0.2) 0%, transparent 50%)'
            }}
            animate={{ opacity: [0.8, 0.5, 0.8] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Floating decorative elements */}
          {floatingElements.map((el, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                left: el.x,
                top: el.y,
                fontSize: '1.5rem',
                opacity: 0.4,
                filter: 'blur(1px)'
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
                scale: 1,
                y: [0, -15, 0]
              }}
              transition={{
                opacity: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                y: { duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut' },
                scale: { delay: el.delay, duration: 0.5 }
              }}
            >
              {el.emoji}
            </motion.div>
          ))}

          {/* Content */}
          <div style={{ position: 'relative', textAlign: 'center' }}>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 14px',
                background: 'rgba(102, 126, 234, 0.15)',
                border: '1px solid rgba(102, 126, 234, 0.3)',
                borderRadius: 20,
                marginBottom: 25
              }}
            >
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ fontSize: '0.9rem' }}
              >
                🎉
              </motion.span>
              <span style={{ fontSize: '0.85rem', color: '#888' }}>Now available for everyone</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ fontSize: '3.2rem', marginBottom: 15, lineHeight: 1.1 }}
            >
              Built for{' '}
              <span style={{ display: 'inline-block', minWidth: 220 }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ opacity: 0, y: 30, filter: 'blur(10px)', scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                    exit={{ opacity: 0, y: -30, filter: 'blur(10px)', scale: 0.8 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      display: 'inline-block',
                      background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb)',
                      backgroundSize: '200% 100%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    {words[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ color: '#888', maxWidth: 500, margin: '0 auto 35px', lineHeight: 1.7, fontSize: '1.1rem' }}
            >
              The most powerful platform for building and deploying your next big idea. Start free, scale infinitely.
            </motion.p>

            {/* Email form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                display: 'inline-flex',
                gap: 12,
                padding: 6,
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  padding: '14px 20px',
                  borderRadius: 8,
                  border: 'none',
                  background: 'transparent',
                  color: '#fff',
                  width: 260,
                  outline: 'none'
                }}
              />
              <motion.button
                className="primary-btn replay-btn"
                whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                style={{ padding: '14px 28px' }}
              >
                Get Early Access →
              </motion.button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{ marginTop: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: '#ffd700' }}>★★★★★</span>
                <span style={{ color: '#888', fontSize: '0.85rem' }}>4.9/5</span>
              </div>
              <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.2)' }} />
              <div style={{ color: '#888', fontSize: '0.85rem' }}>Trusted by 10,000+ teams</div>
              <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.2)' }} />
              <div style={{ display: 'flex', marginLeft: -8 }}>
                {['👩‍💼', '👨‍💻', '👩‍🎨', '👨‍🔬'].map((avatar, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: 'rgba(102, 126, 234, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.9rem',
                      marginLeft: i > 0 ? -8 : 0,
                      border: '2px solid #1a1a2e'
                    }}
                  >
                    {avatar}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
