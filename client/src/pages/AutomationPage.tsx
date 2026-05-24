import { useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";
import Header from "@/components/Header";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import SEOMeta from "@/components/SEOMeta";

// Extracted Service Components
// Extracted Service Components
import AutomationHero from "@/components/services/AutomationHero";
import AutomationProblem from "@/components/services/AutomationProblem";
import WhatWeAutomate from "@/components/services/WhatWeAutomate";
import NetworkHubSection from "@/components/services/NetworkHubSection";
import BeforeAfterSection from "@/components/services/BeforeAfterSection";
import AutomationProcess from "@/components/services/AutomationProcess";
import AutomationFAQ from "@/components/services/AutomationFAQ";

// ── Page Assembly ──────────────────────────────────────────
export default function AutomationPage() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <div className="min-h-screen bg-background">
      <SEOMeta 
        title={t.metadata.automation.title}
        description={t.metadata.automation.description}
        canonicalUrl="/services/automation"
      />
      <Header />
      <AutomationHero />
      <AutomationProblem />
      <WhatWeAutomate />
      <NetworkHubSection />
      <BeforeAfterSection />
      <AutomationProcess />
      <AutomationFAQ />
      <CTASection
        title={t.automationPage.cta.title}
        description={t.automationPage.cta.description}
        primaryButtonText={t.automationPage.cta.primaryButton}
        secondaryButtonText={t.automationPage.cta.secondaryButton}
        secondaryButtonHref="#automation-process"
      />
      <Footer />
    </div>
  );
}
