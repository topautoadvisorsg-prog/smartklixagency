import FAQAccordion from "../FAQAccordion";

export default function FAQAccordionExample() {
  const faqs = [
    {
      question: "How quickly can you build my website?",
      answer: "Most websites are completed within 1-2 weeks, depending on complexity. We'll provide a clear timeline during our initial consultation."
    },
    {
      question: "Do you offer ongoing maintenance?",
      answer: "Yes, we offer monthly maintenance packages that include updates, security monitoring, and performance optimization to keep your site running smoothly."
    }
  ];

  return <FAQAccordion faqs={faqs} />;
}
