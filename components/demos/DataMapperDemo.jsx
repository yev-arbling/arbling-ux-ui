'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sourceFields = [
  { id: 'user_email', label: 'user_email', type: 'string', value: 'john@example.com' },
  { id: 'first_name', label: 'first_name', type: 'string', value: 'John' },
  { id: 'last_name', label: 'last_name', type: 'string', value: 'Doe' },
  { id: 'order_total', label: 'order_total', type: 'number', value: '149.99' },
  { id: 'order_date', label: 'order_date', type: 'date', value: '2024-01-15' },
];

const targetFields = [
  { id: 'email', label: 'email', type: 'string', mapped: 'user_email' },
  { id: 'fullName', label: 'fullName', type: 'string', mapped: null, transform: 'concat(first_name, " ", last_name)' },
  { id: 'amount', label: 'amount', type: 'number', mapped: 'order_total' },
  { id: 'timestamp', label: 'timestamp', type: 'timestamp', mapped: 'order_date', transform: 'toTimestamp()' },
  { id: 'status', label: 'status', type: 'string', mapped: null },
];

export default function DataMapperDemo() {
  const [mappings, setMappings] = React.useState(
    targetFields.filter(f => f.mapped).map(f => ({ source: f.mapped, target: f.id }))
  );
  const [draggedField, setDraggedField] = React.useState(null);
  const [hoveredTarget, setHoveredTarget] = React.useState(null);

  const getMappedSource = (targetId) => {
    const mapping = mappings.find(m => m.target === targetId);
    return mapping ? sourceFields.find(f => f.id === mapping.source) : null;
  };

  return (
    <>
      <h2 className="demo-title">Data Mapper</h2>
      <p className="demo-subtitle">Visual data transformation. Map source fields to target schema with transformations.</p>
      <div className="demo-area" style={{ padding: 40 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 1fr', gap: 30 }}>
            {/* Source fields */}
            <div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', marginBottom: 4 }}>Source</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Incoming Data</h3>
              </div>

              {sourceFields.map((field, i) => (
                <motion.div
                  key={field.id}
                  draggable
                  onDragStart={() => setDraggedField(field)}
                  onDragEnd={() => setDraggedField(null)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  style={{
                    marginBottom: 12,
                    padding: 16,
                    background: 'rgba(20, 20, 35, 0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 12,
                    cursor: 'grab',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                    <div style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: '#667eea',
                      boxShadow: '0 0 10px #667eea80',
                    }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f093fb', fontFamily: 'monospace' }}>{field.label}</div>
                      <div style={{ fontSize: '0.7rem', color: '#666' }}>{field.type}</div>
                    </div>
                  </div>
                  <div style={{
                    padding: '8px 10px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: 6,
                    fontSize: '0.8rem',
                    color: '#aaa',
                    fontFamily: 'monospace',
                  }}>
                    {field.value}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Connection indicator - Enhanced */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 60 }}>
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  border: '3px dashed #667eea',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  background: 'radial-gradient(circle, rgba(102, 126, 234, 0.1), transparent)',
                  boxShadow: '0 0 20px rgba(102, 126, 234, 0.3)',
                }}
              >
                <motion.span
                  animate={{ x: [-2, 2, -2] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  →
                </motion.span>
              </motion.div>
              <motion.div
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ marginTop: 10, fontSize: '0.7rem', color: '#667eea', textAlign: 'center', fontWeight: 600 }}
              >
                {mappings.length} active {mappings.length === 1 ? 'mapping' : 'mappings'}
              </motion.div>
            </div>

            {/* Target fields */}
            <div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', marginBottom: 4 }}>Target</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Output Schema</h3>
              </div>

              {targetFields.map((field, i) => {
                const mappedSource = getMappedSource(field.id);
                const isHovered = hoveredTarget === field.id;

                return (
                  <motion.div
                    key={field.id}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setHoveredTarget(field.id);
                    }}
                    onDragLeave={() => setHoveredTarget(null)}
                    onDrop={() => {
                      if (draggedField) {
                        setMappings([...mappings.filter(m => m.target !== field.id), {
                          source: draggedField.id,
                          target: field.id
                        }]);
                      }
                      setHoveredTarget(null);
                    }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      scale: isHovered ? 1.02 : 1,
                      borderColor: isHovered ? '#667eea' : mappedSource ? '#43e97b50' : 'rgba(255,255,255,0.1)',
                    }}
                    transition={{ delay: i * 0.05 }}
                    style={{
                      marginBottom: 12,
                      padding: 16,
                      background: mappedSource ? 'rgba(67, 233, 123, 0.05)' : 'rgba(20, 20, 35, 0.8)',
                      border: '2px solid',
                      borderRadius: 12,
                      position: 'relative',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                      <div style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: mappedSource ? '#43e97b' : '#666',
                        boxShadow: mappedSource ? '0 0 10px #43e97b80' : 'none',
                      }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f093fb', fontFamily: 'monospace' }}>{field.label}</div>
                        <div style={{ fontSize: '0.7rem', color: '#666' }}>{field.type}</div>
                      </div>
                      {mappedSource && (
                        <motion.button
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setMappings(mappings.filter(m => m.target !== field.id))}
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            background: '#ff6b6b',
                            border: 'none',
                            color: '#fff',
                            fontSize: '0.7rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          ×
                        </motion.button>
                      )}
                    </div>

                    {mappedSource ? (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                          padding: '8px 10px',
                          background: 'rgba(102, 126, 234, 0.1)',
                          borderRadius: 6,
                          fontSize: '0.75rem',
                          color: '#667eea',
                          fontFamily: 'monospace',
                        }}
                      >
                        ← {mappedSource.label}
                        {field.transform && <div style={{ color: '#fbbf24', marginTop: 4 }}>{field.transform}</div>}
                      </motion.div>
                    ) : (
                      <div style={{
                        padding: '8px 10px',
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: 6,
                        fontSize: '0.75rem',
                        color: '#666',
                        fontStyle: 'italic',
                        textAlign: 'center',
                        border: '1px dashed rgba(255,255,255,0.05)',
                      }}>
                        Drop field here
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Preview output */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{
              marginTop: 30,
              padding: 20,
              background: 'rgba(20, 20, 35, 0.8)',
              borderRadius: 16,
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', marginBottom: 4 }}>Preview</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Transformed Output</h3>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '8px 16px',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  border: 'none',
                  borderRadius: 8,
                  color: '#fff',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Test Mapping
              </motion.button>
            </div>
            <pre style={{
              padding: 16,
              background: 'rgba(0,0,0,0.3)',
              borderRadius: 10,
              fontSize: '0.85rem',
              color: '#43e97b',
              fontFamily: 'monospace',
              overflow: 'auto',
              margin: 0,
            }}>
{`{
  "email": "john@example.com",
  "fullName": "John Doe",
  "amount": 149.99,
  "timestamp": 1705276800,
  "status": null
}`}
            </pre>
          </motion.div>
        </div>
      </div>
    </>
  );
}
