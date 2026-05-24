import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials?: string;
  image?: string;
  specialization?: string;
}

interface TeamGridProps {
  members: TeamMember[];
}

export default function TeamGrid({ members }: TeamGridProps) {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    
    setReducedMotion(mediaQuery.matches);
    setIsMobile(mobileQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    const handleMobileChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener("change", handleMotionChange);
    mobileQuery.addEventListener("change", handleMobileChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
      mobileQuery.removeEventListener("change", handleMobileChange);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const allMembers = [
    ...members,
    {
      name: t.aboutPage.team.members.nina.name,
      role: t.aboutPage.team.members.nina.role,
      bio: t.aboutPage.team.members.nina.bio,
      specialization: t.aboutPage.team.members.nina.specialization,
      image: "/team/nina.jpg",
      isNina: true
    }
  ];

  const shouldAnimate = !reducedMotion && !isMobile;

  return (
    <section 
      id="team-section" 
      ref={sectionRef}
      className="relative py-20 bg-gradient-to-b from-white via-blue-50/30 to-amber-50/20 overflow-hidden"
    >
      {shouldAnimate && <NetworkBackground />}
      
      <div className="container mx-auto px-4 relative z-10">
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible && shouldAnimate ? "opacity-100 translate-y-0" : !shouldAnimate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 
            className="font-heading font-bold text-5xl text-foreground mb-6"
            data-testid="heading-team"
          >
            {t.aboutPage.team.title}
          </h2>
          <p 
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
            data-testid="text-team-description"
          >
            {t.aboutPage.team.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {allMembers.map((member, index) => (
            <TeamMemberCard
              key={member.name}
              member={member}
              index={index}
              isVisible={isVisible}
              shouldAnimate={shouldAnimate}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function NetworkBackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      <g className="network-lines">
        <line x1="20%" y1="30%" x2="40%" y2="35%" stroke="hsl(var(--primary))" strokeWidth="1" className="animate-pulse-line" />
        <line x1="40%" y1="35%" x2="60%" y2="32%" stroke="hsl(var(--primary))" strokeWidth="1" className="animate-pulse-line" style={{ animationDelay: "0.5s" }} />
        <line x1="60%" y1="32%" x2="80%" y2="38%" stroke="hsl(var(--primary))" strokeWidth="1" className="animate-pulse-line" style={{ animationDelay: "1s" }} />
        <line x1="20%" y1="70%" x2="40%" y2="65%" stroke="hsl(var(--primary))" strokeWidth="1" className="animate-pulse-line" style={{ animationDelay: "1.5s" }} />
        <line x1="40%" y1="65%" x2="60%" y2="68%" stroke="hsl(var(--primary))" strokeWidth="1" className="animate-pulse-line" style={{ animationDelay: "2s" }} />
        <line x1="60%" y1="68%" x2="80%" y2="62%" stroke="hsl(var(--primary))" strokeWidth="1" className="animate-pulse-line" style={{ animationDelay: "2.5s" }} />
        <line x1="30%" y1="30%" x2="30%" y2="70%" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.3" />
        <line x1="50%" y1="32%" x2="50%" y2="68%" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.3" />
        <line x1="70%" y1="35%" x2="70%" y2="65%" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.3" />
      </g>

      <circle cx="20%" cy="30%" r="4" fill="hsl(var(--primary))" filter="url(#glow)" className="animate-pulse-slow" />
      <circle cx="40%" cy="35%" r="4" fill="hsl(var(--primary))" filter="url(#glow)" className="animate-pulse-slow" style={{ animationDelay: "0.5s" }} />
      <circle cx="60%" cy="32%" r="4" fill="hsl(var(--primary))" filter="url(#glow)" className="animate-pulse-slow" style={{ animationDelay: "1s" }} />
      <circle cx="80%" cy="38%" r="4" fill="hsl(var(--primary))" filter="url(#glow)" className="animate-pulse-slow" style={{ animationDelay: "1.5s" }} />
      <circle cx="20%" cy="70%" r="4" fill="hsl(var(--primary))" filter="url(#glow)" className="animate-pulse-slow" style={{ animationDelay: "2s" }} />
      <circle cx="40%" cy="65%" r="4" fill="hsl(var(--primary))" filter="url(#glow)" className="animate-pulse-slow" style={{ animationDelay: "2.5s" }} />
      <circle cx="60%" cy="68%" r="4" fill="hsl(var(--primary))" filter="url(#glow)" className="animate-pulse-slow" style={{ animationDelay: "3s" }} />
      <circle cx="80%" cy="62%" r="4" fill="hsl(var(--primary))" filter="url(#glow)" className="animate-pulse-slow" style={{ animationDelay: "3.5s" }} />
    </svg>
  );
}

interface TeamMemberCardProps {
  member: TeamMember & { isNina?: boolean };
  index: number;
  isVisible: boolean;
  shouldAnimate: boolean;
}

function TeamMemberCard({ member, index, isVisible, shouldAnimate }: TeamMemberCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const delay = shouldAnimate ? index * 200 : 0;

  return (
    <div
      className={`relative group transition-all duration-700 ${
        isVisible && shouldAnimate
          ? "opacity-100 translate-y-0"
          : !shouldAnimate
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      data-testid={`card-team-${member.name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="bg-card border border-card-border rounded-2xl p-6 space-y-4 hover-elevate active-elevate-2 transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(244,180,0,0.3)]">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-primary/60 opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-300" />
            
            {member.image ? (
              <div className="relative w-40 h-40 rounded-full border-4 border-primary/40 shadow-[0_0_20px_rgba(244,180,0,0.4)] overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center border-4 border-primary/40 shadow-[0_0_20px_rgba(244,180,0,0.4)]">
                <span className="font-heading font-bold text-4xl text-white">
                  {member.initials || member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="text-center space-y-2">
          <h3 
            className="font-heading font-semibold text-xl text-card-foreground"
            data-testid={`text-name-${member.name.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {member.name}
          </h3>
          <p 
            className="text-sm text-primary font-medium"
            data-testid={`text-role-${member.name.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {member.role}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {member.bio}
          </p>
        </div>

        {member.specialization && showTooltip && (
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#0D1B2A] text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg border border-primary/30 animate-fade-in">
            {member.specialization}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0D1B2A] rotate-45 border-r border-b border-primary/30" />
          </div>
        )}
      </div>
    </div>
  );
}
