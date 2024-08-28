import React, { useEffect } from 'react';
import './Toast.scss';

interface ToastProps {
  message: string;
  type: 'error' | 'success' | 'info';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast ${type}`}>
      <p>{message}</p>
    </div>
  );
};