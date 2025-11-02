import Header from "@/components/Header";
import ServicesHero from "@/components/ServicesHero";
import ServicesOverview from "@/components/ServicesOverview";
import WebDevelopmentSection from "@/components/WebDevelopmentSection";
import AutomationSection from "@/components/AutomationSection";
import BrandServicesSection from "@/components/BrandServicesSection";
import BrandPartnerCarousel from "@/components/BrandPartnerCarousel";
import ProcessSteps from "@/components/ProcessSteps";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ServicesHero />
      <ServicesOverview />
      <WebDevelopmentSection />
      <AutomationSection />
      <BrandServicesSection />
      <BrandPartnerCarousel />
      <ProcessSteps />
      <CTASection />
      <Footer />
    </div>
  );
}
