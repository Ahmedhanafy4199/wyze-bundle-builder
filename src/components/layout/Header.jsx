import React from 'react';

export default function Header({ handleClearBuilder }) {
  return (
    <header className="app-header">
      <div className="header-title">
        <h1>Build Your System</h1>
        <p>Customize your professional smart home security system. Starter items included.</p>
      </div>
      <div className="header-actions">
        <button 
          className="view-details-btn" 
          style={{ 
            backgroundColor: 'transparent', 
            color: 'var(--text-muted)',
            border: '1px solid var(--border-color)',
            fontSize: '0.85rem',
            fontWeight: 600
          }}
          onClick={handleClearBuilder}
        >
          Clear Builder
        </button>
      </div>
    </header>
  );
}
