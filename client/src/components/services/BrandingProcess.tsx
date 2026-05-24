import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Compass, Target, PenTool, Package } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export default function BrandingProcess() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [ref, isVisible] = useScrollReveal();
  const icons: LucideIcon[] = [Compass, Target, PenTool, Package];

  return (
    <section
      ref={ref}
      id="branding-process"
      className="py-20 md:py-28 bg-muted relative overflow-hidden"
      data-testid="section-branding-process"
    >
      <div className="absolute inset-0 light-sweep-bg" style={{ zIndex: 0 }} />
      <div className="container mx-auto px-4 max-w-5xl relative" style={{ zIndex: 1 }}>
        <h2
          className={`font-heading font-bold text-4xl md:text-5xl text-center text-foreground mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          {t.brandingPage.process.title}
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {t.brandingPage.process.steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className={`flex flex-col items-center text-center process-step-card transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                style={{ transitionDelay: `${300 + i * 150}ms` }}
              >
                <div className="relative mb-6">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#0D1B2A] flex items-center justify-center shadow-lg transform transition-transform hover:rotate-12 duration-500">
                    <div className="absolute inset-2 border border-[#F4B400]/30 rounded-full" />
                    <Icon className="w-10 h-10 md:w-12 md:h-12 text-[#F4B400]" strokeWidth={1} />
                  </div>
                </div>
                <h3 className="font-heading font-bold text-xl text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
