import { useEffect, useRef, useState } from "react";
import {
  SiOpenai,
  SiZapier,
  SiGoogleanalytics,
  SiWordpress,
  SiWebflow,
  SiHubspot,
  SiStripe,
  SiTwilio,
  SiZoho,
} from "react-icons/si";
import { Workflow } from "lucide-react";
import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";

interface Partner {
  name: string;
  icon: IconType | LucideIcon;
  color: string;
}

export default function BrandPartnerCarousel() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const partners: Partner[] = [
    { name: "ChatGPT", icon: SiOpenai, color: "#10A37F" },
    { name: "n8n", icon: Workflow, color: "#EA4B71" },
    { name: "Zapier", icon: SiZapier, color: "#FF4F00" },
    { name: "Google Analytics", icon: SiGoogleanalytics, color: "#E37400" },
    { name: "WordPress", icon: SiWordpress, color: "#21759B" },
    { name: "Webflow", icon: SiWebflow, color: "#4353FF" },
    { name: "HubSpot", icon: SiHubspot, color: "#FF7A59" },
    { name: "Stripe", icon: SiStripe, color: "#635BFF" },
    { name: "Twilio", icon: SiTwilio, color: "#F22F46" },
    { name: "Zoho CRM", icon: SiZoho, color: "#C8202E" },
  ];

  // Duplicate partners for seamless infinite scroll
  const duplicatedPartners = [...partners, ...partners];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20 relative overflow-hidden bg-gradient-to-b from-white to-gray-50"
      data-testid="section-brand-partners"
    >
      <div className="container mx-auto px-4 max-w-[1200px]">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2
            className={`font-heading font-bold text-3xl md:text-4xl text-slate-900 mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {t.servicesPage.partners.title}
          </h2>
          <p
            className={`text-slate-900 text-lg md:text-xl max-w-3xl mx-auto transition-all duration-700 delay-150 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {t.servicesPage.partners.subtitle}
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className={`relative transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="overflow-hidden">
            <div
              className={`flex gap-12 md:gap-16 ${isPaused ? "carousel-paused" : "carousel-scroll"}`}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {duplicatedPartners.map((partner, index) => {
                const Icon = partner.icon;
                return (
                  <div
                    key={`${partner.name}-${index}`}
                    className="flex-shrink-0 partner-logo-container group"
                    data-testid={`partner-${partner.name.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <div className="relative">
                      {/* Logo */}
                      <Icon
                        className="w-16 h-16 md:w-20 md:h-20 partner-logo transition-all duration-300"
                        style={
                          {
                            "--logo-color": partner.color,
                          } as React.CSSProperties
                        }
                      />
                      {/* Gold Pulse Accent */}
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#F4B400] group-hover:w-full transition-all duration-300 opacity-0 group-hover:opacity-100 gold-pulse" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Gradient Fade Edges */}
          <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
