import React from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';
import './CallToAction.css';

export default function CallToAction() {
  return (
    <section className="cta-section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        {/* Decorative aircraft with circuit traces */}
        <div className="cta-decoration">
          <span className="cta-trace-line" />
          <span className="cta-aircraft">✈</span>
          <span className="cta-trace-line" />
        </div>

        {/* AI chip icon */}
        <div className="cta-chip-icon">
          <Cpu size={22} />
        </div>

        <h2 className="cta-heading">
          The future of aircraft maintenance is
          <br />
          <span className="cta-heading-purple">AI-powered.</span>
        </h2>

        <p className="cta-subtitle">
          Join the next generation of intelligent MRO systems. Built by Team
          BitOps for InnoVent-27.
        </p>

        <motion.button
          className="cta-button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Request Early Access →
        </motion.button>
      </motion.div>
    </section>
  );
}
