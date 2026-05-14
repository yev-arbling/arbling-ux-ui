'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function AreaChartDemo() {
  // Multiple time range datasets
  const fullDatasets = React.useMemo(() => ({
    '1W': [
      { month: 'Mon', product: 30, marketing: 50, sales: 70, support: 45 },
      { month: 'Tue', product: 35, marketing: 55, sales: 75, support: 50 },
      { month: 'Wed', product: 32, marketing: 52, sales: 72, support: 48 },
      { month: 'Thu', product: 40, marketing: 60, sales: 80, support: 55 },
      { month: 'Fri', product: 45, marketing: 65, sales: 85, support: 60 },
      { month: 'Sat', product: 38, marketing: 58, sales: 78, support: 53 },
      { month: 'Sun', product: 42, marketing: 62, sales: 82, support: 57 },
    ],
    '1M': [
      { month: 'Week 1', product: 30, marketing: 50, sales: 70, support: 45 },
      { month: 'Week 2', product: 45, marketing: 65, sales: 80, support: 55 },
      { month: 'Week 3', product: 35, marketing: 55, sales: 75, support: 50 },
      { month: 'Week 4', product: 60, marketing: 80, sales: 95, support: 65 },
    ],
    '3M': [
      { month: 'Jan', product: 30, marketing: 50, sales: 70, support: 45 },
      { month: 'Feb', product: 45, marketing: 65, sales: 80, support: 55 },
      { month: 'Mar', product: 35, marketing: 55, sales: 75, support: 50 },
      { month: 'Apr', product: 60, marketing: 80, sales: 95, support: 65 },
      { month: 'May', product: 50, marketing: 70, sales: 90, support: 60 },
      { month: 'Jun', product: 70, marketing: 85, sales: 100, support: 70 },
      { month: 'Jul', product: 65, marketing: 90, sales: 110, support: 75 },
      { month: 'Aug', product: 75, marketing: 95, sales: 115, support: 80 },
      { month: 'Sep', product: 80, marketing: 100, sales: 120, support: 85 },
    ],
    '1Y': [
      { month: 'Jan', product: 30, marketing: 50, sales: 70, support: 45 },
      { month: 'Feb', product: 45, marketing: 65, sales: 80, support: 55 },
      { month: 'Mar', product: 35, marketing: 55, sales: 75, support: 50 },
      { month: 'Apr', product: 60, marketing: 80, sales: 95, support: 65 },
      { month: 'May', product: 50, marketing: 70, sales: 90, support: 60 },
      { month: 'Jun', product: 70, marketing: 85, sales: 100, support: 70 },
      { month: 'Jul', product: 65, marketing: 90, sales: 110, support: 75 },
      { month: 'Aug', product: 75, marketing: 95, sales: 115, support: 80 },
      { month: 'Sep', product: 80, marketing: 100, sales: 120, support: 85 },
      { month: 'Oct', product: 85, marketing: 105, sales: 125, support: 88 },
      { month: 'Nov', product: 90, marketing: 110, sales: 130, support: 92 },
      { month: 'Dec', product: 95, marketing: 115, sales: 135, support: 95 },
    ],
  }), []);

  const [timeRange, setTimeRange] = React.useState('3M');
  const [data, setData] = React.useState(fullDatasets['3M']);
  const [hoveredSeries, setHoveredSeries] = React.useState(null);
  const [hoveredPoint, setHoveredPoint] = React.useState(null);
  const [visibleSeries, setVisibleSeries] = React.useState([true, true, true, true]);
  const [isPaused, setIsPaused] = React.useState(false);
  const [normalized, setNormalized] = React.useState(false);
  const [comparisonMode, setComparisonMode] = React.useState(false);
  const [smoothing, setSmoothing] = React.useState(true);
  const [showDataPoints, setShowDataPoints] = React.useState(false);

  // Particle animation state
  const particles = React.useMemo(() => Array.from({ length: 10 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 5,
  })), []);

  const width = 700;
  const height = 240;
  const padding = { top: 10, right: 10, bottom: 30, left: 45 };

  const seriesConfig = [
    { key: 'product', label: 'Product', color: 'rgba(102, 126, 234, 0.75)', stroke: '#667eea', solidColor: '#667eea', icon: '📦' },
    { key: 'marketing', label: 'Marketing', color: 'rgba(118, 75, 162, 0.75)', stroke: '#764ba2', solidColor: '#764ba2', icon: '📢' },
    { key: 'sales', label: 'Sales', color: 'rgba(240, 147, 251, 0.75)', stroke: '#f093fb', solidColor: '#f093fb', icon: '💰' },
    { key: 'support', label: 'Support', color: 'rgba(79, 172, 254, 0.75)', stroke: '#4facfe', solidColor: '#4facfe', icon: '🎯' },
  ];

  // Calculate max value dynamically
  const maxVal = Math.max(...data.flatMap(d => seriesConfig.map(s => d[s.key] || 0))) * 1.1;

  const getX = (i) => padding.left + (i / (data.length - 1)) * (width - padding.left - padding.right);
  const getY = (val) => height - padding.bottom - (val / maxVal) * (height - padding.top - padding.bottom);

  // Create smooth bezier curve path
  const createSmoothAreaPath = (seriesKeys, reverse = false) => {
    const points = data.map((d, i) => {
      const stackVal = seriesKeys.reduce((sum, key) => sum + (visibleSeries[seriesConfig.findIndex(s => s.key === key)] ? (d[key] || 0) : 0), 0);
      return { x: getX(i), y: getY(normalized ? (stackVal / Math.max(1, seriesKeys.length)) * 100 : stackVal) };
    });

    if (points.length < 2) return '';

    let path = reverse ? '' : `M ${points[0].x},${points[0].y}`;
    const pts = reverse ? [...points].reverse() : points;

    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? i : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) * 0.2;
      const cp1y = p1.y + (p2.y - p0.y) * 0.2;
      const cp2x = p2.x - (p3.x - p1.x) * 0.2;
      const cp2y = p2.y - (p3.y - p1.y) * 0.2;

      path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
    }

    return path;
  };

  // Create area paths for each series layer
  const createLayerPaths = () => {
    const paths = [];
    let cumulativeKeys = [];

    for (let i = seriesConfig.length - 1; i >= 0; i--) {
      if (!visibleSeries[i]) continue;
      cumulativeKeys.unshift(seriesConfig[i].key);

      const topPath = createSmoothAreaPath(cumulativeKeys);
      const bottomPath = createSmoothAreaPath(cumulativeKeys.slice(0, -1), true);
      const closePath = ` L ${padding.left},${height - padding.bottom} Z`;

      paths.push({
        series: seriesConfig[i],
        path: topPath + bottomPath + closePath,
        zIndex: seriesConfig.length - i,
      });
    }

    return paths.reverse();
  };

  // Stats for each series with growth calculation
  const getSeriesStats = (key) => {
    const values = data.map(d => d[key]);
    const total = values.reduce((a, b) => a + b, 0);
    const avg = Math.round(total / values.length);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const latest = values[values.length - 1];
    const previous = values[values.length - 2] || values[0];
    const growth = previous !== 0 ? (((latest - previous) / previous) * 100).toFixed(1) : 0;
    return { total, avg, max, min, growth, latest };
  };

  // Update data when time range changes
  React.useEffect(() => {
    setData(fullDatasets[timeRange]);
  }, [timeRange, fullDatasets]);

  // Export chart data as JSON
  const exportData = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `area-chart-data-${timeRange}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Live updates
  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setData(prev => prev.map(d => {
        const updates = {};
        seriesConfig.forEach((s, i) => {
          if (visibleSeries[i]) {
            updates[s.key] = Math.max(10, Math.min(120, d[s.key] + (Math.random() - 0.5) * 20));
          }
        });
        return { ...d, ...updates };
      }));
    }, 2500);
    return () => clearInterval(interval);
  }, [isPaused, visibleSeries]);

  const layerPaths = createLayerPaths();

  return (
    <>
      <div className="demo-header">
        <h2 className="demo-title">Area Chart</h2>
        <p className="demo-subtitle">Advanced stacked area chart with smooth bezier curves, live updates, series controls, and interactive tooltips</p>
      </div>
      <div className="demo-area">
        <div style={{ width: 820, height: 530, background: 'linear-gradient(135deg, rgba(15, 15, 25, 0.95) 0%, rgba(25, 20, 35, 0.9) 100%)', borderRadius: 20, padding: 30, border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 0 60px rgba(240, 147, 251, 0.15), inset 0 0 60px rgba(0,0,0,0.3)', position: 'relative', overflow: 'hidden' }}>

          {/* Animated background gradient mesh */}
          <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.13, pointerEvents: 'none' }}>
            <defs>
              <radialGradient id="areaMesh1">
                <stop offset="0%" stopColor="#f093fb" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#f093fb" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="areaMesh2">
                <stop offset="0%" stopColor="#667eea" stopOpacity="0.7"/>
                <stop offset="100%" stopColor="#667eea" stopOpacity="0"/>
              </radialGradient>
              <filter id="areaGlowMesh">
                <feGaussianBlur stdDeviation="9" result="coloredBlur"/>
                <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <ellipse cx="25%" cy="25%" rx="240" ry="180" fill="url(#areaMesh1)" filter="url(#areaGlowMesh)">
              <animate attributeName="cx" values="25%;75%;25%" dur="13s" repeatCount="indefinite"/>
              <animate attributeName="cy" values="25%;75%;25%" dur="13s" repeatCount="indefinite"/>
            </ellipse>
            <ellipse cx="75%" cy="75%" rx="200" ry="150" fill="url(#areaMesh2)" filter="url(#areaGlowMesh)" opacity="0.7">
              <animate attributeName="cx" values="75%;25%;75%" dur="10s" repeatCount="indefinite"/>
              <animate attributeName="cy" values="75%;25%;75%" dur="10s" repeatCount="indefinite"/>
            </ellipse>
          </svg>

          {/* Floating particles */}
          {particles.map(p => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0 }}
              animate={{
                x: [`${p.x}%`, `${(p.x + 28) % 100}%`, `${p.x}%`],
                y: [`${p.y}%`, `${(p.y + 18) % 100}%`, `${p.y}%`],
                opacity: [0.25, 0.65, 0.25],
                scale: [1, 1.25, 1],
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
                filter: 'blur(1.5px)',
              }}
            />
          ))}

          {/* Stats per series */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20, position: 'relative', zIndex: 1 }}>
            {seriesConfig.map((config, i) => {
              if (!visibleSeries[i]) return null;
              const stats = getSeriesStats(config.key);
              return (
                <motion.div
                  key={config.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.03, y: -3 }}
                  transition={{ delay: i * 0.08, type: 'spring' }}
                  style={{
                    background: `linear-gradient(135deg, ${config.solidColor}22 0%, ${config.solidColor}11 100%)`,
                    borderRadius: 14,
                    padding: '16px',
                    border: `1px solid ${config.solidColor}50`,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Animated shine */}
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: '1.2rem' }}>{config.icon}</span>
                    <span style={{ fontSize: '0.75rem', color: '#bbb', fontWeight: 600 }}>{config.label}</span>
                  </div>
                  <div style={{ marginBottom: 8 }}>
                    <div style={{ fontSize: '0.6rem', color: '#888', marginBottom: 2 }}>Total</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: config.solidColor, textShadow: `0 0 20px ${config.solidColor}55` }}>{stats.total}</div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem' }}>
                    <div>
                      <div style={{ color: '#888' }}>Avg</div>
                      <div style={{ color: config.solidColor, fontWeight: 600 }}>{stats.avg}</div>
                    </div>
                    <div>
                      <div style={{ color: '#888' }}>Growth</div>
                      <div style={{ color: stats.growth >= 0 ? '#43e97b' : '#ff6b6b', fontWeight: 600 }}>
                        {stats.growth >= 0 ? '↑' : '↓'}{Math.abs(stats.growth)}%
                      </div>
                    </div>
                    <div>
                      <div style={{ color: '#888' }}>Peak</div>
                      <div style={{ color: config.solidColor, fontWeight: 600 }}>{stats.max}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', position: 'relative', zIndex: 1, alignItems: 'center' }}>
            {/* Time Range Selector */}
            <div style={{ display: 'flex', gap: 6, marginRight: 8, background: 'rgba(255,255,255,0.03)', padding: 4, borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)' }}>
              {['1W', '1M', '3M', '1Y'].map(range => (
                <motion.button
                  key={range}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTimeRange(range)}
                  style={{
                    padding: '6px 12px',
                    background: timeRange === range ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent',
                    border: 'none',
                    borderRadius: 8,
                    color: timeRange === range ? '#fff' : '#888',
                    fontSize: '0.7rem',
                    cursor: 'pointer',
                    fontWeight: timeRange === range ? 700 : 500,
                    boxShadow: timeRange === range ? '0 0 15px rgba(102, 126, 234, 0.3)' : 'none',
                  }}
                >
                  {range}
                </motion.button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(240, 147, 251, 0.4)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsPaused(!isPaused)}
              style={{
                padding: '7px 14px',
                background: isPaused ? 'linear-gradient(135deg, rgba(240, 147, 251, 0.3) 0%, rgba(102, 126, 234, 0.2) 100%)' : 'rgba(255,255,255,0.05)',
                border: '1px solid ' + (isPaused ? 'rgba(240, 147, 251, 0.5)' : 'rgba(255,255,255,0.1)'),
                borderRadius: 8,
                color: isPaused ? '#fff' : '#999',
                fontSize: '0.7rem',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              {isPaused ? '▶' : '⏸'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(240, 147, 251, 0.4)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setNormalized(!normalized)}
              style={{
                padding: '7px 14px',
                background: normalized ? 'linear-gradient(135deg, rgba(240, 147, 251, 0.3) 0%, rgba(102, 126, 234, 0.2) 100%)' : 'rgba(255,255,255,0.05)',
                border: '1px solid ' + (normalized ? 'rgba(240, 147, 251, 0.5)' : 'rgba(255,255,255,0.1)'),
                borderRadius: 8,
                color: normalized ? '#fff' : '#999',
                fontSize: '0.7rem',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              {normalized ? '%' : '∑'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(240, 147, 251, 0.4)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowDataPoints(!showDataPoints)}
              style={{
                padding: '7px 14px',
                background: showDataPoints ? 'linear-gradient(135deg, rgba(240, 147, 251, 0.3) 0%, rgba(102, 126, 234, 0.2) 100%)' : 'rgba(255,255,255,0.05)',
                border: '1px solid ' + (showDataPoints ? 'rgba(240, 147, 251, 0.5)' : 'rgba(255,255,255,0.1)'),
                borderRadius: 8,
                color: showDataPoints ? '#fff' : '#999',
                fontSize: '0.7rem',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              ●
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(240, 147, 251, 0.4)' }}
              whileTap={{ scale: 0.97 }}
              onClick={exportData}
              style={{
                padding: '7px 14px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
                color: '#999',
                fontSize: '0.7rem',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              ↓
            </motion.button>
            <div style={{ flex: 1 }} />
            {seriesConfig.map((config, i) => (
              <motion.button
                key={config.key}
                whileHover={{ scale: 1.05, boxShadow: visibleSeries[i] ? `0 0 20px ${config.solidColor}60` : 'none' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setVisibleSeries(prev => prev.map((v, j) => j === i ? !v : v))}
                style={{
                  padding: '7px 14px',
                  background: visibleSeries[i] ? `linear-gradient(135deg, ${config.solidColor}50, ${config.solidColor}30)` : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${visibleSeries[i] ? config.solidColor + '80' : config.solidColor + '30'}`,
                  borderRadius: 8,
                  color: visibleSeries[i] ? '#fff' : '#888',
                  fontSize: '0.7rem',
                  cursor: 'pointer',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span>{config.icon}</span>
                <span>{config.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Chart */}
          <div style={{ position: 'relative' }}>
            <svg width={width} height={height} style={{ overflow: 'visible' }}>
              <defs>
                {seriesConfig.map((config, i) => (
                  <linearGradient key={config.key} id={`areaGrad${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={config.solidColor} stopOpacity="0.7"/>
                    <stop offset="100%" stopColor={config.solidColor} stopOpacity="0.1"/>
                  </linearGradient>
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

              {/* Area layers */}
              {layerPaths.map((layer, i) => {
                const isDimmed = hoveredSeries !== null && hoveredSeries !== layer.series.key;
                const configIndex = seriesConfig.findIndex(s => s.key === layer.series.key);
                return (
                  <motion.g
                    key={layer.series.key}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isDimmed ? 0.3 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.path
                      d={layer.path}
                      fill={`url(#areaGrad${configIndex})`}
                      stroke={layer.series.stroke}
                      strokeWidth="2"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.85 }}
                      transition={{ duration: 1, delay: i * 0.15 }}
                      style={{ cursor: 'pointer' }}
                      whileHover={{ opacity: 1 }}
                      onMouseEnter={() => setHoveredSeries(layer.series.key)}
                      onMouseLeave={() => setHoveredSeries(null)}
                    />

                    {/* Top line highlight on hover */}
                    <AnimatePresence>
                      {hoveredSeries === layer.series.key && (
                        <motion.path
                          d={createSmoothAreaPath([layer.series.key])}
                          stroke={layer.series.solidColor}
                          strokeWidth="3"
                          fill="none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          filter="drop-shadow(0 0 8px rgba(255,255,255,0.3))"
                        />
                      )}
                    </AnimatePresence>
                  </motion.g>
                );
              })}

              {/* Visible data points */}
              {showDataPoints && data.map((d, i) => {
                const x = getX(i);
                return seriesConfig.map((config, j) => {
                  if (!visibleSeries[j]) return null;
                  const cumulativeKeys = seriesConfig.slice(0, j + 1).map(s => s.key).filter((_, idx) => visibleSeries[idx]);
                  const stackVal = cumulativeKeys.reduce((sum, key) => sum + d[key], 0);
                  const y = getY(normalized ? (stackVal / cumulativeKeys.length) * 100 : stackVal);

                  return (
                    <motion.circle
                      key={`${d.month}-${config.key}`}
                      cx={x}
                      cy={y}
                      r={hoveredPoint === i ? 6 : 4}
                      fill={config.solidColor}
                      stroke="#fff"
                      strokeWidth="2"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.05 + j * 0.02 }}
                      filter="drop-shadow(0 0 6px rgba(255,255,255,0.4))"
                    />
                  );
                });
              })}

              {/* Data points and tooltips */}
              {data.map((d, i) => {
                const x = getX(i);
                return (
                  <g key={d.month}>
                    <AnimatePresence>
                      {hoveredPoint === i && (
                        <>
                          {/* Vertical guide line */}
                          <motion.line
                            x1={x}
                            y1={padding.top}
                            x2={x}
                            y2={height - padding.bottom}
                            stroke="rgba(102, 126, 234, 0.4)"
                            strokeWidth="1"
                            strokeDasharray="4 4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          />

                          {/* Tooltip */}
                          <motion.g
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                          >
                            <rect
                              x={x - 65}
                              y={padding.top - 15}
                              width="130"
                              height={35 + seriesConfig.filter((_, j) => visibleSeries[j]).length * 24}
                              rx="10"
                              fill="rgba(15, 15, 25, 0.98)"
                              stroke="url(#areaGradientEnhanced)"
                              strokeWidth="2"
                              filter="url(#glowEnhanced)"
                            />
                            <text x={x} y={padding.top + 8} textAnchor="middle" fill="#bbb" fontSize="12" fontWeight="700">{d.month.toUpperCase()}</text>
                            {seriesConfig.map((config, j) => {
                              if (!visibleSeries[j]) return null;
                              const y = padding.top + 36 + j * 24;
                              return (
                                <text key={config.key} x={x} y={y} textAnchor="middle" fill={config.solidColor} fontSize="14" fontWeight="700" style={{ textShadow: `0 0 10px ${config.solidColor}80` }}>
                                  {config.label}: {d[config.key]}
                                </text>
                              );
                            })}
                          </motion.g>
                        </>
                      )}
                    </AnimatePresence>

                    {/* Hover trigger area */}
                    <rect
                      x={x - 15}
                      y={padding.top}
                      width="30"
                      height={height - padding.top - padding.bottom}
                      fill="transparent"
                      style={{ cursor: 'pointer' }}
                      onMouseEnter={() => setHoveredPoint(i)}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* X-axis labels */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, paddingLeft: padding.left, paddingRight: padding.right }}>
            {data.map((d, i) => (
              <motion.span
                key={d.month}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.06 }}
                style={{
                  fontSize: '0.75rem',
                  color: hoveredPoint === i ? '#667eea' : '#888',
                  fontWeight: hoveredPoint === i ? 600 : 400,
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
