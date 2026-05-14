'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function TiltGallery3DDemo() {
  const images = [
    { emoji: '🌄', label: 'Mountains' },
    { emoji: '🌊', label: 'Ocean' },
    { emoji: '🌲', label: 'Forest' },
    { emoji: '🏙️', label: 'City' }
  ];

  function TiltCard({ emoji, label }) {
    const ref = React.useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-0.5, 0.5], [15, -15]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-15, 15]);

    const handleMouseMove = (e) => {
      const rect = ref.current.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width - 0.5);
      y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    return (
      <motion.div
        ref={ref}
        style={{
          width: 140,
          height: 180,
          background: 'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))',
          borderRadius: 16,
          border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transformStyle: 'preserve-3d',
          rotateX,
          rotateY
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        whileHover={{ scale: 1.05 }}
      >
        <motion.div style={{ fontSize: '3rem', translateZ: 30 }}>{emoji}</motion.div>
        <motion.p style={{ marginTop: 10, fontSize: '0.85rem', translateZ: 20 }}>{label}</motion.p>
      </motion.div>
    );
  }

  return (
    <>
      <h2 className="demo-title">3D Tilt Gallery</h2>
      <p className="demo-subtitle">Each card tilts independently based on cursor position with parallax depth.</p>
      <div className="demo-area">
        <div style={{ display: 'flex', gap: 20, perspective: 1000 }}>
          {images.map((img, i) => (
            <TiltCard key={i} {...img} />
          ))}
        </div>
      </div>
    </>
  );
}
