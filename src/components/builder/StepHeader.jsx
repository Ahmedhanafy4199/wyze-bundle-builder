import React from 'react';
import { Camera, ShieldAlert, Radio, ShieldCheck, ChevronUp, ChevronDown } from 'lucide-react';

const iconMap = {
  Camera: <Camera className="w-5 h-5" />,
  ShieldAlert: <ShieldAlert className="w-5 h-5" />,
  Radio: <Radio className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />
};

export default function StepHeader({ step, isActive, selectedCount, handleStepClick }) {
  return (
    <div className="step-header" onClick={() => handleStepClick(step.id)}>
      <div className="step-header-left">
        <div className="step-icon-container">
          {iconMap[step.icon]}
        </div>
        <div>
          <div className="step-number-headline">{step.number}</div>
          <h2 className="step-title-text">{step.title}</h2>
        </div>
      </div>
      <div className="step-header-right">
        {selectedCount > 0 && (
          <span className="selected-count-badge">
            {selectedCount} selected
          </span>
        )}
        {isActive ? (
          <ChevronUp className="chevron-icon w-5 h-5" />
        ) : (
          <ChevronDown className="chevron-icon w-5 h-5" />
        )}
      </div>
    </div>
  );
}
