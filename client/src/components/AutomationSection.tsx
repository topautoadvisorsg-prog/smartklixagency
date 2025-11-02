import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail, MessageSquare, BarChart3, Phone, Calendar, Database } from 'lucide-react';

function ParticleBackground() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 15 + Math.random() * 10,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-blue-400 rounded-full particle-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
      {/* Diagonal grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
    </div>
  );
}

function NetworkHub() {
  const nodes = [
    { id: 'crm', label: 'CRM', icon: Database, angle: 0, color: 'gold' },
    { id: 'email', label: 'Email', icon: Mail, angle: 60, color: 'blue' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, angle: 120, color: 'blue' },
    { id: 'phone', label: 'Phone', icon: Phone, angle: 180, color: 'blue' },
    { id: 'chatbot', label: 'Chatbot', icon: MessageSquare, angle: 240, color: 'gold' },
    { id: 'calendar', label: 'Calendar', icon: Calendar, angle: 300, color: 'blue' },
  ];

  const radius = 160; // Distance from center to nodes
  const centerX = 250;
  const centerY = 250;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full max-w-[500px] max-h-[500px]"
        data-testid="network-hub-svg"
      >
        {/* Connection lines from center to each node */}
        {nodes.map((node, index) => {
          const angle = (node.angle * Math.PI) / 180;
          const nodeX = centerX + radius * Math.cos(angle);
          const nodeY = centerY + radius * Math.sin(angle);

          return (
            <g key={`line-${node.id}`}>
              {/* Base line */}
              <line
                x1={centerX}
                y1={centerY}
                x2={nodeX}
                y2={nodeY}
                stroke={node.color === 'gold' ? '#F4B400' : '#00A8E8'}
                strokeWidth="2"
                opacity="0.3"
              />
              {/* Animated pulse line */}
              <line
                x1={centerX}
                y1={centerY}
                x2={nodeX}
                y2={nodeY}
                stroke={node.color === 'gold' ? '#F4B400' : '#00A8E8'}
                strokeWidth="2"
                className="line-pulse"
                style={{
                  animationDelay: `${index * 0.8}s`,
                }}
              />
            </g>
          );
        })}

        {/* Central hub node */}
        <g className="node-pulse" data-testid="central-hub">
          <circle
            cx={centerX}
            cy={centerY}
            r="40"
            fill="#F4B400"
            opacity="0.2"
          />
          <circle
            cx={centerX}
            cy={centerY}
            r="25"
            fill="#F4B400"
            filter="url(#glow-gold)"
          />
        </g>

        {/* Orbiting nodes */}
        {nodes.map((node) => {
          const angle = (node.angle * Math.PI) / 180;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);

          return (
            <g
              key={node.id}
              className="automation-node node-pulse-slow"
              data-testid={`node-${node.id}`}
              style={{
                animationDelay: `${node.angle / 100}s`,
              }}
            >
              <circle
                cx={x}
                cy={y}
                r="30"
                fill={node.color === 'gold' ? '#F4B400' : '#00A8E8'}
                opacity="0.15"
              />
              <circle
                cx={x}
                cy={y}
                r="20"
                fill={node.color === 'gold' ? '#F4B400' : '#00A8E8'}
                filter={node.color === 'gold' ? 'url(#glow-gold)' : 'url(#glow-blue)'}
              />
            </g>
          );
        })}

        {/* Glow filters */}
        <defs>
          <filter id="glow-gold" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-blue" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Node labels */}
      <div className="absolute inset-0 pointer-events-none">
        {nodes.map((node) => {
          const angle = (node.angle * Math.PI) / 180;
          const labelRadius = radius + 50;
          const x = 50 + (labelRadius * Math.cos(angle)) / 5;
          const y = 50 + (labelRadius * Math.sin(angle)) / 5;
          const Icon = node.icon;

          return (
            <div
              key={`label-${node.id}`}
              className="absolute flex flex-col items-center gap-1"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <Icon 
                className={`w-5 h-5 ${
                  node.color === 'gold' ? 'text-[#F4B400]' : 'text-[#00A8E8]'
                }`}
              />
              <span
                className={`text-xs font-medium ${
                  node.color === 'gold' ? 'text-[#F4B400]' : 'text-[#00A8E8]'
                }`}
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
      className="relative py-28 lg:py-36 overflow-hidden bg-gradient-to-br from-[#0D1B2A] via-[#122A4A] to-[#0D1B2A]"
      data-testid="section-automation"
    >
      <ParticleBackground />

      <div className="container mx-auto px-4 relative z-10">
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
            <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-tight text-white mb-6">
              Run Your Business on Autopilot
            </h2>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
              From AI receptionists to GPT-powered workflows, Smart&nbsp;Klix connects your tools, automates your operations, and scales your output — 24/7.
            </p>

            <Button
              size="lg"
              className="bg-[#F4B400] hover:bg-[#F4B400] text-white font-semibold px-8 transition-all duration-300 hover:shadow-[0_0_20px_rgba(244,180,0,0.5)] hover:-translate-y-1"
              data-testid="button-automations"
            >
              See Automations in Action
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Right Column - Network Hub */}
          <div
            className={`relative h-[400px] md:h-[500px] lg:h-[600px] transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: '0.5s',
            }}
          >
            <NetworkHub />
          </div>
        </div>
      </div>
    </section>
  );
}
