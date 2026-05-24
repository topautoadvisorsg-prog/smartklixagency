import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import LinkButton from "@/components/LinkButton";
import { ArrowRight } from "lucide-react";

export default function WebsitesSolution() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [ref, isVisible] = useScrollReveal();

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 bg-gradient-to-br from-background via-muted/50 to-accent/20"
      data-testid="section-websites-solution"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          <div
            className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground mb-6">
              {t.websitesPage.solution.title}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              {t.websitesPage.solution.description}
            </p>
            <LinkButton href="/contact#contact-form" variant="primary" size="xl">
              {t.websitesPage.hero.ctaPrimary}
              <ArrowRight className="ml-2 w-5 h-5" />
            </LinkButton>
          </div>

          {/* Floating Video Visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-[580px] filter drop-shadow-[0_20px_40px_rgba(59,130,246,0.15)] group">
              <div className="rounded-2xl overflow-hidden border border-border shadow-2xl bg-card">
                <video
                  src="/assets/website-services-hero.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
