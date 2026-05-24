import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";

/**
 * SECTION: Contact Hero - Last updated Nov 2025
 * 
 * Full-screen hero with black background, bold white headline, and dual CTAs.
 * Video-ready structure (currently dark overlay, video integration commented out).
 * Animations: Fade-in entrance with staggered delays, smooth scroll to form
 */
export default function ContactHero() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [isVisible, setIsVisible] = useState(false);

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
      id="contact-hero"
      className="relative w-full min-h-screen flex flex-col justify-center items-center text-center overflow-hidden"
      data-testid="section-contact-hero"
    >
      {/* Background Layer - Video Player */}
      <div className="absolute inset-0 z-0 bg-black" id="video-bg">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover opacity-60"
        >
          <source src="/assets/contact-hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content Container */}
      <div className="relative z-10 text-white px-4 max-w-2xl mx-auto">
        {/* Headline */}
        <h1 
          className={`font-heading font-bold text-5xl md:text-7xl text-white mb-6 leading-tight transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          data-testid="heading-contact-hero"
        >
          {t.contactPage.hero.headline}
        </h1>

        {/* Subheadline */}
        <p 
          className={`text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          data-testid="text-contact-subheadline"
        >
          {t.contactPage.hero.subheadline}
        </p>

        {/* CTA Buttons */}
        <div 
          className={`flex flex-col sm:flex-row justify-center gap-4 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Primary Button - Gold */}
          <button
            type="button"
            onClick={scrollToContactForm}
            data-testid="button-get-in-touch"
            className="bg-[#f5b400] text-black font-semibold px-8 py-3 rounded-md shadow-[0_0_10px_rgba(245,180,0,0.6)] hover:bg-[#d89c00] transition-colors duration-300"
          >
            {t.contactPage.hero.ctaPrimary}
          </button>

          {/* Secondary Button - White Outline */}
          <Link 
            href="/services"
            data-testid="link-view-services"
            className="inline-block border border-white text-white px-8 py-3 rounded-md hover:bg-white hover:text-black transition-colors duration-300 text-center font-semibold"
          >
            {t.contactPage.hero.ctaSecondary}
          </Link>
        </div>
      </div>
    </section>
  );
}
