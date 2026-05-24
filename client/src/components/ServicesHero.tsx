import { motion } from "framer-motion";
import LinkButton from "./LinkButton";
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";

/**
 * SECTION: Services Hero - Last updated Nov 2025
 * 
 * Two-column premium layout featuring:
 * - Left: Bold headline with service pillars, description, dual CTAs
 * - Right: 3D golden geodesic sphere with rotating wireframe and fixed service labels
 * 
 * Design: White-to-gray gradient background, golden sphere with depth effects
 * Animations: Fade-up stagger on text elements, continuous sphere rotation
 */
export default function ServicesHero() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  
  return (
    <section className="relative pt-[100px] md:pt-[140px] pb-[75px] md:pb-[80px] overflow-hidden">
      {/* NEW SERVICES BACKGROUND HERO - Dedicated Services page image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ zIndex: 0 }}>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/branding-hero-assets/new-services-background-hero.png')" }}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="container mx-auto px-8 md:px-8 lg:px-12 relative z-10 flex flex-col items-center justify-center min-h-[600px] text-center">
        {/* Centered Content Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl leading-tight text-white drop-shadow-lg mb-6"
          >
            {t.servicesPage.hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8 text-sm md:text-base font-semibold uppercase tracking-[0.2em] text-[#F4B400]"
          >
            {t.servicesPage.hero.pillars.websites} / {t.servicesPage.hero.pillars.apps} / {t.servicesPage.hero.pillars.automation} / {t.servicesPage.hero.pillars.branding}
          </motion.p>

          {/* CTA Buttons | Centered */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-4 pt-2 justify-center"
          >
            <LinkButton
              href="#services"
              variant="primary"
              size="lg"
              data-testid="button-explore-services"
            >
              {t.nav.services}
            </LinkButton>
            <LinkButton
              href="/contact#contact-form"
              variant="outline"
              size="lg"
              data-testid="button-free-consultation"
            >
              {t.hero.ctaPrimary}
            </LinkButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
