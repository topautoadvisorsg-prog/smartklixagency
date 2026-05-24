import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Palette, Droplets, Type, BookOpen } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export default function WhatWeBuild() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [ref, isVisible] = useScrollReveal();
  const icons: LucideIcon[] = [Palette, Droplets, Type, BookOpen];

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 bg-background"
      data-testid="section-what-we-build"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <h2
          className={`font-heading font-bold text-4xl md:text-5xl text-center text-foreground mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          {t.brandingPage.whatWeBuild.title}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.brandingPage.whatWeBuild.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className={`feature-card-service bg-card rounded-2xl p-8 border border-border transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                style={{ transitionDelay: `${300 + i * 100}ms` }}
              >
                <div className="mb-6">
                  <div className="w-14 h-14 rounded-xl bg-background shadow-sm border border-border flex items-center justify-center">
                    <Icon className="w-7 h-7 text-[#F4B400]" strokeWidth={1.5} />
                  </div>
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
