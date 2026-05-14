'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function BarChartDemo() {
  const [data, setData] = React.useState([
    { label: 'Mon', current: 65, previous: 58, target: 80, color: '#667eea' },
    { label: 'Tue', current: 85, previous: 72, target: 90, color: '#764ba2' },
    { label: 'Wed', current: 45, previous: 65, target: 70, color: '#f093fb' },
    { label: 'Thu', current: 95, previous: 82, target: 95, color: '#4facfe' },
    { label: 'Fri', current: 72, previous: 68, target: 85, color: '#00f2fe' },
    { label: 'Sat', current: 58, previous: 75, target: 65, color: '#43e97b' },
    { label: 'Sun', current: 80, previous: 70, target: 90, color: '#fa709a' },
  ]);

  const [hoveredBar, setHoveredBar] = React.useState(null);
  const [sortMode, setSortMode] = React.useState('none'); // none, asc, desc
  const [showComparison, setShowComparison] = React.useState(true);
  const [showTarget, setShowTarget] = React.useState(true);

  // Particle animation state
  const particles = React.useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 12,
    delay: Math.random() * 4,
  })), []);

  const maxValue = Math.max(...data.flatMap(d => [d.current, d.target])) * 1.1;

  // Sort data
  const sortedData = React.useMemo(() => {
    if (sortMode === 'none') return data;
    return [...data].sort((a, b) => sortMode === 'asc' ? a.current - b.current : b.current - a.current);
  }, [data, sortMode]);

  // Stats
  const total = data.reduce((sum, d) => sum + d.current, 0);
  const avg = Math.round(total / data.length);
  const totalPrev = data.reduce((sum, d) => sum + d.previous, 0);
  const growth = ((total - totalPrev) / totalPrev * 100).toFixed(1);
  const bestDay = data.reduce((max, d) => d.current > max.current ? d : max);
  const worstDay = data.reduce((min, d) => d.current < min.current ? d : min);

  return (
    <>
      <div className="demo-header">
        <h2 className="demo-title">Bar Chart</h2>
        <p className="demo-subtitle">Advanced grouped bar chart with comparison overlays, sorting, statistics, and trend indicators</p>
      </div>
      <div className="demo-area">
        <div style={{ width: 820, height: 480, background: 'linear-gradient(135deg, rgba(15, 15, 25, 0.95) 0%, rgba(25, 20, 35, 0.9) 100%)', borderRadius: 20, padding: 30, border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 0 60px rgba(118, 75, 162, 0.15), inset 0 0 60px rgba(0,0,0,0.3)', position: 'relative', overflow: 'hidden' }}>

          {/* Animated background gradient mesh */}
          <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.12, pointerEvents: 'none' }}>
            <defs>
              <radialGradient id="barMesh1">
                <stop offset="0%" stopColor="#764ba2" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#764ba2" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="barMesh2">
                <stop offset="0%" stopColor="#f093fb" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#f093fb" stopOpacity="0"/>
              </radialGradient>
              <filter id="barGlowMesh">
                <feGaussianBlur stdDeviation="10" result="coloredBlur"/>
                <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <ellipse cx="30%" cy="20%" rx="220" ry="170" fill="url(#barMesh1)" filter="url(#barGlowMesh)">
              <animate attributeName="cx" values="30%;70%;30%" dur="14s" repeatCount="indefinite"/>
              <animate attributeName="cy" values="20%;80%;20%" dur="14s" repeatCount="indefinite"/>
            </ellipse>
            <ellipse cx="70%" cy="80%" rx="190" ry="140" fill="url(#barMesh2)" filter="url(#barGlowMesh)" opacity="0.7">
              <animate attributeName="cx" values="70%;30%;70%" dur="11s" repeatCount="indefinite"/>
              <animate attributeName="cy" values="80%;20%;80%" dur="11s" repeatCount="indefinite"/>
            </ellipse>
          </svg>

          {/* Floating particles */}
          {particles.map(p => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0 }}
              animate={{
                x: [`${p.x}%`, `${(p.x + 25) % 100}%`, `${p.x}%`],
                y: [`${p.y}%`, `${(p.y + 15) % 100}%`, `${p.y}%`],
                opacity: [0.2, 0.6, 0.2],
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
                background: 'radial-gradient(circle, rgba(118, 75, 162, 0.8) 0%, rgba(118, 75, 162, 0) 70%)',
                pointerEvents: 'none',
                filter: 'blur(1.5px)',
              }}
            />
          ))}

          {/* Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10, marginBottom: 22, position: 'relative', zIndex: 1 }}>
            {[
              { label: 'Total', value: total, color: '#667eea', suffix: '' },
              { label: 'Average', value: avg, color: '#764ba2', suffix: '/day' },
              { label: 'Growth', value: growth, color: parseFloat(growth) >= 0 ? '#43e97b' : '#f87171', suffix: '%' },
              { label: 'Best', value: bestDay.label, color: bestDay.color, suffix: ` (${bestDay.current})` },
              { label: 'Worst', value: worstDay.label, color: worstDay.color, suffix: ` (${worstDay.current})` },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.04, y: -3 }}
                transition={{ delay: i * 0.06, type: 'spring' }}
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                  borderRadius: 12,
                  padding: '14px 10px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <motion.div
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4, repeatDelay: 2.5 }}
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
                <div style={{ fontSize: '0.65rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 4, fontWeight: 500 }}>{stat.label}</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: stat.color, textShadow: `0 0 25px ${stat.color}55` }}>{stat.value}{stat.suffix}</div>
              </motion.div>
            ))}
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(118, 75, 162, 0.4)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSortMode(sortMode === 'none' ? 'desc' : sortMode === 'desc' ? 'asc' : 'none')}
              style={{
                padding: '9px 15px',
                background: sortMode !== 'none' ? 'linear-gradient(135deg, rgba(118, 75, 162, 0.3) 0%, rgba(240, 147, 251, 0.2) 100%)' : 'rgba(255,255,255,0.05)',
                border: '1px solid ' + (sortMode !== 'none' ? 'rgba(118, 75, 162, 0.5)' : 'rgba(255,255,255,0.1)'),
                borderRadius: 10,
                color: sortMode !== 'none' ? '#fff' : '#999',
                fontSize: '0.72rem',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              {sortMode === 'none' ? '📊 Sort' : sortMode === 'desc' ? '⬇️ Descending' : '⬆️ Ascending'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(118, 75, 162, 0.4)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowComparison(!showComparison)}
              style={{
                padding: '9px 15px',
                background: showComparison ? 'linear-gradient(135deg, rgba(118, 75, 162, 0.3) 0%, rgba(240, 147, 251, 0.2) 100%)' : 'rgba(255,255,255,0.05)',
                border: '1px solid ' + (showComparison ? 'rgba(118, 75, 162, 0.5)' : 'rgba(255,255,255,0.1)'),
                borderRadius: 10,
                color: showComparison ? '#fff' : '#999',
                fontSize: '0.72rem',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              {showComparison ? '📈 Compare ON' : '📈 Compare OFF'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(118, 75, 162, 0.4)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowTarget(!showTarget)}
              style={{
                padding: '9px 15px',
                background: showTarget ? 'linear-gradient(135deg, rgba(118, 75, 162, 0.3) 0%, rgba(240, 147, 251, 0.2) 100%)' : 'rgba(255,255,255,0.05)',
                border: '1px solid ' + (showTarget ? 'rgba(118, 75, 162, 0.5)' : 'rgba(255,255,255,0.1)'),
                borderRadius: 10,
                color: showTarget ? '#fff' : '#999',
                fontSize: '0.72rem',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              {showTarget ? '🎯 Target ON' : '🎯 Target OFF'}
            </motion.button>
          </div>

          {/* Chart */}
          <div style={{ position: 'relative', height: 280 }}>
            {/* Y-axis */}
            <div style={{ position: 'absolute', left: 0, top: 20, bottom: 50, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: 35 }}>
              {[0, 25, 50, 75, 100].map(pct => {
                const val = Math.round((maxValue * pct) / 100);
                return (
                  <span key={pct} style={{ fontSize: '0.65rem', color: '#555', textAlign: 'right' }}>{val}</span>
                );
              })}
            </div>

            {/* Bars */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: 230, gap: 10, marginLeft: 40, marginRight: 10, position: 'relative' }}>
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

              {sortedData.map((item, i) => {
                const currentHeight = (item.current / maxValue) * 210;
                const prevHeight = (item.previous / maxValue) * 210;
                const targetHeight = (item.target / maxValue) * 210;
                const diff = item.current - item.previous;
                const diffPct = ((diff / item.previous) * 100).toFixed(0);

                return (
                  <motion.div
                    key={item.label}
                    layout
                    style={{
                      flex: 1,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      position: 'relative',
                    }}
                  >
                    {/* Extended tooltip */}
                    <AnimatePresence>
                      {hoveredBar === i && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.9 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                          style={{
                            position: 'absolute',
                            top: -85,
                            background: 'rgba(15, 15, 25, 0.98)',
                            padding: '12px 16px',
                            borderRadius: 12,
                            border: `2px solid ${item.color}`,
                            minWidth: '110px',
                            zIndex: 10,
                            boxShadow: `0 0 25px ${item.color}40, 0 5px 15px rgba(0,0,0,0.4)`,
                          }}
                        >
                          <div style={{ fontSize: '0.7rem', color: '#999', marginBottom: 5, fontWeight: 600, textTransform: 'uppercase' }}>{item.label}</div>
                          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: item.color, textShadow: `0 0 20px ${item.color}66` }}>{item.current}</div>
                          <div style={{ fontSize: '0.7rem', color: diff >= 0 ? '#4ade80' : '#f87171', marginTop: 4, fontWeight: 700 }}>
                            {diff >= 0 ? '↑' : '↓'} {Math.abs(diff)} ({diffPct}%)
                          </div>
                          <div style={{ fontSize: '0.65rem', color: '#777', marginTop: 6, paddingTop: 6, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                            Prev: {item.previous} | Target: {item.target}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Comparison bars */}
                    <AnimatePresence>
                      {showComparison && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: prevHeight }}
                          exit={{ height: 0 }}
                          transition={{ delay: i * 0.03 }}
                          style={{
                            width: '100%',
                            position: 'absolute',
                            bottom: 0,
                            background: 'rgba(148, 163, 184, 0.25)',
                            borderRadius: '6px 6px 0 0',
                            borderStyle: 'dashed',
                            borderWidth: '1px',
                            borderColor: 'rgba(148, 163, 184, 0.3)',
                          }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Target bar indicator */}
                    <AnimatePresence>
                      {showTarget && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.6 }}
                          exit={{ opacity: 0 }}
                          style={{
                            position: 'absolute',
                            width: '100%',
                            height: 2,
                            bottom: targetHeight,
                            background: 'rgba(74, 222, 128, 0.5)',
                            borderRadius: 1,
                          }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Main bar */}
                    <motion.div
                      style={{
                        width: '100%',
                        height: currentHeight,
                        background: `linear-gradient(180deg, ${item.color}, ${item.color}99 50%, ${item.color}66)`,
                        borderRadius: '10px 10px 0 0',
                        cursor: 'pointer',
                        position: 'relative',
                        overflow: 'hidden',
                        zIndex: 1,
                        boxShadow: hoveredBar === i ? `0 0 25px ${item.color}60` : 'none',
                      }}
                      initial={{ height: 0 }}
                      animate={{ height: currentHeight }}
                      transition={{ delay: i * 0.06, type: 'spring', stiffness: 300, damping: 20 }}
                      whileHover={{ scaleY: 1.04 }}
                      onHoverStart={() => setHoveredBar(i)}
                      onHoverEnd={() => setHoveredBar(null)}
                    >
                      {/* Animated shimmer effect */}
                      <motion.div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(180deg, rgba(255,255,255,0.3), transparent 50%, rgba(255,255,255,0.1))',
                        }}
                        animate={{ y: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: i * 0.12 }}
                      />

                      {/* Glow overlay on hover */}
                      <AnimatePresence>
                        {hoveredBar === i && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            exit={{ opacity: 0 }}
                            style={{
                              position: 'absolute',
                              inset: 0,
                              background: `radial-gradient(circle at center, ${item.color}80, transparent 70%)`,
                            }}
                          />
                        )}
                      </AnimatePresence>

                      {/* Value inside bar */}
                      <AnimatePresence>
                        {currentHeight > 30 && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{
                              position: 'absolute',
                              top: 10,
                              left: '50%',
                              transform: 'translateX(-50%)',
                              fontSize: '0.8rem',
                              fontWeight: 800,
                              color: '#fff',
                              textShadow: '0 2px 4px rgba(0,0,0,0.4)',
                            }}
                          >
                            {item.current}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Label */}
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ delay: 0.4 + i * 0.06 }}
                      style={{
                        marginTop: 12,
                        fontSize: '0.85rem',
                        color: hoveredBar === i ? '#fff' : '#999',
                        fontWeight: hoveredBar === i ? 700 : 500,
                        background: hoveredBar === i ? `linear-gradient(135deg, ${item.color}40, ${item.color}20)` : 'transparent',
                        padding: hoveredBar === i ? '6px 14px' : '4px 8px',
                        borderRadius: 8,
                        border: hoveredBar === i ? `1px solid ${item.color}60` : '1px solid transparent',
                        textShadow: hoveredBar === i ? `0 0 15px ${item.color}80` : 'none',
                      }}
                    >
                      {item.label}
                    </motion.span>

                    {/* Trend indicator */}
                    {diff !== 0 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + i * 0.06 }}
                        style={{
                          marginTop: 6,
                          fontSize: '0.7rem',
                          color: diff > 0 ? '#4ade80' : '#f87171',
                          fontWeight: 700,
                          textShadow: diff > 0 ? '0 0 10px rgba(74, 222, 128, 0.5)' : '0 0 10px rgba(248, 113, 113, 0.5)',
                        }}
                      >
                        {diff > 0 ? '↑' : '↓'} {Math.abs(diffPct)}%
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', gap: 20, marginTop: 18, justifyContent: 'center', fontSize: '0.75rem', position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ width: 18, height: 14, background: 'linear-gradient(180deg, #667eea, #667eea88)', borderRadius: 4, boxShadow: '0 0 10px rgba(102, 126, 234, 0.5)' }} />
              <span style={{ color: '#bbb', fontWeight: 600 }}>Current</span>
            </div>
            {showComparison && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ width: 18, height: 14, background: 'rgba(148, 163, 184, 0.25)', borderRadius: 4, border: '1px dashed rgba(148, 163, 184, 0.5)' }} />
                <span style={{ color: '#bbb', fontWeight: 600 }}>Previous</span>
              </div>
            )}
            {showTarget && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 16, height: 2, background: 'rgba(74, 222, 128, 0.5)', borderRadius: 1 }} />
                <span style={{ color: '#888' }}>Target</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
