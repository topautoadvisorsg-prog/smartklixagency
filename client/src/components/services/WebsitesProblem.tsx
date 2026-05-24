import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Clock, AlertTriangle, MonitorX } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export default function WebsitesProblem() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [ref, isVisible] = useScrollReveal();
  const icons: LucideIcon[] = [Clock, AlertTriangle, MonitorX];

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 bg-gradient-to-br from-[#0D1B2A] via-[#122A4A] to-[#0D1B2A] relative overflow-hidden"
      data-testid="section-websites-problem"
    >
      <div className="container mx-auto px-4">
        <h2
          className={`font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-center text-white mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          {t.websitesPage.problem.title}
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {t.websitesPage.problem.points.map((point, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className={`problem-card bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                style={{ transitionDelay: `${300 + i * 150}ms` }}
              >
                <div className="mb-6 flex justify-center">
                  <Icon className="w-12 h-12 text-[#F4B400] icon-pulse-slow" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading font-bold text-xl text-white mb-3">{point.title}</h3>
                <p className="text-gray-400 leading-relaxed">{point.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
