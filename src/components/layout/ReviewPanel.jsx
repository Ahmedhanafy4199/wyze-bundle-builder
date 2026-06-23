import React from 'react';
import { Check, Shield, Save, X, Truck } from 'lucide-react';
import { Minus, Plus } from 'lucide-react';

export default function ReviewPanel({ 
  reviewItems, 
  totals, 
  handleQtyChange, 
  setShowCheckoutModal, 
  isMobileDrawerOpen, 
  setIsMobileDrawerOpen, 
  saveConfiguration, 
  isSaved 
}) {
  return (
    <>
      <aside className={`review-panel ${isMobileDrawerOpen ? 'mobile-drawer open' : 'mobile-drawer'}`}>
        <div className="drawer-close-handle" onClick={() => setIsMobileDrawerOpen(false)} />
        
        <div className="review-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h2>Your security system</h2>
              <p>Configured system summary</p>
            </div>
            {isMobileDrawerOpen && (
              <button 
                onClick={() => setIsMobileDrawerOpen(false)} 
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>

        {/* List of items grouped by category */}
        <div className="review-items-container">
          {Object.keys(reviewItems).map(category => {
            const items = reviewItems[category];
            if (items.length === 0) return null;

            return (
              <div key={category} className="review-category-group">
                <div className="review-category-heading">{category}</div>
                
                {items.map(item => (
                  <div key={item.id} className="review-line-item">
                    <div className="item-left">
                      {item.image ? (
                        <div className="item-thumbnail-container">
                          <img src={item.image} alt={item.name} className="item-thumbnail" />
                        </div>
                      ) : (
                        <div className="item-thumbnail-container" style={{ backgroundColor: 'var(--accent-light)' }}>
                          <Shield className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                        </div>
                      )}
                      <div className="item-details">
                        <span className="item-name">{item.name}</span>
                        <span className="item-meta">
                          {item.isPlan ? 'Monthly Subscription' : `$${item.price} each`}
                        </span>
                        {item.isBase && (
                          <span className="item-base-badge">Included in starter pack</span>
                        )}
                      </div>
                    </div>

                    <div className="item-right">
                      {/* Stepper (Only show for non-base, non-plan items) */}
                      {!item.isBase && !item.isPlan ? (
                        <div className="stepper">
                          <button 
                            className="stepper-btn" 
                            type="button"
                            onClick={() => handleQtyChange(item.productId, item.variantId || null, -1)}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="stepper-value">{item.quantity}</span>
                          <button 
                            className="stepper-btn" 
                            type="button"
                            onClick={() => handleQtyChange(item.productId, item.variantId || null, 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', paddingRight: '8px' }}>
                          ×{item.quantity}
                        </span>
                      )}
                      <span className="item-price">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Shipping Row */}
        <div className="review-shipping-row">
          <div className="shipping-icon-box">
            <Truck className="w-6 h-6" style={{ color: '#00BFA6' }} />
          </div>
          <span className="shipping-label">Fast Shipping</span>
          <div className="shipping-price">
            <span className="shipping-compare">$5.99</span>
            <span className="shipping-free">FREE</span>
          </div>
        </div>

        {/* Guarantee + Pricing Row */}
        <div className="review-guarantee-pricing-row">
          {/* Circular satisfaction stamp */}
          <div className="satisfaction-stamp">
            <div className="stamp-ring">
              <div className="stamp-inner">
                <div className="stamp-percent">100%</div>
                <div className="stamp-brand">Wyze</div>
                <div className="stamp-text">satisfaction</div>
                <div className="stamp-text">guarantee</div>
              </div>
              <div className="stamp-outer-text">
                <span>Try worry-free for 30 days</span>
              </div>
            </div>
          </div>

          {/* Pricing stack */}
          <div className="review-pricing-stack">
            {totals.totalUpfront > 0 && (
              <div className="financing-pill">
                as low as ${(totals.totalUpfront / 12).toFixed(2)}/mo
              </div>
            )}
            <div className="review-prices-row">
              {totals.upfrontSavings > 0 && (
                <span className="review-compare-price">${totals.totalUpfrontCompare.toFixed(2)}</span>
              )}
              <span className="review-active-price">${totals.totalUpfront.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Savings Callout */}
        {totals.upfrontSavings > 0 && (
          <div className="review-savings-text">
            🎉 Congrats! You're saving ${totals.upfrontSavings.toFixed(2)} on your security bundle!
          </div>
        )}

        {/* Checkout Button */}
        <button 
          className="checkout-btn" 
          type="button"
          onClick={() => setShowCheckoutModal(true)}
        >
          Checkout
        </button>
        
        {/* Save Link */}
        <a 
          href="#" 
          className={`save-later-link ${isSaved ? 'saved' : ''}`}
          onClick={saveConfiguration}
        >
          {isSaved ? (
            <>
              <Check className="w-4 h-4" /> System Saved!
            </>
          ) : (
            'Save my system for later'
          )}
        </a>
      </aside>

      {/* Drawer Overlay for Mobile Drawer */}
      <div className={`drawer-overlay ${isMobileDrawerOpen ? 'open' : ''}`} onClick={() => setIsMobileDrawerOpen(false)} />
    </>
  );
}
