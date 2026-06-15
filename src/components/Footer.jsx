import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-left">
          <span className="footer-logo">AeroEdge</span>
          <p className="footer-copy">
            © 2026 Team BitOps. Built for InnoVent-27.
          </p>
        </div>
        <nav className="footer-links">
          <a href="#" className="footer-link">Privacy</a>
          <a href="#" className="footer-link">Terms</a>
          <a href="#" className="footer-link">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
