'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function SettingsPanelDemo() {
  const [settings, setSettings] = React.useState({
    notifications: true,
    darkMode: true,
    autoSave: false,
    soundEnabled: true,
    fontSize: 14,
    volume: 75,
    opacity: 100,
  });

  const [isSaving, setIsSaving] = React.useState(false);
  const [saveSuccess, setSaveSuccess] = React.useState(false);

  const sections = [
    {
      id: 'general',
      title: 'General',
      icon: '⚙️',
      settings: [
        { key: 'notifications', type: 'toggle', label: 'Enable Notifications', description: 'Receive alerts and updates' },
        { key: 'darkMode', type: 'toggle', label: 'Dark Mode', description: 'Use dark theme' },
        { key: 'autoSave', type: 'toggle', label: 'Auto Save', description: 'Automatically save changes' },
      ],
    },
    {
      id: 'appearance',
      title: 'Appearance',
      icon: '🎨',
      settings: [
        { key: 'fontSize', type: 'slider', label: 'Font Size', min: 10, max: 24, unit: 'px' },
        { key: 'opacity', type: 'slider', label: 'Panel Opacity', min: 50, max: 100, unit: '%' },
      ],
    },
    {
      id: 'sound',
      title: 'Sound',
      icon: '🔊',
      settings: [
        { key: 'soundEnabled', type: 'toggle', label: 'Sound Effects', description: 'Play sounds for interactions' },
        { key: 'volume', type: 'slider', label: 'Master Volume', min: 0, max: 100, unit: '%' },
      ],
    },
  ];

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSlider = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setSaveSuccess(false);

    // Simulate save
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  return (
    <>
      <h2 className="demo-title">Settings Panel</h2>
      <p className="demo-subtitle">Customizable settings with toggles, sliders, save functionality, and smooth animations.</p>
      <div className="demo-area" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30 }}>
      <motion.div
        style={{
          width: 900,
          height: 700,
          background: 'rgba(20, 20, 30, 0.95)',
          borderRadius: 24,
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        {/* Header */}
        <div style={{
          padding: '30px 40px',
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}>
          <div style={{ fontSize: '2rem', marginBottom: 8 }}>Settings</div>
          <div style={{ fontSize: '0.95rem', color: '#888' }}>Customize your experience</div>
        </div>

        {/* Settings Content */}
        <div style={{ flex: 1, padding: 40, overflow: 'auto' }}>
          {sections.map((section) => (
            <motion.div
              key={section.id}
              style={{
                marginBottom: 40,
                padding: 25,
                borderRadius: 16,
                background: 'rgba(40, 40, 50, 0.6)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sections.indexOf(section) * 0.1 }}
            >
              {/* Section Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 25 }}>
                <div style={{ fontSize: '1.8rem' }}>{section.icon}</div>
                <div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>
                    {section.title}
                  </div>
                </div>
              </div>

              {/* Settings */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {section.settings.map((setting) => (
                  <div key={setting.key}>
                    {setting.type === 'toggle' ? (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '15px 20px',
                        borderRadius: 12,
                        background: 'rgba(0,0,0,0.2)',
                        transition: 'all 0.3s',
                      }}>
                        <div>
                          <div style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: 4 }}>
                            {setting.label}
                          </div>
                          {setting.description && (
                            <div style={{ fontSize: '0.85rem', color: '#888' }}>
                              {setting.description}
                            </div>
                          )}
                        </div>
                        <motion.button
                          onClick={() => handleToggle(setting.key)}
                          style={{
                            width: 56,
                            height: 32,
                            borderRadius: 16,
                            background: settings[setting.key] ? '#667eea' : 'rgba(255,255,255,0.1)',
                            border: 'none',
                            cursor: 'pointer',
                            position: 'relative',
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <motion.div
                            style={{
                              width: 24,
                              height: 24,
                              borderRadius: '50%',
                              background: '#fff',
                              position: 'absolute',
                              top: 4,
                              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                            }}
                            animate={{ left: settings[setting.key] ? 28 : 4 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          />
                        </motion.button>
                      </div>
                    ) : (
                      <div style={{
                        padding: '15px 20px',
                        borderRadius: 12,
                        background: 'rgba(0,0,0,0.2)',
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
                          <div>
                            <div style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: 4 }}>
                              {setting.label}
                            </div>
                          </div>
                          <div style={{
                            padding: '6px 14px',
                            borderRadius: 8,
                            background: 'rgba(102, 126, 234, 0.2)',
                            border: '1px solid rgba(102, 126, 234, 0.4)',
                            color: '#667eea',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                          }}>
                            {settings[setting.key]}{setting.unit}
                          </div>
                        </div>
                        <input
                          type="range"
                          min={setting.min}
                          max={setting.max}
                          value={settings[setting.key]}
                          onChange={(e) => handleSlider(setting.key, parseInt(e.target.value))}
                          style={{
                            width: '100%',
                            height: 6,
                            borderRadius: 3,
                            background: 'rgba(255,255,255,0.1)',
                            outline: 'none',
                            WebkitAppearance: 'none',
                            cursor: 'pointer',
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Actions */}
        <div style={{
          padding: '25px 40px',
          background: 'rgba(10, 10, 20, 0.95)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 15,
        }}>
          <motion.button
            style={{
              padding: '14px 32px',
              borderRadius: 12,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Reset
          </motion.button>
          <motion.button
            onClick={handleSave}
            style={{
              padding: '14px 32px',
              borderRadius: 12,
              background: isSaving
                ? 'rgba(102, 126, 234, 0.5)'
                : saveSuccess
                ? 'rgba(67, 233, 123, 0.5)'
                : 'linear-gradient(135deg, #667eea, #764ba2)',
              border: 'none',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              minWidth: 140,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isSaving ? (
              <>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  ⚡
                </motion.span>
                Saving...
              </>
            ) : saveSuccess ? (
              <>
                <span>✓</span>
                Saved!
              </>
            ) : (
              'Save Changes'
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
    </>
  );
}
