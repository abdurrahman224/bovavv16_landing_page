// import React from "react";

// export default function TeamAndClients() {
//   return (
//     <div className="bg-white pb-6 sm:pb-8 md:pb-10">
//       <div className="container px-4 sm:px-6">

//         {/* Top Header Section */}
//        <div className="mx-4 grid grid-cols-2 sm:grid-cols-4 items-center mb-6 sm:mb-8 pb-2 animate-fade-in-up max-w-7xl">

//   {/* Left: Line + 01 */}
//   <div className="flex items-center gap-3 sm:gap-4 col-span-1 sm:col-span-2 justify-self-start">
//     <div className="w-10 sm:w-12 h-px bg-gray-400"></div>
//     <span className="text-xl sm:text-2xl font-semibold text-gray-400">
//       01
//     </span>
//   </div>

//   {/* Center: Our Clients */}
//   <h2 className="col-span-1 sm:col-span-2 text-center sm:text-center hidden sm:block text-xl sm:text-2xl font-bold text-gray-900">
//     Our Clients
//   </h2>

// </div>

//         {/* Main Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 md:gap-12 items-stretch">

//           {/* Left Side: Text and Partnerships (60% width roughly) */}
//           <div className="lg:col-span-7 flex flex-col h-full animate-fade-in-left delay-100">
//             <h2 className="text-2xl sm:text-3xl  font-bold text-gray-900 mb-4 sm:mb-6">Our Team</h2>

//             <div className="space-y-3 sm:space-y-4 text-gray-700 text-base sm:text-[1.15rem] leading-snug mb-8 sm:mb-10 md:mb-12 max-w-2xl grow">
//               <p>
//                 At ARMA, we help contractors focus their marketing on their best
//                 customers and take action on their behalf to help them rank
//                 higher on Google so when customers are actually looking for
//                 them, they show up.
//               </p>
//               <p>
//                 Guided by a team of Google specialized professionals taking
//                 vigorous monthly action on your behalf, you can save time
//                 and can feel confident like the smart business leader you are.
//               </p>
//             </div>

//             <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Partnership:</h3>

//             {/* Partnership Card */}
//             <div className="border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 bg-white grow flex items-center justify-center card-hover transition-smooth">
//               <img
//                 src="/partnership.webp"
//                 alt="Partnership Logos"
//                 className="w-full h-auto object-contain"
//               />
//             </div>
//           </div>

//           {/* Right Side: Clients Grid (40% width roughly) */}
//           <h2 className="md:hidden text-xl sm:text-2xl font-bold text-gray-900 animate-fade-in-up">Our Clients</h2>
//           <div className="lg:col-span-5 flex flex-col h-full animate-fade-in-right delay-200">
//             {/* The title "Our Clients" is already in the top header per image layout */}

//             <div className="border border-gray-200 rounded-lg p-6 sm:p-8 md:p-10 bg-white grow flex items-center justify-center card-hover transition-smooth">
//               <img
//                 src="/our-clients.web.webp"
//                 alt="Client Logos Grid"
//                 className="w-full h-auto object-contain"
//               />
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

import { useGlobalSettings } from "../context/GlobalSettingsContext";

export default function TeamAndClients() {
  const { 
    clientLogos, 
    partnershipLogos, 
    teamContent, 
    loading 
  } = useGlobalSettings();

  // Fallback values if settings not loaded
  const defaultTeamContent = {
    subtitle: 'ARMA',
    title: 'OUR TEAM',
    paragraph1: 'At ARMA, we help contractors focus their marketing on their best customers and take action on their behalf to help them rank higher on Google so when customers are actually looking for them, they show up.',
    paragraph2: 'Guided by a team of Google specialized professionals taking vigorous monthly action on your behalf, you can save time and can feel confident like the smart business leader you are.'
  };

  const team = teamContent || defaultTeamContent;
  const partnerships = partnershipLogos.length > 0 ? partnershipLogos : [
    { name: "Meta", src: "/Image/Meta.png" },
    { name: "YouTube", src: "/Image/YouTube.png" },
    { name: "Google Partner", src: "/Image/GooglePartner.png" },
    { name: "Microsoft", src: "/Image/Microsoft.png" },
    { name: "Housecall Pro", src: "/Image/HousecallPro.png" },
    { name: "Thumbtack", src: "/Image/Thumbtack.png" },
  ];
  const clients = clientLogos.length > 0 ? clientLogos : [];

  return (
    <div className="container mx-auto px-4 mt-10 sm:mt-12 md:mt-16">
      <div className="bg-white rounded-xl lg:rounded-2xl overflow-hidden p-4 sm:p-6 md:p-8 pb-8 sm:pb-12 md:pb-16">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8 items-start">
          {/* Left Side: Text and Partnerships */}
          <div className="lg:col-span-6 flex flex-col animate-fade-in-left delay-100">
            {/* Team Section */}
            <div className="bg-[#1a1a1a] rounded-xl px-6 sm:px-10 py-8 sm:py-14 md:py-16 space-y-4 sm:space-y-6 text-white mb-8 sm:mb-12">
              <p className="text-[#ADB5BD] text-sm sm:text-base">{team.subtitle}</p>
              <h2 className="text-white hero-title uppercase text-4xl" style={{fontWeight: 700, fontSize: '39px', lineHeight: '48px'}}>
                {team.title}
              </h2>
              <p className="text-[#989898] text-base sm:text-lg leading-relaxed">
                {team.paragraph1}
              </p>
              <p className="text-[#989898] text-base sm:text-lg leading-relaxed">
                {team.paragraph2}
              </p>
            </div>

            {/* Partnership Section */}
            <div className="rounded-xl px-6 sm:px-8 py-6 sm:py-10 bg-[#f5f5f5]">
              <h3 className="text-gray-900 mb-6 sm:mb-10 hero-title uppercase" style={{fontWeight: 400, fontSize: '30px', lineHeight: '48px'}}>
                PARTNERSHIP:
              </h3>
              <div className="grid grid-cols-3 gap-8 sm:gap-8 items-center justify-items-center">
                {partnerships.map((partner, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-center w-full"
                  >
                    <img
                      src={partner.src}
                      alt={partner.name}
                      className="h-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Clients Grid */}
          <div className="lg:col-span-6 flex flex-col animate-fade-in-right delay-200">
            <h2 className="text-gray-900 mb-6 hero-title uppercase" style={{fontWeight: 400, fontSize: '30px', lineHeight: '48px'}}>
              OUR CLIENTS:
            </h2>

            <div className="grid grid-cols-3 gap-8 sm:gap-8">
              {clients.map((client, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center"
                >
                  <img
                    src={client.src}
                    alt={client.name}
                    className="h-10 sm:h-14 md:h-16 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
