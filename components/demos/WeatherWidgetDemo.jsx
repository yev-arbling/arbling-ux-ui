'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function WeatherWidgetDemo() {
  const [weather, setWeather] = React.useState('sunny');
  const [temp, setTemp] = React.useState(72);
  const [unit, setUnit] = React.useState('F');
  const [location, setLocation] = React.useState('San Francisco');

  const weatherTypes = {
    sunny: { icon: '☀️', label: 'Sunny', color: '#f59e0b', gradient: 'linear-gradient(135deg, #fcd34d 0%, #f59e0b 100%)', bg: 'linear-gradient(180deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)' },
    cloudy: { icon: '☁️', label: 'Cloudy', color: '#94a3b8', gradient: 'linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%)', bg: 'linear-gradient(180deg, #94a3b8 0%, #64748b 50%, #475569 100%)' },
    rainy: { icon: '🌧️', label: 'Rainy', color: '#3b82f6', gradient: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)', bg: 'linear-gradient(180deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%)' },
    snowy: { icon: '❄️', label: 'Snowy', color: '#a5f3fc', gradient: 'linear-gradient(135deg, #e0f2fe 0%, #a5f3fc 100%)', bg: 'linear-gradient(180deg, #e0f2fe 0%, #a5f3fc 50%, #67e8f9 100%)' },
    stormy: { icon: '⛈️', label: 'Stormy', color: '#8b5cf6', gradient: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)', bg: 'linear-gradient(180deg, #a78bfa 0%, #8b5cf6 50%, #7c3aed 100%)' },
  };

  const forecast = [
    { day: 'Mon', icon: '☀️', high: 75, low: 58 },
    { day: 'Tue', icon: '⛅', high: 72, low: 56 },
    { day: 'Wed', icon: '🌧️', high: 68, low: 54 },
    { day: 'Thu', icon: '🌧️', high: 65, low: 52 },
    { day: 'Fri', icon: '☁️', high: 70, low: 55 },
  ];

  const currentWeather = weatherTypes[weather];
  const displayTemp = unit === 'F' ? temp : Math.round((temp - 32) * 5 / 9);

  return (
    <>
      <div className="demo-header">
        <h2 className="demo-title">Weather Widget</h2>
        <p className="demo-subtitle">Beautiful weather display with 5-day forecast, animated conditions, and detailed metrics</p>
      </div>
      <div className="demo-area">
        <div style={{ maxWidth: '380px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{ background: 'linear-gradient(145deg, rgba(15,15,25,0.98) 0%, rgba(10,10,20,0.98) 100%)', borderRadius: '28px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', boxShadow: '0 30px 60px -20px rgba(0,0,0,0.5)' }}>

            {/* Header with location */}
            <div style={{ padding: '20px 24px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.2rem' }}>📍</span>
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>{location}</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>Updated 5 min ago</div>
                </div>
              </div>
              <motion.button onClick={() => setUnit(unit === 'F' ? 'C' : 'F')} whileHover={{ scale: 1.05 }}
                style={{ padding: '6px 14px', borderRadius: '10px', border: 'none', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>
                °{unit}
              </motion.button>
            </div>

            {/* Main weather display */}
            <div style={{ padding: '30px 24px', position: 'relative', overflow: 'hidden' }}>
              {/* Ambient glow */}
              <motion.div style={{ position: 'absolute', top: '-30%', right: '-20%', width: '200px', height: '200px', borderRadius: '50%', background: currentWeather.gradient, filter: 'blur(60px)', opacity: 0.4 }}
                animate={{ scale: [1, 1.3, 1], rotate: [0, 45, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
                <div>
                  <motion.div key={weather} initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    style={{ fontSize: '5rem', lineHeight: 1, marginBottom: '8px' }}>
                    {currentWeather.icon}
                  </motion.div>
                  <motion.div key={`label-${weather}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    style={{ fontSize: '1.1rem', fontWeight: 600, color: currentWeather.color }}>
                    {currentWeather.label}
                  </motion.div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <motion.div key={`temp-${temp}-${unit}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    style={{ fontSize: '4.5rem', fontWeight: 800, lineHeight: 1, background: currentWeather.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {displayTemp}°
                  </motion.div>
                  <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>
                    Feels like {displayTemp - 2}°
                  </div>
                </div>
              </div>
            </div>

            {/* Weather details grid */}
            <div style={{ padding: '0 24px 20px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
              {[
                { label: 'Humidity', value: '65%', icon: '💧' },
                { label: 'Wind', value: '12mph', icon: '💨' },
                { label: 'UV', value: '6', icon: '☀️' },
                { label: 'AQI', value: 'Good', icon: '🌿' },
              ].map((detail, i) => (
                <motion.div key={detail.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}
                  whileHover={{ background: 'rgba(255,255,255,0.08)' }}
                  style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '14px', padding: '14px 10px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ fontSize: '1.2rem', marginBottom: '6px' }}>{detail.icon}</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>{detail.value}</div>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>{detail.label}</div>
                </motion.div>
              ))}
            </div>

            {/* 5-day forecast */}
            <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)' }}>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>5-Day Forecast</div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {forecast.map((day, i) => (
                  <motion.div key={day.day} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.05 }}
                    whileHover={{ y: -4 }}
                    style={{ textAlign: 'center', padding: '8px 6px', borderRadius: '12px', cursor: 'pointer' }}>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', fontWeight: 600 }}>{day.day}</div>
                    <motion.div style={{ fontSize: '1.5rem', marginBottom: '8px' }}
                      whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}>
                      {day.icon}
                    </motion.div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff' }}>{day.high}°</div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>{day.low}°</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Weather type selector */}
            <div style={{ padding: '14px 24px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: '8px', justifyContent: 'center' }}>
              {Object.keys(weatherTypes).map((w, i) => (
                <motion.button key={w}
                  onClick={() => { setWeather(w); setTemp(Math.floor(Math.random() * 35) + 45); }}
                  initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.05 }}
                  whileHover={{ scale: 1.15, rotate: 5 }} whileTap={{ scale: 0.95 }}
                  style={{ width: 44, height: 44, borderRadius: '12px', background: weather === w ? weatherTypes[w].gradient : 'rgba(255,255,255,0.05)', border: weather === w ? 'none' : '1px solid rgba(255,255,255,0.08)', fontSize: '1.4rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: weather === w ? `0 4px 15px ${weatherTypes[w].color}40` : 'none' }}>
                  {weatherTypes[w].icon}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
