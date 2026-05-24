import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Mail, Phone, Globe } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";

/**
 * ContactInfoHours - Premium glassmorphic contact info section
 * 
 * Features four floating cards with business hours, email, phone, and location.
 * Includes animated gold icon pulses, connecting lines, hover effects, and
 * scroll-triggered entrance animations.
 */
export default function ContactInfoHours() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const contactInfo = [
    {
      icon: Calendar,
      label: t.contactPage.info.hours.label,
      details: [
        t.contactPage.info.hours.weekdays,
        t.contactPage.info.hours.saturday,
        t.contactPage.info.hours.sunday
      ],
      testId: "card-business-hours"
    },
    {
      icon: Mail,
      label: t.contactPage.info.email.label,
      details: [t.contactPage.info.email.address],
      link: "mailto:hello@smartklix.com",
      testId: "card-email"
    },
    {
      icon: Phone,
      label: t.contactPage.info.phone.label,
      details: [t.contactPage.info.phone.number],
      link: "tel:+15555555555",
      testId: "card-phone"
    },
    {
      icon: Globe,
      label: t.contactPage.info.location.label,
      details: [t.contactPage.info.location.text],
      testId: "card-location"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="contact-info"
      className="relative py-[120px] overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F4F7FA 100%)'
      }}
      data-testid="section-contact-info"
    >
      {/* Animated connecting lines container */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="connecting-lines"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          className="font-heading font-bold text-4xl md:text-5xl text-slate-900 text-center mb-4"
          data-testid="text-contact-info-headline"
        >
          {t.contactPage.info.headline}
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1], delay: 0.1 }}
          className="text-lg md:text-xl text-slate-800 text-center mb-16 max-w-2xl mx-auto"
          data-testid="text-contact-info-subheadline"
        >
          {t.contactPage.info.subheadline}
        </motion.p>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon;
            const cardContent = (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 0.61, 0.36, 1],
                  delay: 0.15 * (index + 2)
                }}
                className="info-card group h-full"
                data-testid={info.testId}
              >
                {/* Gold circular icon with pulse animation */}
                <div className="flex justify-center mb-6">
                  <div className="icon-wrapper">
                    <IconComponent className="w-8 h-8 text-sidebar-primary" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Label */}
                <h3 className="font-heading font-semibold text-xl text-slate-900 text-center mb-4">
                  {info.label}
                </h3>

                {/* Details */}
                <div className="text-center space-y-1">
                  {info.details.map((detail, i) => (
                    <p 
                      key={i}
                      className="text-slate-800 text-sm leading-relaxed"
                    >
                      {detail}
                    </p>
                  ))}
                </div>
              </motion.div>
            );

            return info.link ? (
              <a
                key={index}
                href={info.link}
                className="block transition-transform duration-300"
              >
                {cardContent}
              </a>
            ) : (
              <div key={index}>
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .info-card {
          position: relative;
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 16px;
          padding: 48px 32px;
          transition: all 0.3s cubic-bezier(0.22, 0.61, 0.36, 1);
          box-shadow: 0 4px 24px rgba(13, 27, 42, 0.06);
        }

        .info-card:hover {
          transform: translateY(-6px);
          box-shadow: 
            0 8px 32px rgba(13, 27, 42, 0.12),
            0 0 0 1px rgba(244, 180, 0, 0.2),
            0 0 16px rgba(244, 180, 0, 0.3);
          background: rgba(255, 255, 255, 0.8);
        }

        .icon-wrapper {
          position: relative;
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid hsl(var(--sidebar-primary));
          border-radius: 50%;
          animation: iconPulse 6s ease-in-out infinite;
        }

        @keyframes iconPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
            box-shadow: 0 0 0 rgba(244, 180, 0, 0);
          }
          50% {
            transform: scale(1.15);
            opacity: 0.8;
            box-shadow: 0 0 20px rgba(244, 180, 0, 0.4);
          }
        }

        .connecting-lines {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(244, 180, 0, 0.1) 25%,
            rgba(244, 180, 0, 0.3) 50%,
            rgba(244, 180, 0, 0.1) 75%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: flowingLine 8s linear infinite;
          opacity: 0.6;
        }

        @keyframes flowingLine {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 200% 0%;
          }
        }

        @media (max-width: 1023px) {
          .connecting-lines {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
