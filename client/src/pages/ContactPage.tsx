import { useEffect } from "react";
import Header from "@/components/Header";
import ContactHero from "@/components/ContactHero";
import ContactInfoHours from "@/components/ContactInfoHours";
import ContactUs from "@/components/ContactUs";
import FAQAccordion from "@/components/FAQAccordion";
import Footer from "@/components/Footer";

export default function ContactPage() {
  useEffect(() => {
    document.title = "Contact Us | Smart Klix";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Get in touch with Smart Klix. Book a free consultation to discuss intelligent websites, automation, and digital systems that grow with your business.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ContactHero />
      <ContactInfoHours />
      <ContactUs />
      <FAQAccordion />
      <Footer />
    </div>
  );
}
