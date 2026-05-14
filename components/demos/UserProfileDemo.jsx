'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function UserProfileDemo() {
  const [isEditing, setIsEditing] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('overview');
  const [isAvatarHovered, setIsAvatarHovered] = React.useState(false);
  const [profile, setProfile] = React.useState({
    name: 'Alex Developer',
    title: 'Senior Full Stack Engineer',
    bio: 'Building the future one line of code at a time. Passionate about clean architecture, beautiful UIs, and mentoring developers.',
    location: 'San Francisco, CA',
    website: 'alexdev.io',
    email: 'alex@alexdev.io',
    phone: '+1 (555) 123-4567',
    company: 'TechCorp Inc.',
    joinDate: 'Jan 2021',
    availability: 'Available for hire',
  });

  const [stats] = React.useState({
    projects: 47,
    followers: '2.4K',
    following: 342,
    contributions: 1234,
  });

  const [skills] = React.useState([
    { name: 'React', level: 95, color: '#61dafb' },
    { name: 'TypeScript', level: 90, color: '#3178c6' },
    { name: 'Node.js', level: 88, color: '#68a063' },
    { name: 'Python', level: 85, color: '#3776ab' },
    { name: 'GraphQL', level: 80, color: '#e10098' },
    { name: 'Docker', level: 75, color: '#2496ed' },
  ]);

  const [experience] = React.useState([
    {
      company: 'TechCorp Inc.',
      role: 'Senior Full Stack Engineer',
      period: '2021 - Present',
      icon: '🏢',
      color: '#667eea'
    },
    {
      company: 'StartupXYZ',
      role: 'Full Stack Developer',
      period: '2019 - 2021',
      icon: '🚀',
      color: '#43e97b'
    },
    {
      company: 'DevAgency',
      role: 'Frontend Developer',
      period: '2017 - 2019',
      icon: '💼',
      color: '#f093fb'
    },
  ]);

  const [recentActivity] = React.useState([
    { action: 'Published new article', item: 'Advanced React Patterns', time: '2h ago', icon: '📝' },
    { action: 'Merged PR', item: 'Feature: Dark Mode', time: '5h ago', icon: '🔀' },
    { action: 'Starred repository', item: 'framer-motion', time: '1d ago', icon: '⭐' },
    { action: 'Completed course', item: 'Advanced TypeScript', time: '3d ago', icon: '🎓' },
  ]);

  const [badges] = React.useState([
    { icon: '🏆', name: 'Top Contributor', color: '#ffd700', description: '100+ contributions' },
    { icon: '⭐', name: 'Star Developer', color: '#667eea', description: 'Featured developer' },
    { icon: '🚀', name: 'Early Adopter', color: '#43e97b', description: 'Beta tester' },
    { icon: '💎', name: 'Premium Member', color: '#f093fb', description: 'Pro subscriber' },
  ]);

  const [socialLinks] = React.useState([
    { platform: 'GitHub', icon: '🐙', url: 'github.com/alexdev', verified: true, followers: '3.2K' },
    { platform: 'Twitter', icon: '🐦', url: '@alexdev', verified: true, followers: '5.1K' },
    { platform: 'LinkedIn', icon: '💼', url: 'linkedin.com/in/alexdev', verified: true, followers: '2.8K' },
    { platform: 'Medium', icon: '📝', url: 'medium.com/@alexdev', verified: false, followers: '1.2K' },
  ]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '👤' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'activity', label: 'Activity', icon: '📊' },
  ];

  return (
    <>
      <h2 className="demo-title">User Profile</h2>
      <p className="demo-subtitle">Production-quality profile with tabs, skills progress, experience timeline, and activity feed.</p>
      <div className="demo-area" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30, position: 'relative' }}>
      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: '5%', left: '20%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '15%', width: 350, height: 350, background: 'radial-gradient(circle, rgba(240, 147, 251, 0.12) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none', zIndex: 0 }} />

      <motion.div
        style={{
          width: 1000,
          height: 750,
          background: 'rgba(20, 20, 30, 0.95)',
          borderRadius: 24,
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        {/* Cover & Avatar Section */}
        <div style={{ position: 'relative' }}>
          {/* Cover Image with animated gradient */}
          <motion.div
            style={{
              height: 200,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
              position: 'relative',
              backgroundSize: '200% 200%',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          >
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            }} />

            {/* Status indicator */}
            <motion.div
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
                padding: '8px 16px',
                borderRadius: 20,
                background: 'rgba(67, 233, 123, 0.2)',
                border: '1px solid rgba(67, 233, 123, 0.5)',
                color: '#43e97b',
                fontSize: '0.85rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ●
              </motion.span>
              {profile.availability}
            </motion.div>
          </motion.div>

          {/* Avatar with hover effect */}
          <motion.div
            style={{
              width: 150,
              height: 150,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              border: '6px solid rgba(20, 20, 30, 0.95)',
              position: 'absolute',
              bottom: -75,
              left: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '4.5rem',
              boxShadow: isAvatarHovered
                ? '0 20px 60px rgba(102, 126, 234, 0.6)'
                : '0 10px 40px rgba(102, 126, 234, 0.4)',
              cursor: 'pointer',
            }}
            onHoverStart={() => setIsAvatarHovered(true)}
            onHoverEnd={() => setIsAvatarHovered(false)}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            👨‍💻
            {isAvatarHovered && (
              <motion.div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                📷
              </motion.div>
            )}
          </motion.div>

          {/* Edit & Share Buttons */}
          <div style={{ position: 'absolute', bottom: 20, right: 20, display: 'flex', gap: 10 }}>
            <motion.button
              style={{
                padding: '12px 20px',
                borderRadius: 12,
                background: 'rgba(102, 126, 234, 0.2)',
                border: '1px solid rgba(102, 126, 234, 0.5)',
                color: '#667eea',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
              whileHover={{ scale: 1.05, background: 'rgba(102, 126, 234, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              🔗 Share
            </motion.button>
            <motion.button
              onClick={() => setIsEditing(!isEditing)}
              style={{
                padding: '12px 24px',
                borderRadius: 12,
                background: isEditing ? 'rgba(250, 112, 154, 0.3)' : 'rgba(102, 126, 234, 0.3)',
                border: isEditing ? '1px solid rgba(250, 112, 154, 0.5)' : '1px solid rgba(102, 126, 234, 0.5)',
                color: isEditing ? '#fa709a' : '#667eea',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isEditing ? '✕ Cancel' : '✏️ Edit Profile'}
            </motion.button>
          </div>
        </div>

        {/* Profile Header Info */}
        <div style={{ padding: '90px 40px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <motion.h2
                style={{
                  fontSize: '2.2rem',
                  fontWeight: 800,
                  color: '#fff',
                  marginBottom: 8,
                  margin: 0,
                }}
                animate={isEditing ? { color: ['#fff', '#667eea', '#fff'] } : {}}
                transition={{ duration: 2, repeat: isEditing ? Infinity : 0 }}
              >
                {profile.name}
              </motion.h2>
              <div style={{
                fontSize: '1.15rem',
                color: '#888',
                marginBottom: 12,
              }}>
                {profile.title} at {profile.company}
              </div>
              <div style={{ display: 'flex', gap: 20, color: '#888', fontSize: '0.9rem', flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  📍 {profile.location}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  📧 {profile.email}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  📱 {profile.phone}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  🗓️ Joined {profile.joinDate}
                </span>
              </div>
            </div>

            {/* Quick Stats */}
            <div style={{ display: 'flex', gap: 20 }}>
              {Object.entries(stats).slice(0, 3).map(([key, value], index) => (
                <motion.div
                  key={key}
                  style={{
                    textAlign: 'center',
                    minWidth: 80,
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    {value}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#666', textTransform: 'capitalize' }}>
                    {key}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div style={{
          display: 'flex',
          gap: 5,
          padding: '0 40px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}>
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '16px 24px',
                background: activeTab === tab.id ? 'rgba(102, 126, 234, 0.2)' : 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.id ? '3px solid #667eea' : '3px solid transparent',
                color: activeTab === tab.id ? '#fff' : '#888',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                transition: 'all 0.3s',
              }}
              whileHover={{ background: 'rgba(102, 126, 234, 0.1)' }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ flex: 1, padding: '30px 40px', overflow: 'auto' }}>
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 25 }}
              >
                {/* Bio */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <div style={{
                    padding: 20,
                    borderRadius: 14,
                    background: 'rgba(40, 40, 50, 0.6)',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}>
                    <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                      📝 ABOUT
                    </div>
                    <div style={{ fontSize: '0.95rem', color: '#ccc', lineHeight: 1.7 }}>
                      {profile.bio}
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: 15, fontWeight: 600 }}>
                    🏆 ACHIEVEMENTS
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {badges.map((badge, index) => (
                      <motion.div
                        key={badge.name}
                        style={{
                          padding: '14px 18px',
                          borderRadius: 12,
                          background: `${badge.color}15`,
                          border: `1px solid ${badge.color}40`,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          cursor: 'pointer',
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.03, x: 5 }}
                      >
                        <div style={{
                          fontSize: '2rem',
                          width: 50,
                          height: 50,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 10,
                          background: `${badge.color}20`,
                        }}>
                          {badge.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '0.9rem', fontWeight: 600, color: badge.color }}>
                            {badge.name}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#888' }}>
                            {badge.description}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: 15, fontWeight: 600 }}>
                    🔗 SOCIAL LINKS
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {socialLinks.map((social, index) => (
                      <motion.div
                        key={social.platform}
                        style={{
                          padding: '14px 18px',
                          borderRadius: 12,
                          background: 'rgba(40, 40, 50, 0.6)',
                          border: '1px solid rgba(255,255,255,0.05)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          cursor: 'pointer',
                        }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.03, x: -5, background: 'rgba(40, 40, 50, 0.8)' }}
                      >
                        <div style={{ fontSize: '1.5rem' }}>{social.icon}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: 6 }}>
                            {social.platform}
                            {social.verified && <span style={{ fontSize: '0.9rem' }}>✓</span>}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#888' }}>
                            {social.url} · {social.followers} followers
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'skills' && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: 20, fontWeight: 600 }}>
                  ⚡ TECHNICAL SKILLS
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                        <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff' }}>
                          {skill.name}
                        </span>
                        <span style={{ fontSize: '0.9rem', color: skill.color, fontWeight: 600 }}>
                          {skill.level}%
                        </span>
                      </div>
                      <div style={{
                        height: 12,
                        borderRadius: 6,
                        background: 'rgba(40, 40, 50, 0.8)',
                        overflow: 'hidden',
                        position: 'relative',
                      }}>
                        <motion.div
                          style={{
                            height: '100%',
                            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}dd)`,
                            borderRadius: 6,
                            position: 'relative',
                            boxShadow: `0 0 10px ${skill.color}60`,
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: 'easeOut' }}
                        >
                          <motion.div
                            style={{
                              position: 'absolute',
                              inset: 0,
                              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                            }}
                            animate={{ x: ['-100%', '200%'] }}
                            transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'experience' && (
              <motion.div
                key="experience"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: 20, fontWeight: 600 }}>
                  💼 WORK EXPERIENCE
                </div>
                <div style={{ position: 'relative', paddingLeft: 40 }}>
                  {/* Timeline line */}
                  <div style={{
                    position: 'absolute',
                    left: 19,
                    top: 0,
                    bottom: 0,
                    width: 2,
                    background: 'linear-gradient(180deg, #667eea, #764ba2, #f093fb)',
                  }} />

                  {experience.map((exp, index) => (
                    <motion.div
                      key={exp.company}
                      style={{
                        marginBottom: 30,
                        position: 'relative',
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.15 }}
                    >
                      {/* Timeline dot */}
                      <motion.div
                        style={{
                          position: 'absolute',
                          left: -28,
                          top: 8,
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          background: exp.color,
                          border: '3px solid rgba(20, 20, 30, 0.95)',
                          boxShadow: `0 0 15px ${exp.color}80`,
                        }}
                        whileHover={{ scale: 1.3 }}
                      />

                      <motion.div
                        style={{
                          padding: 20,
                          borderRadius: 14,
                          background: 'rgba(40, 40, 50, 0.6)',
                          border: '1px solid rgba(255,255,255,0.05)',
                        }}
                        whileHover={{ scale: 1.02, background: 'rgba(40, 40, 50, 0.8)' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 15 }}>
                          <div style={{
                            fontSize: '2.5rem',
                            width: 60,
                            height: 60,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 12,
                            background: `${exp.color}20`,
                          }}>
                            {exp.icon}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: 4 }}>
                              {exp.role}
                            </div>
                            <div style={{ fontSize: '0.95rem', color: exp.color, marginBottom: 8 }}>
                              {exp.company}
                            </div>
                            <div style={{ fontSize: '0.85rem', color: '#888' }}>
                              📅 {exp.period}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'activity' && (
              <motion.div
                key="activity"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: 20, fontWeight: 600 }}>
                  📊 RECENT ACTIVITY
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={index}
                      style={{
                        padding: '16px 20px',
                        borderRadius: 12,
                        background: 'rgba(40, 40, 50, 0.6)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 15,
                        cursor: 'pointer',
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5, background: 'rgba(40, 40, 50, 0.8)' }}
                    >
                      <div style={{
                        fontSize: '2rem',
                        width: 50,
                        height: 50,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                        background: 'rgba(102, 126, 234, 0.2)',
                      }}>
                        {activity.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.9rem', color: '#fff', marginBottom: 4 }}>
                          <span style={{ fontWeight: 600 }}>{activity.action}</span>
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#888' }}>
                          {activity.item}
                        </div>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#666' }}>
                        {activity.time}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
    </>
  );
}
