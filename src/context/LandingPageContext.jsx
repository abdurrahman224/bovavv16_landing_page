import React, { createContext, useContext, useState, useEffect } from 'react';

const LandingPageContext = createContext(null);

export const useLandingPage = () => {
  const context = useContext(LandingPageContext);
  if (!context) {
    throw new Error('useLandingPage must be used within a LandingPageProvider');
  }
  return context;
};

export const LandingPageProvider = ({ children, slug }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // Always start with loading
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeData = async () => {
      if (!slug) {
        // Show loading for 1 second even without slug
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
        return;
      }

      const fetchLandingPageData = async () => {
        try {
          setLoading(true);
          setError(null);
          
          const startTime = Date.now();
          const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
          const response = await fetch(`${baseUrl}/c/${slug}`);
          
          if (!response.ok) {
            throw new Error('Landing page not found');
          }
          
          const result = await response.json();
          
          if (result.success && result.data) {
            setData(result.data);
            // debug: log loaded landing page data (helps verify imagePath values)
            // Remove this log after debugging
            console.debug('LandingPageProvider loaded data for slug:', slug, result.data);
          } else {
            throw new Error('Invalid response format');
          }

          // Ensure loading screen shows for at least 1 second for better UX
          const elapsedTime = Date.now() - startTime;
          const minDisplayTime = 1000;
          if (elapsedTime < minDisplayTime) {
            await new Promise(resolve => setTimeout(resolve, minDisplayTime - elapsedTime));
          }
        } catch (err) {
          console.error('Error fetching landing page data:', err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      await fetchLandingPageData();
    };

    initializeData();
  }, [slug]);

  // Helper function to get section data by type
  const getSectionData = (sectionType) => {
    if (!data || !data.sections) return null;
    return data.sections.find(section => section.sectionType === sectionType);
  };

  // Check if we have valid dynamic data
  const hasDynamicData = !!data && !error;

  const value = {
    data,
    loading,
    error,
    slug,
    hasDynamicData,
    getSectionData,
    clientName: data?.clientName,
    companyName: data?.companyName,
    date: data?.date,
  };

  return (
    <LandingPageContext.Provider value={value}>
      {children}
    </LandingPageContext.Provider>
  );
};

export default LandingPageContext;
