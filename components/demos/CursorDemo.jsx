'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function CursorDemo() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const dotX = useSpring(cursorX, { damping: 25, stiffness: 200 });
  const dotY = useSpring(cursorY, { damping: 25, stiffness: 200 });
  const ringX = useSpring(cursorX, { damping: 40, stiffness: 90 });
  const ringY = useSpring(cursorY, { damping: 40, stiffness: 90 });
  const glowX = useSpring(cursorX, { damping: 60, stiffness: 50 });
  const glowY = useSpring(cursorY, { damping: 60, stiffness: 50 });
  const [show, setShow] = React.useState(false);
  const [isHovering, setIsHovering] = React.useState(false);

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
  };

  return (
    <>
      <h2 className="demo-title">Custom Cursor</h2>
      <p className="demo-subtitle">Triple-layer cursor with different spring physics. Hover the buttons to see cursor expand.</p>
      <div className="demo-area">
        <div
          className="cursor-area"
          onMouseMove={handleMove}
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          style={{
            background: 'linear-gradient(135deg, rgba(10,10,20,0.95), rgba(20,20,40,0.95))',
            borderRadius: 20,
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', gap: 20, zIndex: 10 }}>
            {['Explore', 'Create', 'Launch'].map((text, i) => (
              <motion.button
                key={text}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '12px 24px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 10,
                  color: '#fff',
                  cursor: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 600
                }}
              >
                {text}
              </motion.button>
            ))}
          </div>
          {show && (
            <>
              <motion.div style={{
                position: 'absolute',
                x: glowX,
                y: glowY,
                translateX: '-50%',
                translateY: '-50%',
                width: 150,
                height: 150,
                background: 'radial-gradient(circle, rgba(102,126,234,0.3) 0%, transparent 70%)',
                pointerEvents: 'none',
                filter: 'blur(20px)'
              }} />
              <motion.div
                animate={{ scale: isHovering ? 1.8 : 1, borderColor: isHovering ? '#667eea' : 'rgba(255,255,255,0.5)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{
                  position: 'absolute',
                  x: ringX,
                  y: ringY,
                  translateX: '-50%',
                  translateY: '-50%',
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  border: '2px solid rgba(255,255,255,0.5)',
                  pointerEvents: 'none',
                  mixBlendMode: 'difference'
                }}
              />
              <motion.div style={{
                position: 'absolute',
                x: dotX,
                y: dotY,
                translateX: '-50%',
                translateY: '-50%',
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#fff',
                pointerEvents: 'none'
              }} />
            </>
          )}
        </div>
      </div>
    </>
  );
}
