import React, { useState, useEffect } from 'react';
import { Info, X } from 'lucide-react';
import './Toast.css';

// Global helper to trigger toasts from anywhere without context/prop drilling
export const showToast = (message) => {
  window.dispatchEvent(new CustomEvent('show-toast', { detail: { message } }));
};

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleToast = (e) => {
      const id = Date.now() + Math.random();
      const newToast = { id, message: e.detail.message };
      setToasts((prev) => [...prev, newToast]);

      // Auto-remove after 3 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    };

    window.addEventListener('show-toast', handleToast);
    return () => window.removeEventListener('show-toast', handleToast);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast-message animate-toast">
          <Info size={18} className="toast-icon" />
          <span>{toast.message}</span>
          <button className="toast-close" onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}>
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
