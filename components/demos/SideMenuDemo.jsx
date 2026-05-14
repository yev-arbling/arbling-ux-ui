'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function SideMenuDemo() {
  const [activeSection, setActiveSection] = React.useState('dashboard');
  const [expandedSections, setExpandedSections] = React.useState(['workspace', 'analytics']);
  const [hoveredItem, setHoveredItem] = React.useState(null);

  const menuSections = [
    { id: 'workspace', title: 'Workspace', icon: '🏢', items: [
        { id: 'dashboard', label: 'Dashboard', icon: '📊', badge: null, shortcut: '⌘D' },
        { id: 'projects', label: 'Projects', icon: '📁', badge: '12', shortcut: '⌘P' },
        { id: 'tasks', label: 'Tasks', icon: '✓', badge: '8', shortcut: '⌘T' },
        { id: 'team', label: 'Team', icon: '👥', badge: null, shortcut: '⌘U' },
        { id: 'calendar', label: 'Calendar', icon: '📅', badge: '3', shortcut: null },
      ] },
    { id: 'analytics', title: 'Analytics', icon: '📈', items: [
        { id: 'reports', label: 'Reports', icon: '📋', badge: '5', shortcut: null },
        { id: 'insights', label: 'Insights', icon: '💡', badge: 'New', shortcut: null },
        { id: 'metrics', label: 'Metrics', icon: '📊', badge: null, shortcut: null },
        { id: 'performance', label: 'Performance', icon: '⚡', badge: null, shortcut: null },
      ] },
    { id: 'tools', title: 'Tools', icon: '🛠️', items: [
        { id: 'automation', label: 'Automation', icon: '🤖', badge: '2', shortcut: null },
        { id: 'integrations', label: 'Integrations', icon: '🔗', badge: null, shortcut: null },
        { id: 'api', label: 'API', icon: '⚙️', badge: null, shortcut: null },
      ] },
    { id: 'settings', title: 'Settings', icon: '⚙️', items: [
        { id: 'profile', label: 'Profile', icon: '👤', badge: null, shortcut: null },
        { id: 'preferences', label: 'Preferences', icon: '🎨', badge: null, shortcut: null },
        { id: 'security', label: 'Security', icon: '🔒', badge: '1', shortcut: null },
        { id: 'billing', label: 'Billing', icon: '💳', badge: null, shortcut: null },
      ] },
  ];

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId]);
  };

  const contentMap = {
    dashboard: { title: 'Dashboard', description: 'Welcome back! Here is what is happening today. You have 3 active tasks and 2 upcoming deadlines.', stats: [ { label: 'Active Projects', value: '12', trend: '+2', color: '#667eea' }, { label: 'Team Members', value: '24', trend: '+4', color: '#764ba2' }, { label: 'Completion Rate', value: '87%', trend: '+5%', color: '#f093fb' } ] },
    projects: { title: 'Projects', description: 'Manage and track all your ongoing projects. Create new projects, assign team members, and monitor progress.', stats: [ { label: 'Total', value: '12', trend: '+2', color: '#667eea' }, { label: 'In Progress', value: '8', trend: '+1', color: '#764ba2' }, { label: 'Completed', value: '142', trend: '+8', color: '#f093fb' } ] },
    tasks: { title: 'Tasks', description: 'Track and manage all your tasks across projects. Stay organized with priorities and deadlines.', stats: [ { label: 'Open', value: '8', trend: '-3', color: '#f87171' }, { label: 'Done Today', value: '12', trend: '+4', color: '#4ade80' }, { label: 'Overdue', value: '2', trend: '-1', color: '#f87171' } ] },
    team: { title: 'Team', description: 'View your team members, their roles, and assignments. Invite new collaborators.', stats: [ { label: 'Team Size', value: '24', trend: '+4', color: '#667eea' }, { label: 'Active Now', value: '16', trend: '+2', color: '#764ba2' }, { label: 'Departments', value: '5', trend: '0', color: '#f093fb' } ] },
    calendar: { title: 'Calendar', description: 'Manage your schedule, meetings, and important dates. View upcoming events.', stats: [ { label: 'Today', value: '3', trend: '0', color: '#667eea' }, { label: 'This Week', value: '12', trend: '+3', color: '#764ba2' }, { label: 'Meetings', value: '8', trend: '+2', color: '#f093fb' } ] },
    reports: { title: 'Reports', description: 'Generate detailed reports on project progress and team performance.', stats: [ { label: 'Available', value: '5', trend: '+1', color: '#667eea' }, { label: 'Generated', value: '48', trend: '+12', color: '#764ba2' }, { label: 'Scheduled', value: '3', trend: '0', color: '#f093fb' } ] },
    insights: { title: 'Insights', description: 'AI-powered insights to help you make better decisions and optimize workflow.', stats: [ { label: 'New', value: '7', trend: '+3', color: '#667eea' }, { label: 'Accuracy', value: '94%', trend: '+2%', color: '#764ba2' }, { label: 'Actions', value: '23', trend: '+8', color: '#f093fb' } ] },
    metrics: { title: 'Metrics', description: 'Track key performance indicators and monitor team productivity.', stats: [ { label: 'KPIs', value: '18', trend: '+2', color: '#667eea' }, { label: 'Avg Perf', value: '92%', trend: '+3%', color: '#764ba2' }, { label: 'Goals Met', value: '15/18', trend: '+2', color: '#f093fb' } ] },
    performance: { title: 'Performance', description: 'Monitor system and team performance. Analyze efficiency and speed.', stats: [ { label: 'Efficiency', value: '89%', trend: '+4%', color: '#667eea' }, { label: 'Response', value: '1.2s', trend: '-0.3s', color: '#4ade80' }, { label: 'Uptime', value: '99.9%', trend: '0%', color: '#f093fb' } ] },
    automation: { title: 'Automation', description: 'Create and manage automated workflows. Save time automating tasks.', stats: [ { label: 'Workflows', value: '2', trend: '+1', color: '#667eea' }, { label: 'Automated', value: '156', trend: '+45', color: '#764ba2' }, { label: 'Time Saved', value: '24h', trend: '+8h', color: '#f093fb' } ] },
    integrations: { title: 'Integrations', description: 'Connect with your favorite tools. Streamline workflow with integrations.', stats: [ { label: 'Connected', value: '8', trend: '+2', color: '#667eea' }, { label: 'Available', value: '50+', trend: '+5', color: '#764ba2' }, { label: 'Synced', value: '2.4k', trend: '+342', color: '#f093fb' } ] },
    api: { title: 'API', description: 'Access our powerful API to build custom integrations.', stats: [ { label: 'Keys', value: '3', trend: '+1', color: '#667eea' }, { label: 'Requests', value: '1.2k', trend: '+234', color: '#764ba2' }, { label: 'Rate Limit', value: '10k/h', trend: '0', color: '#f093fb' } ] },
    profile: { title: 'Profile', description: 'Update your personal information and customize your experience.', stats: [ { label: 'Views', value: '142', trend: '+23', color: '#667eea' }, { label: 'Connections', value: '89', trend: '+12', color: '#764ba2' }, { label: 'Endorsements', value: '34', trend: '+7', color: '#f093fb' } ] },
    preferences: { title: 'Preferences', description: 'Customize the application with themes and notifications.', stats: [ { label: 'Theme', value: 'Dark', trend: '0', color: '#667eea' }, { label: 'Notifications', value: 'On', trend: '0', color: '#764ba2' }, { label: 'Language', value: 'EN', trend: '0', color: '#f093fb' } ] },
    security: { title: 'Security', description: 'Manage your security settings and login sessions.', stats: [ { label: '2FA', value: 'Active', trend: '0', color: '#667eea' }, { label: 'Sessions', value: '1', trend: '0', color: '#764ba2' }, { label: 'Last Login', value: '2h ago', trend: '0', color: '#f093fb' } ] },
    billing: { title: 'Billing', description: 'View your subscription details and payment history.', stats: [ { label: 'Plan', value: 'Pro', trend: '0', color: '#667eea' }, { label: 'Next Bill', value: '14d', trend: '-1d', color: '#f093fb' }, { label: 'This Month', value: '$49', trend: '0', color: '#764ba2' } ] },
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30, position: 'relative' }}>
      <div style={{ position: 'absolute', top: '15%', left: '10%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(102, 126, 234, 0.12) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '20%', right: '15%', width: 250, height: 250, background: 'radial-gradient(circle, rgba(118, 75, 162, 0.1) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none', zIndex: 0 }} />
      <h2 className="demo-title">Side Menu</h2>
      <p className="demo-subtitle">Production-grade collapsible sidebar with sections, icons, badges, keyboard shortcuts, and smooth content transitions.</p>

      <motion.div className="sidemenu-container" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200 }} style={{ position: 'relative', zIndex: 1 }}>
        <div className="sidemenu-sidebar">
          <motion.div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 14px', marginBottom: 20, background: 'rgba(102, 126, 234, 0.1)', borderRadius: 12, border: '1px solid rgba(102, 126, 234, 0.2)' }} whileHover={{ scale: 1.02, borderColor: 'rgba(102, 126, 234, 0.4)' }} transition={{ type: 'spring', stiffness: 300 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #667eea, #764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>👤</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>Alex Morgan</div>
              <div style={{ fontSize: '0.75rem', color: '#888' }}>Product Manager</div>
            </div>
          </motion.div>

          {menuSections.map((section) => (
            <div key={section.id} className="sidemenu-section">
              <motion.div className={`sidemenu-section-header ${expandedSections.includes(section.id) ? 'expanded' : ''}`} onClick={() => toggleSection(section.id)} whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.08)' }} whileTap={{ scale: 0.98 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: '1rem' }}>{section.icon}</span>
                  <span>{section.title}</span>
                </div>
                <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" animate={{ rotate: expandedSections.includes(section.id) ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <polyline points="6 9 12 15 18 9" />
                </motion.svg>
              </motion.div>

              <AnimatePresence>
                {expandedSections.includes(section.id) && (
                  <motion.div className="sidemenu-items" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
                    {section.items.map((item, index) => (
                      <motion.div key={item.id} className={`sidemenu-item ${activeSection === item.id ? 'active' : ''}`} onClick={() => setActiveSection(item.id)} onMouseEnter={() => setHoveredItem(item.id)} onMouseLeave={() => setHoveredItem(null)} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }} whileHover={{ x: 8, backgroundColor: activeSection === item.id ? 'rgba(102, 126, 234, 0.25)' : 'rgba(102, 126, 234, 0.15)' }} whileTap={{ scale: 0.97 }}>
                        <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                        <span style={{ flex: 1 }}>{item.label}</span>
                        {item.shortcut && hoveredItem === item.id && (
                          <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} style={{ fontSize: '0.7rem', color: '#888', padding: '2px 6px', background: 'rgba(255,255,255,0.05)', borderRadius: 4, border: '1px solid rgba(255,255,255,0.1)' }}>
                            {item.shortcut}
                          </motion.span>
                        )}
                        {item.badge && hoveredItem !== item.id && (
                          <motion.span className="sidemenu-badge" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
                            {item.badge}
                          </motion.span>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="sidemenu-content">
          <AnimatePresence mode="wait">
            <motion.div key={activeSection} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
              <motion.h2 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>{contentMap[activeSection]?.title}</motion.h2>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>{contentMap[activeSection]?.description}</motion.p>

              {contentMap[activeSection]?.stats && (
                <motion.div style={{ marginTop: 30, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  {contentMap[activeSection].stats.map((stat, i) => (
                    <motion.div key={i} style={{ padding: 20, background: 'rgba(255,255,255,0.05)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.05 }} whileHover={{ scale: 1.03, borderColor: 'rgba(102, 126, 234, 0.5)', y: -4 }}>
                      <motion.div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: `linear-gradient(135deg, ${stat.color}15, transparent)`, opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.3 }} />
                      <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.label}</div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
                          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#fff' }}>{stat.value}</div>
                          {stat.trend !== '0' && (
                            <motion.div style={{ fontSize: '0.75rem', fontWeight: 600, color: stat.trend.startsWith('+') ? '#4ade80' : (stat.trend.startsWith('-') ? (stat.trend.includes('-0.') || stat.trend === '-1d' ? '#888' : '#f87171') : '#888'), padding: '2px 6px', background: stat.trend.startsWith('+') ? 'rgba(74, 222, 128, 0.15)' : (stat.trend.startsWith('-') ? (stat.trend.includes('-0.') || stat.trend === '-1d' ? 'rgba(255,255,255,0.05)' : 'rgba(248, 113, 113, 0.15)') : 'rgba(255,255,255,0.05)'), borderRadius: 4 }} initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ delay: 0.3 + i * 0.05, type: 'spring' }}>
                              {stat.trend}
                            </motion.div>
                          )}
                        </div>
                        <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
                          <motion.div style={{ height: '100%', background: stat.color, borderRadius: 2 }} initial={{ width: 0 }} animate={{ width: `${65 + i * 10}%` }} transition={{ delay: 0.4 + i * 0.05, duration: 0.6, ease: 'easeOut' }} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
