import React from 'react';
import { Check, Info } from 'lucide-react';

export default function PlanCard({ plan, isPlanSelected, setActivePlan, setShowLearnMoreProduct }) {
  return (
    <div 
      className={`product-card ${isPlanSelected ? 'selected' : ''}`}
      style={{ flexDirection: 'row', flexWrap: 'wrap', gap: '24px', alignItems: 'center' }}
    >
      {isPlanSelected && (
        <div className="card-checkmark">
          <Check className="w-3 h-3" />
        </div>
      )}
      
      <div style={{ flex: '1', minWidth: '250px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h3 className="product-title">{plan.name}</h3>
          {plan.badge && (
            <span className="discount-badge" style={{ position: 'static', padding: '2px 8px' }}>
              {plan.badge}
            </span>
          )}
        </div>
        <p className="product-description" style={{ height: 'auto', marginTop: '8px' }}>
          {plan.description}
        </p>
        <a 
          href={plan.learnMoreUrl} 
          className="learn-more-link"
          onClick={(e) => {
            e.preventDefault();
            setShowLearnMoreProduct(plan);
          }}
        >
          Compare Plans <Info className="w-3.5 h-3.5" />
        </a>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-end', minWidth: '160px' }}>
        <div className="price-container" style={{ alignItems: 'flex-end' }}>
          {plan.compareAtPrice && (
            <span className="compare-price">${plan.compareAtPrice}/mo</span>
          )}
          <span className="active-price">
            ${plan.price}
            {plan.price > 0 && <span className="price-suffix">/mo</span>}
          </span>
        </div>
        <button
          className="plan-select-btn"
          type="button"
          onClick={() => setActivePlan(plan.id)}
        >
          {isPlanSelected ? 'Active Plan' : 'Select Plan'}
        </button>
      </div>
    </div>
  );
}
