'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const templates = [
  {
    id: 'http-webhook',
    name: 'HTTP Webhook',
    category: 'Integration',
    icon: '🌐',
    color: '#667eea',
    desc: 'Receive HTTP requests and process data',
    nodes: 4,
    complexity: 'Simple',
    preview: [
      { x: 20, y: 30, w: 40, h: 20, color: '#667eea' },
      { x: 70, y: 20, w: 40, h: 20, color: '#f093fb' },
      { x: 70, y: 50, w: 40, h: 20, color: '#f093fb' },
      { x: 120, y: 35, w: 40, h: 20, color: '#43e97b' },
    ],
  },
  {
    id: 'email-automation',
    name: 'Email Automation',
    category: 'Communication',
    icon: '📧',
    color: '#43e97b',
    desc: 'Automated email workflows with conditions',
    nodes: 6,
    complexity: 'Medium',
    preview: [
      { x: 20, y: 35, w: 40, h: 20, color: '#667eea' },
      { x: 70, y: 35, w: 40, h: 20, color: '#f093fb' },
      { x: 120, y: 20, w: 35, h: 15, color: '#fbbf24' },
      { x: 120, y: 45, w: 35, h: 15, color: '#fbbf24' },
      { x: 165, y: 25, w: 35, h: 15, color: '#43e97b' },
      { x: 165, y: 50, w: 35, h: 15, color: '#43e97b' },
    ],
  },
  {
    id: 'data-sync',
    name: 'Database Sync',
    category: 'Data',
    icon: '🔄',
    color: '#f093fb',
    desc: 'Sync data between multiple databases',
    nodes: 5,
    complexity: 'Medium',
    preview: [
      { x: 20, y: 35, w: 40, h: 20, color: '#667eea' },
      { x: 70, y: 20, w: 40, h: 15, color: '#f093fb' },
      { x: 70, y: 45, w: 40, h: 15, color: '#f093fb' },
      { x: 120, y: 35, w: 40, h: 20, color: '#43e97b' },
      { x: 170, y: 35, w: 40, h: 20, color: '#43e97b' },
    ],
  },
  {
    id: 'slack-notifier',
    name: 'Slack Notifier',
    category: 'Communication',
    icon: '💬',
    color: '#fbbf24',
    desc: 'Send conditional Slack notifications',
    nodes: 3,
    complexity: 'Simple',
    preview: [
      { x: 30, y: 35, w: 50, h: 20, color: '#667eea' },
      { x: 90, y: 35, w: 50, h: 20, color: '#fbbf24' },
      { x: 150, y: 35, w: 50, h: 20, color: '#43e97b' },
    ],
  },
  {
    id: 'ml-pipeline',
    name: 'ML Pipeline',
    category: 'AI/ML',
    icon: '🤖',
    color: '#a78bfa',
    desc: 'Machine learning data processing pipeline',
    nodes: 8,
    complexity: 'Complex',
    preview: [
      { x: 10, y: 30, w: 30, h: 15, color: '#667eea' },
      { x: 50, y: 20, w: 30, h: 12, color: '#f093fb' },
      { x: 50, y: 38, w: 30, h: 12, color: '#f093fb' },
      { x: 50, y: 56, w: 30, h: 12, color: '#f093fb' },
      { x: 90, y: 25, w: 30, h: 12, color: '#a78bfa' },
      { x: 90, y: 43, w: 30, h: 12, color: '#a78bfa' },
      { x: 130, y: 30, w: 30, h: 12, color: '#fbbf24' },
      { x: 170, y: 35, w: 30, h: 15, color: '#43e97b' },
    ],
  },
  {
    id: 'error-recovery',
    name: 'Error Recovery',
    category: 'Monitoring',
    icon: '⚠️',
    color: '#ff6b6b',
    desc: 'Automated error detection and recovery',
    nodes: 7,
    complexity: 'Complex',
    preview: [
      { x: 20, y: 35, w: 35, h: 18, color: '#667eea' },
      { x: 65, y: 35, w: 35, h: 18, color: '#f093fb' },
      { x: 110, y: 20, w: 30, h: 15, color: '#fbbf24' },
      { x: 110, y: 45, w: 30, h: 15, color: '#fbbf24' },
      { x: 150, y: 15, w: 30, h: 12, color: '#43e97b' },
      { x: 150, y: 35, w: 30, h: 12, color: '#ff6b6b' },
      { x: 150, y: 55, w: 30, h: 12, color: '#a78bfa' },
    ],
  },
];

const categories = ['All', 'Integration', 'Communication', 'Data', 'AI/ML', 'Monitoring'];

