'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function APIDocsDemo() {
  const [selectedEndpoint, setSelectedEndpoint] = React.useState(null);
  const [response, setResponse] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('endpoints');

  const endpoints = [
    { id: 1, method: 'GET', path: '/api/users', description: 'Retrieve all users', parameters: [{ name: 'page', type: 'integer', required: false }, { name: 'limit', type: 'integer', required: false }], response: { status: 200, data: [{ id: 1, name: 'John Doe', email: 'john@example.com' }] } },
    { id: 2, method: 'POST', path: '/api/users', description: 'Create a new user', parameters: [{ name: 'name', type: 'string', required: true }, { name: 'email', type: 'string', required: true }], response: { status: 201, data: { id: 2, name: 'New User' } } },
    { id: 3, method: 'PUT', path: '/api/users/:id', description: 'Update user by ID', parameters: [{ name: 'name', type: 'string', required: false }], response: { status: 200, data: { id: 1, name: 'Updated' } } },
    { id: 4, method: 'DELETE', path: '/api/users/:id', description: 'Delete user by ID', parameters: [], response: { status: 204, message: 'Deleted successfully' } },
  ];

  const getMethodColor = (method) => ({ GET: '#43e97b', POST: '#667eea', PUT: '#ffd93d', DELETE: '#ff6b6b' }[method] || '#888');
  const getMethodBg = (method) => ({ GET: 'rgba(67, 233, 123, 0.15)', POST: 'rgba(102, 126, 234, 0.15)', PUT: 'rgba(255, 217, 61, 0.15)', DELETE: 'rgba(255, 107, 107, 0.15)' }[method] || 'rgba(136, 136, 136, 0.15)');

  const tryEndpoint = async () => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setResponse({ ...selectedEndpoint.response, time: Math.round(Math.random() * 200 + 50), headers: { 'content-type': 'application/json', 'x-request-id': 'req_' + Math.random().toString(36).substr(2, 9) } });
    setIsLoading(false);
  };

  return (
    <>
      <h2 className="demo-title">API Documentation</h2>
      <p className="demo-subtitle">Interactive REST API explorer with endpoints, parameters, request testing, and response preview.</p>
      <div className="demo-area" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, position: 'relative' }}>
      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: '10%', left: '20%', width: 350, height: 350, background: 'radial-gradient(circle, rgba(102, 126, 234, 0.12) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '15%', right: '25%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(118, 75, 162, 0.1) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none' }} />

      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        style={{ width: '100%', maxWidth: 1300, display: 'grid', gridTemplateColumns: '380px 1fr', gap: 30, position: 'relative', zIndex: 1 }}>
        {/* Sidebar */}
        <div style={{ padding: 30, borderRadius: 24, background: 'rgba(20, 20, 35, 0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #667eea, #764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>📚</div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, background: 'linear-gradient(135deg, #fff 0%, #a5b3ce 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>API Docs</h2>
          </div>
          <p style={{ fontSize: '0.9rem', color: '#888', marginBottom: 25 }}>Interactive API explorer</p>

          {/* Search */}
          <div style={{ position: 'relative', marginBottom: 20 }}>
            <input type="text" placeholder="Search endpoints..." style={{ width: '100%', padding: '14px 16px 14px 44px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', fontSize: '0.9rem', outline: 'none' }} />
            <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', fontSize: '1rem', opacity: 0.5 }}>🔍</span>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20, padding: 4, background: 'rgba(255,255,255,0.03)', borderRadius: 10 }}>
            {['endpoints', 'models'].map(tab => (
              <motion.button key={tab} onClick={() => setActiveTab(tab)}
                style={{ flex: 1, padding: '10px', borderRadius: 8, background: activeTab === tab ? 'rgba(102, 126, 234, 0.2)' : 'transparent', border: 'none', color: activeTab === tab ? '#667eea' : '#888', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize' }}
                whileHover={{ background: activeTab !== tab ? 'rgba(255,255,255,0.03)' : undefined }} whileTap={{ scale: 0.98 }}>
                {tab}
              </motion.button>
            ))}
          </div>

          {/* Endpoint list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {endpoints.map((endpoint, index) => (
              <motion.div key={endpoint.id} onClick={() => { setSelectedEndpoint(endpoint); setResponse(null); }}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}
                style={{ padding: 16, borderRadius: 14, background: selectedEndpoint?.id === endpoint.id ? getMethodBg(endpoint.method) : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${selectedEndpoint?.id === endpoint.id ? getMethodColor(endpoint.method) + '60' : 'rgba(255,255,255,0.06)'}`, cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
                whileHover={{ x: 4, borderColor: getMethodColor(endpoint.method) + '40' }}>
                {selectedEndpoint?.id === endpoint.id && (
                  <motion.div layoutId="endpoint-indicator" style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: getMethodColor(endpoint.method), borderRadius: '0 2px 2px 0' }} />
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <div style={{ padding: '5px 10px', borderRadius: 6, background: getMethodBg(endpoint.method), color: getMethodColor(endpoint.method), fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.5px' }}>
                    {endpoint.method}
                  </div>
                </div>
                <code style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff', display: 'block', marginBottom: 4 }}>{endpoint.path}</code>
                <div style={{ fontSize: '0.8rem', color: '#888' }}>{endpoint.description}</div>
              </motion.div>
            ))}
          </div>

          {/* Version badge */}
          <div style={{ marginTop: 25, padding: 16, borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.8rem', color: '#888' }}>API Version</span>
            <span style={{ padding: '4px 10px', borderRadius: 6, background: 'rgba(67, 233, 123, 0.15)', color: '#43e97b', fontSize: '0.75rem', fontWeight: 700 }}>v2.1.0</span>
          </div>
        </div>

        {/* Main content */}
        {selectedEndpoint ? (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} key={selectedEndpoint.id}
            style={{ display: 'flex', flexDirection: 'column', gap: 25 }}>
            {/* Header */}
            <div style={{ padding: 30, borderRadius: 24, background: 'rgba(20, 20, 35, 0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 15, marginBottom: 15 }}>
                <motion.div style={{ padding: '10px 20px', borderRadius: 12, background: getMethodBg(selectedEndpoint.method), color: getMethodColor(selectedEndpoint.method), fontSize: '1rem', fontWeight: 800, boxShadow: `0 0 30px ${getMethodColor(selectedEndpoint.method)}30` }}
                  animate={{ boxShadow: [`0 0 20px ${getMethodColor(selectedEndpoint.method)}20`, `0 0 35px ${getMethodColor(selectedEndpoint.method)}35`, `0 0 20px ${getMethodColor(selectedEndpoint.method)}20`] }}
                  transition={{ duration: 2, repeat: Infinity }}>
                  {selectedEndpoint.method}
                </motion.div>
                <code style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', fontFamily: "'Fira Code', monospace" }}>{selectedEndpoint.path}</code>
              </div>
              <p style={{ fontSize: '1rem', color: '#a5b3ce', lineHeight: 1.6 }}>{selectedEndpoint.description}</p>
            </div>

            {/* Parameters */}
            {selectedEndpoint.parameters.length > 0 && (
              <div style={{ padding: 30, borderRadius: 24, background: 'rgba(20, 20, 35, 0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: '1.2rem' }}>⚙️</span> Parameters
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {selectedEndpoint.parameters.map((param, index) => (
                    <motion.div key={param.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
                      style={{ padding: 18, borderRadius: 14, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                      whileHover={{ borderColor: 'rgba(102, 126, 234, 0.3)', background: 'rgba(102, 126, 234, 0.05)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <code style={{ fontSize: '0.95rem', fontWeight: 700, color: '#667eea' }}>{param.name}</code>
                        <span style={{ padding: '4px 10px', borderRadius: 6, background: 'rgba(102, 126, 234, 0.1)', fontSize: '0.75rem', color: '#a5b3ce', fontWeight: 500 }}>{param.type}</span>
                      </div>
                      <span style={{ padding: '4px 10px', borderRadius: 6, background: param.required ? 'rgba(255, 107, 107, 0.15)' : 'rgba(255,255,255,0.05)', fontSize: '0.7rem', color: param.required ? '#ff6b6b' : '#888', fontWeight: 600 }}>
                        {param.required ? 'REQUIRED' : 'OPTIONAL'}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Try it out */}
            <div style={{ padding: 30, borderRadius: 24, background: 'rgba(20, 20, 35, 0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: '1.2rem' }}>🚀</span> Try It Out
              </h3>
              <motion.button onClick={tryEndpoint} disabled={isLoading}
                style={{ width: '100%', padding: '18px', borderRadius: 14, background: isLoading ? 'rgba(102, 126, 234, 0.3)' : 'linear-gradient(135deg, #667eea, #764ba2)', border: 'none', color: '#fff', fontSize: '1rem', fontWeight: 700, cursor: isLoading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: isLoading ? 'none' : '0 10px 40px rgba(102, 126, 234, 0.3)' }}
                whileHover={!isLoading ? { scale: 1.02, boxShadow: '0 15px 50px rgba(102, 126, 234, 0.4)' } : {}} whileTap={!isLoading ? { scale: 0.98 } : {}}>
                {isLoading ? (
                  <>
                    <motion.div style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}
                      animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
                    Sending Request...
                  </>
                ) : (
                  <>⚡ Send Request</>
                )}
              </motion.button>

              {/* Response */}
              <AnimatePresence>
                {response && (
                  <motion.div initial={{ opacity: 0, y: 20, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, y: -10 }}
                    style={{ marginTop: 25, borderRadius: 16, background: 'rgba(0, 0, 0, 0.3)', overflow: 'hidden' }}>
                    {/* Response header */}
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <motion.span style={{ padding: '6px 14px', borderRadius: 8, background: response.status < 300 ? 'rgba(67, 233, 123, 0.2)' : 'rgba(255, 107, 107, 0.2)', color: response.status < 300 ? '#43e97b' : '#ff6b6b', fontSize: '0.9rem', fontWeight: 800 }}
                          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500 }}>
                          {response.status}
                        </motion.span>
                        <span style={{ fontSize: '0.85rem', color: '#888' }}>OK</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 15, fontSize: '0.8rem', color: '#888' }}>
                        <span>⏱️ {response.time}ms</span>
                        <span>📦 {JSON.stringify(response.data || response.message).length} bytes</span>
                      </div>
                    </div>
                    {/* Response body */}
                    <div style={{ padding: 20 }}>
                      <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Response Body</div>
                      <pre style={{ margin: 0, padding: 20, borderRadius: 12, background: 'rgba(0, 0, 0, 0.4)', fontSize: '0.9rem', color: '#a5b3ce', fontFamily: "'Fira Code', monospace", lineHeight: 1.6, overflow: 'auto' }}>
                        {JSON.stringify(response.data || { message: response.message }, null, 2)}
                      </pre>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60, borderRadius: 24, background: 'rgba(20, 20, 35, 0.4)', backdropFilter: 'blur(20px)', border: '1px dashed rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '4rem', marginBottom: 20, opacity: 0.5 }}>👈</div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#888', marginBottom: 8 }}>Select an Endpoint</h3>
            <p style={{ fontSize: '0.9rem', color: '#666', textAlign: 'center' }}>Choose an endpoint from the sidebar to view details and test it</p>
          </motion.div>
        )}
      </motion.div>
    </div>
    </>
  );
}
