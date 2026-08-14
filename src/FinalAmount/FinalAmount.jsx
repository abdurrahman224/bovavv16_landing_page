import React, { useState, useRef } from "react";
import { useBilling } from "../context/BillingContext";
import { X, RotateCcw, Check, Pen, Loader2 } from "lucide-react";
import SignatureCanvas from "react-signature-canvas";

// Utility formatting
const formatPrice = (price) => {
  const value = typeof price === "number" && isFinite(price) ? price : 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const FinalAmount = () => {
  const { selectedPackage, selectedServices, totals, isFirstPurchase } =
    useBilling();

  const [showModal, setShowModal] = useState(false);
  const [clientName, setClientName] = useState("");
  const [isSignatureEmpty, setIsSignatureEmpty] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState(null);
  const sigCanvas = useRef(null);

  const isEmpty = !selectedPackage && selectedServices.length === 0;

  // Determine billing label
  const billingLabel = totals.is6MonthPlan ? "/Per Month" : "One Time";
  const displayPrice = totals.firstCheckoutTotal;

  const handleOpenModal = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
      setIsSignatureEmpty(true);
    }
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setClientName("");
    setIsSignatureEmpty(true);
    setCheckoutStatus(null);
  };

  const handleClearSignature = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
      setIsSignatureEmpty(true);
    }
  };

  const handleSignatureBegin = () => {
    setIsSignatureEmpty(false);
  };

  const handlePayment = async () => {
    if (!clientName.trim()) {
      setCheckoutStatus({ success: false, message: "Please enter your name" });
      return;
    }

    if (isSignatureEmpty || !sigCanvas.current) {
      setCheckoutStatus({
        success: false,
        message: "Please sign before proceeding",
      });
      return;
    }

    const signature = sigCanvas.current.toDataURL();

    const apiBase = import.meta.env.VITE_API_BASE_URL;
    if (!apiBase) {
      setCheckoutStatus({
        success: false,
        message: "Payment API URL not configured (VITE_API_BASE_URL).",
      });
      return;
    }

    setIsLoading(true);

    try {
      let description = "";
      if (selectedPackage) {
        description += `Package: ${selectedPackage.name}\n${selectedPackage.description}\n\n`;
      }
      const servicesArray = Array.from(selectedServices.values());
      if (servicesArray.length > 0) {
        description += "Add-ons:\n";
        servicesArray.forEach((service) => {
          description += `- ${service.title}${service.quantity > 1 ? ` (x${service.quantity})` : ""}\n`;
        });
      }

      const payload = {
        clientName: clientName.trim(),
        title: selectedPackage
          ? selectedPackage.name
          : "Custom Services Package",
        description: description.trim(),
        onetimePayment: totals.oneTimeTotal,
        subscriptionPayment: totals.monthlyTotal,
        paymentType: "monthly",
        signature: signature,
      };

      const response = await fetch(`${apiBase}/api/create-payment-link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success && data.paymentLink) {
        window.location.href = data.paymentLink;
      } else {
        setCheckoutStatus({
          success: false,
          message: "Failed to create payment link",
        });
        setIsLoading(false);
        setShowModal(false);
      }
    } catch (error) {
      console.error("Payment error:", error);
      setCheckoutStatus({
        success: false,
        message: "An error occurred. Please try again.",
      });
      setIsLoading(false);
      setShowModal(false);
    }
  };

  return (
    <>
      <section
        id="final-amount"
        className="bg-black section-gap flex items-center justify-center relative overflow-hidden"
      >
        {/* Horizontal dark strip behind the circle */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-32 sm:h-40 md:h-48 lg:h-56 bg-[#1a1a1a]" />

        <div className="container mx-auto px-4 flex flex-col items-center relative z-10">
          {/* Red Circle */}
          <div className="relative flex flex-col items-center justify-center w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-112.5 lg:h-112.5 rounded-full bg-[#C23A22] shadow-2xl px-8 py-6">
            <span className="text-white text-sm sm:text-base font-medium tracking-wide mb-2">
              Final Amount
            </span>
            <span className="text-white text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-5">
              {formatPrice(displayPrice)}
            </span>
            {/* <span className="text-white/80 text-xs sm:text-sm mb-4">
              {billingLabel}
            </span> */}

            {/* Pricing Breakdown */}
            {!isEmpty && (
              <div className="w-full max-w-xs space-y-1.5 mb-4">
                {totals.oneTimeTotal > 0 && (
                  <div className="flex items-center justify-between text-white/90 text-xs sm:text-sm">
                    <span>One-Time Total</span>
                    <span className="font-semibold">
                      {formatPrice(totals.oneTimeTotal)}
                    </span>
                  </div>
                )}
                {totals.monthlyTotal > 0 && (
                  <div className="flex items-center justify-between text-white/90 text-xs sm:text-sm">
                    <span>Monthly Total</span>
                    <span className="font-semibold">
                      {formatPrice(totals.monthlyTotal)}
                    </span>
                  </div>
                )}
                {(totals.oneTimeTotal > 0 || totals.monthlyTotal > 0) && (
                  <div className="border-t border-white/30 pt-1.5 mt-2">
                    <div className="flex items-center justify-between text-white text-sm sm:text-base">
                      <span className="font-bold">Total</span>
                      <span className="font-bold">
                        {formatPrice(displayPrice)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Sign Proposal Button inside circle */}
            <button
              onClick={handleOpenModal}
              disabled={isEmpty}
              className="mt-2 px-6 py-2 bg-white text-[#1a1a1a] font-semibold rounded-lg shadow hover:bg-gray-100 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              Sign Proposal
            </button>
          </div>
        </div>
      </section>

      {/* Signature Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-2xl shadow-2xl animate-scale-in">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Sign Agreement
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Please enter your name and sign below
                </p>
              </div>
              <button
                onClick={handleModalClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                disabled={isLoading}
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Client Name Input */}
            <div className="mb-4">
              <label
                htmlFor="clientName"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Your Name
              </label>
              <input
                id="clientName"
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Enter your full name"
                disabled={isLoading}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none transition-colors"
              />
            </div>

            {/* Agreement Text */}
            {clientName && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  I,{" "}
                  <span className="font-semibold text-gray-900">
                    {clientName}
                  </span>
                  , agree to the terms and conditions
                </p>
              </div>
            )}

            {/* Signature Canvas */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Signature
              </label>
              <div className="relative">
                <div className="border-2 border-gray-300 rounded-xl overflow-hidden bg-white">
                  <SignatureCanvas
                    ref={sigCanvas}
                    canvasProps={{
                      className: "w-full h-48 touch-none",
                    }}
                    onBegin={handleSignatureBegin}
                  />
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-2 text-gray-400 pointer-events-none">
                  <Pen className="w-4 h-4" />
                  <span className="text-sm">Sign here</span>
                </div>
              </div>
              <button
                onClick={handleClearSignature}
                className="mt-2 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                type="button"
              >
                <RotateCcw className="w-3 h-3" />
                Clear Signature
              </button>
            </div>

            {/* Price Summary */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
              {selectedPackage && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Package ({selectedPackage.selectedPlanType})
                  </span>
                  <span className="font-semibold">
                    {formatPrice(selectedPackage.price)}
                  </span>
                </div>
              )}
              {totals.servicesOneTime > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">One-Time Add-ons</span>
                  <span className="font-semibold">
                    {formatPrice(totals.servicesOneTime)}
                  </span>
                </div>
              )}
              {totals.monthlyTotal > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Monthly Add-ons</span>
                  <span className="font-semibold">
                    {formatPrice(totals.monthlyTotal)}/mo
                  </span>
                </div>
              )}
              <hr className="border-gray-200" />
              <div className="flex justify-between items-center pt-1">
                <span className="font-bold">Total Due</span>
                <span className="text-xl font-bold">
                  {formatPrice(
                    isFirstPurchase
                      ? totals.firstCheckoutTotal
                      : totals.recurringTotal,
                  )}
                </span>
              </div>
            </div>

            {/* Error Message */}
            {checkoutStatus && !checkoutStatus.success && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {checkoutStatus.message}
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handlePayment}
              disabled={isLoading || !clientName.trim() || isSignatureEmpty}
              className={`w-full py-3 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${
                isLoading || !clientName.trim() || isSignatureEmpty
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#1a1a1a] hover:bg-black active:scale-[0.98]"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </span>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  Pay Now
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FinalAmount;
