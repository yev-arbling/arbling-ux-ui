'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function StatsCounterDemo() {
  const [stats, setStats] = React.useState([
    { value: 0, target: 10000000, label: 'Users Worldwide', suffix: '+', prefix: '', color: '#667eea', trend: [65, 72, 68, 85, 90, 88, 95] },
    { value: 0, target: 99.99, label: 'Uptime SLA', suffix: '%', prefix: '', color: '#43e97b', trend: [99.5, 99.8, 99.9, 99.95, 99.98, 99.99, 99.99] },
    { value: 0, target: 2500000, label: 'Revenue', suffix: '', prefix: '$', color: '#f5576c', trend: [1.2, 1.5, 1.8, 2.0, 2.2, 2.4, 2.5] },
    { value: 0, target: 150, label: 'Countries', suffix: '', prefix: '', color: '#4facfe', trend: [80, 95, 110, 125, 135, 145, 150] },
  ]);
  const [hoveredStat, setHoveredStat] = React.useState(null);
  const [particles] = React.useState(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100, size: Math.random() * 3 + 1, duration: Math.random() * 4 + 3,
    }))
  );

  React.useEffect(() => {
    const timers = stats.map((stat, i) => {
      const duration = 2500;
      const steps = 80;
      const increment = stat.target / steps;
      let current = 0;
      return setInterval(() => {
        current += increment;
        if (current >= stat.target) { current = stat.target; clearInterval(timers[i]); }
        setStats(prev => prev.map((s, idx) => idx === i ? { ...s, value: current } : s));
      }, duration / steps);
    });
    return () => timers.forEach(t => clearInterval(t));
  }, []);

  const formatNumber = (num, stat) => {
    if (num >= 1000000) return stat.prefix + (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return stat.prefix + (num / 1000).toFixed(0) + 'K';
    if (stat.target < 100) return stat.prefix + num.toFixed(2);
    return stat.prefix + Math.floor(num).toLocaleString();
  };

  const CircularProgress = ({ percent, color, size = 100, strokeWidth = 8 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percent / 100) * circumference;
    return (
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={strokeWidth} />
        <motion.circle cx={size/2} cy={size/2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeLinecap="round" strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.1 }}
        />
      </svg>
    );
  };

  const Sparkline = ({ data, color, width = 80, height = 30 }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const points = data.map((v, i) => `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * height}`).join(' ');
    return (
      <svg width={width} height={height} style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id={`spark-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.5" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.polygon
          points={`0,${height} ${points} ${width},${height}`}
          fill={`url(#spark-${color.replace('#', '')})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        />
        <motion.polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        <motion.circle cx={width} cy={height - ((data[data.length-1] - min) / range) * height} r={3} fill={color}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </svg>
    );
  };

  return (
    <>
      <div className="demo-header">
        <h2 className="demo-title">Stats Counter</h2>
        <p className="demo-subtitle">Animated counters with circular progress, sparklines, and 3D depth</p>
      </div>
      <div className="demo-area">
        <div style={{ position: 'relative', maxWidth: '650px', margin: '0 auto' }}>
          {particles.map(p => (
            <motion.div key={p.id}
              style={{ position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, borderRadius: '50%', background: 'rgba(102,126,234,0.3)' }}
              animate={{ y: [0, -20, 0], opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut', delay: p.id * 0.05 }}
            />
          ))}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', position: 'relative', zIndex: 1 }}>
            {stats.map((stat, i) => {
              const percent = (stat.value / stat.target) * 100;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 40, rotateX: -15 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: i * 0.15, type: 'spring', stiffness: 100 }}
                  whileHover={{ y: -8, scale: 1.02, boxShadow: `0 20px 40px ${stat.color}30` }}
                  onHoverStart={() => setHoveredStat(i)}
                  onHoverEnd={() => setHoveredStat(null)}
                  style={{
                    background: 'rgba(20,20,30,0.9)', borderRadius: '20px', padding: '24px',
                    position: 'relative', overflow: 'hidden',
                    border: `1px solid ${hoveredStat === i ? stat.color + '50' : 'rgba(255,255,255,0.1)'}`,
                    backdropFilter: 'blur(10px)', transformStyle: 'preserve-3d', perspective: '1000px',
                    transition: 'border-color 0.3s',
                  }}
                >
                  <motion.div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 30% 0%, ${stat.color}15 0%, transparent 60%)` }}
                    animate={{ opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 4, repeat: Infinity }} />

                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', position: 'relative' }}>
                    <div style={{ position: 'relative' }}>
                      <CircularProgress percent={percent} color={stat.color} size={90} strokeWidth={6} />
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <motion.span style={{ fontSize: '0.85rem', fontWeight: 700, color: stat.color }}
                          animate={{ scale: percent >= 100 ? [1, 1.1, 1] : 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          {Math.min(100, Math.round(percent))}%
                        </motion.span>
                      </div>
                    </div>

                    <div style={{ flex: 1 }}>
                      <motion.div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '4px', letterSpacing: '-0.02em' }}>
                        {formatNumber(stat.value, stat)}{stat.suffix}
                      </motion.div>
                      <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '12px' }}>{stat.label}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Sparkline data={stat.trend} color={stat.color} width={70} height={24} />
                        <motion.span style={{ fontSize: '0.7rem', color: '#43e97b', fontWeight: 600 }}
                          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 + i * 0.1 }}
                        >
                          +{i === 1 ? '0.01' : Math.round(Math.random() * 20 + 10)}%
                        </motion.span>
                      </div>
                    </div>
                  </div>

                  <motion.div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${stat.color}, ${stat.color}50)`, transformOrigin: 'left' }}
                    initial={{ scaleX: 0 }} animate={{ scaleX: percent / 100 }} />
                </motion.div>
              );
            })}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
            style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '24px' }}
          >
            {[{ label: 'This Month', value: '+$420K' }, { label: 'Growth', value: '+32%' }, { label: 'Active Now', value: '12,847' }].map((item, i) => (
              <motion.div key={item.label}
                whileHover={{ y: -2 }}
                style={{ textAlign: 'center', padding: '12px 20px', background: 'rgba(30,30,40,0.6)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: i === 1 ? '#43e97b' : '#fff' }}>{item.value}</div>
                <div style={{ fontSize: '0.7rem', color: '#666' }}>{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}
