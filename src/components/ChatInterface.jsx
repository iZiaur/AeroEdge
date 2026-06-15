import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { marked } from 'marked';
import { Mic, ArrowRight, Loader2 } from 'lucide-react';
import { showToast } from './Toast';
import './ChatInterface.css';

const barData = [
  { label: 'VT-ANE', height: 40, color: '#ef4444' },
  { label: 'VT-BKR', height: 85, color: '#7c3aed' },
  { label: 'VT-CDE', height: 72, color: '#10b981' },
  { label: 'VT-FGH', height: 90, color: '#7c3aed' },
  { label: 'VT-IJK', height: 78, color: '#10b981' },
];

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export default function ChatInterface() {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'user',
      text: 'Show me the fleet health status and highlight any aircraft needing immediate attention'
    },
    {
      id: 2,
      role: 'model',
      text: 'Based on current telemetry, Aircraft VT-ANE requires priority attention. Engine 2 shows accelerated degradation with 52 cycles remaining at 94% confidence.',
      hasChart: true
    }
  ]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;
    
    const userMsg = { id: Date.now(), role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: "You are AeroEdge, an AI assistant for aircraft maintenance engineers. You have access to real-time fleet telemetry. Keep answers concise, professional, and data-driven. Highlight any risks with engines or surface defects. Mention 'VT-ANE' has engine degradation. Use Markdown formatting for emphasis." }]
          },
          contents: [{ role: 'user', parts: [{ text: userMsg.text }] }]
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || `HTTP error! status: ${response.status}`);
      }
      
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process that.";
      
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'model', text: aiText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'model', text: `API Error: ${error.message}. Please check if the API key is valid.` }]);
    } finally {
      setIsLoading(false);
    }
  };

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
        <div className="chat-area" style={{ maxHeight: '500px', overflowY: 'auto' }}>
          {messages.map((msg) => (
            <div key={msg.id} className={msg.role === 'user' ? "chat-msg-user" : "chat-msg-ai"}>
              <motion.div
                className={msg.role === 'user' ? "chat-bubble-user" : "chat-bubble-ai"}
                initial={{ opacity: 0, x: msg.role === 'user' ? 30 : -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {msg.role === 'model' ? (
                  <div 
                    className="chat-bubble-ai-text markdown-body" 
                    dangerouslySetInnerHTML={{ __html: marked.parse(msg.text, { breaks: true }) }} 
                  />
                ) : (
                  msg.text
                )}

                {msg.hasChart && (
                  <>
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
                      <button className="chat-pill" onClick={() => showToast("Quick action engaged.")}>Quick Action +</button>
                      <button className="chat-pill" onClick={() => showToast("Opening scheduler...")}>Schedule</button>
                      <button className="chat-pill" onClick={() => showToast("Drafting email report...")}>Email</button>
                      <button className="chat-pill" onClick={() => showToast("Exporting conversation log as PDF...")}>Export</button>
                    </div>
                  </>
                )}
              </motion.div>
            </div>
          ))}
          {isLoading && (
            <div className="chat-msg-ai">
              <div className="chat-bubble-ai" style={{ padding: '12px 20px' }}>
                <Loader2 className="animate-spin" size={20} color="#7c3aed" style={{ animation: 'spin 1s linear infinite' }} />
              </div>
            </div>
          )}
        </div>

        {/* Bottom Input Bar */}
        <div className="chat-input-bar">
          <input
            className="chat-input"
            type="text"
            placeholder="Ask AeroEdge anything..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button className="chat-mic-btn" aria-label="Mic" onClick={() => showToast("Voice input requires microphone permissions.")}>
            <Mic size={20} />
          </button>
          <button className="chat-send-btn" aria-label="Send" onClick={handleSend} disabled={isLoading}>
            <ArrowRight size={18} />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
