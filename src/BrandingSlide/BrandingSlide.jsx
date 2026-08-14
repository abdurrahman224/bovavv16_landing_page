import React from "react";
import { useLandingPage } from "../context/LandingPageContext";

const BrandingSlide = () => {
  const { hasDynamicData, getSectionData } = useLandingPage();
  const sectionData = getSectionData("branding");

  // Default data
  const defaultBrandingData = [
    { name: "Great Lakes Electric", elements: "Car branding" },
    { name: "Lake Eria", elements: "Car branding" },
    { name: "Great Lakes Contracting", elements: "Car branding And Uniform" },
    { name: "All Seasons", elements: "Car branding And Uniform" },
  ];

  // Get dynamic comparison data if available
  const comparisonData = hasDynamicData && sectionData?.additionalData?.comparisonData;
  const hasComparisonData = comparisonData && comparisonData.length > 0;

  // Use dynamic data if available
  const brandingData = hasComparisonData
    ? comparisonData.map((item) => ({
        name: item.name || item.label || "",
        elements: item.value || item.elements || "",
      }))
    : defaultBrandingData;

  // Get key takeaway from API
  const keyTakeaway = hasDynamicData && sectionData?.keyTakeaway ? sectionData.keyTakeaway : null;
  const hasValidKeyTakeaway = keyTakeaway && keyTakeaway !== "<p><br></p>" && keyTakeaway.replace(/<[^>]*>/g, "").trim() !== "";

  // Get section title
  const sectionTitle = hasDynamicData && sectionData?.sectionTitle ? sectionData.sectionTitle : "Branding";

  return (
    <div className="bg-black font-sans text-white">
      <div className="container mx-auto section-gap">
        {/* Header */}
        <div className="text-center mb-6 lg:mb-12">
          <span className="text-base uppercase tracking-widest text-white mb-4 block">SUBTITLE</span>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase hero-title">{sectionTitle}</h1>
          <p className="text-white text-base sm:text-lg mx-auto">
            Review volume varies significantly across brands, with clear leaders in customer feedback
          </p>
        </div>

        {/* Branding Table */}
        <div className="max-w-6xl mx-auto mb-6 lg:mb-12">
          <div className="border border-gray-600 rounded-2xl overflow-hidden bg-[#151516]">
            {brandingData.map((item, index) => (
              <div
                key={index}
                className={`flex justify-between items-center px-6 md:px-8 py-5 md:py-6 transition-colors hover:bg-gray-900 cursor-pointer ${
                  index !== brandingData.length - 1 ? "border-b border-gray-600" : ""
                }`}
              >
                <span className="text-white text-lg font-medium">{item.name}</span>
                <span className="text-white text-lg">{item.elements}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Takeaway Section */}
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-black text-white mb-4 lg:mb-8 uppercase">Key takeaway</h2>
          {hasValidKeyTakeaway ? (
            <div
              className="text-base text-white [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mb-3 [&_h4]:text-lg [&_h4]:font-bold [&_h4]:mb-3 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:text-left [&_ul]:max-w-3xl [&_ul]:mx-auto [&_li]:mb-2"
              dangerouslySetInnerHTML={{ __html: keyTakeaway }}
            />
          ) : (
            <div className="space-y-8 mx-auto">
              <div>
                <h3 className="text-lg font-bold text-white mb-3">Client (Great Lakes Electric):</h3>
                <p className="text-white text-base leading-relaxed">
                  All competitors have a complete set of branding elements (branded uniforms and vehicles), which strengthens their offline visibility.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandingSlide;
