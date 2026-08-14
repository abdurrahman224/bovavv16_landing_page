import { useParams } from "react-router";
import ActionPlan from "./ActionPlan/ActionPlan";
import "./App.css";
import BrandingSlide from "./BrandingSlide/BrandingSlide";
import CompetitiveAnalysis from "./CompetitiveAnalysis/CompetitiveAnalysis";
import SmoothScroll from "./Components/utility/SmoothScroll";
import ScrollToTopButton from "./Components/utility/ScrollToTopButton";
import ScrollToPaymentButton from "./Components/utility/ScrollToPaymentButton";
import ScrollToSignButton from "./Components/utility/ScrollToSignButton";
import LoadingScreen from "./Components/LoadingScreen/LoadingScreen";
import { BillingProvider } from "./context/BillingContext";
import { LandingPageProvider, useLandingPage } from "./context/LandingPageContext";
import { GlobalSettingsProvider } from "./context/GlobalSettingsContext";
import EnhancePackage from "./EnhancePackage/EnhancePackage";
import FooterSection from "./FooterSection/FooterSection";
import GapAnalysisDashboard from "./GapAnalysisDashboard/GapAnalysisDashboard";
import GoogleReviewsChart from "./GoogleReviewsChart/GoogleReviewsChart";
import Header from "./Header/Header";
import HealthDashboard from "./HealthDashboard/HealthDashboard";
import Hero from "./Hero/Hero";
import MarketingChannels from "./MarketingChannels/MarketingChannels";
import Pages_Analysis from "./Pages_Analysis/Pages_Analysis";
import PlanForCall from "./PlanForCall/PlanForCall";
import PricingPackage from "./PricingPackage/PricingPackage";
import PricingSummary from "./PricingSummary/PricingSummary";
import ServiceDashboard from "./ServiceDashboard/ServiceDashboard";
import Social_Media from "./Social_Media/Social_Media";
import Team_and_Clients from "./Team_and_Clients/Team_and_Clients";
import TermsAndConditions from "./TermsAndConditions/TermsAndConditions";
import Testimonials from "./Testimonials/Testimonials";
import TrafficShare from "./TrafficShare/TrafficShare";
import FinalAmount from "./FinalAmount/FinalAmount";

// Inner component that has access to LandingPageContext
function AppContent() {
  const { loading } = useLandingPage();

  console.log('AppContent - loading state:', loading);

  // Show loading screen while data is being fetched
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <BillingProvider>
      <div className="bg-black">
        <Header />
        <Hero />
        <Team_and_Clients />
        <PlanForCall />
        <TrafficShare />
        {/* <CompetitiveAnalysis /> */}
        <MarketingChannels />
        <GapAnalysisDashboard />

        <Pages_Analysis />
        <GoogleReviewsChart />
        <BrandingSlide />
        <Social_Media />
        {/* <HealthDashboard /> */}
        <ActionPlan />
        <Testimonials />
        <PricingPackage />

        <EnhancePackage />

        <ServiceDashboard />
        <PricingSummary />

        <TermsAndConditions />

        <FinalAmount />

        <FooterSection />
      </div>
      <ScrollToTopButton />
      <ScrollToSignButton />
      {/* <ScrollToPaymentButton /> */}
    </BillingProvider>
  );
}

function App() {
  const { slug } = useParams();

  return (
    <SmoothScroll>
      <GlobalSettingsProvider>
        <LandingPageProvider slug={slug}>
          <AppContent />
        </LandingPageProvider>
      </GlobalSettingsProvider>
    </SmoothScroll>
  );
}

export default App;
