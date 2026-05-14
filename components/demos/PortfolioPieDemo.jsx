'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function PortfolioPieDemo() {
  const [key, setKey] = React.useState(0);
  const [hoveredSegment, setHoveredSegment] = React.useState(null);
  const [displayedTotal, setDisplayedTotal] = React.useState(0);
  const [selectedPeriod, setSelectedPeriod] = React.useState('1D');

  const holdings = [
    {
      name: 'AAPL', fullName: 'Apple Inc.', value: 45000, costBasis: 38500,
      color: '#667eea', percent: 35, change: 2.4, shares: 253,
      avgPrice: 177.92, currentPrice: 181.95, sector: 'Technology',
      target: 30, yearHigh: 199.62, yearLow: 164.08,
    },
    {
      name: 'GOOGL', fullName: 'Alphabet Inc.', value: 28000, costBasis: 29200,
      color: '#22c55e', percent: 22, change: -1.2, shares: 198,
      avgPrice: 141.41, currentPrice: 139.71, sector: 'Technology',
      target: 25, yearHigh: 153.78, yearLow: 129.40,
    },
    {
      name: 'MSFT', fullName: 'Microsoft Corp.', value: 25000, costBasis: 21800,
      color: '#f093fb', percent: 19, change: 1.8, shares: 66,
      avgPrice: 378.79, currentPrice: 385.61, sector: 'Technology',
      target: 20, yearHigh: 468.35, yearLow: 362.90,
    },
    {
      name: 'AMZN', fullName: 'Amazon.com Inc.', value: 18000, costBasis: 16100,
      color: '#fbbf24', percent: 14, change: 3.1, shares: 101,
      avgPrice: 178.22, currentPrice: 183.73, sector: 'Consumer',
      target: 15, yearHigh: 201.20, yearLow: 155.33,
    },
    {
      name: 'Others', fullName: 'Mixed Holdings', value: 12000, costBasis: 11800,
      color: '#6b7280', percent: 10, change: 0.5, shares: 420,
      avgPrice: 28.57, currentPrice: 28.85, sector: 'Diversified',
      target: 10, yearHigh: 0, yearLow: 0,
    },
  ];

  const total = 128000;
  const totalCostBasis = 117400;
  const totalGain = total - totalCostBasis;
  const totalGainPercent = ((totalGain / totalCostBasis) * 100);
  const dailyChange = 2847.50;
  const dailyChangePercent = 2.27;

  // Diversification score
  const diversificationScore = Math.round(100 - (Math.pow(holdings.reduce((sum, h) => sum + Math.pow(h.percent, 2), 0) / 100, 0.5) * 100));

  // Animated count-up
  React.useEffect(() => {
    const duration = 1500;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayedTotal(Math.floor(total * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    animate();
  }, [key]);

  // Calculate pie segments
  let cumulativePercent = 0;
  const segments = holdings.map((h, i) => {
    const startPercent = cumulativePercent;
    cumulativePercent += h.percent;
    return { ...h, startPercent, endPercent: cumulativePercent, index: i };
  });

  const getCoordinatesForPercent = (percent) => {
    const x = Math.cos(2 * Math.PI * percent / 100);
    const y = Math.sin(2 * Math.PI * percent / 100);
    return [x, y];
  };

  const hoveredHolding = hoveredSegment !== null ? holdings[hoveredSegment] : null;

  return (
    <>
      <div className="demo-header">
        <h2 className="demo-title">Portfolio Pie</h2>
        <p className="demo-subtitle">Production-grade portfolio visualization with detailed metrics</p>
      </div>
      <div className="demo-area">
        <div className="portfolio-pie" style={{ gap: 40, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="pie-chart-container" style={{ width: 240, height: 240, position: 'relative' }}>
              <svg viewBox="-1.3 -1.3 2.6 2.6" style={{ transform: 'rotate(-90deg)' }}>
                {segments.map((seg, i) => {
                  const [startX, startY] = getCoordinatesForPercent(seg.startPercent);
                  const [endX, endY] = getCoordinatesForPercent(seg.endPercent);
                  const largeArcFlag = seg.percent > 50 ? 1 : 0;
                  const outerRadius = 1.15;
                  const innerRadius = 1.05;
                  const startXOuter = startX * outerRadius;
                  const startYOuter = startY * outerRadius;
                  const endXOuter = endX * outerRadius;
                  const endYOuter = endY * outerRadius;
                  const startXInner = startX * innerRadius;
                  const startYInner = startY * innerRadius;
                  const endXInner = endX * innerRadius;
                  const endYInner = endY * innerRadius;
                  const targetPathData = `M ${startXOuter} ${startYOuter} A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${endXOuter} ${endYOuter} L ${endXInner} ${endYInner} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${startXInner} ${startYInner} Z`;
                  const isOnTarget = Math.abs(seg.percent - seg.target) <= 2;
                  return (
                    <motion.path
                      key={`target-${key}-${i}`}
                      d={targetPathData}
                      fill={seg.color}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isOnTarget ? 0.3 : 0.15 }}
                      transition={{ delay: 1 + i * 0.1 }}
                    />
                  );
                })}
                {segments.map((seg, i) => {
                  const [startX, startY] = getCoordinatesForPercent(seg.startPercent);
                  const [endX, endY] = getCoordinatesForPercent(seg.endPercent);
                  const largeArcFlag = seg.percent > 50 ? 1 : 0;
                  const pathData = `M ${startX} ${startY} A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY} L 0 0`;
                  const isHovered = hoveredSegment === i;
                  const isOtherHovered = hoveredSegment !== null && hoveredSegment !== i;
                  return (
                    <motion.path
                      key={`${key}-${i}`}
                      d={pathData}
                      fill={seg.color}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: isHovered ? 1.1 : 1,
                        opacity: isOtherHovered ? 0.3 : 1,
                        filter: isHovered ? `drop-shadow(0 0 16px ${seg.color})` : 'none',
                      }}
                      transition={{ delay: i * 0.12, type: 'spring', stiffness: 150, damping: 15 }}
                      onHoverStart={() => setHoveredSegment(i)}
                      onHoverEnd={() => setHoveredSegment(null)}
                      style={{ cursor: 'pointer', transformOrigin: 'center' }}
                    />
                  );
                })}
                <circle cx="0" cy="0" r="0.55" fill="#0a0a0f" />
              </svg>
              <div className="pie-center">
                <AnimatePresence mode="wait">
                  {hoveredHolding ? (
                    <motion.div key="hovered" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.1rem', fontWeight: 700, color: hoveredHolding.color }}>{hoveredHolding.name}</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: 2 }}>${(hoveredHolding.value / 1000).toFixed(1)}K</div>
                      <div style={{ fontSize: '0.7rem', color: '#666', marginTop: 2 }}>{hoveredHolding.percent}% allocation</div>
                      <motion.div style={{ fontSize: '0.75rem', color: hoveredHolding.change >= 0 ? '#22c55e' : '#ef4444', fontWeight: 600, marginTop: 4 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                        {hoveredHolding.change >= 0 ? '+' : ''}{hoveredHolding.change}% today
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div key="total" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }} style={{ textAlign: 'center' }}>
                      <div className="pie-center-value">${(displayedTotal / 1000).toFixed(0)}K</div>
                      <div className="pie-center-label">Portfolio Value</div>
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} style={{ fontSize: '0.75rem', color: '#22c55e', marginTop: 4, fontWeight: 600 }}>
                        +${(dailyChange / 1000).toFixed(1)}K today
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, width: 240 }}>
              <div style={{ padding: '10px 12px', background: 'rgba(102, 126, 234, 0.1)', borderRadius: 8, border: '1px solid rgba(102, 126, 234, 0.2)' }}>
                <div style={{ fontSize: '0.7rem', color: '#888', marginBottom: 2 }}>Total Gain</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#667eea' }}>${(totalGain / 1000).toFixed(1)}K</div>
                <div style={{ fontSize: '0.65rem', color: '#667eea' }}>+{totalGainPercent.toFixed(1)}%</div>
              </div>
              <div style={{ padding: '10px 12px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: 8, border: '1px solid rgba(34, 197, 94, 0.2)' }}>
                <div style={{ fontSize: '0.7rem', color: '#888', marginBottom: 2 }}>Diversity</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#22c55e' }}>{diversificationScore}</div>
                <div style={{ fontSize: '0.65rem', color: '#22c55e' }}>{diversificationScore >= 80 ? 'Excellent' : diversificationScore >= 60 ? 'Good' : 'Fair'}</div>
              </div>
            </motion.div>
          </div>
          <div className="pie-legend" style={{ minWidth: 320, maxWidth: 400, flex: 1 }}>
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ padding: '14px 18px', background: dailyChange >= 0 ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)', borderRadius: 12, marginBottom: 16, border: `1px solid ${dailyChange >= 0 ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: '0.8rem', color: '#888', fontWeight: 500 }}>Today's Performance</span>
                <div style={{ display: 'flex', gap: 6 }}>
                  {['1D', '1W', '1M', 'YTD'].map(period => (
                    <motion.button key={period} onClick={() => setSelectedPeriod(period)} style={{ padding: '4px 8px', fontSize: '0.7rem', background: selectedPeriod === period ? 'rgba(102, 126, 234, 0.3)' : 'rgba(255,255,255,0.05)', border: selectedPeriod === period ? '1px solid #667eea' : '1px solid transparent', borderRadius: 6, color: selectedPeriod === period ? '#667eea' : '#888', cursor: 'pointer', fontWeight: selectedPeriod === period ? 600 : 400 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      {period}
                    </motion.button>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ color: dailyChange >= 0 ? '#22c55e' : '#ef4444', fontWeight: 700, fontSize: '1.3rem' }}>{dailyChange >= 0 ? '+' : ''}${dailyChange.toLocaleString()}</span>
                <span style={{ color: dailyChange >= 0 ? '#22c55e' : '#ef4444', fontWeight: 600, fontSize: '0.95rem' }}>{dailyChange >= 0 ? '+' : ''}{dailyChangePercent}%</span>
              </div>
            </motion.div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {holdings.map((h, i) => {
                const gainLoss = h.value - h.costBasis;
                const isTargetMet = Math.abs(h.percent - h.target) <= 2;
                return (
                  <motion.div key={h.name} className="pie-legend-item" initial={{ opacity: 0, x: 20 }} animate={{ opacity: hoveredSegment === null || hoveredSegment === i ? 1 : 0.3, x: 0, background: hoveredSegment === i ? 'rgba(255,255,255,0.08)' : 'transparent', borderColor: hoveredSegment === i ? h.color : 'transparent' }} transition={{ delay: 0.3 + i * 0.08, type: 'spring', stiffness: 200 }} onHoverStart={() => setHoveredSegment(i)} onHoverEnd={() => setHoveredSegment(null)} style={{ cursor: 'pointer', borderRadius: 10, padding: '14px 12px', margin: '0 -12px', border: '1px solid transparent', position: 'relative' }}>
                    <motion.div className="pie-legend-dot" style={{ background: h.color, boxShadow: hoveredSegment === i ? `0 0 12px ${h.color}` : 'none' }} animate={hoveredSegment === i ? { scale: [1, 1.4, 1.2] } : { scale: 1 }} transition={{ duration: 0.4 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 2 }}>
                        <span className="pie-legend-name" style={{ fontWeight: hoveredSegment === i ? 700 : 500, fontSize: '0.9rem' }}>{h.name}</span>
                        {isTargetMet && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ fontSize: '0.65rem', padding: '2px 6px', background: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', borderRadius: 4, fontWeight: 600 }}>ON TARGET</motion.span>}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#666', marginBottom: 3 }}>{h.shares} shares @ ${h.currentPrice.toFixed(2)}</div>
                      <AnimatePresence>
                        {hoveredSegment === i && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} style={{ fontSize: '0.65rem', color: '#777', marginTop: 4, paddingTop: 4, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}><span>Avg Cost:</span><span>${h.avgPrice.toFixed(2)}</span></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}><span>Cost Basis:</span><span>${(h.costBasis / 1000).toFixed(1)}K</span></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}><span>Target:</span><span style={{ color: isTargetMet ? '#22c55e' : '#fbbf24' }}>{h.target}%</span></div>
                            {h.name !== 'Others' && <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>52w Range:</span><span>${h.yearLow.toFixed(0)} - ${h.yearHigh.toFixed(0)}</span></div>}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <span className="pie-legend-value" style={{ fontWeight: hoveredSegment === i ? 700 : 500 }}>${(h.value / 1000).toFixed(1)}K</span>
                      <div style={{ fontSize: '0.7rem', color: gainLoss >= 0 ? '#22c55e' : '#ef4444', fontWeight: 600 }}>{gainLoss >= 0 ? '+' : ''}${(gainLoss / 1000).toFixed(1)}K</div>
                      <div style={{ fontSize: '0.65rem', color: h.change >= 0 ? '#22c55e' : '#ef4444', opacity: 0.8 }}>{h.change >= 0 ? '+' : ''}{h.change}% today</div>
                    </div>
                    <span className="pie-legend-percent" style={{ fontWeight: hoveredSegment === i ? 700 : 500, color: hoveredSegment === i ? h.color : '#fff' }}>{h.percent}%</span>
                    <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }} style={{ position: 'absolute', bottom: 0, left: 12, right: 12, height: 2, background: 'rgba(255,255,255,0.1)', borderRadius: 1, transformOrigin: 'left', overflow: 'hidden' }}>
                      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: h.percent / h.target }} transition={{ delay: 0.7 + i * 0.1, duration: 0.8, type: 'spring' }} style={{ height: '100%', background: isTargetMet ? '#22c55e' : h.percent > h.target ? '#fbbf24' : h.color, transformOrigin: 'left' }} />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
        <button className="replay-btn" onClick={() => { setKey(k => k + 1); setDisplayedTotal(0); }}>Replay Animation</button>
      </div>
    </>
  );
}
