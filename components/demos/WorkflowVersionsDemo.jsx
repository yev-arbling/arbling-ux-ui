'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const versions = [
  { id: 'v1.3.0', date: '2024-01-20', author: 'Ali Abassi', changes: 5, status: 'production', desc: 'Added payment retry logic' },
  { id: 'v1.2.1', date: '2024-01-15', author: 'John Doe', changes: 2, status: 'archived', desc: 'Fixed email template bug' },
  { id: 'v1.2.0', date: '2024-01-10', author: 'Ali Abassi', changes: 8, status: 'archived', desc: 'New Slack integration' },
  { id: 'v1.1.0', date: '2024-01-05', author: 'Jane Smith', changes: 12, status: 'archived', desc: 'Major refactor of conditions' },
];

const changeLog = [
  { type: 'added', desc: 'Added retry mechanism for payment API', color: '#43e97b', icon: '+' },
  { type: 'modified', desc: 'Updated error handling logic', color: '#fbbf24', icon: '~' },
  { type: 'modified', desc: 'Improved condition evaluation', color: '#fbbf24', icon: '~' },
  { type: 'removed', desc: 'Removed deprecated webhook URL', color: '#ff6b6b', icon: '-' },
  { type: 'fixed', desc: 'Fixed race condition in async flow', color: '#667eea', icon: '✓' },
];

export default function WorkflowVersionsDemo() {
  const [selectedVersion, setSelectedVersion] = React.useState(versions[0]);
  const [showComparison, setShowComparison] = React.useState(false);

  return (
    <>
      <h2 className="demo-title">Workflow Versions</h2>
      <p className="demo-subtitle">Version control for workflows. Track changes, rollback, and compare versions.</p>
      <div className="demo-area" style={{ padding: 40 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: 30 }}>
            {/* Version list */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Versions</h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '6px 12px',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    border: 'none',
                    borderRadius: 8,
                    color: '#fff',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Save Version
                </motion.button>
              </div>

              {versions.map((version, i) => (
                <motion.div
                  key={version.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ x: 4 }}
                  onClick={() => setSelectedVersion(version)}
                  style={{
                    marginBottom: 12,
                    padding: 16,
                    background: selectedVersion.id === version.id ? 'rgba(102, 126, 234, 0.1)' : 'rgba(20, 20, 35, 0.6)',
                    border: `2px solid ${selectedVersion.id === version.id ? '#667eea' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: 12,
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                >
                  {version.status === 'production' && (
                    <motion.div
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        padding: '3px 8px',
                        background: 'linear-gradient(135deg, #43e97b, #38b2ac)',
                        borderRadius: 6,
                        fontSize: '0.65rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                      }}
                    >
                      LIVE
                    </motion.div>
                  )}

                  <div style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 6, fontFamily: 'monospace', color: '#f093fb' }}>
                    {version.id}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: 8 }}>
                    {version.date} • {version.author}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#aaa', marginBottom: 8 }}>
                    {version.desc}
                  </div>
                  <div style={{
                    display: 'inline-block',
                    padding: '3px 8px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: 6,
                    fontSize: '0.7rem',
                    color: '#666',
                  }}>
                    {version.changes} changes
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Version details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedVersion.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                style={{
                  padding: 24,
                  background: 'rgba(20, 20, 35, 0.8)',
                  borderRadius: 16,
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 24 }}>
                  <div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 8, fontFamily: 'monospace', color: '#f093fb' }}>
                      {selectedVersion.id}
                    </h3>
                    <div style={{ fontSize: '0.85rem', color: '#888' }}>
                      {selectedVersion.date} • by {selectedVersion.author}
                    </div>
                  </div>
                  {selectedVersion.status !== 'production' && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        padding: '10px 20px',
                        background: 'linear-gradient(135deg, #43e97b, #38b2ac)',
                        border: 'none',
                        borderRadius: 8,
                        color: '#fff',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Restore Version
                    </motion.button>
                  )}
                </div>

                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: 12 }}>Description</div>
                  <p style={{ fontSize: '0.85rem', color: '#aaa', lineHeight: 1.6, margin: 0 }}>
                    {selectedVersion.desc}
                  </p>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: 12 }}>Changes ({changeLog.length})</div>
                  {changeLog.map((change, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      style={{
                        display: 'flex',
                        gap: 12,
                        padding: '10px 12px',
                        marginBottom: 8,
                        background: 'rgba(255,255,255,0.03)',
                        borderLeft: `3px solid ${change.color}`,
                        borderRadius: 6,
                      }}
                    >
                      <div style={{
                        width: 20,
                        height: 20,
                        borderRadius: 6,
                        background: `${change.color}20`,
                        color: change.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        flexShrink: 0,
                      }}>
                        {change.icon}
                      </div>
                      <div>
                        <div style={{ fontSize: '0.7rem', color: change.color, textTransform: 'uppercase', fontWeight: 600, marginBottom: 2 }}>
                          {change.type}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#aaa' }}>
                          {change.desc}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowComparison(!showComparison)}
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: 'rgba(102, 126, 234, 0.1)',
                      border: '1px solid #667eea50',
                      borderRadius: 8,
                      color: '#667eea',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Compare with Previous
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      padding: '12px 20px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 8,
                      color: '#aaa',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Export
                  </motion.button>
                </div>

                <AnimatePresence>
                  {showComparison && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      style={{
                        marginTop: 20,
                        padding: 16,
                        background: 'rgba(0,0,0,0.3)',
                        borderRadius: 10,
                      }}
                    >
                      <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: 10 }}>Comparison with v1.2.1</div>
                      <div style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>
                        <div style={{ color: '#43e97b', marginBottom: 4 }}>+ 5 additions</div>
                        <div style={{ color: '#fbbf24', marginBottom: 4 }}>~ 3 modifications</div>
                        <div style={{ color: '#ff6b6b' }}>- 1 deletion</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Timeline */}
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
            }}
          >
            <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: 16 }}>Version Timeline</h4>
            <div style={{ display: 'flex', gap: 8, position: 'relative' }}>
              <div style={{
                position: 'absolute',
                top: 8,
                left: 8,
                right: 8,
                height: 2,
                background: 'rgba(102, 126, 234, 0.2)',
              }} />
              {versions.map((v, i) => (
                <motion.div
                  key={v.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1, type: 'spring', stiffness: 300 }}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    position: 'relative',
                  }}
                >
                  <div style={{
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: v.status === 'production' ? '#43e97b' : '#667eea',
                    margin: '0 auto 8px',
                    boxShadow: v.status === 'production' ? '0 0 15px #43e97b80' : 'none',
                  }} />
                  <div style={{ fontSize: '0.7rem', color: '#aaa' }}>{v.id}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
