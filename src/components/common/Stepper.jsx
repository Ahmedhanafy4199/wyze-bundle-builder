import React from 'react';
import { Minus, Plus } from 'lucide-react';

export default function Stepper({ quantity, onDecrease, onIncrease, disabledDecrease }) {
  return (
    <div className="stepper">
      <button 
        className="stepper-btn" 
        type="button"
        disabled={disabledDecrease}
        onClick={onDecrease}
      >
        <Minus className="w-3.5 h-3.5" />
      </button>
      <span className="stepper-value">{quantity}</span>
      <button 
        className="stepper-btn" 
        type="button"
        onClick={onIncrease}
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
