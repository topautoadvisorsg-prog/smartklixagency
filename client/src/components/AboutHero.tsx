import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";

/**
 * SECTION: About Hero - Last updated Apr 2026
 * 
 * Full-bleed background image hero with centered headline, subtext, and CTAs.
 * Features a subtle dark overlay for readability, scroll-triggered entrance animations,
 * and smooth scroll to team/values sections.
 */
export default function AboutHero() {
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[70vh] md:min-h-[800px] pt-[140px] pb-24 overflow-hidden flex items-center justify-center"
      data-testid="section-about-hero"
    >
      {/* Full background image - sits behind everything via z-0, edge-to-edge */}
      <img
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
        src="/assets/about-hero-v2.png"
        alt=""
        aria-hidden="true"
      />

      {/* Subtle dark overlay for text readability */}
      <div
        className="absolute inset-0"
        style={{ zIndex: 1, background: "rgba(0, 0, 0, 0.45)" }}
      />

      {/* Hero content — positioned above image + overlay */}
      <div className="container mx-auto px-4 relative" style={{ zIndex: 2 }}>
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
          <h1
            className={`font-heading font-bold text-5xl md:text-6xl lg:text-7xl leading-tight text-white transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            data-testid="heading-hero-title"
          >
            {t.aboutPage.hero.title}
          </h1>

          <p
            className={`text-xl md:text-2xl text-gray-200 max-w-2xl transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            data-testid="text-hero-subtitle"
          >
            {t.aboutPage.hero.subtitle}
          </p>

          <div
            className={`flex flex-wrap justify-center gap-4 transition-all duration-700 delay-[400ms] ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <button
              onClick={() => scrollToSection("team-section")}
              className="inline-flex items-center justify-center min-h-12 px-8 text-base font-semibold rounded-md bg-[#F4B400] text-[#0D1B2A] hover:bg-[#F4B400]/90 border-none hover-elevate active-elevate-2 shadow-lg hover:shadow-[0_0_20px_rgba(244,180,0,0.4)] transition-all duration-300 relative overflow-hidden group"
              data-testid="button-meet-team"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10">{t.aboutPage.hero.ctaMeet}</span>
            </button>

            <button
              onClick={() => scrollToSection("values-section")}
              className="inline-flex items-center justify-center min-h-12 px-8 text-base font-semibold rounded-md bg-transparent text-white border border-white/50 hover:border-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
              data-testid="button-our-vision"
            >
              {t.aboutPage.hero.ctaVision}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
