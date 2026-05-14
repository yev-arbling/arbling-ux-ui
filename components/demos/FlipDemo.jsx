'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function FlipDemo() {
  const items = [
    { text: 'ABOUT', flip: 'LEARN MORE', color: '#667eea' },
    { text: 'WORK', flip: 'VIEW PROJECTS', color: '#f093fb' },
    { text: 'CONTACT', flip: 'GET IN TOUCH', color: '#43e97b' },
    { text: 'BLOG', flip: 'READ ARTICLES', color: '#4facfe' }
  ];

  return (
    <>
      <h2 className="demo-title">Flip Text</h2>
      <p className="demo-subtitle">Menu items flip on hover to reveal secondary content. Popular in portfolio sites.</p>
      <div className="demo-area">
        <div className="flip-wrap" style={{ display: 'flex', gap: 40 }}>
          {items.map((item, i) => (
            <motion.div
              key={i}
              className="flip-card"
              initial="rest"
              whileHover="hover"
              style={{ cursor: 'pointer', padding: '15px 30px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
              whileTap={{ scale: 0.95 }}
            >
              <div style={{ overflow: 'hidden', height: '1.5em', position: 'relative' }}>
                <motion.span
                  style={{ display: 'block', fontSize: '1.3rem', fontWeight: 700, letterSpacing: '0.1em' }}
                  variants={{ rest: { y: 0 }, hover: { y: '-100%' } }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {item.text}
                </motion.span>
                <motion.span
                  style={{ position: 'absolute', top: '100%', left: 0, color: item.color, fontSize: '1.1rem', fontWeight: 600, letterSpacing: '0.05em' }}
                  variants={{ rest: { y: 0 }, hover: { y: '-100%' } }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {item.flip}
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
