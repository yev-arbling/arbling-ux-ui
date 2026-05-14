'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const operators = [
  { id: 'eq', label: 'equals', symbol: '=' },
  { id: 'neq', label: 'not equals', symbol: '≠' },
  { id: 'gt', label: 'greater than', symbol: '>' },
  { id: 'lt', label: 'less than', symbol: '<' },
  { id: 'contains', label: 'contains', symbol: '⊃' },
];

export default function ConditionBuilderDemo() {
  const [conditions, setConditions] = React.useState([
    { id: 1, field: 'status', operator: 'eq', value: 'active', logic: 'and' },
    { id: 2, field: 'amount', operator: 'gt', value: '100', logic: 'or' },
  ]);

  const [showAddCondition, setShowAddCondition] = React.useState(false);

  const addCondition = () => {
    setConditions([...conditions, {
      id: Date.now(),
      field: '',
      operator: 'eq',
      value: '',
      logic: 'and'
    }]);
    setShowAddCondition(false);
  };

  const removeCondition = (id) => {
    setConditions(conditions.filter(c => c.id !== id));
  };

  return (
    <>
      <h2 className="demo-title">Condition Builder</h2>
      <p className="demo-subtitle">Visual branching logic builder. Create complex conditions with AND/OR operators.</p>
      <div className="demo-area" style={{ padding: 40 }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>

          {/* Conditions */}
          <AnimatePresence mode="popLayout">
            {conditions.map((condition, i) => (
              <motion.div
                key={condition.id}
                initial={{ opacity: 0, scale: 0.9, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -100 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                style={{ marginBottom: 16 }}
              >
                <div style={{
                  padding: 20,
                  background: 'rgba(20, 20, 35, 0.8)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 12,
                }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    {/* Field */}
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '0.7rem', color: '#888', marginBottom: 6, textTransform: 'uppercase' }}>Field</label>
                      <input
                        type="text"
                        value={condition.field}
                        onChange={(e) => setConditions(conditions.map(c => c.id === condition.id ? { ...c, field: e.target.value } : c))}
                        placeholder="e.g. status, amount"
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: 8,
                          color: '#fff',
                          fontSize: '0.9rem',
                        }}
                      />
                    </div>

                    {/* Operator */}
                    <div style={{ width: 140 }}>
                      <label style={{ display: 'block', fontSize: '0.7rem', color: '#888', marginBottom: 6, textTransform: 'uppercase' }}>Operator</label>
                      <select
                        value={condition.operator}
                        onChange={(e) => setConditions(conditions.map(c => c.id === condition.id ? { ...c, operator: e.target.value } : c))}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: 8,
                          color: '#fff',
                          fontSize: '0.9rem',
                        }}
                      >
                        {operators.map(op => (
                          <option key={op.id} value={op.id}>{op.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Value */}
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '0.7rem', color: '#888', marginBottom: 6, textTransform: 'uppercase' }}>Value</label>
                      <input
                        type="text"
                        value={condition.value}
                        onChange={(e) => setConditions(conditions.map(c => c.id === condition.id ? { ...c, value: e.target.value } : c))}
                        placeholder="e.g. active, 100"
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: 8,
                          color: '#fff',
                          fontSize: '0.9rem',
                        }}
                      />
                    </div>

                    {/* Remove */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeCondition(condition.id)}
                      style={{
                        marginTop: 20,
                        width: 36,
                        height: 36,
                        background: 'rgba(255, 107, 107, 0.1)',
                        border: '1px solid rgba(255, 107, 107, 0.3)',
                        borderRadius: 8,
                        color: '#ff6b6b',
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      ×
                    </motion.button>
                  </div>
                </div>

                {/* Logic connector */}
                {i < conditions.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      margin: '12px 0',
                    }}
                  >
                    <select
                      value={condition.logic}
                      onChange={(e) => setConditions(conditions.map(c => c.id === condition.id ? { ...c, logic: e.target.value } : c))}
                      style={{
                        padding: '6px 16px',
                        background: 'rgba(102, 126, 234, 0.15)',
                        border: '1px solid #667eea',
                        borderRadius: 20,
                        color: '#667eea',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                      }}
                    >
                      <option value="and">AND</option>
                      <option value="or">OR</option>
                    </select>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Add condition button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={addCondition}
            style={{
              width: '100%',
              padding: '16px',
              background: 'rgba(102, 126, 234, 0.1)',
              border: '2px dashed #667eea50',
              borderRadius: 12,
              color: '#667eea',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>+</span>
            Add Condition
          </motion.button>

          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              marginTop: 30,
              padding: 20,
              background: 'rgba(20, 20, 35, 0.6)',
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Preview</div>
            <code style={{ fontSize: '0.85rem', color: '#f093fb', fontFamily: 'monospace', lineHeight: 1.6 }}>
              {conditions.map((c, i) => (
                <React.Fragment key={c.id}>
                  <span style={{ color: '#43e97b' }}>{c.field}</span>
                  {' '}
                  <span style={{ color: '#fbbf24' }}>{operators.find(op => op.id === c.operator)?.symbol}</span>
                  {' '}
                  <span style={{ color: '#667eea' }}>"{c.value}"</span>
                  {i < conditions.length - 1 && (
                    <>
                      {' '}
                      <span style={{ color: '#f093fb' }}>{c.logic.toUpperCase()}</span>
                      {' '}
                    </>
                  )}
                </React.Fragment>
              ))}
            </code>
          </motion.div>
        </div>
      </div>
    </>
  );
}
