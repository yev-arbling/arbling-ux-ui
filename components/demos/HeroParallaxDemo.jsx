'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder, useMotionTemplate } from 'framer-motion';

export default function HeroParallaxDemo() {
  const { scrollYProgress } = useScroll();

  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const titleScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  const card1X = useTransform(scrollYProgress, [0, 0.5], [0, -200]);
  const card1Y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const card1Rotate = useTransform(scrollYProgress, [0, 0.5], [0, -15]);

  const card2X = useTransform(scrollYProgress, [0, 0.5], [0, 200]);
  const card2Y = useTransform(scrollYProgress, [0, 0.5], [0, -50]);
  const card2Rotate = useTransform(scrollYProgress, [0, 0.5], [0, 15]);

  const card3Y = useTransform(scrollYProgress, [0.2, 0.6], [100, -200]);
  const card3Opacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);

  const gridOpacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 0]);
  const bgHue = useTransform(scrollYProgress, [0, 1], [240, 280]);

  return (
    <div className="hero-parallax">
      <div className="hero-sticky">
        <motion.div
          className="hero-bg"
          style={{
            background: useMotionTemplate`radial-gradient(ellipse at center, hsl(${bgHue}, 30%, 15%) 0%, #0a0a0f 70%)`
          }}
        />
        <motion.div className="hero-grid" style={{ opacity: gridOpacity }} />

        <motion.div
          className="floating-card"
          style={{
            left: '15%',
            top: '20%',
            width: 180,
            height: 120,
            x: card1X,
            y: card1Y,
            rotate: card1Rotate
          }}
        >
          <div style={{ fontSize: '2rem', marginBottom: 10 }}>🚀</div>
          <div style={{ fontSize: '0.8rem', color: '#888' }}>Ship faster</div>
        </motion.div>

        <motion.div
          className="floating-card"
          style={{
            right: '15%',
            top: '25%',
            width: 160,
            height: 100,
            x: card2X,
            y: card2Y,
            rotate: card2Rotate
          }}
        >
          <div style={{ fontSize: '2rem', marginBottom: 10 }}>✨</div>
          <div style={{ fontSize: '0.8rem', color: '#888' }}>Delightful</div>
        </motion.div>

        <motion.div
          className="floating-card"
          style={{
            left: '50%',
            bottom: '15%',
            width: 200,
            height: 80,
            translateX: '-50%',
            y: card3Y,
            opacity: card3Opacity
          }}
        >
          <div style={{ fontSize: '0.9rem', color: '#667eea' }}>Keep scrolling...</div>
        </motion.div>

        <motion.div
          className="hero-content"
          style={{ y: titleY, scale: titleScale, opacity: titleOpacity }}
        >
          <h1 className="hero-title">
            <span style={{ background: 'linear-gradient(90deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Motion</span>
          </h1>
          <p className="hero-sub">The React animation library</p>
        </motion.div>
      </div>
    </div>
  );
}
