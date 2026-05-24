import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Monitor, Brain, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";

interface ProcessStep {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  description: string;
}

/**
 * TimelineStep - Individual step in the process timeline
 */
function TimelineStep({ 
  step,
  index,
  isVisible,
  isLastStep
}: { 
  step: ProcessStep; 
  index: number; 
  isVisible: boolean;
  isLastStep: boolean;
}) {
  return (
    <div className="flex-1 relative">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ 
          duration: 0.6, 
          ease: [0.22, 0.61, 0.36, 1],
          delay: index * 0.15
        }}
        className="flex flex-col items-center relative z-10"
        data-testid={`step-${step.title.toLowerCase()}`}
      >
        {/* Icon Circle */}
        <motion.div 
          className="step-icon-wrapper mb-6 cursor-pointer group"
          whileHover={{ 
            scale: 1.08,
            rotate: 5,
            transition: { duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }
          }}
        >
          <div className={`step-icon ${isVisible ? 'icon-float' : ''}`}>
            {/* Gold circle background */}
            <div className="absolute inset-0 bg-sidebar-primary rounded-full"></div>
            
            {/* Glow layer - opacity animated */}
            <div className="icon-glow"></div>
            
            {/* Icon */}
            <step.icon 
              size={37} 
              strokeWidth={2.5}
              className="text-white relative z-10"
            />
          </div>
        </motion.div>

        {/* Step Content */}
        <motion.div 
          className="text-center max-w-[240px] step-content"
          whileHover={{ 
            y: -4,
            transition: { duration: 0.3 }
          }}
        >
          <h3 className="font-heading font-bold text-xl text-card-foreground mb-2">
            {step.title}
          </h3>
          {step.subtitle && (
            <p className="text-sm text-card-foreground/70 italic mb-2">
              {step.subtitle}
            </p>
          )}
          <p className="text-muted-foreground text-sm leading-relaxed">
            {step.description}
          </p>
        </motion.div>
      </motion.div>

      {/* Connection line segment (not shown on last step) */}
      {!isLastStep && (
        <div className="hidden md:block absolute top-[36px] left-[calc(50%+52px)] right-[calc(-50%+52px)] h-[3px]">
          <motion.div 
            className="connection-line h-full"
            initial={{ scaleX: 0 }}
            animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.22, 0.61, 0.36, 1],
              delay: 0.1 + (index * 0.15)
            }}
            style={{ transformOrigin: 'left' }}
          />
        </div>
      )}

      <style>{`
        .step-icon-wrapper {
          position: relative;
        }

        .step-icon {
          position: relative;
          width: 72px;
          height: 72px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(244, 180, 0, 0.25);
          transition: box-shadow 300ms cubic-bezier(0.22, 0.61, 0.36, 1);
        }

        .step-icon-wrapper:hover .step-icon {
          box-shadow: 0 8px 24px rgba(244, 180, 0, 0.45);
        }

        /* Animated glow layer */
        .icon-glow {
          position: absolute;
          inset: -10px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(244, 180, 0, 0.35) 0%, transparent 70%);
          opacity: 0;
          pointer-events: none;
        }

        /* Gentle floating animation */
        @keyframes iconFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        @keyframes glowPulse {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.75;
            transform: scale(1.12);
          }
        }

        .icon-float {
          animation: iconFloat 4s ease-in-out infinite;
        }

        .icon-float .icon-glow {
          animation: glowPulse 4s ease-in-out infinite;
        }

        .step-icon-wrapper:hover .icon-glow {
          opacity: 0.9 !important;
          animation: none !important;
          transform: scale(1.15);
          transition: all 300ms cubic-bezier(0.22, 0.61, 0.36, 1);
        }

        /* Connection line with flowing gradient */
        .connection-line {
          background: linear-gradient(
            90deg,
            rgba(244, 180, 0, 0.35) 0%,
            rgba(244, 180, 0, 0.6) 50%,
            rgba(244, 180, 0, 0.35) 100%
          );
          background-size: 200% 100%;
          animation: flowGradient 3s ease-in-out infinite;
        }

        @keyframes flowGradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        /* Hover effect on step content */
        .step-content:hover h3 {
          color: hsl(var(--sidebar-primary));
          transition: color 300ms ease;
        }
      `}</style>
    </div>
  );
}

/**
 * MobileTimelineStep - Vertical layout for mobile
 */
