'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const approvalSteps = [
  { id: 1, approver: 'John Doe', role: 'Manager', status: 'approved', date: '2024-01-18 09:30', comment: 'Looks good' },
  { id: 2, approver: 'Jane Smith', role: 'Director', status: 'approved', date: '2024-01-19 14:15', comment: 'Approved with conditions' },
  { id: 3, approver: 'Ali Abassi', role: 'VP Engineering', status: 'pending', date: null, comment: null },
  { id: 4, approver: 'Sarah Johnson', role: 'CEO', status: 'waiting', date: null, comment: null },
];

const pendingApprovals = [
  { id: 1, workflow: 'Budget Increase', requester: 'John Doe', amount: '$25,000', urgency: 'high' },
  { id: 2, workflow: 'Vendor Contract', requester: 'Jane Smith', amount: '$150,000', urgency: 'medium' },
  { id: 3, workflow: 'New Hire', requester: 'Mike Wilson', amount: '$120,000/year', urgency: 'low' },
];

export default function ApprovalFlowDemo() {
  const [showCommentBox, setShowCommentBox] = React.useState(false);
  const [comment, setComment] = React.useState('');

  return (
    <>
      <h2 className="demo-title">Approval Flow</h2>
      <p className="demo-subtitle">Multi-step approval process. Sequential approval workflow with comments and history.</p>
      <div className="demo-area" style={{ padding: 40 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 30 }}>
            {/* Approval chain */}
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 20 }}>Approval Chain</h3>

              <div style={{ position: 'relative' }}>
                {/* Connection line */}
                <div style={{
                  position: 'absolute',
                  left: 24,
                  top: 30,
                  bottom: 30,
                  width: 2,
                  background: 'rgba(102, 126, 234, 0.2)',
                }} />

                {approvalSteps.map((step, i) => {
                  const isApproved = step.status === 'approved';
                  const isPending = step.status === 'pending';
                  const isWaiting = step.status === 'waiting';

                  return (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      style={{
                        marginBottom: 20,
                        display: 'flex',
                        gap: 20,
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      {/* Node */}
                      <motion.div
                        animate={{
                          scale: isPending ? [1, 1.2, 1] : 1,
                          boxShadow: isPending ? [
                            '0 0 0 rgba(102, 126, 234, 0)',
                            '0 0 20px rgba(102, 126, 234, 0.6)',
                            '0 0 0 rgba(102, 126, 234, 0)'
                          ] : 'none',
                        }}
                        transition={{ duration: 1.5, repeat: isPending ? Infinity : 0 }}
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          background: isApproved
                            ? 'linear-gradient(135deg, #43e97b, #38b2ac)'
                            : isPending
                            ? 'linear-gradient(135deg, #667eea, #764ba2)'
                            : 'rgba(255,255,255,0.05)',
                          border: `2px solid ${isApproved ? '#43e97b' : isPending ? '#667eea' : 'rgba(255,255,255,0.1)'}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.2rem',
                          flexShrink: 0,
                        }}
                      >
                        {isApproved ? '✓' : isPending ? '⏳' : '○'}
                      </motion.div>

                      {/* Content */}
                      <motion.div
                        animate={{ opacity: isWaiting ? 0.5 : 1 }}
                        style={{
                          flex: 1,
                          padding: 16,
                          background: isPending ? 'rgba(102, 126, 234, 0.1)' : 'rgba(20, 20, 35, 0.6)',
                          border: `1px solid ${isPending ? '#667eea50' : 'rgba(255,255,255,0.08)'}`,
                          borderRadius: 12,
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                          <div>
                            <div style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 2 }}>{step.approver}</div>
                            <div style={{ fontSize: '0.75rem', color: '#888' }}>{step.role}</div>
                          </div>
                          <div style={{
                            padding: '4px 10px',
                            borderRadius: 6,
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            background: isApproved
                              ? 'rgba(67, 233, 123, 0.15)'
                              : isPending
                              ? 'rgba(251, 191, 36, 0.15)'
                              : 'rgba(255,255,255,0.05)',
                            color: isApproved ? '#43e97b' : isPending ? '#fbbf24' : '#666',
                          }}>
                            {step.status}
                          </div>
                        </div>

                        {step.date && (
                          <div style={{ fontSize: '0.75rem', color: '#666', marginBottom: 6 }}>
                            {step.date}
                          </div>
                        )}

                        {step.comment && (
                          <div style={{
                            padding: '10px 12px',
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: 8,
                            fontSize: '0.8rem',
                            color: '#aaa',
                            fontStyle: 'italic',
                          }}>
                            "{step.comment}"
                          </div>
                        )}

                        {isPending && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ display: 'flex', gap: 8, marginTop: 12 }}
                          >
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setShowCommentBox(true)}
                              style={{
                                flex: 1,
                                padding: '10px',
                                background: 'linear-gradient(135deg, #43e97b, #38b2ac)',
                                border: 'none',
                                borderRadius: 8,
                                color: '#fff',
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                              }}
                            >
                              Approve
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              style={{
                                flex: 1,
                                padding: '10px',
                                background: 'rgba(255, 107, 107, 0.15)',
                                border: '1px solid #ff6b6b50',
                                borderRadius: 8,
                                color: '#ff6b6b',
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                              }}
                            >
                              Reject
                            </motion.button>
                          </motion.div>
                        )}
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Comment modal */}
              <AnimatePresence>
                {showCommentBox && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      position: 'fixed',
                      inset: 0,
                      background: 'rgba(0,0,0,0.7)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 100,
                    }}
                    onClick={() => setShowCommentBox(false)}
                  >
                    <motion.div
                      initial={{ scale: 0.9, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.9, y: 20 }}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        padding: 30,
                        background: 'rgba(15, 15, 25, 0.98)',
                        borderRadius: 20,
                        border: '1px solid rgba(255,255,255,0.1)',
                        maxWidth: 500,
                        width: '90%',
                      }}
                    >
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 16 }}>Add Comment (Optional)</h3>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Enter your approval comment..."
                        style={{
                          width: '100%',
                          padding: 12,
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: 10,
                          color: '#fff',
                          fontSize: '0.9rem',
                          minHeight: 100,
                          resize: 'vertical',
                          fontFamily: 'inherit',
                          marginBottom: 16,
                        }}
                      />
                      <div style={{ display: 'flex', gap: 8 }}>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowCommentBox(false)}
                          style={{
                            flex: 1,
                            padding: '12px',
                            background: 'linear-gradient(135deg, #43e97b, #38b2ac)',
                            border: 'none',
                            borderRadius: 10,
                            color: '#fff',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          Confirm Approval
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowCommentBox(false)}
                          style={{
                            padding: '12px 20px',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 10,
                            color: '#aaa',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          Cancel
                        </motion.button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Pending approvals */}
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 20 }}>Pending Approvals</h3>

              {pendingApprovals.map((approval, i) => (
                <motion.div
                  key={approval.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  style={{
                    marginBottom: 12,
                    padding: 16,
                    background: 'rgba(20, 20, 35, 0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 12,
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{approval.workflow}</div>
                    <div style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: approval.urgency === 'high' ? '#ff6b6b' : approval.urgency === 'medium' ? '#fbbf24' : '#43e97b',
                      marginTop: 4,
                    }} />
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: 4 }}>
                    Requested by {approval.requester}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#667eea', fontWeight: 600 }}>
                    {approval.amount}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            style={{
              marginTop: 30,
              padding: 20,
              background: 'rgba(20, 20, 35, 0.6)',
              borderRadius: 16,
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            {[
              { label: 'Approved', value: approvalSteps.filter(s => s.status === 'approved').length, color: '#43e97b' },
              { label: 'Pending', value: approvalSteps.filter(s => s.status === 'pending').length, color: '#fbbf24' },
              { label: 'Waiting', value: approvalSteps.filter(s => s.status === 'waiting').length, color: '#666' },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 + i * 0.1, type: 'spring', stiffness: 300 }}
                  style={{ fontSize: '1.8rem', fontWeight: 700, color: stat.color, marginBottom: 4 }}
                >
                  {stat.value}
                </motion.div>
                <div style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}