export default function NodeTemplatesDemo() {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [hoveredTemplate, setHoveredTemplate] = React.useState(null);
  const [viewMode, setViewMode] = React.useState('grid'); // grid or list

  const filteredTemplates = templates.filter(t => {
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <h2 className="demo-title">Node Templates</h2>
      <p className="demo-subtitle">Pre-built workflow templates. Start with proven patterns and customize to your needs.</p>
      <div className="demo-area" style={{ padding: 40 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* Search & Controls */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: 'flex',
              gap: 12,
              marginBottom: 24,
            }}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search templates..."
              style={{
                flex: 1,
                padding: '14px 20px',
                background: 'rgba(20, 20, 35, 0.8)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 12,
                color: '#fff',
                fontSize: '0.95rem',
              }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              style={{
                padding: '14px 20px',
                background: 'rgba(20, 20, 35, 0.8)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 12,
                color: '#aaa',
                fontSize: '1.2rem',
                cursor: 'pointer',
              }}
            >
              {viewMode === 'grid' ? '☰' : '▦'}
            </motion.button>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            style={{
              display: 'flex',
              gap: 8,
              marginBottom: 30,
              flexWrap: 'wrap',
            }}
          >
            {categories.map((cat, i) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.03 }}
                whileHover={{ y: -2 }}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 16px',
                  background: selectedCategory === cat ? 'rgba(102, 126, 234, 0.2)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${selectedCategory === cat ? '#667eea' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 8,
                  color: selectedCategory === cat ? '#667eea' : '#aaa',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {cat}
                {cat !== 'All' && (
                  <span style={{ marginLeft: 6, opacity: 0.6 }}>
                    ({templates.filter(t => t.category === cat).length})
                  </span>
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* All Templates */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: 16 }}>
              {selectedCategory === 'All' ? 'All Templates' : selectedCategory}
              <span style={{ marginLeft: 8, color: '#666', fontSize: '0.8rem' }}>
                ({filteredTemplates.length})
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedCategory}-${viewMode}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                style={{
                  display: viewMode === 'grid' ? 'grid' : 'flex',
                  gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(280px, 1fr))' : undefined,
                  flexDirection: viewMode === 'list' ? 'column' : undefined,
                  gap: 16,
                }}
              >
                {filteredTemplates.map((template, i) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03 }}
                    whileHover={{ scale: viewMode === 'grid' ? 1.02 : 1.005, y: -2 }}
                    onMouseEnter={() => setHoveredTemplate(template.id)}
                    onMouseLeave={() => setHoveredTemplate(null)}
                    style={{
                      padding: 16,
                      background: hoveredTemplate === template.id
                        ? `linear-gradient(135deg, ${template.color}20, ${template.color}10)`
                        : 'rgba(20, 20, 35, 0.6)',
                      border: `1px solid ${hoveredTemplate === template.id ? template.color : 'rgba(255,255,255,0.08)'}`,
                      borderRadius: 12,
                      cursor: 'pointer',
                      display: viewMode === 'list' ? 'flex' : 'block',
                      alignItems: viewMode === 'list' ? 'center' : undefined,
                      gap: viewMode === 'list' ? 20 : undefined,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'start', gap: 12, marginBottom: viewMode === 'grid' ? 12 : 0, flex: viewMode === 'list' ? 1 : undefined }}>
                      <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: `${template.color}30`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.3rem',
                        flexShrink: 0,
                      }}>
                        {template.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 4 }}>
                          {template.name}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#888', marginBottom: 6 }}>{template.desc}</div>
                        <div style={{ fontSize: '0.65rem', color: '#666' }}>
                          <span style={{ marginRight: 10 }}>{template.nodes} nodes</span>
                          <span>{template.complexity}</span>
                        </div>
                      </div>
                    </div>

                    {viewMode === 'grid' && (
                      <div style={{
                        height: 70,
                        background: 'rgba(0,0,0,0.3)',
                        borderRadius: 8,
                        position: 'relative',
                        overflow: 'hidden',
                      }}>
                        <svg width="100%" height="100%" viewBox="0 0 220 80">
                          {template.preview.map((node, idx) => (
                            <motion.rect
                              key={idx}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: hoveredTemplate === template.id ? 1 : 0.6 }}
                              x={node.x}
                              y={node.y}
                              width={node.w}
                              height={node.h}
                              rx="3"
                              fill={node.color}
                            />
                          ))}
                        </svg>
                      </div>
                    )}

                    {viewMode === 'list' && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          padding: '10px 20px',
                          background: `${template.color}`,
                          border: 'none',
                          borderRadius: 8,
                          color: '#000',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        Use Template
                      </motion.button>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredTemplates.length === 0 && (
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
                <div style={{ fontSize: '0.9rem' }}>No templates found</div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
