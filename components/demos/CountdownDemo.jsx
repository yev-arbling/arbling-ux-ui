'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function CountdownDemo() {
  const [events, setEvents] = React.useState([
    { id: 1, name: 'New Year', date: '2025-01-01', color: '#667eea' },
    { id: 2, name: 'Product Launch', date: '2025-03-15', color: '#f093fb' },
    { id: 3, name: 'Birthday', date: '2025-06-20', color: '#43e97b' },
  ]);
  const [selectedEvent, setSelectedEvent] = React.useState(events[0]);
  const [showAddEvent, setShowAddEvent] = React.useState(false);
  const [newEventName, setNewEventName] = React.useState('');
  const [newEventDate, setNewEventDate] = React.useState('');

  const [timeLeft, setTimeLeft] = React.useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  React.useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(selectedEvent.date);
      const now = new Date();
      const diff = target - now;

      if (diff > 0) {
        return {
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedEvent]);

  const addEvent = () => {
    if (newEventName && newEventDate) {
      const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a'];
      setEvents([...events, {
        id: Date.now(),
        name: newEventName,
        date: newEventDate,
        color: colors[events.length % colors.length],
      }]);
      setNewEventName('');
      setNewEventDate('');
      setShowAddEvent(false);
    }
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id));
    if (selectedEvent?.id === id) {
      setSelectedEvent(events[0]);
    }
  };

  const timeUnits = [
    { label: 'Days', value: timeLeft.days, max: 365 },
    { label: 'Hours', value: timeLeft.hours, max: 24 },
    { label: 'Minutes', value: timeLeft.minutes, max: 60 },
    { label: 'Seconds', value: timeLeft.seconds, max: 60 },
  ];

  return (
    <>
      <h2 className="demo-title">Countdown Timer</h2>
      <p className="demo-subtitle">Animated countdown with days, hours, minutes, seconds and flip-style transitions.</p>
      <div className="demo-area" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30 }}>
      {/* Main Countdown */}
      <motion.div
        style={{
          width: 800,
          padding: 50,
          background: 'rgba(20, 20, 30, 0.8)',
          borderRadius: 32,
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        {/* Event Name */}
        <motion.div
          style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            background: `linear-gradient(135deg, ${selectedEvent.color}, #fff)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textAlign: 'center',
            marginBottom: 40,
          }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {selectedEvent.name}
        </motion.div>

        {/* Countdown Display */}
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginBottom: 40 }}>
          {timeUnits.map((unit, i) => (
            <motion.div
              key={unit.label}
              style={{
                flex: 1,
                maxWidth: 160,
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 200 }}
            >
              {/* Circular Progress */}
              <div style={{ position: 'relative', marginBottom: 15 }}>
                <svg width="160" height="160" style={{ transform: 'rotate(-90deg)' }}>
                  {/* Background circle */}
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="8"
                  />
                  {/* Progress circle */}
                  <motion.circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke={selectedEvent.color}
                    strokeWidth="8"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: unit.value / unit.max }}
                    transition={{ duration: 0.5 }}
                    style={{
                      strokeDasharray: 440,
                      strokeDashoffset: 440 * (1 - unit.value / unit.max),
                    }}
                  />
                </svg>

                {/* Number */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  color: selectedEvent.color,
                  fontFamily: 'SF Mono, Monaco, monospace',
                }}>
                  {String(unit.value).padStart(2, '0')}
                </div>
              </div>

              {/* Label */}
              <div style={{
                textAlign: 'center',
                fontSize: '0.9rem',
                color: '#888',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>
                {unit.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Event Selector */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          {events.map((event) => (
            <motion.button
              key={event.id}
              style={{
                padding: '12px 24px',
                borderRadius: 12,
                background: selectedEvent.id === event.id ? `${event.color}20` : 'rgba(255,255,255,0.05)',
                border: selectedEvent.id === event.id ? `1px solid ${event.color}40` : '1px solid rgba(255,255,255,0.1)',
                color: selectedEvent.id === event.id ? event.color : '#888',
                fontWeight: 600,
                cursor: 'pointer',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedEvent(event)}
            >
              {event.name}
            </motion.button>
          ))}

          <motion.button
            style={{
              padding: '12px 24px',
              borderRadius: 12,
              background: 'rgba(102, 126, 234, 0.1)',
              border: '1px solid rgba(102, 126, 234, 0.3)',
              color: '#667eea',
              fontWeight: 600,
              cursor: 'pointer',
            }}
            whileHover={{ scale: 1.05, background: 'rgba(102, 126, 234, 0.2)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddEvent(!showAddEvent)}
          >
            + Add Event
          </motion.button>
        </div>

        {/* Add Event Form */}
        <AnimatePresence>
          {showAddEvent && (
            <motion.div
              style={{
                marginTop: 30,
                padding: 25,
                background: 'rgba(255,255,255,0.03)',
                borderRadius: 16,
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                gap: 15,
              }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <input
                type="text"
                placeholder="Event name..."
                value={newEventName}
                onChange={(e) => setNewEventName(e.target.value)}
                style={{
                  flex: 1,
                  padding: '12px 20px',
                  borderRadius: 12,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                  fontSize: '1rem',
                  outline: 'none',
                }}
              />
              <input
                type="date"
                value={newEventDate}
                onChange={(e) => setNewEventDate(e.target.value)}
                style={{
                  padding: '12px 20px',
                  borderRadius: 12,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                  fontSize: '1rem',
                  outline: 'none',
                  cursor: 'pointer',
                  ...(newEventDate && { colorScheme: 'dark' }),
                }}
              />
              <motion.button
                style={{
                  padding: '12px 30px',
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  border: 'none',
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addEvent}
              >
                Add
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Event List with Delete */}
      <div style={{ display: 'flex', gap: 15, flexWrap: 'wrap', justifyContent: 'center' }}>
        {events.map((event) => (
          <motion.div
            key={event.id}
            style={{
              padding: '15px 25px',
              background: 'rgba(20, 20, 30, 0.8)',
              borderRadius: "50%",
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              backdropFilter: 'blur(10px)',
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 + event.id * 0.1 }}
          >
            <div style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: event.color,
            }} />
            <span style={{ color: '#fff', fontWeight: 500 }}>{event.name}</span>
            <span style={{ color: '#888', fontSize: '0.9rem' }}>
              {new Date(event.date).toLocaleDateString()}
            </span>
            {events.length > 1 && (
              <motion.button
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: 'rgba(250, 112, 154, 0.2)',
                  border: 'none',
                  color: '#fa709a',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => deleteEvent(event.id)}
              >
                ×
              </motion.button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
    </>
  );
}
