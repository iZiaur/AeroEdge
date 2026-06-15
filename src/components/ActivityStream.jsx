import React, { useState, useEffect } from 'react';
import { Scan, Activity, ClipboardList, ShieldCheck, CheckCircle2, Loader2, AlertTriangle } from 'lucide-react';
import './ActivityStream.css';

const streamData = [
  {
    id: 1,
    agent: 'Vision Agent',
    icon: Scan,
    color: '#ef4444',
    time: 'Just now',
    text: 'Detected 88% surface corrosion and microscopic fatigue cracking on Aircraft VT-ANE, Wing Section C.',
    status: 'Alert Triggered',
    statusClass: 'status-warning',
    delay: 1000
  },
  {
    id: 2,
    agent: 'RUL Agent',
    icon: Activity,
    color: '#f59e0b',
    time: '12 seconds ago',
    text: 'Received Vision Agent anomaly data. Recalculating aerodynamic drag baseline for Engine 2. Remaining Useful Life (RUL) adjusted downward to 52 cycles.',
    status: 'Baseline Updated',
    statusClass: 'status-processing',
    delay: 4000
  },
  {
    id: 3,
    agent: 'Work Order Agent',
    icon: ClipboardList,
    color: '#3b82f6',
    time: '28 seconds ago',
    text: 'Drafting urgent repair plan based on revised RUL. Sourcing replacement parts for HPT and generating cost estimation (Est: ₹12.4 Lakhs).',
    status: 'Drafting WO-2847',
    statusClass: 'status-processing',
    delay: 7500
  },
  {
    id: 4,
    agent: 'Compliance Agent',
    icon: ShieldCheck,
    color: '#10b981',
    time: '45 seconds ago',
    text: 'Cross-referencing WO-2847 against FAA Airworthiness Directive AD-2024-15 and EASA safety guidelines. No regulatory conflicts found.',
    status: 'Verified & Cleared',
    statusClass: 'status-success',
    delay: 11000
  }
];

export default function ActivityStream() {
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    setVisibleItems([]);
    
    const timeouts = streamData.map(item => {
      return setTimeout(() => {
        setVisibleItems(prev => [item, ...prev]);
      }, item.delay);
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="stream-container">
      <div className="stream-header">
        <h1>Multi-Agent Activity Stream</h1>
        <p>Watch the AI agents collaborate autonomously to resolve an aircraft anomaly in real-time.</p>
      </div>

      <div className="timeline">
        {visibleItems.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: '#9ca3af', fontSize: '14px' }}>
            <Loader2 className="animate-spin" size={24} style={{ margin: '0 auto 12px' }} />
            Listening for agent activity...
          </div>
        )}
        {visibleItems.map((item) => (
          <div key={item.id} className="timeline-item">
            <div className="timeline-icon" style={{ borderColor: item.color }}>
              <item.icon size={22} color={item.color} />
            </div>
            
            <div className="timeline-content">
              <div className="timeline-meta">
                <span className="timeline-agent" style={{ color: item.color }}>{item.agent}</span>
                <span>{item.time}</span>
              </div>
              
              <div className="timeline-text">
                {item.text}
              </div>
              
              <div className={`timeline-status ${item.statusClass}`}>
                {item.statusClass === 'status-success' && <CheckCircle2 size={14} />}
                {item.statusClass === 'status-warning' && <AlertTriangle size={14} />}
                {item.statusClass === 'status-processing' && <Loader2 size={14} className="animate-spin" />}
                {item.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
