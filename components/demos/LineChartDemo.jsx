'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function LineChartDemo() {
  const [data, setData] = React.useState([
    { month: 'Jan', value: 65, previous: 58, target: 70 },
    { month: 'Feb', value: 78, previous: 62, target: 80 },
    { month: 'Mar', value: 52, previous: 70, target: 75 },
    { month: 'Apr', value: 91, previous: 55, target: 90 },
    { month: 'May', value: 84, previous: 78, target: 95 },
    { month: 'Jun', value: 105, previous: 85, target: 100 },
    { month: 'Jul', value: 98, previous: 92, target: 110 },
  ]);

  const [hoveredPoint, setHoveredPoint] = React.useState(null);
  const [isPaused, setIsPaused] = React.useState(false);
  const [showComparison, setShowComparison] = React.useState(true);

  // Particle animation state
  const particles = React.useMemo(() => Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 5,
  })), []);

  const width = 700;
  const height = 220;
  const padding = { top: 10, right: 10, bottom: 30, left: 40 };

  const maxVal = Math.max(...data.flatMap(d => [d.value, d.target])) * 1.1;
  const minVal = Math.min(...data.flatMap(d => [d.value, d.previous])) * 0.9;
  const range = maxVal - minVal;

  const getY = (val) => height - padding.bottom - ((val - minVal) / range) * (height - padding.top - padding.bottom);
  const getX = (i) => padding.left + (i / (data.length - 1)) * (width - padding.left - padding.right);

  // Create smooth bezier curve points
  const createSmoothPath = (values) => {
    const points = values.map((v, i) => ({ x: getX(i), y: getY(v) }));
    if (points.length < 2) return '';

    let path = `M ${points[0].x},${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i === 0 ? i : i - 1];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) * 0.15;
      const cp1y = p1.y + (p2.y - p0.y) * 0.15;
      const cp2x = p2.x - (p3.x - p1.x) * 0.15;
      const cp2y = p2.y - (p3.y - p1.y) * 0.15;

      path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
    }

    return path;
  };

  const mainPath = createSmoothPath(data.map(d => d.value));
  const previousPath = createSmoothPath(data.map(d => d.previous));
  const targetPath = createSmoothPath(data.map(d => d.target));

  // Stats
  const currentVal = data[data.length - 1].value;
  const previousVal = data[data.length - 1].previous;
  const growth = ((currentVal - previousVal) / previousVal * 100).toFixed(1);
  const avgVal = (data.reduce((sum, d) => sum + d.value, 0) / data.length).toFixed(0);
  const maxDataVal = Math.max(...data.map(d => d.value));
  const minDataVal = Math.min(...data.map(d => d.value));

  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setData(prev => prev.map(d => ({
        ...d,
        value: Math.max(minVal + 10, Math.min(maxVal - 10, d.value + (Math.random() - 0.5) * 20)),
        previous: Math.max(minVal + 10, Math.min(maxVal - 10, d.previous + (Math.random() - 0.5) * 15)),
      })));
    }, 2500);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <>
      <div className="demo-header">
        <h2 className="demo-title">Line Chart</h2>
        <p className="demo-subtitle">Advanced multi-series line chart with smooth bezier curves, comparison overlays, and interactive statistics</p>
      </div>
      <div className="demo-area">
        <div style={{ width: 820, height: 480, background: 'linear-gradient(135deg, rgba(15, 15, 25, 0.95) 0%, rgba(25, 20, 35, 0.9) 100%)', borderRadius: 20, padding: 30, border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 0 60px rgba(102, 126, 234, 0.15), inset 0 0 60px rgba(0,0,0,0.3)', position: 'relative', overflow: 'hidden' }}>

          {/* Animated background gradient mesh */}
          <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.15, pointerEvents: 'none' }}>
            <defs>
              <linearGradient id="meshGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#667eea">
                  <animate attributeName="stop-color" values="#667eea;#764ba2;#f093fb;#667eea" dur="8s" repeatCount="indefinite"/>
                </stop>
                <stop offset="100%" stopColor="#f093fb">
                  <animate attributeName="stop-color" values="#f093fb;#667eea;#764ba2;#f093fb" dur="8s" repeatCount="indefinite"/>
                </stop>
              </linearGradient>
              <radialGradient id="meshGrad2">
                <stop offset="0%" stopColor="#667eea" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#667eea" stopOpacity="0"/>
              </radialGradient>
              <filter id="glowMesh">
                <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <ellipse cx="20%" cy="30%" rx="200" ry="150" fill="url(#meshGrad2)" filter="url(#glowMesh)">
              <animate attributeName="cx" values="20%;80%;20%" dur="12s" repeatCount="indefinite"/>
              <animate attributeName="cy" values="30%;70%;30%" dur="12s" repeatCount="indefinite"/>
            </ellipse>
            <ellipse cx="80%" cy="70%" rx="180" ry="130" fill="url(#meshGrad2)" filter="url(#glowMesh)" opacity="0.7">
              <animate attributeName="cx" values="80%;20%;80%" dur="10s" repeatCount="indefinite"/>
              <animate attributeName="cy" values="70%;30%;70%" dur="10s" repeatCount="indefinite"/>
            </ellipse>
          </svg>

          {/* Floating particles */}
          {particles.map(p => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0 }}
              animate={{
                x: [`${p.x}%`, `${(p.x + 30) % 100}%`, `${p.x}%`],
                y: [`${p.y}%`, `${(p.y + 20) % 100}%`, `${p.y}%`],
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.3, 1],
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
                background: 'radial-gradient(circle, rgba(102, 126, 234, 0.8) 0%, rgba(102, 126, 234, 0) 70%)',
                pointerEvents: 'none',
                filter: 'blur(2px)',
              }}
            />
          ))}

          {/* Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24, position: 'relative', zIndex: 1 }}>
            {[
              { label: 'Current', value: currentVal.toFixed(0), color: '#667eea', change: growth + '%' },
              { label: 'Average', value: avgVal, color: '#764ba2', change: 'Monthly' },
              { label: 'Peak', value: maxDataVal, color: '#f093fb', change: 'Highest' },
              { label: 'Low', value: minDataVal, color: '#4facfe', change: 'Lowest' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.08, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.03, y: -2 }}
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                  borderRadius: 14,
                  padding: '16px 18px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Animated shine effect */}
                <motion.div
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                    repeatDelay: 2,
                  }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '50%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                    pointerEvents: 'none',
                  }}
                />
                <div style={{ fontSize: '0.7rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 6, fontWeight: 500 }}>{stat.label}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontSize: '2rem', fontWeight: 800, color: stat.color, textShadow: `0 0 30px ${stat.color}66` }}>{stat.value}</span>
                  <span style={{ fontSize: '0.75rem', color: '#777', fontWeight: 600 }}>{stat.change}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 18, position: 'relative', zIndex: 1 }}>
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(102, 126, 234, 0.4)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsPaused(!isPaused)}
              style={{
                padding: '10px 18px',
                background: isPaused ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.2) 100%)' : 'rgba(255,255,255,0.05)',
                border: '1px solid ' + (isPaused ? 'rgba(102, 126, 234, 0.5)' : 'rgba(255,255,255,0.1)'),
                borderRadius: 10,
                color: isPaused ? '#fff' : '#999',
                fontSize: '0.8rem',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'all 0.2s ease',
              }}
            >
              {isPaused ? '▶ Resume' : '⏸ Pause'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(102, 126, 234, 0.4)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowComparison(!showComparison)}
              style={{
                padding: '10px 18px',
                background: showComparison ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.2) 100%)' : 'rgba(255,255,255,0.05)',
                border: '1px solid ' + (showComparison ? 'rgba(102, 126, 234, 0.5)' : 'rgba(255,255,255,0.1)'),
                borderRadius: 10,
                color: showComparison ? '#fff' : '#999',
                fontSize: '0.8rem',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              {showComparison ? '📊 Compare ON' : '📊 Compare OFF'}
            </motion.button>
          </div>

          {/* Chart */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <svg width={width} height={height}>
              <defs>
                <linearGradient id="lineGradientEnhanced" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#667eea">
                    <animate attributeName="stop-color" values="#667eea;#764ba2;#f093fb;#667eea" dur="6s" repeatCount="indefinite"/>
                  </stop>
                  <stop offset="50%" stopColor="#764ba2">
                    <animate attributeName="stop-color" values="#764ba2;#f093fb;#667eea;#764ba2" dur="6s" repeatCount="indefinite"/>
                  </stop>
                  <stop offset="100%" stopColor="#f093fb">
                    <animate attributeName="stop-color" values="#f093fb;#667eea;#764ba2;#f093fb" dur="6s" repeatCount="indefinite"/>
                  </stop>
                </linearGradient>
                <linearGradient id="areaGradientEnhanced" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(102, 126, 234, 0.5)" />
                  <stop offset="50%" stopColor="rgba(118, 75, 162, 0.25)" />
                  <stop offset="100%" stopColor="rgba(102, 126, 234, 0)" />
                </linearGradient>
                <filter id="glowEnhanced">
                  <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <filter id="intenseGlow">
                  <feGaussianBlur stdDeviation="10" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Grid lines */}
              {[0, 25, 50, 75, 100].map(pct => {
                const y = getY(minVal + (range * pct / 100));
                return (
                  <g key={pct}>
                    <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                    <text x={padding.left - 10} y={y + 4} textAnchor="end" fill="#555" fontSize="10" fontFamily="monospace">
                      {Math.round(minVal + range * pct / 100)}
                    </text>
                  </g>
                );
              })}

              {/* Comparison lines */}
              <AnimatePresence>
                {showComparison && (
                  <>
                    {/* Previous period */}
                    <motion.path
                      d={previousPath}
                      stroke="rgba(148, 163, 184, 0.3)"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray="4 4"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      exit={{ pathLength: 0, opacity: 0 }}
                      transition={{ duration: 0.8 }}
                    />
                    {/* Target line */}
                    <motion.path
                      d={targetPath}
                      stroke="rgba(74, 222, 128, 0.3)"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray="8 4"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      exit={{ pathLength: 0, opacity: 0 }}
                      transition={{ duration: 0.8 }}
                    />
                  </>
                )}
              </AnimatePresence>

              {/* Area fill */}
              <motion.path
                d={`${mainPath} L ${getX(data.length - 1)},${height - padding.bottom} L ${getX(0)},${height - padding.bottom} Z`}
                fill="url(#areaGradientEnhanced)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              />

              {/* Main line */}
              <motion.path
                d={mainPath}
                stroke="url(#lineGradientEnhanced)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glowEnhanced)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              />

              {/* Vertical hover line */}
              <AnimatePresence>
                {hoveredPoint !== null && (
                  <motion.line
                    x1={getX(hoveredPoint)}
                    y1={padding.top}
                    x2={getX(hoveredPoint)}
                    y2={height - padding.bottom}
                    stroke="rgba(102, 126, 234, 0.5)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </AnimatePresence>

              {/* Data points */}
              {data.map((d, i) => {
                const x = getX(i);
                const y = getY(d.value);
                const isHovered = hoveredPoint === i;
                return (
                  <g key={d.month}>
                    {/* Pulsing rings for hovered point */}
                    <AnimatePresence>
                      {isHovered && (
                        <>
                          {[0, 1, 2].map((ring) => (
                            <motion.circle
                              key={ring}
                              cx={x}
                              cy={y}
                              r={8 + ring * 6}
                              fill="none"
                              stroke="rgba(102, 126, 234, 0.5)"
                              strokeWidth="1.5"
                              initial={{ scale: 0.5, opacity: 1 }}
                              animate={{ scale: 2.5, opacity: 0 }}
                              transition={{ duration: 1.5, delay: ring * 0.3, repeat: Infinity, ease: 'easeOut' }}
                            />
                          ))}
                        </>
                      )}
                    </AnimatePresence>

                    {/* Main data point */}
                    <motion.circle
                      cx={x}
                      cy={y}
                      r={isHovered ? 10 : 6}
                      fill="#fff"
                      stroke="url(#lineGradientEnhanced)"
                      strokeWidth={isHovered ? 3 : 2}
                      filter={isHovered ? "url(#intenseGlow)" : "url(#glowEnhanced)"}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                        r: isHovered ? 10 : 6,
                      }}
                      transition={{ delay: i * 0.08, type: 'spring' }}
                      style={{ cursor: 'pointer' }}
                      onMouseEnter={() => setHoveredPoint(i)}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />

                    {/* Inner glow for hovered point */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.circle
                          cx={x}
                          cy={y}
                          r={12}
                          fill="rgba(102, 126, 234, 0.3)"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Enhanced tooltip */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.g
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.9 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <rect
                            x={x - 60}
                            y={y - 75}
                            width="120"
                            height="65"
                            rx="10"
                            fill="rgba(15, 15, 25, 0.98)"
                            stroke="url(#lineGradientEnhanced)"
                            strokeWidth="2"
                            filter="url(#glowEnhanced)"
                          />
                          <text x={x} y={y - 52} textAnchor="middle" fill="#999" fontSize="11" fontWeight="600">{d.month}</text>
                          <text x={x} y={y - 32} textAnchor="middle" fill="#fff" fontSize="18" fontWeight="800">{d.value.toFixed(1)}</text>
                          <text x={x} y={y - 14} textAnchor="middle" fill={d.value > d.previous ? '#4ade80' : '#f87171'} fontSize="11" fontWeight="700">
                            {d.value > d.previous ? '↑ ' : '↓ '}{Math.abs(d.value - d.previous).toFixed(1)} vs prev
                          </text>
                        </motion.g>
                      )}
                    </AnimatePresence>
                  </g>
                );
              })}
            </svg>

            {/* Legend */}
            <div style={{ position: 'absolute', top: 5, right: 10, display: 'flex', gap: 16, fontSize: '0.75rem', zIndex: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ width: 24, height: 3, background: 'linear-gradient(90deg, #667eea, #f093fb)', borderRadius: 2, boxShadow: '0 0 10px rgba(102, 126, 234, 0.5)' }} />
                <span style={{ color: '#bbb', fontWeight: 600 }}>Actual</span>
              </div>
              {showComparison && (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ width: 24, height: 2, background: 'rgba(148, 163, 184, 0.6)', borderRadius: 2, borderStyle: 'dashed' }} />
                    <span style={{ color: '#bbb', fontWeight: 600 }}>Previous</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ width: 24, height: 2, background: 'rgba(74, 222, 128, 0.6)', borderRadius: 2, borderStyle: 'dashed' }} />
                    <span style={{ color: '#bbb', fontWeight: 600 }}>Target</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* X-axis labels */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, paddingLeft: padding.left, paddingRight: padding.right, position: 'relative', zIndex: 1 }}>
            {data.map((d, i) => (
              <motion.span
                key={d.month}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.05 }}
                whileHover={{ scale: 1.1 }}
                style={{
                  fontSize: '0.8rem',
                  color: hoveredPoint === i ? '#fff' : '#999',
                  textAlign: 'center',
                  minWidth: 30,
                  fontWeight: hoveredPoint === i ? 700 : 500,
                  background: hoveredPoint === i ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.2))' : 'transparent',
                  padding: hoveredPoint === i ? '6px 12px' : '4px 8px',
                  borderRadius: 8,
                  border: hoveredPoint === i ? '1px solid rgba(102, 126, 234, 0.5)' : '1px solid transparent',
                  textShadow: hoveredPoint === i ? '0 0 20px rgba(102, 126, 234, 0.8)' : 'none',
                }}
              >
                {d.month}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
