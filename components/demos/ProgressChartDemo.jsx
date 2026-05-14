'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function ProgressChartDemo() {
  const [projects, setProjects] = React.useState([
    { label: 'Alpha Release', stages: [{ name: 'Research', value: 100, target: 100, color: '#667eea' }, { name: 'Design', value: 92, target: 100, color: '#764ba2' }, { name: 'Development', value: 68, target: 100, color: '#f093fb' }, { name: 'Testing', value: 35, target: 100, color: '#4facfe' }, { name: 'Deploy', value: 10, target: 100, color: '#43e97b' }], status: 'On Track' },
    { label: 'Beta Launch', stages: [{ name: 'Research', value: 100, target: 100, color: '#667eea' }, { name: 'Design', value: 78, target: 100, color: '#764ba2' }, { name: 'Development', value: 45, target: 100, color: '#f093fb' }, { name: 'Testing', value: 15, target: 100, color: '#4facfe' }, { name: 'Deploy', value: 0, target: 100, color: '#43e97b' }], status: 'At Risk' },
    { label: 'Gamma Update', stages: [{ name: 'Research', value: 100, target: 100, color: '#667eea' }, { name: 'Design', value: 100, target: 100, color: '#764ba2' }, { name: 'Development', value: 85, target: 100, color: '#f093fb' }, { name: 'Testing', value: 60, target: 100, color: '#4facfe' }, { name: 'Deploy', value: 25, target: 100, color: '#43e97b' }], status: 'Ahead' },
  ]);

  const [hoveredProject, setHoveredProject] = React.useState(null);
  const [hoveredStage, setHoveredStage] = React.useState(null);
  const [isPaused, setIsPaused] = React.useState(false);

  // Particle animation state
  const particles = React.useMemo(() => Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 1,
    duration: Math.random() * 11 + 16,
    delay: Math.random() * 4,
  })), []);

  // Live progress updates
  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setProjects(prev => prev.map(proj => ({
        ...proj,
        stages: proj.stages.map(stage => {
          if (stage.value >= 100) return stage;
          const increment = Math.random() > 0.7 ? Math.random() * 3 : 0;
          return { ...stage, value: Math.min(100, stage.value + increment) };
        }),
      })));
    }, 1500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const getProjectProgress = (proj) => Math.round(proj.stages.reduce((sum, s) => sum + s.value, 0) / proj.stages.length);
  const getStatusColor = (status) => status === 'Ahead' ? '#43e97b' : status === 'On Track' ? '#667eea' : '#f87171';

  return (
    <>
      <div className="demo-header">
        <h2 className="demo-title">Progress Chart</h2>
        <p className="demo-subtitle">Advanced multi-stage progress tracker with live updates, target indicators, and project status monitoring</p>
      </div>
      <div className="demo-area">
        <div style={{ width: 840, height: 530, background: 'linear-gradient(135deg, rgba(15, 15, 25, 0.95) 0%, rgba(25, 20, 35, 0.9) 100%)', borderRadius: 20, padding: 30, border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 0 60px rgba(79, 172, 254, 0.15), inset 0 0 60px rgba(0,0,0,0.3)', position: 'relative', overflow: 'hidden' }}>

          {/* Animated background gradient mesh */}
          <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.11, pointerEvents: 'none' }}>
            <defs>
              <radialGradient id="progressMesh1">
                <stop offset="0%" stopColor="#4facfe" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#4facfe" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="progressMesh2">
                <stop offset="0%" stopColor="#43e97b" stopOpacity="0.7"/>
                <stop offset="100%" stopColor="#43e97b" stopOpacity="0"/>
              </radialGradient>
              <filter id="progressGlowMesh">
                <feGaussianBlur stdDeviation="10" result="coloredBlur"/>
                <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <ellipse cx="28%" cy="32%" rx="240" ry="185" fill="url(#progressMesh1)" filter="url(#progressGlowMesh)">
              <animate attributeName="cx" values="28%;72%;28%" dur="15s" repeatCount="indefinite"/>
              <animate attributeName="cy" values="32%;68%;32%" dur="15s" repeatCount="indefinite"/>
            </ellipse>
            <ellipse cx="72%" cy="68%" rx="205" ry="155" fill="url(#progressMesh2)" filter="url(#progressGlowMesh)" opacity="0.7">
              <animate attributeName="cx" values="72%;28%;72%" dur="11s" repeatCount="indefinite"/>
              <animate attributeName="cy" values="68%;32%;68%" dur="11s" repeatCount="indefinite"/>
            </ellipse>
          </svg>

          {/* Floating particles */}
          {particles.map(p => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0 }}
              animate={{
                x: [`${p.x}%`, `${(p.x + 23) % 100}%`, `${p.x}%`],
                y: [`${p.y}%`, `${(p.y + 18) % 100}%`, `${p.y}%`],
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
                background: 'radial-gradient(circle, rgba(79, 172, 254, 0.8) 0%, rgba(79, 172, 254, 0) 70%)',
                pointerEvents: 'none',
                filter: 'blur(1px)',
              }}
            />
          ))}

          {/* Overall stats */}
          <div style={{ display: 'flex', gap: 15, marginBottom: 20 }}>
            {projects.map((proj, i) => {
              const progress = getProjectProgress(proj);
              return (
                <motion.div
                  key={proj.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    flex: 1,
                    background: `${getStatusColor(proj.status)}15`,
                    borderRadius: 10,
                    padding: '14px',
                    border: `1px solid ${getStatusColor(proj.status)}40`,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: '0.8rem', color: '#aaa', fontWeight: 500 }}>{proj.label}</span>
                    <span style={{ fontSize: '0.7rem', color: getStatusColor(proj.status), fontWeight: 600, padding: '2px 8px', borderRadius: 10, background: `${getStatusColor(proj.status)}25` }}>{proj.status}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span style={{ fontSize: '1.8rem', fontWeight: 700, color: getStatusColor(proj.status) }}>{progress}%</span>
                    <span style={{ fontSize: '0.7rem', color: '#666' }}>complete</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Controls */}
          <div style={{ marginBottom: 15 }}>
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
              {isPaused ? '▶ Resume Updates' : '⏸ Pause Updates'}
            </motion.button>
          </div>

          {/* Progress bars */}
          {projects.map((proj, projIdx) => (
            <motion.div
              key={proj.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + projIdx * 0.15 }}
              style={{ marginBottom: 40 }}
            >
              {/* Project header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: '1rem', color: '#eee', fontWeight: 600 }}>{proj.label}</span>
                  <span style={{ fontSize: '0.75rem', color: getStatusColor(proj.status), fontWeight: 600, padding: '3px 10px', borderRadius: 12, background: `${getStatusColor(proj.status)}20` }}>{proj.status}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                  <span style={{ fontSize: '0.85rem', color: '#667eea', fontWeight: 700 }}>{getProjectProgress(proj)}% Complete</span>
                  <span style={{ fontSize: '0.75rem', color: '#666' }}>({proj.stages.filter(s => s.value >= 100).length}/{proj.stages.length} stages done)</span>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ position: 'relative', height: 38, borderRadius: 10, overflow: 'hidden', background: 'rgba(255,255,255,0.05)' }}>
                {proj.stages.map((stage, stageIdx) => {
                  const prevStagesValue = proj.stages.slice(0, stageIdx).reduce((sum, s) => sum + s.value, 0);
                  return (
                    <motion.div
                      key={stage.name}
                      style={{
                        position: 'absolute',
                        left: `${prevStagesValue}%`,
                        width: `${stage.value}%`,
                        height: '100%',
                        background: `linear-gradient(90deg, ${stage.color}, ${stage.color}cc)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        borderRight: stageIdx < proj.stages.length - 1 ? '1px solid rgba(0,0,0,0.3)' : 'none',
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${stage.value}%` }}
                      transition={{ delay: 0.4 + projIdx * 0.15 + stageIdx * 0.08, type: 'spring', stiffness: 80 }}
                      whileHover={{ height: '105%', zIndex: 10 }}
                      onHoverStart={() => { setHoveredProject(projIdx); setHoveredStage(stageIdx); }}
                      onHoverEnd={() => { setHoveredProject(null); setHoveredStage(null); }}
                    >
                      {/* Animated shimmer */}
                      <motion.div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                        }}
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: stageIdx * 0.2 }}
                      />

                      {/* Value label */}
                      <AnimatePresence>
                        {hoveredProject === projIdx && hoveredStage === stageIdx && stage.value > 8 && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 700, textShadow: '0 1px 2px rgba(0,0,0,0.5)', position: 'relative', zIndex: 1 }}
                          >
                            {stage.value.toFixed(0)}%
                          </motion.span>
                        )}
                      </AnimatePresence>

                      {/* Target indicator */}
                      {stage.value < stage.target && hoveredProject === projIdx && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          style={{ position: 'absolute', right: 5, top: 2, width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.5)' }}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Stage legend with details */}
              <div style={{ display: 'flex', gap: 12, marginTop: 10, flexWrap: 'wrap' }}>
                {proj.stages.map((stage, stageIdx) => {
                  const isComplete = stage.value >= 100;
                  const isInProgress = stage.value > 0 && stage.value < 100;
                  return (
                    <motion.div
                      key={stage.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 + projIdx * 0.15 + stageIdx * 0.06 }}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => { setHoveredProject(projIdx); setHoveredStage(stageIdx); }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '8px 12px',
                        borderRadius: 8,
                        background: hoveredProject === projIdx && hoveredStage === stageIdx ? `${stage.color}20` : 'rgba(255,255,255,0.03)',
                        border: hoveredProject === projIdx && hoveredStage === stageIdx ? `1px solid ${stage.color}50` : '1px solid transparent',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ width: 8, height: 8, borderRadius: 2, background: stage.color, opacity: isComplete ? 1 : isInProgress ? 1 : 0.3 }} />
                      <span style={{ fontSize: '0.75rem', color: isComplete ? '#4ade80' : isInProgress ? '#ddd' : '#666', fontWeight: isInProgress ? 500 : 400 }}>
                        {stage.name} ({stage.value.toFixed(0)}%)
                      </span>
                      {isComplete && <span style={{ fontSize: '0.7rem', color: '#4ade80' }}>✓</span>}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
