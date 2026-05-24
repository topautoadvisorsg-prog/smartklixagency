import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";
import LinkButton from "@/components/LinkButton";

export default function BrandingHero() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <section
      className="relative min-h-[70vh] md:min-h-[700px] pt-[140px] pb-24 overflow-hidden flex items-center justify-center bg-background"
      data-testid="section-branding-hero"
    >
      {/* Hero background image - full visibility with proper responsiveness */}
      <div
        className="absolute inset-0 bg-background"
        style={{ zIndex: 0 }}
      >
        {/* Background image layer */}
        <div 
          className="absolute inset-0"
          style={{ 
            backgroundImage: "url('/assets/branding-hero-assets/hero-brand-section.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.15
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative" style={{ zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8"
        >
          <div className="inline-block mb-2 px-4 py-1.5 rounded-full bg-muted border border-border">
            <span className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
              Brand Identity Design
            </span>
          </div>
          <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl leading-tight text-foreground">
            {t.brandingPage.hero.title}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4B400] to-orange-400">
              {t.brandingPage.hero.titleAccent}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-light leading-relaxed">
            {t.brandingPage.hero.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <LinkButton href="/contact#contact-form" variant="primary" size="xl">
              {t.brandingPage.hero.ctaPrimary}
            </LinkButton>
            <button
              onClick={() => document.getElementById("branding-process")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center justify-center min-h-14 px-10 text-lg font-semibold rounded-md bg-card text-foreground border border-border hover:border-border hover:bg-muted transition-all duration-300 shadow-sm hover:shadow"
            >
              {t.brandingPage.hero.ctaSecondary}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
