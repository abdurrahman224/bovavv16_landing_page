import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const GlobalSettingsContext = createContext(null);

// API base URL - adjust based on your setup
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export function GlobalSettingsProvider({ children }) {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch global settings from API
  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/api/global-settings`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch global settings');
      }
      
      const result = await response.json();
      
      if (result.success) {
        setSettings(result.data);
      } else {
        throw new Error(result.error || 'Unknown error');
      }
    } catch (err) {
      console.error('Error fetching global settings:', err);
      setError(err.message);
      // Use fallback data if API fails
      setSettings(getFallbackSettings());
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch settings on mount
  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  // Refresh settings
  const refreshSettings = useCallback(() => {
    fetchSettings();
  }, [fetchSettings]);

  const value = {
    settings,
    loading,
    error,
    refreshSettings,
    
    // Convenient accessors
    packages: settings?.packages || {},
    addons: settings?.addons || {},
    addonsList: settings?.addonsList || [],
    categories: settings?.categories || [],
    clientLogos: settings?.clientLogos || [],
    partnershipLogos: settings?.partnershipLogos || [],
    teamContent: settings?.teamContent || null,
    planForCallItems: settings?.planForCallItems || []
  };

  return (
    <GlobalSettingsContext.Provider value={value}>
      {children}
    </GlobalSettingsContext.Provider>
  );
}

export function useGlobalSettings() {
  const context = useContext(GlobalSettingsContext);
  if (!context) {
    throw new Error('useGlobalSettings must be used within a GlobalSettingsProvider');
  }
  return context;
}

// Fallback settings if API fails
function getFallbackSettings() {
  return {
    packages: {
      starter: {
        id: 'starter',
        name: 'Starter',
        description: 'SEO + Local SEO (No PPC, No Website)',
        pricing: { lifetime: 1850, month: 1850 },
        price: 1850,
        recommended: false,
        features: [
          'Google Ads Management',
          'Conversion Tracking',
          'Google Maps Optimization',
          'Local On-Page',
          'Reporting'
        ]
      },
      growth: {
        id: 'growth',
        name: 'Growth',
        description: 'SEO + PPC + LP + Content Boost',
        pricing: { lifetime: 3450, month: 3450 },
        price: 3450,
        recommended: true,
        features: [
          'Google Ads Management',
          'SEO Optimization',
          'Google Maps SEO',
          'SEO Pages Creation',
          'Link Building',
          'AI Search Readiness',
          'Reporting & Insights'
        ]
      },
      scale: {
        id: 'scale',
        name: 'Scale',
        description: 'Full Stack Growth',
        pricing: { lifetime: 5750, month: 5750 },
        price: 5750,
        recommended: false,
        features: [
          'High-Budget Google Ads Management',
          'Aggressive SEO Growth',
          'Expanded Google Maps Presence',
          'Advanced AI Search Optimization',
          'Service & Location Coverage',
          'Content Expansion',
          'Advanced Link Building',
          'Priority Execution',
          'Reporting & Strategy'
        ]
      }
    },
    addons: {},
    addonsList: [],
    clientLogos: [
      { name: 'Hoval', src: '/Image/Hoval.png' },
      { name: 'HVAC Systems', src: '/Image/HVACSystems.png' },
      { name: 'Haiva', src: '/Image/Haiva.png' },
      { name: 'Brillux', src: '/Image/Brillux.png' },
      { name: 'Fabri', src: '/Image/Fabri.png' },
      { name: 'Afc', src: '/Image/Afc.png' }
    ],
    partnershipLogos: [
      { name: 'Meta', src: '/Image/Meta.png' },
      { name: 'YouTube', src: '/Image/YouTube.png' },
      { name: 'Google Partner', src: '/Image/GooglePartner.png' },
      { name: 'Microsoft', src: '/Image/Microsoft.png' },
      { name: 'Housecall Pro', src: '/Image/HousecallPro.png' },
      { name: 'Thumbtack', src: '/Image/Thumbtack.png' }
    ],
    teamContent: {
      subtitle: 'ARMA',
      title: 'OUR TEAM',
      paragraph1: 'At ARMA, we help contractors focus their marketing on their best customers and take action on their behalf to help them rank higher on Google so when customers are actually looking for them, they show up.',
      paragraph2: 'Guided by a team of Google specialized professionals taking vigorous monthly action on your behalf, you can save time and can feel confident like the smart business leader you are.'
    },
    planForCallItems: [
      { number: '01', title: 'Competitor Analysis', subtitle: 'Market landscape overview', description: 'A competitor analysis, also referred to as a competitive analysis, is the process of identifying competitors in your industry and researching their different marketing strategies.' },
      { number: '02', title: 'Gap Analysis', subtitle: 'Links, pages, and content gaps', description: 'A gap analysis helps a company assess its current state—by measuring time, money, and labor—and compare it with its target state.' },
      { number: '03', title: 'Technical SEO', subtitle: 'Site health assessment', description: 'Technical SEO refers to the behind-the-scenes elements that influence how search engines interact with a website.' },
      { number: '04', title: 'Recommendations', subtitle: 'Strategic action plan', description: 'The recommendations of a person or a committee are their suggestions or advice on what is the best thing to do.' },
      { number: '05', title: 'Pricing', subtitle: 'Packages and add-ons', description: 'The process of determining value exchange for products or services.' }
    ]
  };
}

export default GlobalSettingsContext;
