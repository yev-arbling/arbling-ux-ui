'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function CTADemo() {
  // Generate floating particles
  const particles = React.useMemo(() =>
    [...Array(30)].map((_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      duration: 10 + Math.random() * 10,
      delay: Math.random() * 5
    })), []);

  return (
    <>
      <h2 className="demo-title">CTA Section</h2>
      <p className="demo-subtitle">Premium call-to-action with animated gradient, particles, and glow effects.</p>
      <div className="demo-area">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            width: '100%',
            maxWidth: 850,
            padding: '70px 60px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            backgroundSize: '200% 200%',
            borderRadius: 32,
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 30px 60px rgba(102, 126, 234, 0.3)'
          }}
        >
          {/* Animated gradient */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
              backgroundSize: '200% 200%'
            }}
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Light orbs */}
          <motion.div
            style={{
              position: 'absolute',
              width: 300,
              height: 300,
              left: '-10%',
              top: '-50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 60%)',
              filter: 'blur(40px)'
            }}
            animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            style={{
              position: 'absolute',
              width: 250,
              height: 250,
              right: '-5%',
              bottom: '-40%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 60%)',
              filter: 'blur(40px)'
            }}
            animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Floating particles */}
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: particle.size,
                height: particle.size,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.4)'
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.2, 0.6, 0.2]
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}

          {/* Grid pattern */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            opacity: 0.5
          }} />

          {/* Content */}
          <div style={{ position: 'relative' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 16px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: 20,
                marginBottom: 25,
                backdropFilter: 'blur(10px)'
              }}
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🚀
              </motion.span>
              <span style={{ fontSize: '0.9rem' }}>Limited time offer</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{ fontSize: '3rem', marginBottom: 15, fontWeight: 700 }}
            >
              Ready to get started?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                marginBottom: 35,
                opacity: 0.9,
                fontSize: '1.2rem',
                maxWidth: 500,
                margin: '0 auto 35px'
              }}
            >
              Join 10,000+ teams already building better products with us.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ display: 'flex', gap: 15, justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <motion.button
                style={{
                  padding: '16px 36px',
                  background: '#fff',
                  color: '#764ba2',
                  border: 'none',
                  borderRadius: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '1rem',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 15px 40px rgba(0,0,0,0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                Start Free Trial →
              </motion.button>
              <motion.button
                style={{
                  padding: '16px 36px',
                  background: 'rgba(255,255,255,0.15)',
                  color: '#fff',
                  border: '2px solid rgba(255,255,255,0.4)',
                  borderRadius: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '1rem',
                  backdropFilter: 'blur(10px)'
                }}
                whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.25)', borderColor: '#fff' }}
                whileTap={{ scale: 0.95 }}
              >
                Talk to Sales
              </motion.button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                marginTop: 35,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 25,
                flexWrap: 'wrap'
              }}
            >
              {['No credit card required', '14-day free trial', 'Cancel anytime'].map((text, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: 0.9 }}>
                  <span style={{ color: '#fff' }}>✓</span>
                  <span style={{ fontSize: '0.9rem' }}>{text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Border glow */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 32,
            border: '1px solid rgba(255,255,255,0.2)',
            pointerEvents: 'none'
          }} />
        </motion.div>
      </div>
    </>
  );
}
