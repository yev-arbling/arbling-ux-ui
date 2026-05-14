'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function CodeEditorDemo() {
  const [activeFile, setActiveFile] = React.useState('App.jsx');
  const [openTabs, setOpenTabs] = React.useState(['App.jsx', 'styles.css']);
  const [isRunning, setIsRunning] = React.useState(false);
  const [output, setOutput] = React.useState([]);
  const [showProblems, setShowProblems] = React.useState(true);
  const [cursorLine, setCursorLine] = React.useState(8);
  const [expandedFolders, setExpandedFolders] = React.useState(['src', 'components']);
  const [gitBranch] = React.useState('main');
  const [unsavedFiles, setUnsavedFiles] = React.useState(['App.jsx']);

  const fileTree = [
    { name: 'src', type: 'folder', children: [
      { name: 'components', type: 'folder', children: [
        { name: 'Button.jsx', type: 'file', icon: '⚛️', color: '#61dafb' },
        { name: 'Card.jsx', type: 'file', icon: '⚛️', color: '#61dafb' },
        { name: 'Modal.jsx', type: 'file', icon: '⚛️', color: '#61dafb' },
      ]},
      { name: 'App.jsx', type: 'file', icon: '⚛️', color: '#61dafb' },
      { name: 'index.js', type: 'file', icon: '🟨', color: '#f7df1e' },
    ]},
    { name: 'styles.css', type: 'file', icon: '🎨', color: '#264de4' },
    { name: 'package.json', type: 'file', icon: '📦', color: '#cb3837' },
    { name: '.env', type: 'file', icon: '🔒', color: '#ecd53f' },
  ];

  const fileContents = {
    'App.jsx': { lang: 'jsx', lines: [
      { text: "import React, { useState, useEffect } from 'react';", tokens: [{ t: 'import', c: '#c792ea' }, { t: " React, { useState, useEffect } ", c: '#e0e0e0' }, { t: 'from', c: '#c792ea' }, { t: " 'react'", c: '#c3e88d' }, { t: ';', c: '#89ddff' }] },
      { text: "import { motion, AnimatePresence } from 'framer-motion';", tokens: [{ t: 'import', c: '#c792ea' }, { t: ' { motion, AnimatePresence } ', c: '#e0e0e0' }, { t: 'from', c: '#c792ea' }, { t: " 'framer-motion'", c: '#c3e88d' }, { t: ';', c: '#89ddff' }] },
      { text: "import './styles.css';", tokens: [{ t: 'import', c: '#c792ea' }, { t: " './styles.css'", c: '#c3e88d' }, { t: ';', c: '#89ddff' }] },
      { text: '', tokens: [] },
      { text: 'export default function App() {', tokens: [{ t: 'export default', c: '#c792ea' }, { t: ' function ', c: '#c792ea' }, { t: 'App', c: '#82aaff' }, { t: '() {', c: '#89ddff' }] },
      { text: '  const [count, setCount] = useState(0);', tokens: [{ t: '  const', c: '#c792ea' }, { t: ' [count, setCount] = ', c: '#e0e0e0' }, { t: 'useState', c: '#82aaff' }, { t: '(', c: '#89ddff' }, { t: '0', c: '#f78c6c' }, { t: ');', c: '#89ddff' }] },
      { text: '  const [isVisible, setIsVisible] = useState(true);', tokens: [{ t: '  const', c: '#c792ea' }, { t: ' [isVisible, setIsVisible] = ', c: '#e0e0e0' }, { t: 'useState', c: '#82aaff' }, { t: '(', c: '#89ddff' }, { t: 'true', c: '#f78c6c' }, { t: ');', c: '#89ddff' }] },
      { text: '', tokens: [] },
      { text: '  useEffect(() => {', tokens: [{ t: '  ', c: '' }, { t: 'useEffect', c: '#82aaff' }, { t: '(() => {', c: '#89ddff' }] },
      { text: '    console.log("Count updated:", count);', tokens: [{ t: '    ', c: '' }, { t: 'console', c: '#82aaff' }, { t: '.', c: '#89ddff' }, { t: 'log', c: '#82aaff' }, { t: '(', c: '#89ddff' }, { t: '"Count updated:"', c: '#c3e88d' }, { t: ', count);', c: '#89ddff' }] },
      { text: '  }, [count]);', tokens: [{ t: '  }, [count]);', c: '#89ddff' }] },
      { text: '', tokens: [] },
      { text: '  return (', tokens: [{ t: '  return', c: '#c792ea' }, { t: ' (', c: '#89ddff' }] },
      { text: '    <motion.div className="app">', tokens: [{ t: '    <', c: '#89ddff' }, { t: 'motion.div', c: '#f07178' }, { t: ' className=', c: '#e0e0e0' }, { t: '"app"', c: '#c3e88d' }, { t: '>', c: '#89ddff' }] },
      { text: '      <h1>Counter: {count}</h1>', tokens: [{ t: '      <', c: '#89ddff' }, { t: 'h1', c: '#f07178' }, { t: '>Counter: {count}</', c: '#e0e0e0' }, { t: 'h1', c: '#f07178' }, { t: '>', c: '#89ddff' }] },
      { text: '      <button onClick={() => setCount(c => c + 1)}>', tokens: [{ t: '      <', c: '#89ddff' }, { t: 'button', c: '#f07178' }, { t: ' onClick={() => setCount(c => c + 1)}>', c: '#e0e0e0' }] },
      { text: '        Increment', tokens: [{ t: '        Increment', c: '#e0e0e0' }] },
      { text: '      </button>', tokens: [{ t: '      </', c: '#89ddff' }, { t: 'button', c: '#f07178' }, { t: '>', c: '#89ddff' }] },
      { text: '    </motion.div>', tokens: [{ t: '    </', c: '#89ddff' }, { t: 'motion.div', c: '#f07178' }, { t: '>', c: '#89ddff' }] },
      { text: '  );', tokens: [{ t: '  );', c: '#89ddff' }] },
      { text: '}', tokens: [{ t: '}', c: '#89ddff' }] },
    ]},
    'styles.css': { lang: 'css', lines: [
      { text: '.app {', tokens: [{ t: '.app', c: '#ffcb6b' }, { t: ' {', c: '#89ddff' }] },
      { text: '  display: flex;', tokens: [{ t: '  display', c: '#82aaff' }, { t: ': ', c: '#89ddff' }, { t: 'flex', c: '#c3e88d' }, { t: ';', c: '#89ddff' }] },
      { text: '  flex-direction: column;', tokens: [{ t: '  flex-direction', c: '#82aaff' }, { t: ': ', c: '#89ddff' }, { t: 'column', c: '#c3e88d' }, { t: ';', c: '#89ddff' }] },
      { text: '  gap: 20px;', tokens: [{ t: '  gap', c: '#82aaff' }, { t: ': ', c: '#89ddff' }, { t: '20px', c: '#f78c6c' }, { t: ';', c: '#89ddff' }] },
      { text: '}', tokens: [{ t: '}', c: '#89ddff' }] },
    ]},
  };

  const problems = [
    { type: 'warning', file: 'App.jsx', line: 7, message: "'isVisible' is declared but never used" },
    { type: 'info', file: 'App.jsx', line: 1, message: 'Consider using named imports for better tree-shaking' },
  ];

  const handleRun = () => {
    setIsRunning(true);
    setOutput([]);
    setTimeout(() => {
      setOutput([
        { type: 'log', text: '> npm run dev', time: '09:42:01' },
        { type: 'info', text: 'Starting development server...', time: '09:42:02' },
        { type: 'success', text: '✓ Ready in 847ms', time: '09:42:03' },
        { type: 'log', text: 'Count updated: 0', time: '09:42:03' },
        { type: 'success', text: '● Local: http://localhost:3000', time: '09:42:03' },
      ]);
      setIsRunning(false);
    }, 1500);
  };

  const toggleFolder = (name) => {
    setExpandedFolders(prev => prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name]);
  };

  const openFile = (name) => {
    if (!openTabs.includes(name)) setOpenTabs([...openTabs, name]);
    setActiveFile(name);
  };

  const closeTab = (name, e) => {
    e.stopPropagation();
    const newTabs = openTabs.filter(t => t !== name);
    setOpenTabs(newTabs);
    if (activeFile === name && newTabs.length > 0) setActiveFile(newTabs[0]);
  };

  const renderTree = (items, depth = 0) => items.map((item) => (
    <React.Fragment key={item.name}>
      <motion.div
        onClick={() => item.type === 'folder' ? toggleFolder(item.name) : openFile(item.name)}
        style={{ padding: '6px 10px', paddingLeft: 12 + depth * 16, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', borderRadius: 6, background: activeFile === item.name ? 'rgba(102, 126, 234, 0.2)' : 'transparent', color: activeFile === item.name ? '#fff' : '#aaa', fontSize: '0.85rem' }}
        whileHover={{ background: 'rgba(255,255,255,0.05)' }}
      >
        {item.type === 'folder' ? (
          <motion.span animate={{ rotate: expandedFolders.includes(item.name) ? 90 : 0 }} style={{ fontSize: '0.7rem', color: '#888' }}>▶</motion.span>
        ) : <span style={{ width: 12 }} />}
        <span>{item.type === 'folder' ? (expandedFolders.includes(item.name) ? '📂' : '📁') : item.icon}</span>
        <span>{item.name}</span>
        {unsavedFiles.includes(item.name) && <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff', marginLeft: 'auto' }} />}
      </motion.div>
      {item.type === 'folder' && expandedFolders.includes(item.name) && item.children && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
          {renderTree(item.children, depth + 1)}
        </motion.div>
      )}
    </React.Fragment>
  ));

  const currentFile = fileContents[activeFile];

  return (
    <>
      <h2 className="demo-title">Code Editor</h2>
      <p className="demo-subtitle">VS Code-style editor with file explorer, syntax highlighting, minimap, problems panel, and terminal.</p>
      <div className="demo-area" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30, position: 'relative' }}>
      <div style={{ position: 'absolute', top: '5%', left: '15%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '20%', width: 350, height: 350, background: 'radial-gradient(circle, rgba(118, 75, 162, 0.12) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none', zIndex: 0 }} />
      <motion.div style={{ width: 1200, height: 750, background: 'rgba(30, 30, 40, 0.98)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 25px 80px rgba(0,0,0,0.5)' }} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
        {/* Title Bar */}
        <div style={{ height: 38, background: 'rgba(40, 40, 50, 0.98)', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', padding: '0 15px', gap: 12 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {['#ff5f57', '#febc2e', '#28c840'].map((bg, i) => <motion.div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: bg }} whileHover={{ scale: 1.2 }} />)}
          </div>
          <div style={{ flex: 1, textAlign: 'center', fontSize: '0.8rem', color: '#888' }}>{activeFile} — my-project</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem', color: '#888' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>🔀 {gitBranch}</span>
            <span style={{ color: '#43e97b' }}>● Synced</span>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Activity Bar */}
          <div style={{ width: 48, background: 'rgba(25, 25, 35, 0.98)', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 0', gap: 5 }}>
            {[{ icon: '📁', active: true }, { icon: '🔍' }, { icon: '🔀' }, { icon: '🐛' }, { icon: '🧩' }].map((item, i) => (
              <motion.div key={i} style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, background: item.active ? 'rgba(102, 126, 234, 0.2)' : 'transparent', borderLeft: item.active ? '2px solid #667eea' : '2px solid transparent', cursor: 'pointer', fontSize: '1.1rem' }} whileHover={{ background: 'rgba(255,255,255,0.05)' }}>{item.icon}</motion.div>
            ))}
          </div>

          {/* File Explorer */}
          <div style={{ width: 220, background: 'rgba(25, 25, 35, 0.95)', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '12px 15px', fontSize: '0.7rem', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: 1 }}>Explorer</div>
            <div style={{ padding: '0 8px', flex: 1, overflow: 'auto' }}>{renderTree(fileTree)}</div>
          </div>

          {/* Main Editor */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* Tabs */}
            <div style={{ height: 38, background: 'rgba(20, 20, 30, 0.98)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 1 }}>
              {openTabs.map(tab => (
                <motion.div key={tab} onClick={() => setActiveFile(tab)} style={{ height: '100%', padding: '0 15px', display: 'flex', alignItems: 'center', gap: 8, background: activeFile === tab ? 'rgba(30, 30, 40, 0.98)' : 'transparent', borderBottom: activeFile === tab ? '1px solid #667eea' : '1px solid transparent', cursor: 'pointer', fontSize: '0.85rem', color: activeFile === tab ? '#fff' : '#888' }} whileHover={{ background: 'rgba(40, 40, 50, 0.5)' }}>
                  <span>{fileContents[tab]?.lang === 'jsx' ? '⚛️' : '🎨'}</span>
                  <span>{tab}</span>
                  {unsavedFiles.includes(tab) && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />}
                  <motion.span onClick={(e) => closeTab(tab, e)} style={{ marginLeft: 8, fontSize: '0.9rem', color: '#666' }} whileHover={{ color: '#fff' }}>×</motion.span>
                </motion.div>
              ))}
            </div>

            {/* Code Area */}
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
              <div style={{ flex: 1, display: 'flex', background: 'rgba(20, 20, 30, 0.98)', fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontSize: '0.9rem', lineHeight: 1.7 }}>
                {/* Line Numbers */}
                <div style={{ padding: '15px 12px', textAlign: 'right', color: '#555', userSelect: 'none', background: 'rgba(15, 15, 25, 0.5)' }}>
                  {currentFile?.lines.map((_, i) => (
                    <div key={i} style={{ color: cursorLine === i + 1 ? '#fff' : '#555', background: cursorLine === i + 1 ? 'rgba(102, 126, 234, 0.1)' : 'transparent', paddingRight: 8 }}>{i + 1}</div>
                  ))}
                </div>
                {/* Code */}
                <div style={{ flex: 1, padding: 15, overflow: 'auto', position: 'relative' }}>
                  {currentFile?.lines.map((line, i) => (
                    <div key={i} onClick={() => setCursorLine(i + 1)} style={{ background: cursorLine === i + 1 ? 'rgba(102, 126, 234, 0.08)' : 'transparent', borderLeft: cursorLine === i + 1 ? '2px solid #667eea' : '2px solid transparent', paddingLeft: 8, cursor: 'text', minHeight: '1.7em' }}>
                      {line.tokens.map((token, j) => <span key={j} style={{ color: token.c }}>{token.t}</span>)}
                      {cursorLine === i + 1 && <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} style={{ display: 'inline-block', width: 2, height: '1.1em', background: '#667eea', marginLeft: 2, verticalAlign: 'middle' }} />}
                    </div>
                  ))}
                </div>
                {/* Minimap */}
                <div style={{ width: 80, background: 'rgba(15, 15, 25, 0.8)', borderLeft: '1px solid rgba(255,255,255,0.05)', padding: 8, position: 'relative' }}>
                  <div style={{ position: 'absolute', top: cursorLine * 2.5, left: 0, right: 0, height: 20, background: 'rgba(102, 126, 234, 0.2)', borderRadius: 2 }} />
                  {currentFile?.lines.map((line, i) => (
                    <div key={i} style={{ height: 2.5, margin: '1px 0', display: 'flex', gap: 1 }}>
                      {line.tokens.slice(0, 5).map((t, j) => <div key={j} style={{ flex: 1, background: t.c || '#333', opacity: 0.6, borderRadius: 1 }} />)}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Panels */}
            <div style={{ height: showProblems ? 150 : 0, background: 'rgba(20, 20, 30, 0.98)', borderTop: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', transition: 'height 0.2s' }}>
              <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                {['Problems', 'Output', 'Terminal'].map((tab, i) => (
                  <div key={tab} style={{ padding: '8px 16px', fontSize: '0.8rem', color: i === 0 ? '#fff' : '#888', borderBottom: i === 0 ? '1px solid #667eea' : 'none', cursor: 'pointer' }}>
                    {tab} {tab === 'Problems' && <span style={{ padding: '2px 6px', borderRadius: 10, background: 'rgba(255, 180, 0, 0.2)', color: '#ffb400', fontSize: '0.7rem', marginLeft: 5 }}>{problems.length}</span>}
                  </div>
                ))}
                <div style={{ flex: 1 }} />
                <motion.button onClick={handleRun} style={{ margin: 5, padding: '5px 15px', borderRadius: 6, background: isRunning ? 'rgba(255, 100, 100, 0.2)' : 'rgba(67, 233, 123, 0.2)', border: isRunning ? '1px solid rgba(255, 100, 100, 0.4)' : '1px solid rgba(67, 233, 123, 0.4)', color: isRunning ? '#ff6464' : '#43e97b', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  {isRunning ? '⬛ Stop' : '▶ Run'}
                </motion.button>
              </div>
              <div style={{ padding: 10, fontSize: '0.8rem', overflow: 'auto', height: 100 }}>
                {output.length > 0 ? output.map((o, i) => (
                  <div key={i} style={{ padding: '4px 8px', display: 'flex', gap: 10, color: o.type === 'success' ? '#43e97b' : o.type === 'error' ? '#ff6464' : '#aaa' }}>
                    <span style={{ color: '#555' }}>{o.time}</span>
                    <span>{o.text}</span>
                  </div>
                )) : problems.map((p, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} style={{ padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 10, borderRadius: 4, cursor: 'pointer' }} whileHover={{ background: 'rgba(255,255,255,0.03)' }}>
                    <span style={{ color: p.type === 'warning' ? '#ffb400' : '#4facfe' }}>{p.type === 'warning' ? '⚠️' : 'ℹ️'}</span>
                    <span style={{ color: '#aaa' }}>{p.message}</span>
                    <span style={{ marginLeft: 'auto', color: '#666', fontSize: '0.75rem' }}>{p.file}:{p.line}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div style={{ height: 24, background: '#667eea', display: 'flex', alignItems: 'center', padding: '0 10px', fontSize: '0.75rem', color: '#fff' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>🔀 {gitBranch}</span>
          <span style={{ marginLeft: 15 }}>⟳ 0 ↓ 0 ↑</span>
          <span style={{ marginLeft: 'auto', display: 'flex', gap: 15 }}>
            <span>Ln {cursorLine}, Col 1</span>
            <span>Spaces: 2</span>
            <span>UTF-8</span>
            <span>{currentFile?.lang.toUpperCase()}</span>
            <span>Prettier</span>
          </span>
        </div>
      </motion.div>
    </div>
    </>
  );
}
