'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function GanttChartDemo() {
  const [tasks, setTasks] = React.useState([
    { id: 1, name: 'Project Planning', start: 0, duration: 5, progress: 100, color: '#667eea', dependencies: [] },
    { id: 2, name: 'Design Phase', start: 5, duration: 8, progress: 75, color: '#f093fb', dependencies: [1] },
    { id: 3, name: 'Development', start: 13, duration: 12, progress: 45, color: '#4facfe', dependencies: [2] },
    { id: 4, name: 'Testing', start: 25, duration: 6, progress: 0, color: '#43e97b', dependencies: [3] },
    { id: 5, name: 'Deployment', start: 31, duration: 4, progress: 0, color: '#ffd93d', dependencies: [4] },
    { id: 6, name: 'Documentation', start: 20, duration: 8, progress: 30, color: '#ff6b6b', dependencies: [2] },
  ]);
  const [selectedTask, setSelectedTask] = React.useState(null);
  const [viewScale, setViewScale] = React.useState(40);

  const totalDays = 40;
  const chartWidth = totalDays * viewScale;

  const getTaskPosition = (task) => ({
    left: task.start * viewScale,
    width: task.duration * viewScale,
  });

  const getDependencyPath = (fromTask, toTask) => {
    const from = getTaskPosition(fromTask);
    const to = getTaskPosition(toTask);

    const startX = from.left + from.width;
    const startY = fromTask.id * 70 + 35;
    const endX = to.left;
    const endY = toTask.id * 70 + 35;

    const midX = (startX + endX) / 2;

    return `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`;
  };

  return (
    <>
      <h2 className="demo-title">Gantt Chart</h2>
      <p className="demo-subtitle">Project timeline visualization with task bars, dependencies, and progress tracking.</p>
      <div className="demo-area" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30, position: 'relative' }}>
      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: '5%', left: '15%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(240, 147, 251, 0.12) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '15%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(79, 172, 254, 0.1) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none', zIndex: 0 }} />

      <motion.div
        style={{
          width: 1300,
          height: 750,
          background: 'rgba(20, 20, 30, 0.9)',
          borderRadius: 24,
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)',
          padding: 35,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          zIndex: 1,
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 30,
        }}>
          <div>
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: 700,
              margin: 0,
              background: 'linear-gradient(135deg, #f093fb, #4facfe)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Project Timeline</h2>
            <p style={{ margin: '5px 0 0', fontSize: '0.9rem', color: '#888' }}>Track progress, dependencies, and milestones</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <motion.button
              style={{
                padding: '10px 20px',
                borderRadius: 10,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
              whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewScale(Math.max(20, viewScale - 5))}
            >
              - Zoom Out
            </motion.button>
            <motion.button
              style={{
                padding: '10px 20px',
                borderRadius: 10,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
              whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewScale(Math.min(60, viewScale + 5))}
            >
              + Zoom In
            </motion.button>
          </div>
        </div>

        {/* Chart Container */}
        <div style={{
          flex: 1,
          display: 'flex',
          borderRadius: 16,
          background: 'rgba(15, 15, 25, 0.8)',
          border: '1px solid rgba(255,255,255,0.08)',
          overflow: 'hidden',
        }}>
          {/* Task Names */}
          <div style={{
            width: 250,
            borderRight: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(10, 10, 20, 0.9)',
          }}>
            <div style={{
              height: 50,
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              padding: '0 20px',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#888',
            }}>Task</div>
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                style={{
                  height: 70,
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 20px',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  background: selectedTask?.id === task.id ? 'rgba(102, 126, 234, 0.2)' : 'transparent',
                }}
                whileHover={{ background: 'rgba(255,255,255,0.05)' }}
                onClick={() => setSelectedTask(task)}
              >
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: task.color,
                  marginRight: 12,
                }} />
                <span style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>{task.name}</span>
              </motion.div>
            ))}
          </div>

          {/* Timeline */}
          <div style={{ flex: 1, overflowX: 'auto', position: 'relative' }}>
            <svg style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: chartWidth,
              height: '100%',
              pointerEvents: 'none',
            }}>
              {/* Dependencies */}
              {tasks.map(task =>
                task.dependencies.map(depId => {
                  const fromTask = tasks.find(t => t.id === depId);
                  if (!fromTask) return null;
                  return (
                    <motion.path
                      key={`${depId}-${task.id}`}
                      d={getDependencyPath(fromTask, task)}
                      stroke="rgba(102, 126, 234, 0.4)"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    />
                  );
                })
              )}
            </svg>

            <div style={{ position: 'relative', minWidth: chartWidth }}>
              {/* Time Scale Header */}
              <div style={{
                height: 50,
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                position: 'sticky',
                top: 0,
                background: 'rgba(10, 10, 20, 0.95)',
                zIndex: 10,
              }}>
                {Array.from({ length: totalDays }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      left: i * viewScale,
                      width: viewScale,
                      height: '100%',
                      borderLeft: i % 5 === 0 ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: i % 5 === 0 ? '0.8rem' : '0.7rem',
                      fontWeight: i % 5 === 0 ? 600 : 400,
                      color: i % 5 === 0 ? '#888' : '#666',
                    }}
                  >
                    {i % 5 === 0 && `Day ${i + 1}`}
                  </div>
                ))}
              </div>

              {/* Tasks */}
              <div style={{ position: 'relative' }}>
                {/* Grid Lines */}
                {Array.from({ length: totalDays }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      left: i * viewScale,
                      top: 0,
                      width: viewScale,
                      height: tasks.length * 70,
                      borderLeft: i % 5 === 0 ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.03)',
                      background: i % 10 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
                    }}
                  />
                ))}

                {/* Task Bars */}
                {tasks.map((task) => {
                  const pos = getTaskPosition(task);
                  return (
                    <motion.div
                      key={task.id}
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ duration: 0.6, delay: task.id * 0.1 }}
                      style={{
                        position: 'absolute',
                        left: pos.left,
                        top: (task.id - 1) * 70 + 15,
                        width: pos.width,
                        height: 40,
                        borderRadius: 8,
                        background: `linear-gradient(135deg, ${task.color}40, ${task.color}20)`,
                        border: `2px solid ${task.color}`,
                        cursor: 'pointer',
                        overflow: 'hidden',
                      }}
                      whileHover={{ scale: 1.02, boxShadow: `0 4px 20px ${task.color}40` }}
                      onClick={() => setSelectedTask(task)}
                    >
                      {/* Progress Bar */}
                      <motion.div
                        style={{
                          height: '100%',
                          background: `linear-gradient(135deg, ${task.color}, ${task.color}cc)`,
                          borderRadius: 6,
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${task.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />

                      {/* Task Label */}
                      <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: 10,
                        transform: 'translateY(-50%)',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: '#fff',
                        textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        paddingRight: 10,
                      }}>
                        {task.name}
                      </div>

                      {/* Progress Badge */}
                      <div style={{
                        position: 'absolute',
                        right: 10,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        padding: '3px 8px',
                        borderRadius: 6,
                        background: 'rgba(0,0,0,0.4)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: '#fff',
                      }}>
                        {task.progress}%
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Task Details Panel */}
        {selectedTask && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              marginTop: 25,
              padding: 25,
              borderRadius: 16,
              background: 'rgba(15, 15, 25, 0.9)',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              gap: 30,
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Task Name</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 700 }}>{selectedTask.name}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Duration</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: selectedTask.color }}>
                {selectedTask.duration} days
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Progress</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: selectedTask.color }}>
                {selectedTask.progress}%
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Dependencies</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 700 }}>
                {selectedTask.dependencies.length > 0 ? selectedTask.dependencies.join(', ') : 'None'}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
    </>
  );
}
