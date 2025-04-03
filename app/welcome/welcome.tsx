import ClientShowcase from "~/components/client-showcase";
import HeroSection from "~/components/hero-section";
import Navbar from "~/components/navbar";
import AboutSection from "~/components/about-section";
import BenefitsSection from "~/components/benefit-section";
import IntegrationSection from "~/components/integration-section";
import ServicesSection from "~/components/service-section";
import TransformingSection from "~/components/transforming-section";
import ConnectSection from "~/components/connect-section";
import FeaturesTimeline from "~/components/feature-timeline";
import TestimonialSlider from "~/components/testimonial-slider";
import EmployeeStories from "~/components/employee-stories";
import NewsFeature from "~/components/news-feature";
import PartnerCompanies from "~/components/partner-comapanies";
import TeamMembers from "~/components/team-members";
import ComparisonSection from "~/components/comparison-section";
import InsightsSection from "~/components/insight-section";
import FAQSection from "~/components/faq-section";
import VideoSection from "~/components/video-section";
import Footer from "~/components/footer";
import NewsletterSection from "~/components/newsletter-section";
import CTASection from "~/components/cta-section";
import HelpModal from "~/components/help-modal";
import RequestDemo from "~/components/request-demo";

export function Welcome() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-gray-800 antialiased">
      <Navbar />
      <div className="flex-1 md:pt-[130px]">
        <HeroSection />
        <ClientShowcase />
        <AboutSection />
        <BenefitsSection />
        <TransformingSection />
        <ServicesSection />
        <IntegrationSection />
        <ConnectSection />
        <FeaturesTimeline />
        <TestimonialSlider />
        <EmployeeStories />
        <VideoSection />
        <NewsFeature />
        <PartnerCompanies />
        <TeamMembers />
        <ComparisonSection />
        <InsightsSection />
        <FAQSection />
        <NewsletterSection />
        <CTASection />
        <RequestDemo />
      </div>
      <Footer />

      {/* Help Modal that appears after page load */}
      <HelpModal delayTime={3000} />
    </div>
  );
}
