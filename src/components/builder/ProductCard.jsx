import React from 'react';

export function ProductCard({ 
  product, 
  currentQty, 
  activeVariantId, 
  hasVariants, 
  isCardSelected, 
  handleQtyChange, 
  handleVariantSelect, 
  setShowLearnMoreProduct 
}) {
  const activeVariantObj = hasVariants 
    ? product.variants.find(v => v.id === activeVariantId)
    : null;
  const currentImg = activeVariantObj ? activeVariantObj.image : product.image;

  return (
    <div className={`product-card ${product.step === 'cameras' ? 'horizontal' : ''} ${isCardSelected ? 'selected' : ''}`}>
      {/* Checkmark is only for non-horizontal cards (step !== 'cameras') as per previous logic */}
      {isCardSelected && product.step !== 'cameras' && (
        <div className="card-checkmark">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
      )}
      
      {product.badge && (
        <span className="discount-badge">{product.badge}</span>
      )}

      <div className="product-image-container">
        <img 
          src={currentImg} 
          alt={product.name} 
          className="product-image" 
        />
      </div>

      <div className={product.step === 'cameras' ? 'product-info-wrapper' : 'product-info-header'}>
        {product.step !== 'cameras' ? (
          <>
            <h3 className="product-title">{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <a 
              href={product.learnMoreUrl} 
              className="learn-more-link"
              onClick={(e) => {
                e.preventDefault();
                setShowLearnMoreProduct(product);
              }}
            >
              Learn More <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            </a>
          </>
        ) : (
          <div className="product-info-header">
            <h3 className="product-title">{product.name}</h3>
            <p className="product-description">
              {product.description}
              {' '}
              <a 
                href={product.learnMoreUrl} 
                className="learn-more-link"
                onClick={(e) => {
                  e.preventDefault();
                  setShowLearnMoreProduct(product);
                }}
              >
                Learn More
              </a>
            </p>
          </div>
        )}

        {hasVariants && (
          <div className="variant-selector-container">
            {product.step !== 'cameras' && <div className="variant-label">Color: {activeVariantObj?.name}</div>}
            <div className="variant-chips">
              {product.variants.map(variant => (
                <button
                  key={variant.id}
                  type="button"
                  className={`variant-chip ${activeVariantId === variant.id ? 'active' : ''}`}
                  onClick={() => handleVariantSelect(product.id, variant.id)}
                >
                  {product.step === 'cameras' ? (
                    <img 
                      src={variant.image} 
                      alt={variant.name} 
                      style={{ width: '20px', height: '20px', objectFit: 'contain' }}
                    />
                  ) : (
                    <span 
                      className="swatch" 
                      style={{ backgroundColor: variant.swatchColor }}
                    />
                  )}
                  {variant.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="card-actions-row">
          {product.step === 'cameras' ? (
            <>
              <div className="stepper">
                <button 
                  className="stepper-btn" 
                  type="button"
                  disabled={currentQty === 0}
                  onClick={() => handleQtyChange(product.id, activeVariantId || null, -1)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
                <span className="stepper-value">{currentQty}</span>
                <button 
                  className="stepper-btn" 
                  type="button"
                  onClick={() => handleQtyChange(product.id, activeVariantId || null, 1)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
              </div>

              <div className="price-container">
                {product.compareAtPrice && (
                  <span className="compare-price">${product.compareAtPrice}</span>
                )}
                <span className="active-price">${product.price}</span>
              </div>
            </>
          ) : (
            <>
              <div className="price-container">
                {product.compareAtPrice && (
                  <span className="compare-price">${product.compareAtPrice}</span>
                )}
                <span className="active-price">${product.price}</span>
              </div>

              <div className="stepper">
                <button 
                  className="stepper-btn" 
                  type="button"
                  disabled={currentQty === 0}
                  onClick={() => handleQtyChange(product.id, activeVariantId || null, -1)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
                <span className="stepper-value">{currentQty}</span>
                <button 
                  className="stepper-btn" 
                  type="button"
                  onClick={() => handleQtyChange(product.id, activeVariantId || null, 1)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
