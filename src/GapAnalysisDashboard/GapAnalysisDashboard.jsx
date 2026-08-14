import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useLandingPage } from "../context/LandingPageContext";

const defaultData = [
  { name: "Services Page", "Competitors 1": 120, "Competitors 2": 350, "Competitors 3": 200, Client: 180 },
  { name: "City Page", "Competitors 1": 220, "Competitors 2": 280, "Competitors 3": 400, Client: 190 },
  { name: "Landing Page", "Competitors 1": 150, "Competitors 2": 310, "Competitors 3": 550, Client: 240 },
];

const colors = {
  "Competitors 1": "#10b981",
  "Competitors 2": "#f97316",
  "Competitors 3": "#3b82f6",
  Client: "#93c5fd",
};

export default function GapAnalysisDashboard() {
  const { hasDynamicData, getSectionData } = useLandingPage();
  const sectionData = getSectionData("gap-analysis");

  // Get image from API if available
  const imagePath = hasDynamicData && sectionData?.imagePath ? sectionData.imagePath : null;

  // Get key takeaway from API
  const keyTakeaway = hasDynamicData && sectionData?.keyTakeaway ? sectionData.keyTakeaway : null;
  const hasValidKeyTakeaway = keyTakeaway && keyTakeaway !== "<p><br></p>" && keyTakeaway.replace(/<[^>]*>/g, "").trim() !== "";

  // Get section title
  const sectionTitle = hasDynamicData && sectionData?.sectionTitle ? sectionData.sectionTitle : "Website & Pages Gap Analysis";

  return (
    <div className="bg-white text-gray-900 section-gap">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-6 lg:mb-12">
          <h1 className="text-3xl md:text-[39px] font-black text-black mb-4 uppercase hero-title">{sectionTitle}</h1>
          <p className="text-gray-600 text-lg">
            Page count and structure directly impact keyword targeting opportunities and local market coverage.
          </p>
        </div>

        {/* Chart container */}
        {imagePath ? (
          <div className="mb-6 bg-black rounded-lg p-2 lg:mb-10 max-w-5xl mx-auto">
            <div className="aspect-video relative w-full overflow-hidden rounded-lg">
              <img
                src={imagePath}
                alt="Gap Analysis Graph"
                referrerPolicy="no-referrer"
                className="w-full h-full absolute rounded-md inset-0 object-contain"
              />
            </div>
          </div>
        ) : (
          <div className="bg-black rounded-xl p-8 md:p-10 mb-6 lg:mb-12">
            <h2 className="text-2xl font-bold text-white mb-8">Total number of website pages</h2>
            <div className="w-full h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={defaultData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: "#999", fontSize: 13 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#999", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #444", borderRadius: "8px", color: "#fff" }} />
                  <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="circle" formatter={(value) => <span style={{ color: "#999" }}>{value}</span>} />
                  <Bar dataKey="Competitors 1" fill={colors["Competitors 1"]} radius={[16, 16, 0, 0]} />
                  <Bar dataKey="Competitors 2" fill={colors["Competitors 2"]} radius={[16, 16, 0, 0]} />
                  <Bar dataKey="Competitors 3" fill={colors["Competitors 3"]} radius={[16, 16, 0, 0]} />
                  <Bar dataKey="Client" fill={colors["Client"]} radius={[16, 16, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Key Takeaway Section */}
        <div className="bg-[#F6F6F6] rounded-lg p-8 text-center">
          <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 uppercase">Key takeaway</h3>
          {hasValidKeyTakeaway ? (
            <div
              className="text-base text-gray-700 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mb-3 [&_h4]:text-lg [&_h4]:font-bold [&_h4]:mb-3 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:text-left [&_ul]:max-w-3xl [&_ul]:mx-auto [&_li]:mb-2"
              dangerouslySetInnerHTML={{ __html: keyTakeaway }}
            />
          ) : (
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 text-base md:text-lg">
                  <p className="text-gray-900">Client (Great Lakes Electric):</p>
                </p>
                <p className="text-base">Records the lowest traffic volume across all channels, highlighting a limited digital footprint.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
