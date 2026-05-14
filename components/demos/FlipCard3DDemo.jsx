'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function FlipCard3DDemo() {
  const [isFlipped, setIsFlipped] = React.useState(false);

  return (
    <>
      <h2 className="demo-title">3D Flip Card</h2>
      <p className="demo-subtitle">Click to flip. Uses rotateY with backface-visibility for true 3D card flip effect.</p>
      <div className="demo-area">
        <div style={{ perspective: 1200 }}>
          <motion.div
            style={{
              width: 300,
              height: 400,
              position: 'relative',
              transformStyle: 'preserve-3d',
              cursor: 'pointer'
            }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 80, damping: 15 }}
            onClick={() => setIsFlipped(!isFlipped)}
            whileHover={{ scale: 1.02 }}
          >
            {/* Front */}
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              background: 'linear-gradient(145deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
              borderRadius: 24,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 35,
              boxShadow: '0 25px 50px -12px rgba(102,126,234,0.4)'
            }}>
              <div style={{ width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', marginBottom: 25, backdropFilter: 'blur(10px)' }}>👤</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 8 }}>John Developer</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', marginBottom: 20 }}>Full Stack Engineer</p>
              <div style={{ display: 'flex', gap: 15 }}>
                {['🐙', '🐦', '💼'].map((icon, i) => (
                  <div key={i} style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
                ))}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginTop: 25 }}>Tap to see details →</p>
            </div>
            {/* Back */}
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)',
              borderRadius: 24,
              transform: 'rotateY(180deg)',
              display: 'flex',
              flexDirection: 'column',
              padding: 35,
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 20, background: 'linear-gradient(135deg, #667eea, #f093fb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>About Me</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: 25 }}>5+ years building scalable web applications. Passionate about clean code and beautiful UIs.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[{ icon: '📍', text: 'San Francisco, CA' }, { icon: '💻', text: 'React, Node, TypeScript' }, { icon: '🎯', text: 'Open to opportunities' }].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}><span>{item.icon}</span><span>{item.text}</span></div>
                ))}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', marginTop: 'auto' }}>← Tap to flip back</p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
