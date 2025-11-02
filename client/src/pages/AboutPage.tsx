import Header from "@/components/Header";
import AboutHero from "@/components/AboutHero";
import MissionStorySection from "@/components/MissionStorySection";
import TeamGrid from "@/components/TeamGrid";
import ValuesSection from "@/components/ValuesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function AboutPage() {
  //todo: remove mock functionality
  const teamMembers = [
    {
      name: "Jovan Palomera",
      role: "Director of Strategy & Solutions",
      bio: "Strategic visionary with over 8 years of experience helping businesses leverage technology for growth.",
      initials: "JP",
      specialization: "Digital Transformation & Business Growth"
    },
    {
      name: "Christian De La Rosa",
      role: "Director of Operations",
      bio: "Operations expert focused on delivering projects on time and exceeding client expectations.",
      initials: "CD",
      specialization: "Project Management & Quality Assurance"
    },
    {
      name: "Sofia Martínez",
      role: "Lead Web Designer",
      bio: "Creative designer with a passion for creating beautiful, functional websites that convert visitors into customers.",
      initials: "SM",
      specialization: "UX/UI Design & Brand Identity"
    },
    {
      name: "Javier Torres",
      role: "Automation Engineer",
      bio: "Technical specialist in AI and automation solutions that save businesses time and increase efficiency.",
      initials: "JT",
      specialization: "Specialized in GPT Integrations"
    },
    {
      name: "Andrea Gomez",
      role: "Client Success Manager",
      bio: "Dedicated to ensuring every client achieves their goals with ongoing support and guidance.",
      initials: "AG",
      specialization: "Client Relations & Support Excellence"
    },
    {
      name: "Diego Morales",
      role: "SEO & Content Strategist",
      bio: "SEO expert focused on improving search rankings and driving organic traffic for your business.",
      initials: "DM",
      specialization: "Search Engine Optimization & Analytics"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
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
