'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function NewsletterDemo() {
  const [submitted, setSubmitted] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [isValid, setIsValid] = React.useState(true);

  const validateEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value) {
      setIsValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
    } else {
      setIsValid(true);
    }
  };

  const handleSubmit = () => {
    if (email && isValid) {
      setSubmitted(true);
    }
  };

  return (
    <>
      <h2 className="demo-title">Newsletter</h2>
      <p className="demo-subtitle">Premium email capture with validation, loading state, and celebration animation.</p>
      <div className="demo-area">
        <div style={{
          width: '100%',
          maxWidth: 550,
          padding: 50,
          borderRadius: 24,
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background glow */}
          <motion.div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 300,
              height: 300,
              marginLeft: -150,
              marginTop: -150,
              background: submitted
                ? 'radial-gradient(circle, rgba(0, 255, 136, 0.15) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)',
              filter: 'blur(40px)',
              pointerEvents: 'none',
              transition: 'background 0.5s'
            }}
          />

          {/* Border */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 24,
            border: '1px solid rgba(255,255,255,0.06)'
          }} />

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                style={{ position: 'relative', textAlign: 'center' }}
              >
                <motion.div
                  style={{ fontSize: '3rem', marginBottom: 20 }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  📬
                </motion.div>

                <h3 style={{ fontSize: '1.8rem', marginBottom: 10 }}>
                  Stay in the{' '}
                  <span style={{
                    background: 'linear-gradient(90deg, #667eea, #764ba2)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>loop</span>
                </h3>
                <p style={{ color: '#888', marginBottom: 30, lineHeight: 1.6 }}>
                  Get weekly updates on new features, tips, and exclusive offers. No spam, ever.
                </p>

                <div style={{
                  display: 'flex',
                  gap: 12,
                  padding: 6,
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: 16,
                  border: `1px solid ${!isValid && email ? 'rgba(255, 68, 68, 0.5)' : 'rgba(255,255,255,0.08)'}`
                }}>
                  <input
                    type="email"
                    value={email}
                    onChange={validateEmail}
                    placeholder="you@example.com"
                    style={{
                      flex: 1,
                      padding: '16px 20px',
                      borderRadius: 12,
                      border: 'none',
                      background: 'transparent',
                      color: '#fff',
                      outline: 'none',
                      fontSize: '1rem'
                    }}
                  />
                  <motion.button
                    className="primary-btn replay-btn"
                    style={{
                      padding: '16px 28px',
                      opacity: !email || !isValid ? 0.5 : 1,
                      cursor: !email || !isValid ? 'not-allowed' : 'pointer'
                    }}
                    whileHover={email && isValid ? { scale: 1.02 } : {}}
                    whileTap={email && isValid ? { scale: 0.98 } : {}}
                    onClick={handleSubmit}
                  >
                    Subscribe →
                  </motion.button>
                </div>

                {!isValid && email && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ color: '#ff4444', fontSize: '0.85rem', marginTop: 10, textAlign: 'left', marginLeft: 10 }}
                  >
                    Please enter a valid email address
                  </motion.p>
                )}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  style={{ marginTop: 25, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ color: '#00ff88', fontSize: '0.8rem' }}>✓</span>
                    <span style={{ color: '#888', fontSize: '0.85rem' }}>No spam</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ color: '#00ff88', fontSize: '0.8rem' }}>✓</span>
                    <span style={{ color: '#888', fontSize: '0.85rem' }}>Unsubscribe anytime</span>
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ position: 'relative', textAlign: 'center' }}
              >
                {/* Confetti-like elements */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    style={{
                      position: 'absolute',
                      width: 8,
                      height: 8,
                      borderRadius: i % 2 === 0 ? '50%' : 2,
                      background: ['#667eea', '#00ff88', '#f093fb', '#ffd700'][i % 4],
                      left: '50%',
                      top: '30%'
                    }}
                    initial={{ x: 0, y: 0, opacity: 1 }}
                    animate={{
                      x: (Math.random() - 0.5) * 200,
                      y: (Math.random() - 0.5) * 200,
                      opacity: 0,
                      rotate: Math.random() * 360
                    }}
                    transition={{ duration: 1, delay: i * 0.05 }}
                  />
                ))}

                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #00ff88, #00d4ff)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 25px',
                    fontSize: '2.5rem',
                    boxShadow: '0 10px 30px rgba(0, 255, 136, 0.3)'
                  }}
                >
                  ✓
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  style={{ fontSize: '1.8rem', marginBottom: 10 }}
                >
                  You're in! 🎉
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{ color: '#888', marginBottom: 10 }}
                >
                  Welcome to our community!
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  style={{ color: '#666', fontSize: '0.9rem', marginBottom: 25 }}
                >
                  Check your inbox at <span style={{ color: '#667eea' }}>{email}</span> for confirmation
                </motion.p>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="replay-btn"
                  style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}
                  onClick={() => { setSubmitted(false); setEmail(''); }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Reset Demo
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
