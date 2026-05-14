'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function Floating3DDemo() {
  const shapes = [
    { type: 'sphere', x: -100, y: -60, z: 50, size: 60, color: '#667eea' },
    { type: 'cube', x: 80, y: 40, z: -30, size: 45, color: '#f093fb' },
    { type: 'ring', x: -50, y: 70, z: 20, size: 70, color: '#4facfe' },
    { type: 'pyramid', x: 120, y: -40, z: 40, size: 50, color: '#f5576c' },
    { type: 'sphere', x: 0, y: 0, z: 80, size: 80, color: '#764ba2' }
  ];

  return (
    <>
      <h2 className="demo-title">3D Floating</h2>
      <p className="demo-subtitle">Abstract shapes floating in 3D space with continuous animation.</p>
      <div className="demo-area">
        <div style={{ perspective: 1000, width: 350, height: 280 }}>
          <motion.div
            style={{ width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d' }}
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            {shapes.map((shape, i) => (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: shape.size,
                  height: shape.size,
                  marginLeft: -shape.size / 2,
                  marginTop: -shape.size / 2,
                  background: shape.type === 'ring'
                    ? 'transparent'
                    : `linear-gradient(135deg, ${shape.color}, ${shape.color}aa)`,
                  border: shape.type === 'ring' ? `4px solid ${shape.color}` : 'none',
                  borderRadius: shape.type === 'sphere' || shape.type === 'ring' ? '50%' : shape.type === 'pyramid' ? '0' : '8px',
                  transform: `translate3d(${shape.x}px, ${shape.y}px, ${shape.z}px)`,
                  clipPath: shape.type === 'pyramid' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none',
                  boxShadow: shape.type !== 'ring' ? '0 10px 30px rgba(0,0,0,0.3)' : 'none'
                }}
                animate={{
                  y: [shape.y - 15, shape.y + 15, shape.y - 15],
                  rotateZ: shape.type === 'cube' ? [0, 360] : 0
                }}
                transition={{
                  y: { duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' },
                  rotateZ: { duration: 10, repeat: Infinity, ease: 'linear' }
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}
