import { motion } from "framer-motion";
import { BriefcaseBusiness, Globe, Smartphone, Sparkles, UsersRound } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";
import LinkButton from "@/components/LinkButton";

export default function AppsHero() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const highlightIcons = [Smartphone, Globe, BriefcaseBusiness, UsersRound];

  return (
    <section
      className="relative min-h-[78vh] md:min-h-[780px] pt-[140px] pb-24 overflow-hidden flex items-center bg-[#060914]"
      data-testid="section-apps-hero"
    >
      <img
        src="/assets/apps-hero-v3.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center"
        style={{ zIndex: 0 }}
      />
      <div className="absolute inset-0 bg-[#050813]/45" style={{ zIndex: 1 }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050813]/70 via-[#050813]/25 to-[#050813]/80" style={{ zIndex: 1 }} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050813]/80 via-transparent to-[#050813]/10" style={{ zIndex: 1 }} />

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" style={{ zIndex: 1 }} />

      <div className="container mx-auto px-4 relative" style={{ zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white">
            <Sparkles className="w-4 h-4 text-[#7C5CFF]" />
            <span className="text-sm font-semibold tracking-wider uppercase">{t.appsPage.hero.badge}</span>
          </div>

          <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl leading-tight text-white mb-7 max-w-4xl mx-auto drop-shadow-lg">
            {t.appsPage.hero.title}
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-gray-100 leading-relaxed max-w-3xl mx-auto mb-8 drop-shadow">
            {t.appsPage.hero.subtitle}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10 max-w-3xl mx-auto">
            {t.appsPage.hero.highlights.map((highlight, index) => {
              const Icon = highlightIcons[index] ?? Sparkles;
              return (
              <div
                key={highlight}
                className="min-h-[104px] rounded-xl border border-white/15 bg-[#050813]/45 px-4 py-4 flex flex-col items-center justify-center gap-3 backdrop-blur-sm"
              >
                <Icon className="h-7 w-7 text-[#8A6CFF]" strokeWidth={1.7} />
                <span className="text-sm md:text-base font-semibold text-white leading-snug">{highlight}</span>
              </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <LinkButton href="/contact#contact-form" variant="primary" size="xl">
              {t.appsPage.hero.ctaPrimary}
            </LinkButton>
            <button
              onClick={() => document.getElementById("apps-process")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center justify-center min-h-14 px-10 text-lg font-semibold rounded-md bg-transparent text-white border border-white/50 hover:border-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
            >
              {t.appsPage.hero.ctaSecondary}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
