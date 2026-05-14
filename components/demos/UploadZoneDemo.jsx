'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function UploadZoneDemo() {
  const [files, setFiles] = React.useState([]);
  const [isDragging, setIsDragging] = React.useState(false);

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const newFiles = Array.from(e.dataTransfer.files).map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size < 1024 * 1024 ? (file.size / 1024).toFixed(1) + ' KB' : (file.size / (1024 * 1024)).toFixed(1) + ' MB',
      progress: 0,
      uploaded: false,
    }));
    setFiles(prev => [...prev, ...newFiles]);
    newFiles.forEach(f => simulateUpload(f.id));
  };

  const simulateUpload = (fileId) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles(prev => prev.map(f => f.id === fileId ? { ...f, progress: 100, uploaded: true } : f));
      } else {
        setFiles(prev => prev.map(f => f.id === fileId ? { ...f, progress } : f));
      }
    }, 500);
  };

  return (
    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{ width: '100%', maxWidth: 700, background: 'rgba(20, 20, 35, 0.9)', borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)', padding: 40 }}
      >
        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: 10 }}>Upload Zone</h2>
        <p style={{ fontSize: '0.9rem', color: '#888', marginBottom: 30 }}>Drag-and-drop file upload with progress</p>

        <motion.div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{ padding: 60, borderRadius: 24,
            background: isDragging ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))' : 'rgba(15, 15, 25, 0.95)',
            border: isDragging ? '2px dashed #667eea' : '2px dashed rgba(255,255,255,0.2)',
            textAlign: 'center', cursor: 'pointer', marginBottom: files.length > 0 ? 20 : 0 }}
          whileHover={{ borderColor: 'rgba(102, 126, 234, 0.5)' }}
          animate={isDragging ? { scale: 1.02 } : { scale: 1 }}
        >
          <motion.div
            animate={{ y: isDragging ? [0, -10, 0] : 0 }}
            transition={{ duration: 0.5, repeat: isDragging ? Infinity : 0 }}
            style={{ fontSize: '4rem', marginBottom: 16 }}
          >
            {isDragging ? '📥' : '📁'}
          </motion.div>
          <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff', marginBottom: 8 }}>
            {isDragging ? 'Drop files here' : 'Drag & drop files here'}
          </div>
          <div style={{ fontSize: '0.9rem', color: '#888' }}>or click to browse</div>
        </motion.div>

        <AnimatePresence>
          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ padding: 20, borderRadius: 20, background: 'rgba(15, 15, 25, 0.95)',
                border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <div style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: 16 }}>
                Uploading {files.length} file{files.length !== 1 ? 's' : ''}
              </div>

              {files.map((file) => (
                <motion.div
                  key={file.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  style={{ padding: 16, borderRadius: 12, background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center',
                    gap: 12, marginBottom: 12 }}
                >
                  <div style={{ width: 48, height: 48, borderRadius: 10,
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                    📄
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff', marginBottom: 4 }}>{file.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#888' }}>{file.size} {file.uploaded && '✓'}</div>
                    {!file.uploaded && (
                      <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.1)', marginTop: 8 }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${file.progress}%` }}
                          style={{ height: '100%', background: 'linear-gradient(90deg, #667eea, #764ba2)' }}
                        />
                      </div>
                    )}
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#667eea' }}>
                    {file.uploaded ? '✓' : `${Math.round(file.progress)}%`}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
