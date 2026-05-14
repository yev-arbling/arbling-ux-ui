'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const actionCategories = {
  'Communication': [
    { id: 'send-email', name: 'Send Email', desc: 'Send email via SMTP', icon: '✉️', color: '#667eea' },
    { id: 'send-sms', name: 'Send SMS', desc: 'Send text message', icon: '💬', color: '#f093fb' },
    { id: 'slack-message', name: 'Slack Message', desc: 'Post to Slack channel', icon: '💼', color: '#43e97b' },
  ],
  'Data': [
    { id: 'create-record', name: 'Create Record', desc: 'Insert database record', icon: '📝', color: '#fbbf24' },
    { id: 'update-record', name: 'Update Record', desc: 'Modify existing record', icon: '✏️', color: '#ff6b6b' },
    { id: 'delete-record', name: 'Delete Record', desc: 'Remove database record', icon: '🗑️', color: '#a78bfa' },
  ],
  'Integrations': [
    { id: 'http-request', name: 'HTTP Request', desc: 'Make API call', icon: '🌐', color: '#4facfe' },
    { id: 'webhook', name: 'Trigger Webhook', desc: 'Send webhook event', icon: '🔗', color: '#00f2fe' },
    { id: 'schedule-task', name: 'Schedule Task', desc: 'Delay execution', icon: '⏰', color: '#f093fb' },
  ],
};

export default function ActionLibraryDemo() {
  const [selectedCategory, setSelectedCategory] = React.useState('Communication');
  const [selectedAction, setSelectedAction] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredActions = actionCategories[selectedCategory].filter(action =>
    action.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    action.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <h2 className="demo-title">Action Library</h2>
      <p className="demo-subtitle">Browse and select workflow actions. Categorized library with search.</p>
      <div className="demo-area" style={{ padding: 40 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginBottom: 30 }}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search actions..."
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
              <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Categories</div>
              {Object.keys(actionCategories).map((category, i) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ x: 4 }}
                  onClick={() => {
                    setSelectedCategory(category);
                    setSelectedAction(null);
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
                  }}
                >
                  {category}
                  <span style={{ float: 'right', fontSize: '0.75rem', opacity: 0.6 }}>
                    {actionCategories[category].length}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Actions grid */}
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}
                >
                  {filteredActions.map((action, i) => (
                    <motion.div
                      key={action.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedAction(action)}
                      style={{
                        padding: 20,
                        background: selectedAction?.id === action.id ? `linear-gradient(135deg, ${action.color}20, ${action.color}10)` : 'rgba(20, 20, 35, 0.6)',
                        border: `2px solid ${selectedAction?.id === action.id ? action.color : 'rgba(255,255,255,0.08)'}`,
                        borderRadius: 16,
                        cursor: 'pointer',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      {selectedAction?.id === action.id && (
                        <motion.div
                          layoutId="selectedAction"
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: `linear-gradient(135deg, ${action.color}15, transparent)`,
                            borderRadius: 16,
                          }}
                        />
                      )}
                      <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ fontSize: '2rem', marginBottom: 10 }}>{action.icon}</div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 6 }}>{action.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#888' }}>{action.desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Action details */}
              <AnimatePresence>
                {selectedAction && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    style={{
                      marginTop: 20,
                      padding: 24,
                      background: 'rgba(20, 20, 35, 0.8)',
                      border: `1px solid ${selectedAction.color}50`,
                      borderRadius: 16,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                      <div style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: `linear-gradient(135deg, ${selectedAction.color}, ${selectedAction.color}80)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                      }}>
                        {selectedAction.icon}
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 4 }}>{selectedAction.name}</h3>
                        <p style={{ fontSize: '0.85rem', color: '#888', margin: 0 }}>{selectedAction.desc}</p>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        padding: '10px 24px',
                        background: `linear-gradient(135deg, ${selectedAction.color}, ${selectedAction.color}cc)`,
                        border: 'none',
                        borderRadius: 8,
                        color: '#fff',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Add to Workflow
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
