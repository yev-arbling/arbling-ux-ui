'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function DatabaseViewDemo() {
  const [selectedTable, setSelectedTable] = React.useState('users');
  const [query, setQuery] = React.useState('SELECT * FROM users LIMIT 10;');
  const [queryResult, setQueryResult] = React.useState(null);
  const [viewMode, setViewMode] = React.useState('table');
  const [isExecuting, setIsExecuting] = React.useState(false);
  const [queryHistory, setQueryHistory] = React.useState([]);
  const [hoveredRow, setHoveredRow] = React.useState(null);

  const tables = {
    users: { icon: '👤', columns: ['id', 'name', 'email', 'role', 'status', 'created_at'], data: [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', created_at: '2024-01-15' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', created_at: '2024-01-18' },
      { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'Editor', status: 'inactive', created_at: '2024-02-01' },
      { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'active', created_at: '2024-02-12' },
    ], stats: { rows: 1524, size: '2.4 MB', indexes: 3 } },
    orders: { icon: '📦', columns: ['id', 'user_id', 'product', 'amount', 'status', 'created_at'], data: [
      { id: 1, user_id: 1, product: 'Premium Plan', amount: '$99.99', status: 'completed', created_at: '2024-02-10' },
      { id: 2, user_id: 2, product: 'Basic Plan', amount: '$29.99', status: 'pending', created_at: '2024-02-11' },
      { id: 3, user_id: 1, product: 'Add-on Pack', amount: '$19.99', status: 'completed', created_at: '2024-02-12' },
    ], stats: { rows: 8532, size: '15.8 MB', indexes: 5 } },
    products: { icon: '🛍️', columns: ['id', 'name', 'price', 'category', 'stock'], data: [
      { id: 1, name: 'Premium Plan', price: '$99.99', category: 'Subscription', stock: '∞' },
      { id: 2, name: 'Basic Plan', price: '$29.99', category: 'Subscription', stock: '∞' },
      { id: 3, name: 'Add-on Pack', price: '$19.99', category: 'Add-on', stock: 450 },
    ], stats: { rows: 156, size: '0.8 MB', indexes: 2 } },
  };

  const executeQuery = async () => {
    setIsExecuting(true);
    await new Promise(r => setTimeout(r, 800 + Math.random() * 500));
    const table = tables[selectedTable];
    const result = { columns: table.columns, rows: table.data, executionTime: Math.round(Math.random() * 80 + 12), rowsAffected: table.data.length };
    setQueryResult(result);
    setQueryHistory(prev => [...prev.slice(-4), { query, time: result.executionTime, rows: result.rowsAffected }]);
    setIsExecuting(false);
  };

  const getStatusColor = (status) => ({
    active: { bg: 'rgba(67, 233, 123, 0.15)', color: '#43e97b' },
    inactive: { bg: 'rgba(255, 107, 107, 0.15)', color: '#ff6b6b' },
    pending: { bg: 'rgba(255, 193, 7, 0.15)', color: '#ffc107' },
    completed: { bg: 'rgba(102, 126, 234, 0.15)', color: '#667eea' },
  }[status] || { bg: 'rgba(136, 136, 136, 0.15)', color: '#888' });

  const currentTable = tables[selectedTable];

  return (
    <>
      <h2 className="demo-title">Database View</h2>
      <p className="demo-subtitle">Interactive database table viewer with sorting, filtering, and CRUD operations.</p>
      <div className="demo-area" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, position: 'relative' }}>
      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: '15%', left: '35%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        style={{ width: '100%', maxWidth: 1400, display: 'grid', gridTemplateColumns: '280px 1fr', gap: 25, position: 'relative', zIndex: 1 }}>
        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Database info */}
          <div style={{ padding: 25, borderRadius: 20, background: 'rgba(20, 20, 35, 0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #667eea, #764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>🗄️</div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>Database</h3>
                <span style={{ fontSize: '0.8rem', color: '#888' }}>PostgreSQL 15</span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[{ label: 'Tables', value: Object.keys(tables).length }, { label: 'Size', value: '19 MB' }].map(stat => (
                <div key={stat.label} style={{ padding: 12, borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.04)', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#667eea' }}>{stat.value}</div>
                  <div style={{ fontSize: '0.7rem', color: '#888', marginTop: 2 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tables list */}
          <div style={{ padding: 25, borderRadius: 20, background: 'rgba(20, 20, 35, 0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#888', marginBottom: 15, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tables</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {Object.entries(tables).map(([tableName, table]) => (
                <motion.button key={tableName} onClick={() => { setSelectedTable(tableName); setQuery(`SELECT * FROM ${tableName} LIMIT 10;`); setQueryResult(null); }}
                  style={{ width: '100%', padding: '14px 16px', borderRadius: 12, background: selectedTable === tableName ? 'rgba(102, 126, 234, 0.15)' : 'rgba(255,255,255,0.02)', border: selectedTable === tableName ? '1px solid rgba(102, 126, 234, 0.4)' : '1px solid rgba(255,255,255,0.04)', color: '#fff', fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textAlign: 'left' }}
                  whileHover={{ x: 4, borderColor: 'rgba(102, 126, 234, 0.3)' }} whileTap={{ scale: 0.98 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: '1.1rem' }}>{table.icon}</span>
                    <span style={{ textTransform: 'capitalize' }}>{tableName}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: '0.7rem', color: '#888', padding: '3px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: 6 }}>{table.stats.rows}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Query history */}
          {queryHistory.length > 0 && (
            <div style={{ padding: 20, borderRadius: 20, background: 'rgba(20, 20, 35, 0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#888', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>History</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {queryHistory.slice(-3).reverse().map((h, i) => (
                  <div key={i} style={{ padding: 10, borderRadius: 8, background: 'rgba(255,255,255,0.02)', fontSize: '0.75rem' }}>
                    <div style={{ color: '#888', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{h.query}</div>
                    <div style={{ display: 'flex', gap: 12, marginTop: 6, color: '#666' }}>
                      <span>⏱️ {h.time}ms</span>
                      <span>📊 {h.rows} rows</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Query editor */}
          <div style={{ padding: 25, borderRadius: 20, background: 'rgba(20, 20, 35, 0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: '1.2rem' }}>📝</span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>SQL Editor</h3>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {[{ mode: 'table', icon: '📊', label: 'Table' }, { mode: 'json', icon: '📄', label: 'JSON' }].map((v) => (
                  <motion.button key={v.mode} onClick={() => setViewMode(v.mode)}
                    style={{ padding: '10px 16px', borderRadius: 10, background: viewMode === v.mode ? 'rgba(102, 126, 234, 0.2)' : 'rgba(255,255,255,0.03)', border: viewMode === v.mode ? '1px solid rgba(102, 126, 234, 0.4)' : '1px solid rgba(255,255,255,0.06)', color: viewMode === v.mode ? '#667eea' : '#888', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                    whileHover={{ background: 'rgba(102, 126, 234, 0.1)' }} whileTap={{ scale: 0.97 }}>
                    {v.icon} {v.label}
                  </motion.button>
                ))}
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, padding: '8px 12px', background: 'rgba(0,0,0,0.2)', borderRadius: '10px 10px 0 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ fontSize: '0.75rem', color: '#888' }}>Query</span>
                <span style={{ fontSize: '0.7rem', color: '#667eea', padding: '2px 8px', background: 'rgba(102, 126, 234, 0.15)', borderRadius: 4 }}>SQL</span>
              </div>
              <textarea value={query} onChange={(e) => setQuery(e.target.value)}
                style={{ width: '100%', minHeight: 100, padding: 16, paddingBottom: 50, borderRadius: '0 0 14px 14px', background: 'rgba(0, 0, 0, 0.3)', border: '1px solid rgba(255,255,255,0.06)', borderTop: 'none', color: '#e5e7eb', fontSize: '0.95rem', fontFamily: "'Fira Code', monospace", outline: 'none', resize: 'vertical', lineHeight: 1.6 }} />
              <div style={{ position: 'absolute', bottom: 12, right: 12, display: 'flex', gap: 10 }}>
                <motion.button onClick={executeQuery} disabled={isExecuting}
                  style={{ padding: '12px 24px', borderRadius: 10, background: isExecuting ? 'rgba(102, 126, 234, 0.3)' : 'linear-gradient(135deg, #667eea, #764ba2)', border: 'none', color: '#fff', fontSize: '0.9rem', fontWeight: 700, cursor: isExecuting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: isExecuting ? 'none' : '0 8px 30px rgba(102, 126, 234, 0.3)' }}
                  whileHover={!isExecuting ? { scale: 1.03, boxShadow: '0 12px 40px rgba(102, 126, 234, 0.4)' } : {}} whileTap={!isExecuting ? { scale: 0.97 } : {}}>
                  {isExecuting ? (
                    <>
                      <motion.div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}
                        animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
                      Running...
                    </>
                  ) : (
                    <>▶ Execute</>
                  )}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Results */}
          <AnimatePresence mode="wait">
            {(queryResult || currentTable) && (
              <motion.div key={selectedTable + viewMode} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                style={{ padding: 25, borderRadius: 20, background: 'rgba(20, 20, 35, 0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)' }}>
                {/* Results header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>Results</h4>
                    {queryResult && (
                      <div style={{ display: 'flex', gap: 12, fontSize: '0.8rem', color: '#888' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <span style={{ color: '#43e97b' }}>●</span> {queryResult.rowsAffected} rows
                        </span>
                        <span>⏱️ {queryResult.executionTime}ms</span>
                      </div>
                    )}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#888' }}>
                    {currentTable.icon} {selectedTable}
                  </div>
                </div>

                {viewMode === 'table' ? (
                  <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid rgba(255,255,255,0.04)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                      <thead>
                        <tr style={{ background: 'rgba(102, 126, 234, 0.08)' }}>
                          {(queryResult || currentTable).columns.map((col) => (
                            <th key={col} style={{ padding: '14px 18px', textAlign: 'left', fontWeight: 700, color: '#667eea', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {(queryResult?.rows || currentTable.data).map((row, rowIndex) => (
                          <motion.tr key={rowIndex} onHoverStart={() => setHoveredRow(rowIndex)} onHoverEnd={() => setHoveredRow(null)}
                            style={{ background: hoveredRow === rowIndex ? 'rgba(102, 126, 234, 0.05)' : 'transparent', borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'background 0.2s' }}>
                            {(queryResult || currentTable).columns.map((col) => {
                              const value = row[col];
                              const isStatus = col === 'status';
                              const statusColors = isStatus ? getStatusColor(value) : null;
                              return (
                                <td key={col} style={{ padding: '14px 18px', color: '#e5e7eb' }}>
                                  {isStatus ? (
                                    <span style={{ padding: '5px 12px', borderRadius: 20, background: statusColors.bg, color: statusColors.color, fontSize: '0.8rem', fontWeight: 600, textTransform: 'capitalize' }}>
                                      {value}
                                    </span>
                                  ) : col === 'id' ? (
                                    <span style={{ color: '#888', fontFamily: 'monospace' }}>#{value}</span>
                                  ) : col.includes('amount') || col === 'price' ? (
                                    <span style={{ color: '#43e97b', fontWeight: 600 }}>{value}</span>
                                  ) : col.includes('email') ? (
                                    <span style={{ color: '#667eea' }}>{value}</span>
                                  ) : (
                                    value
                                  )}
                                </td>
                              );
                            })}
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <pre style={{ margin: 0, padding: 20, borderRadius: 12, background: 'rgba(0, 0, 0, 0.3)', fontSize: '0.85rem', color: '#a5b3ce', fontFamily: "'Fira Code', monospace", lineHeight: 1.6, overflow: 'auto', maxHeight: 400 }}>
                    {JSON.stringify(queryResult?.rows || currentTable.data, null, 2)}
                  </pre>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
    </>
  );
}
