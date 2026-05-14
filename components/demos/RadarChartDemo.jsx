'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function RadarChartDemo() {
  const [datasets, setDatasets] = React.useState([
    { name: 'Current', color: '#667eea', data: [85, 72, 90, 65, 78, 88] },
    { name: 'Target', color: '#43e97b', data: [90, 80, 85, 75, 85, 90] },
    { name: 'Minimum', color: '#f093fb', data: [60, 55, 65, 50, 60, 70] },
  ]);

  const [hoveredDataset, setHoveredDataset] = React.useState(null);
  const [hoveredAxis, setHoveredAxis] = React.useState(null);
  const [showAll, setShowAll] = React.useState(true);
  const [isPaused, setIsPaused] = React.useState(false);

  // Particle animation state
  const particles = React.useMemo(() => Array.from({ length: 9 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 1,
    duration: Math.random() * 11 + 14,
    delay: Math.random() * 4,
  })), []);

  const labels = ['Speed', 'Power', 'Agility', 'Stamina', 'Focus', 'Defense'];

  const size = 420;
  const center = size / 2;
  const maxRadius = 150;
  const levels = 5;
  const angleStep = (Math.PI * 2) / labels.length;

  // Calculate points for each dataset
  const datasetPoints = datasets.map(dataset => {
    return dataset.data.map((value, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const r = (value / 100) * maxRadius;
      return {
        x: center + r * Math.cos(angle),
        y: center + r * Math.sin(angle),
        value,
        label: labels[i],
        angle,
      };
    });
  });

  // Create polygon points
  const getPolygonPoints = (points) => points.map(p => `${p.x},${p.y}`).join(' ');

  // Grid points
  const gridPoints = (level) => {
    return labels.map((_, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const r = (maxRadius / levels) * level;
      return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
    }).join(' ');
  };

  // Calculate average score for each dataset
  const getAvgScore = (data) => Math.round(data.reduce((a, b) => a + b, 0) / data.length);

  // Live updates
  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setDatasets(prev => prev.map(ds => ({
        ...ds,
        data: ds.data.map(v => Math.max(40, Math.min(100, v + (Math.random() - 0.5) * 10))),
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <>
      <div className="demo-header">
        <h2 className="demo-title">Radar Chart</h2>
        <p className="demo-subtitle">Advanced multi-series spider chart with comparison overlays, live updates, and interactive statistics</p>
      </div>
      <div className="demo-area">
        <div style={{ width: 920, height: 530, background: 'linear-gradient(135deg, rgba(15, 15, 25, 0.95) 0%, rgba(25, 20, 35, 0.9) 100%)', borderRadius: 20, padding: 30, border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 0 60px rgba(67, 233, 123, 0.15), inset 0 0 60px rgba(0,0,0,0.3)', position: 'relative', overflow: 'hidden' }}>

          {/* Animated background gradient mesh */}
          <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.11, pointerEvents: 'none' }}>
            <defs>
              <radialGradient id="radarMesh1">
                <stop offset="0%" stopColor="#43e97b" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#43e97b" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="radarMesh2">
                <stop offset="0%" stopColor="#667eea" stopOpacity="0.7"/>
                <stop offset="100%" stopColor="#667eea" stopOpacity="0"/>
              </radialGradient>
              <filter id="radarGlowMesh">
                <feGaussianBlur stdDeviation="10" result="coloredBlur"/>
                <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <ellipse cx="35%" cy="25%" rx="250" ry="190" fill="url(#radarMesh1)" filter="url(#radarGlowMesh)">
              <animate attributeName="cx" values="35%;65%;35%" dur="14s" repeatCount="indefinite"/>
              <animate attributeName="cy" values="25%;75%;25%" dur="14s" repeatCount="indefinite"/>
            </ellipse>
            <ellipse cx="65%" cy="75%" rx="210" ry="160" fill="url(#radarMesh2)" filter="url(#radarGlowMesh)" opacity="0.7">
              <animate attributeName="cx" values="65%;35%;65%" dur="11s" repeatCount="indefinite"/>
              <animate attributeName="cy" values="75%;25%;75%" dur="11s" repeatCount="indefinite"/>
            </ellipse>
          </svg>

          {/* Floating particles */}
          {particles.map(p => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0 }}
              animate={{
                x: [`${p.x}%`, `${(p.x + 24) % 100}%`, `${p.x}%`],
                y: [`${p.y}%`, `${(p.y + 17) % 100}%`, `${p.y}%`],
                opacity: [0.2, 0.55, 0.2],
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
                background: 'radial-gradient(circle, rgba(67, 233, 123, 0.8) 0%, rgba(67, 233, 123, 0) 70%)',
                pointerEvents: 'none',
                filter: 'blur(1px)',
              }}
            />
          ))}

          {/* Stats bar */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 24, position: 'relative', zIndex: 1 }}>
            {datasets.map((ds, i) => (
              <motion.div
                key={ds.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03, y: -3 }}
                transition={{ delay: i * 0.08, type: 'spring' }}
                style={{
                  flex: 1,
                  background: `linear-gradient(135deg, ${ds.color}22 0%, ${ds.color}11 100%)`,
                  borderRadius: 12,
                  padding: '14px',
                  border: `1px solid ${ds.color}55`,
                  opacity: (hoveredDataset !== null && hoveredDataset !== i) ? 0.4 : 1,
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onHoverStart={() => setHoveredDataset(i)}
                onHoverEnd={() => setHoveredDataset(null)}
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
                <div style={{ fontSize: '0.75rem', color: '#bbb', marginBottom: 6, fontWeight: 600 }}>{ds.name}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: ds.color, textShadow: `0 0 25px ${ds.color}55` }}>{getAvgScore(ds.data)}</div>
                <div style={{ fontSize: '0.7rem', color: '#888', marginTop: 2 }}>avg score</div>
              </motion.div>
            ))}
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 15 }}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAll(!showAll)}
              style={{
                padding: '8px 16px',
                background: showAll ? 'rgba(102, 126, 234, 0.2)' : 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(102, 126, 234, 0.3)',
                borderRadius: 8,
                color: showAll ? '#667eea' : '#888',
                fontSize: '0.75rem',
                cursor: 'pointer',
              }}
            >
              {showAll ? '👁️ Show All' : '🎯 Focus Mode'}
            </motion.button>
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
          </div>

          <div style={{ display: 'flex', gap: 50, alignItems: 'center' }}>
            {/* Chart */}
            <div style={{ position: 'relative' }}>
              <svg width={size} height={size}>
                <defs>
                  {datasets.map((ds, i) => (
                    <radialGradient key={i} id={`radarGrad${i}`} cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor={ds.color} stopOpacity="0.5"/>
                      <stop offset="100%" stopColor={ds.color} stopOpacity="0.1"/>
                    </radialGradient>
                  ))}
                </defs>

                {/* Grid */}
                {Array.from({ length: levels }).map((_, i) => (
                  <polygon
                    key={i}
                    points={gridPoints(i + 1)}
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="1"
                  />
                ))}

                {/* Axis lines and labels */}
                {labels.map((label, i) => {
                  const angle = i * angleStep - Math.PI / 2;
                  const endX = center + maxRadius * Math.cos(angle);
                  const endY = center + maxRadius * Math.sin(angle);
                  const labelX = center + (maxRadius + 25) * Math.cos(angle);
                  const labelY = center + (maxRadius + 25) * Math.sin(angle);

                  return (
                    <g key={label}>
                      <line
                        x1={center}
                        y1={center}
                        x2={endX}
                        y2={endY}
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="1"
                      />
                      <text
                        x={labelX}
                        y={labelY}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill={hoveredAxis === i ? '#667eea' : '#888'}
                        fontSize="12"
                        fontWeight={hoveredAxis === i ? 700 : 500}
                        style={{ cursor: 'pointer' }}
                        onHoverStart={() => setHoveredAxis(i)}
                        onHoverEnd={() => setHoveredAxis(null)}
                      >
                        {label}
                      </text>
                    </g>
                  );
                })}

                {/* Data polygons */}
                {datasetPoints.map((points, datasetIndex) => {
                  const ds = datasets[datasetIndex];
                  const isDimmed = !showAll && hoveredDataset !== null && hoveredDataset !== datasetIndex;
                  const isDimmedByHover = hoveredDataset !== null && hoveredDataset !== datasetIndex;

                  return (
                    <g key={ds.name}>
                      <motion.polygon
                        points={getPolygonPoints(points)}
                        fill={`url(#radarGrad${datasetIndex})`}
                        stroke={ds.color}
                        strokeWidth="2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: isDimmed || isDimmedByHover ? 0.2 : 0.6 }}
                        transition={{ duration: 0.8, delay: datasetIndex * 0.15 }}
                        style={{ cursor: 'pointer', transformOrigin: 'center' }}
                        whileHover={{ opacity: 0.9 }}
                        onHoverStart={() => setHoveredDataset(datasetIndex)}
                        onHoverEnd={() => setHoveredDataset(null)}
                      />

                      {/* Points */}
                      {points.map((p, i) => (
                        <g key={i}>
                          <motion.circle
                            cx={p.x}
                            cy={p.y}
                            r="5"
                            fill="#fff"
                            stroke={ds.color}
                            strokeWidth="2"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: isDimmedByHover ? 0.3 : 1 }}
                            transition={{ delay: 0.5 + datasetIndex * 0.1 + i * 0.05 }}
                            style={{ cursor: 'pointer' }}
                          />
                        </g>
                      ))}
                    </g>
                  );
                })}

                {/* Value indicators on hover */}
                <AnimatePresence>
                  {hoveredAxis !== null && (
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {datasets.map((ds, datasetIndex) => {
                        if (!showAll && hoveredDataset !== null && hoveredDataset !== hoveredAxis) return null;
                        const points = datasetPoints[datasetIndex];
                        const p = points[hoveredAxis];
                        return (
                          <g key={ds.name}>
                            <circle cx={p.x} cy={p.y} r="14" fill={ds.color} opacity="0.3"/>
                            <text x={p.x} y={p.y + 4} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">
                              {p.value}
                            </text>
                          </g>
                        );
                      })}
                    </motion.g>
                  )}
                </AnimatePresence>
              </svg>
            </div>

            {/* Legend with stats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {datasets.map((ds, i) => {
                const points = datasetPoints[i];
                return (
                  <motion.div
                    key={ds.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    onClick={() => setHoveredDataset(hoveredDataset === i ? null : i)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '12px 16px',
                      borderRadius: 10,
                      background: hoveredDataset === i ? `${ds.color}20` : 'rgba(255,255,255,0.03)',
                      border: hoveredDataset === i ? `1px solid ${ds.color}50` : '1px solid transparent',
                      cursor: 'pointer',
                      opacity: (hoveredDataset !== null && hoveredDataset !== i) ? 0.4 : 1,
                    }}
                  >
                    <div style={{ width: 16, height: 16, borderRadius: 4, background: ds.color }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.9rem', color: '#ddd', fontWeight: 500 }}>{ds.name}</div>
                      <div style={{ fontSize: '0.7rem', color: '#666' }}>Avg: {getAvgScore(ds.data)}</div>
                    </div>
                    <div style={{ fontSize: '1rem', color: ds.color, fontWeight: 700 }}>
                      {getAvgScore(ds.data)}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Axis detail */}
          <AnimatePresence>
            {hoveredAxis !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                style={{
                  marginTop: 20,
                  padding: '15px 20px',
                  background: 'rgba(102, 126, 234, 0.1)',
                  borderRadius: 10,
                  border: '1px solid rgba(102, 126, 234, 0.3)',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: 8 }}>{labels[hoveredAxis]} Comparison</div>
                <div style={{ display: 'flex', gap: 20, justifyContent: 'center' }}>
                  {datasets.map((ds, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 2, background: ds.color }} />
                      <span style={{ fontSize: '1rem', color: ds.color, fontWeight: 700 }}>{ds.data[hoveredAxis]}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
