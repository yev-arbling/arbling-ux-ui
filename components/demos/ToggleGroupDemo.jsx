'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function ToggleGroupDemo() {
  const [viewMode, setViewMode] = React.useState('grid');
  const [selectedThemes, setSelectedThemes] = React.useState(['dark']);
  const [toggles, setToggles] = React.useState({ notifications: true, autoSave: false });

  const viewModes = ['grid', 'list', 'map'];
  const themes = ['light', 'dark', 'auto'];

  return (
    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{ width: '100%', maxWidth: 600, background: 'rgba(20, 20, 35, 0.9)', borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)', padding: 40 }}
      >
        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: 10 }}>Toggle Group</h2>
        <p style={{ fontSize: '0.9rem', color: '#888', marginBottom: 30 }}>Segmented controls, toggles, and chips</p>

        {/* Segment Control */}
        <div style={{ marginBottom: 30 }}>
          <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: 16,
            textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>
            View Mode
          </div>
          <div style={{ position: 'relative', display: 'flex', padding: 6, borderRadius: 16,
            background: 'rgba(255,255,255,0.05)' }}>
            <motion.div
              style={{ position: 'absolute', height: 'calc(100% - 12px)', borderRadius: 12,
                background: 'linear-gradient(135deg, #667eea, #764ba2)' }}
              animate={{
                left: `${viewModes.indexOf(viewMode) * (100 / viewModes.length)}%`,
                width: `${100 / viewModes.length}%`,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
            {viewModes.map((mode) => (
              <motion.button
                key={mode}
                onClick={() => setViewMode(mode)}
                style={{ flex: 1, padding: '12px 24px', borderRadius: 12, background: 'transparent',
                  border: 'none', color: viewMode === mode ? '#fff' : '#888', fontSize: '0.9rem',
                  fontWeight: 600, cursor: 'pointer', position: 'relative', zIndex: 1,
                  textTransform: 'capitalize' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {mode === 'grid' && '▦'} {mode === 'list' && '☰'} {mode === 'map' && '🗺️'}
                <span style={{ marginLeft: 8 }}>{mode}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Chips */}
        <div style={{ marginBottom: 30 }}>
          <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: 16,
            textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>
            Themes (Multi-select)
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {themes.map((theme) => (
              <motion.button
                key={theme}
                onClick={() => {
                  setSelectedThemes(prev =>
                    prev.includes(theme) ? prev.filter(t => t !== theme) : [...prev, theme]
                  );
                }}
                style={{ padding: '10px 18px', borderRadius: 20,
                  background: selectedThemes.includes(theme)
                    ? 'linear-gradient(135deg, #667eea, #764ba2)'
                    : 'rgba(255,255,255,0.05)',
                  border: selectedThemes.includes(theme) ? 'none' : '1px solid rgba(255,255,255,0.1)',
                  color: '#fff', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {selectedThemes.includes(theme) && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ fontSize: '0.8rem' }}>
                    ✓
                  </motion.span>
                )}
                {theme}
              </motion.button>
            ))}
          </div>
          <motion.div
            key={selectedThemes.join(',')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ marginTop: 12, fontSize: '0.85rem', color: '#888' }}
          >
            Selected: {selectedThemes.join(', ')}
          </motion.div>
        </div>

        {/* Toggle Switches */}
        <div>
          <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: 16,
            textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>
            Settings
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {Object.entries({ notifications: { label: 'Notifications', icon: '🔔' },
              autoSave: { label: 'Auto Save', icon: '💾' } }).map(([key, { label, icon }]) => (
              <motion.div
                key={key}
                style={{ padding: 16, borderRadius: 12, background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.05)', display: 'flex',
                  alignItems: 'center', justifyContent: 'space-between' }}
                whileHover={{ background: 'rgba(255,255,255,0.05)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: '1.2rem' }}>{icon}</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#fff' }}>{label}</span>
                </div>
                <motion.button
                  onClick={() => setToggles(prev => ({ ...prev, [key]: !prev[key] }))}
                  style={{ width: 52, height: 28, borderRadius: 14,
                    background: toggles[key] ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.1)',
                    border: 'none', cursor: 'pointer', position: 'relative', padding: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    style={{ position: 'absolute', left: 2, top: 2, width: 24, height: 24,
                      borderRadius: '50%', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
                    animate={{ x: toggles[key] ? 24 : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
