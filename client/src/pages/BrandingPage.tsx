import { useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";
import Header from "@/components/Header";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import SEOMeta from "@/components/SEOMeta";

// Extracted Service Components
import BrandingHero from "@/components/services/BrandingHero";
import BrandingProblem from "@/components/services/BrandingProblem";
import WhatWeBuild from "@/components/services/WhatWeBuild";
import BrandingStats from "@/components/services/BrandingStats";
import BrandingProcess from "@/components/services/BrandingProcess";
import BrandingFAQ from "@/components/services/BrandingFAQ";

// ── Page Assembly ──────────────────────────────────────────
export default function BrandingPage() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <div className="min-h-screen bg-background">
      <SEOMeta 
        title={t.metadata.branding.title}
        description={t.metadata.branding.description}
        canonicalUrl="/services/branding"
      />
      <Header />
      <BrandingHero />
      <BrandingProblem />
      <WhatWeBuild />
      <BrandingStats />
      <BrandingProcess />
      <BrandingFAQ />
      <CTASection
        title={t.brandingPage.cta.title}
        description={t.brandingPage.cta.description}
        primaryButtonText={t.brandingPage.cta.primaryButton}
        secondaryButtonText={t.brandingPage.cta.secondaryButton}
        secondaryButtonHref="#branding-process"
      />
      <Footer />
    </div>
  );
}
