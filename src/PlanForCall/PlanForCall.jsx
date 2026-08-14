// import { useState } from "react";
// import { ChevronDown } from "lucide-react";

// export default function PlanForCall() {
//   const [openIndex, setOpenIndex] = useState(null);

//   const sections = [
//     {
//       number: "01",
//       title: "Competitor Analysis",
//       subtitle: "Market landscape overview",
//       questions: [
//         "A competitor analysis, also referred to as a competitive analysis, is the process of identifying competitors in your industry and researching their different marketing strategies. You can use this information as a point of comparison to identify your company's strengths and weaknesses relative to each competitor.",
//       ],
//     },
//     {
//       number: "02",
//       title: "Gap Analysis",
//       subtitle: "Links, pages, and content gaps",
//       questions: [
//         "A gap analysis helps a company assess its current state—by measuring time, money, and labor—and compare it with its target state.",
//       ],
//     },
//     {
//       number: "03",
//       title: "Technical SEO",
//       subtitle: "Site health assessment",
//       questions: [
//         "Technical SEO refers to the behind-the-scenes elements that influence how search engines interact with a website.",
//       ],
//     },
//     {
//       number: "04",
//       title: "Recommendations",
//       subtitle: "Strategic action plan",
//       questions: [
//         "The recommendations of a person or a committee are their suggestions or advice on what is the best thing to do.",
//       ],
//     },
//     {
//       number: "05",
//       title: "Pricing",
//       subtitle: "Packages and add-ons",
//       questions: [
//         "Pricing is the process of determining what a company will receive in exchange for a product or service.",
//       ],
//     },
//   ];

//   return (
//     <div className="bg-neutral-900 py-8 sm:py-12 md:py-16 ">
//       <div className="container">
//         <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-8 sm:mb-10 md:mb-12 animate-fade-in-up">
//           Plan For The Call
//         </h1>

//         <div className="space-y-2 sm:space-y-3   cursor-pointer">
//           {sections.map((section, index) => {
//             const isOpen = openIndex === index;

//             return (
//               <div
//                 key={index}
//                 className="overflow-hidden border-b-2 border-neutral-700 animate-fade-in-up "
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 {/* Header */}
//                 <button
//                   onClick={() =>
//                     setOpenIndex(isOpen ? null : index)
//                   }
//                   className="w-full p-4 sm:p-5 md:p-6 flex cursor-pointer items-center justify-between text-left hover:bg-neutral-800 transition-colors duration-300"
//                 >
//                   <div className="flex items-center gap-3 sm:gap-4 md:gap-6 ">
//                     <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-neutral-700 flex items-center justify-center shrink-0">
//                       <span className="text-neutral-300 font-semibold text-base">
//                         {section.number}
//                       </span>
//                     </div>

//                     <div>
//                       <h2 className="text-white font-bold text-base sm:text-lg">
//                         {section.title}
//                       </h2>
//                       <p className="text-neutral-200 text-base mt-0.5 sm:mt-1">
//                         {section.subtitle}
//                       </p>
//                     </div>

             
//                   </div>
//                        <ChevronDown
//                     size={20}
//                     className={`text-neutral-100 transition-transform duration-300 shrink-0 sm:w-6 sm:h-6 ${
//                       isOpen ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>

//                 {/* Animated Content */}
//                 <div
//                   className={`bg-neutral-900 overflow-hidden transition-all duration-500 ease-in-out
//                     ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
//                   `}
//                 >
//                   <div className="p-4 sm:p-5 md:p-6">
//                     <ul className="space-y-2 sm:space-y-3 list-disc list-inside">
//                       {section.questions.map((question, qIndex) => (
//                         <li
//                           key={qIndex}
//                           className="text-neutral-100 text-base leading-relaxed"
//                         >
//                           {question}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }




import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useGlobalSettings } from "../context/GlobalSettingsContext";

