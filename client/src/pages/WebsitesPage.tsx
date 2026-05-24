import { useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";
import Header from "@/components/Header";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import SEOMeta from "@/components/SEOMeta";

// Extracted Service Components
import WebsitesHero from "@/components/services/WebsitesHero";
import WebsitesProblem from "@/components/services/WebsitesProblem";
import WebsitesSolution from "@/components/services/WebsitesSolution";
import WebsitesFeatures from "@/components/services/WebsitesFeatures";
import WebsitesProcess from "@/components/services/WebsitesProcess";
import WebsitesFAQ from "@/components/services/WebsitesFAQ";

// ── Page Assembly ──────────────────────────────────────────

export default function WebsitesPage() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <div className="min-h-screen bg-background">
      <SEOMeta 
        title={t.metadata.websites.title}
        description={t.metadata.websites.description}
        canonicalUrl="/services/websites"
      />
      <Header />
      <WebsitesHero />
      <WebsitesProblem />
      <WebsitesSolution />
      <WebsitesFeatures />
      <WebsitesProcess />
      <WebsitesFAQ />
      <CTASection
        title={t.websitesPage.cta.title}
        description={t.websitesPage.cta.description}
        primaryButtonText={t.websitesPage.cta.primaryButton}
        secondaryButtonText={t.websitesPage.cta.secondaryButton}
        secondaryButtonHref="#websites-process"
      />
      <Footer />
    </div>
  );
}
