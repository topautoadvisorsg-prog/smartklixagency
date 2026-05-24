import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";
import Header from "@/components/Header";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import SEOMeta from "@/components/SEOMeta";
import AppsHero from "@/components/services/AppsHero";
import AppsProblem from "@/components/services/AppsProblem";
import WhatWeCreateApps from "@/components/services/WhatWeCreateApps";
import AppsTrustSystem from "@/components/services/AppsTrustSystem";
import AppsProcess from "@/components/services/AppsProcess";
import AppsFAQ from "@/components/services/AppsFAQ";

export default function AppsPage() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <div className="min-h-screen bg-background">
      <SEOMeta
        title={t.metadata.apps.title}
        description={t.metadata.apps.description}
        canonicalUrl="/services/apps"
      />
      <Header />
      <AppsHero />
      <AppsProblem />
      <WhatWeCreateApps />
      <AppsTrustSystem />
      <AppsProcess />
      <AppsFAQ />
      <CTASection
        title={t.appsPage.cta.title}
        description={t.appsPage.cta.description}
        primaryButtonText={t.appsPage.cta.primaryButton}
        secondaryButtonText={t.appsPage.cta.secondaryButton}
        secondaryButtonHref="#apps-process"
      />
      <Footer />
    </div>
  );
}
