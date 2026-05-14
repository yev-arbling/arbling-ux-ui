'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function RevealDemo() {
  const [key, setKey] = React.useState(0);
  const lines = [
    { text: 'CREATIVE', color: '#667eea' },
    { text: 'DEVELOPER', color: '#f093fb' },
    { text: '& DESIGNER', color: '#43e97b' }
  ];

  return (
    <>
      <h2 className="demo-title">Text Reveal</h2>
      <p className="demo-subtitle">Premium portfolio-style text reveal with sliding masks and staggered timing.</p>
      <div className="demo-area">
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            height: 200,
            background: 'radial-gradient(circle, rgba(102,126,234,0.15) 0%, transparent 70%)',
            filter: 'blur(50px)',
            pointerEvents: 'none'
          }} />
          <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 8, position: 'relative', zIndex: 1 }}>
            {lines.map((line, i) => (
              <div key={i} style={{ position: 'relative', overflow: 'hidden', padding: '4px 0' }}>
                <motion.div
                  style={{
                    fontSize: '3.5rem',
                    fontWeight: 900,
                    letterSpacing: '-0.02em',
                    lineHeight: 1
                  }}
                  initial={{ y: '120%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span style={{
                    background: `linear-gradient(135deg, ${line.color}, ${line.color}aa)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    {line.text}
                  </span>
                </motion.div>
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(90deg, ${line.color}, ${line.color}88)`,
                    transformOrigin: 'right'
                  }}
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.12 + 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            ))}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              style={{ marginTop: 20, color: 'rgba(255,255,255,0.5)', fontSize: '1rem' }}
            >
              Building digital experiences that matter.
            </motion.p>
          </div>
          <button className="replay-btn" onClick={() => setKey(k => k + 1)} style={{ marginTop: 30 }}>Replay</button>
        </div>
      </div>
    </>
  );
}
