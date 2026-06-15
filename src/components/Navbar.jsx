import React from 'react';
import { Plane } from 'lucide-react';
import './Navbar.css';

const navLinks = [
  'Dashboard',
  'Defect Detection',
  'Engine Health',
  'Fleet',
  'Chat',
];

export default function Navbar() {
  return (
    <nav className="navbar">
      {/* Logo */}
      <a className="navbar-logo" href="#">
        <Plane className="navbar-logo-icon" />
        <span className="navbar-logo-text">AeroEdge</span>
      </a>

      {/* Center links */}
      <ul className="navbar-links">
        {navLinks.map((label) => (
          <li key={label}>
            <a className="navbar-link" href="#">
              {label}
            </a>
          </li>
        ))}
      </ul>

      {/* Right actions */}
      <div className="navbar-actions">
        <button className="navbar-signin">Sign In</button>
        <button className="navbar-demo-btn">Book Demo</button>
      </div>
    </nav>
  );
}
