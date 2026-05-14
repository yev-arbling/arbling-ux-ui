'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function AuroraBorealisDemo() {
  const [stars] = React.useState(() =>
    [...Array(80)].map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 60,
      size: Math.random() * 2 + 0.5,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 2
    }))
  );

  const auroraLayers = [
    { color: '#00ff8866', angle: 100, duration: 6, x: [-30, 50, -30], y: [0, -20, 0] },
    { color: '#00ffff55', angle: 120, duration: 8, x: [20, -40, 20], y: [-10, 10, -10] },
    { color: '#ff00ff44', angle: 140, duration: 7, x: [-20, 30, -20], y: [5, -15, 5] },
    { color: '#4488ff44', angle: 90, duration: 9, x: [10, -20, 10], y: [-5, 25, -5] },
    { color: '#88ff8833', angle: 110, duration: 5, x: [-40, 20, -40], y: [10, -10, 10] },
  ];

  return (
    <>
      <h2 className="demo-title">Aurora Borealis</h2>
      <p className="demo-subtitle">Northern lights dancing across the Arctic sky with twinkling stars.</p>
      <div className="demo-area">
        <div style={{
          width: 600,
          height: 350,
          borderRadius: 20,
          overflow: 'hidden',
          position: 'relative',
          background: 'linear-gradient(to bottom, #020010 0%, #0a0a25 40%, #151530 100%)'
        }}>
          {/* Stars */}
          {stars.map((star, i) => (
            <motion.div
              key={`star-${i}`}
              style={{
                position: 'absolute',
                width: star.size,
                height: star.size,
                background: '#fff',
                borderRadius: '50%',
                left: `${star.x}%`,
                top: `${star.y}%`,
                boxShadow: star.size > 1.5 ? '0 0 4px #fff' : 'none'
              }}
              animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
              transition={{ duration: star.duration, repeat: Infinity, delay: star.delay }}
            />
          ))}

          {/* Aurora layers */}
          {auroraLayers.map((layer, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                inset: '-50%',
                background: `linear-gradient(${layer.angle}deg, transparent 20%, ${layer.color} 45%, ${layer.color} 55%, transparent 80%)`,
                filter: 'blur(30px)',
                transformOrigin: 'center 70%'
              }}
              animate={{
                x: layer.x,
                y: layer.y,
                scaleY: [1, 1.3, 1],
                rotate: [0, 5, -3, 0]
              }}
              transition={{
                duration: layer.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.3
              }}
            />
          ))}

          {/* Bright aurora curtains */}
          <motion.div
            style={{
              position: 'absolute',
              left: '20%',
              top: '10%',
              width: '60%',
              height: '50%',
              background: 'linear-gradient(180deg, transparent 0%, #00ff6622 30%, #00ffaa33 50%, #00ff6622 70%, transparent 100%)',
              filter: 'blur(20px)',
              borderRadius: '50% 50% 0 0'
            }}
            animate={{
              scaleX: [1, 1.2, 0.9, 1],
              scaleY: [1, 1.1, 1.2, 1],
              x: [-20, 30, -10, -20]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Mountain silhouette */}
          <svg style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '40%' }} viewBox="0 0 600 140" preserveAspectRatio="none">
            <path d="M0,140 L0,100 L50,80 L100,95 L150,60 L200,85 L250,40 L300,70 L350,30 L400,55 L450,45 L500,75 L550,50 L600,80 L600,140 Z" fill="#0a0a15" />
            <path d="M0,140 L0,110 L80,100 L150,85 L220,105 L300,90 L380,110 L450,95 L520,105 L600,95 L600,140 Z" fill="#050510" />
          </svg>

          {/* Reflection on lake/ice */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: '10%',
            right: '10%',
            height: '15%',
            background: 'linear-gradient(to bottom, transparent, rgba(0,255,150,0.05), rgba(0,200,255,0.03))',
            filter: 'blur(3px)',
            borderRadius: '50% 50% 0 0'
          }} />
        </div>
      </div>
    </>
  );
}
