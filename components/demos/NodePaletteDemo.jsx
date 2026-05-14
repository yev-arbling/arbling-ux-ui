'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const nodeCategories = {
  'Triggers': [
    { id: 'http', name: 'HTTP Request', icon: '🌐', desc: 'Trigger on HTTP webhook', color: '#667eea' },
    { id: 'schedule', name: 'Schedule', icon: '⏰', desc: 'Time-based trigger', color: '#667eea' },
    { id: 'email', name: 'Email Received', icon: '📧', desc: 'On email arrival', color: '#667eea' },
  ],
  'Transforms': [
    { id: 'json', name: 'Parse JSON', icon: '{}', desc: 'Parse JSON data', color: '#f093fb' },
    { id: 'filter', name: 'Filter', icon: '🔍', desc: 'Filter array items', color: '#f093fb' },
    { id: 'map', name: 'Map', icon: '🗺️', desc: 'Transform data', color: '#f093fb' },
    { id: 'aggregate', name: 'Aggregate', icon: '∑', desc: 'Combine values', color: '#f093fb' },
  ],
  'Logic': [
    { id: 'if', name: 'If/Else', icon: '🔀', desc: 'Conditional branch', color: '#fbbf24' },
    { id: 'switch', name: 'Switch', icon: '🎚️', desc: 'Multiple conditions', color: '#fbbf24' },
    { id: 'loop', name: 'Loop', icon: '🔄', desc: 'Iterate over items', color: '#fbbf24' },
  ],
  'Actions': [
    { id: 'email-send', name: 'Send Email', icon: '✉️', desc: 'Send email via SMTP', color: '#43e97b' },
    { id: 'http-post', name: 'HTTP POST', icon: '📤', desc: 'Make HTTP request', color: '#43e97b' },
    { id: 'db-insert', name: 'Database Insert', icon: '💾', desc: 'Insert to database', color: '#43e97b' },
    { id: 'slack', name: 'Slack Message', icon: '💬', desc: 'Send to Slack', color: '#43e97b' },
  ],
  'Utilities': [
    { id: 'delay', name: 'Delay', icon: '⏱️', desc: 'Wait for duration', color: '#a78bfa' },
    { id: 'logger', name: 'Logger', icon: '📝', desc: 'Log to console', color: '#a78bfa' },
    { id: 'error', name: 'Error Handler', icon: '⚠️', desc: 'Catch errors', color: '#a78bfa' },
  ],
};

export default function NodePaletteDemo() {
  const [selectedCategory, setSelectedCategory] = React.useState('Triggers');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [draggedNode, setDraggedNode] = React.useState(null);

  const filteredNodes = searchQuery
    ? Object.values(nodeCategories).flat().filter(node =>
        node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.desc.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : nodeCategories[selectedCategory];

  return (
    <>
      <h2 className="demo-title">Node Palette</h2>
      <p className="demo-subtitle">Available node types library. Drag nodes onto canvas to build workflows.</p>
      <div className="demo-area" style={{ padding: 40 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginBottom: 24 }}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search nodes..."
              style={{
                width: '100%',
                padding: '14px 20px',
                background: 'rgba(20, 20, 35, 0.8)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 12,
                color: '#fff',
                fontSize: '0.95rem',
              }}
            />
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 30 }}>
            {/* Categories */}
            <div>
              <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Categories
              </div>
              {Object.keys(nodeCategories).map((category, i) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ x: 4 }}
                  onClick={() => {
                    setSelectedCategory(category);
                    setSearchQuery('');
                  }}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    marginBottom: 8,
                    background: selectedCategory === category ? 'rgba(102, 126, 234, 0.15)' : 'transparent',
                    border: `1px solid ${selectedCategory === category ? '#667eea' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: 10,
                    color: selectedCategory === category ? '#667eea' : '#aaa',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  {category}
                  <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>
                    {nodeCategories[category].length}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Node grid */}
            <div>
              {searchQuery && (
                <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: 16 }}>
                  Found {filteredNodes.length} nodes
                </div>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={searchQuery || selectedCategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}
                >
                  {filteredNodes.map((node, i) => (
                    <motion.div
                      key={node.id}
                      draggable
                      onDragStart={() => setDraggedNode(node)}
                      onDragEnd={() => setDraggedNode(null)}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.03 }}
                      whileHover={{ scale: 1.05, y: -6, boxShadow: `0 15px 40px ${node.color}40`, borderColor: node.color }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        padding: 16,
                        background: `linear-gradient(135deg, ${node.color}15, ${node.color}05)`,
                        border: `2px solid ${node.color}30`,
                        borderRadius: 14,
                        cursor: 'grab',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      {/* Drag indicator with enhanced glow */}
                      <motion.div
                        animate={{
                          opacity: draggedNode?.id === node.id ? [0.6, 1, 0.6] : 0,
                          scale: draggedNode?.id === node.id ? [1, 1.3, 1] : 1,
                        }}
                        transition={{ duration: 0.8, repeat: draggedNode?.id === node.id ? Infinity : 0 }}
                        style={{
                          position: 'absolute',
                          inset: -6,
                          borderRadius: 14,
                          background: `radial-gradient(circle at center, ${node.color}40, transparent 70%)`,
                          pointerEvents: 'none',
                          filter: 'blur(8px)',
                        }}
                      />

                      <div style={{ display: 'flex', alignItems: 'start', gap: 12, marginBottom: 10 }}>
                        <motion.div
                          animate={{ rotate: draggedNode?.id === node.id ? 360 : 0 }}
                          transition={{ duration: 0.6 }}
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius: 10,
                            background: `${node.color}25`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.4rem',
                            flexShrink: 0,
                          }}
                        >
                          {node.icon}
                        </motion.div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 4 }}>{node.name}</div>
                          <div style={{ fontSize: '0.75rem', color: '#888', lineHeight: 1.4 }}>{node.desc}</div>
                        </div>
                      </div>

                      {/* Action hint */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        style={{
                          marginTop: 8,
                          padding: '6px 10px',
                          background: 'rgba(255,255,255,0.05)',
                          borderRadius: 6,
                          fontSize: '0.7rem',
                          color: '#666',
                          textAlign: 'center',
                        }}
                      >
                        Drag to canvas
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {filteredNodes.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    padding: 60,
                    textAlign: 'center',
                    color: '#666',
                  }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: 12 }}>🔍</div>
                  <div style={{ fontSize: '0.9rem' }}>No nodes found</div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
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
            {Object.entries(nodeCategories).map(([category, nodes], i) => (
              <div key={category} style={{ textAlign: 'center' }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.08, type: 'spring', stiffness: 300 }}
                  style={{ fontSize: '1.6rem', fontWeight: 700, color: '#667eea', marginBottom: 4 }}
                >
                  {nodes.length}
                </motion.div>
                <div style={{ fontSize: '0.7rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {category}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}
