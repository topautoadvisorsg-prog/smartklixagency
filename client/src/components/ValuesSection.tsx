import { useEffect, useRef, useState } from "react";
import { Settings, Brain, Rocket, Handshake } from "lucide-react";

interface ValuePillar {
  icon: typeof Settings;
  title: string;
  description: string;
}

export default function ValuesSection() {
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

  const values: ValuePillar[] = [
    {
      icon: Settings,
      title: "Automation-Driven Thinking",
      description: "Every solution we build is designed to save time and eliminate repetition."
    },
    {
      icon: Brain,
      title: "Intelligent Design",
      description: "We blend data, creativity, and AI to deliver sleek, user-focused experiences."
    },
    {
      icon: Rocket,
      title: "Scalable Foundations",
      description: "SmartKlix systems are modular — ready to grow as your business grows."
    },
    {
      icon: Handshake,
      title: "Human Collaboration",
      description: "Behind every system is a team that listens, understands, and executes with purpose."
    }
  ];

  const shouldAnimate = !reducedMotion && !isMobile;

  return (
    <section 
      id="values-section" 
      ref={sectionRef}
      className="relative py-32 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
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
            data-testid="heading-values"
          >
            Why Businesses Choose SmartKlix
          </h2>
          <p 
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
            data-testid="text-values-description"
          >
            We don't just build websites or automations — we build reliable systems that help businesses grow smarter every day.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {values.map((value, index) => (
            <ValueCard
              key={value.title}
              value={value}
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
      className="absolute inset-0 w-full h-full opacity-5"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        </pattern>
      </defs>
      
      <rect width="100%" height="100%" fill="url(#grid)" />
      
      <g className="network-lines">
        <line x1="15%" y1="25%" x2="35%" y2="30%" stroke="hsl(var(--primary))" strokeWidth="1.5" className="animate-pulse-line" opacity="0.3" />
        <line x1="35%" y1="30%" x2="65%" y2="28%" stroke="hsl(var(--primary))" strokeWidth="1.5" className="animate-pulse-line" style={{ animationDelay: "0.5s" }} opacity="0.3" />
        <line x1="65%" y1="28%" x2="85%" y2="32%" stroke="hsl(var(--primary))" strokeWidth="1.5" className="animate-pulse-line" style={{ animationDelay: "1s" }} opacity="0.3" />
        <line x1="15%" y1="75%" x2="35%" y2="70%" stroke="hsl(var(--primary))" strokeWidth="1.5" className="animate-pulse-line" style={{ animationDelay: "1.5s" }} opacity="0.3" />
        <line x1="35%" y1="70%" x2="65%" y2="72%" stroke="hsl(var(--primary))" strokeWidth="1.5" className="animate-pulse-line" style={{ animationDelay: "2s" }} opacity="0.3" />
        <line x1="65%" y1="72%" x2="85%" y2="68%" stroke="hsl(var(--primary))" strokeWidth="1.5" className="animate-pulse-line" style={{ animationDelay: "2.5s" }} opacity="0.3" />
      </g>

      <circle cx="25%" cy="27%" r="3" fill="hsl(var(--primary))" className="animate-pulse-slow" opacity="0.4" />
      <circle cx="50%" cy="29%" r="3" fill="hsl(var(--primary))" className="animate-pulse-slow" style={{ animationDelay: "1s" }} opacity="0.4" />
      <circle cx="75%" cy="30%" r="3" fill="hsl(var(--primary))" className="animate-pulse-slow" style={{ animationDelay: "2s" }} opacity="0.4" />
      <circle cx="25%" cy="72%" r="3" fill="hsl(var(--primary))" className="animate-pulse-slow" style={{ animationDelay: "3s" }} opacity="0.4" />
      <circle cx="50%" cy="71%" r="3" fill="hsl(var(--primary))" className="animate-pulse-slow" style={{ animationDelay: "4s" }} opacity="0.4" />
      <circle cx="75%" cy="70%" r="3" fill="hsl(var(--primary))" className="animate-pulse-slow" style={{ animationDelay: "5s" }} opacity="0.4" />
    </svg>
  );
}

interface ValueCardProps {
  value: ValuePillar;
  index: number;
  isVisible: boolean;
  shouldAnimate: boolean;
}

function ValueCard({ value, index, isVisible, shouldAnimate }: ValueCardProps) {
  const Icon = value.icon;
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
      data-testid={`card-value-${value.title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="h-full bg-white/95 backdrop-blur-lg border border-card-border rounded-2xl p-8 shadow-md hover-elevate active-elevate-2 transition-all duration-300 hover:-translate-y-1.5 hover:border-sidebar-primary/50 hover:shadow-[0_8px_30px_rgba(244,180,0,0.25)]">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-sidebar-primary/10 blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
            <div className={`relative w-20 h-20 rounded-full border-2 border-sidebar-primary/30 flex items-center justify-center bg-gradient-to-br from-sidebar-primary/5 to-sidebar-primary/10 ${shouldAnimate ? 'icon-pulse-slow' : ''}`}>
              <Icon className="w-10 h-10 text-sidebar-primary" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        <div className="text-center space-y-3">
          <h3 
            className="font-heading font-bold text-xl text-foreground"
            data-testid={`text-title-${value.title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {value.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {value.description}
          </p>
        </div>
      </div>
    </div>
  );
}
