import { useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";
import Header from "@/components/Header";
import ContactHero from "@/components/ContactHero";
import ContactInfoHours from "@/components/ContactInfoHours";
import ContactUs from "@/components/ContactUs";
import FAQAccordion from "@/components/FAQAccordion";
import GoogleReviewCTA from "@/components/GoogleReviewCTA";
import Footer from "@/components/Footer";
import SEOMeta from "@/components/SEOMeta";

export default function ContactPage() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <div className="min-h-screen bg-background">
      <SEOMeta 
        title={t.metadata.contact.title}
        description={t.metadata.contact.description}
        canonicalUrl="/contact"
      />
      <Header />
      <ContactHero />
      <ContactInfoHours />
      <ContactUs />
      <FAQAccordion />
      <Footer />
    </div>
  );
}
