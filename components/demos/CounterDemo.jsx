'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function CounterDemo() {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true });
  const [counts, setCounts] = React.useState([0, 0, 0, 0]);
  const [style, setStyle] = React.useState('cards');

  const stats = [
    { target: 12847, label: 'Active Users', icon: '👥', color: '#667eea', gradient: 'linear-gradient(135deg, #667eea, #764ba2)', trend: 12.5, progress: 85 },
    { target: 3456, label: 'Projects', icon: '📁', color: '#f5576c', gradient: 'linear-gradient(135deg, #f5576c, #f093fb)', trend: 8.2, progress: 72 },
    { target: 127, label: 'Countries', icon: '🌍', color: '#43e97b', gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)', trend: 3.8, progress: 94 },
    { target: 98.7, label: 'Uptime %', icon: '⚡', color: '#fbbf24', gradient: 'linear-gradient(135deg, #fbbf24, #f97316)', trend: 0.5, progress: 98.7, isPercent: true },
  ];

  React.useEffect(() => {
    if (inView) {
      stats.forEach((s, i) => {
        animate(0, s.target, {
          duration: 2.5,
          ease: [0.16, 1, 0.3, 1],
          onUpdate: v => setCounts(p => { const n = [...p]; n[i] = s.isPercent ? Math.round(v * 10) / 10 : Math.floor(v); return n; })
        });
      });
    }
  }, [inView]);

  const styles = [
    { id: 'cards', label: 'Cards', icon: '🃏' },
    { id: 'minimal', label: 'Minimal', icon: '✨' },
    { id: 'compact', label: 'Compact', icon: '📊' },
  ];

  const formatNumber = (n, isPercent) => {
    if (isPercent) return n.toFixed(1) + '%';
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n.toLocaleString();
  };

  return (
    <>
      <h2 className="demo-title">Animated Counter</h2>
      <p className="demo-subtitle">Multiple display styles, trend indicators, progress bars, and smooth counting animations</p>
      <div className="demo-area" ref={ref}>
        {/* Style switcher */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
          {styles.map(s => (
            <motion.button
              key={s.id}
              onClick={() => setStyle(s.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '8px 16px', borderRadius: '10px', border: 'none',
                background: style === s.id ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.05)',
                color: '#fff', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px',
              }}
            >
              {s.icon} {s.label}
            </motion.button>
          ))}
        </div>

        {/* Cards style */}
        {style === 'cards' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', maxWidth: '800px', margin: '0 auto' }}>
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, boxShadow: `0 20px 40px ${s.color}30` }}
                style={{
                  background: 'rgba(15,15,25,0.9)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  padding: '20px',
                  border: `1px solid ${s.color}30`,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <motion.div
                  style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                    background: s.gradient,
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span style={{ fontSize: '1.5rem' }}>{s.icon}</span>
                  <motion.div
                    style={{
                      display: 'flex', alignItems: 'center', gap: '4px',
                      padding: '4px 8px', borderRadius: '8px',
                      background: s.trend > 0 ? 'rgba(67,233,123,0.15)' : 'rgba(239,68,68,0.15)',
                      color: s.trend > 0 ? '#43e97b' : '#ef4444',
                      fontSize: '0.7rem', fontWeight: 600,
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 2 + i * 0.1 }}
                  >
                    {s.trend > 0 ? '↑' : '↓'} {Math.abs(s.trend)}%
                  </motion.div>
                </div>
                <motion.div
                  style={{ fontSize: '2rem', fontWeight: 800, color: s.color, marginBottom: '4px' }}
                >
                  {formatNumber(counts[i], s.isPercent)}
                </motion.div>
                <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: '12px' }}>{s.label}</div>
                <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                  <motion.div
                    style={{ height: '100%', background: s.gradient, borderRadius: '2px' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${s.progress}%` }}
                    transition={{ duration: 2, delay: 0.5 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Minimal style */}
        {style === 'minimal' && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', maxWidth: '800px', margin: '0 auto' }}>
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                style={{ textAlign: 'center' }}
              >
                <motion.div
                  style={{
                    fontSize: '3rem', fontWeight: 800,
                    background: s.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  }}
                >
                  {formatNumber(counts[i], s.isPercent)}
                </motion.div>
                <div style={{ fontSize: '0.85rem', color: '#888', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <span>{s.icon}</span> {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Compact style */}
        {style === 'compact' && (
          <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '16px',
                  padding: '12px 16px', marginBottom: '8px',
                  background: 'rgba(255,255,255,0.02)', borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>{s.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.75rem', color: '#888' }}>{s.label}</div>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', marginTop: '4px', overflow: 'hidden' }}>
                    <motion.div
                      style={{ height: '100%', background: s.gradient }}
                      initial={{ width: 0 }}
                      animate={{ width: `${s.progress}%` }}
                      transition={{ duration: 2, delay: 0.3 }}
                    />
                  </div>
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: s.color }}>{formatNumber(counts[i], s.isPercent)}</div>
                <div style={{
                  fontSize: '0.65rem', fontWeight: 600,
                  color: s.trend > 0 ? '#43e97b' : '#ef4444',
                }}>
                  {s.trend > 0 ? '↑' : '↓'}{Math.abs(s.trend)}%
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
