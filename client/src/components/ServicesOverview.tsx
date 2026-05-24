import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Monitor, Zap, Palette, Smartphone } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";
import WhatWeOfferSphere from "./WhatWeOfferSphere";

interface ServiceCard {
  icon: typeof Monitor;
  title: string;
  description: string;
  link: string;
}



/**
 * SECTION: Services Overview - Last updated Nov 2025
 * 
 * Top tier: Impact headline + subheadline with blue gradient orb
 * Bottom tier: 4 service cards grid with hover animations
 * 
 * Animations: Scroll-triggered fade-in, card hover scale effects,
 * intersection observer for entrance timing
 */
export default function ServicesOverview() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const services: ServiceCard[] = [
    {
      icon: Monitor,
      title: t.servicesPreview.services.webDesign.title,
      description: t.servicesPreview.services.webDesign.description,
      link: "/services/websites"
    },
    {
      icon: Smartphone,
      title: t.servicesPreview.services.apps.title,
      description: t.servicesPreview.services.apps.description,
      link: "/services/apps"
    },
    {
      icon: Zap,
      title: t.servicesPreview.services.automation.title,
      description: t.servicesPreview.services.automation.description,
      link: "/services/automation"
    },
    {
      icon: Palette,
      title: t.servicesPreview.services.branding.title,
      description: t.servicesPreview.services.branding.description,
      link: "/services/branding"
    },
  ];

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
      id="services"
      className="relative pt-16 pb-32 overflow-hidden bg-gradient-to-br from-background via-muted/50 to-accent/20"
      data-testid="section-services-overview"
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl">
        {/* Top Tier - Impact Headline with What We Offer Sphere */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left - Text Content */}
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="font-heading font-bold text-6xl md:text-7xl lg:text-8xl leading-tight text-foreground mb-8">
              {t.servicesPage.overview.title}
            </h2>
            
            <p className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground leading-relaxed">
              {t.servicesPage.overview.description}
            </p>
          </div>

          {/* Right - Blue 3D Sphere */}
          <div className={`hidden lg:flex items-center justify-center transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <WhatWeOfferSphere />
          </div>
        </div>

        {/* Bottom Tier - Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 justify-items-center max-w-7xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link key={service.title} href={service.link} className="w-full block">
                <div
                  className={`group service-card bg-card rounded-[20px] p-10 shadow-sm transition-all duration-500 w-full h-full cursor-pointer hover:shadow-md ${
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
                      className="w-16 h-16 icon-tilt icon-pulse group-hover:scale-105 transition-transform"
                      style={{ color: '#F4B400' }}
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-bold text-2xl mb-4 text-foreground text-center">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed text-base text-center">
                    {service.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