export default function PlanForCall() {
  const [openIndex, setOpenIndex] = useState(null);
  const { planForCallItems, loading } = useGlobalSettings();

  // Fallback sections if API data not loaded
  const defaultSections = [
    {
      number: "01",
      title: "Competitor Analysis",
      subtitle: "Market landscape overview",
      description: "A competitor analysis identifies competitors and researches their marketing strategies to find your strengths and weaknesses.",
    },
    {
      number: "02",
      title: "Gap Analysis",
      subtitle: "Links, pages, and content gaps",
      description: "A gap analysis assesses the current state vs. the target state by measuring time, money, and labor.",
    },
    {
      number: "03",
      title: "Technical SEO",
      subtitle: "Site health assessment",
      description: "Technical SEO refers to behind-the-scenes elements influencing search engine interaction.",
    },
    {
      number: "04",
      title: "Recommendations",
      subtitle: "Strategic action plan",
      description: "Strategic suggestions or advice on the best course of action based on the gathered data.",
    },
    {
      number: "05",
      title: "Pricing",
      subtitle: "Packages and add-ons",
      description: "The process of determining value exchange for products or services.",
    },
  ];

  const sections = planForCallItems.length > 0 ? planForCallItems : defaultSections;

  return (
    <div className="container mx-auto  section-gap ">
      <div className="">
        {/* Header Section */}
        <div className="text-center mb-6 lg:mb-12">
          <h1 className="text-white text-3xl md:text-5xl font-bold uppercase hero-title">
            Plan For The Call
          </h1>
        </div>

        {/* Flexbox Layout: 2 independent columns */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-4">
          {/* Left Column */}
          <div className="flex-1 space-y-3">
            {sections.filter((_, index) => index % 2 === 0).map((section, originalIndex) => {
              const realIndex = originalIndex * 2;
              const isOpen = openIndex === realIndex;

              return (
                <div
                  key={realIndex}
                  className="bg-[#121212] rounded-xl border border-zinc-800 transition-all duration-300 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : realIndex)}
                    className="w-full p-4 lg:p-6 flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-3 lg:gap-5">
                      {/* The Red Circle Number */}
                      <div className="w-10 h-10 rounded-full bg-[#E53935] flex items-center justify-center shrink-0">
                        <span className="text-white font-bold text-base">
                          {section.number}
                        </span>
                      </div>

                      <div>
                        <h2 className="text-white font-bold text-lg">
                          {section.title}
                        </h2>
                        <p className="text-[#9F9F9F] text-base mt-1">
                          {section.subtitle}
                        </p>
                      </div>
                    </div>

                    <ChevronDown
                      size={26}
                      className={`text-[#FFFFFF] transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Dropdown Content */}
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-[#9F9F9F] text-base leading-relaxed border-t border-zinc-800 pt-4">
                        {section.description || section.questions?.[0]}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="flex-1 space-y-3">
            {sections.filter((_, index) => index % 2 === 1).map((section, originalIndex) => {
              const realIndex = (originalIndex * 2) + 1;
              const isOpen = openIndex === realIndex;

              return (
                <div
                  key={realIndex}
                  className="bg-[#121212] rounded-xl border border-zinc-800 transition-all duration-300 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : realIndex)}
                    className="w-full p-4 lg:p-6 flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-3 lg:gap-5">
                      {/* The Red Circle Number */}
                      <div className="w-10 h-10 rounded-full bg-[#E53935] flex items-center justify-center shrink-0">
                        <span className="text-white font-bold text-base">
                          {section.number}
                        </span>
                      </div>

                      <div>
                        <h2 className="text-white font-bold text-lg">
                          {section.title}
                        </h2>
                        <p className="text-[#9F9F9F] text-base mt-1">
                          {section.subtitle}
                        </p>
                      </div>
                    </div>

                    <ChevronDown
                      size={26}
                      className={`text-[#FFFFFF] transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Dropdown Content */}
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-[#9F9F9F] text-base leading-relaxed border-t border-zinc-800 pt-4">
                        {section.description || section.questions?.[0]}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}