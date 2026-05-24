import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";
import ConstellationSphere from "./ConstellationSphere";

export default function MissionStorySection() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    const setupObserver = () => {
      if (mediaQuery.matches) {
        setIsVisible(true);
        if (observerRef.current) {
          observerRef.current.disconnect();
          observerRef.current = null;
        }
        return;
      }

      if (!observerRef.current && sectionRef.current) {
        observerRef.current = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
            }
          },
          { threshold: 0.2 }
        );
        observerRef.current.observe(sectionRef.current);
      }
    };

    setupObserver();

    const handleChange = () => {
      setupObserver();
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-gradient-to-br from-white via-blue-50/20 to-amber-50/10 dark:from-slate-950 dark:via-blue-950/20 dark:to-amber-950/10"
      data-testid="section-mission-story"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2
              className={`font-heading font-bold text-5xl md:text-6xl text-foreground transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              data-testid="heading-mission-title"
            >
              {t.aboutPage.mission.title}
            </h2>

            <div
              className={`space-y-4 text-xl text-muted-foreground transition-all duration-700 delay-200 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              data-testid="text-mission-content"
            >
              <p>
                {t.aboutPage.mission.content}
              </p>
            </div>
          </div>

          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="w-full h-[500px]">
              <ConstellationSphere size={500} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
