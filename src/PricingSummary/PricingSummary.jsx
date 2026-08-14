import React from "react";
import {
  X,
  Package,
  CheckCircle,
} from "lucide-react";
import { useBilling } from "../context/BillingContext";

// Utility formatting
const formatPrice = (price) => {
  const value = (typeof price === 'number' && isFinite(price)) ? price : 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Sub-component for a consistent pricing row
const PricingRow = ({ 
  title, 
  subtitle, 
  price, 
  isPaid, 
  onRemove, 
  showGutter = true,
  isHeaderLine = false
}) => (
  <div className={`relative flex items-start gap-4 py-2  ${showGutter ? "pr-40" : ""}`}>
    {/* Label Column */}
    <div className={`flex-1 min-w-0  ${isHeaderLine ? "" : "pt-0.5"}`}>
      <div className="flex flex-wrap items-center text-white ">
        <span className={`${isHeaderLine ? "font-semibold text-lg" : "text-lg text-gray-200"} truncate`}>
          {title}
        </span>
        {subtitle && (
          <span className="text-base text-gray-200 font-normal whitespace-nowrap">
            {subtitle}
          </span>
        )}
      </div>
    </div>

    {/* Price Column */}
    <div className="absolute right-12 top-1/2 transform -translate-y-1/2 text-right  ">
      {isPaid ? (
        <span className="flex items-center justify-end gap-1 text-green-600 text-sm sm:text-base font-medium">
          <CheckCircle className="w-4 h-4" />
          <span className="hidden sm:inline">Paid</span>
        </span>
      ) : (
        <span className="font-bold text-white text-lg whitespace-nowrap">
          {formatPrice(price)}
        </span>
      )}
    </div>

    {/* Action Column */}
    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex justify-end ">
      {onRemove && (
        <button
          onClick={onRemove}
          className=" rounded transition-colors text-white hover:text-red-500"
          aria-label="Remove item"
        >
          <X size={22} />
        </button>
      )}
    </div>
  </div>
);

const PricingSummary = () => {
  const {
    selectedPackage,
    selectedServices,
    clearPackage,
    removeService,
    totals,
    isFirstPurchase,
    packagePaid,
    parsePrice,
  } = useBilling();

  const handleCheckout = () => {
    const finalSection = document.getElementById('final-amount');
    if (finalSection) {
      finalSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const isEmpty = !selectedPackage && selectedServices.length === 0;

  return (
    <section id="pricing-summary" className=" flex items-center justify-center bg-[#151516] px-4 py-8 sm:py-12 md:py-16">
      <div className="border border-[#BE301E] w-full max-w-4xl bg-black rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl font-sans text-[#1a1a1a] animate-scale-in">
        
        {/* Header */}
        <div className=" mb-4 sm:mb-6 bg-[#19191C]  rounded-lg px-4 py-3 ">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-center text-white hero-title ">Pricing Summary</h2>
          {/* {!isEmpty && (
            <button
              onClick={resetBilling}
              className="flex items-center gap-1 text-sm sm:text-base text-gray-500 hover:text-gray-700 transition-colors"
            >
              <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )} */}
        </div>
        {/* <hr className="border-gray-100 mb-2" /> */}

        {/* Empty State */}
        {isEmpty && (
          <div className="text-center py-8 sm:py-10 md:py-12 text-gray-500">
            <Package className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-white mb-4" />
            <h3 className="text-base sm:text-lg font-semibold mb-2 text-white">No items selected</h3>
            <p className="text-white">Select a package and add services to see your summary</p>
          </div>
        )}

        {/* Selected Package */}
        {selectedPackage && (
          <div className="mb-4 animate-fade-in-up">
            <div className="flex items-center justify-between mb-3 ">
              <h3 className="font-semibold text-lg sm:text-xl text-white">Selected Package</h3>
              {/* <span className={`inline-flex items-center    gap-1.5 px-3 py-1 rounded-full text-base text-white ${
                selectedPackage.selectedPlanType === "month" ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-green-50 text-green-700 border-green-200"
              } border`}>
                {selectedPackage.selectedPlanType === "month" ? <>Month Plan</> : <>One-time</>}
              </span> */}
            </div>
            <PricingRow 
              title={selectedPackage.description}
              subtitle={selectedPackage.selectedPlanType === "month" ? "(mo)" : "(one-time)"}
              price={selectedPackage.selectedPlanType === "month" ? (selectedPackage.pricing?.["month"] ?? Math.round((selectedPackage.pricing?.lifetime ?? selectedPackage.price) / 6)) : (selectedPackage.pricing?.lifetime ?? selectedPackage.price)}
              isPaid={packagePaid}
              onRemove={!packagePaid ? clearPackage : null}
            />
          </div>
        )}

        {/* Selected Add-ons */}
        {selectedServices.length > 0 && (
          <div className="mb-6 animate-fade-in-up  ">
            <h3 className="font-semibold text-lg sm:text-xl mb-3 text-white">Selected Add-ons</h3>
            <div 
              className="  "
              style={{ scrollbarGutter: 'stable' }}
            >
              {selectedServices.map((service) => (
                <PricingRow 
                  key={service.id}
                  title={service.title}
                  subtitle={service.paymentType === "one-time" ? "(one-time)" : "(mo)"}
                  price={parsePrice(service.price) * service.quantity}
                  onRemove={() => removeService(service.id)}
                />
              ))}
            </div>
          </div>
        )}
{/* 
        {!isEmpty && <hr className="border-gray-200 mb-4" />} */}

        {/* Totals section */}
        {!isEmpty && (
          <div className="space-y-1 animate-fade-in-up delay-200 ">
            {totals.oneTimeTotal > 0 && (
              <PricingRow 
                title="One-Time Total"
                price={totals.oneTimeTotal}
                isHeaderLine={true}
              />
            )}
            {totals.monthlyTotal > 0 && (
              <PricingRow 
                title="Monthly Total"
                price={totals.monthlyTotal}
                isHeaderLine={true}
              />
            )}
            
            {/* <hr className="border-gray-200 my-4" /> */}

            {/* Final Price Line */}
            <div className="flex justify-between items-end py-2 ">
              <span className="font-bold text-base md:text-lg text-white">
                {isFirstPurchase ? "Final Total Price" : "Monthly Payment"}
              </span>
              <div className="flex items-center gap-4 shrink-0">
                <span className="text-xl sm:text-3xl font-bold text-white">
                  {formatPrice(isFirstPurchase ? totals.firstCheckoutTotal : totals.recurringTotal)}
                </span>
                <div className="w-6 sm:w-7 shrink-0" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 space-y-4">
              <button
                onClick={handleCheckout}
                className="w-full py-3 sm:py-4 rounded-xl font-bold text-base tracking-wide transition-all bg-[#BE301E] text-white  active:scale-[0.98] shadow-lg"
              >
                Click to Sign
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PricingSummary;
