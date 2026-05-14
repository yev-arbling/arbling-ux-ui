'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function ContactsListDemo() {
  const [contacts, setContacts] = React.useState([
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '+1 234 567 8901', group: 'Work', avatar: '👩‍💼', color: '#667eea', status: 'online' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', phone: '+1 234 567 8902', group: 'Work', avatar: '👨‍💻', color: '#4facfe', status: 'offline' },
    { id: 3, name: 'Carol White', email: 'carol@example.com', phone: '+1 234 567 8903', group: 'Friends', avatar: '👩', color: '#f093fb', status: 'online' },
    { id: 4, name: 'David Brown', email: 'david@example.com', phone: '+1 234 567 8904', group: 'Family', avatar: '👨', color: '#43e97b', status: 'away' },
    { id: 5, name: 'Eva Martinez', email: 'eva@example.com', phone: '+1 234 567 8905', group: 'Work', avatar: '👩‍🔬', color: '#fa709a', status: 'online' },
    { id: 6, name: 'Frank Lee', email: 'frank@example.com', phone: '+1 234 567 8906', group: 'Friends', avatar: '👨‍🎤', color: '#764ba2', status: 'offline' },
  ]);
  const [selectedContact, setSelectedContact] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [groupFilter, setGroupFilter] = React.useState('all');

  const groups = ['all', ...new Set(contacts.map(c => c.group))];
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = groupFilter === 'all' || contact.group === groupFilter;
    return matchesSearch && matchesGroup;
  });

  const groupedContacts = groupFilter === 'all' ? filteredContacts.reduce((acc, contact) => {
    if (!acc[contact.group]) acc[contact.group] = [];
    acc[contact.group].push(contact);
    return acc;
  }, {}) : { [groupFilter]: filteredContacts };

  return (
    <>
      <h2 className="demo-title">Contacts List</h2>
      <p className="demo-subtitle">Contact management with search, groups, and detailed profiles</p>
      <div className="demo-area">
        <div style={{ display: 'flex', gap: 30 }}>
          {/* Contacts Sidebar */}
          <motion.div
            style={{
              width: 360,
              background: 'rgba(20, 20, 30, 0.8)',
              borderRadius: 24,
              border: '1px solid rgba(255,255,255,0.08)',
              padding: 25,
              backdropFilter: 'blur(10px)',
              maxHeight: 600,
              overflowY: 'auto',
            }}
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {/* Search Bar */}
            <div style={{ marginBottom: 20 }}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search contacts..."
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 12,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
            </div>

            {/* Group Filters */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
              {groups.map(group => (
                <motion.button
                  key={group}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 18,
                    background: groupFilter === group ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.05)',
                    border: groupFilter === group ? 'none' : '1px solid rgba(255,255,255,0.1)',
                    color: '#fff',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setGroupFilter(group)}
                >
                  {group}
                </motion.button>
              ))}
            </div>

            {/* Contacts List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <AnimatePresence>
                {Object.entries(groupedContacts).map(([group, groupContacts]) => (
                  <div key={group}>
                    <div style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, marginTop: group !== 'Work' ? 15 : 0 }}>
                      {group}
                    </div>
                    {groupContacts.map((contact, index) => (
                      <motion.div
                        key={contact.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          padding: 12,
                          borderRadius: 12,
                          background: selectedContact?.id === contact.id ? `linear-gradient(135deg, ${contact.color}22, ${contact.color}11)` : 'rgba(255,255,255,0.03)',
                          border: selectedContact?.id === contact.id ? `1px solid ${contact.color}40` : '1px solid rgba(255,255,255,0.05)',
                          cursor: 'pointer',
                          marginBottom: 8,
                        }}
                        whileHover={{ scale: 1.02, background: `rgba(255,255,255,0.05)` }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedContact(contact)}
                      >
                        {/* Avatar */}
                        <div style={{ position: 'relative' }}>
                          <div
                            style={{
                              width: 48,
                              height: 48,
                              borderRadius: '50%',
                              background: `linear-gradient(135deg, ${contact.color}, ${contact.color}66)`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1.5rem',
                            }}
                          >
                            {contact.avatar}
                          </div>
                          {/* Status indicator */}
                          <motion.div
                            style={{
                              position: 'absolute',
                              bottom: 2,
                              right: 2,
                              width: 12,
                              height: 12,
                              borderRadius: '50%',
                              background: contact.status === 'online' ? '#43e97b' : contact.status === 'away' ? '#fbbf24' : '#6b7280',
                              border: '2px solid rgba(20, 20, 30, 0.8)',
                            }}
                            animate={{
                              scale: contact.status === 'online' ? [1, 1.2, 1] : 1,
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                          />
                        </div>

                        {/* Contact Info */}
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: selectedContact?.id === contact.id ? contact.color : '#fff' }}>
                            {contact.name}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: '#888' }}>
                            {contact.email}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Contact Detail */}
          <motion.div
            style={{
              flex: 1,
              maxWidth: 500,
              background: 'rgba(20, 20, 30, 0.8)',
              borderRadius: 24,
              border: '1px solid rgba(255,255,255,0.08)',
              padding: 40,
              backdropFilter: 'blur(10px)',
            }}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 25 }}
          >
            {selectedContact ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Avatar with animation */}
                <motion.div
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${selectedContact.color}, ${selectedContact.color}66)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '4rem',
                    margin: '0 auto 25px',
                    boxShadow: `0 20px 60px ${selectedContact.color}40`,
                  }}
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {selectedContact.avatar}
                </motion.div>

                {/* Name and Status */}
                <div style={{ textAlign: 'center', marginBottom: 30 }}>
                  <h3 style={{
                    fontSize: '2rem',
                    fontWeight: 700,
                    marginBottom: 8,
                    background: `linear-gradient(135deg, ${selectedContact.color}, #fff)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    {selectedContact.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    <motion.div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: selectedContact.status === 'online' ? '#43e97b' : selectedContact.status === 'away' ? '#fbbf24' : '#6b7280',
                      }}
                      animate={{
                        scale: selectedContact.status === 'online' ? [1, 1.3, 1] : 1,
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                    <span style={{ fontSize: '0.9rem', color: '#888', textTransform: 'capitalize' }}>
                      {selectedContact.status}
                    </span>
                  </div>
                </div>

                {/* Contact Information */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 15, marginBottom: 30 }}>
                  {[
                    { label: 'Email', value: selectedContact.email, icon: '📧' },
                    { label: 'Phone', value: selectedContact.phone, icon: '📱' },
                    { label: 'Group', value: selectedContact.group, icon: '👥' },
                  ].map((info, i) => (
                    <motion.div
                      key={info.label}
                      style={{
                        padding: 15,
                        borderRadius: 12,
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ fontSize: '1.3rem' }}>{info.icon}</span>
                        <div>
                          <div style={{ fontSize: '0.75rem', color: '#666', marginBottom: 2 }}>{info.label}</div>
                          <div style={{ fontSize: '0.95rem', color: '#fff' }}>{info.value}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {[
                    { label: 'Call', icon: '📞', color: '#43e97b' },
                    { label: 'Message', icon: '💬', color: '#667eea' },
                    { label: 'Email', icon: '✉️', color: '#4facfe' },
                    { label: 'Video', icon: '📹', color: '#f093fb' },
                  ].map((action, i) => (
                    <motion.button
                      key={action.label}
                      style={{
                        padding: '14px',
                        borderRadius: 12,
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#fff',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                      }}
                      whileHover={{ scale: 1.05, background: `${action.color}20`, borderColor: `${action.color}40` }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                    >
                      <span>{action.icon}</span> {action.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#666',
                  textAlign: 'center',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  style={{ fontSize: '5rem', marginBottom: 20 }}
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  👥
                </motion.div>
                <p style={{ fontSize: '1.1rem' }}>Select a contact to view details</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}
