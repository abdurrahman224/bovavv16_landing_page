// import heroimg from '/Heroimg3.jpg';
// import { useLandingPage } from '../context/LandingPageContext';

// const Hero = () => {
//   const { hasDynamicData, companyName, date } = useLandingPage();

//   // Format date if available
//   const formatDate = (dateString) => {
//     if (!dateString) return null;
//     const d = new Date(dateString);
//     const day = String(d.getDate()).padStart(2, '0');
//     const month = String(d.getMonth() + 1).padStart(2, '0');
//     const year = d.getFullYear();
//     return `${day}-${month}-${year}`;
//   };

//   const displayCompanyName = hasDynamicData && companyName ? companyName : 'XYZ Company';
//   const displayDate = hasDynamicData && date ? formatDate(date) : '02-12-2025';

//   return (
//     <section className="relative w-full bg-white font-sans overflow-hidden">
//       {/* Top White Content */}
//       <div className="relative z-20 px-4 sm:px-6 md:px-16 pt-12 sm:pt-16 md:pt-24 container mx-auto px-4">
//         <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#1a1a1a] leading-tight animate-fade-in-up">
//           SEO & Growth Proposal <br className="hidden sm:block" />
//           <span className="sm:hidden"> </span>for Acme Corp
//         </h1>

//         <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-gray-800 max-w-2xl animate-fade-in-up delay-100">
//           Data-driven strategy tailored to outperform your competitors.
//         </p>

//         <div className="mt-6 sm:mt-8 md:mt-10 animate-fade-in-up delay-200">
//           <p className="text-gray-600 text-base font-bold">
//             Prepared for:
//           </p>
//           <p className="text-xl sm:text-2xl md:text-3xl font-bold text-black mt-1 sm:mt-2">
//             {displayCompanyName}
//           </p>
//           {displayDate && (
//             <p className="text-gray-600 text-sm sm:text-base mt-1 font-medium">
//               {displayDate}
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Diagonal Image Section */}
//       <div className="relative -top-10 sm:-top-14 md:-top-19">
//         {/* Image */}
//         <div
//           className="relative w-full h-[250px] sm:h-[400px] md:h-[600px] lg:h-[830px] overflow-hidden animate-fade-in delay-300"
//           style={{
//             clipPath: 'polygon(0 34%, 100% 2%, 100% 100%, 0 100%)',
//           }}
//         >
//           <img
//             src={heroimg}
//             alt="Team meeting"
//             className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
//           />
//         </div>

//         {/* Black overlay slice */}
//         <div
//           className="absolute -top-2 md:top-0 left-0 w-full h-[200px] sm:h-[250px] md:h-[309px] bg-black"
//           style={{
//             clipPath: 'polygon(0 48%, 100% 4%, 100% 6%, 0 93%)',
//           }}
//         />
//       </div>
//     </section>
//   );
// };

// export default Hero;



import React from 'react';
import { useLandingPage } from '../context/LandingPageContext';

const Hero = () => {




  const { hasDynamicData, companyName, date } = useLandingPage() || {};

  // Format date if available
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const d = new Date(dateString);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const displayCompanyName = hasDynamicData && companyName ? companyName : 'XYZ Company';
  const displayDate = hasDynamicData && date ? formatDate(date) : '02-12-2025';

  const heroImageUrl = '/Heroimg.png'; // fallback public image

  return (
    <section className="container mx-auto px-4">
      {/* Main container (container mx-auto px-4) with the thin orange/red border */}
      <div className="overflow-hidden bg-black border border-[#c23A22] rounded-xl">
        <div className=" ">
          <div className="text-center py-12  px-2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-[62.52px] font-semibold hero-title text-white tracking-tight xl:tracking-wide mb-4">
              SEO & GROWTH PROPOSAL FOR ACME CORP
            </h1>
            <p className="text-sm md:text-base text-gray-200 font-light">
              Data-driven strategy tailored to outperform your competitors.
            </p>
          </div>

          {/* Middle Section: The Red Bar */}
          <div className=" border-[#C23A22] bg-[#C23A22] py-3 sm:py-6  flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
            <p className="text-gray-300 text-sm md:text-lg">Prepared for:</p>
            <div className="flex items-center gap-3">
              <h2 className="text-white text-xl md:text-2xl font-bold">
                {displayCompanyName}
              </h2>
              <span className="text-gray-400 text-sm md:text-lg">
                {displayDate}
              </span>
            </div>
          </div>

          {/* Bottom Section: Image */}
          <div className="w-full h-70 sm:h-75 md:h-95 rounded-xl bg-[#0f0f0f]">
            <img
              src={heroImageUrl}
              alt="Team working on laptops"
              className="w-full h-full object-cover"
              width={1600}
              height={950}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              style={{ backgroundColor: '#0f0f0f' }}
            />
          </div>
        </div>
        {/* Top Section: Title & Subtitle */}
      </div>
    </section>
  );
};

export default Hero;