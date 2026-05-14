'use client';

import React from 'react';
import { motion } from 'framer-motion';

const metrics = [
  { label: 'Total Executions', value: '1,234', change: '+12%', trend: 'up', color: '#667eea' },
  { label: 'Success Rate', value: '98.5%', change: '+2.1%', trend: 'up', color: '#43e97b' },
  { label: 'Avg Duration', value: '2.4s', change: '-0.3s', trend: 'down', color: '#f093fb' },
  { label: 'Error Rate', value: '1.5%', change: '-0.5%', trend: 'down', color: '#fbbf24' },
];

const executionData = [
  { day: 'Mon', executions: 180, success: 176, failed: 4 },
  { day: 'Tue', executions: 210, success: 208, failed: 2 },
  { day: 'Wed', executions: 195, success: 190, failed: 5 },
  { day: 'Thu', executions: 225, success: 223, failed: 2 },
  { day: 'Fri', executions: 240, success: 238, failed: 2 },
  { day: 'Sat', executions: 95, success: 93, failed: 2 },
  { day: 'Sun', executions: 89, success: 88, failed: 1 },
];

const topWorkflows = [
  { name: 'Lead Capture', executions: 450, avgDuration: '1.2s', successRate: 99.2 },
  { name: 'Email Campaign', executions: 320, avgDuration: '2.8s', successRate: 98.1 },
  { name: 'Payment Processing', executions: 280, avgDuration: '3.1s', successRate: 97.8 },
  { name: 'Data Sync', executions: 184, avgDuration: '5.2s', successRate: 99.5 },
];

export default function WorkflowMetricsDemo() {
  const maxExecutions = Math.max(...executionData.map(d => d.executions));

  return (
    <>
      <h2 className="demo-title">Workflow Metrics</h2>
      <p className="demo-subtitle">Analytics dashboard for workflows. Track performance, success rates, and trends.</p>
      <div className="demo-area" style={{ padding: 40 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* Key metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 30 }}>
            {metrics.map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, boxShadow: `0 10px 30px ${metric.color}20` }}
                style={{
                  padding: 20,
                  background: `linear-gradient(135deg, ${metric.color}15, ${metric.color}05)`,
                  border: `1px solid ${metric.color}30`,
                  borderRadius: 16,
                }}
              >
                <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {metric.label}
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: metric.color, marginBottom: 8 }}>
                  {metric.value}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem' }}>
                  <span style={{ color: metric.trend === 'up' ? '#43e97b' : '#ff6b6b' }}>
                    {metric.trend === 'up' ? '↑' : '↓'}
                  </span>
                  <span style={{ color: metric.trend === 'up' ? '#43e97b' : '#ff6b6b', fontWeight: 600 }}>
                    {metric.change}
                  </span>
                  <span style={{ color: '#666' }}>vs last week</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 30 }}>
            {/* Execution chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                padding: 24,
                background: 'rgba(20, 20, 35, 0.8)',
                borderRadius: 16,
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 20 }}>Weekly Executions</h3>

              <div style={{ display: 'flex', alignItems: 'end', gap: 12, height: 200 }}>
                {executionData.map((data, i) => {
                  const height = (data.executions / maxExecutions) * 100;
                  return (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ delay: 0.6 + i * 0.1, type: 'spring', stiffness: 100 }}
                        whileHover={{ scale: 1.05 }}
                        style={{
                          width: '100%',
                          background: 'linear-gradient(180deg, #667eea, #764ba2)',
                          borderRadius: '8px 8px 0 0',
                          position: 'relative',
                          cursor: 'pointer',
                          minHeight: 10,
                        }}
                      >
                        <div style={{
                          position: 'absolute',
                          bottom: '100%',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          padding: '4px 8px',
                          background: 'rgba(0,0,0,0.8)',
                          borderRadius: 6,
                          fontSize: '0.75rem',
                          whiteSpace: 'nowrap',
                          marginBottom: 8,
                          opacity: 0,
                          pointerEvents: 'none',
                        }}
                        >
                          {data.executions} runs
                        </div>
                      </motion.div>
                      <div style={{ marginTop: 12, fontSize: '0.75rem', color: '#888' }}>{data.day}</div>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', gap: 20, marginTop: 20, justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: '#43e97b' }} />
                  <span style={{ fontSize: '0.75rem', color: '#888' }}>Success</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: '#ff6b6b' }} />
                  <span style={{ fontSize: '0.75rem', color: '#888' }}>Failed</span>
                </div>
              </div>
            </motion.div>

            {/* Top workflows */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                padding: 24,
                background: 'rgba(20, 20, 35, 0.8)',
                borderRadius: 16,
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 20 }}>Top Workflows</h3>

              {topWorkflows.map((workflow, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    boxShadow: i === 0 ? ['0 0 0px rgba(67, 233, 123, 0)', '0 0 15px rgba(67, 233, 123, 0.3)', '0 0 0px rgba(67, 233, 123, 0)'] : 'none',
                  }}
                  transition={{
                    delay: 0.7 + i * 0.1,
                    boxShadow: { duration: 3, repeat: Infinity }
                  }}
                  whileHover={{ x: 6, scale: 1.02 }}
                  style={{
                    marginBottom: 16,
                    padding: 12,
                    background: i === 0 ? 'rgba(67, 233, 123, 0.05)' : 'rgba(255,255,255,0.03)',
                    borderRadius: 10,
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{workflow.name}</span>
                    <span style={{ fontSize: '0.75rem', color: '#43e97b' }}>{workflow.successRate}%</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: 6 }}>
                    {workflow.executions} executions • {workflow.avgDuration} avg
                  </div>
                  <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 2, overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${workflow.successRate}%` }}
                      transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                      style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, #43e97b, #38b2ac)',
                        borderRadius: 2,
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Performance indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            style={{
              marginTop: 30,
              padding: 24,
              background: 'rgba(20, 20, 35, 0.8)',
              borderRadius: 16,
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 20 }}>Performance Indicators</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { label: 'P50 Latency', value: '1.2s', status: 'good' },
                { label: 'P95 Latency', value: '3.8s', status: 'good' },
                { label: 'P99 Latency', value: '8.1s', status: 'warning' },
              ].map((indicator, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + i * 0.1 }}
                  style={{
                    padding: 16,
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: 12,
                    border: `1px solid ${indicator.status === 'good' ? '#43e97b30' : '#fbbf2430'}`,
                  }}
                >
                  <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: 6 }}>{indicator.label}</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: indicator.status === 'good' ? '#43e97b' : '#fbbf24' }}>
                    {indicator.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
