'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function MarqueeDemo() {
  const [contentType, setContentType] = React.useState('text');
  const [speed, setSpeed] = React.useState(15);
  const [isPaused, setIsPaused] = React.useState(false);
  const [style, setStyle] = React.useState('gradient');

  const textItems = ['FRAMER', 'MOTION', 'REACT', 'ANIMATION', 'DESIGN', 'CODE'];
  const techItems = [
    { icon: '⚛️', label: 'React' }, { icon: '🔷', label: 'TypeScript' },
    { icon: '💅', label: 'Styled' }, { icon: '⚡', label: 'Vite' },
    { icon: '🎨', label: 'Tailwind' }, { icon: '📦', label: 'Webpack' },
  ];
  const brandItems = [
    { logo: '🍎', name: 'Apple' }, { logo: '🔵', name: 'Meta' },
    { logo: '🟢', name: 'Spotify' }, { logo: '🟣', name: 'Figma' },
    { logo: '🔴', name: 'Netflix' }, { logo: '🟡', name: 'Snapchat' },
  ];

  const contentTypes = [
    { id: 'text', label: 'Text', icon: 'Aa' },
    { id: 'tech', label: 'Tech Stack', icon: '⚙️' },
    { id: 'brands', label: 'Brands', icon: '🏢' },
  ];

  const styleOptions = [
    { id: 'gradient', label: 'Gradient' },
    { id: 'outline', label: 'Outline' },
    { id: 'glow', label: 'Glow' },
  ];

  const getItemStyle = (i) => {
    if (style === 'outline') return {
      color: 'transparent',
      WebkitTextStroke: '2px rgba(255,255,255,0.5)',
      textShadow: 'none',
    };
    if (style === 'glow') return {
      color: ['#667eea', '#f093fb', '#43e97b', '#fbbf24', '#f5576c', '#4facfe'][i % 6],
      textShadow: `0 0 20px ${['#667eea', '#f093fb', '#43e97b', '#fbbf24', '#f5576c', '#4facfe'][i % 6]}80`,
    };
    return {
      background: `linear-gradient(135deg, ${['#667eea', '#f093fb'][i % 2]}, ${['#764ba2', '#f5576c'][i % 2]})`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    };
  };

  return (
    <>
      <h2 className="demo-title">Infinite Marquee</h2>
      <p className="demo-subtitle">Multiple content types (text, tech stack, brands), speed controls, hover to pause, and visual styles</p>
      <div className="demo-area">
        {/* Controls */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            {contentTypes.map(c => (
              <motion.button
                key={c.id}
                onClick={() => setContentType(c.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '6px 12px', borderRadius: '8px', border: 'none',
                  background: contentType === c.id ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.05)',
                  color: '#fff', fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer',
                }}
              >
                {c.icon} {c.label}
              </motion.button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {styleOptions.map(s => (
              <motion.button
                key={s.id}
                onClick={() => setStyle(s.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '6px 12px', borderRadius: '8px', border: 'none',
                  background: style === s.id ? 'rgba(67, 233, 123, 0.2)' : 'rgba(255,255,255,0.05)',
                  color: style === s.id ? '#43e97b' : '#888', fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer',
                }}
              >
                {s.label}
              </motion.button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.7rem', color: '#888' }}>Speed:</span>
            <input
              type="range" min="5" max="30" value={speed}
              onChange={e => setSpeed(Number(e.target.value))}
              style={{ width: 80, accentColor: '#667eea' }}
            />
          </div>
        </div>

        {/* Marquee container */}
        <div
          style={{
            overflow: 'hidden', borderRadius: '16px',
            background: 'rgba(15, 15, 25, 0.5)',
            padding: '16px 0',
            maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Track 1 */}
          <div style={{ marginBottom: 12 }}>
            <motion.div
              style={{ display: 'flex', gap: 24, width: 'max-content' }}
              animate={{ x: isPaused ? 0 : [0, -1200] }}
              transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
            >
              {contentType === 'text' && [...textItems, ...textItems, ...textItems, ...textItems].map((w, i) => (
                <span key={i} style={{ fontSize: '2.5rem', fontWeight: 900, ...getItemStyle(i) }}>{w}</span>
              ))}
              {contentType === 'tech' && [...techItems, ...techItems, ...techItems, ...techItems].map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: 'rgba(255,255,255,0.05)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)' }}>
                  <span style={{ fontSize: '1.5rem' }}>{t.icon}</span>
                  <span style={{ fontSize: '1rem', fontWeight: 600 }}>{t.label}</span>
                </div>
              ))}
              {contentType === 'brands' && [...brandItems, ...brandItems, ...brandItems, ...brandItems].map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 20px', background: 'rgba(255,255,255,0.03)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: '2rem' }}>{b.logo}</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#888' }}>{b.name}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Track 2 - Opposite direction */}
          <div>
            <motion.div
              style={{ display: 'flex', gap: 24, width: 'max-content' }}
              animate={{ x: isPaused ? -1200 : [-1200, 0] }}
              transition={{ duration: speed * 1.2, repeat: Infinity, ease: 'linear' }}
            >
              {contentType === 'text' && [...textItems, ...textItems, ...textItems, ...textItems].reverse().map((w, i) => (
                <span key={i} style={{ fontSize: '2.5rem', fontWeight: 900, ...getItemStyle(i + 1) }}>{w}</span>
              ))}
              {contentType === 'tech' && [...techItems, ...techItems, ...techItems, ...techItems].reverse().map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: 'rgba(255,255,255,0.05)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)' }}>
                  <span style={{ fontSize: '1.5rem' }}>{t.icon}</span>
                  <span style={{ fontSize: '1rem', fontWeight: 600 }}>{t.label}</span>
                </div>
              ))}
              {contentType === 'brands' && [...brandItems, ...brandItems, ...brandItems, ...brandItems].reverse().map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 20px', background: 'rgba(255,255,255,0.03)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: '2rem' }}>{b.logo}</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#888' }}>{b.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Hint */}
        <div style={{ textAlign: 'center', marginTop: 12, fontSize: '0.7rem', color: '#666' }}>
          {isPaused ? '⏸ Paused (hover to pause)' : '▶ Playing (hover to pause)'}
        </div>
      </div>
    </>
  );
}
