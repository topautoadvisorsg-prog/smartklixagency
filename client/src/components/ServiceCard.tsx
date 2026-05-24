import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";

/**
 * Animated icon component interface
 */
interface AnimatedIconComponent {
  (props: { isVisible?: boolean; className?: string }): JSX.Element;
}

/**
 * Props for the ServiceCard component
 */
interface ServiceCardProps {
  /** Animated icon component to display */
  icon: AnimatedIconComponent;
  /** Service title text */
  title: string;
  /** Brief description of the service */
  description: string;
  /** Optional link destination */
  link?: string;
  /** Card index for stagger animation */
  index?: number;
  /** Whether section is visible for scroll animations */
  isVisible?: boolean;
}

/**
 * ServiceCard - Displays a service offering in a card format
 * 
 * Features Framer Motion scroll-triggered animations, enhanced hover effects
 * with gold gradient border sweep, and "Learn More" link with smooth transitions.
 * 
 * @example
 * ```tsx
 * <ServiceCard
 *   icon={MonitorIcon}
 *   title="Website Development"
 *   description="Modern, responsive websites built to scale"
 *   link="/services#web"
 *   index={0}
 *   isVisible={true}
 * />
 * ```
 */
export default function ServiceCard({ 
  icon: Icon, 
  title, 
  description, 
  link = "#",
  index = 0,
  isVisible = false
}: ServiceCardProps) {
  const { language } = useLanguage();
  const t = useTranslation(language);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        ease: [0.25, 0.1, 0.25, 1],
        delay: index * 0.15 
      }}
      data-testid={`card-service-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <motion.div 
        className="service-card group bg-card rounded-2xl p-8 md:p-8 text-center relative overflow-hidden border border-white/5 transition-all duration-300 hover:shadow-lg"
        whileHover={{ scale: 1.02, y: -6 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Animated gold gradient border sweep on hover */}
        <div className="gold-border-sweep" />
        
        <div className="flex justify-center mb-6 text-sidebar-primary relative z-10">
          <Icon isVisible={isVisible} />
        </div>
        
        <h3 className="font-heading font-semibold text-xl md:text-2xl text-foreground mb-4 relative z-10">
          {title}
        </h3>
        
        <p className="text-muted-foreground leading-relaxed mb-6 relative z-10" style={{ letterSpacing: '0.2px' }}>
          {description}
        </p>

        <Link 
          href={link}
          className="inline-flex items-center gap-2 text-foreground font-medium transition-all duration-300 hover:text-sidebar-primary group/link relative z-10"
          data-testid={`link-service-${title.toLowerCase().replace(/\s+/g, '-')}`}
        >
          {language === 'en' ? 'Learn More' : 'Ver más'}
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-[6px]" />
        </Link>
      </motion.div>

      <style>{`
        .service-card {
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
          transition: box-shadow 300ms cubic-bezier(0.25, 0.1, 0.25, 1);
          border: 1px solid rgba(0, 0, 0, 0.06);
        }
        
        .service-card:hover {
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
        }
        
        .service-card:hover .gold-border-sweep::before {
          transform: translateX(100%);
        }
        
        .service-card:hover svg {
          filter: drop-shadow(0 0 12px rgba(244, 180, 0, 0.5));
        }
        
        .gold-border-sweep {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, transparent 30%, rgba(244, 180, 0, 0.3) 50%, transparent 70%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          opacity: 0;
          transition: opacity 300ms cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        
        .gold-border-sweep::before {
          content: '';
          position: absolute;
          inset: -100% 0;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(244, 180, 0, 0.6) 50%, 
            transparent
          );
          transform: translateX(-100%);
          transition: transform 600ms cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        
        .service-card:hover .gold-border-sweep {
          opacity: 1;
        }
      `}</style>
    </motion.div>
  );
}
