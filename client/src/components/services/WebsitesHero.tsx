import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";
import LinkButton from "@/components/LinkButton";

export default function WebsitesHero() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <section
      className="relative min-h-[70vh] md:min-h-[700px] pt-[140px] pb-24 overflow-hidden flex items-center justify-center"
      data-testid="section-websites-hero"
    >
      {/* Shared Background Image Layer - NEW hero image */}
      <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/branding-hero-assets/hero-website-landing-page-new.png')" }}
        />
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="container mx-auto px-4 relative" style={{ zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8"
        >
          <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl leading-tight">
            <span className="text-[#F4B400]">{t.websitesPage.hero.title}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl">
            {t.websitesPage.hero.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <LinkButton href="/contact#contact-form" variant="primary" size="xl">
              {t.websitesPage.hero.ctaPrimary}
            </LinkButton>
            <button
              onClick={() => document.getElementById("websites-process")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center justify-center min-h-14 px-10 text-lg font-semibold rounded-md bg-transparent text-white border border-white/50 hover:border-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
            >
              {t.websitesPage.hero.ctaSecondary}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
