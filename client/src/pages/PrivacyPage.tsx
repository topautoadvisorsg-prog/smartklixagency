import { useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";

/**
 * SECTION: Privacy Policy Page - Last updated Nov 2025
 * 
 * Simple placeholder page for Privacy Policy with bilingual support.
 * Content should be populated with actual legal privacy policy text.
 */
export default function PrivacyPage() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  useEffect(() => {
    document.title = language === 'en' 
      ? "Privacy Policy | SmartKlix"
      : "Política de Privacidad | SmartKlix";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', language === 'en'
        ? "Read SmartKlix's Privacy Policy to understand how we collect, use, and protect your personal information."
        : "Lea la Política de Privacidad de SmartKlix para entender cómo recopilamos, usamos y protegemos su información personal."
      );
    }
  }, [language]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header Spacer */}
      <div className="h-[90px]" />

      {/* Content */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="font-heading font-bold text-5xl md:text-6xl text-foreground mb-6">
          {language === 'en' ? 'Privacy Policy' : 'Política de Privacidad'}
        </h1>
        
        <p className="text-muted-foreground text-lg mb-8">
          {language === 'en' 
            ? 'Last updated: November 2, 2025'
            : 'Última actualización: 2 de noviembre de 2025'}
        </p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">
              {language === 'en' ? '1. Introduction' : '1. Introducción'}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {language === 'en'
                ? 'SmartKlix ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.'
                : 'SmartKlix ("nosotros", "nuestro" o "nos") se compromete a proteger su privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y protegemos su información cuando visita nuestro sitio web o utiliza nuestros servicios.'}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">
              {language === 'en' ? '2. Information We Collect' : '2. Información que Recopilamos'}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {language === 'en'
                ? 'We collect information that you provide directly to us, including your name, email address, phone number, and any other information you choose to provide when contacting us or using our services.'
                : 'Recopilamos información que usted nos proporciona directamente, incluyendo su nombre, dirección de correo electrónico, número de teléfono y cualquier otra información que elija proporcionar al contactarnos o usar nuestros servicios.'}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">
              {language === 'en' ? '3. How We Use Your Information' : '3. Cómo Usamos su Información'}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {language === 'en'
                ? 'We use the information we collect to provide, maintain, and improve our services, to communicate with you, to respond to your inquiries, and to send you technical notices and support messages.'
                : 'Usamos la información que recopilamos para proporcionar, mantener y mejorar nuestros servicios, comunicarnos con usted, responder a sus consultas y enviarle avisos técnicos y mensajes de soporte.'}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">
              {language === 'en' ? '4. Data Security' : '4. Seguridad de Datos'}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {language === 'en'
                ? 'We implement appropriate technical and organizational measures to protect the security of your personal information. However, please note that no method of transmission over the Internet is 100% secure.'
                : 'Implementamos medidas técnicas y organizativas apropiadas para proteger la seguridad de su información personal. Sin embargo, tenga en cuenta que ningún método de transmisión por Internet es 100% seguro.'}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">
              {language === 'en' ? '5. Contact Us' : '5. Contáctenos'}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {language === 'en'
                ? 'If you have any questions about this Privacy Policy, please contact us at: '
                : 'Si tiene alguna pregunta sobre esta Política de Privacidad, contáctenos en: '}
              <a 
                href="mailto:hello@smartklix.com" 
                className="text-primary hover:text-sidebar-primary transition-colors"
                data-testid="link-privacy-email"
              >
                hello@smartklix.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
