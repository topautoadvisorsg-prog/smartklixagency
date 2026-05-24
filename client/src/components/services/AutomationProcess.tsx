import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Map, Wrench, Cpu, LineChart } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export default function AutomationProcess() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [ref, isVisible] = useScrollReveal();
  const icons: LucideIcon[] = [Map, Wrench, Cpu, LineChart];

  return (
    <section
      ref={ref}
      id="automation-process"
      className="py-20 md:py-28 bg-gradient-to-b from-background to-muted relative overflow-hidden"
      data-testid="section-automation-process"
    >
      <div className="absolute inset-0 light-sweep-bg" style={{ zIndex: 0 }} />
      <div className="container mx-auto px-4 max-w-5xl relative" style={{ zIndex: 1 }}>
        <h2
          className={`font-heading font-bold text-4xl md:text-5xl text-center text-foreground mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          {t.automationPage.process.title}
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {t.automationPage.process.steps.map((step, i) => {
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
