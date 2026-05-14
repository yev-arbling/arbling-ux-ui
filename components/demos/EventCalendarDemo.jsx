'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function EventCalendarDemo() {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [events, setEvents] = React.useState({
    '2026-01-22': [
      { id: 1, title: 'Team Standup', time: '10:00 AM', type: 'meeting', color: '#667eea' },
      { id: 2, title: 'Design Review', time: '2:00 PM', type: 'design', color: '#f093fb' },
    ],
    '2026-01-25': [
      { id: 3, title: 'Product Launch', time: '11:00 AM', type: 'milestone', color: '#4facfe' },
    ],
    '2026-01-28': [
      { id: 4, title: 'Quarterly Review', time: '3:00 PM', type: 'meeting', color: '#43e97b' },
    ],
  });
  const [isAddingEvent, setIsAddingEvent] = React.useState(false);
  const [newEvent, setNewEvent] = React.useState({ title: '', time: '', type: 'meeting' });

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentDate);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const selectDate = (day) => {
    const dateKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate({ day, dateKey, events: events[dateKey] || [] });
  };

  const addEvent = () => {
    if (!newEvent.title || !newEvent.time) return;
    const color = { meeting: '#667eea', design: '#f093fb', milestone: '#4facfe' }[newEvent.type];
    const event = { id: Date.now(), title: newEvent.title, time: newEvent.time, type: newEvent.type, color };
    setEvents({ ...events, [selectedDate.dateKey]: [...(events[selectedDate.dateKey] || []), event] });
    setNewEvent({ title: '', time: '', type: 'meeting' });
    setIsAddingEvent(false);
    selectDate(selectedDate.day);
  };

  const hasEvents = (day) => {
    const dateKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events[dateKey]?.length > 0;
  };

  return (
    <>
      <h2 className="demo-title">Event Calendar</h2>
      <p className="demo-subtitle">Interactive calendar with event management, day/week views, and drag-to-create.</p>
      <div className="demo-area" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30, position: 'relative' }}>
      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: '5%', left: '20%', width: 450, height: 450, background: 'radial-gradient(circle, rgba(102, 126, 234, 0.12) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '15%', right: '15%', width: 350, height: 350, background: 'radial-gradient(circle, rgba(240, 147, 251, 0.1) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none', zIndex: 0 }} />

      <motion.div
        style={{
          width: 1100,
          height: 700,
          background: 'rgba(20, 20, 30, 0.9)',
          borderRadius: 24,
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 1,
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        {/* Calendar Section */}
        <div style={{ flex: 1.5, padding: 40, display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 30,
          }}>
            <motion.button
              style={{
                width: 45,
                height: 45,
                borderRadius: 12,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '1.2rem',
                cursor: 'pointer',
              }}
              whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.9 }}
              onClick={prevMonth}
            >
              ←
            </motion.button>

            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: 700,
              margin: 0,
              background: 'linear-gradient(135deg, #f093fb, #4facfe)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>

            <motion.button
              style={{
                width: 45,
                height: 45,
                borderRadius: 12,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '1.2rem',
                cursor: 'pointer',
              }}
              whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.9 }}
              onClick={nextMonth}
            >
              →
            </motion.button>
          </div>

          {/* Day Names */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 10,
            marginBottom: 15,
          }}>
            {dayNames.map(day => (
              <div key={day} style={{
                textAlign: 'center',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#888',
                padding: 10,
              }}>{day}</div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 10,
            flex: 1,
          }}>
            {/* Empty cells for days before first day of month */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} style={{ padding: 10 }} />
            ))}

            {/* Days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isSelected = selectedDate?.day === day;
              const hasEvent = hasEvents(day);
              const isToday = day === 22 && currentDate.getMonth() === 0;

              return (
                <motion.button
                  key={day}
                  style={{
                    padding: 15,
                    borderRadius: 14,
                    background: isSelected
                      ? 'linear-gradient(135deg, #667eea, #764ba2)'
                      : isToday
                        ? 'rgba(102, 126, 234, 0.2)'
                        : 'rgba(255,255,255,0.03)',
                    border: isSelected
                      ? 'none'
                      : isToday
                        ? '1px solid rgba(102, 126, 234, 0.4)'
                        : '1px solid rgba(255,255,255,0.08)',
                    color: isSelected ? '#fff' : '#ccc',
                    fontSize: '0.95rem',
                    fontWeight: isToday ? 700 : 500,
                    cursor: 'pointer',
                    position: 'relative',
                    boxShadow: isSelected ? '0 4px 15px rgba(102, 126, 234, 0.3)' : 'none',
                  }}
                  whileHover={{ scale: 1.05, background: isSelected ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.08)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => selectDate(day)}
                >
                  {day}
                  {hasEvent && (
                    <div style={{
                      position: 'absolute',
                      bottom: 8,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: isSelected ? '#fff' : '#667eea',
                    }} />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Day Detail Panel */}
        <div style={{
          flex: 1,
          background: 'rgba(15, 15, 25, 0.98)',
          borderLeft: '1px solid rgba(255,255,255,0.1)',
          padding: 35,
          display: 'flex',
          flexDirection: 'column',
        }}>
          {selectedDate ? (
            <>
              <div style={{ marginBottom: 30 }}>
                <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>
                  {monthNames[currentDate.getMonth()]} {selectedDate.day}, {currentDate.getFullYear()}
                </div>
                <h3 style={{
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  margin: 0,
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>Events</h3>
              </div>

              <div style={{ flex: 1, overflowY: 'auto', marginBottom: 20 }}>
                <AnimatePresence>
                  {selectedDate.events.length > 0 ? selectedDate.events.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.1 }}
                      style={{
                        padding: 20,
                        borderRadius: 16,
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        marginBottom: 15,
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                      whileHover={{ scale: 1.02, borderColor: event.color }}
                    >
                      <div style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: 4,
                        background: event.color,
                      }} />
                      <div style={{ marginLeft: 12 }}>
                        <div style={{
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          marginBottom: 8,
                          color: event.color,
                        }}>{event.title}</div>
                        <div style={{ fontSize: '0.9rem', color: '#888' }}>{event.time}</div>
                      </div>
                    </motion.div>
                  )) : (
                    <div style={{
                      textAlign: 'center',
                      color: '#666',
                      fontSize: '0.95rem',
                      padding: 40,
                    }}>No events scheduled</div>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                style={{
                  width: '100%',
                  padding: '15px',
                  borderRadius: 14,
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  border: 'none',
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsAddingEvent(true)}
              >
                + Add Event
              </motion.button>

              {isAddingEvent && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    marginTop: 20,
                    padding: 20,
                    borderRadius: 16,
                    background: 'rgba(102, 126, 234, 0.1)',
                    border: '1px solid rgba(102, 126, 234, 0.3)',
                  }}
                >
                  <input
                    type="text"
                    placeholder="Event title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: 10,
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#fff',
                      marginBottom: 12,
                      outline: 'none',
                    }}
                  />
                  <input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: 10,
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#fff',
                      marginBottom: 12,
                      outline: 'none',
                    }}
                  />
                  <select
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: 10,
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#fff',
                      marginBottom: 12,
                      outline: 'none',
                    }}
                  >
                    <option value="meeting">Meeting</option>
                    <option value="design">Design</option>
                    <option value="milestone">Milestone</option>
                  </select>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <motion.button
                      style={{
                        flex: 1,
                        padding: '12px',
                        borderRadius: 10,
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        border: 'none',
                        color: '#fff',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={addEvent}
                    >
                      Add
                    </motion.button>
                    <motion.button
                      style={{
                        flex: 1,
                        padding: '12px',
                        borderRadius: 10,
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#fff',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                      whileHover={{ scale: 1.02, background: 'rgba(255,255,255,0.1)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsAddingEvent(false)}
                    >
                      Cancel
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </>
          ) : (
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
              gap: 15,
            }}>
              <div style={{ fontSize: '4rem' }}>📅</div>
              <div style={{ fontSize: '1.1rem' }}>Select a date to view events</div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
    </>
  );
}
