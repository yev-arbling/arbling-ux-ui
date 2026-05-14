'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function ScatterPlotDemo() {
  const [points, setPoints] = React.useState(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      category: ['Growth', 'Stable', 'Decline'][Math.floor(Math.random() * 3)],
      velocity: { x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2 },
      name: `Point ${i + 1}`,
    }))
  );

  const [hoveredPoint, setHoveredPoint] = React.useState(null);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [showTrendLine, setShowTrendLine] = React.useState(true);
  const [showQuadrants, setShowQuadrants] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);

  // Particle animation state
  const particles = React.useMemo(() => Array.from({ length: 10 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 9 + 13,
    delay: Math.random() * 5,
  })), []);

  const categories = {
    'Growth': { color: '#43e97b', label: 'High Growth' },
    'Stable': { color: '#667eea', label: 'Stable' },
    'Decline': { color: '#f093fb', label: 'Review' },
  };

  // Live updates with physics
  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setPoints(prev => prev.map(p => {
        let newX = p.x + p.velocity.x * 0.5;
        let newY = p.y + p.velocity.y * 0.5;

        // Bounce off edges
        if (newX <= 5 || newX >= 95) p.velocity.x *= -1;
        if (newY <= 5 || newY >= 95) p.velocity.y *= -1;

        // Add some randomness
        p.velocity.x += (Math.random() - 0.5) * 0.3;
        p.velocity.y += (Math.random() - 0.5) * 0.3;

        // Damping
        p.velocity.x *= 0.99;
        p.velocity.y *= 0.99;

        return {
          ...p,
          x: Math.max(5, Math.min(95, newX)),
          y: Math.max(5, Math.min(95, newY)),
        };
      }));
    }, 50);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Calculate statistics
  const getStats = (cat) => {
    const filtered = points.filter(p => cat === null || p.category === cat);
    const avgX = filtered.reduce((s, p) => s + p.x, 0) / filtered.length;
    const avgY = filtered.reduce((s, p) => s + p.y, 0) / filtered.length;
    const count = filtered.length;
    return { avgX: avgX.toFixed(1), avgY: avgY.toFixed(1), count };
  };

  // Trend line calculation
  const calculateTrendLine = () => {
    if (points.length < 2) return null;
    const n = points.length;
    const sumX = points.reduce((s, p) => s + p.x, 0);
    const sumY = points.reduce((s, p) => s + p.y, 0);
    const sumXY = points.reduce((s, p) => s + p.x * p.y, 0);
    const sumXX = points.reduce((s, p) => s + p.x * p.x, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    return { slope, intercept, x1: 0, y1: intercept, x2: 100, y2: slope * 100 + intercept };
  };

  const trendLine = calculateTrendLine();
  const correlation = trendLine ? (trendLine.slope * 10).toFixed(2) : 0;

  const width = 700;
  const height = 400;

  const filteredPoints = selectedCategory === null ? points : points.filter(p => p.category === selectedCategory);
  const stats = getStats(selectedCategory);

  return (
    <>
      <div className="demo-header">
        <h2 className="demo-title">Scatter Plot</h2>
        <p className="demo-subtitle">Advanced scatter plot with live particle physics, trend analysis, quadrant overlays, and category statistics</p>
      </div>
      <div className="demo-area">
        <div style={{ width: 870, height: 580, background: 'linear-gradient(135deg, rgba(15, 15, 25, 0.95) 0%, rgba(25, 20, 35, 0.9) 100%)', borderRadius: 20, padding: 30, border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 0 60px rgba(102, 126, 234, 0.15), inset 0 0 60px rgba(0,0,0,0.3)', position: 'relative', overflow: 'hidden' }}>

          {/* Animated background gradient mesh */}
          <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.12, pointerEvents: 'none' }}>
            <defs>
              <radialGradient id="scatterMesh1">
                <stop offset="0%" stopColor="#667eea" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#667eea" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="scatterMesh2">
                <stop offset="0%" stopColor="#f093fb" stopOpacity="0.7"/>
                <stop offset="100%" stopColor="#f093fb" stopOpacity="0"/>
              </radialGradient>
              <filter id="scatterGlowMesh">
                <feGaussianBlur stdDeviation="9" result="coloredBlur"/>
                <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <ellipse cx="30%" cy="35%" rx="230" ry="180" fill="url(#scatterMesh1)" filter="url(#scatterGlowMesh)">
              <animate attributeName="cx" values="30%;70%;30%" dur="13s" repeatCount="indefinite"/>
              <animate attributeName="cy" values="35%;65%;35%" dur="13s" repeatCount="indefinite"/>
            </ellipse>
            <ellipse cx="70%" cy="65%" rx="200" ry="150" fill="url(#scatterMesh2)" filter="url(#scatterGlowMesh)" opacity="0.7">
              <animate attributeName="cx" values="70%;30%;70%" dur="10s" repeatCount="indefinite"/>
              <animate attributeName="cy" values="65%;35%;65%" dur="10s" repeatCount="indefinite"/>
            </ellipse>
          </svg>

          {/* Floating particles */}
          {particles.map(p => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0 }}
              animate={{
                x: [`${p.x}%`, `${(p.x + 26) % 100}%`, `${p.x}%`],
                y: [`${p.y}%`, `${(p.y + 19) % 100}%`, `${p.y}%`],
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

          {/* Stats cards */}
          <div style={{ display: 'flex', gap: 13, marginBottom: 24, position: 'relative', zIndex: 1 }}>
            {[
              { label: 'Points', value: stats.count, color: '#667eea' },
              { label: 'Avg X', value: stats.avgX, color: '#764ba2' },
              { label: 'Avg Y', value: stats.avgY, color: '#f093fb' },
              { label: 'Correlation', value: correlation, color: parseFloat(correlation) > 0 ? '#43e97b' : '#f87171' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03, y: -3 }}
                transition={{ delay: i * 0.06, type: 'spring' }}
                style={{
                  flex: 1,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                  borderRadius: 12,
                  padding: '13px',
                  border: `1px solid ${stat.color}50`,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <motion.div
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5, repeatDelay: 2.5 }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '50%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
                    pointerEvents: 'none',
                  }}
                />
                <div style={{ fontSize: '0.7rem', color: '#888', marginBottom: 5, fontWeight: 600 }}>{stat.label}</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: stat.color, textShadow: `0 0 25px ${stat.color}55` }}>{stat.value}</div>
              </motion.div>
            ))}
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 15, flexWrap: 'wrap' }}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsPaused(!isPaused)}
              style={{
                padding: '8px 16px',
                background: isPaused ? 'rgba(102, 126, 234, 0.2)' : 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(102, 126, 234, 0.3)',
                borderRadius: 8,
                color: isPaused ? '#667eea' : '#888',
                fontSize: '0.75rem',
                cursor: 'pointer',
              }}
            >
              {isPaused ? '▶ Resume' : '⏸ Pause'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowTrendLine(!showTrendLine)}
              style={{
                padding: '8px 16px',
                background: showTrendLine ? 'rgba(102, 126, 234, 0.2)' : 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(102, 126, 234, 0.3)',
                borderRadius: 8,
                color: showTrendLine ? '#667eea' : '#888',
                fontSize: '0.75rem',
                cursor: 'pointer',
              }}
            >
              📈 Trend Line
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowQuadrants(!showQuadrants)}
              style={{
                padding: '8px 16px',
                background: showQuadrants ? 'rgba(102, 126, 234, 0.2)' : 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(102, 126, 234, 0.3)',
                borderRadius: 8,
                color: showQuadrants ? '#667eea' : '#888',
                fontSize: '0.75rem',
                cursor: 'pointer',
              }}
            >
              📐 Quadrants
            </motion.button>
            {Object.entries(categories).map(([key, cat]) => (
              <motion.button
                key={key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCategory(selectedCategory === key ? null : key)}
                style={{
                  padding: '8px 16px',
                  background: selectedCategory === key ? `${cat.color}40` : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${cat.color}50`,
                  borderRadius: 8,
                  color: selectedCategory === key ? '#fff' : '#888',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                }}
              >
                {selectedCategory === key ? '✓' : '○'} {cat.label}
              </motion.button>
            ))}
          </div>

          {/* Chart */}
          <div style={{ position: 'relative' }}>
            <svg width={width} height={height} style={{ overflow: 'visible' }}>
              <defs>
                {Object.entries(categories).map(([key, cat]) => (
                  <filter key={key} id={`glow${key}`}>
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                ))}
              </defs>

              {/* Quadrant backgrounds */}
              {showQuadrants && (
                <>
                  <rect x={width/2} y={0} width={width/2} height={height/2} fill="rgba(74, 222, 128, 0.05)" />
                  <rect x={0} y={0} width={width/2} height={height/2} fill="rgba(248, 113, 113, 0.05)" />
                  <rect x={0} y={height/2} width={width/2} height={height/2} fill="rgba(102, 126, 234, 0.05)" />
                  <rect x={width/2} y={height/2} width={width/2} height={height/2} fill="rgba(251, 146, 60, 0.05)" />
                  <line x1={width/2} y1={0} x2={width/2} y2={height} stroke="rgba(255,255,255,0.1)" strokeDasharray="4 4"/>
                  <line x1={0} y1={height/2} x2={width} y2={height/2} stroke="rgba(255,255,255,0.1)" strokeDasharray="4 4"/>
                </>
              )}

              {/* Grid */}
              {[0, 20, 40, 60, 80, 100].map(val => (
                <g key={val}>
                  <line x1={(val / 100) * width} y1="0" x2={(val / 100) * width} y2={height} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                  <line x1="0" y1={(val / 100) * height} x2={width} y2={(val / 100) * height} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                  <text x={(val / 100) * width} y={height + 20} textAnchor="middle" fill="#555" fontSize="10">{val}</text>
                  <text x="-15" y={(val / 100) * height + 4} textAnchor="end" fill="#555" fontSize="10">{val}</text>
                </g>
              ))}

              {/* Trend line */}
              <AnimatePresence>
                {showTrendLine && trendLine && (
                  <motion.line
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.8 }}
                    exit={{ pathLength: 0, opacity: 0 }}
                    x1={trendLine.x1 / 100 * width}
                    y1={height - trendLine.y1 / 100 * height}
                    x2={trendLine.x2 / 100 * width}
                    y2={height - trendLine.y2 / 100 * height}
                    stroke="#667eea"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                  />
                )}
              </AnimatePresence>

              {/* Points */}
              {filteredPoints.map((p, i) => {
                const cx = (p.x / 100) * width;
                const cy = height - (p.y / 100) * height;
                return (
                  <g key={p.id}>
                    <motion.circle
                      cx={cx}
                      cy={cy}
                      r={hoveredPoint === p.id ? p.size * 1.2 : p.size}
                      fill={categories[p.category].color}
                      opacity={hoveredPoint === null || hoveredPoint === p.id ? 0.7 : 0.2}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, opacity: hoveredPoint === null || hoveredPoint === p.id ? 0.7 : 0.2 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      style={{ cursor: 'pointer', filter: `url(#glow${p.category})` }}
                      whileHover={{ scale: 1.15, opacity: 1 }}
                      onHoverStart={() => setHoveredPoint(p.id)}
                      onHoverEnd={() => setHoveredPoint(null)}
                    />

                    {/* Tooltip */}
                    <AnimatePresence>
                      {hoveredPoint === p.id && (
                        <motion.g
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                        >
                          <rect
                            x={cx + 15}
                            y={cy - 40}
                            width="110"
                            height="55"
                            rx="8"
                            fill="rgba(20, 20, 30, 0.95)"
                            stroke={categories[p.category].color}
                            strokeWidth="1"
                          />
                          <text x={cx + 25} y={cy - 22} fill="#888" fontSize="10">{p.name}</text>
                          <text x={cx + 25} y={cy - 8} fill="#fff" fontSize="12" fontWeight="600">X: {p.x.toFixed(1)}</text>
                          <text x={cx + 25} y={cy + 5} fill="#fff" fontSize="12" fontWeight="600">Y: {p.y.toFixed(1)}</text>
                          <text x={cx + 25} y={cy + 18} fill={categories[p.category].color} fontSize="10">{categories[p.category].label}</text>
                        </motion.g>
                      )}
                    </AnimatePresence>
                  </g>
                );
              })}

              {/* Axis labels */}
              <text x={width / 2} y={height + 40} textAnchor="middle" fill="#666" fontSize="12" fontWeight="500">Performance Score (X)</text>
              <text x="-30" y={height / 2} textAnchor="middle" fill="#666" fontSize="12" fontWeight="500" transform={`rotate(-90, -30, ${height / 2})`}>Growth Rate (Y)</text>
            </svg>

            {/* Legend */}
            <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', flexDirection: 'column', gap: 8, background: 'rgba(30, 30, 40, 0.9)', padding: 12, borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)' }}>
              {Object.entries(categories).map(([key, cat]) => {
                const catPoints = points.filter(p => p.category === key);
                return (
                  <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: cat.color }} />
                    <span style={{ fontSize: '0.75rem', color: '#aaa' }}>{cat.label}</span>
                    <span style={{ fontSize: '0.7rem', color: '#666' }}>({catPoints.length})</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quadrant legend */}
          <AnimatePresence>
            {showQuadrants && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                style={{ marginTop: 15, display: 'flex', gap: 20, justifyContent: 'center', fontSize: '0.7rem' }}
              >
                <span style={{ color: '#4ade80' }}>■ High X, High Y</span>
                <span style={{ color: '#f87171' }}>■ Low X, High Y</span>
                <span style={{ color: '#667eea' }}>■ Low X, Low Y</span>
                <span style={{ color: '#fb923c' }}>■ High X, Low Y</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
