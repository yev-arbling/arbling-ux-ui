'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder, useMotionTemplate } from 'framer-motion';

export default function HolographicDemo() {
  const ref = React.useRef(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useTransform(y, [0, 1], [10, -10]);
  const rotateY = useTransform(x, [0, 1], [-10, 10]);
  const gradientX = useTransform(x, [0, 1], [0, 100]);
  const gradientY = useTransform(y, [0, 1], [0, 100]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const background = useMotionTemplate`
    linear-gradient(
      ${gradientX}deg,
      rgba(255, 0, 128, 0.3) 0%,
      rgba(0, 255, 255, 0.3) 25%,
      rgba(255, 255, 0, 0.3) 50%,
      rgba(0, 255, 128, 0.3) 75%,
      rgba(128, 0, 255, 0.3) 100%
    )
  `;

  return (
    <>
      <h2 className="demo-title">Holographic Card</h2>
      <p className="demo-subtitle">Rainbow holographic effect that shifts with mouse movement. Premium card feel.</p>
      <div className="demo-area">
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { x.set(0.5); y.set(0.5); }}
          style={{
            width: 300,
            height: 180,
            borderRadius: 16,
            background: 'linear-gradient(145deg, #1a1a2e, #16213e)',
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer',
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d'
          }}
        >
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              background,
              mixBlendMode: 'overlay'
            }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)',
            backgroundSize: '200% 200%',
            animation: 'shimmer 3s infinite linear'
          }} />
          <div style={{ position: 'relative', padding: 24 }}>
            <div style={{ fontSize: '2rem', marginBottom: 12 }}>💳</div>
            <div style={{ fontWeight: 600 }}>HOLOGRAPHIC</div>
            <div style={{ fontSize: '0.75rem', color: '#888', marginTop: 4 }}>Premium Card</div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
