import React from "react";
import { useLandingPage } from "../context/LandingPageContext";

const SocialMedia = () => {
  const { hasDynamicData, getSectionData } = useLandingPage();
  const sectionData = getSectionData("social-media");

  // Default data
  const defaultSocialData = [
    { name: "Great Lakes Electric", platforms: "Facebook, Instagram, LinkedIn" },
    { name: "Lake Eria", platforms: "Facebook, LinkedIn" },
    { name: "Great Lakes Contracting", platforms: "Facebook, LinkedIn" },
    { name: "All Seasons", platforms: "Facebook, Twitter, Instagram, YouTube, LinkedIn" },
  ];

  // Get dynamic comparison data if available
  const comparisonData = hasDynamicData && sectionData?.additionalData?.comparisonData;
  const hasComparisonData = comparisonData && comparisonData.length > 0;

  // Use dynamic data if available
  const socialMediaData = hasComparisonData
    ? comparisonData.map((item) => ({
        name: item.name || item.label || "",
        platforms: item.value || item.platforms || "",
      }))
    : defaultSocialData;

  // Get key takeaway from API
  const keyTakeaway = hasDynamicData && sectionData?.keyTakeaway ? sectionData.keyTakeaway : null;
  const hasValidKeyTakeaway = keyTakeaway && keyTakeaway !== "<p><br></p>" && keyTakeaway.replace(/<[^>]*>/g, "").trim() !== "";

  // Get section title
  const sectionTitle = hasDynamicData && sectionData?.sectionTitle ? sectionData.sectionTitle : "Social Media";

  return (
    <div className="bg-white font-sans text-gray-900">
      <div className="container mx-auto section-gap">
        {/* Header */}
        <div className="text-center mb-6 lg:mb-12">
          <h1 className="text-3xl md:text-[39px] hero-title font-black text-black mb-4 uppercase">{sectionTitle}</h1>
          <p className="text-gray-600 text-lg mx-auto">
            Review volume varies significantly across brands, with clear leaders in customer feedback
          </p>
        </div>

        {/* Social Media Table */}
        <div className="max-w-6xl mx-auto mb-6 lg:mb-12">
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            {socialMediaData.map((item, index) => (
              <div
                key={index}
                className={`flex justify-between items-center px-4 md:px-8 py-5 md:py-6 transition-colors hover:bg-gray-50 ${
                  index !== socialMediaData.length - 1 ? "border-b border-gray-200" : ""
                }`}
              >
                <span className="text-gray-700 text-lg font-medium">{item.name}</span>
                <span className="text-gray-600 text-lg text-right">{item.platforms}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Takeaway Section */}
        <div className="bg-[#F6F6F6] rounded-lg p-4 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 text-center mb-8">Key takeaway</h2>
          {hasValidKeyTakeaway ? (
            <div
              className="text-base text-gray-700 text-center [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mb-3 [&_h4]:text-lg [&_h4]:font-bold [&_h4]:mb-3 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:text-left [&_ul]:max-w-3xl [&_ul]:mx-auto [&_li]:mb-2"
              dangerouslySetInnerHTML={{ __html: keyTakeaway }}
            />
          ) : (
            <div className="space-y-4 lg:space-y-8 mx-auto">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Client (Great Lakes Electric):</h3>
                <p className="text-gray-700 text-lg leading-relaxed text-center">
                  Has a solid multi-platform presence on Facebook, Instagram, and LinkedIn.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Competitors:</h3>
                <ul className="space-y-4 text-gray-700 text-lg">
                  <li><span className="font-bold text-gray-900"></span> <strong className="text-gray-900">Competitor 1</strong> maintains a basic presence limited to Facebook and LinkedIn.</li>
                  <li><span className="font-bold text-gray-900"></span> <strong className="text-gray-900">Competitor 2</strong> follows a similar minimal approach.</li>
                  <li><span className="font-bold text-gray-900"></span> <strong className="text-gray-900">Competitor 3</strong> has the strongest social media presence.</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;
