import React from 'react';
import { Check, X } from 'lucide-react';

export function CheckoutModal({ showCheckoutModal, setShowCheckoutModal, reviewItems, totals }) {
  if (!showCheckoutModal) return null;

  return (
    <div className="modal-overlay" onClick={() => setShowCheckoutModal(false)}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={() => setShowCheckoutModal(false)}>
          <X className="w-5 h-5" />
        </button>
        <div className="modal-icon-container">
          <Check className="w-8 h-8" />
        </div>
        <div className="modal-header">
          <h3>Confirm Your Bundle</h3>
          <p>Your custom system configuration is complete. Review your order details below:</p>
        </div>
        
        <div className="modal-summary-list">
          <div className="modal-summary-title">Summary of Selections</div>
          
          {Object.keys(reviewItems).map(category => {
            const items = reviewItems[category];
            return items.map(item => (
              <div key={item.id} className="modal-summary-item">
                <span>{item.name} ×{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ));
          })}
        </div>

        <div className="totals-section" style={{ borderTop: 'none', paddingTop: 0 }}>
          <div className="total-price-row">
            <span className="total-label" style={{ fontSize: '1rem' }}>Upfront Total:</span>
            <span className="total-active-price" style={{ fontSize: '1.5rem' }}>${totals.totalUpfront.toFixed(2)}</span>
          </div>
          {totals.planPrice > 0 && (
            <div className="total-price-row">
              <span className="total-label" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Monthly Total:</span>
              <span className="total-active-price" style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>${totals.planPrice.toFixed(2)}/mo</span>
            </div>
          )}
        </div>

        <button 
          className="modal-action-btn" 
          onClick={() => setShowCheckoutModal(false)}
        >
          Confirm & Order
        </button>
      </div>
    </div>
  );
}

export function LearnMoreModal({ showLearnMoreProduct, setShowLearnMoreProduct }) {
  if (!showLearnMoreProduct) return null;

  return (
    <div className="modal-overlay" onClick={() => setShowLearnMoreProduct(null)}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={() => setShowLearnMoreProduct(null)}>
          <X className="w-5 h-5" />
        </button>
        <div className="modal-header" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span className="step-number-headline" style={{ color: 'var(--accent)' }}>
            {showLearnMoreProduct.category} Detail
          </span>
          <h3 style={{ marginTop: 0 }}>{showLearnMoreProduct.name}</h3>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {showLearnMoreProduct.image && (
            <div className="product-image-container" style={{ height: '180px', aspectRatio: 'auto' }}>
              <img src={showLearnMoreProduct.image} alt={showLearnMoreProduct.name} className="product-image" style={{ maxHeight: '100%' }} />
            </div>
          )}
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
            {showLearnMoreProduct.description}
          </p>
          
          <div style={{ padding: '16px', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-md)' }}>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '8px', color: 'var(--primary)' }}>Product Features:</h4>
            <ul style={{ fontSize: '0.85rem', color: 'var(--text-muted)', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>Designed and certified for high-reliability DIY installation.</li>
              <li>Seamlessly integrates into your existing home security network.</li>
              <li>Low-power backup battery operates during power outages.</li>
              {showLearnMoreProduct.isPlan && (
                <>
                  <li>No long-term contracts; cancel or change plans anytime.</li>
                  <li>Includes cellular network backup and cloud history.</li>
                </>
              )}
            </ul>
          </div>
        </div>

        <button className="modal-action-btn" onClick={() => setShowLearnMoreProduct(null)}>
          Close Product Info
        </button>
      </div>
    </div>
  );
}
