'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function VelocityScrollDemo() {
  const baseX1 = useMotionValue(0);
  const baseX2 = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

  const x1 = useTransform(baseX1, (v) => `${wrap(-20, -45, v)}%`);
  const x2 = useTransform(baseX2, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = React.useRef(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * 5 * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX1.set(baseX1.get() + moveBy);
    baseX2.set(baseX2.get() - moveBy);
  });

  function wrap(min, max, v) {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
  }

  const rows = [
    { text: 'FRAMER MOTION', gradient: 'linear-gradient(90deg, #667eea, #764ba2)', x: x1 },
    { text: 'VELOCITY SCROLL', gradient: 'linear-gradient(90deg, #f093fb, #f5576c)', x: x2 },
    { text: 'REACT ANIMATION', gradient: 'linear-gradient(90deg, #43e97b, #38f9d7)', x: x1 }
  ];

  return (
    <div className="demo-area demo-scroll" style={{ height: '100vh', overflow: 'auto' }}>
      <div style={{ height: '200vh', paddingTop: '25vh' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
              <motion.div style={{ x: row.x, display: 'flex', gap: 60 }}>
                {[...Array(4)].map((_, i) => (
                  <span key={i} style={{
                    fontSize: '4.5rem',
                    fontWeight: 900,
                    background: row.gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    opacity: 0.8,
                    textShadow: '0 0 60px rgba(102,126,234,0.3)'
                  }}>
                    {row.text} ✦
                  </span>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', marginTop: 60, color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>
          ↕ Scroll to see velocity effect
        </p>
      </div>
    </div>
  );
}
