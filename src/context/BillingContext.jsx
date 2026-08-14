import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { useGlobalSettings } from './GlobalSettingsContext';

const BillingContext = createContext(null);

// Payment plan types
const PAYMENT_PLANS = {
  LIFETIME: 'lifetime',
  SIX_MONTH: 'month'
};

// Fallback Package definitions (used if API fails)
const FALLBACK_PACKAGES = {
  starter: {
    id: 'starter',
    name: 'Starter',
    description: 'SEO + Local SEO (No PPC, No Website)',
    pricing: {
      lifetime: 1850,
      'month': Math.round(1850)
    },
    price: 1850,
    features: [
      'Google Ads Management',
      'Conversion Tracking',
      'Google Maps Optimization',
      'Local On-Page',
      'Reporting',
    ],
    moreFeatures: '+5 More Features'
  },
  growth: {
    id: 'growth',
    name: 'Growth',
    description: 'SEO + PPC + LP + Content Boost',
    pricing: {
      lifetime: 3450,
      'month': Math.round(3450)
    },
    price: 3450,
    recommended: true,
    features: [
      'Google Ads Management',
      'SEO Optimization',
      'Google Maps SEO',
      'SEO Pages Creation',
      'Link Building',
      'Al Bearch Readiness',
      'Reporting & Insights',
    ],
    moreFeatures: '+10 More Features'
  },
  scale: {
    id: 'scale',
    name: 'Scale',
    description: 'Full Stack Growth',
    pricing: {
      lifetime: 5750,
      'month': Math.round(5750)
    },
    price: 5750,
    features: [
      'High-Budget Google Ads Management',
      'Aggressive SEO Growth',
      'Expanded Google Maps Presence',
      'Advariced Al Search Optimization',
      'Service & Location Coverage',
      'Content Expansion',
      'Advanced Link Building',
      'Priority Execution',
      'Reporting & Strategy',
    ],
    moreFeatures: '+13 More Features'
  }
};

