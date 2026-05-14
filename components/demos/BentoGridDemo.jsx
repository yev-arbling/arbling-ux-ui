'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder, useMotionTemplate } from 'framer-motion';

export default function BentoGridDemo() {
  const [hoveredCell, setHoveredCell] = React.useState(null);
  const [rotateX, setRotateX] = React.useState({});
  const [rotateY, setRotateY] = React.useState({});
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const cells = [
    { id: 1, title: 'Performance', desc: 'Blazing fast with edge computing and smart caching', color: '#667eea', size: 'large', visual: 'performance' },
    { id: 2, title: 'AI Engine', desc: 'Neural networks powering every decision', color: '#f5576c', size: 'tall', visual: 'ai' },
    { id: 3, title: 'Security', desc: 'Bank-grade encryption', color: '#4facfe', size: 'small', visual: 'security' },
    { id: 4, title: 'Global CDN', desc: '200+ edge nodes', color: '#43e97b', size: 'small', visual: 'globe' },
    { id: 5, title: 'Analytics', desc: 'Real-time insights', color: '#fa709a', size: 'wide', visual: 'analytics' },
  ];

  const handleMouseMove = (e, id) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX(prev => ({ ...prev, [id]: (y - centerY) / 10 }));
    setRotateY(prev => ({ ...prev, [id]: (centerX - x) / 10 }));
    mouseX.set(x);
    mouseY.set(y);
  };

  const CellVisual = ({ type, color, isHovered }) => {
    if (type === 'performance') {
      const bars = [65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88, 50];
      return (
        <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20, height: 80, display: 'flex', alignItems: 'flex-end', gap: 6 }}>
          {bars.map((h, i) => (
            <motion.div
              key={i}
              style={{ flex: 1, background: `linear-gradient(to top, ${color}, ${color}50)`, borderRadius: '4px 4px 0 0' }}
              initial={{ height: 0 }}
              animate={{ height: isHovered ? `${h}%` : `${h * 0.6}%` }}
              transition={{ delay: i * 0.05, type: 'spring', stiffness: 100 }}
            />
          ))}
          <motion.div
            style={{ position: 'absolute', top: -30, right: 0, fontSize: '2rem', fontWeight: 800, color: '#fff' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0.3 }}
          >
            <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>
              50ms
            </motion.span>
          </motion.div>
        </div>
      );
    }
    if (type === 'ai') {
      return (
        <div style={{ position: 'absolute', inset: 20, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {[0, 1, 2].map(row => (
            <div key={row} style={{ display: 'flex', gap: 8, marginBottom: 8, justifyContent: 'center' }}>
              {[0, 1, 2, 3].map(col => (
                <motion.div
                  key={col}
                  style={{
                    width: 16, height: 16, borderRadius: 4,
                    background: isHovered ? color : 'rgba(255,255,255,0.2)',
                  }}
                  animate={{
                    scale: isHovered ? [1, 1.3, 1] : 1,
                    opacity: isHovered ? [0.3, 1, 0.3] : 0.3,
                  }}
                  transition={{ duration: 0.8, delay: (row * 4 + col) * 0.1, repeat: isHovered ? Infinity : 0 }}
                />
              ))}
            </div>
          ))}
          <motion.div
            style={{ textAlign: 'center', marginTop: 8, fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}
            animate={{ opacity: isHovered ? 1 : 0 }}
          >
            Processing 1.2M tokens/sec
          </motion.div>
        </div>
      );
    }
    if (type === 'security') {
      return (
        <motion.div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div
            style={{ width: 50, height: 50, borderRadius: '50%', border: `3px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            animate={{ rotate: isHovered ? 360 : 0, borderColor: isHovered ? [color, '#fff', color] : color }}
            transition={{ duration: 2, repeat: isHovered ? Infinity : 0, ease: 'linear' }}
          >
            <motion.span style={{ fontSize: '1.5rem' }} animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }} transition={{ duration: 0.5 }}>
              🔒
            </motion.span>
          </motion.div>
        </motion.div>
      );
    }
    if (type === 'globe') {
      return (
        <motion.div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <motion.div
            style={{ fontSize: '3rem', filter: isHovered ? 'none' : 'grayscale(50%)' }}
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            🌍
          </motion.div>
          {isHovered && [0, 1, 2, 3].map(i => (
            <motion.div
              key={i}
              style={{
                position: 'absolute', width: 6, height: 6, borderRadius: '50%', background: color,
                boxShadow: `0 0 10px ${color}`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: [0, (i % 2 === 0 ? 30 : -30)],
                y: [0, (i < 2 ? -20 : 20)],
              }}
              transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
            />
          ))}
        </motion.div>
      );
    }
    // analytics
    const points = [20, 35, 25, 45, 40, 60, 55, 70, 65, 80, 75, 90];
    const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${i * 22} ${100 - p}`).join(' ');
    return (
      <div style={{ position: 'absolute', bottom: 10, left: 20, right: 20, height: 60 }}>
        <svg width="100%" height="100%" viewBox="0 0 240 100" preserveAspectRatio="none">
          <motion.path
            d={path}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isHovered ? 1 : 0.5 }}
            transition={{ duration: 1 }}
          />
          <motion.path
            d={`${path} L 240 100 L 0 100 Z`}
            fill={`${color}30`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0.3 }}
          />
        </svg>
        <motion.div
          style={{ position: 'absolute', top: -20, right: 0, color: '#43e97b', fontWeight: 700, fontSize: '0.9rem' }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          +127% ↑
        </motion.div>
      </div>
    );
  };

  return (
    <>
      <div className="demo-header">
        <h2 className="demo-title">Bento Grid</h2>
        <p className="demo-subtitle">Apple-inspired asymmetric grid with 3D tilt, live visualizations, and glassmorphism</p>
      </div>
      <div className="demo-area">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(3, 90px)',
          gridTemplateAreas: `"a a b b" "a a c d" "e e e d"`,
          gap: '12px',
          maxWidth: '580px',
          margin: '0 auto',
          perspective: '1000px',
        }}>
          {cells.map((cell, i) => {
            const areas = { 1: 'a', 2: 'b', 3: 'c', 4: 'd', 5: 'e' };
            const isHovered = hoveredCell === cell.id;
            return (
              <motion.div
                key={cell.id}
                style={{
                  gridArea: areas[cell.id],
                  position: 'relative',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transformStyle: 'preserve-3d',
                  background: 'rgba(20,20,30,0.8)',
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${isHovered ? cell.color : 'rgba(255,255,255,0.1)'}`,
                  boxShadow: isHovered ? `0 20px 40px ${cell.color}30, 0 0 0 1px ${cell.color}40, inset 0 1px 0 rgba(255,255,255,0.1)` : '0 10px 30px rgba(0,0,0,0.3)',
                }}
                initial={{ opacity: 0, y: 40, rotateX: 10 }}
                animate={{
                  opacity: 1, y: 0, rotateX: 0,
                  rotateX: rotateX[cell.id] || 0,
                  rotateY: rotateY[cell.id] || 0,
                }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 100 }}
                onHoverStart={() => setHoveredCell(cell.id)}
                onHoverEnd={() => { setHoveredCell(null); setRotateX({}); setRotateY({}); }}
                onMouseMove={(e) => handleMouseMove(e, cell.id)}
              >
                <motion.div
                  style={{
                    position: 'absolute', inset: 0,
                    background: `radial-gradient(circle at 50% 0%, ${cell.color}25 0%, transparent 60%)`,
                  }}
                  animate={{ opacity: isHovered ? 1 : 0.3 }}
                />

                <motion.div
                  style={{
                    position: 'absolute', inset: -1,
                    background: `linear-gradient(135deg, ${cell.color}60, transparent 50%, ${cell.color}30)`,
                    opacity: 0,
                  }}
                  animate={{ opacity: isHovered ? 0.5 : 0 }}
                />

                <motion.div
                  style={{
                    position: 'absolute', inset: 0,
                    background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${cell.color}20, transparent 60%)`,
                  }}
                />

                <div style={{ position: 'relative', padding: '16px', height: '100%', zIndex: 2 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <motion.div
                      style={{
                        width: 8, height: 8, borderRadius: '50%', background: cell.color,
                        boxShadow: `0 0 10px ${cell.color}`,
                      }}
                      animate={{ scale: isHovered ? [1, 1.5, 1] : 1 }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    <span style={{ fontSize: '0.7rem', color: cell.color, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {cell.title}
                    </span>
                  </div>
                  {cell.size !== 'small' && (
                    <motion.p
                      style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', margin: 0, maxWidth: cell.size === 'large' ? '60%' : '100%' }}
                      animate={{ opacity: isHovered ? 1 : 0.7 }}
                    >
                      {cell.desc}
                    </motion.p>
                  )}
                </div>

                <CellVisual type={cell.visual} color={cell.color} isHovered={isHovered} />

                <motion.div
                  style={{
                    position: 'absolute', top: 12, right: 12,
                    width: 24, height: 24, borderRadius: '50%',
                    background: `${cell.color}20`, border: `1px solid ${cell.color}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                  animate={{ scale: isHovered ? 1 : 0, rotate: isHovered ? 0 : -90 }}
                  transition={{ type: 'spring' }}
                >
                  <span style={{ fontSize: '0.6rem', color: cell.color }}>→</span>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
}
