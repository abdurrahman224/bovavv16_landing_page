import React, { useState, useEffect } from 'react';

const ScrollToSignButton = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const checkVisibility = () => {
      const finalSection = document.getElementById('final-amount');
      if (!finalSection) return;

      const rect = finalSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Hide button when final-amount section is visible on screen
      const isNearFinal = rect.top < windowHeight && rect.bottom > 0;
      setIsVisible(!isNearFinal);
    };

    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Check initial state

    return () => window.removeEventListener('scroll', checkVisibility);
  }, []);

  const scrollToSign = () => {
    const signSection = document.getElementById('final-amount');
    if (signSection) {
      signSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToSign}
      className="fixed top-4 right-4 z-40 bg-[#be301e] text-xs sm:text-sm lg:text-base text-white px-3 sm:px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-black transition-all active:scale-95 animate-fade-in cursor-pointer"
      aria-label="Scroll to sign"
    >
      Click to Sign this Proposal
    </button>
  );
};

export default ScrollToSignButton;