export function BillingProvider({ children }) {
  // Get packages from global settings
  const { packages: globalPackages, loading: settingsLoading } = useGlobalSettings();
  
  // Use global packages if available, otherwise fallback
  const PACKAGES = useMemo(() => {
    if (globalPackages && Object.keys(globalPackages).length > 0) {
      return globalPackages;
    }
    return FALLBACK_PACKAGES;
  }, [globalPackages]);

  // Selected package (one-time payment)
  const [selectedPackage, setSelectedPackage] = useState(null);
  
  // Selected payment plan type (lifetime or month)
  const [selectedPlan, setSelectedPlan] = useState(PAYMENT_PLANS.LIFETIME);
  
  // Track if package has been paid (for subsequent billing cycles)
  const [packagePaid, setPackagePaid] = useState(false);
  
  // Selected services (monthly recurring) - Map for O(1) lookups
  const [selectedServices, setSelectedServices] = useState(new Map());
  
  // First purchase flag
  const [isFirstPurchase, setIsFirstPurchase] = useState(true);

  // Select a package with optional plan type
  const selectPackage = useCallback((packageId, planType = null) => {
    if (PACKAGES[packageId]) {
      const pkg = PACKAGES[packageId];
      const plan = planType || selectedPlan;
      // Set the effective price based on plan
      const effectivePrice = pkg.pricing[plan];
      setSelectedPackage({ ...pkg, price: effectivePrice, selectedPlanType: plan });
      if (planType) {
        setSelectedPlan(planType);
      }
    }
  }, [selectedPlan]);

  // Change payment plan
  const changePlan = useCallback((planType) => {
    setSelectedPlan(planType);
    // Update selected package price if one is selected
    if (selectedPackage) {
      const pkg = PACKAGES[selectedPackage.id];
      const effectivePrice = pkg.pricing[planType];
      setSelectedPackage({ ...pkg, price: effectivePrice, selectedPlanType: planType });
    }
  }, [selectedPackage]);

  // Clear package selection
  const clearPackage = useCallback(() => {
    setSelectedPackage(null);
  }, []);

  // Add a service
  const addService = useCallback((service) => {
    setSelectedServices(prev => {
      const newMap = new Map(prev);
      const serviceId = `${service.category}-${service.title}`;
      
      if (newMap.has(serviceId)) {
        // Increment quantity if already exists
        const existing = newMap.get(serviceId);
        newMap.set(serviceId, { ...existing, quantity: existing.quantity + 1 });
      } else {
        // Determine payment type and price
        let paymentType = service.paymentType;
        let price;
        
        // If paymentType is provided (from UI), use it
        if (paymentType) {
          // Use the selected payment type
          price = paymentType === 'month' ? service.monthlyPrice : service.oneTimePrice;
          // Fallback if selected price type is not available
          if (!price) {
            price = service.monthlyPrice || service.oneTimePrice || '$0';
          }
        } else {
          // If paymentType is not provided, determine from available options using hasMonthly/hasOneTime flags
          if (service.hasMonthly && !service.hasOneTime) {
            paymentType = 'month';
            price = service.monthlyPrice;
          } else if (service.hasOneTime && !service.hasMonthly) {
            paymentType = 'one-time';
            price = service.oneTimePrice;
          } else if (service.hasMonthly && service.hasOneTime) {
            // Has both options, default to month
            paymentType = 'month';
            price = service.monthlyPrice;
          } else {
            // Fallback: check which price is available (for backward compatibility)
            if (service.monthlyPrice && !service.oneTimePrice) {
              paymentType = 'month';
              price = service.monthlyPrice;
            } else if (service.oneTimePrice && !service.monthlyPrice) {
              paymentType = 'one-time';
              price = service.oneTimePrice;
            } else {
              // No price available, default to one-time with $0
              paymentType = 'one-time';
              price = '$0';
            }
          }
        }
        
        newMap.set(serviceId, { 
          ...service, 
          id: serviceId, 
          quantity: 1,
          price,
          paymentType
        });
      }
      return newMap;
    });
    
    return { success: true };
  }, []);

  // Remove a service
  const removeService = useCallback((serviceId) => {
    setSelectedServices(prev => {
      const newMap = new Map(prev);
      const existing = newMap.get(serviceId);
      
      if (existing && existing.quantity > 1) {
        newMap.set(serviceId, { ...existing, quantity: existing.quantity - 1 });
      } else {
        newMap.delete(serviceId);
      }
      return newMap;
    });
  }, []);

  // Clear all services
  const clearServices = useCallback(() => {
    setSelectedServices(new Map());
  }, []);

  // Parse price string to number
  const parsePrice = useCallback((priceStr) => {
    // Handle number directly
    if (typeof priceStr === 'number') {
      return isFinite(priceStr) ? priceStr : 0;
    }
    // Handle null/undefined/empty
    if (!priceStr) return 0;
    // Convert to string if needed
    const str = String(priceStr);
    // Handle ranges like "$8,995 - $11,995" - take the lower value
    const match = str.match(/\$([\d,]+)/);
    if (match) {
      const parsed = parseFloat(match[1].replace(/,/g, ''));
      return isFinite(parsed) ? parsed : 0;
    }
    // Try to parse as plain number (e.g., "399" without $)
    const plainNum = parseFloat(str.replace(/[^\d.]/g, ''));
    return isFinite(plainNum) ? plainNum : 0;
  }, []);

  // Calculate totals
  const totals = useMemo(() => {
    const servicesArray = Array.from(selectedServices.values());
    
    // Separate services by payment type
    const monthlyServices = servicesArray.filter(s => s.paymentType === 'month');
    const oneTimeServices = servicesArray.filter(s => s.paymentType === 'one-time');
    
    // Check if it's the month plan
    const is6MonthPlan = selectedPackage?.selectedPlanType === 'month';

    // Package price (only if first purchase and not yet paid)
    const packagePriceValue = (selectedPackage && isFirstPurchase && !packagePaid) 
      ? selectedPackage.price 
      : 0;

    // Categorize package price by plan type
    const packageOneTime = (!is6MonthPlan) ? packagePriceValue : 0;
    const packageMonthly = (is6MonthPlan) ? packagePriceValue : 0;
    
    // One-time services total
    const servicesOneTime = oneTimeServices.reduce((sum, service) => {
      return sum + (parsePrice(service.price) * service.quantity);
    }, 0);
    
    // Total one-time charges (package + one-time services)
    const oneTimeTotal = packageOneTime + servicesOneTime;
    
    // Monthly recurring services total (including package monthly if applicable)
    const monthlyTotal = monthlyServices.reduce((sum, service) => {
      return sum + (parsePrice(service.price) * service.quantity);
    }, 0) + packageMonthly;
    
    // First checkout total (package + one-time services + first month of recurring services)
    const firstCheckoutTotal = oneTimeTotal + monthlyTotal;
    
    // Subsequent months total (only recurring services)
    const recurringTotal = monthlyTotal;
    
    return {
      oneTimeTotal,
      monthlyTotal,
      firstCheckoutTotal,
      recurringTotal,
      servicesOneTime,
      packageOneTime,
      servicesCount: servicesArray.reduce((sum, s) => sum + s.quantity, 0),
      hasPackage: !!selectedPackage,
      hasServices: servicesArray.length > 0,
      is6MonthPlan,
      planType: selectedPackage?.selectedPlanType || selectedPlan
    };
  }, [selectedPackage, selectedServices, isFirstPurchase, packagePaid, parsePrice, selectedPlan]);

  // Process checkout
  const processCheckout = useCallback(() => {
    if (!selectedPackage) {
      return { success: false, message: 'Please select a package' };
    }
    
    // Mark package as paid after first checkout
    if (isFirstPurchase) {
      setPackagePaid(true);
      setIsFirstPurchase(false);
    }
    
    return { 
      success: true, 
      charged: isFirstPurchase ? totals.firstCheckoutTotal : totals.recurringTotal,
      message: isFirstPurchase 
        ? 'First payment processed (Package + Services)' 
        : 'Monthly payment processed (Services only)'
    };
  }, [selectedPackage, isFirstPurchase, totals]);

  // Reset billing (for testing/demo)
  const resetBilling = useCallback(() => {
    setSelectedPackage(null);
    setSelectedServices(new Map());
    setPackagePaid(false);
    setIsFirstPurchase(true);
    setSelectedPlan(PAYMENT_PLANS.LIFETIME);
  }, []);

  const value = {
    // State
    selectedPackage,
    selectedServices: Array.from(selectedServices.values()),
    selectedServicesMap: selectedServices,
    isFirstPurchase,
    packagePaid,
    packages: PACKAGES,
    selectedPlan,
    paymentPlans: PAYMENT_PLANS,
    
    // Actions
    selectPackage,
    clearPackage,
    addService,
    removeService,
    clearServices,
    processCheckout,
    resetBilling,
    changePlan,
    
    // Computed
    totals,
    parsePrice
  };

  return (
    <BillingContext.Provider value={value}>
      {children}
    </BillingContext.Provider>
  );
}

export function useBilling() {
  const context = useContext(BillingContext);
  if (!context) {
    throw new Error('useBilling must be used within a BillingProvider');
  }
  return context;
}

export default BillingContext;
