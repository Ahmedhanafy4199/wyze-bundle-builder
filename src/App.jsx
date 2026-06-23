import React from 'react';
import { ArrowRight, Shield } from 'lucide-react';
import bundleData from './data/bundleData.json';
import { useBuilder } from './hooks/useBuilder';

import Header from './components/layout/Header';
import Toast from './components/layout/Toast';
import ReviewPanel from './components/layout/ReviewPanel';
import MobileSummaryBar from './components/layout/MobileSummaryBar';
import { CheckoutModal, LearnMoreModal } from './components/layout/Modals';

import StepHeader from './components/builder/StepHeader';
import { ProductCard } from './components/builder/ProductCard';
import PlanCard from './components/builder/PlanCard';

function App() {
  const builder = useBuilder();
  const {
    activeStep,
    selectedVariants,
    activePlan,
    isSaved,
    showToast,
    showCheckoutModal,
    showLearnMoreProduct,
    isMobileDrawerOpen,
    reviewItems,
    totals,
    setActiveStep,
    setActivePlan,
    setShowCheckoutModal,
    setShowLearnMoreProduct,
    setIsMobileDrawerOpen,
    getProductQty,
    handleQtyChange,
    handleVariantSelect,
    handleStepClick,
    getSelectedCountInStep,
    handleClearBuilder,
    saveConfiguration
  } = builder;

  return (
    <div className="app-container">
      <Toast message={showToast} />
      <Header handleClearBuilder={handleClearBuilder} />

      <div className="layout-grid">
        <main className="builder-accordion">
          {bundleData.steps.map((step) => {
            const isActive = activeStep === step.id;
            const selectedCount = getSelectedCountInStep(step.key);

            return (
              <div 
                key={step.id} 
                className={`accordion-step ${isActive ? 'active' : ''}`}
                id={`step-${step.key}`}
              >
                <StepHeader 
                  step={step} 
                  isActive={isActive} 
                  selectedCount={selectedCount} 
                  handleStepClick={handleStepClick} 
                />

                <div 
                  className="step-content-wrapper"
                  style={{ maxHeight: isActive ? '3000px' : '0px' }}
                >
                  <div className="step-content">
                    <p className="step-description">{step.description}</p>

                    {/* Step 1: Choose Your Cameras */}
                    {step.key === 'cameras' && (
                      <div className="products-grid cameras">
                        {bundleData.products.filter(p => p.step === 'cameras').map(product => {
                          const activeVariantId = selectedVariants[product.id];
                          const currentQty = getProductQty(product.id, activeVariantId);
                          const hasVariants = !!product.variants;
                          const totalQtyAcrossVariants = hasVariants 
                            ? product.variants.reduce((sum, v) => sum + getProductQty(product.id, v.id), 0)
                            : currentQty;
                          const isCardSelected = totalQtyAcrossVariants > 0;

                          return (
                            <ProductCard 
                              key={product.id}
                              product={product}
                              currentQty={currentQty}
                              activeVariantId={activeVariantId}
                              hasVariants={hasVariants}
                              isCardSelected={isCardSelected}
                              handleQtyChange={handleQtyChange}
                              handleVariantSelect={handleVariantSelect}
                              setShowLearnMoreProduct={setShowLearnMoreProduct}
                            />
                          );
                        })}
                      </div>
                    )}

                    {/* Step 2: Choose Your Plan */}
                    {step.key === 'plan' && (
                      <div className="products-grid" style={{ gridTemplateColumns: '1fr' }}>
                        {bundleData.products.filter(p => p.step === 'plan').map(plan => (
                          <PlanCard 
                            key={plan.id}
                            plan={plan}
                            isPlanSelected={activePlan === plan.id}
                            setActivePlan={setActivePlan}
                            setShowLearnMoreProduct={setShowLearnMoreProduct}
                          />
                        ))}
                      </div>
                    )}

                    {/* Step 3: Choose Your Sensors */}
                    {step.key === 'sensors' && (
                      <div>
                        <div className="satisfaction-badge" style={{ marginBottom: '20px', backgroundColor: 'var(--success-light)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
                          <Shield className="w-5 h-5 satisfaction-icon" style={{ color: 'var(--success)' }} />
                          <span style={{ fontSize: '0.85rem', color: 'var(--success-text)' }}>
                            Your system includes a starter pack of <strong>4 Entry Sensors</strong> and <strong>1 Motion Sensor</strong>. You can adjust your sensor quantities below:
                          </span>
                        </div>
                        <div className="products-grid">
                          {bundleData.products.filter(p => p.step === 'sensors').map(product => {
                            const currentQty = getProductQty(product.id);
                            return (
                              <ProductCard 
                                key={product.id}
                                product={product}
                                currentQty={currentQty}
                                activeVariantId={null}
                                hasVariants={false}
                                isCardSelected={currentQty > 0}
                                handleQtyChange={handleQtyChange}
                                handleVariantSelect={handleVariantSelect}
                                setShowLearnMoreProduct={setShowLearnMoreProduct}
                              />
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Step 4: Add Extra Protection */}
                    {step.key === 'protection' && (
                      <div>
                        <div className="satisfaction-badge" style={{ marginBottom: '20px', backgroundColor: 'var(--success-light)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
                          <Shield className="w-5 h-5 satisfaction-icon" style={{ color: 'var(--success)' }} />
                          <span style={{ fontSize: '0.85rem', color: 'var(--success-text)' }}>
                            Your system includes <strong>1 Wireless Keypad</strong> starter accessory. You can adjust your accessories below:
                          </span>
                        </div>
                        <div className="products-grid">
                          {bundleData.products.filter(p => p.step === 'protection').map(product => {
                            const currentQty = getProductQty(product.id);
                            return (
                              <ProductCard 
                                key={product.id}
                                product={product}
                                currentQty={currentQty}
                                activeVariantId={null}
                                hasVariants={false}
                                isCardSelected={currentQty > 0}
                                handleQtyChange={handleQtyChange}
                                handleVariantSelect={handleVariantSelect}
                                setShowLearnMoreProduct={setShowLearnMoreProduct}
                              />
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Step Footer (Advance Button) */}
                    {step.id < 4 && (
                      <div className="step-footer">
                        <button 
                          className="next-step-btn" 
                          type="button"
                          onClick={() => setActiveStep(step.id + 1)}
                        >
                          Next: {bundleData.steps.find(s => s.id === step.id + 1)?.title}
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </main>

        <ReviewPanel 
          reviewItems={reviewItems}
          totals={totals}
          handleQtyChange={handleQtyChange}
          setShowCheckoutModal={setShowCheckoutModal}
          isMobileDrawerOpen={isMobileDrawerOpen}
          setIsMobileDrawerOpen={setIsMobileDrawerOpen}
          saveConfiguration={saveConfiguration}
          isSaved={isSaved}
        />
      </div>

      <MobileSummaryBar 
        totals={totals}
        setIsMobileDrawerOpen={setIsMobileDrawerOpen}
        setShowCheckoutModal={setShowCheckoutModal}
      />

      <CheckoutModal 
        showCheckoutModal={showCheckoutModal}
        setShowCheckoutModal={setShowCheckoutModal}
        reviewItems={reviewItems}
        totals={totals}
      />

      <LearnMoreModal 
        showLearnMoreProduct={showLearnMoreProduct}
        setShowLearnMoreProduct={setShowLearnMoreProduct}
      />
    </div>
  );
}

export default App;
