import React, { useState } from 'react';
import { ShieldCheck, AlertCircle, Wrench, Settings, ChevronDown, ChevronUp } from 'lucide-react';
import { showToast } from './Toast';
import './WorkOrders.css';

const workOrders = [
  {
    id: 'WO-2847',
    aircraft: 'VT-ANE (A320neo)',
    issue: 'HPT Blade Degradation & Corrosion',
    priority: 'Critical',
    cost: '₹12.4 Lakhs',
    compliance: 'AD-2024-15 Verified',
    isPending: false,
    parts: [
      { name: 'HPT Blade Set (CFM56)', qty: 1, cost: '₹8.2L' },
      { name: 'Combustor Liner', qty: 2, cost: '₹3.1L' },
      { name: 'Labor (36 Hrs)', qty: 1, cost: '₹1.1L' },
    ],
    directive: 'FAA AD-2024-15 requires immediate inspection and replacement of HPT blades exhibiting thermal distress exceeding 400 cycles.'
  },
  {
    id: 'WO-2848',
    aircraft: 'VT-IKL (B737 MAX)',
    issue: 'Landing Gear Strut Seal Leak',
    priority: 'Routine',
    cost: '₹1.8 Lakhs',
    compliance: 'EASA CS-25 Verified',
    isPending: false,
    parts: [
      { name: 'Strut Seal Kit', qty: 1, cost: '₹0.5L' },
      { name: 'Hydraulic Fluid (Skydrol)', qty: 5, cost: '₹0.3L' },
      { name: 'Labor (12 Hrs)', qty: 1, cost: '₹1.0L' },
    ],
    directive: 'Standard routine maintenance per Boeing AMM 32-00-00.'
  },
  {
    id: 'WO-2849',
    aircraft: 'VT-JMC (A350)',
    issue: 'Avionics Cooling Fan Failure',
    priority: 'High',
    cost: '₹4.2 Lakhs',
    compliance: 'Awaiting EASA Clearance',
    isPending: true,
    parts: [
      { name: 'Cooling Fan Assembly', qty: 1, cost: '₹3.8L' },
      { name: 'Labor (4 Hrs)', qty: 1, cost: '₹0.4L' },
    ],
    directive: 'Pending regulatory cross-check for aftermarket part compatibility.'
  }
];

export default function WorkOrders() {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div className="wo-container">
      <div className="wo-header">
        <h1>Work Order & Compliance Matrix</h1>
        <p>AI-generated maintenance plans cross-referenced with FAA & EASA Airworthiness Directives.</p>
      </div>

      <div className="wo-table-wrapper">
        <div className="wo-grid-header">
          <div>Work Order</div>
          <div>Aircraft</div>
          <div>Detected Issue</div>
          <div>Priority</div>
          <div>Est. Cost</div>
          <div>Compliance</div>
          <div>Action</div>
        </div>
        
        <div className="wo-grid-body">
          {workOrders.map((wo) => (
            <React.Fragment key={wo.id}>
              <div className="wo-grid-row" onClick={() => setExpandedId(expandedId === wo.id ? null : wo.id)}>
                <div className="wo-id">{wo.id}</div>
                <div style={{ fontWeight: 500 }}>{wo.aircraft}</div>
                <div>{wo.issue}</div>
                <div><span className={`wo-priority priority-${wo.priority}`}>{wo.priority}</span></div>
                <div style={{ fontWeight: 600 }}>{wo.cost}</div>
                <div>
                  <span className={`wo-compliance ${wo.isPending ? 'pending' : ''}`}>
                    {wo.isPending ? <AlertCircle size={16} /> : <ShieldCheck size={16} />}
                    {wo.compliance}
                  </span>
                </div>
                <div>
                  <button className="wo-action-btn" onClick={(e) => { e.stopPropagation(); setExpandedId(expandedId === wo.id ? null : wo.id); }} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {expandedId === wo.id ? 'Close' : 'Review Plan'}
                    {expandedId === wo.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>
              </div>
              
              {expandedId === wo.id && (
                <div className="wo-detail-panel">
                  <div className="wo-detail-grid">
                    <div className="wo-detail-box">
                      <div className="wo-detail-title"><Wrench size={14} style={{ display: 'inline', marginRight: 6 }}/> Parts & Labor Breakdown</div>
                      <ul className="wo-part-list">
                        {wo.parts.map((p, i) => (
                          <li key={i}>
                            <span>{p.qty}x {p.name}</span>
                            <span>{p.cost}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="wo-detail-box">
                      <div className="wo-detail-title"><Settings size={14} style={{ display: 'inline', marginRight: 6 }}/> AI Compliance Rationale</div>
                      <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#4b5563', margin: 0 }}>
                        {wo.directive}
                      </p>
                      <button onClick={() => showToast(`Executing Work Order... Sourcing replacement parts and deploying engineering team.`)} style={{ marginTop: '16px', background: '#1a1a2e', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', width: '100%' }}>
                        Execute Work Order
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
