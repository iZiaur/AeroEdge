import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Clock, Plane, Activity } from 'lucide-react';
import AircraftModel from './AircraftModel';
import { showToast } from './Toast';
import './Hero.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stats = [
  { icon: Zap, value: '22×', label: 'Faster' },
  { icon: Shield, value: '95%+', label: 'Accuracy' },
  { icon: Clock, value: '<50ms', label: 'Edge' },
];

export default function Hero({ setCurrentView }) {
  
  const startTour = () => {
    window.dispatchEvent(new CustomEvent('start-global-tour'));
  };

  return (
    <section className="hero">
      {/* Background glow accent */}
      <div className="hero-bg-glow" />

      <div className="hero-inner">
        {/* ── Left column ──────────────────────── */}
        <div className="hero-left">
          <motion.div
            className="hero-badge"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            ✨ Multi-Agent Edge AI Platform
          </motion.div>

          <div className="hero-heading">
            <motion.h1
              className="hero-heading-light"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              Your AI Partner for
            </motion.h1>
            <motion.h1
              className="hero-heading-bold"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              Aircraft Maintenance
            </motion.h1>
          </div>

          <motion.p
            className="hero-paragraph"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            AeroEdge uses four specialized AI agents to predict failures, detect
            defects, and automate compliance‑verified maintenance — all running
            at the edge in under 50ms.
          </motion.p>

          <motion.div
            className="hero-buttons"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
          >
            <button className="hero-btn-primary" onClick={() => showToast("System initializing... Checking secure connection.")}>
              <Activity className="hero-btn-icon" />
              Initialize Live Dashboard
            </button>
            <button className="hero-btn-secondary" onClick={startTour}>Start Interactive Tour</button>
          </motion.div>

          <motion.div
            className="hero-stats"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={5}
          >
            {stats.map(({ icon: Icon, value, label }) => (
              <div className="hero-stat" key={label}>
                <Icon className="hero-stat-icon" />
                <span className="hero-stat-value">{value}</span>
                <span className="hero-stat-label">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right column ─────────────────────── */}
        <motion.div
          className="hero-right"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="hero-3d-wrapper" style={{ width: '100%', aspectRatio: '4/3', position: 'relative', borderRadius: '20px', overflow: 'hidden', background: 'radial-gradient(circle at center, rgba(124, 58, 237, 0.15) 0%, transparent 70%)' }}>
            <AircraftModel />
          </div>
        </motion.div>
      </div>

      {/* ── Bottom curve divider ────────────────── */}
      <div className="hero-divider">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 80V40C240 10 480 0 720 0C960 0 1200 10 1440 40V80H0Z"
            fill="#f5f5f7"
          />
        </svg>
      </div>
    </section>
  );
}
