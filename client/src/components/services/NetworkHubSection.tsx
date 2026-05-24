import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Database, Mail, BarChart3, Phone, MessageSquare, Calendar } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface HubNode {
  id: string;
  label: string;
  icon: LucideIcon;
  x: number;
  y: number;
  color: "gold" | "blue";
}

export default function NetworkHubSection() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [ref, isVisible] = useScrollReveal();

  // Positions as percentages — arranged like the reference image
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

  const getColor = (c: "gold" | "blue") =>
    c === "gold" ? "#F4B400" : "#00A8E8";

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 bg-gradient-to-br from-[#060e1a] via-[#0D1B2A] to-[#0a1628] relative overflow-hidden"
      data-testid="section-network-hub"
    >
      {/* Bokeh / floating particle background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(18)].map((_, i) => (
          <div
            key={`bokeh-${i}`}
            className="hub-bokeh"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${4 + Math.random() * 8}px`,
              height: `${4 + Math.random() * 8}px`,
              background: i % 3 === 0
                ? "rgba(244,180,0,0.25)"
                : "rgba(0,168,232,0.2)",
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 12}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <h2
          className={`font-heading font-bold text-4xl md:text-5xl text-center text-white mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {t.automationPage.networkHub.title}
        </h2>
        <p
          className={`text-center text-blue-200/60 text-lg mb-16 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {t.automationPage.networkHub.points}
        </p>

        {/* Hub container */}
        <div
          className={`flex justify-center transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <div className="relative w-full max-w-[560px] aspect-square">
            {/* SVG layer — connection lines + traveling dots */}
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full"
              style={{ zIndex: 1 }}
            >
              <defs>
                {/* Glow filter for lines */}
                <filter id="line-glow" x="-50%" y="-50%" width="200%" height="200%">
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
                      stroke={color}
                      strokeWidth="0.25"
                      opacity="0.2"
                    />
                    {/* Animated glowing line */}
                    <line
                      x1={centerX} y1={centerY}
                      x2={node.x} y2={node.y}
                      stroke={color}
                      strokeWidth="0.35"
                      filter="url(#line-glow)"
                      className="hub-line-pulse"
                      style={{ animationDelay: `${i * 0.6}s` }}
                    />
                    {/* Traveling dot along the line */}
                    <circle r="0.7" fill={color} opacity="0.9" filter="url(#line-glow)">
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
                    {/* Glowing endpoint dot on line intersection with node */}
                    <circle
                      cx={node.x} cy={node.y}
                      r="1"
                      fill={color}
                      opacity="0.6"
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

            {/* Central hub orb (HTML) */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ zIndex: 2 }}
            >
              {/* Outer soft glow */}
              <div className="absolute -inset-6 rounded-full bg-[#F4B400]/10 hub-center-breathe" />
              <div className="absolute -inset-4 rounded-full bg-[#F4B400]/15 hub-center-breathe" style={{ animationDelay: "0.5s" }} />
              {/* Ring border */}
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-[#F4B400] flex items-center justify-center relative">
                {/* Inner glow */}
                <div className="absolute inset-1 rounded-full bg-gradient-to-br from-[#F4B400] via-[#FFD54F] to-[#F4B400] opacity-90" />
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#F4B400]/80 to-[#FFD54F]/60 blur-sm" />
              </div>
            </div>

            {/* Outer nodes (HTML) */}
            {nodes.map((node, i) => {
              const Icon = node.icon;
              const color = getColor(node.color);
              const isGold = node.color === "gold";
              return (
                <div
                  key={node.id}
                  className="absolute flex flex-col items-center gap-2 hub-node-float"
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    transform: "translate(-50%, -50%)",
                    zIndex: 3,
                    animationDelay: `${i * 0.8}s`,
                  }}
                >
                  {/* Glow halo behind node */}
                  <div
                    className="absolute rounded-full hub-glow-pulse"
                    style={{
                      width: "72px",
                      height: "72px",
                      top: "-4px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
                      animationDelay: `${i * 0.5}s`,
                    }}
                  />
                  {/* Circle border with icon */}
                  <div
                    className="relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110"
                    style={{
                      border: `2px solid ${color}`,
                      background: `rgba(13,27,42,0.85)`,
                      boxShadow: `0 0 15px ${color}30, inset 0 0 15px ${color}10`,
                    }}
                  >
                    <Icon
                      className="w-6 h-6 md:w-7 md:h-7"
                      style={{
                        color,
                        filter: `drop-shadow(0 0 6px ${color}80)`,
                      }}
                      strokeWidth={1.5}
                    />
                  </div>
                  {/* Label */}
                  <span
                    className="text-xs md:text-sm font-medium tracking-wide"
                    style={{ color: isGold ? "#F4B400" : "#00A8E8" }}
                  >
                    {node.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
