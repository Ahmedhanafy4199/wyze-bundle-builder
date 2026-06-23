import React from 'react';

export default function VariantChips({ variants, activeVariantId, onSelect }) {
  if (!variants || variants.length === 0) return null;

  return (
    <div className="variant-selector-container">
      <div className="variant-chips">
        {variants.map(variant => (
          <button
            key={variant.id}
            type="button"
            className={`variant-chip ${activeVariantId === variant.id ? 'active' : ''}`}
            onClick={() => onSelect(variant.id)}
          >
            <img 
              src={variant.image} 
              alt={variant.name} 
              style={{ width: '20px', height: '20px', objectFit: 'contain' }}
            />
            {variant.name}
          </button>
        ))}
      </div>
    </div>
  );
}
