'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  { id: 1, title: 'Configure Trigger', desc: 'Set up your workflow trigger', icon: '⚡', status: 'completed' },
  { id: 2, title: 'Add Actions', desc: 'Define what happens', icon: '⚙️', status: 'completed' },
  { id: 3, title: 'Set Conditions', desc: 'Add branching logic', icon: '🔀', status: 'current' },
  { id: 4, title: 'Test Workflow', desc: 'Run a test execution', icon: '🧪', status: 'pending' },
  { id: 5, title: 'Deploy Live', desc: 'Activate your workflow', icon: '🚀', status: 'pending' },
];

export default function WorkflowStepsDemo() {
  const [currentStep, setCurrentStep] = React.useState(3);

  return (
    <>
      <h2 className="demo-title">Workflow Steps</h2>
      <p className="demo-subtitle">Step-by-step workflow configuration. Track progress through each setup phase.</p>
      <div className="demo-area" style={{ padding: 50 }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>

          {/* Progress bar */}
          <div style={{ marginBottom: 50 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: '0.85rem', color: '#888' }}>Progress</span>
              <span style={{ fontSize: '0.85rem', color: '#667eea', fontWeight: 600 }}>{Math.round((currentStep / steps.length) * 100)}%</span>
            </div>
            <div style={{ height: 8, background: 'rgba(255,255,255,0.05)', borderRadius: 8, overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / steps.length) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #667eea, #764ba2)',
                  borderRadius: 8,
                }}
              />
            </div>
          </div>

          {/* Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {steps.map((step, i) => {
              const isCompleted = i < currentStep - 1;
              const isCurrent = i === currentStep - 1;
              const isPending = i > currentStep - 1;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setCurrentStep(i + 1)}
                  style={{
                    display: 'flex',
                    gap: 20,
                    padding: 24,
                    background: isCurrent ? 'rgba(102, 126, 234, 0.1)' : 'rgba(20, 20, 35, 0.6)',
                    border: `2px solid ${isCurrent ? '#667eea' : isCompleted ? '#43e97b50' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: 16,
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {isCurrent && (
                    <motion.div
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 2,
                        background: 'linear-gradient(90deg, transparent, #667eea, transparent)',
                      }}
                    />
                  )}

                  {/* Number/Icon */}
                  <motion.div
                    animate={{
                      scale: isCurrent ? [1, 1.1, 1] : 1,
                    }}
                    transition={{ duration: 2, repeat: isCurrent ? Infinity : 0 }}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 12,
                      background: isCompleted ? 'linear-gradient(135deg, #43e97b, #38b2ac)' : isCurrent ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.8rem',
                      flexShrink: 0,
                    }}
                  >
                    {isCompleted ? '✓' : step.icon}
                  </motion.div>

                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{step.title}</h3>
                      <div style={{
                        padding: '3px 10px',
                        borderRadius: 6,
                        fontSize: '0.65rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        background: isCompleted ? 'rgba(67, 233, 123, 0.15)' : isCurrent ? 'rgba(102, 126, 234, 0.15)' : 'rgba(255,255,255,0.05)',
                        color: isCompleted ? '#43e97b' : isCurrent ? '#667eea' : '#666',
                      }}>
                        {step.status}
                      </div>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#888', margin: 0 }}>{step.desc}</p>
                  </div>

                  {/* Action */}
                  <motion.div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    {isCurrent && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (currentStep < steps.length) setCurrentStep(currentStep + 1);
                        }}
                        style={{
                          padding: '10px 20px',
                          background: 'linear-gradient(135deg, #667eea, #764ba2)',
                          border: 'none',
                          borderRadius: 8,
                          color: '#fff',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        Continue
                      </motion.button>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
