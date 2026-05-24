import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";
import ConstellationSphere from "./ConstellationSphere";

export default function ContactUs() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [lastSubmissionTime, setLastSubmissionTime] = useState<number>(0);
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

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Spam protection - 5 minute cooldown
    const now = Date.now();
    if (now - lastSubmissionTime < 300000) {
      console.warn('Submission too soon - spam protection triggered');
      return;
    }

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    
    if (!validateEmail(email)) {
      console.error('Invalid email format');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Add hidden source page field for tracking
      formData.append('_subject', `New Smart Klix Lead from ${window.location.pathname}`);
      formData.append('sourcePage', window.location.pathname);

      const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
      
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitStatus('success');
        setLastSubmissionTime(now);
        e.currentTarget.reset();
        
        // Auto-reset status after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        throw new Error('Formspree submission failed');
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Form submission failed:', error);
      
      // Auto-reset error after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="contact-form"
      className="py-20 md:py-[100px] relative overflow-hidden"
      data-testid="section-contact-form"
    >
      <motion.div 
        className="absolute inset-0 -z-10 bg-gradient-to-b from-background to-muted/20"
        style={{ 
          y: parallaxY
        }}
      />
      
      <div className="container mx-auto px-4 max-w-[1200px] relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ 
              duration: 0.6, 
              ease: [0.22, 0.61, 0.36, 1]
            }}
            className="space-y-6"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ 
                duration: 0.6, 
                ease: [0.22, 0.61, 0.36, 1],
                delay: 0.1
              }}
              className="font-heading font-bold text-4xl md:text-5xl text-card-foreground"
            >
              {t.contactPage.form.title}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ 
                duration: 0.6, 
                ease: [0.22, 0.61, 0.36, 1],
                delay: 0.2
              }}
              className="space-y-2"
            >
              <p className="text-card-foreground text-xl font-heading font-semibold">
                {t.contactPage.form.subtitle}
              </p>
              <p className="text-foreground/90">
                {t.contactPage.form.description}
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ 
                duration: 0.6, 
                ease: [0.22, 0.61, 0.36, 1],
                delay: 0.3
              }}
              onSubmit={handleSubmit}
              className="bg-card rounded-xl p-8 space-y-5 shadow-lg"
            >
              <div className="space-y-2">
                <Label htmlFor="name">{t.contactPage.form.labels.name}</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  required
                  data-testid="input-name"
                  placeholder={t.contactPage.form.placeholders.name}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t.contactPage.form.labels.email}</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  required
                  data-testid="input-email"
                  placeholder={t.contactPage.form.placeholders.email}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{t.contactPage.form.labels.phone}</Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  data-testid="input-phone"
                  placeholder={t.contactPage.form.placeholders.phone}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">{t.contactPage.form.labels.message}</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  data-testid="input-message"
                  placeholder={t.contactPage.form.placeholders.message}
                  className="resize-none"
                />
              </div>

              <Button
                type="submit"
                data-testid="button-send-message"
                disabled={isSubmitting}
                className="w-full bg-sidebar-primary text-card-foreground font-heading font-semibold disabled:opacity-50"
                size="lg"
              >
                {isSubmitting ? 'Sending...' : t.contactPage.form.button}
              </Button>
            </motion.form>

            {/* Success/Error Banners */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg"
              >
                ✓ Message sent successfully! We'll get back to you soon.
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg"
              >
                ✗ Something went wrong. Please try again or email us directly.
              </motion.div>
            )}
          </motion.div>

          {/* Right Column - Constellation Sphere */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 0.61, 0.36, 1],
              delay: 0.3
            }}
            className="hidden md:block"
          >
            <div className="w-full h-[500px]">
              <ConstellationSphere size={500} />
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
