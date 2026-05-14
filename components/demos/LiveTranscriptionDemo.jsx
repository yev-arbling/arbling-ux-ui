'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function LiveTranscriptionDemo() {
  const [isTranscribing, setIsTranscribing] = React.useState(true);
  const [segments, setSegments] = React.useState([]);
  const [currentWords, setCurrentWords] = React.useState([]);
  const [interimText, setInterimText] = React.useState('');
  const [confidence, setConfidence] = React.useState(0.95);
  const [language, setLanguage] = React.useState('en');
  const [speaker, setSpeaker] = React.useState(1);
  const [wordCount, setWordCount] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [audioLevels, setAudioLevels] = React.useState(Array(32).fill(0));
  const [showExport, setShowExport] = React.useState(false);
  const scrollRef = React.useRef(null);

  const conversations = [
    { speaker: 1, text: "Hi there, I'm calling about my recent order that hasn't arrived yet." },
    { speaker: 2, text: "I'd be happy to help you with that. Can you provide your order number?" },
    { speaker: 1, text: "Yes, it's order number 7829. I placed it last Tuesday." },
    { speaker: 2, text: "Thank you. I can see your order is currently in transit and should arrive tomorrow." },
    { speaker: 1, text: "That's great news! Can you also confirm the delivery address?" },
    { speaker: 2, text: "Of course, it shows 123 Main Street. Is that correct?" },
  ];

  const speakerColors = { 1: '#667eea', 2: '#43e97b' };
  const speakerNames = { 1: 'Customer', 2: 'AI Agent' };
  const speakerAvatars = { 1: '👤', 2: '🤖' };

  React.useEffect(() => {
    if (!isTranscribing) return;
    const audioInterval = setInterval(() => {
      setAudioLevels(prev => prev.map(() => Math.random() * 0.8 + 0.2));
    }, 50);
    return () => clearInterval(audioInterval);
  }, [isTranscribing]);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [segments, currentWords]);

  React.useEffect(() => {
    if (!isTranscribing) return;
    let segmentIndex = 0;
    let wordIndex = 0;
    setSegments([]);
    setCurrentWords([]);
    setWordCount(0);

    const processSegment = () => {
      if (segmentIndex >= conversations.length) {
        setTimeout(() => { segmentIndex = 0; setSegments([]); processSegment(); }, 2000);
        return;
      }

      const segment = conversations[segmentIndex];
      const words = segment.text.split(' ');
      setSpeaker(segment.speaker);
      wordIndex = 0;
      setCurrentWords([]);
      setInterimText('');

      const wordInterval = setInterval(() => {
        if (wordIndex < words.length) {
          const conf = 0.85 + Math.random() * 0.15;
          setCurrentWords(prev => [...prev, { text: words[wordIndex], confidence: conf, isNew: true }]);
          setInterimText(words.slice(wordIndex + 1, Math.min(wordIndex + 3, words.length)).join(' '));
          setConfidence(conf);
          setWordCount(c => c + 1);
          wordIndex++;
        } else {
          clearInterval(wordInterval);
          setSegments(prev => [...prev, { speaker: segment.speaker, text: segment.text, time: new Date(), confidence: 0.85 + Math.random() * 0.15 }]);
          setCurrentWords([]);
          setInterimText('');
          segmentIndex++;
          setTimeout(processSegment, 1000);
        }
      }, 120);

      return () => clearInterval(wordInterval);
    };

    const durationInterval = setInterval(() => setDuration(d => d + 1), 1000);
    processSegment();

    return () => clearInterval(durationInterval);
  }, [isTranscribing]);

  const formatDuration = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const Word = ({ word, index }) => (
    <motion.span
      initial={{ opacity: 0, y: 8, scale: 0.9, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      transition={{ type: 'spring', stiffness: 400, damping: 25, delay: index * 0.02 }}
      style={{
        color: word.confidence > 0.9 ? '#fff' : word.confidence > 0.85 ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.6)',
        fontSize: '0.95rem', fontWeight: 500, display: 'inline-block', marginRight: '5px',
        background: word.confidence < 0.88 ? 'rgba(251,191,36,0.2)' : 'transparent',
        padding: word.confidence < 0.88 ? '2px 6px' : '0', borderRadius: '4px',
      }}
    >
      {word.text}
    </motion.span>
  );

  return (
    <>
      <div className="demo-header">
        <h2 className="demo-title">Live Transcription</h2>
        <p className="demo-subtitle">Real-time speech-to-text with speaker diarization, confidence visualization, and audio waveform</p>
      </div>
      <div className="demo-area">
        <div style={{ maxWidth: '650px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{ background: 'linear-gradient(145deg, rgba(20,20,35,0.98) 0%, rgba(15,15,30,0.98) 100%)', borderRadius: '28px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>

            {/* Header with waveform */}
            <div style={{ padding: '20px 24px', background: 'linear-gradient(135deg, rgba(102,126,234,0.15) 0%, rgba(67,233,123,0.1) 100%)', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
              {/* Audio waveform background */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '2px', opacity: 0.3, padding: '0 24px' }}>
                {audioLevels.map((level, i) => (
                  <motion.div key={i}
                    style={{ width: '3px', background: `linear-gradient(to top, ${speakerColors[speaker]}, ${speakerColors[speaker]}50)`, borderRadius: '2px' }}
                    animate={{ height: isTranscribing ? `${level * 35}px` : '2px' }}
                    transition={{ duration: 0.05 }}
                  />
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <motion.div style={{ position: 'relative', width: 48, height: 48, borderRadius: '14px', background: isTranscribing ? 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    animate={isTranscribing ? { boxShadow: ['0 0 0 0 rgba(67,233,123,0.4)', '0 0 0 12px rgba(67,233,123,0)', '0 0 0 0 rgba(67,233,123,0.4)'] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}>
                    <span style={{ fontSize: '1.4rem' }}>{isTranscribing ? '🎙️' : '⏸️'}</span>
                  </motion.div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: '1.1rem', marginBottom: '2px' }}>Live Transcription</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>{formatDuration(duration)}</span>
                      <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
                      <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>{wordCount} words</span>
                      {isTranscribing && <motion.span style={{ fontSize: '0.7rem', color: '#43e97b', fontWeight: 600 }} animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1, repeat: Infinity }}>● LIVE</motion.span>}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <motion.div style={{ fontSize: '1.5rem', fontWeight: 800, background: `linear-gradient(135deg, ${confidence > 0.9 ? '#43e97b' : confidence > 0.85 ? '#fbbf24' : '#f5576c'}, ${confidence > 0.9 ? '#38f9d7' : confidence > 0.85 ? '#f59e0b' : '#ec4899'})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                      animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 0.3 }}>
                      {(confidence * 100).toFixed(0)}%
                    </motion.div>
                    <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Accuracy</div>
                  </div>
                  <div style={{ width: 8, height: 50, background: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden', display: 'flex', flexDirection: 'column-reverse' }}>
                    <motion.div style={{ width: '100%', background: `linear-gradient(to top, ${confidence > 0.9 ? '#43e97b' : confidence > 0.85 ? '#fbbf24' : '#f5576c'}, ${confidence > 0.9 ? '#38f9d7' : confidence > 0.85 ? '#f59e0b' : '#ec4899'})`, borderRadius: 4 }}
                      animate={{ height: `${confidence * 100}%` }} transition={{ duration: 0.2 }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Transcription content */}
            <div ref={scrollRef} style={{ padding: '20px 24px', minHeight: '220px', maxHeight: '300px', overflowY: 'auto' }}>
              <AnimatePresence>
                {segments.map((seg, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20, y: 10 }} animate={{ opacity: 1, x: 0, y: 0 }} exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    style={{ marginBottom: '20px', display: 'flex', gap: '12px' }}>
                    <motion.div style={{ width: 36, height: 36, borderRadius: '12px', background: `${speakerColors[seg.speaker]}20`, border: `1px solid ${speakerColors[seg.speaker]}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}
                      whileHover={{ scale: 1.1 }}>
                      {speakerAvatars[seg.speaker]}
                    </motion.div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: speakerColors[seg.speaker] }}>{speakerNames[seg.speaker]}</span>
                        <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace' }}>{seg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                        <span style={{ fontSize: '0.6rem', padding: '2px 6px', borderRadius: '4px', background: seg.confidence > 0.9 ? 'rgba(67,233,123,0.15)' : 'rgba(251,191,36,0.15)', color: seg.confidence > 0.9 ? '#43e97b' : '#fbbf24' }}>{(seg.confidence * 100).toFixed(0)}%</span>
                      </div>
                      <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0, background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '12px', borderLeft: `3px solid ${speakerColors[seg.speaker]}40` }}>{seg.text}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {currentWords.length > 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  style={{ display: 'flex', gap: '12px' }}>
                  <motion.div style={{ width: 36, height: 36, borderRadius: '12px', background: `${speakerColors[speaker]}30`, border: `2px solid ${speakerColors[speaker]}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}
                    animate={{ scale: [1, 1.1, 1], borderColor: [`${speakerColors[speaker]}`, `${speakerColors[speaker]}80`, `${speakerColors[speaker]}`] }}
                    transition={{ duration: 1.5, repeat: Infinity }}>
                    {speakerAvatars[speaker]}
                  </motion.div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: speakerColors[speaker] }}>{speakerNames[speaker]}</span>
                      <motion.span style={{ fontSize: '0.65rem', color: '#43e97b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }} animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#43e97b' }} /> Speaking
                      </motion.span>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px 14px', borderRadius: '12px', borderLeft: `3px solid ${speakerColors[speaker]}`, lineHeight: 1.9 }}>
                      {currentWords.map((word, i) => <Word key={i} word={word} index={i} />)}
                      {interimText && (
                        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 0.35 }}
                          style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', fontStyle: 'italic' }}>
                          {interimText}
                        </motion.span>
                      )}
                      <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}
                        style={{ color: speakerColors[speaker], fontSize: '1rem', marginLeft: '2px' }}>▌</motion.span>
                    </div>
                  </div>
                </motion.div>
              )}

              {!isTranscribing && segments.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <motion.div style={{ fontSize: '3rem', marginBottom: '12px' }} animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity }}>🎤</motion.div>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem' }}>Click Start to begin transcription</p>
                </div>
              )}
            </div>

            {/* Footer controls */}
            <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <motion.button whileHover={{ scale: 1.05, background: 'rgba(102,126,234,0.3)' }}
                  style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(102,126,234,0.3)', background: 'rgba(102,126,234,0.15)', color: '#667eea', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  🌐 {language.toUpperCase()}
                </motion.button>
                <span style={{ padding: '6px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}>⚡ Real-time</span>
                <span style={{ padding: '6px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}>👥 2 speakers</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => setShowExport(!showExport)}
                  style={{ padding: '8px 14px', borderRadius: '10px', border: 'none', background: 'rgba(255,255,255,0.08)', color: '#fff', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  📥 Export
                </motion.button>
                <motion.button onClick={() => { setIsTranscribing(!isTranscribing); if (!isTranscribing) { setSegments([]); setDuration(0); setWordCount(0); } }}
                  whileHover={{ scale: 1.05, boxShadow: isTranscribing ? '0 0 20px rgba(245,87,108,0.4)' : '0 0 20px rgba(67,233,123,0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  style={{ padding: '8px 20px', borderRadius: '10px', border: 'none', background: isTranscribing ? 'linear-gradient(135deg, #f5576c, #f093fb)' : 'linear-gradient(135deg, #43e97b, #38f9d7)', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {isTranscribing ? '⏹ Stop' : '▶ Start'}
                </motion.button>
              </div>
            </div>

            {/* Export dropdown */}
            <AnimatePresence>
              {showExport && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.3)', overflow: 'hidden' }}>
                  <div style={{ padding: '16px 24px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {['TXT', 'SRT', 'VTT', 'JSON'].map(format => (
                      <motion.button key={format} whileHover={{ scale: 1.05, background: 'rgba(102,126,234,0.2)' }} whileTap={{ scale: 0.95 }}
                        style={{ padding: '10px 20px', borderRadius: '10px', border: '1px solid rgba(102,126,234,0.3)', background: 'rgba(102,126,234,0.1)', color: '#667eea', fontWeight: 600, cursor: 'pointer', fontSize: '0.8rem' }}>
                        Download .{format.toLowerCase()}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </>
  );
}
