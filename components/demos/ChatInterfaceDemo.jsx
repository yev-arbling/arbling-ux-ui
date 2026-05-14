'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function ChatInterfaceDemo() {
  const [messages, setMessages] = React.useState([
    { id: 1, text: "Hey! How's the project going?", sender: 'other', timestamp: '10:30 AM', status: 'read', reactions: ['👍'] },
    { id: 2, text: "Making great progress! Almost done with the new feature. Should have a demo ready by EOD 🚀", sender: 'me', timestamp: '10:32 AM', status: 'read', reactions: [] },
    { id: 3, text: "That's awesome! Can you send me a preview?", sender: 'other', timestamp: '10:33 AM', status: 'read', reactions: [] },
    { id: 4, text: "", sender: 'me', timestamp: '10:35 AM', status: 'delivered', reactions: ['🔥', '❤️'], type: 'voice', duration: '0:23' },
    { id: 5, text: "Perfect! The audio quality is great. Let's schedule a call later to discuss.", sender: 'other', timestamp: '10:37 AM', status: 'read', reactions: [] },
  ]);
  const [inputText, setInputText] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const [activeChat, setActiveChat] = React.useState(0);
  const [isRecording, setIsRecording] = React.useState(false);
  const [showReactions, setShowReactions] = React.useState(null);
  const messagesEndRef = React.useRef(null);

  const contacts = [
    { id: 0, name: 'Sarah Chen', avatar: 'SC', status: 'online', lastMessage: 'Perfect! The audio quality is great...', time: '10:37 AM', unread: 0, color: '#667eea' },
    { id: 1, name: 'Alex Rivera', avatar: 'AR', status: 'online', lastMessage: 'Sounds good, see you then!', time: '9:15 AM', unread: 2, color: '#f093fb' },
    { id: 2, name: 'Design Team', avatar: '🎨', status: 'group', lastMessage: 'Mike: Updated the mockups', time: 'Yesterday', unread: 5, color: '#4facfe' },
    { id: 3, name: 'Jordan Taylor', avatar: 'JT', status: 'away', lastMessage: 'Let me check on that...', time: 'Yesterday', unread: 0, color: '#43e97b' },
    { id: 4, name: 'Product Updates', avatar: '📦', status: 'group', lastMessage: 'New release v2.4.0', time: 'Monday', unread: 0, color: '#ffd93d' },
  ];

  const reactions = ['❤️', '👍', '😂', '😮', '😢', '🔥'];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => { scrollToBottom(); }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMessage = { id: messages.length + 1, text: inputText, sender: 'me', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), status: 'sent', reactions: [] };
    setMessages([...messages, newMessage]);
    setInputText('');
    setTimeout(() => setMessages(prev => prev.map(m => m.id === newMessage.id ? { ...m, status: 'delivered' } : m)), 500);
    setTimeout(() => setMessages(prev => prev.map(m => m.id === newMessage.id ? { ...m, status: 'read' } : m)), 1500);
    setTimeout(() => setIsTyping(true), 1000);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { id: prev.length + 1, text: "Got it! I'll review it shortly and get back to you.", sender: 'other', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), status: 'read', reactions: [] }]);
    }, 3000);
  };

  const addReaction = (messageId, reaction) => {
    setMessages(prev => prev.map(m => m.id === messageId ? { ...m, reactions: m.reactions.includes(reaction) ? m.reactions.filter(r => r !== reaction) : [...m.reactions, reaction] } : m));
    setShowReactions(null);
  };

  const contact = contacts[activeChat];

  return (
    <>
      <h2 className="demo-title">Chat Interface</h2>
      <p className="demo-subtitle">Modern messaging with reactions, voice messages, read receipts, and contact sidebar.</p>
      <div className="demo-area" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30, position: 'relative' }}>
      <div style={{ position: 'absolute', top: '10%', left: '20%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '20%', right: '25%', width: 350, height: 350, background: 'radial-gradient(circle, rgba(118, 75, 162, 0.1) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none', zIndex: 0 }} />

      <motion.div style={{ width: 1100, height: 700, background: 'rgba(20, 20, 30, 0.95)', borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', display: 'flex', overflow: 'hidden', position: 'relative', zIndex: 1, boxShadow: '0 25px 80px rgba(0,0,0,0.5)' }} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
        {/* Contacts Sidebar */}
        <div style={{ width: 320, borderRight: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 15 }}>Messages</h3>
            <div style={{ position: 'relative' }}>
              <input placeholder="Search conversations..." style={{ width: '100%', padding: '12px 15px 12px 40px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', fontSize: '0.9rem', outline: 'none' }} />
              <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: '1rem', opacity: 0.5 }}>🔍</span>
            </div>
          </div>
          <div style={{ flex: 1, overflow: 'auto' }}>
            {contacts.map((c, i) => (
              <motion.div key={c.id} onClick={() => setActiveChat(i)} style={{ padding: '15px 20px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', background: activeChat === i ? 'rgba(102, 126, 234, 0.15)' : 'transparent', borderLeft: activeChat === i ? '3px solid #667eea' : '3px solid transparent' }} whileHover={{ background: 'rgba(255,255,255,0.03)' }}>
                <div style={{ position: 'relative' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: `linear-gradient(135deg, ${c.color}, ${c.color}80)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: c.avatar.length > 2 ? '1.5rem' : '1rem', fontWeight: 700 }}>{c.avatar}</div>
                  {c.status !== 'group' && <div style={{ position: 'absolute', bottom: 2, right: 2, width: 12, height: 12, borderRadius: '50%', background: c.status === 'online' ? '#43e97b' : c.status === 'away' ? '#ffd93d' : '#888', border: '2px solid rgba(20, 20, 30, 1)' }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{c.name}</span>
                    <span style={{ fontSize: '0.75rem', color: '#888' }}>{c.time}</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#888', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.lastMessage}</div>
                </div>
                {c.unread > 0 && <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#667eea', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>{c.unread}</div>}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <div style={{ padding: '18px 25px', background: 'rgba(102, 126, 234, 0.1)', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 15 }}>
            <div style={{ width: 45, height: 45, borderRadius: '50%', background: `linear-gradient(135deg, ${contact.color}, ${contact.color}80)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: contact.avatar.length > 2 ? '1.3rem' : '0.95rem', fontWeight: 700 }}>{contact.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '1.05rem', fontWeight: 600 }}>{contact.name}</div>
              <div style={{ fontSize: '0.8rem', color: contact.status === 'online' ? '#43e97b' : '#888', display: 'flex', alignItems: 'center', gap: 5 }}>
                <motion.div style={{ width: 6, height: 6, borderRadius: '50%', background: contact.status === 'online' ? '#43e97b' : '#888' }} animate={contact.status === 'online' ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 1.5, repeat: Infinity }} />
                {contact.status === 'online' ? 'Active now' : contact.status === 'group' ? '5 members' : 'Away'}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['📞', '📹', '⋮'].map((icon, i) => <motion.button key={i} style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: 'none', cursor: 'pointer', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }} whileHover={{ background: 'rgba(255,255,255,0.1)' }} whileTap={{ scale: 0.95 }}>{icon}</motion.button>)}
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, padding: '25px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div key={message.id} initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }} style={{ display: 'flex', justifyContent: message.sender === 'me' ? 'flex-end' : 'flex-start' }}>
                  <div style={{ position: 'relative', maxWidth: '70%' }} onMouseEnter={() => setShowReactions(message.id)} onMouseLeave={() => setShowReactions(null)}>
                    {message.type === 'voice' ? (
                      <motion.div style={{ padding: '12px 18px', borderRadius: 18, borderBottomRightRadius: message.sender === 'me' ? 4 : 18, borderBottomLeftRadius: message.sender === 'other' ? 4 : 18, background: message.sender === 'me' ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }} whileHover={{ scale: 1.02 }}>
                        <motion.div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} whileHover={{ scale: 1.1 }}>▶</motion.div>
                        <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                          {[...Array(20)].map((_, i) => <motion.div key={i} style={{ width: 3, background: 'rgba(255,255,255,0.6)', borderRadius: 2 }} animate={{ height: [8, 4 + Math.random() * 16, 8] }} transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }} />)}
                        </div>
                        <span style={{ fontSize: '0.85rem', opacity: 0.8, marginLeft: 8 }}>{message.duration}</span>
                      </motion.div>
                    ) : (
                      <div style={{ padding: '14px 18px', borderRadius: 18, borderBottomRightRadius: message.sender === 'me' ? 4 : 18, borderBottomLeftRadius: message.sender === 'other' ? 4 : 18, background: message.sender === 'me' ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.08)', boxShadow: message.sender === 'me' ? '0 4px 15px rgba(102, 126, 234, 0.25)' : 'none' }}>
                        <div style={{ fontSize: '0.95rem', lineHeight: 1.5 }}>{message.text}</div>
                        <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', marginTop: 6, textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6 }}>
                          {message.timestamp}
                          {message.sender === 'me' && <span style={{ color: message.status === 'read' ? '#4facfe' : '#888' }}>{message.status === 'sent' ? '✓' : message.status === 'delivered' ? '✓✓' : '✓✓'}</span>}
                        </div>
                      </div>
                    )}
                    {message.reactions.length > 0 && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ position: 'absolute', bottom: -8, [message.sender === 'me' ? 'left' : 'right']: 10, padding: '4px 8px', borderRadius: 12, background: 'rgba(40, 40, 50, 0.95)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: 2, fontSize: '0.9rem' }}>
                        {message.reactions.map((r, i) => <span key={i}>{r}</span>)}
                      </motion.div>
                    )}
                    {showReactions === message.id && (
                      <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} style={{ position: 'absolute', bottom: '100%', [message.sender === 'me' ? 'right' : 'left']: 0, marginBottom: 8, padding: '8px 12px', borderRadius: 20, background: 'rgba(40, 40, 50, 0.98)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: 4, boxShadow: '0 8px 25px rgba(0,0,0,0.4)' }}>
                        {reactions.map((r) => <motion.button key={r} onClick={() => addReaction(message.id, r)} style={{ width: 32, height: 32, borderRadius: '50%', background: message.reactions.includes(r) ? 'rgba(102, 126, 234, 0.3)' : 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }} whileHover={{ scale: 1.2, background: 'rgba(255,255,255,0.1)' }} whileTap={{ scale: 0.9 }}>{r}</motion.button>)}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <div style={{ padding: '14px 18px', borderRadius: 18, borderBottomLeftRadius: 4, background: 'rgba(255,255,255,0.08)', display: 'flex', gap: 5, alignItems: 'center' }}>
                    {[0, 1, 2].map((i) => <motion.div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.5)' }} animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }} />)}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{ padding: '18px 25px', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: 12, alignItems: 'center' }}>
            <motion.button style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: 'none', color: '#888', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.1)' }} whileTap={{ scale: 0.95 }}>📎</motion.button>
            <div style={{ flex: 1, position: 'relative' }}>
              <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Type a message..." style={{ width: '100%', padding: '14px 18px', borderRadius: 14, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', fontSize: '0.95rem', outline: 'none' }} />
            </div>
            <motion.button style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: 'none', color: '#888', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.1)' }} whileTap={{ scale: 0.95 }}>😊</motion.button>
            <motion.button onClick={() => setIsRecording(!isRecording)} style={{ width: 42, height: 42, borderRadius: 12, background: isRecording ? 'rgba(255, 100, 100, 0.2)' : 'rgba(255,255,255,0.05)', border: isRecording ? '1px solid rgba(255, 100, 100, 0.4)' : 'none', color: isRecording ? '#ff6464' : '#888', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} animate={isRecording ? { scale: [1, 1.1, 1] } : {}} transition={{ duration: 1, repeat: isRecording ? Infinity : 0 }}>🎤</motion.button>
            <motion.button style={{ width: 48, height: 48, borderRadius: 14, background: inputText.trim() ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: inputText.trim() ? 'pointer' : 'not-allowed', boxShadow: inputText.trim() ? '0 4px 15px rgba(102, 126, 234, 0.3)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }} whileHover={inputText.trim() ? { scale: 1.05 } : {}} whileTap={inputText.trim() ? { scale: 0.95 } : {}} onClick={handleSend}>➤</motion.button>
          </div>
        </div>
      </motion.div>
    </div>
    </>
  );
}