function MobileTimelineStep({ 
  step,
  index,
  isVisible,
  isLastStep
}: { 
  step: ProcessStep; 
  index: number; 
  isVisible: boolean;
  isLastStep: boolean;
}) {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
        transition={{ 
          duration: 0.6, 
          ease: [0.22, 0.61, 0.36, 1],
          delay: index * 0.15
        }}
        className="flex gap-4 relative z-10"
        data-testid={`step-mobile-${step.title.toLowerCase()}`}
      >
        {/* Icon Circle */}
        <div className="flex-shrink-0">
          <div className={`step-icon-mobile ${isVisible ? 'icon-float-mobile' : ''}`}>
            <div className="absolute inset-0 bg-sidebar-primary rounded-full"></div>
            <div className="icon-glow-mobile"></div>
            <step.icon 
              size={28} 
              strokeWidth={2.5}
              className="text-white relative z-10"
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-1 pb-8">
          <h3 className="font-heading font-bold text-lg text-card-foreground mb-1">
            {step.title}
          </h3>
          {step.subtitle && (
            <p className="text-xs text-card-foreground/70 italic mb-2">
              {step.subtitle}
            </p>
          )}
          <p className="text-muted-foreground text-sm leading-relaxed">
            {step.description}
          </p>
        </div>
      </motion.div>

      {/* Vertical connecting line */}
      {!isLastStep && (
        <div className="absolute left-[28px] top-[64px] bottom-0 w-[2px]">
          <motion.div 
            className="connection-line-mobile h-full"
            initial={{ scaleY: 0 }}
            animate={isVisible ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.22, 0.61, 0.36, 1],
              delay: 0.1 + (index * 0.15)
            }}
            style={{ transformOrigin: 'top' }}
          />
        </div>
      )}

      <style>{`
        .step-icon-mobile {
          position: relative;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 3px 10px rgba(244, 180, 0, 0.25);
        }

        .icon-glow-mobile {
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(244, 180, 0, 0.35) 0%, transparent 70%);
          opacity: 0;
          pointer-events: none;
        }

        @keyframes iconFloatMobile {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        .icon-float-mobile {
          animation: iconFloatMobile 4s ease-in-out infinite;
        }

        .icon-float-mobile .icon-glow-mobile {
          animation: glowPulse 4s ease-in-out infinite;
        }

        .connection-line-mobile {
          background: linear-gradient(
            180deg,
            rgba(244, 180, 0, 0.35) 0%,
            rgba(244, 180, 0, 0.6) 50%,
            rgba(244, 180, 0, 0.35) 100%
          );
          background-size: 100% 200%;
          animation: flowGradientVertical 3s ease-in-out infinite;
        }

        @keyframes flowGradientVertical {
          0% {
            background-position: 50% 0%;
          }
          50% {
            background-position: 50% 100%;
          }
          100% {
            background-position: 50% 0%;
          }
        }
      `}</style>
    </div>
  );
}

/**
 * HowSmartKlixWorks - Process timeline section
 * 
 * Features animated horizontal timeline (desktop) with flowing connection line,
 * sequential step reveals with floating icons, and vertical timeline on mobile.
 */
export default function HowSmartKlixWorks() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const steps: ProcessStep[] = [
    {
      icon: Search,
      title: t.process.steps.discover.title,
      description: t.process.steps.discover.description
    },
    {
      icon: Monitor,
      title: t.process.steps.build.title,
      description: t.process.steps.build.description
    },
    {
      icon: Brain,
      title: t.process.steps.automate.title,
      description: t.process.steps.automate.description
    },
    {
      icon: TrendingUp,
      title: t.process.steps.grow.title,
      description: t.process.steps.grow.description
    }
  ];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
    layoutEffect: false
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 15]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-[100px] relative overflow-hidden"
      data-testid="section-how-smartklix-works"
    >
      <motion.div 
        className="absolute inset-0 -z-10"
        style={{ 
          background: 'linear-gradient(to bottom, #FFFFFF, #F9FAFB)',
          y: parallaxY
        }}
      />
      
      <div className="container mx-auto px-4 max-w-[1200px] relative">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-card-foreground mb-4">
            {t.process.title}
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {language === 'en' ? 'From discovery to launch, we follow a proven process that keeps your project fast, simple, and built for the future.' : 'Desde el descubrimiento hasta el lanzamiento, seguimos un proceso probado que mantiene tu proyecto rápido, simple y construido para el futuro.'}
          </p>
        </div>

        {/* Desktop Timeline - Horizontal */}
        <div className="hidden md:flex items-start justify-between relative">
          {steps.map((step, index) => (
            <TimelineStep 
              key={step.title}
              step={step}
              index={index}
              isVisible={isVisible}
              isLastStep={index === steps.length - 1}
            />
          ))}
        </div>

        {/* Mobile Timeline - Vertical */}
        <div className="md:hidden space-y-0">
          {steps.map((step, index) => (
            <MobileTimelineStep 
              key={step.title}
              step={step}
              index={index}
              isVisible={isVisible}
              isLastStep={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
