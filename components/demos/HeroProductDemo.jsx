'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function HeroProductDemo() {
  const containerRef = React.useRef(null);
  const [rotate, setRotate] = React.useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = React.useState(false);

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / 15;
    const y = -(e.clientX - rect.left - rect.width / 2) / 15;
    setRotate({ x, y });
  };

  const features = [
    { icon: '⚡', text: 'Lightning fast', color: '#ffd700' },
    { icon: '🎨', text: 'Beautiful design', color: '#f093fb' },
    { icon: '🔒', text: 'Secure by default', color: '#00ff88' }
  ];

  return (
    <>
      <h2 className="demo-title">Hero Product</h2>
      <p className="demo-subtitle">3D product showcase with floating features and reactive lighting.</p>
      <div className="demo-area">
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => { setRotate({ x: 0, y: 0 }); setIsHovering(false); }}
          style={{
            width: '100%',
            maxWidth: 900,
            padding: 60,
            borderRadius: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 80,
            perspective: 1200,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Dynamic background glow */}
          <motion.div
            style={{
              position: 'absolute',
              width: 400,
              height: 400,
              right: isHovering ? '25%' : '30%',
              top: '50%',
              marginTop: -200,
              background: 'radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 60%)',
              filter: 'blur(60px)',
              pointerEvents: 'none'
            }}
            animate={{
              x: rotate.y * 5,
              y: rotate.x * 5,
              scale: isHovering ? 1.2 : 1
            }}
            transition={{ type: 'spring', stiffness: 100 }}
          />

          {/* Text content */}
          <div style={{ flex: 1, maxWidth: 380, position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 14px',
                background: 'rgba(102, 126, 234, 0.15)',
                border: '1px solid rgba(102, 126, 234, 0.3)',
                borderRadius: 20,
                marginBottom: 20
              }}
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✨
              </motion.span>
              <span style={{ fontSize: '0.85rem', color: '#667eea' }}>New Release</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ fontSize: '2rem', marginBottom: 10, color: '#888' }}
            >
              Introducing
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                fontSize: '3.5rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #667eea, #764ba2, #f093fb)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: 20,
                lineHeight: 1.1
              }}
            >
              Product X
            </motion.div>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              style={{ color: '#888', lineHeight: 1.7, marginBottom: 30, fontSize: '1.1rem' }}
            >
              Revolutionary design meets unparalleled performance. The future of productivity is here.
            </motion.p>

            {/* Feature list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 12 }}
                >
                  <span style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: `${feature.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {feature.icon}
                  </span>
                  <span style={{ color: '#aaa', fontSize: '0.95rem' }}>{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              style={{ marginTop: 30, display: 'flex', gap: 15 }}
            >
              <motion.button
                className="primary-btn replay-btn"
                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                Pre-order Now →
              </motion.button>
            </motion.div>
          </div>

          {/* 3D Product Card */}
          <div style={{ position: 'relative' }}>
            {/* Floating feature badges */}
            {[
              { label: '5G Ready', x: -60, y: 20 },
              { label: '256GB', x: 260, y: 50 },
              { label: 'Pro Camera', x: -40, y: 180 }
            ].map((badge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1, type: 'spring' }}
                style={{
                  position: 'absolute',
                  left: badge.x,
                  top: badge.y,
                  padding: '6px 12px',
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 8,
                  fontSize: '0.75rem',
                  color: '#ccc',
                  border: '1px solid rgba(255,255,255,0.1)',
                  zIndex: 10
                }}
              >
                {badge.label}
              </motion.div>
            ))}

            <motion.div
              style={{
                width: 280,
                height: 380,
                background: 'linear-gradient(145deg, #1a1a2e, #16213e)',
                borderRadius: 32,
                position: 'relative',
                overflow: 'hidden',
                transformStyle: 'preserve-3d',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
              animate={{
                rotateX: rotate.x,
                rotateY: rotate.y,
                boxShadow: isHovering
                  ? `${rotate.y * -3}px ${rotate.x * 3}px 60px rgba(102, 126, 234, 0.4)`
                  : '0 30px 60px rgba(0,0,0,0.3)'
              }}
              transition={{ type: 'spring', stiffness: 150, damping: 20 }}
            >
              {/* Screen glow */}
              <div style={{
                position: 'absolute',
                inset: 12,
                borderRadius: 24,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                opacity: 0.9
              }}>
                {/* Screen content */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 30
                }}>
                  <motion.div
                    style={{ fontSize: '4rem', marginBottom: 15 }}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    📱
                  </motion.div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>Product X</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: 5 }}>Next Generation</div>
                </div>
              </div>

              {/* Notch */}
              <div style={{
                position: 'absolute',
                top: 12,
                left: '50%',
                marginLeft: -30,
                width: 60,
                height: 20,
                background: '#0a0a15',
                borderRadius: '0 0 12px 12px'
              }} />

              {/* Reflection highlight */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '50%',
                  background: 'linear-gradient(to bottom, rgba(255,255,255,0.1), transparent)',
                  borderRadius: '32px 32px 0 0',
                  pointerEvents: 'none'
                }}
                animate={{
                  opacity: isHovering ? 0.3 : 0.1
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
