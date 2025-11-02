import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Zap, BarChart3, Bot, Headphones } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Pillar {
  icon: LucideIcon;
  title: string;
  tagline: string;
  description: string;
}

/**
 * PillarCard - Individual feature card with hover effects and animated icon
 */
function PillarCard({ 
  icon: Icon, 
  title, 
  tagline,
  description, 
  index,
  isVisible 
}: Pillar & { index: number; isVisible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        ease: [0.25, 0.1, 0.25, 1],
        delay: index * 0.15 
      }}
      data-testid={`pillar-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <motion.div 
        className="pillar-card bg-white rounded-xl p-8 cursor-pointer group"
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="flex justify-center mb-6">
          <div className={`icon-wrapper ${isVisible ? 'icon-animate' : ''}`}>
            {/* Static gold glow base */}
            <div className="icon-glow-base"></div>
            
            {/* Animated glow pulse layer */}
            <div className="icon-glow-pulse"></div>
            
            <Icon 
              size={48} 
              strokeWidth={2}
              className="icon-main text-sidebar-primary relative z-10"
            />
          </div>
        </div>
        
        <h3 className="font-heading font-semibold text-xl text-card-foreground mb-2 text-center">
          {title}
        </h3>
        
        <p className="text-card-foreground/80 italic text-center mb-4 text-sm">
          {tagline}
        </p>
        
        <p className="text-muted-foreground leading-relaxed text-center">
          {description}
        </p>
      </motion.div>

      <style>{`
        .icon-wrapper {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        /* Base glow layer - static shadow for depth */
        .icon-glow-base {
          position: absolute;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          box-shadow: 0 0 16px 6px rgba(244, 180, 0, 0.15);
          z-index: 0;
          pointer-events: none;
        }

        /* Pulsing glow layer - opacity animation only */
        .icon-glow-pulse {
          position: absolute;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(244, 180, 0, 0.25) 0%, transparent 70%);
          z-index: 1;
          pointer-events: none;
          opacity: 0;
        }

        /* Icon animation - gentle pulse */
        @keyframes iconPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes glowPulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.15);
          }
        }

        .icon-animate .icon-main {
          animation: iconPulse 3s ease-in-out infinite;
        }

        .icon-animate .icon-glow-pulse {
          animation: glowPulse 3s ease-in-out infinite;
        }

        /* Hover intensification - opacity only */
        .pillar-card:hover .icon-glow-pulse {
          opacity: 0.8;
        }

        .pillar-card {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          transition: box-shadow 300ms cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        
        .pillar-card:hover {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }
      `}</style>
    </motion.div>
  );
}

/**
 * WhyChooseSmartKlix - Brand-defining section highlighting core advantages
 * 
 * Features premium 2×2 grid layout with scroll-triggered animations,
 * subtle parallax background, and staggered card reveals.
 */
export default function WhyChooseSmartKlix() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const pillars: Pillar[] = [
    {
      icon: Zap,
      title: "Websites & Automations in Days",
      tagline: "Fast, reliable builds – no waiting months.",
      description: "Launch-ready websites and automation systems delivered in record time."
    },
    {
      icon: BarChart3,
      title: "Built to Scale (SEO-Ready)",
      tagline: "Designed for growth and visibility.",
      description: "Every site is built with on-page SEO, speed optimization, and scalable architecture baked in."
    },
    {
      icon: Bot,
      title: "Automation Experts",
      tagline: "We connect your tools so your business runs itself.",
      description: "From CRM integrations to AI workflows, we eliminate repetitive tasks through smart automation."
    },
    {
      icon: Headphones,
      title: "Transparent Process",
      tagline: "You're in the loop from day one.",
      description: "Clear communication, real timelines, and honest reporting at every step."
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
      id="why-smartklix"
      className="py-20 md:py-[100px] relative overflow-hidden"
      data-testid="section-why-choose-smartklix"
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
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-card-foreground mb-4">
            Why Choose Smart&nbsp;Klix
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            We combine modern design, automation expertise, and built-in SEO systems to help small businesses scale faster and smarter.
          </p>
        </div>

        {/* 2×2 Grid */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-10">
          {pillars.map((pillar, index) => (
            <PillarCard 
              key={pillar.title} 
              {...pillar}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
