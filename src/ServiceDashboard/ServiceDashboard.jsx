import React, { useState, useMemo } from "react";
import { Plus, Minus, Check, AlertCircle } from "lucide-react";
import { useBilling } from "../context/BillingContext";
import { useGlobalSettings } from "../context/GlobalSettingsContext";

const ServiceCard = ({
  service,
  onAdd,
  onRemove,
  quantity,
  disabled,
  currentPaymentType,
  onPaymentTypeChange,
}) => {
  const hasQuantity = quantity > 0;
  const hasBothOptions = service.hasMonthly && service.hasOneTime;
  
  // Determine correct payment type based on service capabilities
  const getCorrectPaymentType = () => {
    if (service.hasMonthly && !service.hasOneTime) {
      return "month"; // Only monthly available
    } else if (service.hasOneTime && !service.hasMonthly) {
      return "one-time"; // Only one-time available  
    } else if (hasBothOptions) {
      return currentPaymentType || "month"; // Both available, use preference
    } else {
      return "month"; // Fallback
    }
  };
  
  const [paymentType, setPaymentType] = React.useState(getCorrectPaymentType);

  // Update payment type when service changes
  React.useEffect(() => {
    setPaymentType(getCorrectPaymentType());
  }, [service.hasMonthly, service.hasOneTime, currentPaymentType]);

  const handlePaymentTypeChange = (type) => {
    setPaymentType(type);
    if (onPaymentTypeChange) {
      onPaymentTypeChange(type);
    }
  };

  const currentPrice = hasBothOptions
    ? paymentType === "month"
      ? service.monthlyPrice
      : service.oneTimePrice
    : service.monthlyPrice || service.oneTimePrice;

  const priceLabel = hasBothOptions
    ? paymentType === "month"
      ? "/mo"
      : "/one-time"
    : service.hasMonthly
      ? "/mo"
      : "/one-time";

  return (
    <div
      className={` bg-[#1B1B1B] flex flex-col justify-between p-4 sm:p-6 border rounded-2xl transition-all duration-300 h-full card-hover ${
        hasQuantity
          ? "border-3 border-gray-900 shadow-md ring-1 ring-green-100"
          : "border-gray-200 shadow-sm hover:shadow-md"
      } ${disabled ? "opacity-60" : ""}`}
    >
      <div>
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold text-white mb-1 leading-snug flex-1">
            {service.title}
          </h3>
          {hasQuantity && (
            <span className="shrink-0 bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
              {quantity}x
            </span>
          )}
        </div>
        <p className="text-base leading-normal text-gray-200">
          {service.description}
        </p>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-600">
        <div className="flex flex-col gap-4 mb-3 w-full">
          {/* Price */}
          <div className="">
            <samp className=" text-xl sm:text-3xl font-bold text-white mb-2 mr-2">
              {" "}
              {currentPrice}
            </samp>

            <span className="text-xs sm:text-sm text-gray-200 mt-1">
              {priceLabel}
            </span>
          </div>
          {hasBothOptions && (
            <div className="flex gap-2 sm:gap-4 mb-2 w-full mx-auto justify-center">
              <button
                onClick={() => handlePaymentTypeChange("month")}
                className={`flex-1 py-2 px-3 rounded-lg text-sm sm:text-base font-medium ${
                  paymentType === "month"
                    ? "bg-[#BE301E] text-white shadow-lg scale-105"
                    : "bg-[#101828] text-white"
                }`}
              >
                Month
              </button>

              <button
                onClick={() => handlePaymentTypeChange("one-time")}
                className={`flex-1 py-2 px-3 rounded-lg text-sm sm:text-base font-medium ${
                  paymentType === "one-time"
                    ? "bg-[#BE301E] text-white shadow-lg scale-105"
                    : "bg-[#101828] text-white"
                }`}
              >
                One-time
              </button>
            </div>
          )}

          {/* Payment Type Buttons */}

          {/* Price Label */}
        </div>

        {/* Add/Remove Buttons */}
        <div className="flex items-center gap-2 justify-end">
          {hasQuantity && (
            <button
              type="button"
              onClick={() => onRemove(service)}
              className="bg-red-50 text-red-600 rounded-full flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8  transition-colors cursor-pointer"
              aria-label="Remove service"
            >
              <Minus className="w-4 h-4 pointer-events-none" />
            </button>
          )}
          <button
            type="button"
            onClick={() => onAdd(service, paymentType)}
            disabled={disabled}
            className={`rounded-full flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
              disabled
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : hasQuantity
                  ? "bg-[#BE301E] text-white  cursor-pointer"
                  : "bg-[#BE301E] text-white  cursor-pointer"
            }`}
            aria-label="Add service"
          >
            <Plus className="w-4 h-4 pointer-events-none" />
          </button>
        </div>
      </div>
    </div>
  );
};

