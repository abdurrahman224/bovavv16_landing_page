import React from 'react';

const EnhancePackage = () => {
  return (
    <section className="bg-black  flex flex-col items-center justify-center text-center pb-6 sm:pb-10">
      <div className="container mx-auto animate-fade-in-up xl:border border-[#BE301E] lg:rounded-xl px-6 sm:px-8 py-10 sm:py-12 ">
        {/* Main Heading */}
        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 tracking-tight">
          Enhance Your Package
        </h2>

        {/* Description Text */}
        <p className="text-[#cccccc] text-base sm:text-lg md:text-xl leading-relaxed font-light max-w-3xl mx-auto animate-fade-in-up delay-100">
          The following add-ons can be combined with your selected package to
          accelerate results and address specific growth opportunities
          identified in our analysis. Each module is designed to complement your
          core strategy
        </p>
      </div>
    </section>
  );
};

export default EnhancePackage;
