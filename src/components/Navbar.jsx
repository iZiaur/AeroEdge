import React from 'react';
import { Plane } from 'lucide-react';
import { showToast } from './Toast';
import './Navbar.css';

const navLinks = [
  { label: 'Dashboard', id: 'landing' },
  { label: 'Defect Detection', id: 'defect-detection' },
  { label: 'Engine Health', id: 'engine-health' },
  { label: 'Agent Feed', id: 'activity-stream' },
  { label: 'Work Orders', id: 'work-orders' },
  { label: 'Chat', id: 'chat' },
];

export default function Navbar({ currentView = 'landing', setCurrentView }) {
  return (
    <nav className="navbar">
      {/* Logo */}
      <a className="navbar-logo" href="#" onClick={(e) => { e.preventDefault(); setCurrentView?.('landing'); }}>
        <Plane className="navbar-logo-icon" />
        <span className="navbar-logo-text">AeroEdge</span>
      </a>

      {/* Center links */}
      <ul className="navbar-links">
        {navLinks.map(({ label, id }) => (
          <li key={id}>
            <a 
              className={`navbar-link ${currentView === id ? 'active' : ''}`} 
              href="#"
              onClick={(e) => { e.preventDefault(); setCurrentView?.(id); }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      {/* Right actions */}
      <div className="navbar-actions">
        <button className="navbar-signin" onClick={() => showToast("Connecting to Enterprise Identity Provider...")}>Sign In</button>
        <button className="navbar-demo-btn" onClick={() => showToast("Booking module opening...")}>Book Demo</button>
      </div>
    </nav>
  );
}
