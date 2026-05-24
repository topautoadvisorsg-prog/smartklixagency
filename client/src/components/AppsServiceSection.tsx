import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Smartphone, ShieldCheck, MessageSquare, TrendingUp } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";

export default function AppsServiceSection() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 lg:py-36 overflow-hidden bg-gradient-to-br from-white via-gray-50 to-blue-50/60 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
      data-testid="section-apps-service"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative order-2 lg:order-1 flex justify-center"
          >
            <div className="relative grid grid-cols-2 gap-4 w-full max-w-[540px]">
              {[
                { icon: Smartphone, label: t.servicesPage.apps.features.mobile.title },
                { icon: ShieldCheck, label: t.servicesPage.apps.features.trust.title },
                { icon: MessageSquare, label: t.servicesPage.apps.features.nurture.title },
                { icon: TrendingUp, label: t.servicesPage.apps.features.growth.title },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-border bg-card p-6 shadow-sm min-h-[150px] flex flex-col justify-between"
                    style={{ transform: i % 2 === 0 ? "translateY(18px)" : "translateY(-18px)" }}
                  >
                    <Icon className="w-9 h-9 text-[#F4B400]" strokeWidth={1.5} />
                    <p className="font-heading font-bold text-lg text-foreground">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <div
            className={`order-1 lg:order-2 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "0.2s" }}
          >
            <h2 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl leading-tight text-foreground mb-6">
              {t.servicesPage.apps.title}
            </h2>

            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
              {t.servicesPage.apps.description}
            </p>

            <Link href="/services/apps">
              <button
                className="inline-flex items-center justify-center min-h-10 px-8 text-base font-semibold rounded-md bg-[#F4B400] hover:bg-[#F4B400]/90 text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(244,180,0,0.4)] hover:-translate-y-1"
                data-testid="button-apps-service"
              >
                {language === "en" ? "Explore App Builds" : "Explorar Apps"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
