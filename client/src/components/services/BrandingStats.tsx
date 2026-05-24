import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";

export default function BrandingStats() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [ref, isVisible] = useScrollReveal(0.3); // Reveal slightly later

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 bg-background border-b border-border"
      data-testid="section-branding-stats"
    >
      <div className="container mx-auto px-4 max-w-5xl">
        <h2
          className={`font-heading font-bold text-3xl md:text-4xl text-center text-foreground mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          {t.brandingPage.stats.title}
        </h2>

        <div className={`max-w-3xl mx-auto text-center transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-2xl md:text-3xl lg:text-4xl font-heading font-medium text-foreground leading-tight">
            {t.brandingPage.stats.description}
          </p>
          <div className="mt-8 w-24 h-1 bg-[#F4B400] mx-auto rounded-full" />
        </div>
      </div>
    </section>
  );
}
