import React from "react";
import { useLandingPage } from "../context/LandingPageContext";

const GoogleReviewsChart = () => {
  const { hasDynamicData, getSectionData } = useLandingPage();
  const sectionData = getSectionData("google-reviews");

  // Default data
  const defaultReviewsData = [
    { name: "Great Lakes Electric", reviews: "99" },
    { name: "Lake Eria", reviews: "10" },
    { name: "Great Lakes Contracting", reviews: "297" },
    { name: "All Seasons", reviews: "1,600" },
  ];

  // Get dynamic comparison data if available
  const comparisonData =
    hasDynamicData && sectionData?.additionalData?.comparisonData;
  const hasComparisonData = comparisonData && comparisonData.length > 0;

  // Use dynamic data if available
  const reviewsData = hasComparisonData
    ? comparisonData.map((item) => ({
        name: item.name || item.label || "",
        reviews: item.value || item.reviews || "",
      }))
    : defaultReviewsData;

  // Get key takeaway from API
  const keyTakeaway =
    hasDynamicData && sectionData?.keyTakeaway ? sectionData.keyTakeaway : null;
  const hasValidKeyTakeaway =
    keyTakeaway &&
    keyTakeaway !== "<p><br></p>" &&
    keyTakeaway.replace(/<[^>]*>/g, "").trim() !== "";

  // Get section title
  const sectionTitle =
    hasDynamicData && sectionData?.sectionTitle
      ? sectionData.sectionTitle
      : "Google Reviews";

  return (
    <div className="container px-4 mx-auto bg-[#151516] font-sans text-white section-gap lg:rounded-2xl">
      <div className="">
        {/* Header */}
        <div className="text-center mb-6 lg:mb-12">
          <span className="text-sm uppercase hero-title tracking-widest text-white mb-4 block">
            SUBTITLE
          </span>
          <h1 className="text-3xl md:text-[39px] hero-title font-black text-white mb-4 uppercase">
            {sectionTitle}
          </h1>
          <p className="text-white text-base sm:text-lg mx-auto">
            Review volume varies significantly across brands, with clear leaders
            in customer feedback
          </p>
        </div>

        {/* Reviews Table */}
        <div className="max-w-6xl mx-auto mb-6 lg:mb-12">
          <div className="bg-black border border-gray-700 rounded-2xl overflow-hidden">
            {reviewsData.map((item, index) => (
              <div
                key={index}
                className={`flex justify-between items-center px-6 md:px-8 py-5 md:py-6 transition-colors hover:bg-gray-900 cursor-pointer ${
                  index !== reviewsData.length - 1
                    ? "border-b border-gray-700"
                    : ""
                }`}
              >
                <span className="text-white text-lg font-medium">
                  {item.name}
                </span>
                <span className="text-white font-bold text-xl">
                  {item.reviews}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Takeaway Section */}
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-black text-white mb-6 lg:mb-12 uppercase">
            Key takeaway
          </h2>
          {hasValidKeyTakeaway ? (
            <div
              className="text-base text-white [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mb-3 [&_h4]:text-lg [&_h4]:font-bold [&_h4]:mb-3 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:text-left [&_ul]:max-w-3xl [&_ul]:mx-auto [&_li]:mb-2"
              dangerouslySetInnerHTML={{ __html: keyTakeaway }}
            />
          ) : (
            <div className="space-y-8">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-3">
                  Client (Great Lakes Electric):
                </h3>
                <p className="text-white text-lg leading-relaxed mx-auto">
                  Has a moderate number of reviews (99), indicating an
                  established but less dominant reputation.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Competitors:
                </h3>
                <ul className="space-y-4 text-white text-lg max-w-6xl mx-auto">
                  <li className="flex gap-3 items-start">
                    <span className="text-white font-bold shrink-0 pr-2 mt-1"></span>
                    <span>
                      <strong className="text-white">Competitor 1</strong> has
                      very limited customer feedback.
                    </span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-white font-bold shrink-0 pr-2 mt-1"></span>
                    <span>
                      <strong className="text-white">Competitor 2</strong> shows
                      solid social proof with moderate reviews.
                    </span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-white font-bold shrink-0 pr-2 mt-1"></span>
                    <span>
                      <strong className="text-white">Competitor 3</strong> is
                      the market leader in customer reviews.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoogleReviewsChart;