const ServiceDashboard = () => {
  const { addService, removeService, selectedServicesMap } = useBilling();
  const { addonsList: globalAddons, categories, loading: settingsLoading } = useGlobalSettings();

  const [notification, setNotification] = useState(null);
  const [servicePaymentTypes, setServicePaymentTypes] = useState({});

  // Fallback data in case global settings fail to load
  const FALLBACK_ADDONS = [
    { category: "Website & Page Creation", title: "Full Website Build (20 pages)", description: "Complete website design and development with SEO optimization", monthlyPrice: "$1,695", oneTimePrice: "$8,995", hasMonthly: true, hasOneTime: true },
    { category: "Website & Page Creation", title: "Website Redesign (7 pages)", description: "Comprehensive website redesign and modernization", monthlyPrice: "$650", oneTimePrice: "$3,500", hasMonthly: true, hasOneTime: true },
    { category: "Website & Page Creation", title: "SEO Landing Page (1 LP)", description: "One additional optimized service page", oneTimePrice: "$379", hasMonthly: false, hasOneTime: true },
    { category: "Website & Page Creation", title: "SEO Landing Page Pack (5 LP)", description: "Five additional optimized service pages", oneTimePrice: "$1,895", hasMonthly: false, hasOneTime: true },
    { category: "Website & Page Creation", title: "SEO Service Page (1 page)", description: "1 fully optimized service page", oneTimePrice: "$399", hasMonthly: false, hasOneTime: true },
    { category: "Website & Page Creation", title: "SEO Service Page Pack (5 page)", description: "5 fully optimized service pages", oneTimePrice: "$1,895", hasMonthly: false, hasOneTime: true },
    { category: "Website & Page Creation", title: "City Page (1)", description: "One location-specific landing page", oneTimePrice: "$399", hasMonthly: false, hasOneTime: true },
    { category: "Website & Page Creation", title: "City Page (5)", description: "Five location-specific landing pages", oneTimePrice: "$1,895", hasMonthly: false, hasOneTime: true },
    { category: "SEO Add-Ons", title: "SEO Growth", description: "Comprehensive SEO strategy and optimization", monthlyPrice: "$1,299", hasMonthly: true, hasOneTime: false },
    { category: "SEO Add-Ons", title: "SEO Premium", description: "Premium SEO services with advanced optimization", monthlyPrice: "$2,449", hasMonthly: true, hasOneTime: false },
    { category: "SEO Add-Ons", title: "CRO Conversion Upgrade (1 priority page)", description: "Conversion rate optimization for one priority page", oneTimePrice: "$749", hasMonthly: false, hasOneTime: true },
    { category: "Content Add-Ons", title: "Blog Article (1 per month)", description: "One SEO-optimized blog article per month", monthlyPrice: "$119", hasMonthly: true, hasOneTime: false },
    { category: "Content Add-Ons", title: "Blog Pack (4 articles per month)", description: "Four SEO-optimized blog articles per month", monthlyPrice: "$749", hasMonthly: true, hasOneTime: false },
    { category: "Link Building Add-Ons", title: "Link Building Pack — 5 High-Quality Links", description: "5 high-quality backlinks from authoritative sources", monthlyPrice: "$1,099", hasMonthly: true, hasOneTime: false },
    { category: "Link Building Add-Ons", title: "Link Building Pack — 10 High-Quality Links", description: "10 high-quality backlinks from authoritative sources", monthlyPrice: "$1,995", hasMonthly: true, hasOneTime: false },
    { category: "PPC Add-Ons", title: "Tier 1 Google Ads (PPC)", description: "Manages $3k–$6k in ad spend", monthlyPrice: "$1,100", hasMonthly: true, hasOneTime: false },
    { category: "PPC Add-Ons", title: "Tier 2 Google Ads (PPC)", description: "Manages $6k–$10k in ad spend", monthlyPrice: "$1,600", hasMonthly: true, hasOneTime: false },
    { category: "PPC Add-Ons", title: "Tier 3 Google Ads (PPC)", description: "Manages $10k–$20k in ad spend", monthlyPrice: "$2,100", hasMonthly: true, hasOneTime: false },
    { category: "Google Local Presence Management Add-Ons", title: "Local Service Ads Management", description: "Local Service Ads Management for enhanced local visibility", monthlyPrice: "$599", hasMonthly: true, hasOneTime: false },
    { category: "Google Local Presence Management Add-Ons", title: "Google Business Profile Management", description: "Complete Google Business Profile optimization and management", monthlyPrice: "$499", hasMonthly: true, hasOneTime: false },
    { category: "Branding", title: "Logo Design", description: "Professional logo creation", oneTimePrice: "$399", hasMonthly: false, hasOneTime: true },
    { category: "Branding", title: "Brand Identity Pack", description: "Complete brand identity system", oneTimePrice: "$999", hasMonthly: false, hasOneTime: true },
    { category: "Branding", title: "Single asset (vehicle wrap / merch / uniform)", description: "Professional vehicle wrap design", oneTimePrice: "$599", hasMonthly: false, hasOneTime: true },
    { category: "Branding", title: "Brand Assets Pack (3-4 items)", description: "Comprehensive brand guidelines", oneTimePrice: "$1,599", hasMonthly: false, hasOneTime: true },
    { category: "SMM", title: "SMM Starter", description: "12 posts per month + 2 short videos + Content Planning & posting", monthlyPrice: "$749", hasMonthly: true, hasOneTime: false },
    { category: "SMM", title: "SMM Growth", description: "16 posts + 4 reels + social kit", monthlyPrice: "$1249", hasMonthly: true, hasOneTime: false },
    { category: "SMM", title: "SMM Premium", description: "Engaging posts + 8 reels + 15 stories", monthlyPrice: "$1880", hasMonthly: true, hasOneTime: false },
    { category: "UGC Video Creation", title: "UGC Video (1 video)", description: "One user-generated content style video", oneTimePrice: "$399", hasMonthly: false, hasOneTime: true },
    { category: "UGC Video Creation", title: "UGC Video Pack (4 videos)", description: "Four user-generated content style videos", oneTimePrice: "$1,399", hasMonthly: false, hasOneTime: true },
    { category: "Reputation Management", title: "Review Boost System", description: "Reputation management and review generation system", monthlyPrice: "$199", hasMonthly: true, hasOneTime: false },
  ];

  // Transform flat addons array to grouped data structure using dynamic categories
  const data = useMemo(() => {
    const addonsToUse = globalAddons && globalAddons.length > 0 ? globalAddons : FALLBACK_ADDONS;
    
    // Create category display name mapping from API
    const categoryDisplayNames = {};
    const categoryOrderMap = {};
    if (categories && categories.length > 0) {
      categories.forEach(cat => {
        categoryDisplayNames[cat.id] = cat.displayName;
        categoryOrderMap[cat.id] = cat.order;
      });
    }
    
    // Group addons by category
    const grouped = addonsToUse.reduce((acc, addon) => {
      const categoryCode = addon.category;
      const categoryDisplayName = addon.categoryDisplayName || categoryDisplayNames[categoryCode] || categoryCode;
      
      if (!acc[categoryDisplayName]) {
        acc[categoryDisplayName] = {
          order: categoryOrderMap[categoryCode] || 999,
          items: []
        };
      }
      
      // Show prices exactly as they come from database - no formatting
      const formatPrice = (price) => {
        if (price === undefined || price === null || price === '') return undefined;
        if (typeof price === 'string') return price;
        if (typeof price === 'number') return `$${price}`;
        return undefined;
      };
      
      // Get formatted prices
      const monthlyPrice = addon.hasMonthly ? formatPrice(addon.monthlyPrice) : undefined;
      const oneTimePrice = addon.hasOneTime ? formatPrice(addon.oneTimePrice) : undefined;
      
      acc[categoryDisplayName].items.push({
        title: addon.title,
        description: addon.description,
        monthlyPrice: monthlyPrice,
        oneTimePrice: oneTimePrice,
        hasMonthly: addon.hasMonthly,
        hasOneTime: addon.hasOneTime,
      });
      return acc;
    }, {});

    // Convert to array format and sort by category order from database
    return Object.entries(grouped)
      .sort(([, a], [, b]) => a.order - b.order)
      .map(([category, data]) => ({
        category,
        items: data.items,
      }));
  }, [globalAddons, categories]);

  const showNotification = (message, type = "error") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddService = (service, category, paymentType) => {
    const result = addService({ ...service, category, paymentType });
    if (!result.success) {
      showNotification(result.message);
    }
  };

  const handleRemoveService = (service, category) => {
    const serviceId = `${category}-${service.title}`;
    removeService(serviceId);
  };

  const getServiceQuantity = (service, category) => {
    const serviceId = `${category}-${service.title}`;
    const existing = selectedServicesMap.get(serviceId);
    return existing ? existing.quantity : 0;
  };

  return (
    <section
      id="service-dashboard"
      className="bg-[#fcfcfc] min-h-screen py-8 sm:py-12  relative scroll md:mt-14"
    >
      {/* Notification Toast */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg animate-fade-in-right transition-all ${
            notification.type === "error"
              ? "bg-red-50 border border-red-200 text-red-800"
              : "bg-green-50 border border-green-200 text-green-800"
          }`}
        >
          <AlertCircle className="w-5 h-5" />
          <span className="text-base font-medium">{notification.message}</span>
        </div>
      )}

      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="mb-6 sm:mb-12 animate-fade-in-up text-center">
          <h1 className="text-3xl sm:text-[39px]  font-bold text-gray-900 mb-3 hero-title">
            Add-ons
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-4">
            Enhance your package with targeted add ons for accelerated growth.
          </p>

          {/* Services Count */}
          {/* {totals.servicesCount > 0 && (
            <div className="mt-4 inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-4 py-2">
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-base text-green-800 font-medium">
                {totals.servicesCount} service{totals.servicesCount > 1 ? 's' : ''} selected • 
                ${totals.monthlyTotal.toLocaleString()}/mo
              </span>
            </div>
          )} */}
        </header>

        {/* Service Categories */}
        {data.map((section, idx) => (
          <div
            key={idx}
            className="  mb-10 sm:mb-16 animate-fade-in-up"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 tracking-tight">
              {section.category}
            </h2>
            <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
              {section.items.map((item, itemIdx) => (
                <ServiceCard
                  key={itemIdx}
                  service={item}
                  category={section.category}
                  onAdd={(s, paymentType) =>
                    handleAddService(s, section.category, paymentType)
                  }
                  onRemove={(s) => handleRemoveService(s, section.category)}
                  quantity={getServiceQuantity(item, section.category)}
                  currentPaymentType={
                    servicePaymentTypes[`${section.category}-${item.title}`] ||
                    "month"
                  }
                  onPaymentTypeChange={(type) =>
                    setServicePaymentTypes((prev) => ({
                      ...prev,
                      [`${section.category}-${item.title}`]: type,
                    }))
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceDashboard;
