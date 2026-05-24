import { useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesPreview from "@/components/ServicesPreview";
import WhyChooseSmartKlix from "@/components/WhyChooseSmartKlix";
import BrandPartnerCarousel from "@/components/BrandPartnerCarousel";
import HowSmartKlixWorks from "@/components/HowSmartKlixWorks";
import FreeConsultation from "@/components/FreeConsultation";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import SEOMeta from "@/components/SEOMeta";

export default function HomePage() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <div className="min-h-screen bg-background">
      <SEOMeta 
        title={t.metadata.home.title}
        description={t.metadata.home.description}
        canonicalUrl="/"
      />
      <Header />
      <Hero />
      <ServicesPreview />
      <WhyChooseSmartKlix />
      <BrandPartnerCarousel />
      <HowSmartKlixWorks />
      <FreeConsultation />
      <FAQAccordion />
      <CTASection />
      <Footer />
    </div>
  );
}
