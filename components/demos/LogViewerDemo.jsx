'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const logs = [
  { id: 1, time: '10:45:22.145', level: 'info', message: 'Workflow execution started', context: 'workflow.start' },
  { id: 2, time: '10:45:22.234', level: 'debug', message: 'Fetching user data from API', context: 'api.request' },
  { id: 3, time: '10:45:22.456', level: 'info', message: 'User data retrieved successfully', context: 'api.response' },
  { id: 4, time: '10:45:22.567', level: 'debug', message: 'Validating email format', context: 'validation' },
  { id: 5, time: '10:45:22.678', level: 'warn', message: 'Rate limit approaching 80%', context: 'rate.limit' },
  { id: 6, time: '10:45:22.789', level: 'info', message: 'Sending email notification', context: 'email.send' },
  { id: 7, time: '10:45:23.012', level: 'error', message: 'SMTP connection timeout', context: 'email.error', stack: 'Error: Connection timeout\n  at SMTPConnection.connect\n  at EmailService.send' },
  { id: 8, time: '10:45:23.234', level: 'info', message: 'Retrying with backoff (attempt 1/3)', context: 'retry' },
  { id: 9, time: '10:45:28.456', level: 'info', message: 'Email sent successfully', context: 'email.success' },
  { id: 10, time: '10:45:28.567', level: 'info', message: 'Workflow execution completed', context: 'workflow.end' },
];

