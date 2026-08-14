import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useLandingPage } from "../context/LandingPageContext";

const defaultChartData = [
  {
    name: "Competitor 1",
    "Services Page": 350,
    "City Page": 380,
    "Landing Page": 500,
  },
  {
    name: "Competitor 2",
    "Services Page": 160,
    "City Page": 140,
    "Landing Page": 210,
  },
  {
    name: "Competitor 3",
    "Services Page": 480,
    "City Page": 450,
    "Landing Page": 600,
  },
  {
    name: "Client",
    "Services Page": 280,
    "City Page": 320,
    "Landing Page": 460,
  },
];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-3 text-sm">
      {payload.map((entry, idx) => (
        <p key={idx} style={{ color: entry.color }}>
          <span className="font-semibold">{entry.name}:</span> {entry.value}
        </p>
      ))}
    </div>
  );
};

export default function Pages_Analysis() {
  const { hasDynamicData, getSectionData } = useLandingPage();
  const sectionData = getSectionData("page-distribution");

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

  // Get section title
  const sectionTitle =
    hasDynamicData && sectionData?.sectionTitle
      ? sectionData.sectionTitle
      : "Page Type Distribution";

  return (
    <div className="bg-black   container mx-auto px-4 text-white pt-10 sm:pt-12 md:pt-16">
      <div className="">
        {/* Header */}
        <div className="text-center mb-6 lg:mb-12 container mx-auto px-4">
          <span className="text-base tracking-widest text-white mb-4 block">
            SUBTITLE
          </span>
          <h1 className="text-2xl md:text-[39px] hero-title font-black text-white mb-4 uppercase">
            {sectionTitle}
          </h1>
          <p className="text-white text-base sm:text-lg mx-auto">
            Content frequency and topic coverage are key drivers of organic
            visibility growth.
          </p>
        </div>

        {/* Chart container */}
        {imagePath ? (
          <div className="mb-6 bg-white rounded-lg p-1 text-gray-900 lg:mb-12 max-w-5xl mx-auto">
            <div className="aspect-video relative w-full overflow-hidden rounded-lg">
              <img
                src={imagePath}
                alt="Page Distribution Graph"
                referrerPolicy="no-referrer"
                className="w-full h-full absolute inset-0 object-contain"
              />
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl max-w-279 mx-auto p-6 md:p-8 mb-6 lg:mb-12 text-gray-900">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 ui-font">
              Pages Count Comparison
            </h2>
            <div className="w-full h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={defaultChartData}
                  margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
                >
                  <CartesianGrid vertical={false} stroke="#e5e7eb" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#666", fontSize: 13 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#999", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ paddingTop: "20px" }}
                    iconType="square"
                    formatter={(value) => (
                      <span className="text-gray-700 text-sm">{value}</span>
                    )}
                  />
                  <Bar
                    dataKey="Services Page"
                    fill="#10b981"
                    radius={[16, 16, 0, 0]}
                  />
                  <Bar
                    dataKey="City Page"
                    fill="#f97316"
                    radius={[16, 16, 0, 0]}
                  />
                  <Bar
                    dataKey="Landing Page"
                    fill="#3b82f6"
                    radius={[16, 16, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Insight Text */}
        {/* <p className="bg-[#151516] py-2 text-center text-gray-100 italic text-lg mb-12">
          Increasing content volume and topic coverage is essential for ranking
          expansion
        </p> */}

        {/* Key Takeaway Section */}
        <div className="container mx-auto pb-6 sm:pb-10 md:pb-16 text-center">
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
                <h3 className="text-xl font-bold text-white mb-3">
                  Client (Great Lakes Electric):
                </h3>
                <p className="text-white text-lg leading-relaxed">
                  Demonstrates steady traffic growth throughout the period,
                  reflecting improving online visibility.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Competitors:
                </h3>
                <ul className="space-y-4 text-white text-lg">
                  <li>
                    <span className="text-white font-bold"></span>{" "}
                    <strong className="text-white">Competitor 1</strong> shows a
                    mid-period traffic peak followed by a decline.
                  </li>
                  <li>
                    <span className="text-white font-bold"></span>{" "}
                    <strong className="text-white">Competitor 2</strong>{" "}
                    maintains the lowest traffic levels across the entire
                    period.
                  </li>
                  <li>
                    <span className="text-white font-bold"></span>{" "}
                    <strong className="text-white">Competitor 3</strong>{" "}
                    experiences a noticeable drop in traffic toward the end.
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
