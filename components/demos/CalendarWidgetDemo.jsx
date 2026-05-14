'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function CalendarWidgetDemo() {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState(null);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const days = [];

  // Empty cells for days before the first day of month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDate(null);
  };

  const today = new Date();
  const isToday = (day) => {
    return day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear();
  };

  return (
    <>
      <h2 className="demo-title">Calendar Widget</h2>
      <p className="demo-subtitle">Interactive mini calendar with smooth day selection animations and month navigation</p>
      <div className="demo-area">
        <motion.div
          style={{
            width: 380,
            background: 'rgba(20, 20, 30, 0.8)',
            borderRadius: 24,
            border: '1px solid rgba(255,255,255,0.08)',
            padding: 25,
            backdropFilter: 'blur(10px)',
            position: 'relative',
            overflow: 'hidden',
          }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {/* Animated background */}
          <motion.div
            style={{
              position: 'absolute',
              top: -100,
              left: -100,
              width: 300,
              height: 300,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              filter: 'blur(80px)',
              opacity: 0.2,
            }}
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Header with month navigation */}
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 25 }}>
            <motion.button
              onClick={prevMonth}
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '1.2rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              whileHover={{ scale: 1.1, background: 'rgba(102, 126, 234, 0.2)' }}
              whileTap={{ scale: 0.95 }}
            >
              ‹
            </motion.button>

            <motion.div
              key={`${currentDate.getMonth()}-${currentDate.getFullYear()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              style={{ fontSize: '1.3rem', fontWeight: 700, background: 'linear-gradient(90deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            >
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </motion.div>

            <motion.button
              onClick={nextMonth}
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '1.2rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              whileHover={{ scale: 1.1, background: 'rgba(102, 126, 234, 0.2)' }}
              whileTap={{ scale: 0.95 }}
            >
              ›
            </motion.button>
          </div>

          {/* Day names */}
          <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8, marginBottom: 15 }}>
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day, i) => (
              <div key={day} style={{ textAlign: 'center', fontSize: '0.8rem', fontWeight: 600, color: '#666', textTransform: 'uppercase' }}>
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
            {days.map((day, i) => {
              if (!day) return <div key={`empty-${i}`} />;

              const dayIsToday = isToday(day);
              const dayIsSelected = selectedDate === day;

              return (
                <motion.button
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  style={{
                    width: '100%',
                    aspectRatio: 1,
                    borderRadius: 10,
                    background: dayIsSelected
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : dayIsToday
                      ? 'rgba(102, 126, 234, 0.2)'
                      : 'rgba(255,255,255,0.03)',
                    border: dayIsToday ? '1px solid rgba(102, 126, 234, 0.5)' : '1px solid rgba(255,255,255,0.06)',
                    color: dayIsSelected ? '#fff' : dayIsToday ? '#667eea' : '#888',
                    fontSize: '0.95rem',
                    fontWeight: dayIsToday ? 700 : 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.02, type: 'spring', stiffness: 300, damping: 20 }}
                  whileHover={{ scale: dayIsSelected ? 1 : 1.1, background: dayIsSelected ? '' : 'rgba(255,255,255,0.08)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  {day}
                </motion.button>
              );
            })}
          </div>

          {/* Selected date info */}
          <AnimatePresence>
            {selectedDate && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{
                  marginTop: 20,
                  paddingTop: 15,
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                  textAlign: 'center',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: 5 }}>Selected Date</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff' }}>
                  {monthNames[currentDate.getMonth()]} {selectedDate}, {currentDate.getFullYear()}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
