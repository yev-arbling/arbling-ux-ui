'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function FileManagerDemo() {
  const [viewMode, setViewMode] = React.useState('grid');
  const [selectedPath, setSelectedPath] = React.useState(['home', 'projects']);
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [sortBy, setSortBy] = React.useState('name');
  const [sortDir, setSortDir] = React.useState('asc');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showPreview, setShowPreview] = React.useState(true);
  const [isDragging, setIsDragging] = React.useState(false);

  const fileSystem = {
    home: {
      type: 'folder',
      children: {
        documents: { type: 'folder', color: '#4facfe', children: {
          'report.pdf': { type: 'file', icon: '📄', size: '2.4 MB', sizeBytes: 2400000, modified: '2 hours ago', created: 'Jan 15, 2024' },
          'budget.xlsx': { type: 'file', icon: '📊', size: '156 KB', sizeBytes: 156000, modified: '1 day ago', created: 'Jan 10, 2024' },
          'notes.txt': { type: 'file', icon: '📝', size: '12 KB', sizeBytes: 12000, modified: '3 days ago', created: 'Jan 8, 2024' },
        }},
        projects: { type: 'folder', color: '#667eea', children: {
          'website': { type: 'folder', color: '#f093fb', children: {
            'index.html': { type: 'file', icon: '🌐', size: '12 KB', sizeBytes: 12000, modified: '5 min ago', created: 'Jan 18, 2024' },
            'styles.css': { type: 'file', icon: '🎨', size: '8 KB', sizeBytes: 8000, modified: '5 min ago', created: 'Jan 18, 2024' },
            'app.js': { type: 'file', icon: '📜', size: '24 KB', sizeBytes: 24000, modified: '10 min ago', created: 'Jan 18, 2024' },
          }},
          'mobile-app': { type: 'folder', color: '#43e97b', children: {
            'App.tsx': { type: 'file', icon: '⚛️', size: '18 KB', sizeBytes: 18000, modified: '1 hour ago', created: 'Jan 17, 2024' },
            'package.json': { type: 'file', icon: '📦', size: '2 KB', sizeBytes: 2000, modified: '1 week ago', created: 'Jan 12, 2024' },
            'README.md': { type: 'file', icon: '📝', size: '4 KB', sizeBytes: 4000, modified: '2 weeks ago', created: 'Jan 5, 2024' },
          }},
        }},
        downloads: { type: 'folder', color: '#ff6b6b', children: {
          'setup.exe': { type: 'file', icon: '⚙️', size: '45 MB', sizeBytes: 45000000, modified: '3 days ago', created: 'Jan 14, 2024' },
          'photo.jpg': { type: 'file', icon: '🖼️', size: '3.2 MB', sizeBytes: 3200000, modified: '1 week ago', created: 'Jan 10, 2024' },
          'video.mp4': { type: 'file', icon: '🎬', size: '128 MB', sizeBytes: 128000000, modified: '2 days ago', created: 'Jan 16, 2024' },
        }},
        images: { type: 'folder', color: '#ffd93d', children: {
          'avatar.png': { type: 'file', icon: '🖼️', size: '245 KB', sizeBytes: 245000, modified: '5 days ago', created: 'Jan 12, 2024' },
          'banner.jpg': { type: 'file', icon: '🖼️', size: '1.8 MB', sizeBytes: 1800000, modified: '1 week ago', created: 'Jan 8, 2024' },
        }},
      },
    },
  };

  const quickAccess = [
    { name: 'Documents', path: ['home', 'documents'], icon: '📄', color: '#4facfe' },
    { name: 'Projects', path: ['home', 'projects'], icon: '💼', color: '#667eea' },
    { name: 'Downloads', path: ['home', 'downloads'], icon: '⬇️', color: '#ff6b6b' },
    { name: 'Images', path: ['home', 'images'], icon: '🖼️', color: '#ffd93d' },
  ];

  const storageUsed = 4.2; // GB
  const storageTotal = 10; // GB

  const getCurrentFolder = (path, fs = fileSystem) => {
    let current = fs;
    for (const segment of path) {
      if (current[segment]) {
        current = current[segment].type === 'folder' ? current[segment].children : current[segment];
      } else return {};
    }
    return current;
  };

  const currentFolder = getCurrentFolder(selectedPath);
  let files = Object.entries(currentFolder).map(([name, item]) => ({ name, ...item }));

  // Filter by search
  if (searchQuery) {
    files = files.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  // Sort files
  files.sort((a, b) => {
    // Folders first
    if (a.type === 'folder' && b.type !== 'folder') return -1;
    if (a.type !== 'folder' && b.type === 'folder') return 1;

    let cmp = 0;
    if (sortBy === 'name') cmp = a.name.localeCompare(b.name);
    else if (sortBy === 'size') cmp = (a.sizeBytes || 0) - (b.sizeBytes || 0);
    else if (sortBy === 'modified') cmp = a.modified?.localeCompare(b.modified) || 0;

    return sortDir === 'asc' ? cmp : -cmp;
  });

  const navigateTo = (name) => {
    if (currentFolder[name]?.type === 'folder') {
      setSelectedPath([...selectedPath, name]);
      setSelectedFiles([]);
    } else {
      setSelectedFiles([name]);
    }
  };

  const navigateUp = () => {
    if (selectedPath.length > 1) {
      setSelectedPath(selectedPath.slice(0, -1));
      setSelectedFiles([]);
    }
  };

  const toggleFileSelection = (name, e) => {
    e?.stopPropagation();
    if (e?.ctrlKey || e?.metaKey) {
      setSelectedFiles(prev => prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name]);
    } else {
      setSelectedFiles([name]);
    }
  };

  const selectedFileData = selectedFiles.length === 1 ? currentFolder[selectedFiles[0]] : null;

  return (
    <>
      <h2 className="demo-title">File Manager</h2>
      <p className="demo-subtitle">Full-featured file browser with sidebar, preview panel, sorting, search, and drag-drop upload.</p>
      <div className="demo-area" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '10%', right: '25%', width: 350, height: 350, background: 'radial-gradient(circle, rgba(79, 172, 254, 0.1) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />

        <motion.div style={{ width: 1100, height: 650, background: 'rgba(20, 20, 30, 0.95)', borderRadius: 18, border: '1px solid rgba(255,255,255,0.08)', display: 'flex', overflow: 'hidden' }} initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          {/* Sidebar */}
          <div style={{ width: 200, background: 'rgba(15, 15, 25, 0.98)', borderRight: '1px solid rgba(255,255,255,0.05)', padding: 15, display: 'flex', flexDirection: 'column' }}>
            {/* Quick Access */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: '0.7rem', color: '#555', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>Quick Access</div>
              {quickAccess.map(item => (
                <motion.button key={item.name} onClick={() => { setSelectedPath(item.path); setSelectedFiles([]); }}
                  style={{ width: '100%', padding: '10px 12px', marginBottom: 4, borderRadius: 8, background: JSON.stringify(selectedPath) === JSON.stringify(item.path) ? `${item.color}20` : 'transparent', border: JSON.stringify(selectedPath) === JSON.stringify(item.path) ? `1px solid ${item.color}40` : '1px solid transparent', color: JSON.stringify(selectedPath) === JSON.stringify(item.path) ? item.color : '#888', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}
                  whileHover={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </motion.button>
              ))}
            </div>

            {/* Favorites */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: '0.7rem', color: '#555', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>Favorites</div>
              {['website', 'mobile-app'].map(fav => (
                <motion.button key={fav} style={{ width: '100%', padding: '8px 12px', marginBottom: 4, borderRadius: 6, background: 'transparent', border: 'none', color: '#888', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }} whileHover={{ background: 'rgba(255,255,255,0.03)', color: '#fff' }}>
                  <span>⭐</span>
                  <span>{fav}</span>
                </motion.button>
              ))}
            </div>

            <div style={{ flex: 1 }} />

            {/* Storage */}
            <div style={{ padding: 12, borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: '0.75rem', color: '#888' }}>Storage</span>
                <span style={{ fontSize: '0.7rem', color: '#667eea' }}>{storageUsed} / {storageTotal} GB</span>
              </div>
              <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.1)' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${(storageUsed / storageTotal) * 100}%` }} style={{ height: '100%', borderRadius: 2, background: 'linear-gradient(90deg, #667eea, #4facfe)' }} />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* Toolbar */}
            <div style={{ padding: '12px 20px', background: 'rgba(25, 25, 35, 0.95)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 12 }}>
              {/* Navigation */}
              <motion.button onClick={navigateUp} disabled={selectedPath.length <= 1} style={{ padding: '8px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: 'none', color: selectedPath.length > 1 ? '#fff' : '#555', cursor: selectedPath.length > 1 ? 'pointer' : 'not-allowed', fontSize: '0.9rem' }} whileHover={selectedPath.length > 1 ? { background: 'rgba(255,255,255,0.08)' } : {}}>←</motion.button>
              <motion.button style={{ padding: '8px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: 'none', color: '#555', cursor: 'not-allowed', fontSize: '0.9rem' }}>→</motion.button>

              {/* Breadcrumb */}
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 4, padding: '8px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.03)' }}>
                {selectedPath.map((segment, index) => (
                  <React.Fragment key={segment}>
                    {index > 0 && <span style={{ color: '#555' }}>/</span>}
                    <motion.span onClick={() => setSelectedPath(selectedPath.slice(0, index + 1))} style={{ padding: '2px 6px', borderRadius: 4, color: index === selectedPath.length - 1 ? '#667eea' : '#888', cursor: 'pointer', fontSize: '0.85rem' }} whileHover={{ background: 'rgba(255,255,255,0.05)' }}>{segment}</motion.span>
                  </React.Fragment>
                ))}
              </div>

              {/* Search */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.03)', width: 200 }}>
                <span style={{ color: '#666', fontSize: '0.9rem' }}>🔍</span>
                <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', fontSize: '0.8rem', outline: 'none' }} />
              </div>

              {/* View & Sort */}
              <div style={{ display: 'flex', gap: 4, padding: 4, borderRadius: 8, background: 'rgba(255,255,255,0.03)' }}>
                {['grid', 'list'].map(mode => (
                  <motion.button key={mode} onClick={() => setViewMode(mode)} style={{ padding: '6px 10px', borderRadius: 6, background: viewMode === mode ? 'rgba(102, 126, 234, 0.2)' : 'transparent', border: 'none', color: viewMode === mode ? '#667eea' : '#888', cursor: 'pointer', fontSize: '0.9rem' }} whileHover={{ background: viewMode === mode ? 'rgba(102, 126, 234, 0.2)' : 'rgba(255,255,255,0.05)' }}>{mode === 'grid' ? '⊞' : '☰'}</motion.button>
                ))}
              </div>

              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: '8px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: 'none', color: '#888', fontSize: '0.8rem', cursor: 'pointer', outline: 'none' }}>
                <option value="name">Name</option>
                <option value="size">Size</option>
                <option value="modified">Modified</option>
              </select>

              <motion.button onClick={() => setSortDir(d => d === 'asc' ? 'desc' : 'asc')} style={{ padding: '8px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: 'none', color: '#888', cursor: 'pointer', fontSize: '0.9rem' }} whileHover={{ background: 'rgba(255,255,255,0.06)' }}>{sortDir === 'asc' ? '↑' : '↓'}</motion.button>
            </div>

            {/* Files Area */}
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
              {/* File Browser */}
              <div
                style={{ flex: 1, padding: 20, overflow: 'auto', position: 'relative' }}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
              >
                {/* Drag overlay */}
                <AnimatePresence>
                  {isDragging && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'absolute', inset: 10, borderRadius: 16, border: '2px dashed #667eea', background: 'rgba(102, 126, 234, 0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                      <div style={{ fontSize: '3rem', marginBottom: 10 }}>📤</div>
                      <div style={{ fontSize: '1rem', color: '#667eea', fontWeight: 600 }}>Drop files to upload</div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {viewMode === 'grid' ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 15 }}>
                    {files.map((file, index) => (
                      <motion.div key={file.name} onClick={(e) => toggleFileSelection(file.name, e)} onDoubleClick={() => navigateTo(file.name)}
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.02 }}
                        style={{ padding: 16, borderRadius: 12, background: selectedFiles.includes(file.name) ? 'rgba(102, 126, 234, 0.15)' : 'rgba(40, 40, 50, 0.6)', border: selectedFiles.includes(file.name) ? '1px solid rgba(102, 126, 234, 0.4)' : '1px solid rgba(255,255,255,0.03)', cursor: 'pointer', textAlign: 'center' }}
                        whileHover={{ scale: 1.03, background: selectedFiles.includes(file.name) ? 'rgba(102, 126, 234, 0.2)' : 'rgba(255,255,255,0.05)' }}
                      >
                        <div style={{ fontSize: '2.5rem', marginBottom: 10 }}>{file.type === 'folder' ? '📁' : file.icon}</div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 500, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 4 }}>{file.name}</div>
                        {file.type === 'file' && <div style={{ fontSize: '0.7rem', color: '#666' }}>{file.size}</div>}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {files.map((file, index) => (
                      <motion.div key={file.name} onClick={(e) => toggleFileSelection(file.name, e)} onDoubleClick={() => navigateTo(file.name)}
                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.02 }}
                        style={{ padding: '12px 16px', borderRadius: 10, background: selectedFiles.includes(file.name) ? 'rgba(102, 126, 234, 0.12)' : 'transparent', border: selectedFiles.includes(file.name) ? '1px solid rgba(102, 126, 234, 0.3)' : '1px solid transparent', cursor: 'pointer', display: 'grid', gridTemplateColumns: '40px 1fr 80px 100px', gap: 15, alignItems: 'center' }}
                        whileHover={{ background: selectedFiles.includes(file.name) ? 'rgba(102, 126, 234, 0.15)' : 'rgba(255,255,255,0.02)' }}
                      >
                        <div style={{ fontSize: '1.5rem' }}>{file.type === 'folder' ? '📁' : file.icon}</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#888' }}>{file.type === 'file' ? file.size : '--'}</div>
                        <div style={{ fontSize: '0.75rem', color: '#666' }}>{file.modified || '--'}</div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {files.length === 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#666' }}>
                    <div style={{ fontSize: '3rem', marginBottom: 10, opacity: 0.5 }}>📂</div>
                    <div style={{ fontSize: '0.9rem' }}>{searchQuery ? 'No matching files' : 'Empty folder'}</div>
                  </div>
                )}
              </div>

              {/* Preview Panel */}
              {showPreview && (
                <div style={{ width: 240, background: 'rgba(15, 15, 25, 0.8)', borderLeft: '1px solid rgba(255,255,255,0.05)', padding: 20 }}>
                  {selectedFiles.length === 1 && selectedFileData ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div style={{ textAlign: 'center', marginBottom: 20 }}>
                        <div style={{ fontSize: '4rem', marginBottom: 12 }}>{selectedFileData.type === 'folder' ? '📁' : selectedFileData.icon}</div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: 4, wordBreak: 'break-word' }}>{selectedFiles[0]}</div>
                        <div style={{ fontSize: '0.75rem', color: '#888' }}>{selectedFileData.type === 'folder' ? 'Folder' : 'File'}</div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: '0.75rem' }}>
                        {selectedFileData.type === 'file' && (
                          <>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#888' }}>Size</span><span>{selectedFileData.size}</span></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#888' }}>Modified</span><span>{selectedFileData.modified}</span></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#888' }}>Created</span><span>{selectedFileData.created}</span></div>
                          </>
                        )}
                      </div>
                      <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
                        <motion.button style={{ flex: 1, padding: '10px', borderRadius: 8, background: 'linear-gradient(135deg, #667eea, #764ba2)', border: 'none', color: '#fff', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }} whileHover={{ scale: 1.02 }}>Open</motion.button>
                        <motion.button style={{ padding: '10px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: 'none', color: '#888', fontSize: '0.75rem', cursor: 'pointer' }} whileHover={{ background: 'rgba(255,255,255,0.08)' }}>⋯</motion.button>
                      </div>
                    </motion.div>
                  ) : selectedFiles.length > 1 ? (
                    <div style={{ textAlign: 'center', padding: 20 }}>
                      <div style={{ fontSize: '2rem', marginBottom: 10 }}>📚</div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 4 }}>{selectedFiles.length} items selected</div>
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: 20, color: '#666' }}>
                      <div style={{ fontSize: '2rem', marginBottom: 10, opacity: 0.5 }}>📋</div>
                      <div style={{ fontSize: '0.8rem' }}>Select a file to preview</div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Status Bar */}
            <div style={{ padding: '10px 20px', background: 'rgba(10, 10, 20, 0.95)', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#888' }}>
              <span>{files.length} items {selectedFiles.length > 0 && `• ${selectedFiles.length} selected`}</span>
              <div style={{ display: 'flex', gap: 12 }}>
                <motion.button onClick={() => setShowPreview(!showPreview)} style={{ background: 'none', border: 'none', color: showPreview ? '#667eea' : '#666', cursor: 'pointer', fontSize: '0.75rem' }} whileHover={{ color: '#fff' }}>{showPreview ? 'Hide' : 'Show'} Preview</motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
