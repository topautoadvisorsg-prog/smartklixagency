import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

function CodeOverlay({ parallaxOffset }: { parallaxOffset: number }) {
  const codeSnippets = [
    '<div className="hero">',
    '  {/* Component */}',
    '</div>',
    'const build = () => {',
    '  return optimized;',
    '};',
    '<section>',
    '  <Layout />',
    '</section>',
  ];

  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{
        transform: `translateY(${parallaxOffset * 0.5}px)`, // Background moves at 50% of mockups speed
        willChange: 'transform',
      }}
    >
      <div className="code-scroll">
        {codeSnippets.map((snippet, i) => (
          <div
            key={i}
            className="code-line"
            style={{
              animationDelay: `${i * 1.5}s`,
            }}
          >
            {snippet}
          </div>
        ))}
      </div>
    </div>
  );
}

function FloatingDeviceMockups() {
  return (
    <div className="relative w-full h-full flex items-center justify-center perspective-container">
      {/* Desktop/Laptop - Back Layer */}
      <div 
        className="absolute device-mockup device-desktop"
        data-testid="mockup-desktop"
      >
        <div className="device-screen bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg overflow-hidden shadow-2xl">
          <div className="p-8 text-white">
            <h3 className="font-heading font-bold text-2xl mb-4">
              Fix. Launch.<br />Grow. Not<br />Just Look Good
            </h3>
            <div className="space-y-2 text-xs font-mono opacity-60">
              <div>{'<div className="responsive">'}</div>
              <div className="pl-4">{'<Header />'}</div>
              <div className="pl-4">{'<Content />'}</div>
              <div>{'</div>'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tablet - Middle Layer */}
      <div 
        className="absolute device-mockup device-tablet"
        data-testid="mockup-tablet"
      >
        <div className="device-screen bg-white rounded-lg overflow-hidden shadow-xl border border-slate-200">
          <div className="p-6">
            <div className="text-xs text-slate-400 mb-2">Since mols</div>
            <h4 className="font-heading font-bold text-lg mb-2">
              Professional<br />Web Design for<br />Your Business
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Complete websites<br />served to your needs
            </p>
          </div>
        </div>
      </div>

      {/* Mobile - Front Layer */}
      <div 
        className="absolute device-mockup device-mobile"
        data-testid="mockup-mobile"
      >
        <div className="device-screen bg-white rounded-md overflow-hidden shadow-lg border border-slate-200">
          <div className="p-3">
            <div className="text-[8px] text-slate-400 mb-1 flex justify-between">
              <span>Home</span>
              <span>2 Se to case</span>
            </div>
            <h5 className="font-heading font-bold text-xs mb-2">
              Web Developer
            </h5>
            <p className="text-[7px] text-slate-600 mb-2">
              Top Rated Websites
            </p>
            <div className="text-[6px] text-slate-500">
              Our Core Services
            </div>
          </div>
        </div>
      </div>

      {/* Light Sweep Effect */}
      <div className="light-sweep" />
    </div>
  );
}

export default function WebDevelopmentSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const mockupsRef = useRef<HTMLDivElement>(null);

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

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let rafId: number;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        if (!sectionRef.current) return;

        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Only calculate parallax when section is in view
        if (rect.top < windowHeight && rect.bottom > 0) {
          const scrollDelta = window.scrollY - lastScrollY;
          const parallaxSpeed = 0.3; // Mockups move 30% slower than scroll
          
          setParallaxOffset(prev => prev - (scrollDelta * parallaxSpeed));
        }
        
        lastScrollY = window.scrollY;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 lg:py-36 overflow-hidden bg-gradient-to-br from-white via-slate-50/50 to-blue-50/20"
      data-testid="section-web-development"
    >
      <CodeOverlay parallaxOffset={parallaxOffset} />
      
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[0.4fr_0.6fr] gap-12 lg:gap-20 items-center">
          {/* Left Column - Text Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: '0.3s',
            }}
          >
            <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground mb-6">
              Websites That Convert, Not Just Look Good
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              Smart&nbsp;Klix builds blazing-fast, SEO-optimized websites designed to convert — crafted for scalability, speed, and style.
            </p>

            <Button
              size="lg"
              className="bg-[#F4B400] hover:bg-[#F4B400] text-white font-semibold px-8 transition-all duration-300 hover:shadow-[0_0_20px_rgba(244,180,0,0.4)] hover:-translate-y-1"
              data-testid="button-web-projects"
            >
              See Web Projects
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Right Column - Device Mockups */}
          <div
            ref={mockupsRef}
            className={`relative h-[400px] md:h-[500px] lg:h-[600px] transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: '0.5s',
              transform: `translateY(${parallaxOffset}px)`,
              willChange: 'transform',
            }}
          >
            <FloatingDeviceMockups />
          </div>
        </div>
      </div>
    </section>
  );
}
