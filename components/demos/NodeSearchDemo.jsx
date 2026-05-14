'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const allNodes = [
  { id: 1, x: 120, y: 100, label: 'HTTP Request', type: 'trigger', tags: ['webhook', 'api', 'http'], connections: 2 },
  { id: 2, x: 320, y: 80, label: 'Parse JSON', type: 'transform', tags: ['json', 'parse', 'data'], connections: 3 },
  { id: 3, x: 520, y: 100, label: 'Validate Schema', type: 'transform', tags: ['validation', 'schema'], connections: 1 },
  { id: 4, x: 720, y: 80, label: 'Send Email', type: 'action', tags: ['email', 'notification'], connections: 0 },
  { id: 5, x: 120, y: 220, label: 'Schedule Trigger', type: 'trigger', tags: ['cron', 'schedule', 'time'], connections: 1 },
  { id: 6, x: 320, y: 200, label: 'Filter Array', type: 'transform', tags: ['array', 'filter', 'data'], connections: 2 },
  { id: 7, x: 520, y: 220, label: 'Map Transform', type: 'transform', tags: ['map', 'transform'], connections: 1 },
  { id: 8, x: 720, y: 200, label: 'Database Insert', type: 'action', tags: ['database', 'sql', 'insert'], connections: 0 },
  { id: 9, x: 120, y: 340, label: 'WebSocket Event', type: 'trigger', tags: ['websocket', 'realtime'], connections: 1 },
  { id: 10, x: 320, y: 320, label: 'If/Else Branch', type: 'condition', tags: ['condition', 'branch', 'logic'], connections: 2 },
  { id: 11, x: 520, y: 300, label: 'Aggregate Data', type: 'transform', tags: ['aggregate', 'reduce', 'data'], connections: 1 },
  { id: 12, x: 520, y: 360, label: 'Error Logger', type: 'action', tags: ['error', 'logging', 'debug'], connections: 0 },
  { id: 13, x: 720, y: 320, label: 'Slack Notify', type: 'action', tags: ['slack', 'notification', 'message'], connections: 0 },
];

const filterOptions = [
  { id: 'all', name: 'All Types', icon: '🔍' },
  { id: 'trigger', name: 'Triggers', icon: '⚡' },
  { id: 'transform', name: 'Transforms', icon: '⚙️' },
  { id: 'condition', name: 'Conditions', icon: '🔀' },
  { id: 'action', name: 'Actions', icon: '▶️' },
];

