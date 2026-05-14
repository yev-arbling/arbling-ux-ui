'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function TestimonialWallDemo() {
  const [hoveredId, setHoveredId] = React.useState(null);
  const [selectedId, setSelectedId] = React.useState(null);
  const [activeFilter, setActiveFilter] = React.useState('all');
  const [animatedStats, setAnimatedStats] = React.useState({ reviews: 0, rating: 0, teams: 0 });
  const [bookmarked, setBookmarked] = React.useState(new Set());
  const [viewMode, setViewMode] = React.useState('masonry');
  const [liked, setLiked] = React.useState(new Set());

  React.useEffect(() => {
    const targets = { reviews: 5284, rating: 4.9, teams: 87000 };
    const duration = 2000;
    const steps = 60;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedStats({
        reviews: Math.round(targets.reviews * eased),
        rating: Math.round(targets.rating * eased * 10) / 10,
        teams: Math.round(targets.teams * eased),
      });
      if (step >= steps) clearInterval(interval);
    }, duration / steps);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    { id: 1, name: 'Sarah Chen', role: 'CTO', company: 'TechFlow', photo: 'https://i.pravatar.cc/150?img=1', text: 'This platform completely transformed how our team collaborates. The AI-powered suggestions alone saved us 40+ hours per week. Absolutely game-changing.', rating: 5, color: '#667eea', metric: '40hrs saved/week', verified: true, platform: 'linkedin', category: 'enterprise', likes: 234, timeAgo: '2 days ago', size: 'large', industry: 'SaaS', hasVideo: true },
    { id: 2, name: 'Marcus Johnson', role: 'Founder & CEO', company: 'StartupX', photo: 'https://i.pravatar.cc/150?img=3', text: 'Best investment we made this year. Saw positive ROI within just 2 weeks of implementation.', rating: 5, color: '#f5576c', metric: '2 week ROI', verified: true, platform: 'twitter', category: 'startup', likes: 189, timeAgo: '1 week ago', size: 'medium', industry: 'FinTech' },
    { id: 3, name: 'Emily Rodriguez', role: 'Head of Product', company: 'ScaleUp', photo: 'https://i.pravatar.cc/150?img=5', text: 'The integrations are flawless. We connected our entire tech stack in a single afternoon. No other tool comes close.', rating: 5, color: '#43e97b', metric: '500+ integrations', verified: true, platform: 'g2', category: 'enterprise', likes: 312, timeAgo: '3 days ago', size: 'medium', industry: 'E-commerce' },
    { id: 4, name: 'David Kim', role: 'Engineering Lead', company: 'CloudNine', photo: 'https://i.pravatar.cc/150?img=8', text: 'Finally, a tool that developers actually enjoy using. Clean API, excellent documentation, and the support team is incredibly responsive.', rating: 5, color: '#4facfe', metric: '99.9% uptime', verified: true, platform: 'producthunt', category: 'developer', likes: 456, timeAgo: '5 hours ago', size: 'large', industry: 'DevTools', hasVideo: false },
    { id: 5, name: 'Lisa Thompson', role: 'CEO', company: 'GrowthLabs', photo: 'https://i.pravatar.cc/150?img=9', text: 'Absolutely revolutionary for our analytics workflow. Cannot imagine going back.', rating: 5, color: '#fa709a', metric: '10x faster insights', verified: true, platform: 'twitter', category: 'startup', likes: 278, timeAgo: '1 day ago', size: 'small', industry: 'Analytics' },
    { id: 6, name: 'James Wilson', role: 'VP Engineering', company: 'DataDriven', photo: 'https://i.pravatar.cc/150?img=12', text: 'Support response times are incredible. Issues resolved in minutes, not days. This is how enterprise software should work.', rating: 5, color: '#fbbf24', metric: '<5min response', verified: true, platform: 'linkedin', category: 'enterprise', likes: 167, timeAgo: '4 days ago', size: 'medium', industry: 'Data' },
    { id: 7, name: 'Rachel Park', role: 'Design Director', company: 'CreativeStudio', photo: 'https://i.pravatar.cc/150?img=16', text: 'The UI is stunning and intuitive. Our entire design team switched within a week. Best-in-class user experience that actually understands designers.', rating: 5, color: '#a78bfa', metric: '95% team adoption', verified: true, platform: 'twitter', category: 'startup', likes: 423, timeAgo: '12 hours ago', size: 'large', industry: 'Design', hasVideo: true },
    { id: 8, name: 'Alex Turner', role: 'CTO', company: 'HealthTech Inc', photo: 'https://i.pravatar.cc/150?img=33', text: 'HIPAA compliant, secure, and reliable. We migrated 500K patient records with zero downtime. Enterprise-grade infrastructure.', rating: 5, color: '#ec4899', metric: 'Zero downtime', verified: true, platform: 'g2', category: 'enterprise', likes: 534, timeAgo: '6 days ago', size: 'medium', industry: 'HealthTech' },
    { id: 9, name: 'Jordan Lee', role: 'Staff Engineer', company: 'ByteForge', photo: 'https://i.pravatar.cc/150?img=52', text: 'The GraphQL API is beautifully designed. TypeScript support is first-class. This is how developer tools should be built.', rating: 5, color: '#10b981', metric: 'Type-safe APIs', verified: true, platform: 'producthunt', category: 'developer', likes: 687, timeAgo: '8 hours ago', size: 'medium', industry: 'DevTools' },
    { id: 10, name: 'Maya Patel', role: 'VP Operations', company: 'LogiChain', photo: 'https://i.pravatar.cc/150?img=25', text: 'Scaled our operations 5x without adding headcount. Automation features are incredible. ROI in the first quarter.', rating: 5, color: '#f59e0b', metric: '5x scale', verified: true, platform: 'linkedin', category: 'enterprise', likes: 298, timeAgo: '2 days ago', size: 'small', industry: 'Logistics' },
    { id: 11, name: 'Chris Martinez', role: 'Founder', company: 'AIStartup', photo: 'https://i.pravatar.cc/150?img=68', text: 'Built our MVP in 3 weeks instead of 3 months. The component library and templates saved countless hours. Game changer for early-stage startups.', rating: 5, color: '#06b6d4', metric: '10x faster dev', verified: true, platform: 'twitter', category: 'startup', likes: 412, timeAgo: '18 hours ago', size: 'large', industry: 'AI/ML', hasVideo: true },
    { id: 12, name: 'Nina Kowalski', role: 'Tech Lead', company: 'SecurityFirst', photo: 'https://i.pravatar.cc/150?img=45', text: 'SOC 2, ISO 27001, and GDPR compliant out of the box. Security is not an afterthought here. Finally a platform we can trust.', rating: 5, color: '#8b5cf6', metric: 'Enterprise security', verified: true, platform: 'g2', category: 'enterprise', likes: 376, timeAgo: '3 days ago', size: 'medium', industry: 'Security' },
  ];

  const filters = [
    { id: 'all', label: 'All', icon: '✦', count: testimonials.length },
    { id: 'enterprise', label: 'Enterprise', icon: '🏢', count: testimonials.filter(t => t.category === 'enterprise').length },
    { id: 'startup', label: 'Startups', icon: '🚀', count: testimonials.filter(t => t.category === 'startup').length },
    { id: 'developer', label: 'Developers', icon: '👨‍💻', count: testimonials.filter(t => t.category === 'developer').length },
  ];

  const platformIcons = {
    twitter: { icon: '𝕏', color: '#000', bg: '#fff' },
    linkedin: { icon: 'in', color: '#fff', bg: '#0077b5' },
    g2: { icon: 'G2', color: '#ff492c', bg: 'rgba(255,73,44,0.15)' },
    producthunt: { icon: 'PH', color: '#da552f', bg: 'rgba(218,85,47,0.15)' },
  };

  const filtered = activeFilter === 'all' ? testimonials : testimonials.filter(t => t.category === activeFilter);

  const toggleBookmark = (id) => {
    setBookmarked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleLike = (id) => {
    setLiked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const TestimonialCard = ({ t, index }) => {
    const isHovered = hoveredId === t.id;
    const isSelected = selectedId === t.id;
    const isBookmarked = bookmarked.has(t.id);
    const isLiked = liked.has(t.id);
    const platform = platformIcons[t.platform];

    const cardHeight = t.size === 'large' ? 420 : t.size === 'medium' ? 360 : 320;

    return (
      <motion.div
        layout
        layoutId={`card-${t.id}`}
        onHoverStart={() => setHoveredId(t.id)}
        onHoverEnd={() => setHoveredId(null)}
        onClick={() => setSelectedId(isSelected ? null : t.id)}
        style={{
          minHeight: cardHeight,
          background: 'rgba(15,15,25,0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '24px',
          cursor: 'pointer',
          border: `1px solid ${isHovered || isSelected ? t.color : 'rgba(255,255,255,0.08)'}`,
          boxShadow: isHovered ? `0 25px 60px ${t.color}30, 0 0 0 1px ${t.color}40` : '0 10px 40px rgba(0,0,0,0.3)',
          position: 'relative',
          overflow: 'hidden',
          transition: 'border 0.3s, box-shadow 0.3s',
          display: 'flex',
          flexDirection: 'column',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        <motion.div
          style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 0%, ${t.color}15 0%, transparent 70%)`, opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        />

        {/* Top badges row */}
        <div style={{ position: 'absolute', top: 14, right: 14, display: 'flex', gap: '6px', zIndex: 3 }}>
          {t.hasVideo && (
            <motion.div
              style={{
                width: 28, height: 28, borderRadius: '8px',
                background: 'rgba(255,0,0,0.15)', color: '#ff0033',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.65rem', fontWeight: 800,
                border: '1px solid rgba(255,0,0,0.2)',
              }}
              whileHover={{ scale: 1.1 }}
              title="Video testimonial"
            >
              ▶
            </motion.div>
          )}
          <motion.div
            style={{
              width: 28, height: 28, borderRadius: '8px',
              background: platform.bg, color: platform.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.6rem', fontWeight: 800,
            }}
            animate={{ scale: isHovered ? 1.1 : 1 }}
          >
            {platform.icon}
          </motion.div>
        </div>

        <div style={{ position: 'relative', zIndex: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '16px' }}>
            <motion.div
              style={{
                width: 56, height: 56, borderRadius: '18px',
                background: `linear-gradient(135deg, ${t.color}, ${t.color}80)`,
                padding: '2.5px',
                boxShadow: `0 6px 20px ${t.color}40`,
                flexShrink: 0,
              }}
              animate={{
                scale: isHovered ? 1.08 : 1,
                rotate: isHovered ? [0, -4, 4, -2, 0] : 0
              }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={t.photo}
                alt={t.name}
                style={{ width: '100%', height: '100%', borderRadius: '15px', objectFit: 'cover' }}
              />
            </motion.div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                <span style={{ fontWeight: 700, color: '#fff', fontSize: '1rem' }}>{t.name}</span>
                {t.verified && (
                  <motion.div
                    style={{
                      width: 18, height: 18, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.65rem', color: '#fff', fontWeight: 800,
                    }}
                    animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
                    transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0, repeatDelay: 2 }}
                  >
                    ✓
                  </motion.div>
                )}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#aaa', marginBottom: '2px' }}>{t.role}</div>
              <div style={{ fontSize: '0.75rem', color: t.color, fontWeight: 600 }}>{t.company}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
              <div style={{ color: '#fbbf24', fontSize: '0.75rem', letterSpacing: '-1px' }}>{'★'.repeat(t.rating)}</div>
              <motion.div
                style={{
                  fontSize: '0.65rem', padding: '4px 10px', borderRadius: '8px',
                  background: `${t.color}20`, color: t.color, fontWeight: 700,
                  border: `1px solid ${t.color}30`,
                }}
                animate={{ scale: isHovered ? 1.08 : 1 }}
              >
                {t.metric}
              </motion.div>
            </div>
          </div>

          {/* Quote */}
          <motion.div
            style={{
              position: 'relative', paddingLeft: '16px',
              borderLeft: `3px solid ${t.color}40`,
              marginBottom: '14px',
              flex: 1,
            }}
          >
            <motion.span
              style={{
                position: 'absolute', top: -10, left: -8,
                fontSize: '2.5rem', color: t.color, opacity: 0.25,
                fontFamily: 'Georgia, serif', lineHeight: 1
              }}
            >
              "
            </motion.span>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>
              {t.text}
            </p>
          </motion.div>

          {/* Industry tag */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
            <span style={{
              fontSize: '0.65rem', padding: '3px 8px', borderRadius: '6px',
              background: 'rgba(255,255,255,0.05)', color: '#888',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              {t.industry}
            </span>
            <span style={{ fontSize: '0.65rem', color: '#666', padding: '3px 0' }}>• {t.timeAgo}</span>
          </div>

          {/* Action bar */}
          <motion.div
            style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.08)' }}
            animate={{ opacity: isHovered ? 1 : 0.7 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => { e.stopPropagation(); toggleLike(t.id); }}
              style={{
                background: isLiked ? `${t.color}15` : 'rgba(255,255,255,0.05)',
                border: `1px solid ${isLiked ? `${t.color}30` : 'rgba(255,255,255,0.08)'}`,
                padding: '6px 12px', borderRadius: '12px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '5px',
                fontSize: '0.7rem', color: isLiked ? t.color : '#888',
                fontWeight: 600,
              }}
            >
              <span style={{ fontSize: '0.85rem' }}>{isLiked ? '♥' : '♡'}</span> {t.likes + (isLiked ? 1 : 0)}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => { e.stopPropagation(); toggleBookmark(t.id); }}
              style={{
                background: isBookmarked ? `${t.color}15` : 'rgba(255,255,255,0.05)',
                border: `1px solid ${isBookmarked ? `${t.color}30` : 'rgba(255,255,255,0.08)'}`,
                padding: '6px 12px', borderRadius: '12px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '5px',
                fontSize: '0.7rem', color: isBookmarked ? t.color : '#888',
                fontWeight: 600,
              }}
            >
              {isBookmarked ? '★' : '☆'} Save
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '6px 12px', borderRadius: '12px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '5px',
                fontSize: '0.7rem', color: '#888',
                fontWeight: 600,
                marginLeft: 'auto',
              }}
            >
              ↗ Share
            </motion.button>
          </motion.div>

          {/* Expanded content */}
          <AnimatePresence>
            {isSelected && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {['Read case study', 'Watch video', 'Contact', 'Visit website'].map((action, i) => (
                    <motion.button
                      key={action}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        padding: '10px 14px', borderRadius: '10px',
                        background: i === 0 ? t.color : 'rgba(255,255,255,0.08)',
                        border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.12)',
                        color: '#fff', fontSize: '0.75rem',
                        fontWeight: 600, cursor: 'pointer',
                      }}
                    >
                      {action}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom accent */}
        <motion.div
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px',
            background: `linear-gradient(90deg, transparent, ${t.color}, transparent)`,
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    );
  };

  return (
    <>
      <div className="demo-header">
        <h2 className="demo-title">Testimonial Wall</h2>
        <p className="demo-subtitle">Dynamic masonry grid with 12 testimonials, video badges, and interactive elements</p>
      </div>
      <div className="demo-area">
        {/* Top controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {filters.map(f => (
              <motion.button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '10px 18px', borderRadius: '24px', border: 'none',
                  background: activeFilter === f.id ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.05)',
                  color: activeFilter === f.id ? '#fff' : '#888',
                  fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '8px',
                  border: activeFilter === f.id ? 'none' : '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <span style={{ fontSize: '1.1rem' }}>{f.icon}</span>
                <span>{f.label}</span>
                <span style={{
                  fontSize: '0.7rem',
                  background: activeFilter === f.id ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)',
                  padding: '2px 6px',
                  borderRadius: '8px',
                  fontWeight: 700,
                }}>
                  {f.count}
                </span>
              </motion.button>
            ))}
          </div>

          {/* View toggle */}
          <div style={{ display: 'flex', gap: '6px', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
            {[
              { id: 'masonry', icon: '▦', label: 'Masonry' },
              { id: 'grid', icon: '▢', label: 'Grid' },
            ].map(mode => (
              <motion.button
                key={mode.id}
                onClick={() => setViewMode(mode.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '6px 12px', borderRadius: '8px', border: 'none',
                  background: viewMode === mode.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                  color: viewMode === mode.id ? '#fff' : '#666',
                  fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '6px',
                }}
              >
                <span>{mode.icon}</span> {mode.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Testimonials grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: viewMode === 'masonry' ? 'repeat(auto-fill, minmax(340px, 1fr))' : 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: '20px',
            marginBottom: '32px',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((t, i) => (
              <TestimonialCard key={t.id} t={t} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Animated stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{ marginTop: '32px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap' }}>
            {[
              { value: animatedStats.rating.toFixed(1), label: 'Average Rating', suffix: '/5', icon: '⭐', color: '#fbbf24' },
              { value: animatedStats.reviews.toLocaleString(), label: 'Verified Reviews', suffix: '', icon: '✓', color: '#4facfe' },
              { value: animatedStats.teams >= 1000 ? `${Math.round(animatedStats.teams/1000)}K` : animatedStats.teams, label: 'Happy Teams', suffix: '+', icon: '💜', color: '#a855f7' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                style={{ textAlign: 'center' }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1, type: 'spring' }}
              >
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '1.5rem' }}>{stat.icon}</span>
                  <span>{stat.value}{stat.suffix}</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#777', marginTop: '6px', fontWeight: 600 }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Trust badges */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '28px', flexWrap: 'wrap' }}>
            {[
              { label: '#1 on G2', bg: 'linear-gradient(135deg, #ff492c20, #ff492c10)', color: '#ff492c' },
              { label: 'SOC 2 Certified', bg: 'linear-gradient(135deg, #4facfe20, #4facfe10)', color: '#4facfe' },
              { label: 'GDPR Compliant', bg: 'linear-gradient(135deg, #43e97b20, #43e97b10)', color: '#43e97b' },
              { label: 'ISO 27001', bg: 'linear-gradient(135deg, #a78bfa20, #a78bfa10)', color: '#a78bfa' },
            ].map((badge, i) => (
              <motion.div
                key={i}
                style={{
                  padding: '8px 16px', borderRadius: '12px',
                  background: badge.bg, border: `1px solid ${badge.color}20`,
                  fontSize: '0.7rem', color: badge.color, fontWeight: 700,
                  display: 'flex', alignItems: 'center', gap: '6px',
                }}
                whileHover={{ scale: 1.08, y: -2 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.05 }}
              >
                <span>✓</span> {badge.label}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
}
