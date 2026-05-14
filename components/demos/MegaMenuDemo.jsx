'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function MegaMenuDemo() {
  const [activeMenu, setActiveMenu] = React.useState(null);
  const [hoveredLink, setHoveredLink] = React.useState(null);

  const menuItems = [
    {
      id: 'products',
      label: 'Products',
      columns: [
        {
          title: 'By Category',
          links: [
            { icon: '💻', label: 'Software', desc: 'Apps & developer tools', badge: 'Popular', badgeColor: '#667eea' },
            { icon: '🔧', label: 'Hardware', desc: 'Devices & accessories', price: 'From $99', priceColor: '#22c55e' },
            { icon: '🎨', label: 'Design Assets', desc: 'Templates & graphics', trending: true },
            { icon: '📚', label: 'Education', desc: 'Courses & tutorials', users: '50k+ users' },
            { icon: '☁️', label: 'Cloud Services', desc: 'Hosting & infrastructure', badge: 'New', badgeColor: '#f59e0b' },
          ],
        },
        {
          title: 'By Use Case',
          links: [
            { icon: '🏢', label: 'Enterprise', desc: 'Large team solutions', users: '1k+ teams' },
            { icon: '👥', label: 'Small Business', desc: 'Starter friendly plans', price: '$29/mo', priceColor: '#667eea' },
            { icon: '👤', label: 'Personal', desc: 'Individual creators', badge: 'Free', badgeColor: '#22c55e' },
            { icon: '🎓', label: 'Education', desc: 'Schools & students', discount: '50% off' },
          ],
        },
        {
          title: 'Trending Now',
          featured: true,
          items: [
            { title: 'AI Code Assistant', tag: 'Hot', metric: '+234% usage', color: '#ef4444' },
            { title: 'Team Workspaces', tag: 'New', metric: '10k+ teams', color: '#667eea' },
            { title: 'Analytics Pro', tag: 'Updated', metric: 'v2.0', color: '#22c55e' },
          ],
        },
      ],
    },
    {
      id: 'resources',
      label: 'Resources',
      columns: [
        {
          title: 'Learn',
          links: [
            { icon: '📖', label: 'Documentation', desc: 'Complete guides & API refs', badge: 'Updated', badgeColor: '#667eea' },
            { icon: '🎬', label: 'Video Tutorials', desc: '100+ hours of content', users: '25k views' },
            { icon: '💡', label: 'Blog', desc: 'Industry insights', trending: true },
            { icon: '🎙️', label: 'Podcast', desc: 'Expert interviews', badge: 'New', badgeColor: '#f59e0b' },
            { icon: '📊', label: 'Case Studies', desc: 'Real customer stories', users: '50+ stories' },
          ],
        },
        {
          title: 'Community',
          links: [
            { icon: '💬', label: 'Forum', desc: 'Ask questions & share', users: '100k+ members' },
            { icon: '🗓️', label: 'Events', desc: 'Webinars & meetups', badge: 'Live', badgeColor: '#ef4444' },
            { icon: '🤝', label: 'Partners', desc: 'Integration network', users: '500+ apps' },
            { icon: '🏆', label: 'Champions', desc: 'Top contributors', trending: true },
          ],
        },
        {
          title: 'Latest Updates',
          featured: true,
          items: [
            { title: 'Q1 2024 Roadmap', tag: 'Planning', metric: 'Mar 15', color: '#667eea' },
            { title: 'API v3 Released', tag: 'Launch', metric: 'Today', color: '#22c55e' },
            { title: 'Security Update', tag: 'Critical', metric: 'Action needed', color: '#ef4444' },
          ],
        },
      ],
    },
    {
      id: 'company',
      label: 'Company',
      columns: [
        {
          title: 'About Us',
          links: [
            { icon: '🎯', label: 'Mission', desc: 'Our vision & values' },
            { icon: '👔', label: 'Leadership', desc: 'Meet the executive team', users: '50+ people' },
            { icon: '📍', label: 'Locations', desc: 'Global offices', badge: '12 cities', badgeColor: '#667eea' },
            { icon: '📰', label: 'Newsroom', desc: 'Press & media', trending: true },
            { icon: '🌱', label: 'Sustainability', desc: 'Environmental impact', badge: 'Carbon neutral', badgeColor: '#22c55e' },
          ],
        },
        {
          title: 'Join Us',
          links: [
            { icon: '💼', label: 'Open Positions', desc: 'View all openings', badge: '23 roles', badgeColor: '#f59e0b' },
            { icon: '🌟', label: 'Life Here', desc: 'Culture & benefits', users: 'Remote OK' },
            { icon: '🎓', label: 'Internships', desc: 'Summer programs', badge: 'Paid', badgeColor: '#22c55e' },
            { icon: '🚀', label: 'Engineering', desc: 'Tech roles', trending: true },
          ],
        },
        {
          title: 'Quick Stats',
          featured: true,
          items: [
            { title: 'Founded 2018', tag: 'History', metric: '6 years', color: '#667eea' },
            { title: '500+ Employees', tag: 'Team', metric: 'Growing', color: '#22c55e' },
            { title: '$100M ARR', tag: 'Revenue', metric: '+150% YoY', color: '#f59e0b' },
          ],
        },
      ],
    },
  ];

  return (
    <div className="megamenu-demo" style={{ position: 'relative' }}>
      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: '-10%', left: '20%', width: 450, height: 450, background: 'radial-gradient(circle, rgba(102, 126, 234, 0.12) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '30%', right: '15%', width: 350, height: 350, background: 'radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none', zIndex: 0 }} />

      <h2 className="demo-title">Mega Menu</h2>
      <p className="demo-subtitle">
        Production-grade multi-column navigation with rich content, badges, stats, and interactive elements.
        Hover over menu items to explore enhanced layouts.
      </p>

      {/* Navigation Bar */}
      <motion.nav
        className="megamenu-nav"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        {menuItems.map((item) => (
          <motion.div
            key={item.id}
            className={`megamenu-item ${activeMenu === item.id ? 'active' : ''}`}
            onMouseEnter={() => setActiveMenu(item.id)}
            onMouseLeave={() => setActiveMenu(null)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {item.label}
            {activeMenu === item.id && (
              <motion.div
                layoutId="activeIndicator"
                style={{
                  position: 'absolute',
                  bottom: -2,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 30,
                  height: 2,
                  background: '#667eea',
                  borderRadius: 2,
                }}
              />
            )}
          </motion.div>
        ))}
      </motion.nav>

      {/* Mega Menu Dropdown */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            className="megamenu-dropdown"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            onMouseEnter={() => setActiveMenu(activeMenu)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="megamenu-grid">
              {menuItems
                .find((m) => m.id === activeMenu)
                ?.columns.map((column, colIndex) => (
                  <div key={colIndex} className="megamenu-column">
                    <motion.h4
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: colIndex * 0.05 }}
                    >
                      {column.title}
                    </motion.h4>

                    {column.featured ? (
                      // Featured content cards
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
                        {column.items.map((item, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + idx * 0.05 }}
                            whileHover={{ scale: 1.02, x: 3 }}
                            style={{
                              padding: 14,
                              background: 'rgba(255,255,255,0.03)',
                              borderRadius: 10,
                              border: '1px solid rgba(255,255,255,0.06)',
                              cursor: 'pointer',
                              position: 'relative',
                              overflow: 'hidden',
                            }}
                          >
                            <div style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: 3,
                              height: '100%',
                              background: item.color,
                            }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>
                                {item.title}
                              </div>
                              <div style={{
                                fontSize: '0.65rem',
                                padding: '2px 8px',
                                borderRadius: 6,
                                background: item.color + '20',
                                color: item.color,
                                fontWeight: 600,
                              }}>
                                {item.tag}
                              </div>
                            </div>
                            <div style={{ fontSize: '0.7rem', color: '#888' }}>
                              {item.metric}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      // Regular link items
                      column.links.map((link, linkIndex) => (
                        <motion.div
                          key={link.label}
                          className="megamenu-link"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 + linkIndex * 0.04 }}
                          whileHover={{ x: 5, backgroundColor: 'rgba(102, 126, 234, 0.1)' }}
                          onMouseEnter={() => setHoveredLink(link.label)}
                          onMouseLeave={() => setHoveredLink(null)}
                          style={{ position: 'relative' }}
                        >
                          <motion.div
                            className="megamenu-link-icon"
                            animate={{ rotate: hoveredLink === link.label ? [0, -10, 10, -10, 0] : 0 }}
                            transition={{ duration: 0.5 }}
                          >
                            {link.icon}
                          </motion.div>
                          <div className="megamenu-link-text" style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                              <span style={{ fontWeight: 500 }}>{link.label}</span>
                              {link.trending && (
                                <motion.span
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: 0.2 + linkIndex * 0.04 }}
                                  style={{
                                    fontSize: '0.7rem',
                                    padding: '2px 6px',
                                    background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                                    borderRadius: 4,
                                    fontWeight: 600,
                                  }}
                                >
                                  🔥 Trending
                                </motion.span>
                              )}
                              {link.badge && (
                                <motion.span
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: 0.2 + linkIndex * 0.04 }}
                                  style={{
                                    fontSize: '0.65rem',
                                    padding: '2px 7px',
                                    background: link.badgeColor + '20',
                                    color: link.badgeColor,
                                    borderRadius: 4,
                                    fontWeight: 600,
                                    border: `1px solid ${link.badgeColor}30`,
                                  }}
                                >
                                  {link.badge}
                                </motion.span>
                              )}
                            </div>
                            <div className="megamenu-link-desc">{link.desc}</div>
                            {(link.price || link.users || link.discount) && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 + linkIndex * 0.04 }}
                                style={{
                                  fontSize: '0.7rem',
                                  marginTop: 4,
                                  color: link.priceColor || '#888',
                                  fontWeight: 600,
                                }}
                              >
                                {link.price || link.users || link.discount}
                              </motion.div>
                            )}
                          </div>
                          {hoveredLink === link.label && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              style={{
                                fontSize: '0.9rem',
                                color: '#667eea',
                              }}
                            >
                              →
                            </motion.div>
                          )}
                        </motion.div>
                      ))
                    )}
                  </div>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
