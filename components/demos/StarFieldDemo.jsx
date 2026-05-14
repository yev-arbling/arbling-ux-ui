'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function StarFieldDemo() {
  const [warpSpeed, setWarpSpeed] = React.useState(1);
  const starColors = ['#ffffff', '#aaccff', '#ffccaa', '#aaffcc', '#ffaacc'];

  const [stars] = React.useState(() =>
    [...Array(300)].map(() => ({
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
      z: Math.random(),
      size: Math.random() * 2 + 0.5,
      color: starColors[Math.floor(Math.random() * starColors.length)],
      layer: Math.floor(Math.random() * 3)
    }))
  );

  const [shootingStars, setShootingStars] = React.useState([]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const id = Date.now();
        setShootingStars(prev => [...prev, {
          id,
          startX: Math.random() * 100,
          startY: Math.random() * 50,
          angle: 30 + Math.random() * 30
        }]);
        setTimeout(() => setShootingStars(prev => prev.filter(s => s.id !== id)), 1000);
      }
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h2 className="demo-title">Star Field</h2>
      <p className="demo-subtitle">Warp speed through the cosmos with nebula clouds and shooting stars.</p>
      <div className="demo-area">
        <div
          onMouseEnter={() => setWarpSpeed(3)}
          onMouseLeave={() => setWarpSpeed(1)}
          style={{
            width: 600,
            height: 350,
            borderRadius: 20,
            background: 'radial-gradient(ellipse at center, #0a0520 0%, #020010 100%)',
            position: 'relative',
            overflow: 'hidden',
            cursor: 'none'
          }}
        >
          {/* Nebula clouds */}
          <motion.div
            style={{
              position: 'absolute',
              width: 300,
              height: 200,
              left: '10%',
              top: '20%',
              background: 'radial-gradient(ellipse, rgba(100, 50, 150, 0.3) 0%, transparent 70%)',
              filter: 'blur(40px)'
            }}
            animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            style={{
              position: 'absolute',
              width: 250,
              height: 150,
              right: '15%',
              top: '40%',
              background: 'radial-gradient(ellipse, rgba(50, 100, 150, 0.25) 0%, transparent 70%)',
              filter: 'blur(30px)'
            }}
            animate={{ x: [0, -20, 0], y: [0, 15, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            style={{
              position: 'absolute',
              width: 200,
              height: 200,
              left: '50%',
              top: '10%',
              background: 'radial-gradient(ellipse, rgba(150, 80, 100, 0.2) 0%, transparent 70%)',
              filter: 'blur(35px)'
            }}
            animate={{ x: [0, -15, 0], y: [0, 25, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Center glow */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: '#fff',
            boxShadow: '0 0 20px 10px rgba(150, 180, 255, 0.3), 0 0 60px 30px rgba(100, 150, 255, 0.1)'
          }} />

          {/* Stars */}
          {stars.map((star, i) => {
            const speedMultiplier = (star.layer + 1) * 0.5;
            return (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: star.size * (star.layer + 1) * 0.5,
                  height: star.size * (star.layer + 1) * 0.5,
                  borderRadius: '50%',
                  background: star.color
                }}
                animate={{
                  x: [star.x * 20, star.x * 350],
                  y: [star.y * 20, star.y * 220],
                  opacity: [0, 0.5, 1, 1, 0],
                  scale: [0.2, 0.5, 1, 2, 4]
                }}
                transition={{
                  duration: (1.5 + star.z * 1.5) / (warpSpeed * speedMultiplier),
                  repeat: Infinity,
                  delay: star.z * 2,
                  ease: 'linear'
                }}
              />
            );
          })}

          {/* Shooting stars */}
          {shootingStars.map(ss => (
            <motion.div
              key={ss.id}
              style={{
                position: 'absolute',
                left: `${ss.startX}%`,
                top: `${ss.startY}%`,
                width: 100,
                height: 2,
                background: 'linear-gradient(90deg, transparent, #fff, #fff)',
                borderRadius: 2,
                transformOrigin: 'left center',
                transform: `rotate(${ss.angle}deg)`
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: [0, 1, 1], opacity: [0, 1, 0], x: [0, 150], y: [0, 100] }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          ))}

          {/* Instructions */}
          <div style={{
            position: 'absolute',
            bottom: 15,
            left: '50%',
            transform: 'translateX(-50%)',
            color: '#444',
            fontSize: '0.75rem'
          }}>
            Hover to engage warp drive
          </div>
        </div>
      </div>
    </>
  );
}
