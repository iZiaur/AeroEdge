import React from 'react';
import { motion } from 'framer-motion';
import { Mic, ArrowRight } from 'lucide-react';
import './ChatInterface.css';

const barData = [
  { label: 'VT-ANE', height: 40, color: '#ef4444' },
  { label: 'VT-BKR', height: 85, color: '#7c3aed' },
  { label: 'VT-CDE', height: 72, color: '#10b981' },
  { label: 'VT-FGH', height: 90, color: '#7c3aed' },
  { label: 'VT-IJK', height: 78, color: '#10b981' },
];

export default function ChatInterface() {
  return (
    <section className="chat-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <p className="chat-section-label">AI Agents in Action</p>
        <h2 className="chat-section-heading">
          See what your fleet data has to tell you.
        </h2>
      </motion.div>

      <motion.div
        className="chat-card"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, delay: 0.15 }}
      >
        {/* Top Bar */}
        <div className="chat-top-bar">
          <div className="chat-dots">
            <span className="chat-dot red" />
            <span className="chat-dot yellow" />
            <span className="chat-dot green" />
          </div>
          <span className="chat-top-bar-title">AeroEdge AI Fleet Chat</span>
        </div>

        {/* Chat Area */}
        <div className="chat-area">
          {/* User Message */}
          <div className="chat-msg-user">
            <motion.div
              className="chat-bubble-user"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Show me the fleet health status and highlight any aircraft needing
              immediate attention
            </motion.div>
          </div>

          {/* AI Response */}
          <div className="chat-msg-ai">
            <motion.div
              className="chat-bubble-ai"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <p className="chat-bubble-ai-text">
                Based on current telemetry, Aircraft VT-ANE requires priority
                attention. Engine 2 shows accelerated degradation with 52 cycles
                remaining at 94% confidence.
              </p>

              <div className="chat-chart-label">Fleet Health by Aircraft</div>
              <div className="chat-chart">
                {barData.map((bar, i) => (
                  <div className="chat-chart-bar-group" key={bar.label}>
                    <motion.div
                      className="chat-chart-bar"
                      style={{ backgroundColor: bar.color }}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${bar.height}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.7 + i * 0.1 }}
                    />
                    <span className="chat-chart-bar-label">{bar.label}</span>
                  </div>
                ))}
              </div>

              <div className="chat-action-pills">
                <button className="chat-pill">Quick Action +</button>
                <button className="chat-pill">Schedule</button>
                <button className="chat-pill">Email</button>
                <button className="chat-pill">Export</button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Input Bar */}
        <div className="chat-input-bar">
          <input
            className="chat-input"
            type="text"
            placeholder="Ask AeroEdge anything..."
            readOnly
          />
          <button className="chat-mic-btn" aria-label="Mic">
            <Mic size={20} />
          </button>
          <button className="chat-send-btn" aria-label="Send">
            <ArrowRight size={18} />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
