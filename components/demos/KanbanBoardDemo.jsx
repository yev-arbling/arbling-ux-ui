'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function KanbanBoardDemo() {
  const [columns, setColumns] = React.useState({
    todo: {
      id: 'todo', title: 'To Do', color: '#888',
      cards: [
        { id: 1, title: 'Design new landing page', tags: ['design', 'high'], assignee: 'JD', priority: 'high', dueDate: 'Jan 25', subtasks: { done: 2, total: 5 }, comments: 3, attachments: 2 },
        { id: 2, title: 'Fix navigation bug', tags: ['bug'], assignee: 'MC', priority: 'urgent', dueDate: 'Jan 23', subtasks: { done: 0, total: 2 }, comments: 8, attachments: 0 },
        { id: 3, title: 'Update documentation', tags: ['docs'], assignee: 'ST', priority: 'low', dueDate: 'Feb 1', subtasks: { done: 0, total: 3 }, comments: 1, attachments: 1 },
      ],
    },
    inprogress: {
      id: 'inprogress', title: 'In Progress', color: '#667eea',
      cards: [
        { id: 4, title: 'Implement user auth', tags: ['feature', 'high'], assignee: 'AH', priority: 'high', dueDate: 'Jan 24', subtasks: { done: 3, total: 6 }, comments: 12, attachments: 1 },
        { id: 5, title: 'Database optimization', tags: ['performance'], assignee: 'RK', priority: 'medium', dueDate: 'Jan 28', subtasks: { done: 1, total: 4 }, comments: 5, attachments: 0 },
      ],
    },
    review: {
      id: 'review', title: 'Review', color: '#f093fb',
      cards: [
        { id: 6, title: 'API integration', tags: ['feature'], assignee: 'LT', priority: 'medium', dueDate: 'Jan 22', subtasks: { done: 4, total: 4 }, comments: 7, attachments: 3 },
      ],
    },
    done: {
      id: 'done', title: 'Done', color: '#43e97b',
      cards: [
        { id: 7, title: 'Setup CI/CD pipeline', tags: ['devops'], assignee: 'MP', priority: 'high', dueDate: 'Jan 20', subtasks: { done: 5, total: 5 }, comments: 4, attachments: 2 },
        { id: 8, title: 'Unit tests for auth', tags: ['testing'], assignee: 'JD', priority: 'medium', dueDate: 'Jan 19', subtasks: { done: 8, total: 8 }, comments: 2, attachments: 0 },
      ],
    },
  });
  const [draggedCard, setDraggedCard] = React.useState(null);
  const [filterPriority, setFilterPriority] = React.useState('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [hoveredColumn, setHoveredColumn] = React.useState(null);

  const onDragStart = (card, sourceColumn) => setDraggedCard({ card, sourceColumn });
  const onDragOver = (e) => e.preventDefault();
  const onDrop = (targetColumn) => {
    if (!draggedCard) return;
    const { card, sourceColumn } = draggedCard;
    const sourceCards = columns[sourceColumn].cards.filter(c => c.id !== card.id);
    const targetCards = [...columns[targetColumn].cards, card];
    setColumns({ ...columns, [sourceColumn]: { ...columns[sourceColumn], cards: sourceCards }, [targetColumn]: { ...columns[targetColumn], cards: targetCards } });
    setDraggedCard(null);
  };

  const getTagColor = (tag) => {
    const colors = { design: '#f093fb', high: '#fa709a', bug: '#ff6b6b', docs: '#4facfe', feature: '#667eea', performance: '#43e97b', devops: '#ffd93d', testing: '#6bcf7f' };
    return colors[tag] || '#888';
  };

  const getPriorityColor = (priority) => {
    const colors = { urgent: '#ef4444', high: '#f59e0b', medium: '#667eea', low: '#43e97b' };
    return colors[priority] || '#888';
  };

  const getAvatarGradient = (name) => {
    const gradients = ['linear-gradient(135deg, #667eea, #764ba2)', 'linear-gradient(135deg, #f093fb, #f5576c)', 'linear-gradient(135deg, #4facfe, #00f2fe)', 'linear-gradient(135deg, #43e97b, #38f9d7)'];
    return gradients[name.charCodeAt(0) % gradients.length];
  };

  const totalCards = Object.values(columns).reduce((acc, col) => acc + col.cards.length, 0);
  const completedCards = columns.done.cards.length;
  const projectProgress = Math.round((completedCards / totalCards) * 100);

  const filterCards = (cards) => {
    return cards.filter(card => {
      if (filterPriority !== 'all' && card.priority !== filterPriority) return false;
      if (searchQuery && !card.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  };

  return (
    <>
      <h2 className="demo-title">Kanban Board</h2>
      <p className="demo-subtitle">Project management with drag-and-drop, priorities, subtasks, due dates, and progress tracking.</p>
      <div className="demo-area" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        {/* Ambient glow */}
        <div style={{ position: 'absolute', top: '5%', left: '10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />

        <motion.div
          style={{ width: 1150, height: 680, background: 'rgba(20, 20, 30, 0.95)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)', padding: 25, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, paddingBottom: 15, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0, marginBottom: 4 }}>Sprint Board</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                <span style={{ fontSize: '0.8rem', color: '#888' }}>{totalCards} tasks</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 120, height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.1)' }}>
                    <motion.div style={{ height: '100%', borderRadius: 3, background: 'linear-gradient(90deg, #43e97b, #38f9d7)' }} animate={{ width: `${projectProgress}%` }} />
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#43e97b', fontWeight: 600 }}>{projectProgress}%</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {/* Search */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ color: '#666', fontSize: '0.9rem' }}>🔍</span>
                <input type="text" placeholder="Search tasks..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '0.8rem', outline: 'none', width: 120 }} />
              </div>

              {/* Priority Filter */}
              <div style={{ display: 'flex', gap: 6 }}>
                {['all', 'urgent', 'high', 'medium', 'low'].map(p => (
                  <motion.button key={p} onClick={() => setFilterPriority(p)}
                    style={{ padding: '6px 12px', borderRadius: 8, background: filterPriority === p ? (p === 'all' ? 'rgba(102, 126, 234, 0.2)' : `${getPriorityColor(p)}20`) : 'rgba(255,255,255,0.03)', border: filterPriority === p ? `1px solid ${p === 'all' ? 'rgba(102, 126, 234, 0.3)' : getPriorityColor(p)}50` : '1px solid rgba(255,255,255,0.05)', color: filterPriority === p ? (p === 'all' ? '#667eea' : getPriorityColor(p)) : '#888', fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize' }}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  >{p}</motion.button>
                ))}
              </div>

              <motion.button style={{ padding: '10px 18px', borderRadius: 10, background: 'linear-gradient(135deg, #667eea, #764ba2)', border: 'none', color: '#fff', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                + New Task
              </motion.button>
            </div>
          </div>

          {/* Kanban Columns */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 15, flex: 1, overflow: 'hidden' }}>
            {Object.values(columns).map((column) => {
              const filteredCards = filterCards(column.cards);
              const columnProgress = column.cards.length > 0 ? Math.round((column.cards.filter(c => c.subtasks.done === c.subtasks.total).length / column.cards.length) * 100) : 0;

              return (
                <motion.div key={column.id}
                  onDragOver={onDragOver}
                  onDrop={() => onDrop(column.id)}
                  onDragEnter={() => setHoveredColumn(column.id)}
                  onDragLeave={() => setHoveredColumn(null)}
                  style={{ background: hoveredColumn === column.id ? 'rgba(102, 126, 234, 0.1)' : 'rgba(15, 15, 25, 0.8)', borderRadius: 14, border: hoveredColumn === column.id ? '1px dashed rgba(102, 126, 234, 0.5)' : '1px solid rgba(255,255,255,0.05)', padding: 14, display: 'flex', flexDirection: 'column', transition: 'all 0.2s' }}
                >
                  {/* Column Header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, paddingBottom: 10, borderBottom: `2px solid ${column.color}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: column.color }} />
                      <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>{column.title}</h3>
                      <span style={{ padding: '2px 8px', borderRadius: 10, background: 'rgba(255,255,255,0.1)', color: '#888', fontSize: '0.75rem', fontWeight: 600 }}>{filteredCards.length}</span>
                    </div>
                    <motion.button style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '1rem' }} whileHover={{ color: '#fff' }}>⋯</motion.button>
                  </div>

                  {/* Cards */}
                  <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <AnimatePresence>
                      {filteredCards.map((card) => {
                        const subtaskProgress = card.subtasks.total > 0 ? (card.subtasks.done / card.subtasks.total) * 100 : 0;
                        const isOverdue = card.dueDate === 'Jan 22' || card.dueDate === 'Jan 23';

                        return (
                          <motion.div key={card.id} draggable onDragStart={() => onDragStart(card, column.id)}
                            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                            style={{ padding: 14, borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', cursor: 'grab', position: 'relative' }}
                            whileHover={{ scale: 1.01, background: 'rgba(255,255,255,0.05)', borderColor: `${column.color}40` }}
                            whileDrag={{ scale: 1.03, boxShadow: '0 10px 30px rgba(0,0,0,0.3)', cursor: 'grabbing' }}
                          >
                            {/* Priority indicator */}
                            <div style={{ position: 'absolute', top: 0, left: 14, right: 14, height: 3, borderRadius: '0 0 3px 3px', background: getPriorityColor(card.priority), opacity: 0.8 }} />

                            {/* Title */}
                            <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 10, marginTop: 4, color: '#fff', lineHeight: 1.4 }}>{card.title}</div>

                            {/* Tags */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
                              {card.tags.slice(0, 2).map(tag => (
                                <span key={tag} style={{ padding: '3px 8px', borderRadius: 4, background: `${getTagColor(tag)}15`, color: getTagColor(tag), fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase' }}>{tag}</span>
                              ))}
                              {card.tags.length > 2 && <span style={{ padding: '3px 6px', borderRadius: 4, background: 'rgba(255,255,255,0.05)', color: '#888', fontSize: '0.65rem' }}>+{card.tags.length - 2}</span>}
                            </div>

                            {/* Subtask progress */}
                            {card.subtasks.total > 0 && (
                              <div style={{ marginBottom: 10 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                                  <span style={{ fontSize: '0.7rem', color: '#888' }}>Subtasks</span>
                                  <span style={{ fontSize: '0.7rem', color: subtaskProgress === 100 ? '#43e97b' : '#888' }}>{card.subtasks.done}/{card.subtasks.total}</span>
                                </div>
                                <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.1)' }}>
                                  <motion.div style={{ height: '100%', borderRadius: 2, background: subtaskProgress === 100 ? '#43e97b' : column.color }} initial={{ width: 0 }} animate={{ width: `${subtaskProgress}%` }} />
                                </div>
                              </div>
                            )}

                            {/* Footer */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                {/* Due date */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 6, background: isOverdue ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255,255,255,0.03)', color: isOverdue ? '#ef4444' : '#888', fontSize: '0.7rem' }}>
                                  📅 {card.dueDate}
                                </div>
                                {/* Comments */}
                                {card.comments > 0 && <span style={{ display: 'flex', alignItems: 'center', gap: 3, color: '#666', fontSize: '0.7rem' }}>💬 {card.comments}</span>}
                                {/* Attachments */}
                                {card.attachments > 0 && <span style={{ display: 'flex', alignItems: 'center', gap: 3, color: '#666', fontSize: '0.7rem' }}>📎 {card.attachments}</span>}
                              </div>
                              {/* Assignee */}
                              <div style={{ width: 26, height: 26, borderRadius: '50%', background: getAvatarGradient(card.assignee), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, color: '#fff' }}>{card.assignee}</div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>

                    {/* Empty state */}
                    {filteredCards.length === 0 && (
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', fontSize: '0.8rem', padding: 20, textAlign: 'center' }}>
                        {searchQuery || filterPriority !== 'all' ? 'No matching tasks' : 'Drop tasks here'}
                      </div>
                    )}
                  </div>

                  {/* Add card button */}
                  <motion.button style={{ marginTop: 10, padding: '10px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.1)', color: '#666', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }} whileHover={{ background: 'rgba(255,255,255,0.05)', color: '#888', borderColor: 'rgba(255,255,255,0.2)' }}>
                    + Add task
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </>
  );
}
