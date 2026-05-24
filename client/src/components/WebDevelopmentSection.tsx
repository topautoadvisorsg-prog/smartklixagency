import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";

export default function WebDevelopmentSection() {
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
      className="relative py-16 md:py-28 lg:py-36 overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100/50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/30"
      data-testid="section-web-development"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Text Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: '0.3s',
            }}
          >
            <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground mb-6">
              {t.servicesPage.webDev.title}
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground leading-loose md:leading-relaxed mb-8">
              {t.servicesPage.webDev.description}
            </p>

            <Link href="/services/websites">
              <button
                className="inline-flex items-center justify-center min-h-10 px-8 text-base font-semibold rounded-md bg-[#F4B400] hover:bg-[#F4B400]/90 text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(244,180,0,0.4)] hover:-translate-y-1"
                data-testid="button-web-projects"
              >
                {language === 'en' ? 'See Web Examples' : 'Ver Ejemplos Web'}
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </Link>
          </div>

          {/* Right Column - Premium Mockup Image */}
          <div className="relative flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { 
                opacity: 1, 
                y: [0, -8, 0], // Floating effect combined with entrance
              } : { opacity: 0, y: 40 }}
              transition={{ 
                opacity: { duration: 0.8 },
                y: isVisible ? {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                } : { duration: 0.8 }
              }}
              className="relative w-full max-w-[620px] filter drop-shadow-[0_0_30px_rgba(59,130,246,0.15)]"
            >
              <img 
                src="/assets/web-dev-mockup.png" 
                alt="Professional website design mockup showing responsive layouts for desktop, tablet, and mobile devices by Smart Klix" 
                className="w-full h-auto object-contain"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
