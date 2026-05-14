'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function BreadcrumbNavDemo() {
  const [activePath, setActivePath] = React.useState('products');
  const [dropdownOpen, setDropdownOpen] = React.useState(null);

  const breadcrumbs = [
    {
      id: 'home',
      label: 'Home',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      id: 'products',
      label: 'Products',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
      hasDropdown: true,
      dropdownItems: [
        { id: 'all', label: 'All Products', desc: 'Browse our catalog' },
        { id: 'new', label: 'New Arrivals', desc: 'Latest releases' },
        { id: 'featured', label: 'Featured', desc: 'Top picks' },
        { id: 'sale', label: 'On Sale', desc: 'Best deals' },
      ],
    },
    {
      id: 'electronics',
      label: 'Electronics',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
      hasDropdown: true,
      dropdownItems: [
        { id: 'phones', label: 'Phones', desc: 'Smartphones & accessories' },
        { id: 'laptops', label: 'Laptops', desc: 'Computers & tablets' },
        { id: 'audio', label: 'Audio', desc: 'Headphones & speakers' },
        { id: 'cameras', label: 'Cameras', desc: 'Photography gear' },
      ],
    },
    {
      id: 'smartphones',
      label: 'Smartphones',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="5" y="2" width="14" height="20" rx="2" />
          <path d="M12 18h.01" />
        </svg>
      ),
    },
  ];

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30, position: 'relative' }}>
      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: '20%', left: '35%', width: 300, height: 200, background: 'radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none', zIndex: 0 }} />
      <h2 className="demo-title">Breadcrumb Navigation</h2>
      <p className="demo-subtitle">
        Clickable path navigation with dropdown menus, icons, and smooth animations. Hover over items with dropdowns to explore.
      </p>

      <motion.nav
        className="breadcrumb-nav"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ position: 'relative', zIndex: 1, backdropFilter: 'blur(10px)' }}
      >
        <AnimatePresence>
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.id}>
              {/* Breadcrumb Item */}
              <motion.div
                className={`breadcrumb-item ${activePath === crumb.id ? 'active' : ''}`}
                onClick={() => setActivePath(crumb.id)}
                onMouseEnter={() => crumb.hasDropdown && setDropdownOpen(crumb.id)}
                onMouseLeave={() => setDropdownOpen(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {crumb.icon}
                <span>{crumb.label}</span>

                {/* Dropdown Menu */}
                {crumb.hasDropdown && dropdownOpen === crumb.id && (
                  <motion.div
                    className="breadcrumb-dropdown"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AnimatePresence>
                      {crumb.dropdownItems.map((item) => (
                        <motion.div
                          key={item.id}
                          className="breadcrumb-dropdown-item"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActivePath(item.id);
                            setDropdownOpen(null);
                          }}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                          whileHover={{ x: 5 }}
                        >
                          <div>{item.label}</div>
                          <div style={{ fontSize: '0.7rem', color: '#888' }}>{item.desc}</div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}
              </motion.div>

              {/* Separator */}
              {index < breadcrumbs.length - 1 && (
                <motion.span
                  className="breadcrumb-separator"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.05 }}
                  style={{ color: '#667eea', fontSize: '1.2rem' }}
                >
                  ›
                </motion.span>
              )}
            </React.Fragment>
          ))}
        </AnimatePresence>
      </motion.nav>

      {/* Current Location Display */}
      <motion.div
        style={{
          padding: '20px 30px',
          background: 'rgba(102, 126, 234, 0.1)',
          borderRadius: 12,
          border: '1px solid rgba(102, 126, 234, 0.3)',
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div style={{ fontSize: '0.75rem', color: '#667eea', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
          Current Location
        </div>
        <div style={{ fontSize: '1.1rem', color: '#fff', fontWeight: 500 }}>
          {breadcrumbs.find((b) => b.id === activePath)?.label || 'Home'}
        </div>
      </motion.div>
    </div>
  );
}
