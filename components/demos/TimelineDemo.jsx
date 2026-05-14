'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function TimelineDemo() {
  const [activeEvent, setActiveEvent] = React.useState(2);
  const [isPlaying, setIsPlaying] = React.useState(true);

  const events = [
    { year: '2019', month: 'Mar', title: 'Founded', desc: 'Two engineers left Google to build the future of collaboration.', icon: '🚀', color: '#667eea', metric: '2', metricLabel: 'Founders' },
    { year: '2020', month: 'Jun', title: 'Seed Round', desc: 'Raised $2.5M from Sequoia and a16z to accelerate development.', icon: '💰', color: '#43e97b', metric: '$2.5M', metricLabel: 'Raised' },
    { year: '2021', month: 'Jan', title: 'Product Launch', desc: 'V1.0 launched with 10,000 beta users. 4.9★ rating on Product Hunt.', icon: '🎉', color: '#f5576c', metric: '10K', metricLabel: 'Beta Users' },
    { year: '2022', month: 'Sep', title: 'Series A', desc: '$18M raised, team grew to 50+. Opened SF & NYC offices.', icon: '📈', color: '#4facfe', metric: '$18M', metricLabel: 'Series A' },
    { year: '2023', month: 'Apr', title: 'Global', desc: 'Expanded to 5 countries. 500K active users. Enterprise launch.', icon: '🌍', color: '#fa709a', metric: '500K', metricLabel: 'Users' },
    { year: '2024', month: 'Dec', title: 'Unicorn', desc: '$1B valuation after Series C. Preparing for IPO in 2025.', icon: '🦄', color: '#fbbf24', metric: '$1B', metricLabel: 'Valuation' },
  ];

  React.useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveEvent(e => (e + 1) % events.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <>
      <div className="demo-header">
        <h2 className="demo-title">Timeline</h2>
        <p className="demo-subtitle">Interactive company journey with auto-play, metrics, and smooth transitions</p>
      </div>
      <div className="demo-area" style={{ position: 'relative' }}>
        {/* Ambient glow */}
        <div style={{ position: 'absolute', top: '5%', left: '15%', width: 350, height: 350, background: 'radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '20%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(250, 112, 154, 0.12) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ maxWidth: '620px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ position: 'relative', marginBottom: '30px' }}>
            <motion.div
              style={{
                position: 'absolute', top: '50%', left: 0, right: 0, height: '2px',
                background: 'rgba(255,255,255,0.1)',
              }}
            />
            <motion.div
              style={{
                position: 'absolute', top: '50%', left: 0, height: '2px',
                background: `linear-gradient(90deg, ${events[0].color}, ${events[activeEvent].color})`,
              }}
              animate={{ width: `${(activeEvent / (events.length - 1)) * 100}%` }}
              transition={{ duration: 0.5 }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
              {events.map((event, i) => {
                const isActive = activeEvent === i;
                const isPast = i <= activeEvent;
                return (
                  <motion.div
                    key={event.year}
                    onClick={() => { setActiveEvent(i); setIsPlaying(false); }}
                    style={{ textAlign: 'center', cursor: 'pointer', zIndex: 2 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <motion.div
                      style={{
                        width: isActive ? 56 : 40, height: isActive ? 56 : 40,
                        borderRadius: '50%',
                        background: isPast ? event.color : 'rgba(30,30,40,1)',
                        border: `3px solid ${event.color}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: isActive ? '1.4rem' : '1rem',
                        margin: '0 auto 8px',
                        boxShadow: isActive ? `0 0 30px ${event.color}60` : 'none',
                      }}
                      animate={{ scale: isActive ? 1 : 0.9 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      {event.icon}
                    </motion.div>
                    <motion.div
                      style={{ fontSize: '0.7rem', fontWeight: 700, color: isActive ? event.color : '#666' }}
                      animate={{ y: isActive ? -2 : 0 }}
                    >
                      {event.year}
                    </motion.div>
                    <div style={{ fontSize: '0.55rem', color: '#555' }}>{event.month}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeEvent}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              style={{
                background: 'rgba(15,15,25,0.9)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                padding: '24px',
                border: `1px solid ${events[activeEvent].color}30`,
                boxShadow: `0 20px 50px ${events[activeEvent].color}15`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <motion.div
                style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                  background: `linear-gradient(90deg, transparent, ${events[activeEvent].color}, transparent)`,
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5 }}
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '20px', alignItems: 'start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <motion.span
                      style={{ fontSize: '2rem' }}
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      {events[activeEvent].icon}
                    </motion.span>
                    <div>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                        {events[activeEvent].title}
                      </h3>
                      <div style={{
                        fontSize: '0.7rem', color: events[activeEvent].color,
                        background: `${events[activeEvent].color}20`,
                        padding: '2px 8px', borderRadius: '4px', display: 'inline-block', marginTop: '4px',
                      }}>
                        {events[activeEvent].month} {events[activeEvent].year}
                      </div>
                    </div>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                    {events[activeEvent].desc}
                  </p>
                </div>

                <motion.div
                  style={{
                    background: `${events[activeEvent].color}15`,
                    border: `1px solid ${events[activeEvent].color}30`,
                    borderRadius: '16px',
                    padding: '16px 24px',
                    textAlign: 'center',
                    minWidth: '100px',
                  }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div
                    style={{ fontSize: '1.8rem', fontWeight: 800, color: events[activeEvent].color }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {events[activeEvent].metric}
                  </motion.div>
                  <div style={{ fontSize: '0.65rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {events[activeEvent].metricLabel}
                  </div>
                </motion.div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {events.map((_, i) => (
                    <motion.div
                      key={i}
                      onClick={() => { setActiveEvent(i); setIsPlaying(false); }}
                      style={{
                        width: activeEvent === i ? 24 : 8, height: 8,
                        borderRadius: 4,
                        background: activeEvent === i ? events[activeEvent].color : 'rgba(255,255,255,0.2)',
                        cursor: 'pointer',
                      }}
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.2 }}
                    />
                  ))}
                </div>
                <motion.button
                  onClick={() => setIsPlaying(!isPlaying)}
                  style={{
                    padding: '6px 12px', borderRadius: '6px', border: 'none',
                    background: 'rgba(255,255,255,0.1)', color: '#fff',
                    fontSize: '0.7rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px',
                  }}
                  whileHover={{ background: 'rgba(255,255,255,0.15)' }}
                >
                  {isPlaying ? '⏸ Pause' : '▶ Play'}
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
