import { useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";
import Header from "@/components/Header";
import ServicesHero from "@/components/ServicesHero";
import ServicesOverview from "@/components/ServicesOverview";
import WebDevelopmentSection from "@/components/WebDevelopmentSection";
import AutomationSection from "@/components/AutomationSection";
import BrandServicesSection from "@/components/BrandServicesSection";
import BrandPartnerCarousel from "@/components/BrandPartnerCarousel";
import ProcessSteps from "@/components/ProcessSteps";
import CTASection from "@/components/CTASection";
import GoogleReviewCTA from "@/components/GoogleReviewCTA";
import Footer from "@/components/Footer";
import SEOMeta from "@/components/SEOMeta";
import AppsServiceSection from "@/components/AppsServiceSection";

export default function ServicesPage() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <div className="min-h-screen bg-background">
      <SEOMeta 
        title={t.metadata.services.title}
        description={t.metadata.services.description}
        canonicalUrl="/services"
      />
      <Header />
      <ServicesHero />
      <ServicesOverview />
      <ProcessSteps />
      <WebDevelopmentSection />
      <AppsServiceSection />
      <AutomationSection />
      <BrandServicesSection />
      <CTASection />
      <Footer />
    </div>
  );
}
