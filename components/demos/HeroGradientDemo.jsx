'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function HeroGradientDemo() {
  // Floating orbs data
  const orbs = React.useMemo(() => {
    return [...Array(20)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 3 + Math.random() * 8,
      duration: 15 + Math.random() * 10,
      delay: Math.random() * 5
    }));
  }, []);

  return (
    <>
      <h2 className="demo-title">Hero Gradient Mesh</h2>
      <p className="demo-subtitle">Mesmerizing gradient mesh with floating orbs and glass morphism.</p>
      <div className="demo-area">
        <div style={{
          width: '100%',
          maxWidth: 900,
          height: 450,
          borderRadius: 24,
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          {/* Dark base */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: '#0a0a15'
          }} />

          {/* Animated gradient blobs */}
          <motion.div
            style={{
              position: 'absolute',
              width: 500,
              height: 500,
              left: '20%',
              top: '30%',
              background: 'radial-gradient(circle, #667eea 0%, transparent 60%)',
              filter: 'blur(80px)',
              opacity: 0.6
            }}
            animate={{
              x: [0, 80, -40, 0],
              y: [0, -50, 30, 0],
              scale: [1, 1.2, 0.9, 1]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            style={{
              position: 'absolute',
              width: 400,
              height: 400,
              right: '10%',
              top: '20%',
              background: 'radial-gradient(circle, #764ba2 0%, transparent 60%)',
              filter: 'blur(80px)',
              opacity: 0.5
            }}
            animate={{
              x: [0, -60, 40, 0],
              y: [0, 60, -30, 0],
              scale: [1, 0.8, 1.1, 1]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            style={{
              position: 'absolute',
              width: 450,
              height: 450,
              left: '40%',
              bottom: '-20%',
              background: 'radial-gradient(circle, #f093fb 0%, transparent 60%)',
              filter: 'blur(80px)',
              opacity: 0.4
            }}
            animate={{
              x: [0, 50, -50, 0],
              y: [0, -40, 20, 0],
              scale: [1, 1.1, 0.95, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            style={{
              position: 'absolute',
              width: 300,
              height: 300,
              left: '5%',
              bottom: '10%',
              background: 'radial-gradient(circle, #4facfe 0%, transparent 60%)',
              filter: 'blur(60px)',
              opacity: 0.4
            }}
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -30, 40, 0]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Floating orbs */}
          {orbs.map((orb) => (
            <motion.div
              key={orb.id}
              style={{
                position: 'absolute',
                left: `${orb.x}%`,
                top: `${orb.y}%`,
                width: orb.size,
                height: orb.size,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.3)',
                boxShadow: '0 0 10px rgba(255,255,255,0.2)'
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2]
              }}
              transition={{
                duration: orb.duration,
                delay: orb.delay,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}

          {/* Grid overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            opacity: 0.5
          }} />

          {/* Content with glass card */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            zIndex: 1
          }}>
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 100 }}
              style={{
                padding: '50px 60px',
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: 24,
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
              }}
            >
              <motion.div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 14px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: 20,
                  marginBottom: 20
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                >
                  ✨
                </motion.span>
                <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)' }}>Introducing v2.0</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{
                  fontSize: '3.5rem',
                  marginBottom: 15,
                  background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Beautiful by default
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 400, marginBottom: 25 }}
              >
                Create stunning visuals with zero effort. Just works, everywhere.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{ display: 'flex', gap: 15, justifyContent: 'center' }}
              >
                <motion.button
                  className="primary-btn replay-btn"
                  whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
                <motion.button
                  className="replay-btn"
                  style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
                  whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.15)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          {/* Corner glow accents */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 200,
            height: 200,
            background: 'radial-gradient(circle at top left, rgba(102, 126, 234, 0.3), transparent 70%)',
            pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 200,
            height: 200,
            background: 'radial-gradient(circle at bottom right, rgba(240, 147, 251, 0.3), transparent 70%)',
            pointerEvents: 'none'
          }} />
        </div>
      </div>
    </>
  );
}
