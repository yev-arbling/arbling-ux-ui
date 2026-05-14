'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function CommentSectionDemo() {
  const [comments, setComments] = React.useState([
    {
      id: 1,
      author: 'Sarah Chen',
      avatar: '👩‍💻',
      color: '#667eea',
      content: 'This feature is absolutely amazing! The attention to detail is incredible.',
      timestamp: '2 hours ago',
      upvotes: 24,
      replies: [
        { id: 11, author: 'Mike Johnson', avatar: '👨‍🎨', color: '#f093fb', content: 'Totally agree! Best update yet.', timestamp: '1 hour ago', upvotes: 8 },
        { id: 12, author: 'Emma Wilson', avatar: '👩‍🔬', color: '#43e97b', content: 'The animations are so smooth!', timestamp: '45 min ago', upvotes: 5 },
      ],
      showReplies: true,
    },
    {
      id: 2,
      author: 'Alex Rivera',
      avatar: '👨‍💼',
      color: '#fa709a',
      content: 'Would love to see more customization options in the next release.',
      timestamp: '5 hours ago',
      upvotes: 15,
      replies: [
        { id: 21, author: 'Team', avatar: '🎯', color: '#764ba2', content: 'Great feedback! We\'re working on it.', timestamp: '4 hours ago', upvotes: 32 },
      ],
      showReplies: true,
    },
    {
      id: 3,
      author: 'Jordan Lee',
      avatar: '🧑‍🎤',
      color: '#4facfe',
      content: 'The performance improvements are noticeable. Great work!',
      timestamp: '1 day ago',
      upvotes: 42,
      replies: [],
      showReplies: false,
    },
  ]);
  const [newComment, setNewComment] = React.useState('');
  const [replyingTo, setReplyingTo] = React.useState(null);
  const [replyText, setReplyText] = React.useState('');

  const handleUpvote = (commentId, replyId = null) => {
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId && !replyId) {
        return { ...comment, upvotes: comment.upvotes + 1 };
      }
      if (comment.id === commentId && replyId) {
        return {
          ...comment,
          replies: comment.replies.map(reply =>
            reply.id === replyId ? { ...reply, upvotes: reply.upvotes + 1 } : reply
          ),
        };
      }
      return comment;
    }));
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment = {
      id: Date.now(),
      author: 'You',
      avatar: '😊',
      color: '#667eea',
      content: newComment,
      timestamp: 'Just now',
      upvotes: 0,
      replies: [],
      showReplies: true,
    };
    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleAddReply = (commentId) => {
    if (!replyText.trim()) return;
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        const newReply = {
          id: Date.now(),
          author: 'You',
          avatar: '😊',
          color: '#667eea',
          content: replyText,
          timestamp: 'Just now',
          upvotes: 0,
        };
        return { ...comment, replies: [...comment.replies, newReply] };
      }
      return comment;
    }));
    setReplyText('');
    setReplyingTo(null);
  };

  const toggleReplies = (commentId) => {
    setComments(prev => prev.map(comment =>
      comment.id === commentId ? { ...comment, showReplies: !comment.showReplies } : comment
    ));
  };

  return (
    <>
      <h2 className="demo-title">Comment Section</h2>
      <p className="demo-subtitle">Threaded discussions with replies, upvotes, and nested conversations</p>
      <div className="demo-area">
        <motion.div
          style={{
            width: '100%',
            maxWidth: 700,
            background: 'rgba(20, 20, 30, 0.8)',
            borderRadius: 24,
            border: '1px solid rgba(255,255,255,0.08)',
            padding: 30,
            backdropFilter: 'blur(10px)',
          }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <motion.div style={{ display: 'flex', gap: 15, marginBottom: 30, paddingBottom: 25, borderBottom: '1px solid rgba(255,255,255,0.1)' }} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ width: 45, height: 45, borderRadius: '50%', background: 'linear-gradient(135deg, #667eea, #764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>😊</div>
            <div style={{ flex: 1 }}>
              <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Write a comment..." style={{ width: '100%', padding: '12px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.95rem', outline: 'none', resize: 'vertical', minHeight: 80, fontFamily: 'inherit' }} />
              <motion.button onClick={handleAddComment} style={{ marginTop: 10, padding: '10px 24px', background: 'linear-gradient(135deg, #667eea, #764ba2)', border: 'none', borderRadius: 10, color: '#fff', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer' }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Post Comment</motion.button>
            </div>
          </motion.div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <AnimatePresence>
              {comments.map((comment, index) => (
                <motion.div key={comment.id} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ delay: index * 0.1 }}>
                  <div style={{ display: 'flex', gap: 15 }}>
                    <div style={{ width: 45, height: 45, borderRadius: '50%', background: `linear-gradient(135deg, ${comment.color}, ${comment.color}66)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>{comment.avatar}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                        <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{comment.author}</span>
                        <span style={{ fontSize: '0.75rem', color: '#666' }}>{comment.timestamp}</span>
                      </div>
                      <div style={{ color: '#ddd', lineHeight: 1.6, marginBottom: 12 }}>{comment.content}</div>
                      <div style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
                        <motion.button onClick={() => handleUpvote(comment.id)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: 8, padding: '6px 12px', color: '#aaa', fontSize: '0.8rem', cursor: 'pointer' }} whileHover={{ scale: 1.05, background: 'rgba(102, 126, 234, 0.15)' }} whileTap={{ scale: 0.95 }}><span>▲</span><span>{comment.upvotes}</span></motion.button>
                        <motion.button onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)} style={{ background: 'transparent', border: 'none', color: '#667eea', fontSize: '0.8rem', cursor: 'pointer' }} whileHover={{ scale: 1.05 }}>Reply</motion.button>
                        {comment.replies.length > 0 && <motion.button onClick={() => toggleReplies(comment.id)} style={{ background: 'transparent', border: 'none', color: '#888', fontSize: '0.8rem', cursor: 'pointer' }} whileHover={{ scale: 1.05 }}>{comment.showReplies ? '▼' : '▶'} {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}</motion.button>}
                      </div>
                      <AnimatePresence>
                        {replyingTo === comment.id && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ marginTop: 15, display: 'flex', gap: 10 }}>
                            <input value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Write a reply..." style={{ flex: 1, padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.85rem', outline: 'none' }} />
                            <motion.button onClick={() => handleAddReply(comment.id)} style={{ padding: '10px 18px', background: 'linear-gradient(135deg, #667eea, #764ba2)', border: 'none', borderRadius: 10, color: '#fff', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Reply</motion.button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <AnimatePresence>
                        {comment.showReplies && comment.replies.length > 0 && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ marginTop: 15, marginLeft: 20, paddingLeft: 20, borderLeft: '2px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: 15 }}>
                            {comment.replies.map((reply, replyIndex) => (
                              <motion.div key={reply.id} layout initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: replyIndex * 0.05 }} style={{ display: 'flex', gap: 12 }}>
                                <div style={{ width: 35, height: 35, borderRadius: '50%', background: `linear-gradient(135deg, ${reply.color}, ${reply.color}66)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>{reply.avatar}</div>
                                <div style={{ flex: 1 }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}><span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{reply.author}</span><span style={{ fontSize: '0.7rem', color: '#666' }}>{reply.timestamp}</span></div>
                                  <div style={{ color: '#ccc', lineHeight: 1.5, fontSize: '0.9rem', marginBottom: 8 }}>{reply.content}</div>
                                  <motion.button onClick={() => handleUpvote(comment.id, reply.id)} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.03)', border: 'none', borderRadius: 6, padding: '4px 10px', color: '#888', fontSize: '0.75rem', cursor: 'pointer' }} whileHover={{ scale: 1.05, background: 'rgba(102, 126, 234, 0.1)' }} whileTap={{ scale: 0.95 }}><span>▲</span><span>{reply.upvotes}</span></motion.button>
                                </div>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </>
  );
}
