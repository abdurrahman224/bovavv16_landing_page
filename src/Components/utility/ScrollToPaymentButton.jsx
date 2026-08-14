import React, { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { useBilling } from '../../context/BillingContext';

const ScrollToPaymentButton = () => {
  const { totals } = useBilling();
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolledToPayment, setHasScrolledToPayment] = useState(false);

  useEffect(() => {
    // Show button when user has selected services and hasn't scrolled to payment yet
    if (totals.servicesCount > 0 && !hasScrolledToPayment) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    // Hide button when user scrolls near the payment section
    const handleScroll = () => {
      const pricingSummarySection = document.querySelector('#pricing-summary');
      if (pricingSummarySection) {
        const rect = pricingSummarySection.getBoundingClientRect();
        if (rect.top <= window.innerHeight) {
          setHasScrolledToPayment(true);
          setIsVisible(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [totals.servicesCount, hasScrolledToPayment]);

  // Reset when services count changes
  useEffect(() => {
    if (totals.servicesCount === 0) {
      setHasScrolledToPayment(false);
    }
  }, [totals.servicesCount]);

  const scrollToPayment = () => {
    if (window.lenis?.scrollTo) {
      window.lenis.scrollTo('#pricing-summary', { offset: -80 });
    } else {
      const element = document.querySelector('#pricing-summary');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setHasScrolledToPayment(true);
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToPayment}
          className="fixed bottom-20 left-8 z-50 bg-black hover:bg-gray-800 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-2xl animate-bounce flex items-center gap-2"
          aria-label="Scroll to payment"
        >
          <span className="font-semibold text-sm">Checkout</span>
          <ArrowDown size={20} />
        </button>
      )}
    </>
  );
};

export default ScrollToPaymentButton;
