import { useState, useEffect } from 'react';
import bundleData from '../data/bundleData.json';

export function useBuilder() {
  // --- State Initialization ---
  const [activeStep, setActiveStep] = useState(1);
  const [quantities, setQuantities] = useState(() => {
    const initial = {};
    bundleData.baseKit.forEach(item => {
      initial[item.productId] = item.quantity;
    });
    return initial;
  });
  const [selectedVariants, setSelectedVariants] = useState({
    'wyze-cam-v4': 'white',
    'wyze-cam-pan-v3': 'white',
    'wyze-cam-floodlight-v2': 'white',
    'wyze-battery-cam-pro': 'white'
  });
  const [activePlan, setActivePlan] = useState('plan-pro');
  const [isSaved, setIsSaved] = useState(false);
  const [showToast, setShowToast] = useState(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showLearnMoreProduct, setShowLearnMoreProduct] = useState(null);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // --- Toast Handler ---
  const triggerToast = (message) => {
    setShowToast(message);
    setTimeout(() => {
      setShowToast(null);
    }, 4500);
  };

  // --- LocalStorage Persistence ---
  useEffect(() => {
    try {
      const savedState = localStorage.getItem('security_bundle_builder_v1');
      if (savedState) {
        const parsed = JSON.parse(savedState);
        if (parsed.quantities) setQuantities(parsed.quantities);
        if (parsed.selectedVariants) setSelectedVariants(parsed.selectedVariants);
        if (parsed.activePlan) setActivePlan(parsed.activePlan);
        
        triggerToast('Welcome back! Your saved configuration has been restored.');
      }
    } catch (e) {
      console.error('Failed to load saved state from localStorage', e);
    }
  }, []);

  const saveConfiguration = (e) => {
    if(e) e.preventDefault();
    try {
      const stateToSave = { quantities, selectedVariants, activePlan };
      localStorage.setItem('security_bundle_builder_v1', JSON.stringify(stateToSave));
      setIsSaved(true);
      triggerToast('Configuration saved successfully! Return anytime to resume.');
      
      setTimeout(() => setIsSaved(false), 4000);
    } catch (e) {
      console.error('Failed to save configuration', e);
      triggerToast('Failed to save configuration. Please try again.');
    }
  };

  // --- Helper Functions for Quantities & Variants ---
  const getProductQty = (productId, variantId = null) => {
    const key = variantId ? `${productId}_${variantId}` : productId;
    return quantities[key] || 0;
  };

  const handleQtyChange = (productId, variantId, delta) => {
    const key = variantId ? `${productId}_${variantId}` : productId;
    const currentVal = quantities[key] || 0;
    const newVal = Math.max(0, currentVal + delta);
    
    setQuantities(prev => {
      const next = { ...prev };
      if (newVal === 0) {
        delete next[key];
      } else {
        next[key] = newVal;
      }
      return next;
    });
  };

  const handleVariantSelect = (productId, variantId) => {
    setSelectedVariants(prev => ({
      ...prev,
      [productId]: variantId
    }));
  };

  const handleStepClick = (stepId) => {
    setActiveStep(activeStep === stepId ? null : stepId);
  };

  // --- Gather active items for review panel ---
  const getReviewItems = () => {
    const list = {
      Cameras: [],
      Sensors: [],
      Accessories: [],
      Plan: []
    };

    // 1. Add Selected Plan (subscriptions)
    const currentPlan = bundleData.products.find(p => p.id === activePlan);
    if (currentPlan) {
      list.Plan.push({
        id: currentPlan.id,
        productId: currentPlan.id,
        name: currentPlan.name,
        quantity: 1,
        price: currentPlan.price,
        compareAtPrice: currentPlan.compareAtPrice,
        image: '',
        isBase: false,
        isPlan: true
      });
    }

    // 2. Add Hardware selections
    bundleData.products.forEach(product => {
      if (product.isPlan) return; 

      if (product.variants) {
        product.variants.forEach(variant => {
          const qty = getProductQty(product.id, variant.id);
          if (qty > 0) {
            list[product.category].push({
              id: `${product.id}_${variant.id}`,
              productId: product.id,
              variantId: variant.id,
              name: `${product.name} - ${variant.name}`,
              quantity: qty,
              price: product.price,
              compareAtPrice: product.compareAtPrice,
              image: variant.image,
              isBase: false
            });
          }
        });
      } else {
        const qty = getProductQty(product.id);
        if (qty > 0) {
          const baseItem = bundleData.baseKit.find(b => b.productId === product.id);
          list[product.category].push({
            id: product.id,
            productId: product.id,
            name: baseItem ? `${product.name} (Base Pack)` : product.name,
            quantity: qty,
            price: product.price,
            compareAtPrice: product.compareAtPrice,
            image: product.image,
            isBase: !!baseItem
          });
        }
      }
    });

    return list;
  };

  const reviewItems = getReviewItems();

  // --- Calculate Accordion Step Selections (Distinct Items count) ---
  const getSelectedCountInStep = (stepKey) => {
    if (stepKey === 'plan') {
      return activePlan !== 'plan-none' ? 1 : 0;
    }

    const stepProducts = bundleData.products.filter(p => p.step === stepKey);
    let count = 0;
    stepProducts.forEach(p => {
      if (p.variants) {
        const hasAny = p.variants.some(v => getProductQty(p.id, v.id) > 0);
        if (hasAny) count++;
      } else {
        if (getProductQty(p.id) > 0) count++;
      }
    });
    return count;
  };

  // --- Calculate totals ---
  const calculateTotals = () => {
    let hardwareActual = 0;
    let hardwareCompare = 0;
    let planActual = 0;
    let planCompare = 0;

    Object.keys(reviewItems).forEach(category => {
      reviewItems[category].forEach(item => {
        const price = item.price;
        const comparePrice = item.compareAtPrice || item.price;
        const totalActual = price * item.quantity;
        const totalCompare = comparePrice * item.quantity;

        if (item.isPlan) {
          planActual += totalActual;
          planCompare += totalCompare;
        } else {
          hardwareActual += totalActual;
          hardwareCompare += totalCompare;
        }
      });
    });

    const totalUpfront = hardwareActual;
    const totalUpfrontCompare = hardwareCompare;
    const upfrontSavings = Math.max(0, totalUpfrontCompare - totalUpfront);
    const savingsPercentage = totalUpfrontCompare > 0 ? Math.round((upfrontSavings / totalUpfrontCompare) * 100) : 0;

    return {
      totalUpfront,
      totalUpfrontCompare,
      upfrontSavings,
      savingsPercentage,
      planPrice: planActual,
      planComparePrice: planCompare
    };
  };

  const totals = calculateTotals();

  // --- Reset All (Clear Builder) ---
  const handleClearBuilder = () => {
    const initial = {};
    bundleData.baseKit.forEach(item => {
      initial[item.productId] = item.quantity;
    });
    setQuantities(initial);
    setSelectedVariants({
      'wyze-cam-v4': 'white',
      'wyze-cam-pan-v3': 'white',
      'wyze-cam-floodlight-v2': 'white',
      'wyze-battery-cam-pro': 'white'
    });
    setActivePlan('plan-pro');
    setActiveStep(1);
    triggerToast('All custom selections have been cleared.');
  };

  return {
    activeStep,
    quantities,
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
  };
}
