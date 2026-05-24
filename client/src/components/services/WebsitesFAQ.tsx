import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function WebsitesFAQ() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [ref, isVisible] = useScrollReveal();
  const [openItem, setOpenItem] = useState<number | null>(0);

  return (
    <section
      ref={ref}
      className="py-20 md:py-24 bg-background"
      data-testid="section-websites-faq"
    >
      <div className="container mx-auto px-4 max-w-[800px]">
        <h2
          className={`font-heading font-bold text-4xl md:text-5xl text-center text-card-foreground mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          {t.websitesPage.faq.title}
        </h2>

        <div
          className={`border-t border-border transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          {t.websitesPage.faq.questions.map((faq, i) => (
            <div key={i} className="border-b border-border">
              <button
                onClick={() => setOpenItem(openItem === i ? null : i)}
                className="w-full flex items-center justify-between py-6 text-left font-heading font-semibold text-lg md:text-xl text-card-foreground hover:text-sidebar-primary transition-colors"
              >
                <span className="pr-4">{faq.question}</span>
                <span className={`text-sidebar-primary transition-transform duration-300 ${openItem === i ? "rotate-45" : ""}`}>
                  +
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${openItem === i ? "max-h-40 pb-6" : "max-h-0"
                  }`}
              >
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
