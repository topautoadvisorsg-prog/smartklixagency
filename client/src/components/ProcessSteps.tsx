import { useEffect, useRef, useState } from "react";
import { Search, Code, Settings, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Step {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function ProcessSteps() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const steps: Step[] = [
    {
      number: "1",
      icon: Search,
      title: "Discover",
      description: "We research and plan with your goals in mind"
    },
    {
      number: "2",
      icon: Code,
      title: "Build",
      description: "We design and develop a custom website"
    },
    {
      number: "3",
      icon: Settings,
      title: "Automate",
      description: "We integrate AI and automation tools for efficiency"
    },
    {
      number: "4",
      icon: Rocket,
      title: "Launch & Grow",
      description: "We deploy your site and optimize for growth"
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
      className="py-20 md:py-24 relative overflow-hidden bg-gradient-to-b from-white to-gray-50"
      data-testid="section-process-steps"
    >
      {/* Background Light Sweep */}
      <div className="absolute inset-0 -z-10 light-sweep-bg" />

      <div className="container mx-auto px-4 max-w-[1200px] relative">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 
            className={`font-heading font-bold text-4xl md:text-5xl text-card-foreground mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            How SmartKlix Delivers Results
          </h2>
          <p 
            className={`text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-150 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            A proven process that combines research, design, and automation to build growth-ready systems.
          </p>
        </div>

        {/* Timeline Container - Desktop Horizontal */}
        <div className="hidden md:block relative">
          {/* Connecting Line */}
          <div className="absolute top-20 left-0 right-0 h-[2px] flex items-center justify-center">
            <div className="w-[85%] mx-auto relative overflow-hidden">
              <div className="h-[2px] bg-gradient-to-r from-transparent via-[#F4B400]/30 to-transparent" />
              <div className="absolute inset-0 h-[2px] bg-gradient-to-r from-transparent via-[#F4B400] to-transparent animated-line-flow" />
            </div>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className={`flex flex-col items-center text-center process-step-card transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${300 + index * 150}ms` }}
                  data-testid={`step-${step.number}`}
                >
                  {/* Gold Circle Badge with Icon */}
                  <div className="relative mb-6">
                    <div className="w-40 h-40 rounded-full bg-[#F4B400] flex items-center justify-center badge-glow-pulse shadow-lg">
                      <Icon className="w-16 h-16 text-white" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-heading font-bold text-xl md:text-2xl text-[#0D1B2A] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#4F4F4F] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Vertical Stack */}
        <div className="md:hidden space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className={`flex flex-col items-center text-center transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${300 + index * 150}ms` }}
                data-testid={`step-${step.number}-mobile`}
              >
                {/* Gold Circle Badge with Icon */}
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full bg-[#F4B400] flex items-center justify-center shadow-lg">
                    <Icon className="w-10 h-10 text-white" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-heading font-bold text-xl text-[#0D1B2A] mb-3">
                  {step.title}
                </h3>
                <p className="text-[#4F4F4F] leading-relaxed px-4">
                  {step.description}
                </p>

                {/* Connecting Line (not on last item) */}
                {index < steps.length - 1 && (
                  <div className="w-[2px] h-12 bg-gradient-to-b from-[#F4B400]/30 via-[#F4B400]/60 to-[#F4B400]/30 mt-6" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
