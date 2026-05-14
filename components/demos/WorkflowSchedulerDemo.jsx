'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const schedules = [
  { id: 1, name: 'Daily Report', cron: '0 9 * * *', next: 'Tomorrow at 9:00 AM', enabled: true, runs: 245 },
  { id: 2, name: 'Weekly Backup', cron: '0 0 * * 0', next: 'Sunday at 12:00 AM', enabled: true, runs: 52 },
  { id: 3, name: 'Hourly Sync', cron: '0 * * * *', next: 'In 32 minutes', enabled: false, runs: 1440 },
  { id: 4, name: 'Monthly Invoice', cron: '0 0 1 * *', next: 'Next month on 1st', enabled: true, runs: 12 },
];

export default function WorkflowSchedulerDemo() {
  const [selectedSchedule, setSelectedSchedule] = React.useState(schedules[0]);
  const [showCronHelper, setShowCronHelper] = React.useState(false);

  const cronPresets = [
    { label: 'Every minute', value: '* * * * *', icon: '⚡' },
    { label: 'Every hour', value: '0 * * * *', icon: '⏱️' },
    { label: 'Daily at 9 AM', value: '0 9 * * *', icon: '🌅' },
    { label: 'Weekly on Monday', value: '0 0 * * 1', icon: '📅' },
    { label: 'Monthly on 1st', value: '0 0 1 * *', icon: '📆' },
  ];

  return (
    <>
      <h2 className="demo-title">Workflow Scheduler</h2>
      <p className="demo-subtitle">Cron-based workflow scheduling. Set up recurring workflow executions with visual cron builder.</p>
      <div className="demo-area" style={{ padding: 40 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 30 }}>
            {/* Schedule list */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Scheduled Workflows</h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '8px 16px',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    border: 'none',
                    borderRadius: 8,
                    color: '#fff',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <span>+</span> New Schedule
                </motion.button>
              </div>

              {schedules.map((schedule, i) => (
                <motion.div
                  key={schedule.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ x: 4 }}
                  onClick={() => setSelectedSchedule(schedule)}
                  style={{
                    marginBottom: 12,
                    padding: 20,
                    background: selectedSchedule.id === schedule.id ? 'rgba(102, 126, 234, 0.1)' : 'rgba(20, 20, 35, 0.6)',
                    border: `2px solid ${selectedSchedule.id === schedule.id ? '#667eea' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: 12,
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'start', gap: 16 }}>
                    <motion.div
                      animate={{
                        scale: schedule.enabled ? [1, 1.2, 1] : 1,
                        opacity: schedule.enabled ? [1, 0.6, 1] : 0.3,
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        background: schedule.enabled ? '#43e97b' : '#666',
                        marginTop: 4,
                        flexShrink: 0,
                      }}
                    />

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{schedule.name}</h4>
                        <div style={{
                          padding: '3px 10px',
                          borderRadius: 6,
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          background: schedule.enabled ? 'rgba(67, 233, 123, 0.15)' : 'rgba(255,255,255,0.05)',
                          color: schedule.enabled ? '#43e97b' : '#666',
                        }}>
                          {schedule.enabled ? 'ACTIVE' : 'PAUSED'}
                        </div>
                      </div>

                      <div style={{
                        padding: '8px 12px',
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: 6,
                        fontSize: '0.8rem',
                        fontFamily: 'monospace',
                        color: '#f093fb',
                        marginBottom: 8,
                      }}>
                        {schedule.cron}
                      </div>

                      <div style={{ display: 'flex', gap: 16, fontSize: '0.75rem', color: '#888' }}>
                        <span>⏰ Next: {schedule.next}</span>
                        <span>▶️ {schedule.runs} runs</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Schedule editor */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedSchedule.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                style={{
                  padding: 24,
                  background: 'rgba(20, 20, 35, 0.8)',
                  borderRadius: 16,
                  border: '1px solid rgba(255,255,255,0.1)',
                  height: 'fit-content',
                }}
              >
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 20 }}>Edit Schedule</h3>

                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: '#aaa', marginBottom: 8 }}>Workflow Name</label>
                  <input
                    type="text"
                    value={selectedSchedule.name}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 8,
                      color: '#fff',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>

                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <label style={{ fontSize: '0.75rem', color: '#aaa' }}>Cron Expression</label>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowCronHelper(!showCronHelper)}
                      style={{
                        padding: '4px 10px',
                        background: 'rgba(102, 126, 234, 0.1)',
                        border: '1px solid #667eea50',
                        borderRadius: 6,
                        color: '#667eea',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {showCronHelper ? 'Hide' : 'Show'} Presets
                    </motion.button>
                  </div>
                  <input
                    type="text"
                    value={selectedSchedule.cron}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 8,
                      color: '#f093fb',
                      fontSize: '0.9rem',
                      fontFamily: 'monospace',
                    }}
                  />
                </div>

                <AnimatePresence>
                  {showCronHelper && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      style={{ marginBottom: 20 }}
                    >
                      <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: 10 }}>Quick Presets</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {cronPresets.map((preset, i) => (
                          <motion.button
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ x: 4 }}
                            style={{
                              padding: '10px 14px',
                              background: 'rgba(255,255,255,0.03)',
                              border: '1px solid rgba(255,255,255,0.05)',
                              borderRadius: 8,
                              color: '#aaa',
                              fontSize: '0.8rem',
                              cursor: 'pointer',
                              textAlign: 'left',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 10,
                            }}
                          >
                            <span style={{ fontSize: '1rem' }}>{preset.icon}</span>
                            <span style={{ flex: 1 }}>{preset.label}</span>
                            <code style={{ fontSize: '0.75rem', color: '#666', fontFamily: 'monospace' }}>{preset.value}</code>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div style={{
                  padding: 16,
                  background: 'rgba(102, 126, 234, 0.1)',
                  borderRadius: 10,
                  marginBottom: 20,
                }}>
                  <div style={{ fontSize: '0.75rem', color: '#667eea', marginBottom: 6 }}>Next Execution</div>
                  <div style={{ fontSize: '1rem', fontWeight: 600 }}>{selectedSchedule.next}</div>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      border: 'none',
                      borderRadius: 8,
                      color: '#fff',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Save Changes
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      padding: '12px 20px',
                      background: selectedSchedule.enabled ? 'rgba(255, 107, 107, 0.15)' : 'rgba(67, 233, 123, 0.15)',
                      border: `1px solid ${selectedSchedule.enabled ? '#ff6b6b50' : '#43e97b50'}`,
                      borderRadius: 8,
                      color: selectedSchedule.enabled ? '#ff6b6b' : '#43e97b',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {selectedSchedule.enabled ? 'Pause' : 'Resume'}
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              marginTop: 30,
              padding: 20,
              background: 'rgba(20, 20, 35, 0.6)',
              borderRadius: 16,
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            {[
              { label: 'Total Schedules', value: schedules.length, color: '#667eea' },
              { label: 'Active', value: schedules.filter(s => s.enabled).length, color: '#43e97b' },
              { label: 'Total Runs', value: schedules.reduce((acc, s) => acc + s.runs, 0), color: '#f093fb' },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1, type: 'spring', stiffness: 300 }}
                  style={{ fontSize: '1.8rem', fontWeight: 700, color: stat.color, marginBottom: 4 }}
                >
                  {stat.value}
                </motion.div>
                <div style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}
