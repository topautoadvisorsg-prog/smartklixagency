import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Zap, Target, BarChart3 } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";

const consultItems = [
  { icon: Target, text: "Custom growth strategy for your business" },
  { icon: Zap, text: "Identify automation opportunities" },
  { icon: BarChart3, text: "Competitor analysis & positioning" },
  { icon: CheckCircle2, text: "Website audit & recommendations" },
];

function ConsultationCard({ isVisible }: { isVisible: boolean }) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="absolute inset-0 rounded-2xl bg-yellow-400/20 blur-2xl scale-95 -z-10" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1], delay: 0.2 }}
        className="relative rounded-2xl border border-yellow-400/30 bg-white/80 backdrop-blur-sm shadow-xl p-8 overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 rounded-t-2xl" />
        <div className="mb-6">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-yellow-600 bg-yellow-50 border border-yellow-200 px-3 py-1 rounded-full mb-3">
            What's included
          </span>
          <h3 className="text-xl font-bold text-gray-900">Your Free 30-Min Session</h3>
          <p className="text-sm text-gray-500 mt-1">No pitch. No pressure. Real value.</p>
        </div>
        <div className="space-y-4">
          {consultItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
              transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1], delay: 0.35 + i * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-yellow-50 border border-yellow-200 flex items-center justify-center">
                <item.icon size={16} className="text-yellow-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">{item.text}</span>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-6 pt-5 border-t border-gray-100 grid grid-cols-3 gap-4 text-center"
        >
          {[["100%", "Free"], ["30", "Minutes"], ["Same Day", "Response"]].map(([val, label], i) => (
            <div key={i}>
              <div className="text-base font-bold text-gray-900">{val}</div>
              <div className="text-xs text-gray-400">{label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function FreeConsultation() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
    layoutEffect: false
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 15]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-[100px] relative overflow-hidden"
      data-testid="section-free-consultation"
    >
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ background: 'linear-gradient(to bottom, #FFFFFF, #F9FAFB)', y: parallaxY }}
      />
      <div className="container mx-auto px-4 max-w-[1200px] relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
            className="space-y-6"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1], delay: 0.1 }}
              className="text-sidebar-primary font-heading font-semibold text-sm uppercase tracking-wide"
            >
              {t.offer.badge}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1], delay: 0.2 }}
              className="font-heading font-bold text-4xl md:text-5xl text-card-foreground"
            >
              {t.offer.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1], delay: 0.3 }}
              className="text-muted-foreground text-lg leading-relaxed"
            >
              {t.offer.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1], delay: 0.4 }}
            >
              <Link
                href="/contact#contact-form"
                data-testid="button-book-consultation"
                className="cta-button inline-flex items-center gap-2 bg-sidebar-primary text-card-foreground font-heading font-semibold px-8 py-4 rounded-lg transition-all duration-300 group"
              >
                <span>{t.offer.cta}</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right — Consultation Card */}
          <div className="hidden md:block">
            <ConsultationCard isVisible={isVisible} />
          </div>
        </div>
      </div>

      <style>{`
        .cta-button { box-shadow: 0 4px 12px rgba(244, 180, 0, 0.3); }
        .cta-button:hover { box-shadow: 0 6px 20px rgba(244, 180, 0, 0.5); transform: translateY(-2px); filter: brightness(1.05); }
        .cta-button:active { transform: translateY(0); }
      `}</style>
    </section>
  );
}
