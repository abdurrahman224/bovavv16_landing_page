import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useLandingPage } from "../context/LandingPageContext";

const defaultData = [
  {
    name: "Direct",
    greatlakes: 120,
    lakeerie: 1850,
    glecinc: 480,
    allseasons: 180,
  },
  {
    name: "Organic",
    greatlakes: 410,
    lakeerie: 2380,
    glecinc: 1450,
    allseasons: 550,
  },
  { name: "Paid", greatlakes: 50, lakeerie: 60, glecinc: 50, allseasons: 880 },
  {
    name: "Referrals",
    greatlakes: 40,
    lakeerie: 180,
    glecinc: 310,
    allseasons: 190,
  },
  {
    name: "Display",
    greatlakes: 30,
    lakeerie: 40,
    glecinc: 30,
    allseasons: 40,
  },
  {
    name: "Social",
    greatlakes: 60,
    lakeerie: 390,
    glecinc: 180,
    allseasons: 150,
  },
  { name: "Email", greatlakes: 30, lakeerie: 40, glecinc: 30, allseasons: 30 },
];

export default function MarketingChannels() {
  const { hasDynamicData, getSectionData } = useLandingPage();
  const sectionData = getSectionData("marketing-channels");

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
      : "Marketing Channels";

  return (
    <div className="bg-black font-sans">
      <div className="container mx-auto pt-10 sm:pt-12 md:pt-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-[39px] font-black text-white mb-4 uppercase hero-title">
            {sectionTitle}
          </h1>
          <p className="text-white text-lg mx-auto">
            A comprehensive breakdown of traffic sources compared to industry
            competitors.
          </p>
        </div>

        {/* Main Content */}
        {imagePath ? (
          <div className=" bg-black rounded-lg p-2 border-4 border-gray-800 max-w-5xl mx-auto">
            <div className="aspect-video relative w-full overflow-hidden rounded-lg">
              <img
                src={imagePath}
                alt="Marketing Channels Graph"
                referrerPolicy="no-referrer"
                className="w-full h-full absolute inset-0 object-contain"
              />
            </div>
          </div>
        ) : (
          <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center">
            <div className="w-full bg-white rounded-3xl p-12 shadow-2xl border-4 border-gray-800">
              <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">
                Channels Overview
              </h2>
              <div className="h-100 w-full mb-8">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={defaultData}
                    margin={{ top: 20, right: 40, left: 20, bottom: 40 }}
                    barGap={12}
                    barCategoryGap="15%"
                  >
                    <CartesianGrid
                      vertical={false}
                      strokeDasharray="3 3"
                      stroke="#e5e7eb"
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#6b7280", fontSize: 16, fontWeight: 600 }}
                      dy={20}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#6b7280", fontSize: 16, fontWeight: 500 }}
                      ticks={[0, 1000, 2000, 3000, 4000]}
                      tickFormatter={(value) =>
                        value === 0 ? "0" : value / 1000 + "k"
                      }
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
                      contentStyle={{
                        borderRadius: "16px",
                        border: "none",
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                    />
                    <Bar
                      dataKey="lakeerie"
                      fill="#f97316"
                      radius={[8, 8, 0, 0]}
                      barSize={60}
                    />
                    <Bar
                      dataKey="glecinc"
                      fill="#10b981"
                      radius={[8, 8, 0, 0]}
                      barSize={60}
                    />
                    <Bar
                      dataKey="greatlakes"
                      fill="#3b82f6"
                      radius={[8, 8, 0, 0]}
                      barSize={60}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-12 mt-12 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-5 h-5 rounded-full bg-[#10b981] shadow-lg"></div>
                <span className="text-white text-lg font-bold ui-font">
                  Competitors 1
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-5 h-5 rounded-full bg-[#f97316] shadow-lg"></div>
                <span className="text-white text-lg font-bold ui-font">
                  Competitors 2
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-5 h-5 rounded-full bg-[#3b82f6] shadow-lg"></div>
                <span className="text-white text-lg font-bold ui-font">
                  Competitors 3
                </span>
              </div>
            </div>
          </div>
        )}

        {/* <p className="text-center text-gray-400 italic mb-16 mt-3 text-base py-4 bg-[#151516]">
          To match and surpass competitors, consistent monthly link acquisition
          is required.
        </p> */}

        {/* Key Takeaway Section */}
        <div className=" rounded-lg p-8 md:p-10 text-white mb-10 sm:mb-14 md:mb-16">
          <h3 className="text-2xl font-black mb-8 uppercase text-center">
            Key takeaway
          </h3>
          {hasValidKeyTakeaway ? (
            <div
              className="text-base text-white text-center [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mb-3 [&_h4]:text-lg [&_h4]:font-bold [&_h4]:mb-3 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:text-left [&_ul]:max-w-3xl [&_ul]:mx-auto [&_li]:mb-2"
              dangerouslySetInnerHTML={{ __html: keyTakeaway }}
            />
          ) : (
            <>
              <div className="mb-12 text-center">
                <h4 className="font-bold mb-3">
                  Client (Great Lakes Electric):
                </h4>
                <p className="text-white">
                  Great Lakes Electric demonstrates steady traffic growth
                  throughout the period.
                </p>
              </div>
              <div className="text-center">
                <h4 className="font-bold mb-4">Competitors:</h4>
                <ul className="space-y-3">
                  <li className="text-white">
                    <span className="font-bold"></span>{" "}
                    <strong>Competitor 1</strong> shows a mid-period traffic
                    peak followed by a decline.
                  </li>
                  <li className="text-white">
                    <span className="font-bold"></span>{" "}
                    <strong>Competitor 2</strong> maintains the lowest traffic
                    levels across the entire period.
                  </li>
                  <li className="text-white">
                    <span className="font-bold"></span>{" "}
                    <strong>Competitor 3</strong> experiences a noticeable drop
                    in traffic toward the end.
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
