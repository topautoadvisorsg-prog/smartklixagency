import { useEffect, useRef, useState } from "react";
import { Plus, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";

/**
 * FAQAccordion - Frequently Asked Questions section
 * 
 * Uses shadcn Accordion primitives with custom trigger styling for brand consistency.
 * First question is expanded by default for better UX. Custom icon rendering replaces
 * default chevron to match brand specifications.
 */
export default function FAQAccordion() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [openItem, setOpenItem] = useState<string>("item-0");

  const faqData = [
    {
      question: t.contactPage.faq.questions.cost.question,
      answer: t.contactPage.faq.questions.cost.answer
    },
    {
      question: t.contactPage.faq.questions.timeline.question,
      answer: t.contactPage.faq.questions.timeline.answer
    },
    {
      question: t.contactPage.faq.questions.process.question,
      answer: t.contactPage.faq.questions.process.answer
    },
    {
      question: t.contactPage.faq.questions.support.question,
      answer: t.contactPage.faq.questions.support.answer
    }
  ];

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
      className="py-20 md:py-24 bg-background"
      data-testid="section-faq"
    >
      <div className="container mx-auto px-4 max-w-[800px]">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
          className="font-heading font-bold text-4xl md:text-5xl text-center text-card-foreground mb-16"
        >
          {t.contactPage.faq.title}
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1], delay: 0.1 }}
        >
          <Accordion 
            type="single" 
            collapsible 
            value={openItem}
            onValueChange={setOpenItem}
            className="border-t border-border"
          >
            {faqData.map((faq, index) => {
              const itemValue = `item-${index}`;
              const isOpen = openItem === itemValue;
              
              return (
                <AccordionItem 
                  key={index}
                  value={itemValue}
                  className="border-b border-border"
                  data-testid={`faq-item-${index}`}
                >
                  <AccordionPrimitive.Header className="flex">
                    <AccordionPrimitive.Trigger
                      className={cn(
                        "flex flex-1 items-center justify-between py-6 text-left font-heading font-semibold text-lg md:text-xl text-card-foreground transition-colors",
                        "hover:text-sidebar-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                        "disabled:pointer-events-none disabled:opacity-50"
                      )}
                      data-testid={`button-faq-${index}`}
                    >
                      <span className="pr-4">{faq.question}</span>
                      {isOpen ? (
                        <ChevronRight className="h-6 w-6 shrink-0 text-sidebar-primary transition-transform duration-300 rotate-90" />
                      ) : (
                        <Plus className="h-6 w-6 shrink-0 text-sidebar-primary transition-transform duration-300" />
                      )}
                    </AccordionPrimitive.Trigger>
                  </AccordionPrimitive.Header>
                  <AccordionContent 
                    className="text-muted-foreground text-base md:text-lg leading-relaxed pb-6"
                    data-testid={`text-faq-answer-${index}`}
                  >
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
