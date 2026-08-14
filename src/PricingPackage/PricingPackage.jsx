import React, { useCallback, useState } from 'react';
import { Check, Star, CircleCheck, Clock, Infinity as InfinityIcon } from 'lucide-react';
import { useBilling } from '../context/BillingContext';

export default function PricingPackage() {
  const { 
    packages, 
    selectedPackage, 
    selectPackage, 
    clearPackage,
    packagePaid,
    selectedPlan,
    changePlan
  } = useBilling();

  // Always use monthly plan
  const activePlan = 'month';

  // Handle package selection - toggle if same package clicked
  const handleSelectPackage = useCallback((packageId) => {
    // If clicking the same package, deselect it (cancel)
    if (selectedPackage?.id === packageId) {
      clearPackage();
      return;
    }
    
    selectPackage(packageId, activePlan);
    
    // Removed auto-scroll to service-dashboard to prevent unwanted redirection
  }, [selectPackage, activePlan, selectedPackage, clearPackage]);

  const packageList = Object.values(packages);

  const [expandedPackages, setExpandedPackages] = useState({});

  // Toggle expand/collapse for a specific package
  const toggleExpand = useCallback((packageId) => {
    setExpandedPackages(prev => ({
      ...prev,
      [packageId]: !prev[packageId]
    }));
  }, []);

  const formatPrice = (price) => {
    const value = (typeof price === 'number' && isFinite(price)) ? price : 0;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <section className=" bg-black">
      <div className="container mx-auto section-gap">
        {/* Header */}
        <header className="mb-6 sm:mb-8 md:mb-12 animate-fade-in-up">
          <div className="  text-white  ">
            <div className="">
              {/* Header */}
              <div className="text-center mb-8 lg:mb-16">
                <p className="text-gray-400 text-sm uppercase tracking-widest mb-4">
                  Plans
                </p>
                <h1 className="text-3xl md:text-[39px] font-bold mb-6 hero-title">
                  CLEAR <span className="text-[#BE301E] ">PACKAGES</span> FOR
                  GROWING CONTRACTORS
                </h1>
                <p className="text-gray-400 text-lg max-w-5xl mx-auto leading-relaxed">
                  Choose a ready-made plan with transparent pricing that matches
                  your current stage of growth. Need something more specific?
                  Our custom plan is tailored after a strategy call, so you only
                  pay for what will really move the needle.
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-8">
          {packageList.map((pkg, index) => {
            const isSelected = selectedPackage?.id === pkg.id;
            const isPaid = packagePaid && isSelected;
            const displayPrice = pkg.pricing[activePlan];
            const lifetimePrice = pkg.pricing.lifetime;
            const savings =
              activePlan === 'month' ? lifetimePrice - pkg.pricing['month'] : 0;

            // Show first 5 features or all if expanded
            const featuresToShow = expandedPackages[pkg.id] ? pkg.features : pkg.features.slice(0, 5);
            const hasMoreFeatures = pkg.features && pkg.features.length > 5;

            return (
              <div
                key={pkg.id}
                className={`bg-[#1B1B1B] rounded-xl p-4 sm:p-6 md:p-8 flex flex-col relative transition-all duration-500 ease-in-out animate-fade-in-up border-2 ${
                  isSelected
                    ? 'border-[#BE301E] shadow-2xl ring-2 ring-[#BE301E] ring-opacity-20'
                    : pkg.recommended && !selectedPackage
                      ? 'border-[#BE301E] shadow-2xl ring-2 ring-[#BE301E] ring-opacity-20'
                      : 'border-gray-700 ring-2 hover:border-gray-800 hover:shadow-2xl hover:ring-4 hover:ring-gray-700 hover:ring-opacity-20 hover:scale-105'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Most Liked Badge */}
                {pkg.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gray-900 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap shadow-lg">
                      Most Liked
                    </span>
                  </div>
                )}

                {/* Package Info */}
                <div className="mb-4 xl:mb-6">
                  <h2 className="text-lg sm:text-xl xl:text-2xl font-bold text-[#FFFFFF] mb-1 sm:mb-2">
                    {pkg.name}
                  </h2>
                  <p className="text-sm xl:text-[17px] text-[#FFFFFF]">{pkg.description}</p>
                </div>

                {/* Price */}
                <div className="mb-4 xl:mb-6">
                  <div className="flex items-baseline gap-1 sm:gap-2">
                    <span className="text-2xl sm:text-3xl xl:text-[43px] font-bold text-[#FFFFFF]">
                      {formatPrice(displayPrice)}
                    </span>
                    <span className="text-gray-500 text-base">
                      {activePlan === 'lifetime' ? 'one-time' : '/mo'}
                    </span>
                  </div>
                </div>

                {/* Select Button */}
                <button
                  onClick={() => handleSelectPackage(pkg.id)}
                  disabled={isPaid}
                  className={`border xl:border-2 w-full py-2.5 xl:py-3 px-4 rounded-lg cursor-pointer font-semibold mb-4 xl:mb-6 transition-all duration-200 text-base ${
                    isSelected
                      ? 'bg-[#BE301E] border-gray-900 text-[#FFFFFF] hover:bg-[#BE301E]'
                      : 'border-gray-200 text-[#FFFFFF] '
                  } ${isPaid ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isPaid ? (
                    'Paid'
                  ) : isSelected ? (
                    <span className="flex items-center justify-center gap-2">
                      Click to Cancel
                    </span>
                  ) : (
                    'Select Package'
                  )}
                </button>

                {/* Features */}
                <div className="flex-1 min-h-[280px]">
                  <h3 className="font-semibold text-[#FFFFFF] mb-4 text-base">
                    What's Included
                  </h3>
                  <div 
                    className="overflow-hidden transition-all duration-500 ease-in-out"
                    style={{
                      maxHeight: expandedPackages[pkg.id] ? '1000px' : '400px'
                    }}
                  >
                    <ul className="space-y-3">
                      {featuresToShow.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 border-b border-gray-800 pb-2"
                        >
                          <CircleCheck className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-[#FFFFFF] leading-relaxed">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Show expand/collapse button if more than 5 features */}
                  {hasMoreFeatures && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(pkg.id);
                      }}
                      className="text-white font-bold text-base xl:text-xl cursor-pointer mt-4 select-none hover:text-[#BE301E] transition-colors"
                      style={{ width: 'fit-content' }}
                    >
                      {expandedPackages[pkg.id]
                        ? 'Show Less'
                        : `+${pkg.features.length - 5} More Features`}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}