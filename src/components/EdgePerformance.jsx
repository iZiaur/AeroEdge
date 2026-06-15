import React from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingUp, HardDrive } from 'lucide-react';
import './EdgePerformance.css';

const metrics = [
  { icon: Zap, number: '38ms', label: 'Edge Inference' },
  { icon: TrendingUp, number: '22x Faster', label: 'Than Cloud Processing' },
  { icon: HardDrive, number: '6.1 MB', label: 'Quantized Model' },
];

export default function EdgePerformance() {
  return (
    <div className="edge-wrapper">
      <motion.section
        className="edge-section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div className="edge-icon-wrapper">
          <Zap size={28} />
        </div>

        <h2 className="edge-heading">Enterprise-Grade Edge Computing</h2>
        <p className="edge-subtitle">
          All models quantized and optimized for edge deployment. No cloud
          dependency, no latency, no compromises.
        </p>

        <div className="edge-cards">
          {metrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                className="edge-card"
                key={m.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 * i }}
              >
                <div className="edge-card-icon">
                  <Icon size={24} />
                </div>
                <div className="edge-card-number">{m.number}</div>
                <div className="edge-card-label">{m.label}</div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>
    </div>
  );
}
