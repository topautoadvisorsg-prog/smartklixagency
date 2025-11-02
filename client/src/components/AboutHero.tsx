import { useState, useEffect, useRef } from "react";
import LinkButton from "./LinkButton";

export default function AboutHero() {
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
      className="relative pt-[140px] pb-24 overflow-hidden"
      data-testid="section-about-hero"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-amber-50/20 dark:from-slate-950 dark:via-blue-950/30 dark:to-amber-950/20 -z-10" />

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center min-h-[600px]">
          <div className="space-y-8">
            <h1
              className={`font-heading font-bold text-5xl md:text-6xl leading-tight text-foreground transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              data-testid="heading-hero-title"
            >
              The Humans and Systems Powering Tomorrow's Businesses
            </h1>

            <p
              className={`text-xl text-muted-foreground max-w-lg transition-all duration-700 delay-200 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              data-testid="text-hero-subtitle"
            >
              From small teams to growing enterprises, SmartKlix designs
              intelligent systems that help people work smarter, scale faster,
              and thrive globally.
            </p>

            <div
              className={`flex flex-wrap gap-4 transition-all duration-700 delay-[400ms] ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <button
                onClick={() => scrollToSection("team-section")}
                className="inline-flex items-center justify-center min-h-12 px-8 text-base font-semibold rounded-md bg-primary text-primary-foreground border border-primary-border hover-elevate active-elevate-2 transition-all duration-300 relative overflow-hidden group"
                data-testid="button-meet-team"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative z-10">Meet the Team</span>
              </button>

              <button
                onClick={() => scrollToSection("values-section")}
                className="inline-flex items-center justify-center min-h-12 px-8 text-base font-semibold rounded-md bg-transparent text-foreground border border-border hover-elevate active-elevate-2 backdrop-blur-sm transition-all duration-300"
                data-testid="button-our-vision"
              >
                Our Vision
              </button>
            </div>
          </div>

          <div
            className={`relative flex items-center justify-center transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            data-testid="container-video-placeholder"
          >
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl">
              <div
                className="absolute inset-0 bg-[#0D1B2A] flex items-center justify-center"
                data-testid="video-placeholder"
              >
                <div className="text-center space-y-4 px-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-primary"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      data-testid="icon-video-play"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="text-sm text-muted-foreground/60">
                    Video embed placeholder
                  </p>
                  <p className="text-xs text-muted-foreground/40">
                    Reserved for cinematic brand video
                  </p>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/80 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-xl blur-xl -z-10 opacity-60" />
          </div>
        </div>
      </div>
    </section>
  );
}
