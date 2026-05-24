import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";
import LinkButton from "@/components/LinkButton";

export default function AutomationHero() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <section
      className="relative min-h-[70vh] md:min-h-[700px] pt-[140px] pb-24 overflow-hidden flex items-center justify-center"
      data-testid="section-automation-hero"
    >
      {/* High-quality background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/assets/hero-automation.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      {/* Visual overlay for contrast */}
      <div className="absolute inset-0 bg-[#0D1B2A]/60 z-[1]" />

      <div className="container mx-auto px-4 relative" style={{ zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8"
        >
          <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl leading-tight text-white">
            {t.automationPage.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl">
            {t.automationPage.hero.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <LinkButton href="/contact#contact-form" variant="primary" size="xl">
              {t.automationPage.hero.ctaPrimary}
            </LinkButton>
            <button
              onClick={() => document.getElementById("automation-process")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center justify-center min-h-14 px-10 text-lg font-semibold rounded-md bg-transparent text-white border border-white/50 hover:border-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
            >
              <span className="relative z-10">{t.automationPage.hero.ctaSecondary}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
