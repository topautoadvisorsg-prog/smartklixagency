import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * ContactHero - Premium full-viewport hero section for Contact page
 * 
 * Features dark tech background with network aesthetic, centered headline/subheadline,
 * two CTA buttons, and smooth Framer Motion entrance animations with stagger effect.
 * Background prepared for easy video swap in the future.
 */
export default function ContactHero() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
    layoutEffect: false
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToContactForm = () => {
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="contact-hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[90px]"
      data-testid="section-contact-hero"
    >
      {/* Background with parallax effect */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: parallaxY }}
      >
        {/* Dark tech background - will be replaced with video later */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1C] via-[#0D1B2A] to-[#1a1f2e]" />
        
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-black/60" />
      </motion.div>

      {/* Content Container */}
      <div className="container mx-auto px-4 max-w-[900px] relative z-10 text-center py-32">
        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.22, 0.61, 0.36, 1],
            delay: 0 
          }}
          className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight"
          data-testid="text-hero-headline"
        >
          Looking to Build Something Intelligent?
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.22, 0.61, 0.36, 1],
            delay: 0.15 
          }}
          className="text-white/90 text-lg md:text-xl lg:text-2xl mb-10 leading-relaxed max-w-[800px] mx-auto"
          data-testid="text-hero-subheadline"
        >
          From intelligent websites to seamless automation — Smart&nbsp;Klix creates systems that think, adapt, and grow with your business.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.22, 0.61, 0.36, 1],
            delay: 0.3 
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Primary Button - Gold */}
          <button
            onClick={scrollToContactForm}
            data-testid="button-book-consultation"
            className="hero-cta-primary inline-flex items-center gap-2 bg-sidebar-primary text-card-foreground font-heading font-semibold px-8 py-4 rounded-lg transition-all duration-300 group hover-elevate active-elevate-2"
          >
            <span>Book a Free Consultation</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          {/* Secondary Button - White Outline */}
          <button
            onClick={scrollToContactForm}
            data-testid="button-send-message"
            className="hero-cta-secondary inline-flex items-center gap-2 bg-transparent border-2 border-white text-white font-heading font-semibold px-8 py-4 rounded-lg transition-all duration-300 group"
          >
            <span>Send a Message</span>
          </button>
        </motion.div>
      </div>

      <style>{`
        .hero-cta-primary {
          box-shadow: 0 4px 16px rgba(244, 180, 0, 0.3);
        }

        .hero-cta-primary:hover {
          box-shadow: 0 6px 24px rgba(244, 180, 0, 0.5);
          transform: translateY(-2px);
        }

        .hero-cta-primary:active {
          transform: translateY(0);
        }

        .hero-cta-secondary:hover {
          border-color: hsl(var(--sidebar-primary));
          color: hsl(var(--sidebar-primary));
          background-color: rgba(244, 180, 0, 0.1);
          box-shadow: 0 4px 16px rgba(244, 180, 0, 0.2);
        }

        .hero-cta-secondary:active {
          transform: scale(0.98);
        }
      `}</style>
    </section>
  );
}
