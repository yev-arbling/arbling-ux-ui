'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function PomodoroDemo() {
  const [mode, setMode] = React.useState('work'); // 'work' or 'break'
  const [timeLeft, setTimeLeft] = React.useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = React.useState(false);
  const [sessionCount, setSessionCount] = React.useState(1);
  const [completedSessions, setCompletedSessions] = React.useState(0);
  const [totalWorkTime, setTotalWorkTime] = React.useState(0);
  const [totalBreakTime, setTotalBreakTime] = React.useState(0);

  const WORK_TIME = 25 * 60;
  const BREAK_TIME = 5 * 60;

  React.useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
        if (mode === 'work') {
          setTotalWorkTime(prev => prev + 1);
        } else {
          setTotalBreakTime(prev => prev + 1);
        }
      }, 1000);
    } else if (timeLeft === 0) {
      // Timer finished
      handleTimerComplete();
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    if (mode === 'work') {
      setCompletedSessions(prev => prev + 1);
      // Switch to break
      setMode('break');
      setTimeLeft(BREAK_TIME);
    } else {
      // Switch back to work
      setSessionCount(prev => prev + 1);
      setMode('work');
      setTimeLeft(WORK_TIME);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'work' ? WORK_TIME : BREAK_TIME);
  };

  const switchMode = (newMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(newMode === 'work' ? WORK_TIME : BREAK_TIME);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const formatTotalTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const progress = ((mode === 'work' ? WORK_TIME : BREAK_TIME) - timeLeft) / (mode === 'work' ? WORK_TIME : BREAK_TIME);
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <>
      <h2 className="demo-title">Pomodoro Timer</h2>
      <p className="demo-subtitle">Productivity timer with work/break sessions, progress ring, and session tracking.</p>
      <div className="demo-area" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30 }}>
      <motion.div
        style={{
          width: 900,
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr',
          gap: 30,
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        {/* Timer Display */}
        <motion.div
          style={{
            padding: 50,
            background: 'rgba(20, 20, 30, 0.8)',
            borderRadius: 32,
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Mode Badge */}
          <motion.div
            style={{
              padding: '10px 25px',
              borderRadius: "50%",
              background: mode === 'work' ? 'rgba(102, 126, 234, 0.2)' : 'rgba(67, 233, 123, 0.2)',
              border: mode === 'work' ? '1px solid rgba(102, 126, 234, 0.4)' : '1px solid rgba(67, 233, 123, 0.4)',
              color: mode === 'work' ? '#667eea' : '#43e97b',
              fontWeight: 600,
              marginBottom: 30,
            }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {mode === 'work' ? '🎯 Focus Time' : '☕ Break Time'}
          </motion.div>

          {/* Circular Timer */}
          <div style={{ position: 'relative', marginBottom: 40 }}>
            <svg width="280" height="280" style={{ transform: 'rotate(-90deg)' }}>
              {/* Background circle */}
              <circle
                cx="140"
                cy="140"
                r="120"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="12"
              />
              {/* Progress circle */}
              <motion.circle
                cx="140"
                cy="140"
                r="120"
                fill="none"
                stroke={mode === 'work' ? '#667eea' : '#43e97b'}
                strokeWidth="12"
                strokeLinecap="round"
                animate={{
                  strokeDashoffset: [circumference, strokeDashoffset],
                }}
                transition={{ duration: 0.5 }}
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset: strokeDashoffset,
                }}
              />
            </svg>

            {/* Time Display */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
            }}>
              <div style={{
                fontSize: '4rem',
                fontWeight: 800,
                fontFamily: 'SF Mono, Monaco, monospace',
                color: mode === 'work' ? '#667eea' : '#43e97b',
                lineHeight: 1,
              }}>
                {formatTime(timeLeft)}
              </div>
              <div style={{
                fontSize: '1rem',
                color: '#888',
                marginTop: 10,
              }}>
                {mode === 'work' ? 'Stay focused!' : 'Relax and recharge'}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', gap: 15 }}>
            <motion.button
              style={{
                padding: '15px 40px',
                borderRadius: 16,
                background: isRunning
                  ? 'rgba(250, 112, 154, 0.2)'
                  : `linear-gradient(135deg, ${mode === 'work' ? '#667eea' : '#43e97b'}, ${mode === 'work' ? '#764ba2' : '#00f2fe'})`,
                border: isRunning ? '1px solid rgba(250, 112, 154, 0.4)' : 'none',
                color: isRunning ? '#fa709a' : '#fff',
                fontSize: '1.1rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: isRunning ? 'none' : `0 10px 30px ${mode === 'work' ? 'rgba(102, 126, 234, 0.3)' : 'rgba(67, 233, 123, 0.3)'}`,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsRunning(!isRunning)}
            >
              {isRunning ? 'Pause' : 'Start'}
            </motion.button>

            <motion.button
              style={{
                padding: '15px 40px',
                borderRadius: 16,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '1.1rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
              whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.95 }}
              onClick={resetTimer}
            >
              Reset
            </motion.button>
          </div>

          {/* Mode Switcher */}
          <div style={{ display: 'flex', gap: 12, marginTop: 25 }}>
            <motion.button
              style={{
                padding: '12px 24px',
                borderRadius: 12,
                background: mode === 'work' ? 'rgba(102, 126, 234, 0.2)' : 'rgba(255,255,255,0.05)',
                border: mode === 'work' ? '1px solid rgba(102, 126, 234, 0.4)' : '1px solid rgba(255,255,255,0.1)',
                color: mode === 'work' ? '#667eea' : '#888',
                fontWeight: 600,
                cursor: 'pointer',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => switchMode('work')}
            >
              Work (25m)
            </motion.button>

            <motion.button
              style={{
                padding: '12px 24px',
                borderRadius: 12,
                background: mode === 'break' ? 'rgba(67, 233, 123, 0.2)' : 'rgba(255,255,255,0.05)',
                border: mode === 'break' ? '1px solid rgba(67, 233, 123, 0.4)' : '1px solid rgba(255,255,255,0.1)',
                color: mode === 'break' ? '#43e97b' : '#888',
                fontWeight: 600,
                cursor: 'pointer',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => switchMode('break')}
            >
              Break (5m)
            </motion.button>
          </div>
        </motion.div>

        {/* Statistics Panel */}
        <motion.div
          style={{
            padding: 40,
            background: 'rgba(20, 20, 30, 0.8)',
            borderRadius: 32,
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            marginBottom: 30,
            background: 'linear-gradient(135deg, #f093fb, #4facfe)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Statistics
          </h2>

          {/* Session Counter */}
          <div style={{ marginBottom: 30 }}>
            <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: 10 }}>Current Session</div>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              color: '#667eea',
            }}>
              {sessionCount}/4
            </div>
            <div style={{
              display: 'flex',
              gap: 8,
              marginTop: 15,
            }}>
              {Array.from({ length: 4 }).map((_, i) => (
                <motion.div
                  key={i}
                  style={{
                    flex: 1,
                    height: 8,
                    borderRadius: 4,
                    background: i < sessionCount ? '#667eea' : 'rgba(255,255,255,0.1)',
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: i < sessionCount ? 1 : 0.1 }}
                  transition={{ delay: i * 0.1 }}
                />
              ))}
            </div>
          </div>

          {/* Completed Sessions */}
          <div style={{ marginBottom: 25 }}>
            <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: 10 }}>Completed Today</div>
            <div style={{
              fontSize: '3rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #43e97b, #00f2fe)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              {completedSessions}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#888', marginTop: 5 }}>
              {completedSessions === 1 ? 'session' : 'sessions'}
            </div>
          </div>

          {/* Total Times */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 15, marginTop: 'auto' }}>
            <div style={{
              padding: 20,
              borderRadius: 16,
              background: 'rgba(102, 126, 234, 0.1)',
              border: '1px solid rgba(102, 126, 234, 0.2)',
            }}>
              <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: 8 }}>
                💼 Total Focus Time
              </div>
              <div style={{
                fontSize: '1.8rem',
                fontWeight: 700,
                color: '#667eea',
              }}>
                {formatTotalTime(totalWorkTime)}
              </div>
            </div>

            <div style={{
              padding: 20,
              borderRadius: 16,
              background: 'rgba(67, 233, 123, 0.1)',
              border: '1px solid rgba(67, 233, 123, 0.2)',
            }}>
              <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: 8 }}>
                ☕ Total Break Time
              </div>
              <div style={{
                fontSize: '1.8rem',
                fontWeight: 700,
                color: '#43e97b',
              }}>
                {formatTotalTime(totalBreakTime)}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
    </>
  );
}
