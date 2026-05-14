'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function HeroMarqueeDemo() {
  const techStack = [
    { name: 'React', icon: '⚛️', color: '#61dafb' },
    { name: 'Next.js', icon: '▲', color: '#fff' },
    { name: 'TypeScript', icon: '📘', color: '#3178c6' },
    { name: 'Tailwind', icon: '🎨', color: '#38bdf8' },
    { name: 'Framer', icon: '🎬', color: '#f093fb' },
    { name: 'Vercel', icon: '▲', color: '#fff' },
    { name: 'Prisma', icon: '💎', color: '#5a67d8' },
    { name: 'GraphQL', icon: '◈', color: '#e535ab' }
  ];

  const partners = ['Google', 'Meta', 'Apple', 'Amazon', 'Microsoft', 'Netflix', 'Spotify', 'Stripe'];

  return (
    <>
      <h2 className="demo-title">Hero Marquee</h2>
      <p className="demo-subtitle">Multi-layer infinite scrolling with icons, gradients, and edge fades.</p>
      <div className="demo-area">
        <div style={{
          width: '100%',
          maxWidth: 900,
          padding: '50px 0',
          borderRadius: 24,
          overflow: 'hidden',
          textAlign: 'center',
          position: 'relative'
        }}>
          {/* Background glow */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 400,
            height: 400,
            marginLeft: -200,
            marginTop: -200,
            background: 'radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)',
            filter: 'blur(40px)',
            pointerEvents: 'none'
          }} />

          <div style={{ position: 'relative' }}>
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
              <span style={{ fontSize: '0.85rem', color: '#667eea' }}>🔌 Integrations</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{ fontSize: '2.8rem', marginBottom: 10 }}
            >
              Works with your{' '}
              <span style={{
                background: 'linear-gradient(90deg, #667eea, #764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>entire stack</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ color: '#888', marginBottom: 40, fontSize: '1.1rem' }}
            >
              Seamless integration with the tools you already love
            </motion.p>

            {/* Tech stack marquee - Row 1 */}
            <div style={{ position: 'relative', overflow: 'hidden', padding: '15px 0', marginBottom: 10 }}>
              {/* Edge fades */}
              <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: 100,
                background: 'linear-gradient(to right, #0a0a15, transparent)',
                zIndex: 2,
                pointerEvents: 'none'
              }} />
              <div style={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: 100,
                background: 'linear-gradient(to left, #0a0a15, transparent)',
                zIndex: 2,
                pointerEvents: 'none'
              }} />

              <motion.div
                style={{ display: 'flex', gap: 30, whiteSpace: 'nowrap' }}
                animate={{ x: [0, -800] }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              >
                {[...techStack, ...techStack, ...techStack].map((tech, i) => (
                  <motion.div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '12px 24px',
                      background: 'rgba(255,255,255,0.03)',
                      borderRadius: 12,
                      border: '1px solid rgba(255,255,255,0.08)'
                    }}
                    whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.08)' }}
                  >
                    <span style={{ fontSize: '1.2rem' }}>{tech.icon}</span>
                    <span style={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: tech.color
                    }}>
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Row 2 - opposite direction */}
            <div style={{ position: 'relative', overflow: 'hidden', padding: '15px 0' }}>
              <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: 100,
                background: 'linear-gradient(to right, #0a0a15, transparent)',
                zIndex: 2,
                pointerEvents: 'none'
              }} />
              <div style={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: 100,
                background: 'linear-gradient(to left, #0a0a15, transparent)',
                zIndex: 2,
                pointerEvents: 'none'
              }} />

              <motion.div
                style={{ display: 'flex', gap: 30, whiteSpace: 'nowrap' }}
                animate={{ x: [-800, 0] }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              >
                {[...techStack.slice().reverse(), ...techStack.slice().reverse(), ...techStack.slice().reverse()].map((tech, i) => (
                  <motion.div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '12px 24px',
                      background: 'rgba(255,255,255,0.02)',
                      borderRadius: 12,
                      border: '1px solid rgba(255,255,255,0.05)'
                    }}
                    whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.06)' }}
                  >
                    <span style={{ fontSize: '1.2rem' }}>{tech.icon}</span>
                    <span style={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: 'rgba(255,255,255,0.4)'
                    }}>
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Partner logos */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{ marginTop: 40 }}
            >
              <p style={{ color: '#555', fontSize: '0.85rem', marginBottom: 20 }}>TRUSTED BY LEADING COMPANIES</p>
              <div style={{ display: 'flex', gap: 40, justifyContent: 'center', flexWrap: 'wrap' }}>
                {partners.map((partner, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                    whileHover={{ opacity: 1, color: '#fff' }}
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: 'rgba(255,255,255,0.25)',
                      cursor: 'pointer',
                      transition: 'color 0.3s'
                    }}
                  >
                    {partner}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
