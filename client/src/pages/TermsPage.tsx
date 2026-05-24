import { useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";

/**
 * SECTION: Terms of Service Page - Last updated Nov 2025
 * 
 * Simple placeholder page for Terms of Service with bilingual support.
 * Content should be populated with actual legal terms and conditions.
 */
export default function TermsPage() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  useEffect(() => {
    document.title = language === 'en' 
      ? "Terms of Service | SmartKlix"
      : "Términos de Servicio | SmartKlix";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', language === 'en'
        ? "Read SmartKlix's Terms of Service to understand the rules and guidelines for using our website and services."
        : "Lea los Términos de Servicio de SmartKlix para entender las reglas y pautas para usar nuestro sitio web y servicios."
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
          {language === 'en' ? 'Terms of Service' : 'Términos de Servicio'}
        </h1>
        
        <p className="text-muted-foreground text-lg mb-8">
          {language === 'en' 
            ? 'Last updated: November 2, 2025'
            : 'Última actualización: 2 de noviembre de 2025'}
        </p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">
              {language === 'en' ? '1. Agreement to Terms' : '1. Aceptación de los Términos'}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {language === 'en'
                ? 'By accessing or using SmartKlix\'s website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.'
                : 'Al acceder o usar el sitio web y los servicios de SmartKlix, usted acepta estar sujeto a estos Términos de Servicio. Si no está de acuerdo con estos términos, por favor no use nuestros servicios.'}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">
              {language === 'en' ? '2. Use of Services' : '2. Uso de los Servicios'}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {language === 'en'
                ? 'You may use our services only for lawful purposes and in accordance with these Terms. You agree not to use our services in any way that violates any applicable law or regulation.'
                : 'Puede usar nuestros servicios solo con fines legales y de acuerdo con estos Términos. Usted acepta no usar nuestros servicios de ninguna manera que viole cualquier ley o regulación aplicable.'}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">
              {language === 'en' ? '3. Intellectual Property' : '3. Propiedad Intelectual'}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {language === 'en'
                ? 'All content, features, and functionality on our website are owned by SmartKlix and are protected by international copyright, trademark, and other intellectual property laws.'
                : 'Todo el contenido, características y funcionalidad en nuestro sitio web son propiedad de SmartKlix y están protegidos por leyes internacionales de derechos de autor, marcas comerciales y otras leyes de propiedad intelectual.'}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">
              {language === 'en' ? '4. Limitation of Liability' : '4. Limitación de Responsabilidad'}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {language === 'en'
                ? 'To the fullest extent permitted by law, SmartKlix shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.'
                : 'En la medida máxima permitida por la ley, SmartKlix no será responsable de ningún daño indirecto, incidental, especial, consecuente o punitivo que resulte de su uso de nuestros servicios.'}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">
              {language === 'en' ? '5. Changes to Terms' : '5. Cambios en los Términos'}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {language === 'en'
                ? 'We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page with an updated effective date.'
                : 'Nos reservamos el derecho de modificar estos Términos en cualquier momento. Le notificaremos de cualquier cambio publicando los nuevos Términos en esta página con una fecha de vigencia actualizada.'}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">
              {language === 'en' ? '6. Contact Information' : '6. Información de Contacto'}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {language === 'en'
                ? 'For questions about these Terms of Service, please contact us at: '
                : 'Para preguntas sobre estos Términos de Servicio, contáctenos en: '}
              <a 
                href="mailto:hello@smartklix.com" 
                className="text-primary hover:text-sidebar-primary transition-colors"
                data-testid="link-terms-email"
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
