'use client';

import React from 'react';
import { motion } from 'framer-motion';

const templates = [
  {
    id: 'lead-capture',
    name: 'Lead Capture',
    desc: 'Form submission → CRM → Email notification',
    icon: '🎯',
    color: '#667eea',
    steps: 5,
    category: 'Sales',
    popular: true
  },
  {
    id: 'customer-onboard',
    name: 'Customer Onboarding',
    desc: 'New signup → Welcome email → Setup checklist',
    icon: '👋',
    color: '#f093fb',
    steps: 8,
    category: 'Support',
    popular: true
  },
  {
    id: 'invoice-auto',
    name: 'Invoice Automation',
    desc: 'Order complete → Generate invoice → Send email',
    icon: '💰',
    color: '#43e97b',
    steps: 6,
    category: 'Finance',
    popular: false
  },
  {
    id: 'content-publish',
    name: 'Content Publishing',
    desc: 'Draft approved → Publish → Social media share',
    icon: '📝',
    color: '#fbbf24',
    steps: 7,
    category: 'Marketing',
    popular: true
  },
  {
    id: 'ticket-routing',
    name: 'Support Ticket Routing',
    desc: 'New ticket → Classify → Assign to team',
    icon: '🎫',
    color: '#ff6b6b',
    steps: 4,
    category: 'Support',
    popular: false
  },
  {
    id: 'report-gen',
    name: 'Report Generation',
    desc: 'Schedule → Fetch data → Generate PDF → Email',
    icon: '📊',
    color: '#a78bfa',
    steps: 9,
    category: 'Analytics',
    popular: false
  },
];

export default function WorkflowTemplateDemo() {
  const [selectedTemplate, setSelectedTemplate] = React.useState(null);
  const [filter, setFilter] = React.useState('all');

  const filteredTemplates = filter === 'all'
    ? templates
    : templates.filter(t => t.popular);

  return (
    <>
      <h2 className="demo-title">Workflow Templates</h2>
      <p className="demo-subtitle">Pre-built workflow templates. Start with proven automation patterns.</p>
      <div className="demo-area" style={{ padding: 40 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          {/* Filter */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', gap: 12, marginBottom: 30 }}
          >
            {['all', 'popular'].map(f => (
              <motion.button
                key={f}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(f)}
                style={{
                  padding: '10px 20px',
                  background: filter === f ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${filter === f ? '#667eea' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 8,
                  color: '#fff',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                }}
              >
                {f === 'all' ? 'All Templates' : 'Popular'}
              </motion.button>
            ))}
          </motion.div>

          {/* Templates grid */}
          <motion.div
            layout
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}
          >
            {filteredTemplates.map((template, i) => (
              <motion.div
                key={template.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05, type: 'spring', stiffness: 300 }}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedTemplate(template)}
                style={{
                  padding: 24,
                  background: selectedTemplate?.id === template.id ? `linear-gradient(135deg, ${template.color}20, ${template.color}10)` : 'rgba(20, 20, 35, 0.6)',
                  border: `2px solid ${selectedTemplate?.id === template.id ? template.color : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: 16,
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {template.popular && (
                  <div style={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    padding: '4px 10px',
                    background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                    borderRadius: 6,
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                  }}>
                    Popular
                  </div>
                )}

                <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>{template.icon}</div>

                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8 }}>{template.name}</h3>

                <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: 16, lineHeight: 1.4 }}>
                  {template.desc}
                </p>

                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <div style={{
                    padding: '4px 10px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: 6,
                    fontSize: '0.7rem',
                    color: '#aaa',
                  }}>
                    {template.steps} steps
                  </div>
                  <div style={{
                    padding: '4px 10px',
                    background: `${template.color}20`,
                    borderRadius: 6,
                    fontSize: '0.7rem',
                    color: template.color,
                  }}>
                    {template.category}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  style={{
                    marginTop: 16,
                    width: '100%',
                    padding: '10px',
                    background: `linear-gradient(135deg, ${template.color}, ${template.color}cc)`,
                    border: 'none',
                    borderRadius: 8,
                    color: '#fff',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Use Template
                </motion.button>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              marginTop: 40,
              padding: 24,
              background: 'rgba(20, 20, 35, 0.6)',
              borderRadius: 16,
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            {[
              { label: 'Total Templates', value: templates.length, color: '#667eea' },
              { label: 'Categories', value: new Set(templates.map(t => t.category)).size, color: '#f093fb' },
              { label: 'Avg Steps', value: Math.round(templates.reduce((acc, t) => acc + t.steps, 0) / templates.length), color: '#43e97b' },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: stat.color, marginBottom: 6 }}>{stat.value}</div>
                <div style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}
