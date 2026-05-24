import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function BrandingProblem() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [ref, isVisible] = useScrollReveal();

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 bg-muted relative overflow-hidden"
      data-testid="section-branding-problem"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <h2
          className={`font-heading font-bold text-4xl md:text-5xl text-center text-foreground mb-16 leading-tight transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {t.brandingPage.problem.title}
        </h2>

        <div className="space-y-6">
          {t.brandingPage.problem.points.map((point, i) => (
            <div
              key={i}
              className={`bg-card rounded-xl p-8 border border-card-border shadow-sm transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${300 + i * 150}ms` }}
            >
              <h3 className="font-heading font-bold text-xl text-foreground mb-2">{point.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
