import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useLandingPage } from "../context/LandingPageContext";

export default function TrafficShare() {
  const { hasDynamicData, getSectionData } = useLandingPage();
  const sectionData = getSectionData("traffic-share");

  // Default Chart Data
  const defaultData = [
    {
      month: "Jan",
      "Great Lakes Electric": 750,
      "Lake Erie": 1200,
      "Great Lakes Contracting": 400,
      "All Seasons Toledo": 200,
    },
    {
      month: "Feb",
      "Great Lakes Electric": 800,
      "Lake Erie": 1400,
      "Great Lakes Contracting": 450,
      "All Seasons Toledo": 350,
    },
    {
      month: "Mar",
      "Great Lakes Electric": 950,
      "Lake Erie": 1100,
      "Great Lakes Contracting": 600,
      "All Seasons Toledo": 500,
    },
    {
      month: "Apr",
      "Great Lakes Electric": 1100,
      "Lake Erie": 1300,
      "Great Lakes Contracting": 550,
      "All Seasons Toledo": 450,
    },
    {
      month: "May",
      "Great Lakes Electric": 1250,
      "Lake Erie": 1200,
      "Great Lakes Contracting": 700,
      "All Seasons Toledo": 600,
    },
    {
      month: "Jun",
      "Great Lakes Electric": 1400,
      "Lake Erie": 1100,
      "Great Lakes Contracting": 650,
      "All Seasons Toledo": 400,
    },
  ];

  const defaultBenchmarkData = [
    { name: "Great Lakes Electric", color: "#ea8c55", value: "1.4k" },
    { name: "Lake Erie", color: "#3ba899", value: "1.1k" },
    { name: "Great Lakes Contracting", color: "#7c6ba6", value: "651" },
    { name: "All Seasons Toledo", color: "#d4a75d", value: "600" },
  ];

  // Get image from API if available
  const imagePath =
    hasDynamicData && sectionData?.imagePath ? sectionData.imagePath : null;

  // Get key takeaway from API
  const keyTakeaway =
    hasDynamicData && sectionData?.keyTakeaway ? sectionData.keyTakeaway : null;
  const hasValidKeyTakeaway =
    keyTakeaway &&
    keyTakeaway !== "<p><br></p>" &&
    keyTakeaway.replace(/<[^>]*>/g, "").trim() !== "";

  // Get competitive findings from API
  const competitiveFindings =
    hasDynamicData && sectionData?.additionalData?.competitiveFindings;
  const hasCompetitiveFindings =
    competitiveFindings && competitiveFindings.length > 0;

  // Get section title
  const sectionTitle =
    hasDynamicData && sectionData?.sectionTitle
      ? sectionData.sectionTitle
      : "Traffic Share";

  return (
    <div className="bg-white">
      <div className="container mx-auto section-gap">
        {/* Header */}
        <div className="text-center mb-6 lg:mb-12">
          <h1 className="text-4xl md:text-[39px] font-black text-black mb-3 lg:mb-4 uppercase hero-title">
            {sectionTitle}
          </h1>
          <p className="text-gray-600 text-lg w-4/6 mx-auto">
            We analyzed the top competitors dominating your niche across
            traffic, visibility, and growth potential.
          </p>
        </div>

        {/* Main Content */}
        {imagePath ? (
          <div className="mb-6 lg:mb-12 p-2 bg-white border-3 border-gray-100 rounded-lg max-w-5xl mx-auto">
            <div className="aspect-video relative w-full overflow-hidden rounded-lg">
              <img
                src={imagePath}
                alt="Traffic Share Graph"
                referrerPolicy="no-referrer"
                className="w-full h-full absolute inset-0 object-contain"
              />
            </div>
          </div>
        ) : (
          <div className="bg-white border-4 border-gray-100 rounded-lg p-6 md:p-8 mb-12 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Traffic Overtime
            </h2>
            <div className="h-96 w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={defaultData}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="5 5"
                    vertical={false}
                    stroke="#e5e7eb"
                  />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 13 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 13 }}
                    dx={-10}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Great Lakes Electric"
                    stroke="#ea8c55"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Lake Erie"
                    stroke="#3ba899"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Great Lakes Contracting"
                    stroke="#7c6ba6"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="All Seasons Toledo"
                    stroke="#d4a75d"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
                {defaultBenchmarkData.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 lg:gap-3">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: item.color }}
                    />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">{item.name}</p>
                      <p className="text-lg font-bold text-gray-900">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        

        {/* Key Takeaway Section */}
        <div className="bg-[#F6F6F6] rounded-lg p-8 md:p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-8">
            Key takeaway
          </h2>
          {hasValidKeyTakeaway ? (
            <div
              className="text-base text-gray-700 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mb-3 [&_h4]:text-lg [&_h4]:font-bold [&_h4]:mb-3 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:text-left [&_ul]:max-w-3xl [&_ul]:mx-auto [&_li]:mb-2"
              dangerouslySetInnerHTML={{ __html: keyTakeaway }}
            />
          ) : (
            <>
              <div className="mb-4 lg:mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Client (Great Lakes Electric):
                </h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  Great Lakes Electric demonstrates steady traffic growth
                  throughout the period.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Competitors:
                </h3>
                <ul className="space-y-2.5 lg:space-y-4 text-center">
                  <li className="text-gray-700">
                    <strong className="text-gray-900"> Competitor 1</strong>{" "}
                    shows a mid-period traffic peak followed by a decline.
                  </li>
                  <li className="text-gray-700">
                    <strong className="text-gray-900"> Competitor 2</strong>{" "}
                    maintains the lowest traffic levels across the entire
                    period.
                  </li>
                  <li className="text-gray-700">
                    <strong className="text-gray-900"> Competitor 3</strong>{" "}
                    experiences a noticeable drop in traffic toward the end.
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
