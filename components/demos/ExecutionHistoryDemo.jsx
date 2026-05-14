'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const executions = [
  { id: 1, workflow: 'Lead Capture', time: '2 mins ago', status: 'success', duration: '1.2s', steps: 5, stepsCompleted: 5 },
  { id: 2, workflow: 'Invoice Generation', time: '8 mins ago', status: 'success', duration: '2.8s', steps: 6, stepsCompleted: 6 },
  { id: 3, workflow: 'Customer Onboarding', time: '15 mins ago', status: 'failed', duration: '0.5s', steps: 8, stepsCompleted: 3, error: 'SMTP connection timeout' },
  { id: 4, workflow: 'Report Generation', time: '1 hour ago', status: 'success', duration: '4.2s', steps: 9, stepsCompleted: 9 },
  { id: 5, workflow: 'Lead Capture', time: '2 hours ago', status: 'success', duration: '1.1s', steps: 5, stepsCompleted: 5 },
  { id: 6, workflow: 'Ticket Routing', time: '3 hours ago', status: 'success', duration: '0.8s', steps: 4, stepsCompleted: 4 },
];

export default function ExecutionHistoryDemo() {
  const [selectedExecution, setSelectedExecution] = React.useState(null);
  const [filter, setFilter] = React.useState('all');

  const filteredExecutions = filter === 'all'
    ? executions
    : executions.filter(e => e.status === filter);

  const stats = {
    total: executions.length,
    success: executions.filter(e => e.status === 'success').length,
    failed: executions.filter(e => e.status === 'failed').length,
    avgDuration: (executions.reduce((acc, e) => acc + parseFloat(e.duration), 0) / executions.length).toFixed(2),
  };

  return (
    <>
      <h2 className="demo-title">Execution History</h2>
      <p className="demo-subtitle">Past workflow runs with logs. Track success, failures, and performance.</p>
      <div className="demo-area" style={{ padding: 40 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              marginBottom: 30,
              padding: 20,
              background: 'rgba(20, 20, 35, 0.6)',
              borderRadius: 16,
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            {[
              { label: 'Total Runs', value: stats.total, color: '#667eea' },
              { label: 'Success', value: stats.success, color: '#43e97b' },
              { label: 'Failed', value: stats.failed, color: '#ff6b6b' },
              { label: 'Avg Duration', value: `${stats.avgDuration}s`, color: '#fbbf24' },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 700, color: stat.color, marginBottom: 4 }}>{stat.value}</div>
                <div style={{ fontSize: '0.7rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Filter */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            {['all', 'success', 'failed'].map(f => (
              <motion.button
                key={f}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(f)}
                style={{
                  padding: '8px 16px',
                  background: filter === f ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${filter === f ? '#667eea' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 8,
                  color: '#fff',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                }}
              >
                {f}
              </motion.button>
            ))}
          </div>

          {/* Executions list */}
          <AnimatePresence mode="popLayout">
            {filteredExecutions.map((exec, i) => (
              <motion.div
                key={exec.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ x: 4 }}
                onClick={() => setSelectedExecution(selectedExecution?.id === exec.id ? null : exec)}
                style={{
                  marginBottom: 12,
                  padding: 20,
                  background: selectedExecution?.id === exec.id ? 'rgba(102, 126, 234, 0.1)' : 'rgba(20, 20, 35, 0.6)',
                  border: `1px solid ${selectedExecution?.id === exec.id ? '#667eea' : exec.status === 'failed' ? '#ff6b6b30' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: 12,
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  {/* Status indicator */}
                  <motion.div
                    animate={{
                      scale: exec.status === 'success' ? [1, 1.2, 1] : 1,
                      boxShadow: exec.status === 'success' ? [
                        '0 0 0 rgba(67, 233, 123, 0)',
                        '0 0 15px rgba(67, 233, 123, 0.5)',
                        '0 0 0 rgba(67, 233, 123, 0)'
                      ] : 'none',
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: exec.status === 'success' ? '#43e97b' : '#ff6b6b',
                      flexShrink: 0,
                    }}
                  />

                  {/* Workflow name */}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 4 }}>{exec.workflow}</div>
                    <div style={{ fontSize: '0.75rem', color: '#888' }}>{exec.time}</div>
                  </div>

                  {/* Progress */}
                  <div style={{ width: 120 }}>
                    <div style={{ fontSize: '0.7rem', color: '#888', marginBottom: 4 }}>
                      {exec.stepsCompleted}/{exec.steps} steps
                    </div>
                    <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 2, overflow: 'hidden' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(exec.stepsCompleted / exec.steps) * 100}%` }}
                        transition={{ duration: 0.5 }}
                        style={{
                          height: '100%',
                          background: exec.status === 'success' ? 'linear-gradient(90deg, #43e97b, #38b2ac)' : 'linear-gradient(90deg, #ff6b6b, #ee5a6f)',
                          borderRadius: 2,
                        }}
                      />
                    </div>
                  </div>

                  {/* Duration */}
                  <div style={{
                    padding: '6px 12px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: 6,
                    fontSize: '0.75rem',
                    color: '#aaa',
                    fontFamily: 'monospace',
                  }}>
                    {exec.duration}
                  </div>

                  {/* Status badge */}
                  <div style={{
                    padding: '6px 12px',
                    borderRadius: 6,
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    background: exec.status === 'success' ? 'rgba(67, 233, 123, 0.15)' : 'rgba(255, 107, 107, 0.15)',
                    color: exec.status === 'success' ? '#43e97b' : '#ff6b6b',
                  }}>
                    {exec.status}
                  </div>
                </div>

                {/* Error details */}
                <AnimatePresence>
                  {selectedExecution?.id === exec.id && exec.error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      style={{
                        marginTop: 16,
                        padding: 16,
                        background: 'rgba(255, 107, 107, 0.1)',
                        border: '1px solid rgba(255, 107, 107, 0.3)',
                        borderRadius: 8,
                      }}
                    >
                      <div style={{ fontSize: '0.7rem', color: '#ff6b6b', marginBottom: 6, textTransform: 'uppercase', fontWeight: 600 }}>Error</div>
                      <div style={{ fontSize: '0.85rem', color: '#fff', fontFamily: 'monospace' }}>{exec.error}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
