import React from 'react';

export default function MobileSummaryBar({ totals, setIsMobileDrawerOpen, setShowCheckoutModal }) {
  return (
    <div className="mobile-summary-bar">
      <div className="mobile-summary-info">
        <span className="mobile-summary-label">Total Upfront</span>
        <span className="mobile-summary-total">${totals.totalUpfront.toFixed(2)}</span>
      </div>
      <div className="mobile-summary-action">
        <button 
          className="mobile-view-details-btn"
          onClick={() => setIsMobileDrawerOpen(true)}
        >
          View Details
        </button>
        <button 
          className="checkout-btn" 
          style={{ padding: '10px 20px', fontSize: '0.95rem', width: 'auto', minWidth: '120px' }}
          onClick={() => setShowCheckoutModal(true)}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
