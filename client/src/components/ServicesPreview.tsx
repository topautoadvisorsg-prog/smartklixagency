import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ServiceCard from "./ServiceCard";
import MonitorIcon from "./icons/MonitorIcon";
import GearIcon from "./icons/GearIcon";
import RocketIcon from "./icons/RocketIcon";

/**
 * ServicesPreview - Showcases core service offerings
 * 
 * Features Framer Motion scroll-triggered animations, parallax background,
 * and staggered card reveals for premium UX.
 */
export default function ServicesPreview() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const services = [
    {
      icon: MonitorIcon,
      title: "Website Development",
      description: "Modern, responsive, conversion-focused websites built to scale with your business.",
      link: "/services#web-development"
    },
    {
      icon: GearIcon,
      title: "Automation & Integrations",
      description: "We connect your systems—CRMs, payments, chatbots, and email—so your business runs automatically.",
      link: "/services#automation"
    },
    {
      icon: RocketIcon,
      title: "Digital Brand Services",
      description: "From naming to launches, we craft your brand identity and digital presence.",
      link: "/services#branding"
    }
  ];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
    layoutEffect: false
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 20]);

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
      data-testid="section-services-preview"
    >
      <motion.div 
        className="absolute inset-0 -z-10"
        style={{ 
          background: 'linear-gradient(to bottom, #F9FAFB, #FFFFFF)',
          y: parallaxY
        }}
      />
      
      <div className="container mx-auto px-4 max-w-[1200px] relative">
        <div className="text-center mb-16">
          <motion.h2 
            className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            What We Do
          </motion.h2>
          <div className="flex justify-center mb-6">
            <motion.div 
              className="h-1 bg-sidebar-primary rounded-full"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 48, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            />
          </div>
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" 
            style={{ letterSpacing: '0.2px' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
          >
            From websites to full business automation — Smart Klix helps your brand run on autopilot.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.title} 
              {...service}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
