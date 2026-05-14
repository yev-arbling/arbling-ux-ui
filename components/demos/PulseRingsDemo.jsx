'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function PulseRingsDemo() {
  const [active, setActive] = React.useState(true);
  const colors = ['#667eea', '#f093fb', '#4facfe'];
  return (
    <>
      <h2 className="demo-title">Pulse Rings</h2>
      <p className="demo-subtitle">Expanding rings emanating from center. Click to toggle. Perfect for live indicators.</p>
      <div className="demo-area">
        <div style={{ position: 'relative', width: 280, height: 280, cursor: 'pointer' }} onClick={() => setActive(!active)}>
          {active && [0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                inset: 0,
                border: `2px solid ${colors[i % colors.length]}`,
                borderRadius: '50%',
                boxShadow: `0 0 20px ${colors[i % colors.length]}30`
              }}
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{
                scale: [1, 3],
                opacity: [0.6, 0]
              }}
              transition={{
                duration: 3,
                delay: i * 0.5,
                repeat: Infinity,
                ease: 'easeOut'
              }}
            />
          ))}
          <motion.div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: 100,
              height: 100,
              marginLeft: -50,
              marginTop: -50,
              background: active ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'linear-gradient(135deg, #444, #333)',
              borderRadius: '50%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: active ? '0 0 40px rgba(102, 126, 234, 0.6)' : '0 0 20px rgba(0,0,0,0.3)'
            }}
            animate={{ scale: active ? [1, 1.08, 1] : 1 }}
            transition={{ duration: 1.5, repeat: Infinity }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span style={{ fontSize: '1.8rem' }}>{active ? '🔴' : '⚫'}</span>
            <span style={{ fontSize: '0.65rem', fontWeight: 600, marginTop: 4, textTransform: 'uppercase', letterSpacing: 1 }}>{active ? 'Live' : 'Off'}</span>
          </motion.div>
          {active && <motion.div style={{ position: 'absolute', top: 15, right: 15, padding: '4px 10px', background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.5)', borderRadius: 20, fontSize: '0.7rem', fontWeight: 600, color: '#ef4444' }} animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1, repeat: Infinity }}>LIVE</motion.div>}
        </div>
      </div>
    </>
  );
}
