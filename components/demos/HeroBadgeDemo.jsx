'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function HeroBadgeDemo() {
  const [badgeHovered, setBadgeHovered] = React.useState(false);

  const highlights = [
    '10x faster builds',
    'New plugin system',
    'AI-powered suggestions',
    'Real-time collaboration'
  ];

  return (
    <>
      <h2 className="demo-title">Hero Badge</h2>
      <p className="demo-subtitle">Premium announcement badge with shimmer, glow, and feature highlights.</p>
      <div className="demo-area">
        <div style={{
          width: '100%',
          maxWidth: 900,
          padding: 60,
          borderRadius: 24,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background glow */}
          <motion.div
            style={{
              position: 'absolute',
              top: '30%',
              left: '50%',
              width: 400,
              height: 200,
              marginLeft: -200,
              background: 'radial-gradient(ellipse, rgba(102, 126, 234, 0.15) 0%, transparent 70%)',
              filter: 'blur(40px)',
              pointerEvents: 'none'
            }}
            animate={{
              scale: badgeHovered ? 1.3 : 1,
              opacity: badgeHovered ? 0.8 : 0.5
            }}
          />

          <div style={{ position: 'relative' }}>
            {/* Announcement Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              onHoverStart={() => setBadgeHovered(true)}
              onHoverEnd={() => setBadgeHovered(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 20px',
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.15))',
                border: '1px solid rgba(102, 126, 234, 0.4)',
                borderRadius: 30,
                marginBottom: 35,
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: badgeHovered ? '0 0 30px rgba(102, 126, 234, 0.3)' : 'none',
                transition: 'box-shadow 0.3s'
              }}
            >
              {/* Shimmer effect */}
              <motion.div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  transform: 'skewX(-20deg)'
                }}
                animate={{ x: [-300, 400] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
              />

              {/* Pulsing dot */}
              <motion.span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#00ff88',
                  boxShadow: '0 0 10px #00ff88'
                }}
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />

              <span style={{
                fontSize: '0.9rem',
                fontWeight: 600,
                background: 'linear-gradient(90deg, #667eea, #764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                🎉 Announcing v2.0
              </span>

              <span style={{
                width: 1,
                height: 16,
                background: 'rgba(255,255,255,0.2)'
              }} />

              <span style={{ fontSize: '0.85rem', color: '#aaa' }}>
                The biggest update yet
              </span>

              <motion.span
                style={{ color: '#667eea', fontSize: '1rem' }}
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.div>

            {/* Main title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                fontSize: '3.5rem',
                marginBottom: 20,
                lineHeight: 1.1
              }}
            >
              The{' '}
              <span style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2, #f093fb)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                next generation
              </span>
              <br />is here
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ color: '#888', maxWidth: 550, margin: '0 auto 40px', fontSize: '1.15rem', lineHeight: 1.7 }}
            >
              Completely redesigned from the ground up with performance, developer experience, and scalability in mind.
            </motion.p>

            {/* Feature highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                display: 'flex',
                gap: 15,
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginBottom: 40
              }}
            >
              {highlights.map((highlight, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{ scale: 1.05, background: 'rgba(102, 126, 234, 0.15)' }}
                  style={{
                    padding: '10px 18px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: 12,
                    border: '1px solid rgba(255,255,255,0.08)',
                    fontSize: '0.9rem',
                    color: '#aaa',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ color: '#667eea' }}>✓</span>
                  {highlight}
                </motion.div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{ display: 'flex', gap: 15, justifyContent: 'center' }}
            >
              <motion.button
                className="primary-btn replay-btn"
                whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(102, 126, 234, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                style={{ padding: '14px 32px', fontSize: '1rem' }}
              >
                Upgrade Now →
              </motion.button>
              <motion.button
                className="replay-btn"
                style={{
                  padding: '14px 32px',
                  fontSize: '1rem',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                Read Changelog
              </motion.button>
            </motion.div>

            {/* Version comparison */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{
                marginTop: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 20
              }}
            >
              <span style={{ color: '#555', fontSize: '0.85rem' }}>v1.9</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    style={{
                      width: 20,
                      height: 3,
                      background: i < 3 ? '#667eea' : 'rgba(255,255,255,0.1)',
                      borderRadius: 2
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                  />
                ))}
              </div>
              <span style={{
                color: '#667eea',
                fontSize: '0.85rem',
                fontWeight: 600
              }}>v2.0</span>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
