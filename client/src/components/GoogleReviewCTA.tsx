import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface GoogleReviewCTAProps {
  pageType: 'websites' | 'automation' | 'branding' | 'home' | 'contact';
}

export default function GoogleReviewCTA({ pageType }: GoogleReviewCTAProps) {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [ref, isVisible] = useScrollReveal();

  // Map translations based on pageType with fallback to shared
  const translations = (pageType === 'websites' 
    ? t.websitesPage?.reviews 
    : pageType === 'automation' 
      ? t.automationPage?.reviews
      : pageType === 'branding'
        ? t.brandingPage?.reviews
        : pageType === 'home'
          ? (t as any).homePage?.reviews // In case we add unique home ones later
          : (t as any).contactPage?.reviews) || (t as any).shared?.reviews;

  return (
    <section 
      ref={ref}
      id="google-reviews-cta"
      className="py-20 md:py-28 bg-muted overflow-hidden"
      data-testid="section-google-reviews-cta"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side: Message */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground leading-tight">
              {translations?.headline || "Your Feedback Matters"}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              {translations?.description || "If we’ve worked with you or you’re exploring our services, leaving a quick Google review helps us grow and improves our visibility. It only takes a moment and makes a big difference."}
            </p>
            <div className="pt-2">
              <a 
                href="#" // Placeholder for now
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center min-h-12 px-8 text-base font-semibold rounded-md bg-[#F4B400] text-[#0D1B2A] hover:bg-[#F4B400]/90 shadow-lg hover:shadow-[0_0_20px_rgba(244,180,0,0.4)] transition-all duration-300"
              >
                {translations?.cta || "Leave a Google Review"}
              </a>
            </div>
          </motion.div>

          {/* Right Side: Visuals */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center md:items-end justify-center"
          >
            <div className="bg-card p-10 rounded-3xl shadow-xl border border-card-border flex flex-col items-center space-y-6 max-w-sm w-full transform hover:scale-105 transition-transform duration-500">
              {/* Google G Logo SVG */}
              <svg viewBox="0 0 24 24" className="w-16 h-16">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              
              {/* 5-Star Rating */}
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-8 h-8 fill-[#F4B400] text-[#F4B400]" />
                ))}
              </div>
              
              <div className="text-center">
                <span className="text-muted-foreground text-sm font-medium uppercase tracking-widest">Trusted Review System</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
