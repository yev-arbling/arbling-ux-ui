'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function DonutChartDemo() {
      const [data, setData] = React.useState([
        { label: 'Product', value: 350000, previous: 320000, color: '#667eea' },
        { label: 'Marketing', value: 250000, previous: 280000, color: '#764ba2' },
        { label: 'Sales', value: 200000, previous: 180000, color: '#f093fb' },
        { label: 'Support', value: 120000, previous: 100000, color: '#4facfe' },
        { label: 'R&D', value: 80000, previous: 95000, color: '#43e97b' },
      ]);

      const [hoveredSegment, setHoveredSegment] = React.useState(null);
      const [selectedSegment, setSelectedSegment] = React.useState(null);
      const [showValues, setShowValues] = React.useState(false);
      const [animateEntry, setAnimateEntry] = React.useState(true);

      // Particle animation state
      const particles = React.useMemo(() => Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 1,
        duration: Math.random() * 12 + 18,
        delay: Math.random() * 6,
      })), []);

      const total = data.reduce((sum, d) => sum + d.value, 0);
      const previousTotal = data.reduce((sum, d) => sum + d.previous, 0);
      const growth = ((total - previousTotal) / previousTotal * 100).toFixed(1);

      const size = 380;
      const outerRadius = 140;
      const innerRadius = 85;
      const strokeWidth = outerRadius - innerRadius;
      const center = size / 2;

      // Convert value to percentage
      const dataWithPct = data.map(d => ({
        ...d,
        pct: (d.value / total) * 100,
        prevPct: (d.previous / previousTotal) * 100,
        change: ((d.value - d.previous) / d.previous * 100).toFixed(1),
      }));

      let currentAngle = -90;

      const segments = dataWithPct.map((d, i) => {
        const angle = (d.pct / 100) * 360;
        const startAngle = currentAngle;
        const endAngle = currentAngle + angle;

        const polarToCartesian = (cx, cy, r, angle) => {
          const rad = (angle - 90) * Math.PI / 180;
          return {
            x: cx + r * Math.cos(rad),
            y: cy + r * Math.sin(rad),
          };
        };

        const midAngle = startAngle + angle / 2;
        const explodeDistance = selectedSegment === i ? 12 : 0;
        const explodeX = Math.cos((midAngle - 90) * Math.PI / 180) * explodeDistance;
        const explodeY = Math.sin((midAngle - 90) * Math.PI / 180) * explodeDistance;

        const start = polarToCartesian(center + explodeX, center + explodeY, outerRadius, endAngle);
        const end = polarToCartesian(center + explodeX, center + explodeY, outerRadius, startAngle);
        const largeArcFlag = angle > 180 ? 1 : 0;

        const pathData = [
          'M', start.x, start.y,
          'A', outerRadius, outerRadius, 0, largeArcFlag, 0, end.x, end.y,
        ].join(' ');

        currentAngle += angle;

        return {
          ...d,
          pathData,
          startAngle,
          endAngle,
          angle,
          midAngle,
          index: i,
          explodeX,
          explodeY,
        };
      });

      // Format numbers
  const formatCurrency = (val) => {
    if (val >= 1000000) return '$' + (val / 1000000).toFixed(1) + 'M';
    if (val >= 1000) return '$' + (val / 1000).toFixed(0) + 'K';
    return '$' + val;
  };

  return (
    <>
      <div className="demo-header">
        <h2 className="demo-title">Donut Chart</h2>
        <p className="demo-subtitle">Interactive donut chart with exploded segments, comparison metrics, animated counters, and dual display modes</p>
      </div>
      <div className="demo-area">
        <div style={{ width: 870, height: 510, background: 'linear-gradient(135deg, rgba(15, 15, 25, 0.95) 0%, rgba(25, 20, 35, 0.9) 100%)', borderRadius: 20, padding: 30, border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 0 60px rgba(102, 126, 234, 0.15), inset 0 0 60px rgba(0,0,0,0.3)', position: 'relative', overflow: 'hidden' }}>

          {/* Animated background gradient mesh */}
          <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.11, pointerEvents: 'none' }}>
            <defs>
              <radialGradient id="donutMesh1">
                <stop offset="0%" stopColor="#667eea" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#667eea" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="donutMesh2">
                <stop offset="0%" stopColor="#43e97b" stopOpacity="0.7"/>
                <stop offset="100%" stopColor="#43e97b" stopOpacity="0"/>
              </radialGradient>
              <filter id="donutGlowMesh">
                <feGaussianBlur stdDeviation="11" result="coloredBlur"/>
                <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <ellipse cx="20%" cy="30%" rx="260" ry="200" fill="url(#donutMesh1)" filter="url(#donutGlowMesh)">
              <animate attributeName="cx" values="20%;80%;20%" dur="16s" repeatCount="indefinite"/>
              <animate attributeName="cy" values="30%;70%;30%" dur="16s" repeatCount="indefinite"/>
            </ellipse>
            <ellipse cx="80%" cy="70%" rx="220" ry="170" fill="url(#donutMesh2)" filter="url(#donutGlowMesh)" opacity="0.7">
              <animate attributeName="cx" values="80%;20%;80%" dur="12s" repeatCount="indefinite"/>
              <animate attributeName="cy" values="70%;30%;70%" dur="12s" repeatCount="indefinite"/>
            </ellipse>
          </svg>

          {/* Floating particles */}
          {particles.map(p => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0 }}
              animate={{
                x: [`${p.x}%`, `${(p.x + 22) % 100}%`, `${p.x}%`],
                y: [`${p.y}%`, `${(p.y + 16) % 100}%`, `${p.y}%`],
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.15, 1],
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

          {/* Top stats bar */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 24, position: 'relative', zIndex: 1 }}>
            {[
              { label: 'Total Revenue', value: formatCurrency(total), color: '#667eea' },
              { label: 'vs Previous', value: (parseFloat(growth) >= 0 ? '+' : '') + growth + '%', color: parseFloat(growth) >= 0 ? '#43e97b' : '#f87171' },
              { label: 'Top Category', value: dataWithPct[0].label, color: dataWithPct[0].color },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ delay: i * 0.08, type: 'spring' }}
                style={{
                  flex: 1,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                  borderRadius: 12,
                  padding: '14px 18px',
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
                <div style={{ fontSize: '0.7rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 5, fontWeight: 500 }}>{stat.label}</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: stat.color, textShadow: `0 0 25px ${stat.color}55` }}>{stat.value}</div>
              </motion.div>
            ))}
          </div>

          {/* Control */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18, position: 'relative', zIndex: 1 }}>
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(102, 126, 234, 0.4)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowValues(!showValues)}
              style={{
                padding: '10px 22px',
                background: showValues ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.2) 100%)' : 'rgba(255,255,255,0.05)',
                border: '1px solid ' + (showValues ? 'rgba(102, 126, 234, 0.5)' : 'rgba(255,255,255,0.1)'),
                borderRadius: 22,
                color: showValues ? '#fff' : '#999',
                fontSize: '0.78rem',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              {showValues ? '💰 Currency' : '📊 Percentage'}
            </motion.button>
          </div>

          <div style={{ display: 'flex', gap: 50, alignItems: 'center' }}>
            {/* Chart */}
            <div style={{ position: 'relative' }}>
              {/* Outer glow ring */}
              <AnimatePresence>
                {selectedSegment !== null && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    style={{
                      position: 'absolute',
                      inset: -20,
                      borderRadius: '50%',
                      background: `conic-gradient(from 0deg, ${segments[selectedSegment].color}00, ${segments[selectedSegment].color}40, ${segments[selectedSegment].color}00)`,
                      filter: 'blur(20px)',
                      zIndex: 0,
                    }}
                  />
                )}
              </AnimatePresence>

              <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', position: 'relative', zIndex: 1 }}>
                <defs>
                  {segments.map((s, i) => (
                    <linearGradient key={s.label} id={`donutGrad${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={s.color} />
                      <stop offset="100%" stopColor={s.color} stopOpacity="0.7"/>
                    </linearGradient>
                  ))}
                  <filter id="donutGlow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Background track */}
                <circle
                  cx={center}
                  cy={center}
                  r={outerRadius - strokeWidth / 2}
                  fill="none"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth={strokeWidth}
                />

                {/* Segments */}
                {segments.map((s, i) => (
                  <motion.g key={s.label}>
                    <motion.path
                      d={s.pathData}
                      fill="none"
                      stroke={`url(#donutGrad${i})`}
                      strokeWidth={strokeWidth}
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: (hoveredSegment === null || hoveredSegment === i) && (selectedSegment === null || selectedSegment === i) ? 1 : 0.3 }}
                      transition={{ duration: 1.2, delay: i * 0.12 }}
                      style={{ cursor: 'pointer', transformOrigin: 'center' }}
                      whileHover={{ scale: 1.02, filter: 'url(#donutGlow)' }}
                      onHoverStart={() => setHoveredSegment(i)}
                      onHoverEnd={() => setHoveredSegment(null)}
                      onClick={() => setSelectedSegment(selectedSegment === i ? null : i)}
                    />

                    {/* Segment label on arc */}
                    <AnimatePresence>
                      {hoveredSegment === i || selectedSegment === i ? (
                        <motion.text
                          x={center + Math.cos((s.midAngle - 90) * Math.PI / 180) * outerRadius}
                          y={center + Math.sin((s.midAngle - 90) * Math.PI / 180) * outerRadius}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="#fff"
                          fontSize="12"
                          fontWeight="600"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transform={`rotate(${s.midAngle}, ${center + Math.cos((s.midAngle - 90) * Math.PI / 180) * outerRadius}, ${center + Math.sin((s.midAngle - 90) * Math.PI / 180) * outerRadius})`}
                        >
                          {s.pct.toFixed(0)}%
                        </motion.text>
                      ) : null}
                    </AnimatePresence>
                  </motion.g>
                ))}
              </svg>

              {/* Center content */}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', zIndex: 2 }}>
                <motion.div
                  animate={{ scale: hoveredSegment !== null || selectedSegment !== null ? 1.08 : 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {selectedSegment !== null ? (
                    <>
                      <motion.div
                        key={selectedSegment}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ fontSize: '2.2rem', fontWeight: 800, color: segments[selectedSegment].color }}
                      >
                        {showValues ? formatCurrency(dataWithPct[selectedSegment].value) : dataWithPct[selectedSegment].pct.toFixed(1) + '%'}
                      </motion.div>
                      <div style={{ fontSize: '1rem', color: '#ccc', marginTop: 2 }}>{segments[selectedSegment].label}</div>
                      <div style={{ fontSize: '0.75rem', color: parseFloat(dataWithPct[selectedSegment].change) >= 0 ? '#4ade80' : '#f87171', marginTop: 4 }}>
                        {parseFloat(dataWithPct[selectedSegment].change) >= 0 ? '↑' : '↓'} {Math.abs(dataWithPct[selectedSegment].change)}% vs prev
                      </div>
                    </>
                  ) : hoveredSegment !== null ? (
                    <>
                      <motion.div
                        key={hoveredSegment}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{ fontSize: '2.5rem', fontWeight: 800, background: 'linear-gradient(135deg, #667eea, #f093fb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                      >
                        {showValues ? formatCurrency(dataWithPct[hoveredSegment].value) : dataWithPct[hoveredSegment].pct.toFixed(1) + '%'}
                      </motion.div>
                      <div style={{ fontSize: '0.95rem', color: '#ccc', marginTop: 4 }}>{segments[hoveredSegment].label}</div>
                    </>
                  ) : (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ fontSize: '2.5rem', fontWeight: 800, background: 'linear-gradient(135deg, #667eea, #f093fb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                      >
                        {showValues ? formatCurrency(total) : '100%'}
                      </motion.div>
                      <div style={{ fontSize: '0.9rem', color: '#888', marginTop: 4 }}>Total Revenue</div>
                      <div style={{ fontSize: '0.75rem', color: parseFloat(growth) >= 0 ? '#4ade80' : '#f87171', marginTop: 2 }}>
                        {parseFloat(growth) >= 0 ? '↑' : '↓'} {Math.abs(growth)}% growth
                      </div>
                    </>
                  )}
                </motion.div>
              </div>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {dataWithPct.map((d, i) => (
                <motion.div
                  key={d.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  onClick={() => setSelectedSegment(selectedSegment === i ? null : i)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '12px 18px',
                    borderRadius: 12,
                    background: (hoveredSegment === i || selectedSegment === i) ? `${d.color}25` : 'rgba(255,255,255,0.03)',
                    border: (hoveredSegment === i || selectedSegment === i) ? `1px solid ${d.color}50` : '1px solid transparent',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onHoverStart={() => setHoveredSegment(i)}
                  onHoverEnd={() => setHoveredSegment(null)}
                >
                  {selectedSegment === i && (
                    <motion.div
                      layoutId="selectedIndicator"
                      style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: d.color }}
                    />
                  )}

                  <div style={{ width: 16, height: 16, borderRadius: 4, background: d.color, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.9rem', color: '#ddd', fontWeight: 500 }}>{d.label}</div>
                    <div style={{ fontSize: '0.7rem', color: parseFloat(d.change) >= 0 ? '#4ade80' : '#f87171' }}>
                      {parseFloat(d.change) >= 0 ? '↑' : '↓'} {Math.abs(d.change)}% vs previous
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1rem', color: '#fff', fontWeight: 700 }}>
                      {showValues ? formatCurrency(d.value) : d.pct.toFixed(1) + '%'}
                    </div>
                    <div style={{ fontSize: '0.65rem', color: '#666' }}>
                      of total
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{ marginTop: 20, textAlign: 'center', fontSize: '0.75rem', color: '#555' }}
          >
            Click legend items to explode segments • Toggle button to switch display modes
          </motion.div>
        </div>
      </div>
    </>
  );
}
