import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

type Node3D = {
  x: number;
  y: number;
  z: number;
  originalX: number;
  originalY: number;
  originalZ: number;
  size: number;
  isGold: boolean;
};

/**
 * SmartKlixSphere3D - Premium 3D network sphere with real projection mathematics
 * 
 * Features 18 fibonacci-distributed nodes with true 3D rotation using rotation matrices
 * and perspective projection. Nodes are depth-sorted for proper rendering order.
 */
function SmartKlixSphere3D() {
  const [nodes, setNodes] = useState<Node3D[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const generateSphereNodes = (): Node3D[] => {
      const nodeCount = 18;
      const nodes: Node3D[] = [];
      const goldenRatio = (1 + Math.sqrt(5)) / 2;
      const angleIncrement = Math.PI * 2 * goldenRatio;

      for (let i = 0; i < nodeCount; i++) {
        const t = i / nodeCount;
        const inclination = Math.acos(1 - 2 * t);
        const azimuth = angleIncrement * i;

        const radius = 1.5;
        const x = Math.sin(inclination) * Math.cos(azimuth) * radius;
        const y = Math.sin(inclination) * Math.sin(azimuth) * radius;
        const z = Math.cos(inclination) * radius;

        nodes.push({
          x,
          y,
          z,
          originalX: x,
          originalY: y,
          originalZ: z,
          size: i % 4 === 0 ? 16 : i % 3 === 0 ? 12 : 10,
          isGold: i % 3 !== 2
        });
      }
      return nodes;
    };

    const initialNodes = generateSphereNodes();
    setNodes(initialNodes);

    let startTime = Date.now();

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const rotationY = (elapsed / 10) * Math.PI * 2;
      const rotationX = Math.sin(elapsed / 10) * 0.26;

      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);
      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);

      const rotatedNodes = initialNodes.map(node => {
        let x = node.originalX;
        let y = node.originalY;
        let z = node.originalZ;

        const tempZ = z * cosY - x * sinY;
        const tempX = z * sinY + x * cosY;
        z = tempZ;
        x = tempX;

        const tempY = y * cosX - z * sinX;
        const tempZ2 = y * sinX + z * cosX;
        y = tempY;
        z = tempZ2;

        const scale = 4 / (4 + z);
        const projectedX = x * scale * 100;
        const projectedY = y * scale * 100;

        return {
          ...node,
          x: projectedX,
          y: projectedY,
          z,
          size: node.size * scale
        };
      });

      rotatedNodes.sort((a, b) => a.z - b.z);
      setNodes(rotatedNodes);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const connections = nodes.flatMap((node1, i) =>
    nodes.slice(i + 1).map((_, j) => {
      const actualJ = i + 1 + j;
      const node2 = nodes[actualJ];
      const distance = Math.sqrt(
        Math.pow(node2.originalX - node1.originalX, 2) +
        Math.pow(node2.originalY - node1.originalY, 2) +
        Math.pow(node2.originalZ - node1.originalZ, 2)
      );
      return distance < 0.9 ? [i, actualJ] : null;
    }).filter(Boolean) as [number, number][]
  );

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center">
      <svg
        viewBox="0 0 500 500"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
      >
        <defs>
          <filter id="goldGlowConsult" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="navyGlowConsult" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <radialGradient id="goldGradientConsult">
            <stop offset="0%" stopColor="#F4C430" stopOpacity="1"/>
            <stop offset="100%" stopColor="#FFD700" stopOpacity="0.8"/>
          </radialGradient>

          <radialGradient id="navyGradientConsult">
            <stop offset="0%" stopColor="#1a3a5c" stopOpacity="1"/>
            <stop offset="100%" stopColor="#0D1B2A" stopOpacity="0.9"/>
          </radialGradient>
        </defs>

        <g>
          {connections.map(([i, j]) => {
            const node1 = nodes[i];
            const node2 = nodes[j];
            if (!node1 || !node2) return null;

            const avgZ = (node1.z + node2.z) / 2;
            const opacity = (avgZ + 2) / 4 * 0.4 + 0.1;
            
            return (
              <line
                key={`conn-${i}-${j}`}
                x1={250 + node1.x}
                y1={250 + node1.y}
                x2={250 + node2.x}
                y2={250 + node2.y}
                stroke="#F4C430"
                strokeWidth="1.5"
                strokeOpacity={opacity}
                strokeLinecap="round"
              />
            );
          })}

          {nodes.map((node, i) => {
            const pulseOffset = (Date.now() / 1000 + i * 0.2) % 2;
            const pulseScale = 1 + Math.sin(pulseOffset * Math.PI) * 0.12;
            const opacity = (node.z + 2) / 4 * 0.5 + 0.5;

            return (
              <circle
                key={`node-${i}`}
                cx={250 + node.x}
                cy={250 + node.y}
                r={node.size * pulseScale}
                fill={node.isGold ? "url(#goldGradientConsult)" : "url(#navyGradientConsult)"}
                filter={node.isGold ? "url(#goldGlowConsult)" : "url(#navyGlowConsult)"}
                opacity={opacity}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}

/**
 * FreeConsultation - Limited-time offer section with animated network
 * 
 * Features 2-column layout with compelling CTA and premium particle animation.
 */
export default function FreeConsultation() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
    layoutEffect: false
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 15]);

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
      className="py-20 md:py-[100px] relative overflow-hidden"
      data-testid="section-free-consultation"
    >
      <motion.div 
        className="absolute inset-0 -z-10"
        style={{ 
          background: 'linear-gradient(to bottom, #FFFFFF, #F9FAFB)',
          y: parallaxY
        }}
      />
      
      <div className="container mx-auto px-4 max-w-[1200px] relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ 
              duration: 0.6, 
              ease: [0.22, 0.61, 0.36, 1]
            }}
            className="space-y-6"
          >
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ 
                duration: 0.6, 
                ease: [0.22, 0.61, 0.36, 1],
                delay: 0.1
              }}
              className="text-sidebar-primary font-heading font-semibold text-sm uppercase tracking-wide"
            >
              Limited-Time Offer
            </motion.p>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ 
                duration: 0.6, 
                ease: [0.22, 0.61, 0.36, 1],
                delay: 0.2
              }}
              className="font-heading font-bold text-4xl md:text-5xl text-card-foreground"
            >
              Free Consultation
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ 
                duration: 0.6, 
                ease: [0.22, 0.61, 0.36, 1],
                delay: 0.3
              }}
              className="text-muted-foreground text-lg leading-relaxed"
            >
              For a short time, Smart Klix is offering free one-on-one consultations. 
              We'll review your website, automations, and digital systems — and show you how to scale faster.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ 
                duration: 0.6, 
                ease: [0.22, 0.61, 0.36, 1],
                delay: 0.4
              }}
            >
              <Link 
                href="/contact"
                data-testid="button-book-consultation"
                className="cta-button inline-flex items-center gap-2 bg-sidebar-primary text-card-foreground font-heading font-semibold px-8 py-4 rounded-lg transition-all duration-300 group"
              >
                <span>Book My Free Consultation</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Smart Klix 3D Sphere */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.22, 0.61, 0.36, 1],
              delay: 0.3
            }}
            className="hidden md:block"
          >
            <SmartKlixSphere3D />
          </motion.div>
        </div>
      </div>

      <style>{`
        .cta-button {
          box-shadow: 0 4px 12px rgba(244, 180, 0, 0.3);
        }

        .cta-button:hover {
          box-shadow: 0 6px 20px rgba(244, 180, 0, 0.5);
          transform: translateY(-2px);
          filter: brightness(1.05);
        }

        .cta-button:active {
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}
