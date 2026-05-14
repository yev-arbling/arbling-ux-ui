'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function WavyTextDemo() {
  const text = "ANIMATE EVERYTHING";
  const letters = text.split("");
  const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#43e97b'];

  return (
    <>
      <h2 className="demo-title">Wavy Text</h2>
      <p className="demo-subtitle">Letters animate in a continuous wave pattern with gradient colors.</p>
      <div className="demo-area" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, height: 200, background: 'radial-gradient(ellipse, rgba(102,126,234,0.2) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
        <motion.div
          style={{ display: 'flex', fontSize: '3.5rem', fontWeight: 900, letterSpacing: 6, position: 'relative', zIndex: 1 }}
        >
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              animate={{
                y: [0, -25, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.06,
                ease: "easeInOut"
              }}
              style={{
                display: 'inline-block',
                background: `linear-gradient(135deg, ${colors[i % colors.length]}, ${colors[(i + 1) % colors.length]})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: `0 0 30px ${colors[i % colors.length]}40`
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </>
  );
}
