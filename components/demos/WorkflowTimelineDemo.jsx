'use client';

import React from 'react';
import { motion } from 'framer-motion';

const events = [
  { id: 1, time: '09:00:00', action: 'Workflow Started', status: 'success', duration: '0.5s', icon: '▶️' },
  { id: 2, time: '09:00:01', action: 'Fetch User Data', status: 'success', duration: '1.2s', icon: '📥' },
  { id: 3, time: '09:00:03', action: 'Process Payment', status: 'success', duration: '2.5s', icon: '💳' },
  { id: 4, time: '09:00:06', action: 'Send Confirmation Email', status: 'running', duration: '...', icon: '✉️' },
  { id: 5, time: '09:00:08', action: 'Update CRM', status: 'pending', duration: '-', icon: '📊' },
  { id: 6, time: '09:00:10', action: 'Generate Invoice', status: 'pending', duration: '-', icon: '📄' },
];

export default function WorkflowTimelineDemo() {
  const [currentIndex, setCurrentIndex] = React.useState(3);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev < events.length - 1 ? prev + 1 : prev));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h2 className="demo-title">Workflow Timeline</h2>
      <p className="demo-subtitle">Real-time workflow execution timeline. Watch tasks progress through each step.</p>
      <div className="demo-area" style={{ padding: 40 }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>

          {/* Timeline */}
          <div style={{ position: 'relative' }}>
            {/* Progress line */}
            <div style={{
              position: 'absolute',
              left: 24,
              top: 30,
              bottom: 30,
              width: 2,
              background: 'rgba(255,255,255,0.1)',
            }}>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(currentIndex / (events.length - 1)) * 100}%` }}
                transition={{ duration: 0.5 }}
                style={{
                  width: '100%',
                  background: 'linear-gradient(180deg, #667eea, #f093fb)',
                  boxShadow: '0 0 10px rgba(102, 126, 234, 0.5)',
                }}
              />
            </div>

            {/* Events */}
            {events.map((event, i) => {
              const isPassed = i < currentIndex;
              const isCurrent = i === currentIndex;
              const isPending = i > currentIndex;

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    display: 'flex',
                    gap: 20,
                    marginBottom: 20,
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {/* Node */}
                  <motion.div
                    animate={{
                      scale: isCurrent ? [1, 1.3, 1] : 1,
                      boxShadow: isCurrent ? ['0 0 0 rgba(102, 126, 234, 0)', '0 0 20px rgba(102, 126, 234, 0.6)', '0 0 0 rgba(102, 126, 234, 0)'] : 'none',
                    }}
                    transition={{ duration: 1.5, repeat: isCurrent ? Infinity : 0 }}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      background: isPassed ? 'linear-gradient(135deg, #667eea, #764ba2)' : isCurrent ? 'linear-gradient(135deg, #f093fb, #f5576c)' : 'rgba(255,255,255,0.05)',
                      border: '2px solid',
                      borderColor: isPassed ? '#667eea' : isCurrent ? '#f093fb' : 'rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      flexShrink: 0,
                    }}
                  >
                    {event.icon}
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    animate={{
                      opacity: isPending ? 0.5 : 1,
                    }}
                    style={{
                      flex: 1,
                      padding: 16,
                      background: isCurrent ? 'rgba(240, 147, 251, 0.1)' : 'rgba(20, 20, 35, 0.6)',
                      border: `1px solid ${isCurrent ? '#f093fb50' : 'rgba(255,255,255,0.08)'}`,
                      borderRadius: 12,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{event.action}</h4>
                      <span style={{ fontSize: '0.75rem', color: '#888', fontFamily: 'monospace' }}>{event.time}</span>
                    </div>

                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <div style={{
                        padding: '4px 10px',
                        borderRadius: 6,
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        background: event.status === 'success' ? 'rgba(67, 233, 123, 0.15)' : event.status === 'running' ? 'rgba(251, 191, 36, 0.15)' : 'rgba(255,255,255,0.05)',
                        color: event.status === 'success' ? '#43e97b' : event.status === 'running' ? '#fbbf24' : '#666',
                      }}>
                        {event.status}
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#666' }}>Duration: {event.duration}</span>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{
              marginTop: 30,
              padding: 20,
              background: 'rgba(20, 20, 35, 0.8)',
              borderRadius: 16,
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            {[
              { label: 'Total Steps', value: events.length, color: '#667eea' },
              { label: 'Completed', value: currentIndex, color: '#43e97b' },
              { label: 'In Progress', value: 1, color: '#fbbf24' },
              { label: 'Pending', value: events.length - currentIndex - 1, color: '#666' },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 700, color: stat.color, marginBottom: 4 }}>{stat.value}</div>
                <div style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}
