import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesPreview from "@/components/ServicesPreview";
import USPGrid from "@/components/USPGrid";
import WhyChooseSmartKlix from "@/components/WhyChooseSmartKlix";
import BrandPartnerCarousel from "@/components/BrandPartnerCarousel";
import HowSmartKlixWorks from "@/components/HowSmartKlixWorks";
import FreeConsultation from "@/components/FreeConsultation";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ServicesPreview />
      <USPGrid />
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
