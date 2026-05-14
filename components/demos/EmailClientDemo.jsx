'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function EmailClientDemo() {
  const [emails, setEmails] = React.useState([
    { id: 1, from: 'Sarah Johnson', email: 'sarah@company.com', subject: 'Q4 Marketing Report', preview: 'Hi team, attached is the Q4 marketing report showing a 23% increase in conversion rates...', date: '10:30 AM', starred: true, read: false, folder: 'inbox', labels: ['work', 'important'], hasAttachment: true, attachments: [{ name: 'Q4_Report.pdf', size: '2.4 MB' }] },
    { id: 2, from: 'Mike Chen', email: 'mike.chen@startup.io', subject: 'Project Update - New Features', preview: 'Great progress on the new features! We are ahead of schedule and the team is excited...', date: '9:15 AM', starred: false, read: true, folder: 'inbox', labels: ['work'], hasAttachment: false },
    { id: 3, from: 'Tech Newsletter', email: 'newsletter@techdigest.com', subject: 'Weekly Tech Digest', preview: 'This week in tech: AI advances, new frameworks, and breakthrough research...', date: 'Yesterday', starred: false, read: true, folder: 'inbox', labels: ['newsletters'], hasAttachment: false },
    { id: 4, from: 'HR Department', email: 'hr@company.com', subject: 'Benefits Enrollment Deadline', preview: 'Open enrollment for benefits starts next week. Please review your options...', date: 'Yesterday', starred: true, read: false, folder: 'inbox', labels: ['important'], hasAttachment: true, attachments: [{ name: 'Benefits_2024.pdf', size: '1.8 MB' }, { name: 'Form_W4.pdf', size: '340 KB' }] },
    { id: 5, from: 'Alex Turner', email: 'alex.t@designstudio.co', subject: 'Meeting Notes - Product Review', preview: 'Thanks for the productive meeting today. Here are the detailed notes and action items...', date: '2 days ago', starred: false, read: true, folder: 'sent', labels: ['work'], hasAttachment: false },
    { id: 6, from: 'GitHub', email: 'notifications@github.com', subject: '[PR #247] Code review requested', preview: 'Your review is requested on pull request #247: Feature/dark-mode-support...', date: '3 days ago', starred: false, read: true, folder: 'inbox', labels: ['dev'], hasAttachment: false },
  ]);
  const [selectedEmail, setSelectedEmail] = React.useState(null);
  const [activeFolder, setActiveFolder] = React.useState('inbox');
  const [filter, setFilter] = React.useState('all');
  const [isComposing, setIsComposing] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedEmails, setSelectedEmails] = React.useState([]);
  const [composeData, setComposeData] = React.useState({ to: '', subject: '', body: '' });

  const labelColors = {
    work: '#667eea', important: '#ef4444', newsletters: '#43e97b', dev: '#f59e0b', personal: '#ec4899'
  };

  const filteredEmails = emails.filter(email => {
    if (email.folder !== activeFolder) return false;
    if (filter === 'starred' && !email.starred) return false;
    if (filter === 'unread' && email.read) return false;
    if (searchQuery && !email.subject.toLowerCase().includes(searchQuery.toLowerCase()) && !email.from.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const toggleStar = (id, e) => {
    e.stopPropagation();
    setEmails(emails.map(email => email.id === id ? { ...email, starred: !email.starred } : email));
  };

  const toggleSelect = (id, e) => {
    e.stopPropagation();
    setSelectedEmails(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const markAsRead = (id) => {
    setEmails(emails.map(email => email.id === id ? { ...email, read: true } : email));
  };

  return (
    <>
      <h2 className="demo-title">Email Client</h2>
      <p className="demo-subtitle">Full-featured email client with search, labels, attachments, compose modal, and rich email preview.</p>
      <div className="demo-area" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30, position: 'relative' }}>
        {/* Ambient glow */}
        <div style={{ position: 'absolute', top: '5%', left: '15%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(102, 126, 234, 0.12) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />

        <motion.div
          style={{ width: 1100, height: 680, background: 'rgba(20, 20, 30, 0.95)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', display: 'flex', overflow: 'hidden', position: 'relative', zIndex: 1 }}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          {/* Sidebar */}
          <div style={{ width: 200, background: 'rgba(15, 15, 25, 0.98)', borderRight: '1px solid rgba(255,255,255,0.08)', padding: '20px 15px', display: 'flex', flexDirection: 'column' }}>
            <motion.button
              style={{ width: '100%', padding: '12px', borderRadius: 10, background: 'linear-gradient(135deg, #667eea, #764ba2)', border: 'none', color: '#fff', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', marginBottom: 25, boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
              whileHover={{ scale: 1.02, boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsComposing(true)}
            >
              ✏️ Compose
            </motion.button>

            {/* Folders */}
            <div style={{ marginBottom: 25 }}>
              <div style={{ fontSize: '0.7rem', color: '#555', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Folders</div>
              {[
                { id: 'inbox', label: 'Inbox', icon: '📥', count: emails.filter(e => e.folder === 'inbox' && !e.read).length },
                { id: 'sent', label: 'Sent', icon: '📤', count: 0 },
                { id: 'drafts', label: 'Drafts', icon: '📝', count: 1 },
                { id: 'spam', label: 'Spam', icon: '⚠️', count: 3 },
                { id: 'trash', label: 'Trash', icon: '🗑️', count: 0 },
              ].map(folder => (
                <motion.button key={folder.id} onClick={() => setActiveFolder(folder.id)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: activeFolder === folder.id ? 'rgba(102, 126, 234, 0.2)' : 'transparent', border: activeFolder === folder.id ? '1px solid rgba(102, 126, 234, 0.3)' : '1px solid transparent', color: activeFolder === folder.id ? '#667eea' : '#888', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}
                  whileHover={{ background: activeFolder === folder.id ? 'rgba(102, 126, 234, 0.2)' : 'rgba(255,255,255,0.03)' }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span>{folder.icon}</span><span>{folder.label}</span></span>
                  {folder.count > 0 && <span style={{ minWidth: 20, height: 20, borderRadius: 10, background: folder.id === 'spam' ? '#ef4444' : 'linear-gradient(135deg, #667eea, #764ba2)', color: '#fff', fontSize: '0.7rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{folder.count}</span>}
                </motion.button>
              ))}
            </div>

            {/* Labels */}
            <div>
              <div style={{ fontSize: '0.7rem', color: '#555', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Labels</div>
              {Object.entries(labelColors).map(([label, color]) => (
                <motion.button key={label}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: 8, background: 'transparent', border: '1px solid transparent', color: '#888', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}
                  whileHover={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <span style={{ width: 10, height: 10, borderRadius: 3, background: color }} />
                  <span style={{ textTransform: 'capitalize' }}>{label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Email List */}
          <div style={{ width: 340, background: 'rgba(18, 18, 28, 0.98)', borderRight: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column' }}>
            {/* Search Bar */}
            <div style={{ padding: '15px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ color: '#666' }}>🔍</span>
                <input
                  type="text" placeholder="Search emails..."
                  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', fontSize: '0.85rem', outline: 'none' }}
                />
                {searchQuery && <motion.button onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '0.8rem' }} whileHover={{ color: '#fff' }}>✕</motion.button>}
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedEmails.length > 0 && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} style={{ padding: '10px 15px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(102, 126, 234, 0.1)' }}>
                <span style={{ fontSize: '0.8rem', color: '#667eea' }}>{selectedEmails.length} selected</span>
                <div style={{ flex: 1 }} />
                <motion.button style={{ padding: '5px 10px', borderRadius: 6, background: 'rgba(255,255,255,0.05)', border: 'none', color: '#888', fontSize: '0.75rem', cursor: 'pointer' }} whileHover={{ background: 'rgba(255,255,255,0.1)', color: '#fff' }}>Archive</motion.button>
                <motion.button style={{ padding: '5px 10px', borderRadius: 6, background: 'rgba(239, 68, 68, 0.2)', border: 'none', color: '#ef4444', fontSize: '0.75rem', cursor: 'pointer' }} whileHover={{ background: 'rgba(239, 68, 68, 0.3)' }}>Delete</motion.button>
              </motion.div>
            )}

            {/* Header */}
            <div style={{ padding: '12px 15px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, textTransform: 'capitalize' }}>{activeFolder}</h3>
              <div style={{ display: 'flex', gap: 8 }}>
                {['all', 'unread', 'starred'].map(f => (
                  <motion.button key={f} onClick={() => setFilter(f)}
                    style={{ padding: '4px 10px', borderRadius: 6, background: filter === f ? 'rgba(102, 126, 234, 0.2)' : 'transparent', border: filter === f ? '1px solid rgba(102, 126, 234, 0.3)' : '1px solid transparent', color: filter === f ? '#667eea' : '#666', fontSize: '0.7rem', cursor: 'pointer', textTransform: 'capitalize' }}
                    whileHover={{ background: filter === f ? 'rgba(102, 126, 234, 0.2)' : 'rgba(255,255,255,0.03)' }}
                  >{f}</motion.button>
                ))}
              </div>
            </div>

            {/* Email List */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              <AnimatePresence>
                {filteredEmails.map((email, index) => (
                  <motion.div key={email.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ delay: index * 0.03 }}
                    onClick={() => { setSelectedEmail(email); markAsRead(email.id); }}
                    style={{ padding: '14px 15px', borderBottom: '1px solid rgba(255,255,255,0.03)', background: selectedEmail?.id === email.id ? 'rgba(102, 126, 234, 0.12)' : !email.read ? 'rgba(102, 126, 234, 0.05)' : 'transparent', cursor: 'pointer', borderLeft: selectedEmail?.id === email.id ? '3px solid #667eea' : '3px solid transparent' }}
                    whileHover={{ background: selectedEmail?.id === email.id ? 'rgba(102, 126, 234, 0.12)' : 'rgba(255,255,255,0.03)' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <input type="checkbox" checked={selectedEmails.includes(email.id)} onChange={(e) => toggleSelect(email.id, e)} onClick={(e) => e.stopPropagation()} style={{ marginTop: 4, accentColor: '#667eea' }} />
                      <motion.div style={{ fontSize: '1rem', cursor: 'pointer', marginTop: 2 }} whileHover={{ scale: 1.2 }} onClick={(e) => toggleStar(email.id, e)}>{email.starred ? '⭐' : '☆'}</motion.div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                          <span style={{ fontSize: '0.85rem', fontWeight: email.read ? 500 : 700, color: email.read ? '#bbb' : '#fff' }}>{email.from}</span>
                          <span style={{ fontSize: '0.7rem', color: '#666' }}>{email.date}</span>
                        </div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: 3, color: selectedEmail?.id === email.id ? '#667eea' : '#ddd', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{email.subject}</div>
                        <div style={{ fontSize: '0.75rem', color: '#777', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 6 }}>{email.preview}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          {email.labels?.map(label => (
                            <span key={label} style={{ padding: '2px 8px', borderRadius: 4, background: `${labelColors[label]}20`, color: labelColors[label], fontSize: '0.65rem', fontWeight: 600 }}>{label}</span>
                          ))}
                          {email.hasAttachment && <span style={{ fontSize: '0.75rem' }}>📎</span>}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {filteredEmails.length === 0 && (
                <div style={{ padding: 40, textAlign: 'center', color: '#666' }}>
                  <div style={{ fontSize: '2rem', marginBottom: 10 }}>📭</div>
                  <div style={{ fontSize: '0.9rem' }}>No emails found</div>
                </div>
              )}
            </div>
          </div>

          {/* Email Preview */}
          <div style={{ flex: 1, background: 'rgba(20, 20, 30, 0.98)', display: 'flex', flexDirection: 'column' }}>
            {selectedEmail ? (
              <>
                {/* Email Header */}
                <div style={{ padding: '20px 25px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>{selectedEmail.subject}</h2>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {['↩️ Reply', '↪️ Forward', '🗑️'].map((action, i) => (
                        <motion.button key={i} style={{ padding: i < 2 ? '6px 12px' : '6px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#888', fontSize: '0.75rem', cursor: 'pointer' }} whileHover={{ background: 'rgba(255,255,255,0.08)', color: '#fff' }} whileTap={{ scale: 0.95 }}>{action}</motion.button>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #667eea, #764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 700 }}>{selectedEmail.from.charAt(0)}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>{selectedEmail.from}</div>
                      <div style={{ fontSize: '0.8rem', color: '#888' }}>&lt;{selectedEmail.email}&gt; to me</div>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>{selectedEmail.date}</div>
                  </div>
                </div>

                {/* Attachments */}
                {selectedEmail.hasAttachment && (
                  <div style={{ padding: '12px 25px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {selectedEmail.attachments?.map((att, i) => (
                      <motion.div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' }} whileHover={{ background: 'rgba(255,255,255,0.06)' }}>
                        <span style={{ fontSize: '1.2rem' }}>📄</span>
                        <div>
                          <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{att.name}</div>
                          <div style={{ fontSize: '0.7rem', color: '#888' }}>{att.size}</div>
                        </div>
                        <motion.button style={{ background: 'none', border: 'none', color: '#667eea', cursor: 'pointer', fontSize: '0.9rem' }} whileHover={{ scale: 1.1 }}>⬇️</motion.button>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Email Body */}
                <div style={{ flex: 1, padding: '25px', overflowY: 'auto', color: '#ddd', lineHeight: 1.8, fontSize: '0.95rem' }}>
                  <p style={{ marginBottom: 20 }}>{selectedEmail.preview}</p>
                  <p style={{ marginBottom: 20, color: '#aaa' }}>I wanted to follow up on our previous discussion and share some important updates. The team has been making excellent progress and we're on track to meet our quarterly goals.</p>
                  <p style={{ marginBottom: 20, color: '#aaa' }}>Please let me know if you have any questions or need additional information. I'm happy to schedule a call to discuss further.</p>
                  <p style={{ color: '#888' }}>Best regards,<br/><strong style={{ color: '#bbb' }}>{selectedEmail.from}</strong></p>
                </div>

                {/* Quick Reply */}
                <div style={{ padding: '15px 25px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: 10 }}>
                  <input type="text" placeholder="Write a quick reply..." style={{ flex: 1, padding: '12px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', fontSize: '0.85rem', outline: 'none' }} />
                  <motion.button style={{ padding: '12px 20px', borderRadius: 10, background: 'linear-gradient(135deg, #667eea, #764ba2)', border: 'none', color: '#fff', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>Send</motion.button>
                </div>
              </>
            ) : (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                <div style={{ fontSize: '3rem', marginBottom: 15, opacity: 0.5 }}>📧</div>
                <div style={{ fontSize: '1rem', marginBottom: 5 }}>Select an email to read</div>
                <div style={{ fontSize: '0.85rem', color: '#555' }}>{filteredEmails.length} messages in {activeFolder}</div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Compose Modal */}
        <AnimatePresence>
          {isComposing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }} onClick={() => setIsComposing(false)}>
              <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()}
                style={{ width: 550, background: 'rgba(25, 25, 40, 0.98)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                <div style={{ padding: '15px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>New Message</h3>
                  <motion.button onClick={() => setIsComposing(false)} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '1.2rem' }} whileHover={{ color: '#fff' }}>×</motion.button>
                </div>
                <div style={{ padding: '15px 20px' }}>
                  <input type="text" placeholder="To" value={composeData.to} onChange={(e) => setComposeData({...composeData, to: e.target.value})} style={{ width: '100%', padding: '12px 0', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.08)', color: '#fff', fontSize: '0.9rem', outline: 'none', marginBottom: 10 }} />
                  <input type="text" placeholder="Subject" value={composeData.subject} onChange={(e) => setComposeData({...composeData, subject: e.target.value})} style={{ width: '100%', padding: '12px 0', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.08)', color: '#fff', fontSize: '0.9rem', outline: 'none', marginBottom: 10 }} />
                  <textarea placeholder="Write your message..." value={composeData.body} onChange={(e) => setComposeData({...composeData, body: e.target.value})} style={{ width: '100%', height: 180, padding: '12px 0', background: 'transparent', border: 'none', color: '#fff', fontSize: '0.9rem', outline: 'none', resize: 'none', lineHeight: 1.6 }} />
                </div>
                <div style={{ padding: '15px 20px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <motion.button style={{ padding: '8px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: 'none', color: '#888', cursor: 'pointer', fontSize: '0.9rem' }} whileHover={{ background: 'rgba(255,255,255,0.08)' }}>📎 Attach</motion.button>
                    <motion.button style={{ padding: '8px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: 'none', color: '#888', cursor: 'pointer', fontSize: '0.9rem' }} whileHover={{ background: 'rgba(255,255,255,0.08)' }}>😊 Emoji</motion.button>
                  </div>
                  <motion.button style={{ padding: '10px 24px', borderRadius: 10, background: 'linear-gradient(135deg, #667eea, #764ba2)', border: 'none', color: '#fff', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer' }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>Send ✈️</motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
