'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function MultiLineChartDemo() {
  const [series, setSeries] = React.useState([
    { name: 'Revenue', color: '#667eea', data: [30, 45, 38, 65, 52, 78, 85, 92, 88], data2: [35, 48, 42, 60, 55, 82, 88, 95, 90] },
    { name: 'Expenses', color: '#f093fb', data: [25, 35, 42, 38, 48, 52, 45, 50, 48], data2: [22, 38, 45, 42, 50, 55, 48, 52, 50] },
    { name: 'Profit', color: '#43e97b', data: [5, 10, -4, 27, 4, 26, 40, 42, 40], data2: [13, 10, -3, 18, 5, 27, 40, 43, 42] },
    { name: 'Growth', color: '#4facfe', data: [15, 22, 18, 35, 28, 42, 48, 52, 50], data2: [18, 25, 20, 30, 32, 45, 52, 55, 53] },
  ]);

  const [hoveredLine, setHoveredLine] = React.useState(null);
  const [hoveredPoint, setHoveredPoint] = React.useState(null);
  const [compareMode, setCompareMode] = React.useState(false);
  const [visibleSeries, setVisibleSeries] = React.useState([true, true, true, false]);
  const [isPaused, setIsPaused] = React.useState(false);
  const [smoothCurves, setSmoothCurves] = React.useState(true);

  // Particle animation state
  const particles = React.useMemo(() => Array.from({ length: 9 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 1,
    duration: Math.random() * 11 + 14,
    delay: Math.random() * 5,
  })), []);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
  const width = 750;
  const height = 250;
  const padding = { top: 10, right: 10, bottom: 40, left: 50 };

  const activeSeries = series.filter((_, i) => visibleSeries[i]);
  const allValues = activeSeries.flatMap(s => compareMode ? [...s.data, ...s.data2] : s.data);
  const maxVal = Math.max(...allValues) * 1.05;
  const minVal = Math.min(...allValues) * 0.95;
  const range = maxVal - minVal;

  const getX = (i) => padding.left + (i / (months.length - 1)) * (width - padding.left - padding.right);
  const getY = (val) => height - padding.bottom - ((val - minVal) / range) * (height - padding.top - padding.bottom);

  // Create smooth bezier path or straight line
  const createLinePath = (data) => {
    const points = data.map((d, i) => ({ x: getX(i), y: getY(d) }));

    if (!smoothCurves) {
      return `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;
    }

    // Smooth bezier curve
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

  // Live updates
  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setSeries(prev => prev.map(s => ({
        ...s,
        data: s.data.map(v => Math.max(minVal + 5, Math.min(maxVal - 5, v + (Math.random() - 0.5) * 10))),
        data2: s.data2.map(v => Math.max(minVal + 5, Math.min(maxVal - 5, v + (Math.random() - 0.5) * 8))),
      })));
    }, 2500);
    return () => clearInterval(interval);
  }, [isPaused, maxVal, minVal]);

  return (
    <>
      <div className="demo-header">
        <h2 className="demo-title">Multi-Line Chart</h2>
        <p className="demo-subtitle">Advanced multi-series comparison with smooth bezier curves, period overlays, series controls, and comprehensive statistics</p>
      </div>
      <div className="demo-area">
        <div style={{ width: 880, height: 550, background: 'linear-gradient(135deg, rgba(15, 15, 25, 0.95) 0%, rgba(25, 20, 35, 0.9) 100%)', borderRadius: 20, padding: 30, border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 0 60px rgba(102, 126, 234, 0.15), inset 0 0 60px rgba(0,0,0,0.3)', position: 'relative', overflow: 'hidden' }}>

          {/* Animated background gradient mesh */}
          <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.11, pointerEvents: 'none' }}>
            <defs>
              <radialGradient id="multiLineMesh1">
                <stop offset="0%" stopColor="#667eea" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#667eea" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="multiLineMesh2">
                <stop offset="0%" stopColor="#43e97b" stopOpacity="0.7"/>
                <stop offset="100%" stopColor="#43e97b" stopOpacity="0"/>
              </radialGradient>
              <filter id="multiLineGlowMesh">
                <feGaussianBlur stdDeviation="10" result="coloredBlur"/>
                <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <ellipse cx="30%" cy="30%" rx="250" ry="195" fill="url(#multiLineMesh1)" filter="url(#multiLineGlowMesh)">
              <animate attributeName="cx" values="30%;70%;30%" dur="14s" repeatCount="indefinite"/>
              <animate attributeName="cy" values="30%;70%;30%" dur="14s" repeatCount="indefinite"/>
            </ellipse>
            <ellipse cx="70%" cy="70%" rx="215" ry="165" fill="url(#multiLineMesh2)" filter="url(#multiLineGlowMesh)" opacity="0.7">
              <animate attributeName="cx" values="70%;30%;70%" dur="11s" repeatCount="indefinite"/>
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
                background: 'radial-gradient(circle, rgba(102, 126, 234, 0.8) 0%, rgba(102, 126, 234, 0) 70%)',
                pointerEvents: 'none',
                filter: 'blur(1px)',
              }}
            />
          ))}

          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
            {activeSeries.map((s, i) => {
              const data = compareMode ? [...s.data, ...s.data2] : s.data;
              const avg = Math.round(data.reduce((a, b) => a + b, 0) / data.length);
              const trend = data[data.length - 1] - data[0];
              const originalIndex = series.findIndex(orig => orig.name === s.name);

              return (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  style={{
                    background: `${s.color}15`,
                    borderRadius: 10,
                    padding: '12px',
                    border: `1px solid ${s.color}40`,
                    opacity: (hoveredLine !== null && hoveredLine !== originalIndex) ? 0.4 : 1,
                  }}
                  onHoverStart={() => setHoveredLine(originalIndex)}
                  onHoverEnd={() => setHoveredLine(null)}
                >
                  <div style={{ fontSize: '0.7rem', color: '#888', marginBottom: 4 }}>{s.name}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 700, color: s.color }}>{avg}</span>
                    <span style={{ fontSize: '0.8rem', color: trend >= 0 ? '#4ade80' : '#f87171' }}>
                      {trend >= 0 ? '↑' : '↓'} {Math.abs(trend).toFixed(0)}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.65rem', color: '#666', marginTop: 2 }}>avg • trend</div>
                </motion.div>
              );
            })}
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 15, flexWrap: 'wrap' }}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCompareMode(!compareMode)}
              style={{
                padding: '8px 14px',
                background: compareMode ? 'rgba(102, 126, 234, 0.2)' : 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(102, 126, 234, 0.3)',
                borderRadius: 8,
                color: compareMode ? '#667eea' : '#888',
                fontSize: '0.7rem',
                cursor: 'pointer',
              }}
            >
              {compareMode ? '📊 Compare ON' : '📊 Compare OFF'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSmoothCurves(!smoothCurves)}
              style={{
                padding: '8px 14px',
                background: smoothCurves ? 'rgba(102, 126, 234, 0.2)' : 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(102, 126, 234, 0.3)',
                borderRadius: 8,
                color: smoothCurves ? '#667eea' : '#888',
                fontSize: '0.7rem',
                cursor: 'pointer',
              }}
            >
              {smoothCurves ? '〰️ Smooth' : '📏 Linear'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsPaused(!isPaused)}
              style={{
                padding: '8px 14px',
                background: isPaused ? 'rgba(102, 126, 234, 0.2)' : 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(102, 126, 234, 0.3)',
                borderRadius: 8,
                color: isPaused ? '#667eea' : '#888',
                fontSize: '0.7rem',
                cursor: 'pointer',
              }}
            >
              {isPaused ? '▶ Resume' : '⏸ Pause'}
            </motion.button>
            {series.map((s, i) => (
              <motion.button
                key={s.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setVisibleSeries(prev => prev.map((v, j) => j === i ? !v : v))}
                style={{
                  padding: '8px 14px',
                  background: visibleSeries[i] ? `${s.color}30` : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${s.color}50`,
                  borderRadius: 8,
                  color: visibleSeries[i] ? '#fff' : '#666',
                  fontSize: '0.7rem',
                  cursor: 'pointer',
                }}
              >
                {visibleSeries[i] ? '✓' : '○'} {s.name}
              </motion.button>
            ))}
          </div>

          {/* Chart */}
          <div style={{ position: 'relative' }}>
            <svg width={width} height={height} style={{ overflow: 'visible' }}>
              <defs>
                {series.map((s, i) => (
                  <React.Fragment key={s.name}>
                    <linearGradient id={`multiLineGrad${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={s.color} stopOpacity="0.8"/>
                      <stop offset="100%" stopColor={s.color} stopOpacity="0.3"/>
                    </linearGradient>
                    <filter id={`lineGlow${i}`}>
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </React.Fragment>
                ))}
              </defs>

              {/* Grid lines */}
              {[0, 25, 50, 75, 100].map(pct => {
                const y = getY((maxVal * pct) / 100);
                return (
                  <g key={pct}>
                    <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                    <text x={padding.left - 10} y={y + 4} textAnchor="end" fill="#555" fontSize="10" fontFamily="monospace">
                      {Math.round((maxVal * pct) / 100)}
                    </text>
                  </g>
                );
              })}

              {series.map((s, seriesIndex) => {
                if (!visibleSeries[seriesIndex]) return null;
                const isDimmed = hoveredLine !== null && hoveredLine !== seriesIndex;
                const originalIndex = seriesIndex;

                return (
                  <g key={s.name}>
                    {/* Current period */}
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isDimmed ? 0.3 : 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.path
                        d={createLinePath(s.data)}
                        stroke={`url(#multiLineGrad${seriesIndex})`}
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter={`url(#lineGlow${seriesIndex})`}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: seriesIndex * 0.15 }}
                        style={{ cursor: 'pointer' }}
                        onMouseEnter={() => setHoveredLine(originalIndex)}
                        onMouseLeave={() => setHoveredLine(null)}
                      />

                      {s.data.map((d, j) => {
                        const x = getX(j);
                        const y = getY(d);
                        return (
                          <motion.circle
                            key={j}
                            cx={x}
                            cy={y}
                            r={isDimmed ? 3 : 5}
                            fill="#fff"
                            stroke={s.color}
                            strokeWidth="2"
                            initial={{ scale: 0 }}
                            animate={{ scale: isDimmed ? 0.6 : 1 }}
                            transition={{ delay: 0.6 + seriesIndex * 0.1 + j * 0.04 }}
                            style={{ cursor: 'pointer' }}
                            whileHover={{ r: 7 }}
                            onHoverStart={() => setHoveredPoint({ series: originalIndex, point: j, value: d, label: s.name, period: 'current' })}
                            onHoverEnd={() => setHoveredPoint(null)}
                          />
                        );
                      })}
                    </motion.g>

                    {/* Comparison period */}
                    <AnimatePresence>
                      {compareMode && (
                        <motion.g
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isDimmed ? 0.2 : 0.5 }}
                          exit={{ opacity: 0 }}
                        >
                          <motion.path
                            d={createLinePath(s.data2)}
                            stroke={s.color}
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeDasharray="6 4"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1 }}
                          />

                          {s.data2.map((d, j) => {
                            const x = getX(j);
                            const y = getY(d);
                            return (
                              <circle
                                key={j}
                                cx={x}
                                cy={y}
                                r={3}
                                fill={s.color}
                                opacity="0.5"
                              />
                            );
                          })}
                        </motion.g>
                      )}
                    </AnimatePresence>
                  </g>
                );
              })}

              {/* Hover effects */}
              <AnimatePresence>
                {hoveredPoint !== null && (
                  <>
                    {/* Vertical line */}
                    <motion.line
                      x1={getX(hoveredPoint.point)}
                      y1={padding.top}
                      x2={getX(hoveredPoint.point)}
                      y2={height - padding.bottom}
                      stroke="rgba(102, 126, 234, 0.5)"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  </>
                )}
              </AnimatePresence>
            </svg>

            {/* Legend */}
            <div style={{ position: 'absolute', top: 0, right: 10, display: 'flex', gap: 12, fontSize: '0.7rem' }}>
              {activeSeries.map((s, i) => {
                const originalIndex = series.findIndex(orig => orig.name === s.name);
                return (
                  <div
                    key={s.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '6px 10px',
                      borderRadius: 6,
                      background: hoveredLine === originalIndex ? `${s.color}30` : 'transparent',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={() => setHoveredLine(originalIndex)}
                    onMouseLeave={() => setHoveredLine(null)}
                  >
                    <div style={{ width: 12, height: 2, background: s.color, borderRadius: 1 }} />
                    <span style={{ color: hoveredLine === originalIndex ? '#ddd' : '#888' }}>{s.name}</span>
                  </div>
                );
              })}
            </div>

            {/* X-axis labels */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, paddingLeft: padding.left, paddingRight: padding.right }}>
              {months.map((m, i) => (
                <span
                  key={m}
                  style={{
                    fontSize: '0.75rem',
                    color: hoveredPoint && hoveredPoint.point === i ? '#667eea' : '#666',
                    fontWeight: hoveredPoint && hoveredPoint.point === i ? 600 : 400,
                  }}
                >
                  {m}
                </span>
              ))}
            </div>

            {/* Enhanced tooltip */}
            <AnimatePresence>
              {hoveredPoint && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  style={{
                    position: 'absolute',
                    top: 30,
                    right: 40,
                    background: 'rgba(20, 20, 30, 0.98)',
                    padding: '14px 18px',
                    borderRadius: 12,
                    border: `1px solid ${series[hoveredPoint.series].color}`,
                    minWidth: '130px',
                  }}
                >
                  <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: 6 }}>{months[hoveredPoint.point]} • {hoveredPoint.period}</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 700, color: series[hoveredPoint.series].color }}>
                    {hoveredPoint.value.toFixed(1)}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: series[hoveredPoint.series].color }}>
                    {series[hoveredPoint.series].name}
                  </div>
                  {compareMode && (
                    <div style={{ fontSize: '0.7rem', color: '#666', marginTop: 4 }}>
                      Prev: {series[hoveredPoint.series].data2[hoveredPoint.point].toFixed(1)}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}
