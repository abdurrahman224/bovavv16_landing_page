import React from 'react';
import {
  FileText,
  MapPin,
  Layout,
  PenTool,
  Link,
  Settings,
  BarChart3,
  Tag,
  Target,
  TrendingUp,
  Search,
  Zap,
  Wrench,
  CheckCircle,
  Rocket,
  Lightbulb,
  Bell,
  Smartphone,
  Laptop,
  Palette,
} from 'lucide-react';
import { useLandingPage } from '../context/LandingPageContext';

// Icon mapping for dynamic icons
const iconMap = {
  'file': <FileText size={24} />,
  'filetext': <FileText size={24} />,
  'document': <FileText size={24} />,
  'page': <FileText size={24} />,
  'map': <MapPin size={24} />,
  'mappin': <MapPin size={24} />,
  'location': <MapPin size={24} />,
  'city': <MapPin size={24} />,
  'layout': <Layout size={24} />,
  'landing': <Layout size={24} />,
  'pen': <PenTool size={24} />,
  'pentool': <PenTool size={24} />,
  'blog': <PenTool size={24} />,
  'content': <PenTool size={24} />,
  'link': <Link size={24} />,
  'backlink': <Link size={24} />,
  'settings': <Settings size={24} />,
  'seo': <Settings size={24} />,
  'technical': <Settings size={24} />,
};

const getIconComponent = (iconName) => {
  if (!iconName) return null;
  
  // Map emojis to Lucide icons
  const emojiMap = {
    '📄': <FileText size={24} />,
    '📝': <FileText size={24} />,
    '📃': <FileText size={24} />,
    '🔗': <Link size={24} />,
    '🌐': <Link size={24} />,
    '📍': <MapPin size={24} />,
    '📌': <MapPin size={24} />,
    '🗺️': <MapPin size={24} />,
    '✏️': <PenTool size={24} />,
    '🖊️': <PenTool size={24} />,
    '🎨': <Palette size={24} />,
    '⚙️': <Settings size={24} />,
    '🔧': <Wrench size={24} />,
    '🛠️': <Wrench size={24} />,
    '📊': <BarChart3 size={24} />,
    '📈': <TrendingUp size={24} />,
    '🏷️': <Tag size={24} />,
    '🎯': <Target size={24} />,
    '🔍': <Search size={24} />,
    '⚡': <Zap size={24} />,
    '✅': <CheckCircle size={24} />,
    '🚀': <Rocket size={24} />,
    '💡': <Lightbulb size={24} />,
    '🔔': <Bell size={24} />,
    '📱': <Smartphone size={24} />,
    '💻': <Laptop size={24} />,
  };
  
  // Check if it's an emoji
  if (emojiMap[iconName]) {
    return emojiMap[iconName];
  }
  
  // Otherwise, try to map text-based icon names to Lucide icons
  const key = iconName.toLowerCase().replace(/[^a-z]/g, '');
  return iconMap[key] || null;
};

const ActionPlan = () => {
  const { hasDynamicData, getSectionData } = useLandingPage();
  const sectionData = getSectionData('outrank-competitors');

  // Default plans
  const defaultPlans = [
    { icon: <FileText size={24} />, text: 'Create 12+ service pages' },
    { icon: <MapPin size={24} />, text: 'Create 30+ city/location pages' },
    { icon: <Layout size={24} />, text: 'Build 12+ landing pages' },
    {
      icon: <PenTool size={24} />,
      text: 'Publish consistent monthly blog content',
    },
    { icon: <Link size={24} />, text: 'Acquire 10–25 backlinks monthly' },
    {
      icon: <Settings size={24} />,
      text: 'Ongoing technical SEO improvements',
    },
  ];

  // Get dynamic items if available
  const apiItems = hasDynamicData && sectionData?.additionalData?.items;
  const hasApiItems = apiItems && apiItems.length > 0;

  // Use dynamic data if available
  const plans = hasApiItems
    ? apiItems.map(item => ({
        icon: getIconComponent(item.icon),
        text: item.text || '',
      }))
    : defaultPlans;

  return (
    <div className="bg-[#080807] text-white flex flex-col items-center justify-center section-gap  font-sans">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="text-center mb-4 sm:mb-8 md:mb-12 animate-fade-in-up">
          <h2 className="text-2xl sm:text-[39px] hero-title font-bold mb-3 sm:mb-4 text-[#FFFFFF] uppercase">
            What You Need to Outrank Competitors
          </h2>
          <p className="text-[#FFFFFF] text-base sm:text-lg max-w-3xl mx-auto">
            Based on our comprehensive analysis, here's the action plan to
            achieve market dominance.
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 w-full max-w-6xl mx-auto">
          {plans.map((item, index) => (
            <div
              key={index}
              className="bg-[#BE301E]  flex items-center space-x-3 sm:space-x-4 border border-[#3d3d3d] p-3 md:p-6 rounded-lg sm:rounded-xl shadow-2xl hover:border-gray-600 transition-all cursor-pointer duration-300 card-hover animate-fade-in-up min-h-[80px]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {item.icon && (
                <div className="text-gray-100 shrink-0">{item.icon}</div>
              )}
              <span className="text-white text-base leading-snug">
                {item.text}
              </span>
            </div>
          ))}
        </div>

        {/* Footer Section */}
        <div className="mt-6 sm:mt-10 md:mt-16 animate-fade-in-up delay-400">
          <p className="text-gray-100 text-lg sm:text-xl text-center">
            Based on this analysis, we recommend the following package:
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActionPlan;
