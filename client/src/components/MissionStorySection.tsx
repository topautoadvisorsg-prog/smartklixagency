import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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

function MissionSphere() {
  const [nodes, setNodes] = useState<Node3D[]>([]);
  const [currentLabelIndex, setCurrentLabelIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const animationRef = useRef<number>();
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelIntervalRef = useRef<NodeJS.Timeout>();

  const labels = [
    "Website Development",
    "Automation Hub",
    "Brand Systems"
  ];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      if (labelIntervalRef.current) {
        clearInterval(labelIntervalRef.current);
        labelIntervalRef.current = undefined;
      }
      return;
    }

    labelIntervalRef.current = setInterval(() => {
      setCurrentLabelIndex((prev) => (prev + 1) % labels.length);
    }, 5000);

    return () => {
      if (labelIntervalRef.current) {
        clearInterval(labelIntervalRef.current);
      }
    };
  }, [reducedMotion]);

  useEffect(() => {
    const generateSphereNodes = (): Node3D[] => {
      const nodeCount = 20;
      const nodes: Node3D[] = [];
      const goldenRatio = (1 + Math.sqrt(5)) / 2;
      const angleIncrement = Math.PI * 2 * goldenRatio;

      for (let i = 0; i < nodeCount; i++) {
        const t = i / nodeCount;
        const inclination = Math.acos(1 - 2 * t);
        const azimuth = angleIncrement * i;

        const radius = 1.6;
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
          size: i % 4 === 0 ? 14 : i % 3 === 0 ? 11 : 9,
          isGold: i % 3 !== 2
        });
      }
      return nodes;
    };

    const initialNodes = generateSphereNodes();
    setNodes(initialNodes);

    if (reducedMotion) {
      const staticNodes = initialNodes.map(node => ({
        ...node,
        x: node.originalX * 100,
        y: node.originalY * 100,
        z: node.originalZ,
        size: node.size
      }));
      staticNodes.sort((a, b) => a.z - b.z);
      setNodes(staticNodes);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
      return;
    }

    let startTime = Date.now();

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const rotationY = (elapsed / 9) * Math.PI * 2;
      const rotationX = Math.sin(elapsed / 9) * 0.22;

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
  }, [reducedMotion]);

  const connections = nodes.flatMap((node1, i) =>
    nodes.slice(i + 1).map((_, j) => {
      const actualJ = i + 1 + j;
      const node2 = nodes[actualJ];
      const distance = Math.sqrt(
        Math.pow(node2.originalX - node1.originalX, 2) +
        Math.pow(node2.originalY - node1.originalY, 2) +
        Math.pow(node2.originalZ - node1.originalZ, 2)
      );
      return distance < 0.95 ? [i, actualJ] : null;
    }).filter(Boolean) as [number, number][]
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const sphereY = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [50, -50]);

  return (
    <div ref={sectionRef} className="relative w-full h-[500px] flex items-center justify-center">
      <motion.div style={{ y: sphereY }} className="w-full h-full">
        <svg
          viewBox="0 0 500 500"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full"
          data-testid="svg-mission-sphere"
        >
          <defs>
            <filter id="goldGlowMission" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            
            <filter id="navyGlowMission" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            <radialGradient id="goldGradientMission">
              <stop offset="0%" stopColor="#F4C430" stopOpacity="1"/>
              <stop offset="100%" stopColor="#FFD700" stopOpacity="0.8"/>
            </radialGradient>

            <radialGradient id="navyGradientMission">
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
              const opacity = (avgZ + 2) / 4 * 0.35 + 0.12;
              
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
              const opacity = (node.z + 2) / 4 * 0.5 + 0.5;

              return (
                <circle
                  key={`node-${i}`}
                  cx={250 + node.x}
                  cy={250 + node.y}
                  r={node.size}
                  fill={node.isGold ? "url(#goldGradientMission)" : "url(#navyGradientMission)"}
                  opacity={opacity}
                  filter={node.isGold ? "url(#goldGlowMission)" : "url(#navyGlowMission)"}
                />
              );
            })}
          </g>
        </svg>

        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {labels.map((label, index) => (
            <motion.div
              key={label}
              className="absolute text-sm md:text-base font-medium text-primary/80"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: currentLabelIndex === index ? 1 : 0,
                scale: currentLabelIndex === index ? 1 : 0.9
              }}
              transition={{ duration: 0.8 }}
              data-testid={`text-floating-label-${index}`}
            >
              {label}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[60px] bg-gradient-to-t from-primary/20 to-transparent blur-2xl" />
    </div>
  );
}

export default function MissionStorySection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    const setupObserver = () => {
      if (mediaQuery.matches) {
        setIsVisible(true);
        if (observerRef.current) {
          observerRef.current.disconnect();
          observerRef.current = null;
        }
        return;
      }

      if (!observerRef.current && sectionRef.current) {
        observerRef.current = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
            }
          },
          { threshold: 0.2 }
        );
        observerRef.current.observe(sectionRef.current);
      }
    };

    setupObserver();

    const handleChange = () => {
      setupObserver();
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-gradient-to-br from-white via-blue-50/20 to-amber-50/10 dark:from-slate-950 dark:via-blue-950/20 dark:to-amber-950/10"
      data-testid="section-mission-story"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2
              className={`font-heading font-bold text-4xl md:text-5xl text-foreground transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              data-testid="heading-mission-title"
            >
              Our Mission & Story: Building Systems That Build Businesses
            </h2>

            <div
              className={`space-y-4 text-lg text-muted-foreground transition-all duration-700 delay-200 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              data-testid="text-mission-content"
            >
              <p>
                SmartKlix started with a simple idea — that small businesses
                should have access to the same quality, automation, and
                scalability that big brands enjoy.
              </p>

              <p>
                What began as a small web development project evolved into a
                full-service digital systems agency. Today, we design
                conversion-ready websites, automate operations with GPT-powered
                systems, and craft brands built for growth.
              </p>

              <p>
                Our mission is to empower entrepreneurs with tools that save
                time, cut costs, and unlock their next level of success —
                because when your systems work smarter, you can focus on what
                truly matters: growing your business.
              </p>
            </div>
          </div>

          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <MissionSphere />
          </div>
        </div>
      </div>
    </section>
  );
}
