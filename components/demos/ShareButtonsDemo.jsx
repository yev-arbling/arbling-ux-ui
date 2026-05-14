'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function ShareButtonsDemo() {
  const [copied, setCopied] = React.useState(false);
  const [shareCounts, setShareCounts] = React.useState({ twitter: 234, facebook: 189, linkedin: 156, whatsapp: 98 });
  const shareUrl = 'https://example.com/amazing-article';
  const shareText = 'Check out this amazing article!';
  const platforms = [
    { id: 'twitter', name: 'Twitter', icon: '𝕏', color: '#000', gradient: 'linear-gradient(135deg, #000, #333)' },
    { id: 'facebook', name: 'Facebook', icon: 'f', color: '#1877F2', gradient: 'linear-gradient(135deg, #1877F2, #0d5bb7)' },
    { id: 'linkedin', name: 'LinkedIn', icon: 'in', color: '#0A66C2', gradient: 'linear-gradient(135deg, #0A66C2, #004182)' },
    { id: 'whatsapp', name: 'WhatsApp', icon: '💬', color: '#25D366', gradient: 'linear-gradient(135deg, #25D366, #128C7E)' },
  ];
  const handleShare = (platform) => {
    const url = encodeURIComponent(shareUrl);
    const text = encodeURIComponent(shareText);
    let shareLink = '';
    switch (platform) {
      case 'twitter': shareLink = `https://twitter.com/intent/tweet?url=${url}&text=${text}`; break;
      case 'facebook': shareLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`; break;
      case 'linkedin': shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`; break;
      case 'whatsapp': shareLink = `https://wa.me/?text=${text}%20${url}`; break;
    }
    window.open(shareLink, '_blank', 'width=600,height=400');
    setShareCounts(prev => ({ ...prev, [platform]: prev[platform] + 1 }));
  };
  const handleCopyLink = async () => {
    try { await navigator.clipboard.writeText(shareUrl); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch (err) { console.error('Failed to copy:', err); }
  };
  const totalShares = Object.values(shareCounts).reduce((a, b) => a + b, 0);
  return (
    <>
      <h2 className="demo-title">Share Buttons</h2>
      <p className="demo-subtitle">Social sharing with platform icons, live counts, and link copying</p>
      <div className="demo-area">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 35, width: '100%', maxWidth: 500, alignItems: 'center' }}>
          <motion.div style={{ textAlign: 'center' }} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Total Shares</div>
            <motion.div style={{ fontSize: '3.5rem', fontWeight: 800, background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }} key={totalShares} initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 15 }}>{totalShares.toLocaleString()}</motion.div>
          </motion.div>
          <motion.div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            {platforms.map((platform, index) => (
              <motion.div key={platform.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + index * 0.1 }}>
                <motion.button onClick={() => handleShare(platform.id)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderRadius: 16, background: platform.gradient, border: 'none', cursor: 'pointer', position: 'relative', overflow: 'hidden' }} whileHover={{ scale: 1.02, boxShadow: `0 8px 25px ${platform.color}33` }} whileTap={{ scale: 0.98 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                    <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: platform.id === 'twitter' ? '1.4rem' : '1.2rem', fontWeight: platform.id === 'facebook' || platform.id === 'linkedin' ? 700 : 400, color: '#fff' }}>{platform.icon}</div>
                    <div style={{ textAlign: 'left' }}><div style={{ fontSize: '1rem', fontWeight: 600, color: '#fff' }}>Share on {platform.name}</div><div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>{shareCounts[platform.id]} shares</div></div>
                  </div>
                  <motion.div style={{ padding: '8px 16px', borderRadius: 20, background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', color: '#fff', fontSize: '0.8rem', fontWeight: 600 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Share →</motion.div>
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
          <motion.div style={{ width: '100%', padding: 20, borderRadius: 16, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>Or copy link</div>
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ flex: 1, padding: '12px 16px', borderRadius: 10, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#ccc', fontSize: '0.85rem', fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{shareUrl}</div>
              <motion.button onClick={handleCopyLink} style={{ padding: '12px 24px', borderRadius: 10, background: copied ? 'linear-gradient(135deg, #43e97b, #38f9d7)' : 'linear-gradient(135deg, #667eea, #764ba2)', border: 'none', color: '#fff', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', minWidth: 100 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>{copied ? '✓ Copied!' : 'Copy Link'}</motion.button>
            </div>
          </motion.div>
          <motion.div style={{ display: 'flex', gap: 15 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            {['📧 Email', '🔗 More'].map((option) => <motion.button key={option} style={{ padding: '10px 18px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#ccc', fontSize: '0.85rem', cursor: 'pointer' }} whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.08)' }} whileTap={{ scale: 0.95 }}>{option}</motion.button>)}
          </motion.div>
        </div>
      </div>
    </>
  );
}
