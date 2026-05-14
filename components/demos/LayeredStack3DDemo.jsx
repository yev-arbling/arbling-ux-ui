'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function LayeredStack3DDemo() {
  const [hovered, setHovered] = React.useState(false);
  const layers = [
    { color: '#667eea', z: 0, label: 'Database' },
    { color: '#764ba2', z: 30, label: 'Backend' },
    { color: '#f093fb', z: 60, label: 'API' },
    { color: '#f5576c', z: 90, label: 'Frontend' },
    { color: '#4facfe', z: 120, label: 'UI' }
  ];

  return (
    <>
      <h2 className="demo-title">3D Layer Stack</h2>
      <p className="demo-subtitle">Hover to explode the stack and reveal all layers.</p>
      <div className="demo-area">
        <div
          style={{ perspective: 1000, cursor: 'pointer' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <motion.div
            style={{
              width: 250,
              height: 160,
              position: 'relative',
              transformStyle: 'preserve-3d'
            }}
            animate={{ rotateX: hovered ? 50 : 15, rotateZ: hovered ? -5 : 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          >
            {layers.map((layer, i) => (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: 30,
                  background: layer.color,
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                }}
                animate={{
                  translateZ: hovered ? layer.z * 1.5 : layer.z * 0.3,
                  translateY: hovered ? -i * 8 : -i * 2
                }}
                transition={{ type: 'spring', stiffness: 150, damping: 15, delay: i * 0.05 }}
              >
                {layer.label}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}
