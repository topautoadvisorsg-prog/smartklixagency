import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Mail, MessageSquare, BarChart3, Phone, Calendar, Database } from 'lucide-react';
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";
import type { LucideIcon } from "lucide-react";

interface HubNode {
  id: string;
  label: string;
  icon: LucideIcon;
  x: number;
  y: number;
  color: "gold" | "blue";
}

function NetworkHub() {
  const nodes: HubNode[] = [
    { id: "chatbot",   label: "Chatbot",   icon: MessageSquare, x: 25, y: 12,  color: "gold" },
    { id: "calendar",  label: "Calendar",  icon: Calendar,      x: 72, y: 12,  color: "blue" },
    { id: "phone",     label: "Phone",     icon: Phone,         x: 8,  y: 50,  color: "blue" },
    { id: "crm",       label: "CRM",       icon: Database,      x: 90, y: 50,  color: "gold" },
    { id: "analytics", label: "Analytics", icon: BarChart3,     x: 25, y: 88,  color: "blue" },
    { id: "email",     label: "Email",     icon: Mail,          x: 72, y: 88,  color: "blue" },
  ];

  const centerX = 50;
  const centerY = 50;
  const getColor = (c: "gold" | "blue") => c === "gold" ? "#F4B400" : "#00A8E8";

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-full max-w-[480px] aspect-square">
        {/* SVG layer — connection lines + traveling dots */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 1 }}
        >
          <defs>
            <filter id="svc-line-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="0.4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {nodes.map((node, i) => {
            const color = getColor(node.color);
            return (
              <g key={`conn-${node.id}`}>
                {/* Base line (dim) */}
                <line
                  x1={centerX} y1={centerY}
                  x2={node.x} y2={node.y}
                  stroke={color} strokeWidth="0.25" opacity="0.2"
                />
                {/* Animated glowing line */}
                <line
                  x1={centerX} y1={centerY}
                  x2={node.x} y2={node.y}
                  stroke={color} strokeWidth="0.35"
                  filter="url(#svc-line-glow)"
                  className="hub-line-pulse"
                  style={{ animationDelay: `${i * 0.6}s` }}
                />
                {/* Traveling dot along the line */}
                <circle r="0.7" fill={color} opacity="0.9" filter="url(#svc-line-glow)">
                  <animateMotion
                    dur={`${2.5 + i * 0.3}s`}
                    repeatCount="indefinite"
                    path={`M${centerX},${centerY} L${node.x},${node.y}`}
                  />
                </circle>
                {/* Reverse traveling dot */}
                <circle r="0.5" fill={color} opacity="0.5">
                  <animateMotion
                    dur={`${3.5 + i * 0.2}s`}
                    repeatCount="indefinite"
                    path={`M${node.x},${node.y} L${centerX},${centerY}`}
                  />
                </circle>
                {/* Glowing endpoint dot */}
                <circle
                  cx={node.x} cy={node.y}
                  r="1" fill={color} opacity="0.6"
                  className="hub-dot-pulse"
                  style={{ animationDelay: `${i * 0.4}s` }}
                />
              </g>
            );
          })}

          {/* Concentric rings around center */}
          <circle cx={centerX} cy={centerY} r="6" fill="none" stroke="#F4B400" strokeWidth="0.15" opacity="0.15" className="hub-ring-rotate" />
          <circle cx={centerX} cy={centerY} r="9" fill="none" stroke="#00A8E8" strokeWidth="0.1" opacity="0.1" className="hub-ring-rotate-reverse" />
          <circle cx={centerX} cy={centerY} r="12" fill="none" stroke="#F4B400" strokeWidth="0.08" opacity="0.08" strokeDasharray="1 2" className="hub-ring-rotate" />
        </svg>

        {/* Central hub orb */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ zIndex: 2 }}
        >
          <div className="absolute -inset-6 rounded-full bg-[#F4B400]/10 hub-center-breathe" />
          <div className="absolute -inset-4 rounded-full bg-[#F4B400]/15 hub-center-breathe" style={{ animationDelay: "0.5s" }} />
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-[#F4B400] flex items-center justify-center relative">
            <div className="absolute inset-1 rounded-full bg-gradient-to-br from-[#F4B400] via-[#FFD54F] to-[#F4B400] opacity-90" />
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#F4B400]/80 to-[#FFD54F]/60 blur-sm" />
          </div>
        </div>

        {/* Outer nodes */}
        {nodes.map((node, i) => {
          const Icon = node.icon;
          const color = getColor(node.color);
          const isGold = node.color === "gold";
          return (
            <div
              key={node.id}
              className="absolute flex flex-col items-center gap-1.5 hub-node-float"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: "translate(-50%, -50%)",
                zIndex: 3,
                animationDelay: `${i * 0.8}s`,
              }}
            >
              {/* Glow halo */}
              <div
                className="absolute rounded-full hub-glow-pulse"
                style={{
                  width: "64px", height: "64px",
                  top: "-4px", left: "50%",
                  transform: "translateX(-50%)",
                  background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
                  animationDelay: `${i * 0.5}s`,
                }}
              />
              {/* Circle border with icon */}
              <div
                className="relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110"
                style={{
                  border: `2px solid ${color}`,
                  background: `rgba(13,27,42,0.85)`,
                  boxShadow: `0 0 15px ${color}30, inset 0 0 15px ${color}10`,
                }}
              >
                <Icon
                  className="w-5 h-5 md:w-6 md:h-6"
                  style={{ color, filter: `drop-shadow(0 0 6px ${color}80)` }}
                  strokeWidth={1.5}
                />
              </div>
              <span
                className="text-[10px] md:text-xs font-medium tracking-wide"
                style={{ color: isGold ? "#F4B400" : "#00A8E8" }}
              >
                {node.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function AutomationSection() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section
      ref={sectionRef}
      className="relative py-28 lg:py-36 overflow-hidden bg-gradient-to-br from-[#060e1a] via-[#0D1B2A] to-[#0a1628]"
      data-testid="section-automation"
    >
      {/* Bokeh particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(14)].map((_, i) => (
          <div
            key={`bokeh-${i}`}
            className="hub-bokeh"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${3 + Math.random() * 6}px`,
              height: `${3 + Math.random() * 6}px`,
              background: i % 3 === 0 ? "rgba(244,180,0,0.2)" : "rgba(0,168,232,0.15)",
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 12}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-[0.4fr_0.6fr] gap-12 lg:gap-20 items-center">
          {/* Left Column - Text Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0.3s' }}
          >
            <h2 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl leading-tight text-white mb-6">
              {t.servicesPage.automation.title}
            </h2>

            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8">
              {t.servicesPage.automation.description}
            </p>

            <Link href="/services/automation">
              <button
                className="inline-flex items-center justify-center min-h-10 px-10 py-3 text-lg font-semibold rounded-md bg-[#F4B400] hover:bg-[#F4B400]/90 text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(244,180,0,0.5)] hover:-translate-y-1"
                data-testid="button-automations"
              >
                {language === 'en' ? 'See How Automation Works' : 'Cómo Funciona la Automatización'}
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </Link>
          </div>

          {/* Right Column - Premium Network Hub */}
          <div
            className={`relative h-[400px] md:h-[500px] lg:h-[600px] transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0.5s' }}
          >
            <NetworkHub />
          </div>
        </div>
      </div>
    </section>
  );
}
