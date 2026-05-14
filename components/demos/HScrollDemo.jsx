'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function HScrollDemo() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-66%']);

  const cards = [
    { title: 'Discovery', desc: 'Understanding your vision through deep research and user interviews.', icon: '🔍', color: '#667eea' },
    { title: 'Strategy', desc: 'Crafting a comprehensive roadmap for product success.', icon: '🎯', color: '#f093fb' },
    { title: 'Design', desc: 'Beautiful, intuitive interfaces that users love.', icon: '🎨', color: '#43e97b' },
    { title: 'Development', desc: 'Robust, scalable solutions built with modern tech.', icon: '⚡', color: '#4facfe' },
    { title: 'Launch', desc: 'Smooth deployment and go-live with full support.', icon: '🚀', color: '#ffd93d' },
  ];

  return (
    <div ref={ref} className="hscroll-container">
      <div className="hscroll-sticky">
        {/* Progress bar */}
        <motion.div style={{ position: 'absolute', top: 30, left: '10%', right: '10%', height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
          <motion.div style={{ height: '100%', background: 'linear-gradient(90deg, #667eea, #764ba2)', scaleX: scrollYProgress, transformOrigin: 'left' }} />
        </motion.div>
        <motion.div className="hscroll-track" style={{ x }}>
          {cards.map((card, i) => (
            <motion.div key={i} className="hscroll-card" style={{ background: `linear-gradient(135deg, rgba(${card.color === '#667eea' ? '102,126,234' : card.color === '#f093fb' ? '240,147,251' : card.color === '#43e97b' ? '67,233,123' : card.color === '#4facfe' ? '79,172,254' : '255,217,61'},0.1) 0%, rgba(20,20,30,0.9) 100%)`, borderColor: `${card.color}33` }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 15 }}>{card.icon}</div>
              <div className="num" style={{ color: card.color }}>0{i + 1}</div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
