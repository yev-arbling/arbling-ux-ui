'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function ParallaxDemo() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -450]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.6, 0.2]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <div className="parallax-container">
      <div className="parallax-sticky">
        <motion.div className="parallax-layer" style={{ y: y1 }}>
          <motion.div
            className="parallax-circle"
            style={{
              width: 400,
              height: 400,
              background: 'radial-gradient(circle, rgba(102,126,234,0.15) 0%, transparent 70%)',
              border: '1px solid rgba(102,126,234,0.2)',
              scale,
              opacity
            }}
          />
        </motion.div>
        <motion.div className="parallax-layer" style={{ y: y4, x: -100 }}>
          <motion.div
            style={{
              width: 60,
              height: 60,
              background: 'linear-gradient(135deg, #f093fb, #f5576c)',
              borderRadius: 12,
              rotate,
              boxShadow: '0 10px 40px rgba(240,147,251,0.3)'
            }}
          />
        </motion.div>
        <motion.div className="parallax-layer" style={{ y: y4, x: 100 }}>
          <motion.div
            style={{
              width: 40,
              height: 40,
              background: 'linear-gradient(135deg, #43e97b, #38f9d7)',
              borderRadius: '50%',
              rotate: useTransform(scrollYProgress, [0, 1], [0, -180]),
              boxShadow: '0 10px 40px rgba(67,233,123,0.3)'
            }}
          />
        </motion.div>
        <motion.div className="parallax-layer" style={{ y: y2 }}>
          <div
            className="parallax-circle"
            style={{
              width: 220,
              height: 220,
              background: 'linear-gradient(135deg, rgba(102,126,234,0.2), rgba(118,75,162,0.2))',
              border: '1px solid rgba(255,255,255,0.15)',
              boxShadow: '0 20px 60px rgba(102,126,234,0.2)'
            }}
          />
        </motion.div>
        <motion.div className="parallax-layer" style={{ y: y3 }}>
          <div
            className="parallax-circle"
            style={{
              width: 100,
              height: 100,
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#fff',
              boxShadow: '0 15px 50px rgba(102,126,234,0.5)'
            }}
          >
            ↕ SCROLL
          </div>
        </motion.div>
      </div>
    </div>
  );
}
