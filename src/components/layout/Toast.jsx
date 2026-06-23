import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="toast-notification">
      <Sparkles className="w-5 h-5 toast-success-icon" />
      <span>{message}</span>
    </div>
  );
}