export default function LogViewerDemo() {
  const [filter, setFilter] = React.useState('all');
  const [search, setSearch] = React.useState('');
  const [autoScroll, setAutoScroll] = React.useState(true);
  const [selectedLog, setSelectedLog] = React.useState(null);

  const filtered = logs.filter(log => {
    const matchesFilter = filter === 'all' || log.level === filter;
    const matchesSearch = search === '' || log.message.toLowerCase().includes(search.toLowerCase()) || log.context.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getLevelConfig = (level) => {
    const configs = {
      info: { color: '#667eea', bg: 'rgba(102, 126, 234, 0.1)', label: 'INFO' },
      debug: { color: '#888', bg: 'rgba(255,255,255,0.03)', label: 'DEBUG' },
      warn: { color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.1)', label: 'WARN' },
      error: { color: '#ff6b6b', bg: 'rgba(255, 107, 107, 0.1)', label: 'ERROR' },
    };
    return configs[level];
  };

  return (
    <>
      <h2 className="demo-title">Log Viewer</h2>
      <p className="demo-subtitle">Detailed execution logs. Real-time log streaming with filtering and search.</p>
      <div className="demo-area" style={{ padding: 40 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* Controls */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search logs..."
              style={{
                flex: 1,
                minWidth: 200,
                padding: '10px 16px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
                color: '#fff',
                fontSize: '0.85rem',
              }}
            />

            {['all', 'info', 'debug', 'warn', 'error'].map((level) => (
              <motion.button
                key={level}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(level)}
                style={{
                  padding: '10px 16px',
                  background: filter === level ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${filter === level ? '#667eea' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 8,
                  color: '#fff',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                }}
              >
                {level}
              </motion.button>
            ))}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setAutoScroll(!autoScroll)}
              style={{
                padding: '10px 16px',
                background: autoScroll ? 'rgba(67, 233, 123, 0.15)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${autoScroll ? '#43e97b50' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: 8,
                color: autoScroll ? '#43e97b' : '#aaa',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {autoScroll ? '✓ Auto-scroll' : 'Auto-scroll'}
            </motion.button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: selectedLog ? '1fr 400px' : '1fr', gap: 20 }}>
            {/* Log stream */}
            <motion.div
              layout
              style={{
                background: 'rgba(0,0,0,0.4)',
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.1)',
                padding: 16,
                maxHeight: 600,
                overflowY: 'auto',
              }}
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((log, i) => {
                  const config = getLevelConfig(log.level);
                  return (
                    <motion.div
                      key={log.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: i * 0.01 }}
                      whileHover={{ x: 6, background: 'rgba(255,255,255,0.08)', borderLeftWidth: 4 }}
                      onClick={() => setSelectedLog(log)}
                      style={{
                        padding: '10px 12px',
                        marginBottom: 4,
                        background: selectedLog?.id === log.id ? config.bg : 'transparent',
                        borderLeft: `3px solid ${config.color}`,
                        borderRadius: 6,
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        fontFamily: 'monospace',
                        display: 'flex',
                        gap: 12,
                      }}
                    >
                      <span style={{ color: '#666', flexShrink: 0 }}>{log.time}</span>
                      <span style={{
                        padding: '2px 6px',
                        background: config.bg,
                        color: config.color,
                        borderRadius: 4,
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        flexShrink: 0,
                      }}>
                        {config.label}
                      </span>
                      <span style={{ color: '#aaa', flex: 1 }}>{log.message}</span>
                      <span style={{ color: '#666', fontSize: '0.7rem', flexShrink: 0 }}>{log.context}</span>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {filtered.length === 0 && (
                <div style={{ padding: 40, textAlign: 'center', color: '#666' }}>
                  No logs match your filters
                </div>
              )}
            </motion.div>

            {/* Log details */}
            <AnimatePresence>
              {selectedLog && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  style={{
                    padding: 20,
                    background: 'rgba(20, 20, 35, 0.8)',
                    borderRadius: 12,
                    border: '1px solid rgba(255,255,255,0.1)',
                    maxHeight: 600,
                    overflowY: 'auto',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 16 }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>Log Details</h4>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedLog(null)}
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.1)',
                        border: 'none',
                        color: '#aaa',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      ×
                    </motion.button>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: '0.7rem', color: '#888', marginBottom: 4 }}>Timestamp</div>
                    <div style={{ fontSize: '0.85rem', color: '#f093fb', fontFamily: 'monospace' }}>{selectedLog.time}</div>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: '0.7rem', color: '#888', marginBottom: 4 }}>Level</div>
                    <div style={{
                      display: 'inline-block',
                      padding: '4px 10px',
                      background: getLevelConfig(selectedLog.level).bg,
                      color: getLevelConfig(selectedLog.level).color,
                      borderRadius: 6,
                      fontSize: '0.75rem',
                      fontWeight: 600,
                    }}>
                      {getLevelConfig(selectedLog.level).label}
                    </div>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: '0.7rem', color: '#888', marginBottom: 4 }}>Context</div>
                    <div style={{ fontSize: '0.85rem', color: '#667eea', fontFamily: 'monospace' }}>{selectedLog.context}</div>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: '0.7rem', color: '#888', marginBottom: 4 }}>Message</div>
                    <div style={{ fontSize: '0.85rem', color: '#aaa' }}>{selectedLog.message}</div>
                  </div>

                  {selectedLog.stack && (
                    <div>
                      <div style={{ fontSize: '0.7rem', color: '#888', marginBottom: 4 }}>Stack Trace</div>
                      <pre style={{
                        padding: 12,
                        background: 'rgba(255, 107, 107, 0.1)',
                        border: '1px solid #ff6b6b30',
                        borderRadius: 8,
                        fontSize: '0.75rem',
                        color: '#ff6b6b',
                        fontFamily: 'monospace',
                        overflow: 'auto',
                        margin: 0,
                      }}>
                        {selectedLog.stack}
                      </pre>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              marginTop: 20,
              padding: 16,
              background: 'rgba(20, 20, 35, 0.6)',
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            {['info', 'debug', 'warn', 'error'].map((level) => {
              const count = logs.filter(l => l.level === level).length;
              const config = getLevelConfig(level);
              return (
                <div key={level} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 700, color: config.color, marginBottom: 2 }}>
                    {count}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {level}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </>
  );
}
