import { useEffect, useRef, useState } from "react";
import { Monitor, Zap, Palette, Rocket } from "lucide-react";

interface ServiceCard {
  icon: typeof Monitor;
  title: string;
  description: string;
}

const services: ServiceCard[] = [
  {
    icon: Monitor,
    title: "Websites Built to Perform",
    description: "Responsive, SEO-optimized, and conversion-ready — every site is built for speed and results.",
  },
  {
    icon: Zap,
    title: "Automation That Runs 24/7",
    description: "From AI receptionists to GPT workflows, we connect tools and systems that save hours every day.",
  },
  {
    icon: Palette,
    title: "Brands That Stand Out",
    description: "Consistent, recognizable identities that elevate trust and engagement across all platforms.",
  },
  {
    icon: Rocket,
    title: "Scalable Systems",
    description: "Smart architecture that grows with your business — no rebuilds, no redesigns.",
  },
];

/**
 * BlueGradientOrb - Decorative gradient orb animation
 * 
 * Subtle blue gradient sphere with gentle floating animation
 * matching Webflow aesthetic
 */
function BlueGradientOrb() {
  return (
    <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none">
      <div className="relative w-full h-full">
        {/* Main orb */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-2xl opacity-30 animate-pulse-slow"
          style={{
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(147, 197, 253, 0.3) 40%, transparent 70%)"
          }}
        />
        
        {/* Outer glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-3xl opacity-20 animate-pulse-slower"
          style={{
            background: "radial-gradient(circle, rgba(96, 165, 250, 0.4) 0%, transparent 60%)"
          }}
        />

        {/* Floating dots */}
        <div className="absolute top-12 right-20 w-2 h-2 rounded-full bg-blue-400/40 animate-float-slow" />
        <div className="absolute bottom-16 right-8 w-2 h-2 rounded-full bg-blue-300/30 animate-float-slower" />
        <div className="absolute top-24 right-32 w-1.5 h-1.5 rounded-full bg-blue-500/20 animate-float" />
      </div>
    </div>
  );
}

/**
 * ServicesOverview - Premium two-tier overview section
 * 
 * Top tier: Impact headline + subheadline with blue gradient orb
 * Bottom tier: 4 service cards grid with hover animations
 * 
 * Features Webflow-quality animations, scroll-triggered entrance,
 * and premium hover effects
 */
export default function ServicesOverview() {
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
      className="relative py-32 overflow-hidden bg-gradient-to-br from-white via-slate-50/50 to-blue-50/20"
      data-testid="section-services-overview"
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl">
        {/* Top Tier - Impact Headline */}
        <div className="relative mb-20">
          <BlueGradientOrb />
          
          <div className={`max-w-3xl transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground mb-6">
              Smart Systems That Save Time, Money, and Build Brands That Scale
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Smart&nbsp;Klix combines high-performance websites, AI automation, and digital branding to deliver real business results — faster launches, stronger SEO, and effortless scalability.
            </p>
          </div>
        </div>

        {/* Bottom Tier - Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={`group service-card bg-white rounded-[20px] p-10 shadow-sm transition-all duration-500 ${
                  isVisible ? 'animate-slide-up-fade' : 'opacity-0'
                }`}
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
                data-testid={`card-service-${index}`}
              >
                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <Icon 
                    className="w-14 h-14 icon-tilt icon-pulse"
                    style={{ color: '#F4B400' }}
                    strokeWidth={1.5}
                  />
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-xl mb-3 text-foreground">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
