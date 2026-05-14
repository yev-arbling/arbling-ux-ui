'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function LiveGaugeDemo() {
  const [value, setValue] = React.useState(72);
  const [target, setTarget] = React.useState(85);
  const [previous, setPrevious] = React.useState(68);
  const [history, setHistory] = React.useState([72]);
  const [isPaused, setIsPaused] = React.useState(false);

  // Particle animation state
  const particles = React.useMemo(() => Array.from({ length: 7 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 14,
    delay: Math.random() * 5,
  })), []);

  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setPrevious(value);
      setTarget(Math.round(30 + Math.random() * 60));
    }, 3000);
    return () => clearInterval(interval);
  }, [value, isPaused]);

  React.useEffect(() => {
    setHistory(prev => [...prev.slice(-19), value]);
  }, [value]);

  const size = 400;
  const center = size / 2;
  const radius = 150;
  const strokeWidth = 30;

  const polarToCartesian = (cx, cy, r, angle) => {
    const rad = (angle * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  const describeArc = (x, y, r, startAngle, endAngle) => {
    const start = polarToCartesian(x, y, r, endAngle);
    const end = polarToCartesian(x, y, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return ['M', start.x, start.y, 'A', r, r, 0, largeArcFlag, 0, end.x, end.y].join(' ');
  };

  const startAngle = 180;
  const endAngle = 0;
  const currentAngle = startAngle + (value / 100) * (endAngle - startAngle);
  const targetAngle = startAngle + (target / 100) * (endAngle - startAngle);

  const arcPath = describeArc(center, center, radius, startAngle, currentAngle);
  const bgPath = describeArc(center, center, radius, startAngle, endAngle);
  const end = polarToCartesian(center, center, radius, currentAngle);

  const getColor = (v) => {
    if (v < 50) return '#43e97b';
    if (v < 75) return '#667eea';
    return '#f093fb';
  };

  const getValueLabel = (v) => {
    if (v >= 90) return 'Excellent';
    if (v >= 75) return 'Good';
    if (v >= 60) return 'Fair';
    if (v >= 40) return 'Poor';
    return 'Critical';
  };

  return (
    <>
      <div className="demo-header">
        <h2 className="demo-title">Live Gauge</h2>
        <p className="demo-subtitle">Advanced animated gauge with historical trend, target indicators, value ranges, and performance classification</p>
      </div>
      <div className="demo-area">
        <div style={{ width: 870, height: 480, background: 'linear-gradient(135deg, rgba(15, 15, 25, 0.95) 0%, rgba(25, 20, 35, 0.9) 100%)', borderRadius: 20, padding: 30, border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 0 60px rgba(240, 147, 251, 0.15), inset 0 0 60px rgba(0,0,0,0.3)', position: 'relative', overflow: 'hidden' }}>

          {/* Animated background gradient mesh */}
          <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.11, pointerEvents: 'none' }}>
            <defs>
              <radialGradient id="gaugeMesh1">
                <stop offset="0%" stopColor="#f093fb" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#f093fb" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="gaugeMesh2">
                <stop offset="0%" stopColor="#667eea" stopOpacity="0.7"/>
                <stop offset="100%" stopColor="#667eea" stopOpacity="0"/>
              </radialGradient>
              <filter id="gaugeGlowMesh">
                <feGaussianBlur stdDeviation="10" result="coloredBlur"/>
                <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <ellipse cx="25%" cy="30%" rx="250" ry="195" fill="url(#gaugeMesh1)" filter="url(#gaugeGlowMesh)">
              <animate attributeName="cx" values="25%;75%;25%" dur="14s" repeatCount="indefinite"/>
              <animate attributeName="cy" values="30%;70%;30%" dur="14s" repeatCount="indefinite"/>
            </ellipse>
            <ellipse cx="75%" cy="70%" rx="215" ry="165" fill="url(#gaugeMesh2)" filter="url(#gaugeGlowMesh)" opacity="0.7">
              <animate attributeName="cx" values="75%;25%;75%" dur="11s" repeatCount="indefinite"/>
              <animate attributeName="cy" values="70%;30%;70%" dur="11s" repeatCount="indefinite"/>
            </ellipse>
          </svg>

          {/* Floating particles */}
          {particles.map(p => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0 }}
              animate={{
                x: [`${p.x}%`, `${(p.x + 25) % 100}%`, `${p.x}%`],
                y: [`${p.y}%`, `${(p.y + 17) % 100}%`, `${p.y}%`],
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: 'easeInOut'
              }}
              style={{
                position: 'absolute',
                width: p.size,
                height: p.size,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(240, 147, 251, 0.8) 0%, rgba(240, 147, 251, 0) 70%)',
                pointerEvents: 'none',
                filter: 'blur(1.2px)',
              }}
            />
          ))}

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 15, marginBottom: 20 }}>
            {[
              { label: 'Current', value: value, color: getColor(value) },
              { label: 'Target', value: target, color: '#888' },
              { label: 'Previous', value: previous, color: '#666' },
              { label: 'Trend', value: (value >= previous ? '+' : '') + (value - previous).toFixed(0), color: value >= previous ? '#43e97b' : '#f87171' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: 10,
                  padding: '12px',
                  border: `1px solid ${stat.color}30`,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '0.7rem', color: '#666', textTransform: 'uppercase' }}>{stat.label}</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 700, color: stat.color }}>{stat.value}</div>
              </motion.div>
            ))}
          </div>

          {/* Main gauge area */}
          <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
            {/* Gauge */}
            <div style={{ position: 'relative' }}>
              <svg width={size} height={size / 2 + 20} style={{ overflow: 'visible' }}>
                <defs>
                  <linearGradient id="gaugeGradientEnhanced" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#43e97b" />
                    <stop offset="35%" stopColor="#667eea" />
                    <stop offset="75%" stopColor="#764ba2" />
                    <stop offset="100%" stopColor="#f093fb" />
                  </linearGradient>
                  <filter id="gaugeGlow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Background track */}
                <path
                  d={bgPath}
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                />

                {/* Range markers */}
                {[0, 25, 50, 75, 100].map((pct, i) => {
                  const angle = startAngle + (pct / 100) * (endAngle - startAngle);
                  const pos = polarToCartesian(center, center, radius - 25, angle);
                  return (
                    <text
                      key={pct}
                      x={pos.x}
                      y={pos.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#555"
                      fontSize="11"
                      fontWeight="500"
                    >
                      {pct}
                    </text>
                  );
                })}

                {/* Target indicator */}
                <motion.path
                  d={describeArc(center, center, radius - 15, startAngle, targetAngle)}
                  fill="none"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                />

                {/* Main arc */}
                <motion.path
                  d={arcPath}
                  fill="none"
                  stroke="url(#gaugeGradientEnhanced)"
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  filter="url(#gaugeGlow)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                />

                {/* Value indicator */}
                <motion.g
                  animate={{ cx: end.x, cy: end.y }}
                  transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                >
                  <circle cx={end.x} cy={end.y} r="14" fill="#fff" stroke={getColor(value)} strokeWidth="3"/>
                  <circle cx={end.x} cy={end.y} r="6" fill={getColor(value)}/>
                </motion.g>

                {/* Scale ticks */}
                {Array.from({ length: 21 }).map((_, i) => {
                  const pct = i * 5;
                  const angle = startAngle + (pct / 100) * (endAngle - startAngle);
                  const innerPos = polarToCartesian(center, center, radius + strokeWidth/2 + 5, angle);
                  const outerPos = polarToCartesian(center, center, radius + strokeWidth/2 + (i % 2 === 0 ? 12 : 8), angle);
                  return (
                    <line
                      key={i}
                      x1={innerPos.x}
                      y1={innerPos.y}
                      x2={outerPos.x}
                      y2={outerPos.y}
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth={i % 2 === 0 ? 2 : 1}
                    />
                  );
                })}
              </svg>

              {/* Center display */}
              <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 0.8 }}
                >
                  <div style={{ fontSize: '4rem', fontWeight: 800, color: getColor(value) }}>{value}</div>
                  <div style={{ fontSize: '1rem', color: getValueLabel(value), fontWeight: 600, marginTop: -5 }}>{getValueLabel(value)}</div>
                  <div style={{ fontSize: '0.8rem', color: '#888', marginTop: 5 }}>Performance Score</div>
                </motion.div>
              </div>
            </div>

            {/* Mini history chart */}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: 10 }}>Recent History (20 readings)</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 100 }}>
                {history.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: i * 0.02 }}
                    style={{
                      flex: 1,
                      background: `linear-gradient(180deg, ${getColor(h)}, ${getColor(h)}66)`,
                      borderRadius: '2px 2px 0 0',
                      minHeight: 4,
                    }}
                  />
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
                <span style={{ fontSize: '0.65rem', color: '#555' }}>-20</span>
                <span style={{ fontSize: '0.65rem', color: '#555' }}>Now</span>
              </div>
            </div>
          </div>

          {/* Control */}
          <div style={{ marginTop: 20, textAlign: 'center' }}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsPaused(!isPaused)}
              style={{
                padding: '10px 24px',
                background: isPaused ? 'rgba(102, 126, 234, 0.2)' : 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(102, 126, 234, 0.3)',
                borderRadius: 20,
                color: isPaused ? '#667eea' : '#888',
                fontSize: '0.8rem',
                cursor: 'pointer',
              }}
            >
              {isPaused ? '▶ Resume Monitoring' : '⏸ Pause Monitoring'}
            </motion.button>
          </div>
        </div>
      </div>
    </>
  );
}
