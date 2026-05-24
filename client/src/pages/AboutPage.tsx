import { useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";
import Header from "@/components/Header";
import AboutHero from "@/components/AboutHero";
import MissionStorySection from "@/components/MissionStorySection";
import TeamGrid from "@/components/TeamGrid";
import ValuesSection from "@/components/ValuesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import SEOMeta from "@/components/SEOMeta";

export default function AboutPage() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  const teamMembers = [
    {
      name: "Jovan Palomera",
      role: language === 'en' ? "Director of Strategy & Solutions" : "Director de Estrategia y Soluciones",
      bio: language === 'en' 
        ? "Strategic visionary with over 8 years of experience helping businesses leverage technology for growth."
        : "Visionario estratégico con más de 8 años de experiencia ayudando a empresas a aprovechar la tecnología para crecer.",
      initials: "JP",
      specialization: language === 'en' ? "Digital Transformation & Business Growth" : "Transformación Digital y Crecimiento Empresarial",
      image: "/team/jovan.jpg"
    },
    {
      name: "Heraclio (JR) Munoz",
      role: language === 'en' ? "Director of Operations" : "Director de Operaciones",
      bio: language === 'en'
        ? "Operations expert focused on delivering projects on time and exceeding client expectations."
        : "Experto en operaciones enfocado en entregar proyectos a tiempo y superar las expectativas del cliente.",
      initials: "HM",
      specialization: language === 'en' ? "Project Management & Quality Assurance" : "Gestión de Proyectos y Aseguramiento de Calidad"
    },
    {
      name: "Diego Morales",
      role: language === 'en' ? "SEO & Content Strategist" : "Estratega de SEO y Contenidos",
      bio: language === 'en'
        ? "SEO expert focused on improving search rankings and driving organic traffic for your business."
        : "Experto en SEO enfocado en mejorar el posicionamiento en búsquedas y generar tráfico orgánico para tu negocio.",
      initials: "DM",
      specialization: language === 'en' ? "Search Engine Optimization & Analytics" : "Optimización de Motores de Búsqueda y Analítica",
      image: "/team/diego.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOMeta 
        title={t.metadata.about.title}
        description={t.metadata.about.description}
        canonicalUrl="/about"
      />
      <Header />
      <AboutHero />
      <MissionStorySection />
      <TeamGrid members={teamMembers} />
      <ValuesSection />
      <CTASection />
      <Footer />
    </div>
  );
}
