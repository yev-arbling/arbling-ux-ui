'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function HistogramDemo() {
  const [data, setData] = React.useState(() =>
    Array.from({ length: 100 }, () => Math.floor(Math.random() * 60) + 10)
  );

  const [hoveredBin, setHoveredBin] = React.useState(null);
  const [numBins, setNumBins] = React.useState(8);
  const [isPaused, setIsPaused] = React.useState(false);

  // Particle animation state
  const particles = React.useMemo(() => Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 1,
    duration: Math.random() * 12 + 15,
    delay: Math.random() * 4,
  })), []);

  // Create bins dynamically
  const bins = React.useMemo(() => {
    const minVal = Math.min(...data);
    const maxVal = Math.max(...data);
    const range = maxVal - minVal;
    const binWidth = range / numBins;

    const binsArr = Array.from({ length: numBins }, (_, i) => ({
      rangeStart: Math.round(minVal + i * binWidth),
      rangeEnd: Math.round(minVal + (i + 1) * binWidth),
      values: [],
      count: 0,
      avg: 0,
    }));

    data.forEach(v => {
      const binIndex = Math.min(Math.floor((v - minVal) / binWidth), numBins - 1);
      binsArr[binIndex].values.push(v);
      binsArr[binIndex].count++;
    });

    binsArr.forEach(bin => {
      bin.avg = bin.values.length > 0 ? Math.round(bin.values.reduce((a, b) => a + b, 0) / bin.values.length) : 0;
    });

    return binsArr;
  }, [data, numBins]);

  // Live updates
  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setData(prev => prev.map(v => Math.max(5, Math.min(75, v + (Math.random() - 0.5) * 12))));
    }, 2000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const maxCount = Math.max(...bins.map(b => b.count));
  const overallAvg = Math.round(data.reduce((a, b) => a + b, 0) / data.length);
  const median = [...data].sort((a, b) => a - b)[Math.floor(data.length / 2)];
  const stdDev = Math.round(Math.sqrt(data.reduce((sum, v) => sum + Math.pow(v - overallAvg, 2), 0) / data.length));

  return (
    <>
      <div className="demo-header">
        <h2 className="demo-title">Histogram</h2>
        <p className="demo-subtitle">Advanced distribution analysis with dynamic binning, statistics overlays, and live data streaming</p>
      </div>
      <div className="demo-area">
        <div style={{ width: 840, height: 510, background: 'linear-gradient(135deg, rgba(15, 15, 25, 0.95) 0%, rgba(25, 20, 35, 0.9) 100%)', borderRadius: 20, padding: 30, border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 0 60px rgba(79, 172, 254, 0.15), inset 0 0 60px rgba(0,0,0,0.3)', position: 'relative', overflow: 'hidden' }}>

          {/* Animated background gradient mesh */}
          <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.11, pointerEvents: 'none' }}>
            <defs>
              <radialGradient id="histMesh1">
                <stop offset="0%" stopColor="#4facfe" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#4facfe" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="histMesh2">
                <stop offset="0%" stopColor="#f093fb" stopOpacity="0.7"/>
                <stop offset="100%" stopColor="#f093fb" stopOpacity="0"/>
              </radialGradient>
              <filter id="histGlowMesh">
                <feGaussianBlur stdDeviation="9" result="coloredBlur"/>
                <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <ellipse cx="30%" cy="28%" rx="245" ry="190" fill="url(#histMesh1)" filter="url(#histGlowMesh)">
              <animate attributeName="cx" values="30%;70%;30%" dur="13s" repeatCount="indefinite"/>
              <animate attributeName="cy" values="28%;72%;28%" dur="13s" repeatCount="indefinite"/>
            </ellipse>
            <ellipse cx="70%" cy="72%" rx="210" ry="160" fill="url(#histMesh2)" filter="url(#histGlowMesh)" opacity="0.7">
              <animate attributeName="cx" values="70%;30%;70%" dur="10s" repeatCount="indefinite"/>
              <animate attributeName="cy" values="72%;28%;72%" dur="10s" repeatCount="indefinite"/>
            </ellipse>
          </svg>

          {/* Floating particles */}
          {particles.map(p => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0 }}
              animate={{
                x: [`${p.x}%`, `${(p.x + 24) % 100}%`, `${p.x}%`],
                y: [`${p.y}%`, `${(p.y + 16) % 100}%`, `${p.y}%`],
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
                background: 'radial-gradient(circle, rgba(79, 172, 254, 0.8) 0%, rgba(79, 172, 254, 0) 70%)',
                pointerEvents: 'none',
                filter: 'blur(1px)',
              }}
            />
          ))}

          {/* Statistics cards */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
            {[
              { label: 'Total', value: data.length, color: '#667eea' },
              { label: 'Average', value: overallAvg, color: '#764ba2' },
              { label: 'Median', value: median, color: '#f093fb' },
              { label: 'Std Dev', value: stdDev, color: '#4facfe' },
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
                <div style={{ fontSize: '0.65rem', color: '#666', textTransform: 'uppercase' }}>{stat.label}</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 700, color: stat.color }}>{stat.value}</div>
              </motion.div>
            ))}
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 15 }}>
            {[5, 8, 12, 16].map(n => (
              <motion.button
                key={n}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setNumBins(n)}
                style={{
                  padding: '8px 16px',
                  background: numBins === n ? 'rgba(102, 126, 234, 0.2)' : 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(102, 126, 234, 0.3)',
                  borderRadius: 8,
                  color: numBins === n ? '#667eea' : '#888',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                }}
              >
                {n} bins
              </motion.button>
            ))}
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
              {isPaused ? '▶' : '⏸'}
            </motion.button>
          </div>

          {/* Histogram */}
          <div style={{ position: 'relative', height: 280 }}>
            {/* Y-axis labels */}
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 40, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: 35 }}>
              {[0, 25, 50, 75, 100].map(pct => {
                const val = Math.round((maxCount * pct) / 100);
                return (
                  <span key={pct} style={{ fontSize: '0.7rem', color: '#555', textAlign: 'right' }}>{val}</span>
                );
              })}
            </div>

            {/* Chart */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 240, gap: 8, marginLeft: 40, position: 'relative' }}>
              {/* Grid lines */}
              {[0, 25, 50, 75, 100].map(pct => (
                <div
                  key={pct}
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: `${100 - pct}%`,
                    borderTop: '1px solid rgba(255,255,255,0.04)',
                    pointerEvents: 'none',
                  }}
                />
              ))}

              {bins.map((bin, i) => {
                const height = (bin.count / maxCount) * 220;
                const getColor = () => {
                  if (bin.avg < 25) return ['#43e97b', '#43e97b88'];
                  if (bin.avg < 40) return ['#667eea', '#764ba288'];
                  return ['#f093fb', '#f093fb88'];
                };
                const [bg, bgEnd] = getColor();
                const isHovered = hoveredBin === i;

                return (
                  <motion.div
                    key={i}
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      position: 'relative',
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    {/* Detailed tooltip */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          style={{
                            position: 'absolute',
                            top: -70,
                            background: 'rgba(20, 20, 30, 0.98)',
                            padding: '10px 14px',
                            borderRadius: 8,
                            border: `1px solid ${bg}`,
                            minWidth: '100px',
                            zIndex: 10,
                            textAlign: 'center',
                          }}
                        >
                          <div style={{ fontSize: '0.7rem', color: '#666' }}>Range</div>
                          <div style={{ fontSize: '0.9rem', color: '#ddd', fontWeight: 600 }}>{bin.rangeStart} - {bin.rangeEnd}</div>
                          <div style={{ fontSize: '0.7rem', color: '#666', marginTop: 4 }}>Count: {bin.count}</div>
                          <div style={{ fontSize: '0.7rem', color: '#666' }}>Avg: {bin.avg}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Count badge */}
                    <AnimatePresence>
                      {bin.count > 0 && (
                        <motion.div
                          key={bin.count}
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          style={{
                            position: 'absolute',
                            top: -25,
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: bg,
                          }}
                        >
                          {bin.count}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Bar */}
                    <motion.div
                      style={{
                        width: '100%',
                        height: height,
                        background: `linear-gradient(180deg, ${bg}, ${bgEnd})`,
                        borderRadius: '6px 6px 0 0',
                        minHeight: 4,
                        cursor: 'pointer',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                      animate={{ height }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      whileHover={{ height: height * 1.02 }}
                      onHoverStart={() => setHoveredBin(i)}
                      onHoverEnd={() => setHoveredBin(null)}
                    >
                      {/* Shimmer effect */}
                      <motion.div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(180deg, rgba(255,255,255,0.15), transparent)',
                        }}
                        animate={{ y: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: i * 0.1 }}
                      />
                    </motion.div>

                    {/* Range label */}
                    <div style={{
                      marginTop: 10,
                      fontSize: '0.65rem',
                      color: isHovered ? bg : '#666',
                      fontWeight: isHovered ? 600 : 400,
                      textAlign: 'center',
                    }}>
                      {bin.rangeStart}-
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', gap: 20, marginTop: 15, justifyContent: 'center' }}>
            {[
              { label: 'Low (<25)', color: '#43e97b' },
              { label: 'Medium (25-40)', color: '#667eea' },
              { label: 'High (>40)', color: '#f093fb' },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 14, height: 14, borderRadius: 3, background: item.color }} />
                <span style={{ fontSize: '0.75rem', color: '#888' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
