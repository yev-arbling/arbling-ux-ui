'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function TimelineViewDemo() {
  const [events] = React.useState([
    {
      id: 1,
      title: 'Project Kickoff',
      date: 'Jan 15, 2024',
      time: '10:00 AM',
      icon: '🚀',
      color: '#667eea',
      status: 'completed',
      description: 'Initiated the project with stakeholder alignment and team onboarding. Defined project scope, success metrics, and delivery timeline.',
      team: ['Sarah Chen', 'Mike Rodriguez', 'Emma Wilson'],
      deliverables: ['Project Charter', 'Resource Plan', 'Risk Assessment'],
      duration: '2 hours',
      location: 'Conference Room A'
    },
    {
      id: 2,
      title: 'Design Sprint',
      date: 'Jan 20, 2024',
      time: '2:00 PM',
      icon: '🎨',
      color: '#f093fb',
      status: 'completed',
      description: 'Collaborative design workshop with UX team. Created wireframes, user flows, and interactive prototypes for core features.',
      team: ['Jessica Park', 'David Kim', 'Alex Turner'],
      deliverables: ['Wireframes', 'UI Mockups', 'Design System'],
      duration: '4 hours',
      location: 'Design Studio'
    },
    {
      id: 3,
      title: 'Development Phase',
      date: 'Feb 1, 2024',
      time: '9:00 AM',
      icon: '💻',
      color: '#4facfe',
      status: 'in-progress',
      description: 'Building core features with React, Node.js, and PostgreSQL. Implementing authentication, dashboard, and API integrations.',
      team: ['Carlos Santos', 'Nina Patel', 'Jordan Lee', 'Maya Johnson'],
      deliverables: ['Auth System', 'Dashboard', 'API Layer', 'Database Schema'],
      duration: '2 weeks',
      location: 'Remote'
    },
    {
      id: 4,
      title: 'QA Testing',
      date: 'Feb 15, 2024',
      time: '11:00 AM',
      icon: '🔍',
      color: '#43e97b',
      status: 'upcoming',
      description: 'Comprehensive testing phase including unit tests, integration tests, and end-to-end automation. Security audit and performance optimization.',
      team: ['Rachel Adams', 'Tom Harrison'],
      deliverables: ['Test Suite', 'Bug Reports', 'Performance Metrics'],
      duration: '1 week',
      location: 'QA Lab'
    },
    {
      id: 5,
      title: 'Beta Release',
      date: 'Feb 22, 2024',
      time: '3:00 PM',
      icon: '🚢',
      color: '#ffd93d',
      status: 'upcoming',
      description: 'Limited release to select beta users for feedback. Monitoring analytics, gathering user insights, and iterating based on real-world usage.',
      team: ['Lisa Wang', 'Marcus Brown'],
      deliverables: ['Beta Build', 'Analytics Dashboard', 'Feedback Form'],
      duration: '1 week',
      location: 'Production Environment'
    },
    {
      id: 6,
      title: 'Product Launch',
      date: 'Mar 1, 2024',
      time: '10:00 AM',
      icon: '🎉',
      color: '#ff6b6b',
      status: 'upcoming',
      description: 'Official public launch with marketing campaign, press release, and customer onboarding. Full production deployment with monitoring and support.',
      team: ['All Teams'],
      deliverables: ['Production Release', 'Marketing Materials', 'Documentation'],
      duration: '1 day',
      location: 'Worldwide'
    },
  ]);
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [hoveredEvent, setHoveredEvent] = React.useState(null);
  const [filter, setFilter] = React.useState('all');

  const filteredEvents = filter === 'all' ? events : events.filter(e => e.status === filter);
  const completedCount = events.filter(e => e.status === 'completed').length;
  const progressPercentage = (completedCount / events.length) * 100;

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return '#43e97b';
      case 'in-progress': return '#4facfe';
      case 'upcoming': return '#888';
      default: return '#666';
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30, position: 'relative' }}>
      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: '5%', left: '20%', width: 450, height: 450, background: 'radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '15%', right: '15%', width: 350, height: 350, background: 'radial-gradient(circle, rgba(240, 147, 251, 0.12) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none', zIndex: 0 }} />

      <motion.div
        style={{ width: 1300, height: 750, background: 'rgba(20, 20, 30, 0.95)', borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', padding: 40, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1, boxShadow: '0 20px 80px rgba(0,0,0,0.4)' }}
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        {/* Header with filters and progress */}
        <div style={{ marginBottom: 30 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: 0, background: 'linear-gradient(135deg, #4facfe, #00f2fe)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Project Timeline</h2>
              <p style={{ margin: '5px 0 0', fontSize: '0.95rem', color: '#888' }}>Track milestones, deliverables, and team progress</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {['all', 'completed', 'in-progress', 'upcoming'].map(status => (
                <motion.button
                  key={status}
                  onClick={() => setFilter(status)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 12,
                    border: 'none',
                    background: filter === status ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.05)',
                    color: filter === status ? '#fff' : '#888',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textTransform: 'capitalize'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {status}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, height: 8, overflow: 'hidden', position: 'relative' }}>
            <motion.div
              style={{ height: '100%', background: 'linear-gradient(90deg, #667eea, #4facfe, #43e97b)', borderRadius: 12 }}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
            <div style={{ position: 'absolute', top: -25, right: 0, fontSize: '0.75rem', color: '#43e97b', fontWeight: 600 }}>
              {completedCount}/{events.length} completed
            </div>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', gap: 35, overflowY: 'auto', paddingRight: 10 }}>
          {/* Timeline track */}
          <div style={{ position: 'relative', width: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, flexShrink: 0 }}>
            <motion.div
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', background: 'linear-gradient(180deg, #667eea, #f093fb, #4facfe, #43e97b, #ffd93d, #ff6b6b)', borderRadius: 3, boxShadow: '0 0 20px rgba(79, 172, 254, 0.3)' }}
              initial={{ height: 0 }}
              animate={{ height: `${progressPercentage}%` }}
              transition={{ duration: 2, ease: 'easeOut' }}
            />
            {filteredEvents.map((event, index) => {
              const eventIndex = events.findIndex(e => e.id === event.id);
              const topPosition = (eventIndex / events.length) * 100;
              return (
                <React.Fragment key={event.id}>
                  <motion.div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: hoveredEvent === event.id ? 28 : 24,
                      height: hoveredEvent === event.id ? 28 : 24,
                      borderRadius: '50%',
                      background: event.status === 'completed' ? event.color : 'rgba(255,255,255,0.1)',
                      border: `3px solid ${event.color}`,
                      cursor: 'pointer',
                      zIndex: 10,
                      top: `${topPosition}%`,
                      boxShadow: selectedEvent?.id === event.id ? `0 0 20px ${event.color}` : 'none'
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: eventIndex * 0.1, type: 'spring', stiffness: 300 }}
                    whileHover={{ scale: 1.4 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedEvent(selectedEvent?.id === event.id ? null : event)}
                    onHoverStart={() => setHoveredEvent(event.id)}
                    onHoverEnd={() => setHoveredEvent(null)}
                  >
                    {event.status === 'in-progress' && (
                      <motion.div
                        style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: `2px solid ${event.color}` }}
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                </React.Fragment>
              );
            })}
          </div>

          {/* Event cards */}
          <div style={{ flex: 0.6, display: 'flex', flexDirection: 'column', gap: 18 }}>
            {filteredEvents.map((event, index) => {
              const eventIndex = events.findIndex(e => e.id === event.id);
              return (
                <motion.div
                  key={event.id}
                  style={{
                    padding: 22,
                    borderRadius: 16,
                    background: selectedEvent?.id === event.id ? `linear-gradient(135deg, ${event.color}15, rgba(15, 15, 25, 0.95))` : 'rgba(15, 15, 25, 0.9)',
                    border: selectedEvent?.id === event.id ? `2px solid ${event.color}` : '1px solid rgba(255,255,255,0.08)',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: eventIndex * 0.08, type: 'spring', stiffness: 150 }}
                  whileHover={{ scale: 1.02, borderColor: event.color, boxShadow: `0 8px 24px ${event.color}20` }}
                  onClick={() => setSelectedEvent(selectedEvent?.id === event.id ? null : event)}
                >
                  {/* Gradient overlay */}
                  <div style={{ position: 'absolute', top: 0, right: 0, width: 120, height: 120, background: `radial-gradient(circle, ${event.color}08 0%, transparent 70%)`, pointerEvents: 'none' }} />

                  <div style={{ display: 'flex', gap: 15, position: 'relative' }}>
                    <motion.div
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 14,
                        background: `linear-gradient(135deg, ${event.color}, ${event.color}cc)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        flexShrink: 0,
                        boxShadow: `0 4px 12px ${event.color}40`
                      }}
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.4 }}
                    >
                      {event.icon}
                    </motion.div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                        <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>{event.title}</h3>
                        <div style={{
                          padding: '4px 12px',
                          borderRadius: 20,
                          background: `${getStatusColor(event.status)}22`,
                          color: getStatusColor(event.status),
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          border: `1px solid ${getStatusColor(event.status)}40`
                        }}>
                          {event.status}
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 8, fontSize: '0.8rem', color: '#999' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>📅 {event.date}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>⏰ {event.time}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>⏱️ {event.duration}</div>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#aaa', lineHeight: 1.5 }}>
                        {event.description.length > 100 && selectedEvent?.id !== event.id
                          ? event.description.substring(0, 100) + '...'
                          : event.description}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            {selectedEvent ? (
              <motion.div
                key="detail"
                initial={{ opacity: 0, x: 40, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 200 }}
                style={{
                  flex: 0.4,
                  padding: 28,
                  borderRadius: 16,
                  background: `linear-gradient(135deg, ${selectedEvent.color}08, rgba(15, 15, 25, 0.95))`,
                  border: `1px solid ${selectedEvent.color}60`,
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: `0 12px 40px ${selectedEvent.color}20`
                }}
              >
                <motion.div
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 18,
                    background: `linear-gradient(135deg, ${selectedEvent.color}, ${selectedEvent.color}cc)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    marginBottom: 20,
                    boxShadow: `0 8px 24px ${selectedEvent.color}50`
                  }}
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {selectedEvent.icon}
                </motion.div>

                <h2 style={{ margin: '0 0 8px', fontSize: '1.6rem', fontWeight: 700, color: selectedEvent.color }}>
                  {selectedEvent.title}
                </h2>

                <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
                  <div style={{ padding: '6px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.05)', fontSize: '0.8rem', color: '#999' }}>
                    📍 {selectedEvent.location}
                  </div>
                  <div style={{ padding: '6px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.05)', fontSize: '0.8rem', color: '#999' }}>
                    ⏱️ {selectedEvent.duration}
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', marginBottom: 8, letterSpacing: 1 }}>
                    Description
                  </div>
                  <div style={{ padding: 16, borderRadius: 12, background: 'rgba(255,255,255,0.03)', fontSize: '0.9rem', color: '#ccc', lineHeight: 1.6, border: '1px solid rgba(255,255,255,0.05)' }}>
                    {selectedEvent.description}
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', marginBottom: 10, letterSpacing: 1 }}>
                    Team Members
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {selectedEvent.team.map((member, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        style={{
                          padding: '8px 14px',
                          borderRadius: 10,
                          background: `${selectedEvent.color}15`,
                          border: `1px solid ${selectedEvent.color}30`,
                          fontSize: '0.85rem',
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6
                        }}
                      >
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: selectedEvent.color }} />
                        {member}
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', marginBottom: 10, letterSpacing: 1 }}>
                    Deliverables
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {selectedEvent.deliverables.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        style={{
                          padding: '10px 14px',
                          borderRadius: 10,
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          fontSize: '0.85rem',
                          color: '#ddd',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10
                        }}
                      >
                        <div style={{ fontSize: '1.1rem' }}>✓</div>
                        {item}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  flex: 0.4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 40,
                  borderRadius: 16,
                  background: 'rgba(15, 15, 25, 0.5)',
                  border: '2px dashed rgba(255,255,255,0.1)',
                  color: '#666',
                  textAlign: 'center',
                  gap: 15
                }}
              >
                <motion.div
                  style={{ fontSize: '4rem' }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  📋
                </motion.div>
                <div style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: 8, color: '#888' }}>Select an Event</div>
                <div style={{ fontSize: '0.95rem', color: '#666', lineHeight: 1.5 }}>
                  Click on any event card to view<br/>detailed information
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
