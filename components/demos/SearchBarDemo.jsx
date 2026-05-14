'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function SearchBarDemo() {
  const [query, setQuery] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const [recentSearches] = React.useState([
    'Framer Motion tutorials',
    'React hooks guide',
    'TypeScript best practices',
  ]);

  const [suggestions] = React.useState([
    { type: 'page', icon: '📄', title: 'Getting Started', category: 'Docs' },
    { type: 'page', icon: '🎨', title: 'Animation API', category: 'Docs' },
    { type: 'page', icon: '⚡', title: 'Gestures', category: 'Docs' },
    { type: 'component', icon: '📦', title: 'Motion.div', category: 'Components' },
    { type: 'component', icon: '🎭', title: 'AnimatePresence', category: 'Components' },
    { type: 'example', icon: '💡', title: 'Hover Effects', category: 'Examples' },
    { type: 'example', icon: '🔄', title: 'Page Transitions', category: 'Examples' },
  ]);

  const [activeFilters, setActiveFilters] = React.useState(['all']);

  const filters = [
    { id: 'all', label: 'All', icon: '🌐' },
    { id: 'docs', label: 'Docs', icon: '📄' },
    { id: 'components', label: 'Components', icon: '📦' },
    { id: 'examples', label: 'Examples', icon: '💡' },
  ];

  const filteredSuggestions = query
    ? suggestions.filter(s =>
        s.title.toLowerCase().includes(query.toLowerCase()) ||
        s.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const displaySuggestions = query ? filteredSuggestions : recentSearches.map((search, i) => ({
    type: 'recent',
    icon: '🕐',
    title: search,
    category: 'Recent',
  }));

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % displaySuggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + displaySuggestions.length) % displaySuggestions.length);
    } else if (e.key === 'Enter' && displaySuggestions.length > 0) {
      setQuery(displaySuggestions[selectedIndex].title);
      setIsOpen(false);
    }
  };

  return (
    <>
      <h2 className="demo-title">Search Bar</h2>
      <p className="demo-subtitle">Advanced search with autocomplete, filters, recent searches, and keyboard navigation.</p>
      <div className="demo-area" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30 }}>
      <motion.div
        style={{
          width: 800,
          position: 'relative',
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        {/* Search Input Container */}
        <motion.div
          style={{
            position: 'relative',
            zIndex: 10,
          }}
          animate={isOpen ? { borderRadius: [20, 20, 20, 20] } : { borderRadius: 20 }}
        >
          <div style={{
            position: 'relative',
            borderRadius: 20,
            background: 'rgba(30, 30, 40, 0.95)',
            border: isOpen ? '2px solid rgba(102, 126, 234, 0.6)' : '2px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            boxShadow: isOpen ? '0 20px 60px rgba(102, 126, 234, 0.3)' : '0 10px 40px rgba(0,0,0,0.3)',
            transition: 'all 0.3s',
          }}>
            {/* Search Icon */}
            <div style={{
              position: 'absolute',
              left: 20,
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '1.5rem',
              zIndex: 2,
            }}>
              {isOpen ? '🔍' : '🔎'}
            </div>

            {/* Input */}
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              onBlur={() => setTimeout(() => setIsOpen(false), 200)}
              onKeyDown={handleKeyDown}
              placeholder="Search docs, components, examples..."
              style={{
                width: '100%',
                padding: '20px 60px',
                borderRadius: 18,
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '1.1rem',
                outline: 'none',
              }}
            />

            {/* Clear Button */}
            {query && (
              <motion.button
                onClick={() => setQuery('')}
                style={{
                  position: 'absolute',
                  right: 20,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'rgba(250, 112, 154, 0.2)',
                  border: '1px solid rgba(250, 112, 154, 0.4)',
                  color: '#fa709a',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Suggestions Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                marginTop: 12,
                borderRadius: 20,
                background: 'rgba(30, 30, 40, 0.98)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                overflow: 'hidden',
                zIndex: 5,
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Filters */}
              <div style={{
                padding: '15px 20px',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {filters.map((filter) => (
                    <motion.button
                      key={filter.id}
                      onClick={() => {
                        if (filter.id === 'all') {
                          setActiveFilters(['all']);
                        } else {
                          setActiveFilters(prev =>
                            prev.includes(filter.id)
                              ? prev.filter(f => f !== filter.id)
                              : [...prev.filter(f => f !== 'all'), filter.id]
                          );
                        }
                      }}
                      style={{
                        padding: '8px 16px',
                        borderRadius: 20,
                        background: activeFilters.includes(filter.id)
                          ? 'rgba(102, 126, 234, 0.3)'
                          : 'rgba(255,255,255,0.05)',
                        border: activeFilters.includes(filter.id)
                          ? '1px solid rgba(102, 126, 234, 0.5)'
                          : '1px solid rgba(255,255,255,0.1)',
                        color: activeFilters.includes(filter.id) ? '#667eea' : '#888',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>{filter.icon}</span>
                      <span>{filter.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Suggestions List */}
              <div style={{
                maxHeight: 400,
                overflow: 'auto',
                padding: 10,
              }}>
                {displaySuggestions.length > 0 ? (
                  displaySuggestions.map((suggestion, index) => (
                    <motion.div
                      key={suggestion.title}
                      onClick={() => {
                        setQuery(suggestion.title);
                        setIsOpen(false);
                      }}
                      style={{
                        padding: '15px 20px',
                        borderRadius: 12,
                        background: selectedIndex === index
                          ? 'rgba(102, 126, 234, 0.2)'
                          : 'transparent',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 15,
                        marginBottom: 5,
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      <div style={{ fontSize: '1.5rem' }}>{suggestion.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontSize: '1rem',
                          fontWeight: 500,
                          color: '#fff',
                        }}>
                          {suggestion.title}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#888' }}>
                          {suggestion.category}
                        </div>
                      </div>
                      {selectedIndex === index && (
                        <motion.div
                          style={{
                            padding: '6px 12px',
                            borderRadius: 8,
                            background: 'rgba(102, 126, 234, 0.3)',
                            border: '1px solid rgba(102, 126, 234, 0.5)',
                            fontSize: '0.75rem',
                            color: '#667eea',
                            fontWeight: 600,
                          }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                        >
                          ENTER ↵
                        </motion.div>
                      )}
                    </motion.div>
                  ))
                ) : (
                  <div style={{
                    padding: 40,
                    textAlign: 'center',
                    color: '#888',
                  }}>
                    <div style={{ fontSize: '3rem', marginBottom: 15 }}>🔍</div>
                    <div style={{ fontSize: '1rem' }}>
                      {query ? 'No results found' : 'Start typing to search...'}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div style={{
                padding: '12px 20px',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.75rem',
                color: '#666',
              }}>
                <span>↑↓ to navigate</span>
                <span>↵ to select</span>
                <span>esc to close</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Stats */}
        <motion.div
          style={{
            marginTop: 40,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {[
            { label: 'Indexed Pages', value: '1,234', icon: '📄' },
            { label: 'Components', value: '89', icon: '📦' },
            { label: 'Examples', value: '256', icon: '💡' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              style={{
                padding: 25,
                borderRadius: 16,
                background: 'rgba(40, 40, 50, 0.8)',
                border: '1px solid rgba(255,255,255,0.05)',
                textAlign: 'center',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div style={{ fontSize: '2rem', marginBottom: 10 }}>{stat.icon}</div>
              <div style={{
                fontSize: '1.8rem',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: 5,
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#888' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
    </>
  );
}
