import React from "react";
import { Check, AlertTriangle, X } from "lucide-react";
import { useLandingPage } from "../context/LandingPageContext";

const IndicatorRow = ({ label, status }) => {
  const icons = {
    ok: <Check className="w-5 h-5 text-green-500" />,
    check: <Check className="w-5 h-5 text-green-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-yellow-400" />,
    critical: <X className="w-5 h-5 text-red-500" />,
    error: <X className="w-5 h-5 text-red-500" />,
  };

  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-300 last:border-b-0">
      <span className="text-gray-300 text-lg">{label}</span>
      {icons[status] || icons.ok}
    </div>
  );
};

export default function HealthDashboard() {
  const { hasDynamicData, getSectionData } = useLandingPage();
  const sectionData = getSectionData("technical-seo");

  // Default technical indicators
  const defaultIndicators = [
    { label: "Page speed", status: "ok" },
    { label: "Indexation", status: "ok" },
    { label: "Mobile optimization", status: "warning" },
    { label: "Core Web Vitals", status: "warning" },
    { label: "Internal linking", status: "critical" },
    { label: "Crawlability", status: "critical" },
  ];

  // Get dynamic technical indicators if available
  const apiIndicators = hasDynamicData && sectionData?.additionalData?.technicalIndicators;
  const hasApiIndicators = apiIndicators && apiIndicators.length > 0;

  // Map API indicators to component format
  const indicators = hasApiIndicators
    ? apiIndicators.map((item) => ({
        label: item.name || item.label || "",
        status: (item.value || "ok").toLowerCase(),
      }))
    : defaultIndicators;

  // Get image from API if available
  const imagePath = hasDynamicData && sectionData?.imagePath ? sectionData.imagePath : null;

  // Get key takeaway from API
  const keyTakeaway = hasDynamicData && sectionData?.keyTakeaway ? sectionData.keyTakeaway : null;
  const hasValidKeyTakeaway = keyTakeaway && keyTakeaway !== "<p><br></p>" && keyTakeaway.replace(/<[^>]*>/g, "").trim() !== "";

  // Get section title
  const sectionTitle = hasDynamicData && sectionData?.sectionTitle ? sectionData.sectionTitle : "Technical SEO Analysis";

  // Count indicators by status
  const okCount = indicators.filter((i) => i.status === "ok" || i.status === "check").length;
  const warningCount = indicators.filter((i) => i.status === "warning").length;
  const criticalCount = indicators.filter((i) => i.status === "critical" || i.status === "error").length;

  return (
    <div className="bg-[#151516] text-white py-6 sm:py-10 md:py-20 ">
      <div className="container mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="text-center mb-6 lg:mb-12">
          <span className="text-sm uppercase tracking-widest text-[#ADB5BD] mb-4 block">SUBTITLE</span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase">{sectionTitle}</h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Technical health impacts how search engines crawl, index, and rank your pages.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6 mb-6 lg:mb-12">
          {/* Overall Health Score */}
          <div className="border border-gray-500 rounded-2xl p-8 bg-[#080807]">
            <h2 className="text-2xl font-bold text-white mb-8">Overall Health Score</h2>
            {imagePath ? (
              <img src={imagePath} alt="Health Score" className="w-full h-auto object-contain block" />
            ) : (
              <>
                <div className="flex justify-center mb-4 lg:mb-8">
                  <svg viewBox="0 0 100 100" className="w-64 h-64 -rotate-90">
                    <circle cx="50" cy="50" r="42" stroke="#374151" strokeWidth="10" fill="none" />
                    <circle cx="50" cy="50" r="42" stroke="#10b981" strokeWidth="10" fill="none" strokeDasharray="75 264" strokeLinecap="round" />
                    <circle cx="50" cy="50" r="42" stroke="#fbbf24" strokeWidth="10" fill="none" strokeDasharray="50 264" strokeDashoffset="-75" strokeLinecap="round" />
                    <circle cx="50" cy="50" r="42" stroke="#ef4444" strokeWidth="10" fill="none" strokeDasharray="50 264" strokeDashoffset="-125" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="flex flex-wrap justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2"><span className="w-3 h-3 bg-green-500 rounded"></span><span className="text-gray-300">{okCount} OK</span></div>
                  <div className="flex items-center gap-2"><span className="w-3 h-3 bg-yellow-400 rounded"></span><span className="text-gray-300">{warningCount} Needs attention</span></div>
                  <div className="flex items-center gap-2"><span className="w-3 h-3 bg-red-500 rounded"></span><span className="text-gray-300">{criticalCount} Critical issues</span></div>
                </div>
              </>
            )}
          </div>

          {/* Technical Indicators */}
          <div className="border border-gray-500 rounded-2xl p-8 bg-[#080807]">
            <h2 className="text-2xl font-bold text-white mb-4 lg:mb-8">Technical Indicators</h2>
            <div>
              {indicators.map((indicator, index) => (
                <IndicatorRow key={index} label={indicator.label} status={indicator.status} />
              ))}
            </div>
          </div>
        </div>

        {/* Callout */}
        <p className="text-center text-white italic text-base sm:text-lg py-6 md:py-10">
          Technical limitations reduce search visibility and must be addressed continuously.
        </p>

        {/* Key Takeaway Section */}
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-black text-white mb-4 lg:mb-8">Key takeaway</h2>
          {hasValidKeyTakeaway ? (
            <div
              className="text-base text-gray-300 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mb-3 [&_h4]:text-lg [&_h4]:font-bold [&_h4]:mb-3 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:text-left [&_ul]:max-w-3xl [&_ul]:mx-auto [&_li]:mb-2"
              dangerouslySetInnerHTML={{ __html: keyTakeaway }}
            />
          ) : (
            <div className="space-y-4 lg:space-y-8 max-w-6xl mx-auto">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Client (Great Lakes Electric):</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Maintains a balanced mix of city, landing, and SEO pages, reflecting a stable content strategy.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Competitors:</h3>
                <ul className="space-y-4 text-gray-300 text-lg">
                  <li><span className="text-white font-bold"></span> <strong className="text-white">Competitor 1</strong> mostly landing pages with limited local SEO depth.</li>
                  <li><span className="text-white font-bold"></span> <strong className="text-white">Competitor 2</strong> minimal page coverage across all categories.</li>
                  <li><span className="text-white font-bold"></span> <strong className="text-white">Competitor 3</strong> strong city + SEO structure giving a local SEO advantage.</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
