import { useRef, useState, useEffect } from "react";

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
 * ServicesHeroSphere - Golden geodesic sphere for Services Hero section
 * 
 * Reuses proven 3D rotation mechanics from SmartKlixSphere3D (FreeConsultation)
 * with golden wireframe styling and fixed service labels matching the approved mockup.
 * 
 * Features:
 * - Fibonacci-distributed nodes with true 3D rotation (rotation matrices + perspective projection)
 * - Depth-sorted rendering for proper Z-ordering
 * - Golden geodesic wireframe (#FFD166)
 * - 12s rotation cycle for calmer visual rhythm
 * - Fixed service labels (Website Development, Automation Hub, Brand Services)
 * - Subtle pulse and hover effects
 */
export default function ServicesHeroSphere() {
  const [nodes, setNodes] = useState<Node3D[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const animationRef = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const generateSphereNodes = (): Node3D[] => {
      const nodeCount = 20; // Slightly more nodes for denser geodesic look
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
          isGold: true // All nodes are gold for this design
        });
      }
      return nodes;
    };

    const initialNodes = generateSphereNodes();
    setNodes(initialNodes);

    let startTime = Date.now();

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      // Slower rotation: 12s per full loop (changed from 10s)
      const rotationY = (elapsed / 12) * Math.PI * 2;
      const rotationX = Math.sin(elapsed / 12) * 0.26;

      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);
      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);

      const rotatedNodes = initialNodes.map(node => {
        let x = node.originalX;
        let y = node.originalY;
        let z = node.originalZ;

        // Y-axis rotation
        const tempZ = z * cosY - x * sinY;
        const tempX = z * sinY + x * cosY;
        z = tempZ;
        x = tempX;

        // X-axis rotation
        const tempY = y * cosX - z * sinX;
        const tempZ2 = y * sinX + z * cosX;
        y = tempY;
        z = tempZ2;

        // Perspective projection
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

      // Depth sorting for proper rendering order
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

  // Calculate connections between nearby nodes (geodesic structure)
  const connections = nodes.flatMap((node1, i) =>
    nodes.slice(i + 1).map((_, j) => {
      const actualJ = i + 1 + j;
      const node2 = nodes[actualJ];
      const distance = Math.sqrt(
        Math.pow(node2.originalX - node1.originalX, 2) +
        Math.pow(node2.originalY - node1.originalY, 2) +
        Math.pow(node2.originalZ - node1.originalZ, 2)
      );
      // Wider connection threshold for more visible geodesic edges
      return distance < 1.3 ? [i, actualJ] : null;
    }).filter(Boolean) as [number, number][]
  );

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[500px] flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gold radial glow background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div 
          className="w-[400px] h-[400px] rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(255, 209, 102, 0.4) 0%, transparent 70%)'
          }}
        />
      </div>

      <svg
        viewBox="0 0 500 500"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full relative z-10"
      >
        <defs>
          {/* Enhanced golden glow filter for lines and nodes - matching Free Consultation quality */}
          <filter id="goldGlowServices" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Stronger glow for hover state */}
          <filter id="goldGlowServicesHover" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Geodesic wireframe lines */}
        <g>
          {connections.map(([i, j]) => {
            const node1 = nodes[i];
            const node2 = nodes[j];
            if (!node1 || !node2) return null;

            // Bright, visible lines matching Free Consultation sphere quality
            const avgZ = (node1.z + node2.z) / 2;
            const opacity = (avgZ + 2) / 4 * 0.3 + 0.6; // Range: 0.6 to 0.9 for bright visibility
            
            return (
              <line
                key={`conn-${i}-${j}`}
                x1={250 + node1.x}
                y1={250 + node1.y}
                x2={250 + node2.x}
                y2={250 + node2.y}
                stroke="#FFD166"
                strokeWidth="2.5"
                strokeOpacity={opacity}
                strokeLinecap="round"
                filter="url(#goldGlowServices)"
              />
            );
          })}

          {/* Connection nodes with pulse effect */}
          {nodes.map((node, i) => {
            // Subtle pulse: 5.5s cycle, opacity 0.8 → 1 → 0.8
            const pulseTime = (Date.now() / 1000) % 5.5;
            const pulseFactor = Math.sin((pulseTime / 5.5) * Math.PI * 2) * 0.1 + 0.9;
            const pulseScale = 1 + Math.sin((pulseTime + i * 0.2) * Math.PI) * 0.08;
            const opacity = ((node.z + 2) / 4 * 0.4 + 0.6) * pulseFactor;

            return (
              <circle
                key={`node-${i}`}
                cx={250 + node.x}
                cy={250 + node.y}
                r={node.size * pulseScale}
                fill="#FFD166"
                opacity={opacity}
                filter={isHovered ? "url(#goldGlowServicesHover)" : "url(#goldGlowServices)"}
                className="transition-all duration-300"
              />
            );
          })}
        </g>

        {/* Fixed service labels (don't rotate with sphere) */}
        <g className="pointer-events-none">
          {/* Website Development - Top */}
          <text
            x="250"
            y="120"
            textAnchor="middle"
            className="fill-foreground font-semibold text-[16px]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Website Development
          </text>

          {/* Automation Hub - Center */}
          <text
            x="250"
            y="245"
            textAnchor="middle"
            className="fill-foreground font-semibold text-[17px]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Automation Hub
          </text>
          <text
            x="250"
            y="265"
            textAnchor="middle"
            className="fill-muted-foreground text-[12px]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            (AI Receptionists, GPT Systems,
          </text>
          <text
            x="250"
            y="280"
            textAnchor="middle"
            className="fill-muted-foreground text-[12px]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Integrations)
          </text>

          {/* Brand Services - Bottom */}
          <text
            x="250"
            y="390"
            textAnchor="middle"
            className="fill-foreground font-semibold text-[16px]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Brand Services
          </text>
        </g>
      </svg>
    </div>
  );
}
