import { useRef, useState, useEffect } from "react";

type Node3D = {
  x: number;
  y: number;
  z: number;
  originalX: number;
  originalY: number;
  originalZ: number;
  size: number;
  isBlue: boolean;
};

/**
 * WhatWeOfferSphere - Bright blue 3D network sphere
 * 
 * Reuses proven SmartKlixSphere3D mechanics from Free Consultation section
 * Features 18 fibonacci-distributed nodes with true 3D rotation using rotation matrices
 * and perspective projection. Blue color scheme (#007BFF → #00D4FF) with bright glow.
 */
export default function WhatWeOfferSphere() {
  const [nodes, setNodes] = useState<Node3D[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    /* Generate sphere nodes using Fibonacci distribution */
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
          isBlue: i % 3 !== 2
        });
      }
      return nodes;
    };

    const initialNodes = generateSphereNodes();
    setNodes(initialNodes);

    let startTime = Date.now();

    /* Animate with 3D rotation using rotation matrices */
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

        // Rotate around Y axis
        const tempZ = z * cosY - x * sinY;
        const tempX = z * sinY + x * cosY;
        z = tempZ;
        x = tempX;

        // Rotate around X axis
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

      // Depth sort for proper rendering
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

  /* Calculate connections between nearby nodes */
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
    <div className="relative w-full h-[400px] flex items-center justify-center">
      <svg
        viewBox="0 0 500 500"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
      >
        <defs>
          {/* Bright blue glow filter for primary nodes */}
          <filter id="blueGlowOffer" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Subtle glow for secondary nodes */}
          <filter id="lightBlueGlowOffer" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Bright blue gradient (#007BFF → #00D4FF) */}
          <radialGradient id="blueGradientOffer">
            <stop offset="0%" stopColor="#00D4FF" stopOpacity="1"/>
            <stop offset="100%" stopColor="#007BFF" stopOpacity="0.9"/>
          </radialGradient>

          {/* Light blue gradient for secondary nodes */}
          <radialGradient id="lightBlueGradientOffer">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="1"/>
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.8"/>
          </radialGradient>
        </defs>

        {/* Connection lines */}
        <g>
          {connections.map(([i, j]) => {
            const node1 = nodes[i];
            const node2 = nodes[j];
            if (!node1 || !node2) return null;

            const avgZ = (node1.z + node2.z) / 2;
            const opacity = (avgZ + 2) / 4 * 0.4 + 0.2;
            
            return (
              <line
                key={`conn-${i}-${j}`}
                x1={250 + node1.x}
                y1={250 + node1.y}
                x2={250 + node2.x}
                y2={250 + node2.y}
                stroke="#3B82F6"
                strokeWidth="1.5"
                strokeOpacity={opacity}
                strokeLinecap="round"
              />
            );
          })}

          {/* Node circles with bright blue glow */}
          {nodes.map((node, i) => {
            const opacity = (node.z + 2) / 4;
            
            return (
              <circle
                key={i}
                cx={250 + node.x}
                cy={250 + node.y}
                r={node.size / 2}
                fill={node.isBlue ? "url(#blueGradientOffer)" : "url(#lightBlueGradientOffer)"}
                opacity={opacity * 0.9 + 0.1}
                filter={node.isBlue ? "url(#blueGlowOffer)" : "url(#lightBlueGlowOffer)"}
              />
            );
          })}
        </g>
      </svg>

      {/* Outer blue glow aura */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0, 123, 255, 0.5) 0%, rgba(0, 212, 255, 0.2) 40%, transparent 70%)"
        }}
      />
    </div>
  );
}
