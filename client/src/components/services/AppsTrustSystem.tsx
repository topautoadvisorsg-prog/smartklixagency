import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function AppsTrustSystem() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [ref, isVisible] = useScrollReveal();

  return (
    <section ref={ref} className="py-20 md:py-28 bg-[#0D1B2A] text-white" data-testid="section-apps-trust-system">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-[0.85fr_1fr] gap-12 lg:gap-16 items-center">
          <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="text-[#F4B400] font-semibold uppercase tracking-wider mb-4">{t.appsPage.trust.eyebrow}</p>
            <h2 className="font-heading font-bold text-4xl md:text-5xl leading-tight mb-6">{t.appsPage.trust.title}</h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">{t.appsPage.trust.description}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {t.appsPage.trust.items.map((item, i) => (
              <div key={item} className={`rounded-xl border border-white/10 bg-white/[0.06] p-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${250 + i * 100}ms` }}>
                <CheckCircle2 className="w-6 h-6 text-[#F4B400] mb-4" />
                <p className="font-medium leading-relaxed text-gray-100">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
