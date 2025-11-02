import { useEffect, useRef, useState } from "react";
import LinkButton from "./LinkButton";

/**
 * Props for the CTASection component
 */
interface CTASectionProps {
  /** Main heading text */
  title?: string;
  /** Supporting description text */
  description?: string;
  /** Text for the primary CTA button */
  primaryButtonText?: string;
  /** URL for the primary CTA button */
  primaryButtonHref?: string;
  /** Optional text for the secondary button */
  secondaryButtonText?: string;
  /** Optional URL for the secondary button */
  secondaryButtonHref?: string;
}

/**
 * CTASection - Call-to-action section with dark gradient background and animations
 * 
 * Displays a prominent message with one or two action buttons.
 * Used at the end of pages to encourage user engagement.
 * Features scroll-triggered animations and subtle particle effects.
 * 
 * @example
 * ```tsx
 * <CTASection
 *   title="Ready to Build Smarter?"
 *   description="Let's turn your website, automation, and brand into a system that works 24/7 — so you don't have to."
 *   primaryButtonText="Start Your Free Consultation"
 *   primaryButtonHref="/contact"
 *   secondaryButtonText="See Our Work"
 *   secondaryButtonHref="/services"
 * />
 * ```
 */
export default function CTASection({
  title = "Ready to Build Smarter?",
  description = "Let's turn your website, automation, and brand into a system that works 24/7 — so you don't have to.",
  primaryButtonText = "Start Your Free Consultation",
  primaryButtonHref = "/contact",
  secondaryButtonText = "See Our Work",
  secondaryButtonHref = "/services"
}: CTASectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
      className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-br from-[#0D1B2A] via-[#1a2f45] to-[#0D1B2A]"
      data-testid="section-cta"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Light Sweep */}
        <div className="absolute inset-0 cta-light-sweep opacity-30" />
        
        {/* Floating Particles */}
        <div className="cta-particles">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="cta-particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>

        {/* Gradient Orb */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-[#F4B400]/20 to-transparent rounded-full blur-3xl animate-pulse-slower" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Headline */}
          <h2 
            className={`font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {title}
          </h2>

          {/* Description */}
          <p 
            className={`text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-150 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {description}
          </p>

          {/* Buttons */}
          <div 
            className={`flex flex-wrap gap-4 justify-center pt-6 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <LinkButton 
              href={primaryButtonHref} 
              size="lg"
              className="bg-[#F4B400] text-[#0D1B2A] hover:bg-[#F4B400]/90 border-none font-heading font-semibold px-8 shadow-lg hover:shadow-xl hover:shadow-[#F4B400]/20 transition-all"
              data-testid="button-cta-primary"
            >
              {primaryButtonText}
            </LinkButton>
            
            {secondaryButtonText && secondaryButtonHref && (
              <LinkButton 
                href={secondaryButtonHref} 
                variant="outline"
                size="lg" 
                className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 font-heading font-semibold px-8 backdrop-blur-sm"
                data-testid="button-cta-secondary"
              >
                {secondaryButtonText}
              </LinkButton>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
