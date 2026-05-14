'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function HeroSplitDemo() {
  const [key, setKey] = React.useState(0);

  const floatingElements = [
    { icon: '⚡', x: 20, y: 30, delay: 0 },
    { icon: '✨', x: 80, y: 20, delay: 0.2 },
    { icon: '🎯', x: 70, y: 70, delay: 0.4 },
    { icon: '💎', x: 15, y: 75, delay: 0.3 }
  ];

  return (
    <>
      <h2 className="demo-title">Hero Split</h2>
      <p className="demo-subtitle">Classic split layout with floating elements and staggered entrance.</p>
      <div className="demo-area">
        <div key={key} style={{
          width: '100%',
          maxWidth: 900,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 40,
          padding: 40,
          background: 'rgba(255,255,255,0.02)',
          borderRadius: 24,
          border: '1px solid rgba(255,255,255,0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background gradient blob */}
          <motion.div
            style={{
              position: 'absolute',
              width: 400,
              height: 400,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)',
              right: -100,
              top: -100,
              filter: 'blur(40px)'
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20, position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 12px',
                background: 'rgba(102, 126, 234, 0.1)',
                borderRadius: 20,
                width: 'fit-content',
                border: '1px solid rgba(102, 126, 234, 0.3)'
              }}
            >
              <span style={{ fontSize: '0.75rem' }}>🚀</span>
              <span style={{ fontSize: '0.75rem', color: '#667eea' }}>New Release</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ fontSize: '2.8rem', lineHeight: 1.15, fontWeight: 700 }}
            >
              The future of{' '}
              <span style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                design
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ color: '#888', lineHeight: 1.7, fontSize: '1.05rem' }}
            >
              Build beautiful interfaces with powerful animations and seamless interactions that delight users.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ display: 'flex', gap: 15, marginTop: 10 }}
            >
              <motion.button
                className="primary-btn replay-btn"
                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                style={{ padding: '14px 28px' }}
              >
                Get Started →
              </motion.button>
              <motion.button
                className="replay-btn"
                whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.15)' }}
                whileTap={{ scale: 0.95 }}
                style={{ padding: '14px 28px' }}
              >
                Watch Demo
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{ display: 'flex', gap: 20, marginTop: 15, alignItems: 'center' }}
            >
              <div style={{ display: 'flex' }}>
                {['#ff6b6b', '#4ecdc4', '#45b7d1', '#96c93d'].map((color, i) => (
                  <div key={i} style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: color,
                    border: '2px solid #0a0a0f',
                    marginLeft: i > 0 ? -10 : 0
                  }} />
                ))}
              </div>
              <span style={{ color: '#666', fontSize: '0.85rem' }}>Join 10,000+ designers</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              borderRadius: 20,
              height: 320,
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(102, 126, 234, 0.3)'
            }}
          >
            {/* Floating elements */}
            {floatingElements.map((el, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                transition={{
                  opacity: { delay: 0.5 + el.delay },
                  scale: { delay: 0.5 + el.delay, type: 'spring' },
                  y: { delay: 0.5 + el.delay, duration: 3, repeat: Infinity }
                }}
                style={{
                  position: 'absolute',
                  left: `${el.x}%`,
                  top: `${el.y}%`,
                  fontSize: '2rem',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: 12,
                  padding: '10px 12px',
                  backdropFilter: 'blur(10px)'
                }}
              >
                {el.icon}
              </motion.div>
            ))}

            {/* Center graphic */}
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                style={{
                  width: 150,
                  height: 150,
                  border: '2px dashed rgba(255,255,255,0.3)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div style={{
                  width: 80,
                  height: 80,
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                  backdropFilter: 'blur(10px)'
                }}>
                  🎨
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <button className="replay-btn" style={{ marginTop: 20 }} onClick={() => setKey(k => k + 1)}>
          Replay Animation
        </button>
      </div>
    </>
  );
}
