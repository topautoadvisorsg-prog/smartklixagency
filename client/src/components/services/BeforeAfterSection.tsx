import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { X, Check } from "lucide-react";

export default function BeforeAfterSection() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [ref, isVisible] = useScrollReveal();

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden"
      data-testid="section-before-after"
    >
      <div className="container mx-auto px-4 max-w-5xl">
        <h2
          className={`font-heading font-bold text-4xl md:text-5xl text-center text-foreground mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          {t.automationPage.beforeAfter.title}
        </h2>

        <div className="space-y-0">
          {/* Header row */}
          <div
            className={`hidden md:grid grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 items-center mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <div className="text-center">
              <span className="inline-flex items-center gap-2 text-sm font-bold text-red-400 uppercase tracking-wider">
                <X className="w-4 h-4" /> Before
              </span>
            </div>
            <div className="w-px" />
            <div className="text-center">
              <span className="inline-flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-wider">
                <Check className="w-4 h-4" /> After
              </span>
            </div>
          </div>

          {/* Comparison rows */}
          {t.automationPage.beforeAfter.rows.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 items-stretch mb-6 md:mb-0 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              style={{ transitionDelay: `${400 + i * 100}ms` }}
            >
              {/* Before */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                className="bg-red-50 border border-red-100 rounded-xl p-5 md:p-6"
              >
                <span className="inline-flex md:hidden items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-wider mb-3">
                  <X className="w-4 h-4" /> Before
                </span>
                <p className="text-red-700 text-sm md:text-base leading-relaxed">{row.before}</p>
              </motion.div>

              {/* Center divider */}
              <div className="hidden md:flex items-center justify-center">
                <div className="w-px h-full bg-gradient-to-b from-transparent via-[#F4B400] to-transparent before-after-divider" />
              </div>

              {/* After */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 md:p-6"
              >
                <span className="inline-flex md:hidden items-center gap-2 text-xs font-bold text-emerald-500 uppercase tracking-wider mb-3">
                  <Check className="w-4 h-4" /> After
                </span>
                <p className="text-emerald-700 text-sm md:text-base leading-relaxed">{row.after}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
