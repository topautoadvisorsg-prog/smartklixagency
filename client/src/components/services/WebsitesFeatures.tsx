import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Smartphone, Zap, Search, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export default function WebsitesFeatures() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [ref, isVisible] = useScrollReveal();
  const icons: LucideIcon[] = [Smartphone, Zap, Search, Target];

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 bg-gradient-to-b from-muted to-background"
      data-testid="section-websites-features"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <h2
          className={`font-heading font-bold text-4xl md:text-5xl text-center text-foreground mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          {t.websitesPage.features.title}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.websitesPage.features.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className={`feature-card-service bg-card rounded-2xl p-8 border border-border text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                style={{ transitionDelay: `${300 + i * 100}ms` }}
              >
                <div className="mb-5 flex justify-center">
                  <Icon className="w-12 h-12 text-[#F4B400] icon-pulse-slow" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading font-bold text-lg text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
