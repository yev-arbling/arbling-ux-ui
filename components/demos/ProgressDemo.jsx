'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function ProgressDemo() {
  const [values, setValues] = React.useState([0, 0, 0, 0]);
  const [ringStyle, setRingStyle] = React.useState('standard');
  const [animKey, setAnimKey] = React.useState(0);

  const metrics = [
    { target: 85, label: 'Performance', icon: '⚡', colors: ['#667eea', '#764ba2'], goal: 90 },
    { target: 72, label: 'Efficiency', icon: '🎯', colors: ['#f093fb', '#f5576c'], goal: 80 },
    { target: 94, label: 'Quality', icon: '✨', colors: ['#43e97b', '#38f9d7'], goal: 95 },
    { target: 68, label: 'Reliability', icon: '🛡️', colors: ['#fbbf24', '#f97316'], goal: 75 },
  ];

  React.useEffect(() => {
    setValues([0, 0, 0, 0]);
    metrics.forEach((m, i) => {
      animate(0, m.target, {
        duration: 2,
        delay: i * 0.2,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: v => setValues(prev => { const n = [...prev]; n[i] = Math.floor(v); return n; })
      });
    });
  }, [animKey]);

  const styles = [
    { id: 'standard', label: 'Standard', icon: '○' },
    { id: 'thick', label: 'Thick', icon: '●' },
    { id: 'glow', label: 'Glow', icon: '◐' },
    { id: 'nested', label: 'Nested', icon: '◉' },
  ];

  const Ring = ({ value, metric, size = 130, strokeWidth = 10, showGoal = true }) => {
    const r = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * r;
    const offset = circumference - (value / 100) * circumference;
    const goalOffset = circumference - (metric.goal / 100) * circumference;
    const gradientId = `grad-${metric.label.replace(/\s/g, '')}-${animKey}`;
    const isAtGoal = value >= metric.goal;

    return (
      <motion.div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}
        whileHover={{ scale: 1.05 }}
      >
        <div style={{ position: 'relative', width: size, height: size }}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={metric.colors[0]} />
                <stop offset="100%" stopColor={metric.colors[1]} />
              </linearGradient>
              {ringStyle === 'glow' && (
                <filter id={`glow-${metric.label}`}>
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              )}
            </defs>
            {/* Background ring */}
            <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={strokeWidth} />
            {/* Goal marker */}
            {showGoal && (
              <circle
                cx={size/2} cy={size/2} r={r}
                fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={2}
                strokeDasharray={`2 ${circumference - 2}`} strokeDashoffset={goalOffset}
                transform={`rotate(-90 ${size/2} ${size/2})`}
              />
            )}
            {/* Progress ring */}
            <motion.circle
              cx={size/2} cy={size/2} r={r}
              fill="none" stroke={`url(#${gradientId})`}
              strokeWidth={ringStyle === 'thick' ? strokeWidth * 1.5 : strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference} strokeDashoffset={offset}
              transform={`rotate(-90 ${size/2} ${size/2})`}
              style={{ filter: ringStyle === 'glow' ? `url(#glow-${metric.label})` : `drop-shadow(0 0 6px ${metric.colors[0]}40)` }}
            />
            {/* Nested inner ring */}
            {ringStyle === 'nested' && (
              <motion.circle
                cx={size/2} cy={size/2} r={r - 15}
                fill="none" stroke={`${metric.colors[1]}40`} strokeWidth={4}
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * (r - 15)} strokeDashoffset={2 * Math.PI * (r - 15) * (1 - value / 100)}
                transform={`rotate(-90 ${size/2} ${size/2})`}
              />
            )}
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '1.2rem', marginBottom: '2px' }}>{metric.icon}</span>
            <span style={{
              fontSize: '1.6rem', fontWeight: 800,
              background: `linear-gradient(135deg, ${metric.colors[0]}, ${metric.colors[1]})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              {value}%
            </span>
          </div>
          {/* Goal achieved badge */}
          {isAtGoal && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{
                position: 'absolute', top: -4, right: -4,
                width: 24, height: 24, borderRadius: '50%',
                background: 'linear-gradient(135deg, #43e97b, #38f9d7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.7rem', color: '#000', fontWeight: 700,
                boxShadow: '0 4px 12px rgba(67, 233, 123, 0.4)',
              }}
            >
              ✓
            </motion.div>
          )}
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600 }}>{metric.label}</div>
          <div style={{ fontSize: '0.65rem', color: '#666' }}>Goal: {metric.goal}%</div>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <h2 className="demo-title">Progress Ring</h2>
      <p className="demo-subtitle">Multiple ring styles, goal markers, achievement badges, and smooth animations</p>
      <div className="demo-area">
        {/* Style switcher */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
          {styles.map(s => (
            <motion.button
              key={s.id}
              onClick={() => setRingStyle(s.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '8px 14px', borderRadius: '10px', border: 'none',
                background: ringStyle === s.id ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.05)',
                color: '#fff', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px',
              }}
            >
              {s.icon} {s.label}
            </motion.button>
          ))}
          <motion.button
            onClick={() => setAnimKey(k => k + 1)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '8px 14px', borderRadius: '10px', border: 'none',
              background: 'rgba(67, 233, 123, 0.15)', color: '#43e97b',
              fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
            }}
          >
            🔄 Replay
          </motion.button>
        </div>

        {/* Rings */}
        <div style={{ display: 'flex', gap: '36px', alignItems: 'flex-start', justifyContent: 'center' }}>
          {metrics.map((m, i) => (
            <Ring key={`${i}-${animKey}`} value={values[i]} metric={m} size={130} />
          ))}
        </div>

        {/* Summary stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          style={{
            marginTop: '28px', display: 'flex', justifyContent: 'center', gap: '32px',
            padding: '16px 24px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#667eea' }}>
              {Math.round(values.reduce((a, b) => a + b, 0) / values.length)}%
            </div>
            <div style={{ fontSize: '0.7rem', color: '#666' }}>Average</div>
          </div>
          <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#43e97b' }}>
              {metrics.filter((m, i) => values[i] >= m.goal).length}/{metrics.length}
            </div>
            <div style={{ fontSize: '0.7rem', color: '#666' }}>Goals Met</div>
          </div>
          <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fbbf24' }}>
              {Math.max(...values)}%
            </div>
            <div style={{ fontSize: '0.7rem', color: '#666' }}>Highest</div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
