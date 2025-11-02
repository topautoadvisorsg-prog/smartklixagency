import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface BrandElement {
  id: string;
  type: 'logo' | 'palette' | 'typography' | 'mockup';
  x: number;
  y: number;
  delay: number;
}

const brandElements: BrandElement[] = [
  { id: 'logo-1', type: 'logo', x: 65, y: 15, delay: 0 },
  { id: 'logo-2', type: 'logo', x: 70, y: 55, delay: 0.3 },
  { id: 'palette', type: 'palette', x: 15, y: 35, delay: 0.6 },
  { id: 'typography', type: 'typography', x: 75, y: 30, delay: 0.9 },
  { id: 'mockup', type: 'mockup', x: 60, y: 65, delay: 1.2 },
];

function BrandElements() {
  return (
    <div className="relative w-full h-full min-h-[500px]">
      {/* Ambient Light Layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="ambient-light-1" />
        <div className="ambient-light-2" />
      </div>

      {/* Particle Drift Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="brand-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* SVG Orbit Paths */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.6 }}>
        <defs>
          <filter id="orbit-glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Orbit connecting logo-1 to palette */}
        <path
          d="M 390 90 Q 300 150, 210 210"
          fill="none"
          stroke="#F4B400"
          strokeWidth="1"
          opacity="0.2"
        />
        <path
          d="M 390 90 Q 300 150, 210 210"
          fill="none"
          stroke="#F4B400"
          strokeWidth="2"
          opacity="0.6"
          className="orbit-trail"
          filter="url(#orbit-glow)"
          style={{ animationDelay: '0s' }}
        />

        {/* Orbit connecting typography to logo-2 */}
        <path
          d="M 450 180 Q 480 280, 420 330"
          fill="none"
          stroke="#F4B400"
          strokeWidth="1"
          opacity="0.2"
        />
        <path
          d="M 450 180 Q 480 280, 420 330"
          fill="none"
          stroke="#F4B400"
          strokeWidth="2"
          opacity="0.6"
          className="orbit-trail"
          filter="url(#orbit-glow)"
          style={{ animationDelay: '1.5s' }}
        />

        {/* Orbit connecting palette to mockup */}
        <path
          d="M 210 210 Q 280 320, 360 390"
          fill="none"
          stroke="#F4B400"
          strokeWidth="1"
          opacity="0.2"
        />
        <path
          d="M 210 210 Q 280 320, 360 390"
          fill="none"
          stroke="#F4B400"
          strokeWidth="2"
          opacity="0.6"
          className="orbit-trail"
          filter="url(#orbit-glow)"
          style={{ animationDelay: '3s' }}
        />
      </svg>

      {/* Brand Elements */}
      {brandElements.map((element) => (
        <div
          key={element.id}
          className="absolute brand-element"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            transform: 'translate(-50%, -50%)',
            animationDelay: `${element.delay}s`,
          }}
        >
          {element.type === 'logo' && (
            <div className="logo-sketch relative">
              <svg width="80" height="80" viewBox="0 0 80 80" className="logo-rotate">
                <path
                  d="M 20 25 Q 20 15, 30 15 L 50 15 Q 60 15, 60 25 Q 60 35, 50 40 L 30 40 Q 20 40, 20 50 Q 20 60, 30 65 L 50 65 Q 60 65, 60 55"
                  fill="none"
                  stroke="#F4B400"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          )}

          {element.type === 'palette' && (
            <div className="palette-cards flex gap-3">
              <div className="palette-card bg-[#0D1B2A] w-12 h-12 rounded-full" style={{ animationDelay: '0s' }} />
              <div className="palette-card bg-[#F4B400] w-12 h-12 rounded-full" style={{ animationDelay: '0.2s' }} />
              <div className="palette-card bg-gray-300 w-12 h-12 rounded-full" style={{ animationDelay: '0.4s' }} />
            </div>
          )}

          {element.type === 'typography' && (
            <div className="typography-sample text-6xl font-bold text-[#0D1B2A]">
              <span className="typewriter-char" style={{ animationDelay: '0s' }}>A</span>
              <span className="typewriter-char" style={{ animationDelay: '0.15s' }}>a</span>
            </div>
          )}

          {element.type === 'mockup' && (
            <div className="product-mockup relative">
              <div className="w-32 h-40 bg-white rounded-lg shadow-2xl flex items-center justify-center product-breathing border border-gray-200">
                <svg width="60" height="60" viewBox="0 0 60 60">
                  <path
                    d="M 15 18 Q 15 12, 21 12 L 39 12 Q 45 12, 45 18 Q 45 24, 39 27 L 21 27 Q 15 27, 15 33 Q 15 39, 21 42 L 39 42 Q 45 42, 45 36"
                    fill="none"
                    stroke="#F4B400"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function BrandServicesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 lg:py-36 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
      data-testid="section-brand-services"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Text Content */}
          <div
            className={`space-y-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0.3s' }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Your Brand,<br />
              Engineered to<br />
              Impress
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              From naming to design systems, Smart&nbsp;Klix crafts bold, consistent identities 
              built to stand out and sell across every digital touchpoint.
            </p>

            <Button
              size="lg"
              className="bg-[#F4B400] hover:bg-[#F4B400] text-white font-semibold px-8 py-6 text-lg brand-cta-button"
              data-testid="button-branding-cta"
            >
              See Branding Work
            </Button>
          </div>

          {/* Right Column - Brand Elements Visualization */}
          <div
            className={`relative transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '0.5s' }}
          >
            <BrandElements />
          </div>
        </div>
      </div>
    </section>
  );
}
