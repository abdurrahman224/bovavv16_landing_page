import React from 'react';
import { useLandingPage } from '../context/LandingPageContext';

const CompetitiveAnalysis = () => {
  const { hasDynamicData, getSectionData } = useLandingPage();
  const sectionData = getSectionData('traffic-share');

  // Default stats
  const defaultStats = [
    {
      label: "Average Competitor Traffic",
      value: "33,250",
      subtext: "Monthly visitors",
    },
    {
      label: "Your Traffic",
      value: "8,500",
      subtext: "Monthly visitors",
    },
    {
      label: "Traffic Gap",
      value: "24,750",
      subtext: "Visitors to close",
    },
    {
      label: "Market Share Opportunity",
      value: "74%",
      subtext: "Potential growth",
    },
  ];

  // Get dynamic competitive findings if available
  const competitiveFindings = hasDynamicData && sectionData?.additionalData?.competitiveFindings;
  const hasCompetitiveFindings = competitiveFindings && competitiveFindings.length > 0;

  // Use dynamic data if available, otherwise use defaults
  const stats = hasCompetitiveFindings 
    ? competitiveFindings.map(item => ({
        label: item.title || '',
        value: typeof item.value === 'number' ? item.value.toLocaleString() : (item.value || ''),
        subtext: item.description || '',
      }))
    : defaultStats;

  // --- LOGIC START ---
  // If we have fewer than 4 items, use Flex to center them.
  const isLowData = stats.length < 4;

  const containerClass = isLowData
    ? "flex flex-wrap justify-center gap-3 md:gap-6 mb-5 sm:mb-10"
    : "grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 mb-5 sm:mb-10";

  // Precise Width Calculations to match Grid Columns exactly:
  // SM (2 cols, gap-3/12px): (100% - 12px) / 2  = calc(50% - 6px)
  // MD (3 cols, gap-6/24px): (100% - 48px) / 3  = calc(33.333% - 16px)
  // LG (4 cols, gap-6/24px): (100% - 72px) / 4  = calc(25% - 18px)
  const itemClass = isLowData 
    ? "w-full sm:w-[calc(50%-6px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)]" 
    : "";
  // --- LOGIC END ---

  return (
    <div className="bg-white font-sans">
      <div className="container mx-auto px-6 sm:px-8">
        {/* Title Section */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-10 md:mb-12 tracking-tight text-center hero-title">
          COMPETITIVE ANALYSIS FINDINGS
        </h2>

        {/* Stats Grid/Flex */}
        <div className={containerClass}>
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`bg-black rounded-xl px-8 py-6 lg:py-8 hover:bg-gray-950 transition-colors duration-300 ${itemClass}`}
            >
              <span className="text-[#9F9F9F] text-base font-medium block mb-1.5 lg:mb-3">
                {stat.label}
              </span>
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold block mb-1 lg:mb-2 text-white">
                {stat.value}
              </span>
              <span className="text-[#9F9F9F] text-base font-medium">
                {stat.subtext}
              </span>
            </div>
          ))}
        </div>

        {/* Description Section */}
        <p className="text-[#151515] text-base lg:text-lg leading-tight lg:leading-relaxed text-center w-4/6 mx-auto pb-5 sm:pb-10 md:pb-16">
          We analyzed the top competitors dominating your niche across traffic, visibility, and growth potential. The comparison below highlights where opportunities and threats currently exist.
        </p>
      </div>
    </div>
  );
};

export default CompetitiveAnalysis;