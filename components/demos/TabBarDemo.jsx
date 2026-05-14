'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function TabBarDemo() {
  const [activeTab, setActiveTab] = React.useState('overview');
  const [indicatorStyle, setIndicatorStyle] = React.useState({});

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'reports', label: 'Reports', icon: '📄' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const tabRefs = React.useRef({});

  React.useEffect(() => {
    if (tabRefs.current[activeTab]) {
      const tab = tabRefs.current[activeTab];
      setIndicatorStyle({
        left: tab.offsetLeft,
        width: tab.offsetWidth,
      });
    }
  }, [activeTab]);

  const contentMap = {
    overview: {
      title: 'Overview',
      description: 'Get a comprehensive view of your entire operation at a glance. Key metrics, recent activity, and important updates are all here.',
      stats: [
        { label: 'Total Users', value: '24,521', change: '+12%' },
        { label: 'Revenue', value: '$89,432', change: '+8%' },
        { label: 'Active Projects', value: '156', change: '+3' },
      ],
    },
    analytics: {
      title: 'Analytics',
      description: 'Deep dive into your data with powerful analytics tools. Track trends, analyze patterns, and make data-driven decisions.',
      stats: [
        { label: 'Page Views', value: '1.2M', change: '+15%' },
        { label: 'Conversion Rate', value: '3.2%', change: '+0.4%' },
        { label: 'Avg. Session', value: '4m 32s', change: '+12s' },
      ],
    },
    reports: {
      title: 'Reports',
      description: 'Generate, customize, and export detailed reports. Schedule automated reports and share insights with your team.',
      stats: [
        { label: 'Reports Generated', value: '89', change: '+7' },
        { label: 'Scheduled', value: '12', change: '+2' },
        { label: 'Shared', value: '34', change: '+5' },
      ],
    },
    settings: {
      title: 'Settings',
      description: 'Configure your workspace, manage permissions, set preferences, and customize every aspect of your experience.',
      stats: [
        { label: 'Team Members', value: '24', change: '+3' },
        { label: 'Integrations', value: '8', change: '+1' },
        { label: 'Workflows', value: '15', change: '+2' },
      ],
    },
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30, position: 'relative' }}>
      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: '20%', left: '30%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '40%', right: '25%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none', zIndex: 0 }} />

      <h2 className="demo-title">Tab Bar</h2>
      <p className="demo-subtitle">
        Animated tab navigation with smooth indicator transitions, icons, and dynamic content panels.
      </p>

      <motion.div
        className="tabbar-container"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Tabs */}
        <div className="tabbar-tabs">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              ref={(el) => (tabRefs.current[tab.id] = el)}
              className={`tabbar-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              style={{ position: 'relative' }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </div>
          ))}

          {/* Animated Indicator */}
          <motion.div
            className="tabbar-indicator"
            initial={false}
            animate={indicatorStyle}
            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
          />
        </div>

        {/* Content */}
        <div className="tabbar-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <h3>{contentMap[activeTab].title}</h3>
              <p style={{ marginBottom: 30 }}>{contentMap[activeTab].description}</p>

              {/* Stats Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: 20,
                }}
              >
                {contentMap[activeTab].stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    style={{
                      padding: 24,
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: 12,
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                    whileHover={{
                      scale: 1.05,
                      borderColor: 'rgba(102, 126, 234, 0.5)',
                    }}
                  >
                    <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: 8 }}>
                      {stat.label}
                    </div>
                    <div
                      style={{
                        fontSize: '1.8rem',
                        fontWeight: 700,
                        marginBottom: 8,
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {stat.value}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#22c55e' }}>
                      {stat.change}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
