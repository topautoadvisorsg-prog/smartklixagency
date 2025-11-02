import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { DollarSign, TrendingUp, Globe2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface USP {
  icon: LucideIcon;
  title: string;
  description: string;
  animation: string;
}

/**
 * USPCard - Individual USP card with hover effects and animated icons
 */
function USPCard({ 
  icon: Icon, 
  title, 
  description, 
  animation,
  index,
  isVisible 
}: USP & { index: number; isVisible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        ease: [0.25, 0.1, 0.25, 1],
        delay: index * 0.15 
      }}
      data-testid={`usp-${title.toLowerCase()}`}
    >
      <motion.div 
        className="usp-card text-center cursor-pointer group"
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="flex justify-center mb-6">
          <div className={`icon-wrapper ${isVisible ? animation : ''}`}>
            {/* Static gold glow using box-shadow (not animated) */}
            <div className="icon-glow-base"></div>
            
            {/* Animated glow using pseudo-element with opacity */}
            <div className="icon-glow-pulse"></div>
            
            <Icon 
              size={76} 
              strokeWidth={2}
              className="icon-main text-sidebar-primary relative z-10"
            />
          </div>
        </div>
        
        <h3 className="font-heading font-semibold text-xl text-card-foreground mb-3">
          {title}
        </h3>
        
        <p className="text-muted-foreground leading-relaxed">
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
          width: 76px;
          height: 76px;
          border-radius: 50%;
          box-shadow: 0 0 20px 8px rgba(244, 180, 0, 0.15);
          z-index: 0;
          pointer-events: none;
        }

        /* Pulsing glow layer - opacity animation only */
        .icon-glow-pulse {
          position: absolute;
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(244, 180, 0, 0.25) 0%, transparent 70%);
          z-index: 1;
          pointer-events: none;
          opacity: 0;
        }

        /* Dollar Icon - Pulse with scale + opacity glow */
        @keyframes dollarPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.04);
          }
        }

        @keyframes glowPulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }

        .dollar-pulse .icon-main {
          animation: dollarPulse 3s ease-in-out infinite;
        }

        .dollar-pulse .icon-glow-pulse {
          animation: glowPulse 3s ease-in-out infinite;
        }

        /* Gold circle background for dollar */
        .dollar-pulse::before {
          content: '';
          position: absolute;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: rgba(244, 180, 0, 0.08);
          border: 2px solid rgba(244, 180, 0, 0.2);
          z-index: 0;
        }

        /* Growth Chart Icon - Upward slide with opacity glow */
        @keyframes chartSlide {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        .chart-slide .icon-main {
          animation: chartSlide 2.5s ease-in-out infinite;
        }

        .chart-slide .icon-glow-pulse {
          animation: glowPulse 2.5s ease-in-out infinite;
        }

        /* Globe Icon - Rotation with opacity glow */
        @keyframes globeRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .globe-rotate .icon-main {
          animation: globeRotate 8s linear infinite;
        }

        .globe-rotate .icon-glow-pulse {
          animation: glowPulse 3s ease-in-out infinite;
        }

        /* Hover intensification - opacity only */
        .usp-card:hover .icon-glow-pulse {
          opacity: 0.8;
        }

        .usp-card {
          transition: box-shadow 300ms cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        
        .usp-card:hover {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }
      `}</style>
    </motion.div>
  );
}

/**
 * USPGrid - Showcases key unique selling points
 * 
 * Features Framer Motion scroll-triggered animations, subtle parallax background,
 * and staggered card reveals for premium UX.
 */
export default function USPGrid() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const usps: USP[] = [
    {
      icon: DollarSign,
      title: "Affordable",
      description: "Premium solutions at small business prices",
      animation: "dollar-pulse"
    },
    {
      icon: TrendingUp,
      title: "Scalable",
      description: "Solutions that grow with your business",
      animation: "chart-slide"
    },
    {
      icon: Globe2,
      title: "Bilingual",
      description: "English & Spanish support for diverse markets",
      animation: "globe-rotate"
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
      data-testid="section-usp-grid"
    >
      <motion.div 
        className="absolute inset-0 -z-10"
        style={{ 
          background: 'linear-gradient(to bottom, #FFFFFF, #F9FAFB)',
          y: parallaxY
        }}
      />
      
      <div className="container mx-auto px-4 max-w-[1200px] relative">
        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          {usps.map((usp, index) => (
            <USPCard 
              key={usp.title} 
              {...usp}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
