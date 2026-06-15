import React, { useState, useEffect } from 'react';
import { Activity, AlertTriangle, PenTool, TrendingDown } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { showToast } from './Toast';
import './EngineHealth.css';

// Initial dummy data
const initialData = Array.from({ length: 50 }, (_, i) => ({
  cycle: 800 + i,
  health: 100 - (i * i * 0.02) - (Math.random() * 2), // Quadratic degradation
}));

export default function EngineHealth() {
  const [data, setData] = useState(initialData);
  const [currentCycle, setCurrentCycle] = useState(849);
  const [rul, setRul] = useState(52);
  
  // Simulate live telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev];
        const lastCycle = newData[newData.length - 1].cycle;
        const lastHealth = newData[newData.length - 1].health;
        
        // Drop health slightly
        const newHealth = Math.max(0, lastHealth - (Math.random() * 1.5));
        
        newData.push({ cycle: lastCycle + 1, health: newHealth });
        newData.shift(); // keep length 50
        
        setCurrentCycle(lastCycle + 1);
        setRul(Math.max(0, Math.floor(newHealth / 1.2))); // rough RUL estimate based on health
        
        return newData;
      });
    }, 2000); // update every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="health-container">
      <div className="health-header">
        <h1>RUL Agent: Engine Health Prediction</h1>
        <p>Live telemetry analysis using Temporal Fusion Transformers to predict Remaining Useful Life (RUL) with confidence intervals.</p>
      </div>

      <div className="health-grid">
        {/* Left Column - Charts */}
        <div className="health-card">
          <div className="health-card-title">
            <Activity color="#7c3aed" /> Engine 2 Degradation Curve (CFM56-7B)
          </div>
          
          <div className="rul-stat-row">
            <div className="rul-stat">
              <div className="rul-stat-val">{rul}</div>
              <div className="rul-stat-label">Cycles Remaining</div>
            </div>
            <div className="rul-stat">
              <div className="rul-stat-val" style={{ color: rul < 50 ? '#ef4444' : '#10b981' }}>{rul < 50 ? 'Critical' : 'Warning'}</div>
              <div className="rul-stat-label">Health Status</div>
            </div>
            <div className="rul-stat">
              <div className="rul-stat-val">94.2%</div>
              <div className="rul-stat-label">Model Confidence</div>
            </div>
          </div>

          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="cycle" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#1a1a2e' }}
                />
                <ReferenceLine y={30} label="Critical Threshold" stroke="#ef4444" strokeDasharray="3 3" />
                <Area type="monotone" dataKey="health" stroke="#7c3aed" strokeWidth={3} fillOpacity={1} fill="url(#colorHealth)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column - Sensors & Work Orders */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          <div className="health-card">
            <div className="health-card-title">
              <TrendingDown color="#f59e0b" /> Sensor Contributions
            </div>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: '-16px 0 20px' }}>Sensors driving the RUL prediction downward.</p>
            
            <div className="sensor-row">
              <div className="sensor-header">
                <span>Total Temp (LPT)</span>
                <span>34.2%</span>
              </div>
              <div className="sensor-bar-bg"><div className="sensor-bar-fill" style={{ width: '34.2%' }} /></div>
            </div>
            <div className="sensor-row">
              <div className="sensor-header">
                <span>Static Pressure (HPC)</span>
                <span>22.8%</span>
              </div>
              <div className="sensor-bar-bg"><div className="sensor-bar-fill" style={{ width: '22.8%', background: '#f59e0b' }} /></div>
            </div>
            <div className="sensor-row">
              <div className="sensor-header">
                <span>Bypass Ratio</span>
                <span>18.1%</span>
              </div>
              <div className="sensor-bar-bg"><div className="sensor-bar-fill" style={{ width: '18.1%', background: '#ef4444' }} /></div>
            </div>
          </div>

          <div className="health-card" style={{ padding: '24px' }}>
            <div className="health-card-title" style={{ marginBottom: 0 }}>
              <PenTool color="#10b981" /> Smart Work Order
            </div>
            <div className="work-order-alert">
              <div className="wo-header">
                <AlertTriangle size={18} /> WO-2847 Auto-Generated
              </div>
              <div className="wo-details">
                <strong>Action:</strong> Bearing replacement & LPT inspection<br/>
                <strong>Est. Cost:</strong> ₹12.4 Lakhs<br/>
                <strong>Downtime:</strong> 36 Hours<br/>
                <strong>Compliance:</strong> AD-2024-15 ✅ Verified
              </div>
              <button className="wo-btn" onClick={() => showToast("Maintenance work order 2847 has been scheduled for Aircraft VT-ANE.")}>Approve & Schedule</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
