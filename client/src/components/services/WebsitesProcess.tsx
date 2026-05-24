import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { FileSearch, Code, Rocket, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export default function WebsitesProcess() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [ref, isVisible] = useScrollReveal();
  const icons: LucideIcon[] = [FileSearch, Code, Rocket, Zap];

  return (
    <section
      ref={ref}
      id="websites-process"
      className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
      data-testid="section-websites-process"
    >
      <div className="absolute inset-0 light-sweep-bg" style={{ zIndex: 0 }} />
      <div className="container mx-auto px-4 max-w-5xl relative" style={{ zIndex: 1 }}>
        <h2
          className={`font-heading font-bold text-4xl md:text-5xl text-center text-foreground mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          {t.websitesPage.process.title}
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {t.websitesPage.process.steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className={`flex flex-col items-center text-center process-step-card transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                style={{ transitionDelay: `${300 + i * 150}ms` }}
              >
                <div className="relative mb-6">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#F4B400] flex items-center justify-center badge-glow-pulse shadow-lg">
                    <Icon className="w-10 h-10 md:w-14 md:h-14 text-white" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="font-heading font-bold text-xl text-[#0D1B2A] mb-3">{step.title}</h3>
                <p className="text-[#4F4F4F] leading-relaxed text-sm">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
