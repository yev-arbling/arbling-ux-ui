'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const connectionTypes = [
  { id: 'data', name: 'Data Flow', color: '#667eea', icon: '📊', desc: 'Pass data between nodes' },
  { id: 'trigger', name: 'Trigger', color: '#43e97b', icon: '⚡', desc: 'Execute on event' },
  { id: 'error', name: 'Error Handler', color: '#ff6b6b', icon: '⚠️', desc: 'Handle failures' },
  { id: 'condition', name: 'Conditional', color: '#fbbf24', icon: '🔀', desc: 'Branch on condition' },
];

const portModes = [
  { id: 'single', name: 'Single Connection', desc: 'One connection per port' },
  { id: 'multiple', name: 'Multiple Connections', desc: 'Many connections allowed' },
  { id: 'required', name: 'Required', desc: 'Must be connected' },
];

export default function NodeConnectionsDemo() {
  const [selectedType, setSelectedType] = React.useState('data');
  const [selectedMode, setSelectedMode] = React.useState('single');
  const [connections, setConnections] = React.useState([
    { id: 1, from: 'node-1', to: 'node-2', type: 'data', label: 'User Data', active: true },
    { id: 2, from: 'node-2', to: 'node-3', type: 'trigger', label: 'On Success', active: true },
    { id: 3, from: 'node-2', to: 'node-4', type: 'error', label: 'On Error', active: false },
  ]);
  const [hoveredConnection, setHoveredConnection] = React.useState(null);

  const getTypeColor = (type) => {
    return connectionTypes.find(t => t.id === type)?.color || '#888';
  };

  return (
    <>
      <h2 className="demo-title">Node Connections</h2>
      <p className="demo-subtitle">Connection management and port configuration. Define how nodes communicate.</p>
      <div className="demo-area" style={{ padding: 40 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 30 }}>
            {/* Control Panel */}
            <div>
              {/* Connection Types */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                style={{
                  padding: 20,
                  background: 'rgba(20, 20, 35, 0.8)',
                  borderRadius: 16,
                  border: '1px solid rgba(255,255,255,0.1)',
                  marginBottom: 20,
                }}
              >
                <div style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: 16 }}>Connection Types</div>
                {connectionTypes.map((type, i) => (
                  <motion.button
                    key={type.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ x: 4 }}
                    onClick={() => setSelectedType(type.id)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      marginBottom: 10,
                      background: selectedType === type.id ? `${type.color}20` : 'rgba(255,255,255,0.03)',
                      border: `2px solid ${selectedType === type.id ? type.color : 'rgba(255,255,255,0.08)'}`,
                      borderRadius: 10,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      textAlign: 'left',
                    }}
                  >
                    <div style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: `${type.color}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      flexShrink: 0,
                    }}>
                      {type.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: type.color, marginBottom: 2 }}>
                        {type.name}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#888' }}>{type.desc}</div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>

              {/* Port Modes */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                style={{
                  padding: 20,
                  background: 'rgba(20, 20, 35, 0.8)',
                  borderRadius: 16,
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: 16 }}>Port Modes</div>
                {portModes.map((mode, i) => (
                  <motion.button
                    key={mode.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    whileHover={{ x: 4 }}
                    onClick={() => setSelectedMode(mode.id)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      marginBottom: 8,
                      background: selectedMode === mode.id ? 'rgba(102, 126, 234, 0.15)' : 'transparent',
                      border: `1px solid ${selectedMode === mode.id ? '#667eea' : 'rgba(255,255,255,0.08)'}`,
                      borderRadius: 8,
                      color: selectedMode === mode.id ? '#667eea' : '#aaa',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <div style={{ marginBottom: 4 }}>{mode.name}</div>
                    <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>{mode.desc}</div>
                  </motion.button>
                ))}
              </motion.div>
            </div>

            {/* Connections List */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  padding: 20,
                  background: 'rgba(20, 20, 35, 0.8)',
                  borderRadius: 16,
                  border: '1px solid rgba(255,255,255,0.1)',
                  marginBottom: 20,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 4 }}>Active Connections</div>
                    <div style={{ fontSize: '0.75rem', color: '#888' }}>
                      {connections.filter(c => c.active).length} of {connections.length} connected
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '10px 16px',
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      border: 'none',
                      borderRadius: 10,
                      color: '#fff',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    + New Connection
                  </motion.button>
                </div>

                <AnimatePresence>
                  {connections.map((conn, i) => {
                    const color = getTypeColor(conn.type);
                    const isHovered = hoveredConnection === conn.id;

                    return (
                      <motion.div
                        key={conn.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ x: 6, scale: 1.01, boxShadow: `0 6px 30px ${color}30` }}
                        onMouseEnter={() => setHoveredConnection(conn.id)}
                        onMouseLeave={() => setHoveredConnection(null)}
                        style={{
                          padding: 16,
                          marginBottom: 12,
                          background: isHovered ? `${color}10` : 'rgba(255,255,255,0.03)',
                          border: `2px solid ${isHovered ? color : 'rgba(255,255,255,0.08)'}`,
                          borderRadius: 12,
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                      >
                        {/* Active indicator */}
                        <motion.div
                          animate={{
                            opacity: conn.active ? [0.5, 1, 0.5] : 0.3,
                            scale: conn.active ? [1, 1.2, 1] : 1,
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          style={{
                            position: 'absolute',
                            top: 16,
                            left: 16,
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: conn.active ? '#43e97b' : '#666',
                          }}
                        />

                        <div style={{ paddingLeft: 20 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                            <div style={{
                              padding: '6px 12px',
                              background: `${color}20`,
                              borderRadius: 6,
                              fontSize: '0.7rem',
                              color: color,
                              fontWeight: 600,
                              textTransform: 'uppercase',
                            }}>
                              {conn.type}
                            </div>
                            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{conn.label}</div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                            <div style={{
                              flex: 1,
                              padding: '8px 12px',
                              background: 'rgba(102, 126, 234, 0.1)',
                              border: '1px solid #667eea30',
                              borderRadius: 8,
                              fontSize: '0.75rem',
                              color: '#667eea',
                              fontFamily: 'monospace',
                            }}>
                              {conn.from}
                            </div>
                            <motion.div
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              style={{ fontSize: '1.2rem', color }}
                            >
                              →
                            </motion.div>
                            <div style={{
                              flex: 1,
                              padding: '8px 12px',
                              background: 'rgba(240, 147, 251, 0.1)',
                              border: '1px solid #f093fb30',
                              borderRadius: 8,
                              fontSize: '0.75rem',
                              color: '#f093fb',
                              fontFamily: 'monospace',
                            }}>
                              {conn.to}
                            </div>
                          </div>

                          <div style={{ display: 'flex', gap: 8 }}>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setConnections(prev => prev.map(c =>
                                  c.id === conn.id ? { ...c, active: !c.active } : c
                                ));
                              }}
                              style={{
                                flex: 1,
                                padding: '8px',
                                background: conn.active ? 'rgba(67, 233, 123, 0.15)' : 'rgba(255,255,255,0.05)',
                                border: `1px solid ${conn.active ? '#43e97b50' : 'rgba(255,255,255,0.1)'}`,
                                borderRadius: 6,
                                color: conn.active ? '#43e97b' : '#aaa',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                              }}
                            >
                              {conn.active ? '✓ Active' : 'Inactive'}
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              style={{
                                padding: '8px 12px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: 6,
                                color: '#aaa',
                                fontSize: '0.75rem',
                                cursor: 'pointer',
                              }}
                            >
                              Edit
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05, background: 'rgba(255, 107, 107, 0.15)' }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setConnections(prev => prev.filter(c => c.id !== conn.id));
                              }}
                              style={{
                                padding: '8px 12px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: 6,
                                color: '#ff6b6b',
                                fontSize: '0.75rem',
                                cursor: 'pointer',
                              }}
                            >
                              ×
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{
                  padding: 20,
                  background: 'rgba(20, 20, 35, 0.6)',
                  borderRadius: 16,
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 20,
                }}
              >
                {connectionTypes.map((type, i) => {
                  const count = connections.filter(c => c.type === type.id).length;
                  return (
                    <div key={type.id} style={{ textAlign: 'center' }}>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6 + i * 0.1, type: 'spring', stiffness: 300 }}
                        style={{
                          fontSize: '2rem',
                          marginBottom: 8,
                        }}
                      >
                        {type.icon}
                      </motion.div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 700, color: type.color, marginBottom: 4 }}>
                        {count}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#888', textTransform: 'uppercase' }}>
                        {type.name}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