export default function NodeSearchDemo() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedType, setSelectedType] = React.useState('all');
  const [highlightedNodes, setHighlightedNodes] = React.useState([]);
  const [selectedNode, setSelectedNode] = React.useState(null);
  const [sortBy, setSortBy] = React.useState('name'); // name, type, connections

  const getNodeColor = (type) => {
    const colors = {
      trigger: '#667eea',
      transform: '#f093fb',
      condition: '#fbbf24',
      action: '#43e97b',
    };
    return colors[type] || '#888';
  };

  const filteredNodes = allNodes.filter(node => {
    const matchesType = selectedType === 'all' || node.type === selectedType;
    const matchesSearch = searchQuery === '' ||
      node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const sortedNodes = [...filteredNodes].sort((a, b) => {
    if (sortBy === 'name') return a.label.localeCompare(b.label);
    if (sortBy === 'type') return a.type.localeCompare(b.type);
    if (sortBy === 'connections') return b.connections - a.connections;
    return 0;
  });

  React.useEffect(() => {
    setHighlightedNodes(filteredNodes.map(n => n.id));
  }, [searchQuery, selectedType]);

  return (
    <>
      <h2 className="demo-title">Node Search</h2>
      <p className="demo-subtitle">Find nodes on canvas with powerful filters. Search by name, type, or tags.</p>
      <div className="demo-area" style={{ padding: 40 }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>

          <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: 30 }}>
            {/* Search Panel */}
            <div>
              {/* Search Input */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginBottom: 20 }}
              >
                <div style={{ position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    left: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '1.2rem',
                    color: '#888',
                  }}>
                    🔍
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search nodes or tags..."
                    style={{
                      width: '100%',
                      padding: '14px 20px 14px 48px',
                      background: 'rgba(20, 20, 35, 0.8)',
                      border: '2px solid rgba(102, 126, 234, 0.3)',
                      borderRadius: 12,
                      color: '#fff',
                      fontSize: '0.95rem',
                    }}
                  />
                  {searchQuery && (
                    <motion.button
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      onClick={() => setSearchQuery('')}
                      style={{
                        position: 'absolute',
                        right: 12,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.1)',
                        border: 'none',
                        color: '#aaa',
                        cursor: 'pointer',
                        fontSize: '1rem',
                      }}
                    >
                      ×
                    </motion.button>
                  )}
                </div>
              </motion.div>

              {/* Type Filters */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                style={{
                  padding: 20,
                  background: 'rgba(20, 20, 35, 0.8)',
                  borderRadius: 16,
                  border: '1px solid rgba(255,255,255,0.1)',
                  marginBottom: 20,
                }}
              >
                <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 14 }}>Filter by Type</div>
                {filterOptions.map((filter, i) => {
                  const count = filter.id === 'all'
                    ? allNodes.length
                    : allNodes.filter(n => n.type === filter.id).length;

                  return (
                    <motion.button
                      key={filter.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.04 }}
                      whileHover={{ x: 4 }}
                      onClick={() => setSelectedType(filter.id)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        marginBottom: 8,
                        background: selectedType === filter.id ? 'rgba(102, 126, 234, 0.2)' : 'transparent',
                        border: `1px solid ${selectedType === filter.id ? '#667eea' : 'rgba(255,255,255,0.08)'}`,
                        borderRadius: 8,
                        color: selectedType === filter.id ? '#667eea' : '#aaa',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        textAlign: 'left',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span>
                        <span style={{ marginRight: 8, fontSize: '1rem' }}>{filter.icon}</span>
                        {filter.name}
                      </span>
                      <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>
                        {count}
                      </span>
                    </motion.button>
                  );
                })}
              </motion.div>

              {/* Sort Options */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                style={{
                  padding: 20,
                  background: 'rgba(20, 20, 35, 0.8)',
                  borderRadius: 16,
                  border: '1px solid rgba(255,255,255,0.1)',
                  marginBottom: 20,
                }}
              >
                <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 14 }}>Sort Results</div>
                {[
                  { id: 'name', label: 'Name', icon: '🔤' },
                  { id: 'type', label: 'Type', icon: '🏷️' },
                  { id: 'connections', label: 'Connections', icon: '🔗' },
                ].map((sort, i) => (
                  <motion.button
                    key={sort.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + i * 0.04 }}
                    whileHover={{ x: 4 }}
                    onClick={() => setSortBy(sort.id)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      marginBottom: 6,
                      background: sortBy === sort.id ? 'rgba(102, 126, 234, 0.15)' : 'transparent',
                      border: `1px solid ${sortBy === sort.id ? '#667eea' : 'rgba(255,255,255,0.05)'}`,
                      borderRadius: 6,
                      color: sortBy === sort.id ? '#667eea' : '#888',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <span style={{ marginRight: 8 }}>{sort.icon}</span>
                    {sort.label}
                  </motion.button>
                ))}
              </motion.div>

              {/* Results Count */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                  padding: 16,
                  background: 'rgba(102, 126, 234, 0.1)',
                  border: '1px solid #667eea30',
                  borderRadius: 12,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#667eea', marginBottom: 4 }}>
                  {sortedNodes.length}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#888' }}>
                  nodes found
                </div>
              </motion.div>
            </div>

            {/* Canvas & Results */}
            <div>
              {/* Canvas */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  height: 450,
                  background: 'rgba(10, 10, 20, 0.5)',
                  borderRadius: 16,
                  position: 'relative',
                  overflow: 'hidden',
                  marginBottom: 20,
                }}
              >
                {/* Grid */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'linear-gradient(rgba(102, 126, 234, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(102, 126, 234, 0.03) 1px, transparent 1px)',
                  backgroundSize: '30px 30px',
                }} />

                {/* Nodes */}
                <AnimatePresence>
                  {allNodes.map((node, i) => {
                    const color = getNodeColor(node.type);
                    const isHighlighted = highlightedNodes.includes(node.id);
                    const isSelected = selectedNode?.id === node.id;

                    return (
                      <motion.div
                        key={node.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale: isHighlighted ? 1 : 0.7,
                          opacity: isHighlighted ? 1 : 0.15,
                          filter: isHighlighted ? 'none' : 'grayscale(100%) blur(1px)',
                          boxShadow: isHighlighted && isSelected ? `0 0 25px ${color}50` : 'none',
                        }}
                        transition={{ delay: i * 0.02 }}
                        whileHover={{ scale: isHighlighted ? 1.05 : 0.7, y: isHighlighted ? -2 : 0 }}
                        onClick={() => isHighlighted && setSelectedNode(node)}
                        style={{
                          position: 'absolute',
                          left: node.x,
                          top: node.y,
                          width: 140,
                          padding: 10,
                          background: isSelected
                            ? `linear-gradient(135deg, ${color}50, ${color}30)`
                            : 'rgba(20, 20, 35, 0.95)',
                          border: `2px solid ${isSelected ? color : isHighlighted ? color + '60' : 'rgba(255,255,255,0.1)'}`,
                          borderRadius: 10,
                          cursor: isHighlighted ? 'pointer' : 'default',
                          zIndex: isSelected ? 20 : 10,
                          backdropFilter: 'blur(10px)',
                          boxShadow: isSelected ? `0 4px 20px ${color}50` : 'none',
                        }}
                      >
                        <div style={{
                          fontSize: '0.6rem',
                          color: color,
                          textTransform: 'uppercase',
                          fontWeight: 600,
                          marginBottom: 4,
                        }}>
                          {node.type}
                        </div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: 4 }}>
                          {node.label}
                        </div>
                        <div style={{ fontSize: '0.65rem', color: '#666' }}>
                          {node.connections} connections
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>

              {/* Results List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{
                  padding: 20,
                  background: 'rgba(20, 20, 35, 0.8)',
                  borderRadius: 16,
                  border: '1px solid rgba(255,255,255,0.1)',
                  maxHeight: 300,
                  overflowY: 'auto',
                }}
              >
                <div style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: 16 }}>
                  Search Results
                  {sortBy !== 'name' && (
                    <span style={{ marginLeft: 8, fontSize: '0.7rem', color: '#888' }}>
                      (sorted by {sortBy})
                    </span>
                  )}
                </div>

                <AnimatePresence mode="popLayout">
                  {sortedNodes.map((node, i) => {
                    const color = getNodeColor(node.type);
                    const isSelected = selectedNode?.id === node.id;

                    return (
                      <motion.div
                        key={node.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: i * 0.03 }}
                        whileHover={{ x: 4 }}
                        onClick={() => setSelectedNode(node)}
                        style={{
                          padding: 12,
                          marginBottom: 10,
                          background: isSelected ? `${color}20` : 'rgba(255,255,255,0.03)',
                          border: `1px solid ${isSelected ? color : 'rgba(255,255,255,0.08)'}`,
                          borderRadius: 10,
                          cursor: 'pointer',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: color,
                            flexShrink: 0,
                          }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 4 }}>
                              {node.label}
                            </div>
                            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                              {node.tags.slice(0, 3).map(tag => (
                                <span
                                  key={tag}
                                  style={{
                                    padding: '2px 6px',
                                    background: 'rgba(255,255,255,0.05)',
                                    borderRadius: 4,
                                    fontSize: '0.65rem',
                                    color: '#888',
                                  }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div style={{ fontSize: '0.7rem', color: '#666' }}>
                            {node.connections} →
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {sortedNodes.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      padding: 40,
                      textAlign: 'center',
                      color: '#666',
                    }}
                  >
                    <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🔍</div>
                    <div style={{ fontSize: '0.9rem' }}>No nodes found</div>
                    <div style={{ fontSize: '0.75rem', marginTop: 6 }}>Try a different search or filter</div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
