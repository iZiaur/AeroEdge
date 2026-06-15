import React from 'react';
import { X } from 'lucide-react';
import './DemoModal.css';

export default function DemoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="demo-modal-overlay" onClick={onClose}>
      <div className="demo-modal-content" onClick={e => e.stopPropagation()}>
        <button className="demo-modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        <div className="demo-video-wrapper">
          {/* Using a placeholder HTML5 video. You can replace this src with your actual hackathon demo video! */}
          <video 
            src="https://www.w3schools.com/html/mov_bbb.mp4" 
            controls 
            autoPlay 
            loop
          />
        </div>
      </div>
    </div>
  );
}
