import { useRef, useState, useEffect, useMemo } from "react";

interface ConstellationSphereProps {
  size?: number;
  nodeCount?: number;
  rotationSeconds?: number;
  edgeThreshold?: number;
  goldRatio?: number;
  showSphereBody?: boolean;
}

export default function ConstellationSphere({
  size = 500,
  nodeCount = 72,
  rotationSeconds = 28,
  edgeThreshold = 0.52,
  goldRatio = 0.62,
  showSphereBody = true,
}: ConstellationSphereProps) {
  const [, setTick] = useState(0);
  const [sphereColor, setSphereColor] = useState<"navy" | "gold">("navy");
  const rotationRef = useRef(0);
  const startRef = useRef(performance.now());
  const svgRef = useRef<SVGSVGElement>(null);

  // Mouse tilt
  const tiltXRef = useRef(0);
  const tiltYRef = useRef(0);
  const targetTiltXRef = useRef(0);
  const targetTiltYRef = useRef(0);

  // Animation loop
  useEffect(() => {
    let raf: number;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      rotationRef.current += ((Math.PI * 2) / rotationSeconds) * dt;
      const lerp = 1 - Math.pow(0.04, dt);
      tiltXRef.current += (targetTiltXRef.current - tiltXRef.current) * lerp;
      tiltYRef.current += (targetTiltYRef.current - tiltYRef.current) * lerp;
      setTick((t) => (t + 1) & 0xffff);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [rotationSeconds]);

  // Sphere color cycle — 5s per color, 1.8s crossfade
  useEffect(() => {
    const interval = setInterval(() => {
      setSphereColor((prev) => (prev === "navy" ? "gold" : "navy"));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    targetTiltYRef.current = nx * 0.55;
    targetTiltXRef.current = ny * 0.38;
  };

  const handleMouseLeave = () => {
    targetTiltXRef.current = 0;
    targetTiltYRef.current = 0;
  };

  const rand = (seed: number) => {
    const x = Math.sin(seed * 9301 + 49297) * 23.13;
    return x - Math.floor(x);
  };

  const nodes = useMemo(() => {
    const arr = [];
    const phi = Math.PI * (Math.sqrt(5) - 1);
    for (let i = 0; i < nodeCount; i++) {
      const y = 1 - (i / (nodeCount - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      const r1 = rand(i + 1);
      const r2 = rand(i * 3.7 + 11);
      const r3 = rand(i * 1.3 + 5);
      arr.push({
        i, x, y, z,
        gold: r1 < goldRatio,
        hero: r1 < goldRatio && r2 < 0.18,
        sizeJ: 0.6 + r3 * 0.6,
        pulsePhase: r2 * Math.PI * 2,
        pulseRate: 0.7 + r3 * 0.8,
      });
    }
    return arr;
  }, [nodeCount, goldRatio]);

  const edges = useMemo(() => {
    const out: { a: number; b: number; d: number }[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dz = nodes[i].z - nodes[j].z;
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < edgeThreshold) out.push({ a: i, b: j, d });
      }
    }
    return out;
  }, [nodes, edgeThreshold]);

  const cx = size / 2;
  const cy = size / 2;
  const R = size * 0.42;

  const rot = rotationRef.current + tiltYRef.current;
  const cosR = Math.cos(rot);
  const sinR = Math.sin(rot);
  const cosTX = Math.cos(tiltXRef.current);
  const sinTX = Math.sin(tiltXRef.current);
  const persp = 2.2;

  const project = (n: typeof nodes[0]) => {
    const xr = n.x * cosR + n.z * sinR;
    const zr0 = -n.x * sinR + n.z * cosR;
    const yr0 = n.y;
    const yr = yr0 * cosTX - zr0 * sinTX;
    const zr = yr0 * sinTX + zr0 * cosTX;
    const s = persp / (persp - zr);
    return { ...n, px: cx + xr * R * s, py: cy + yr * R * s, pz: zr, scale: s };
  };

  const projected = nodes.map(project);
  const depthOp = (z: number) => 0.18 + ((z + 1) / 2) ** 1.4 * 0.82;
  const sortedNodes = [...projected].sort((a, b) => a.pz - b.pz);
  const tSec = (performance.now() - startRef.current) / 1000;

  const fadeStyle = (active: boolean): React.CSSProperties => ({
    opacity: active ? 1 : 0,
    transition: "opacity 1.8s ease",
  });

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${size} ${size}`}
      width="100%"
      height="100%"
      style={{ display: "block", overflow: "visible", cursor: "grab" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <defs>
        {/* Navy sphere body */}
        <radialGradient id="cs-body-navy" cx="38%" cy="34%" r="68%">
          <stop offset="0%"   stopColor="#1a3158" stopOpacity="0.65" />
          <stop offset="50%"  stopColor="#0D1B2A" stopOpacity="0.93" />
          <stop offset="92%"  stopColor="#070f1a" stopOpacity="0.97" />
          <stop offset="100%" stopColor="#070f1a" stopOpacity="0" />
        </radialGradient>

        {/* Gold/amber sphere body */}
        <radialGradient id="cs-body-gold" cx="38%" cy="34%" r="68%">
          <stop offset="0%"   stopColor="#4a2e00" stopOpacity="0.65" />
          <stop offset="50%"  stopColor="#1e1200" stopOpacity="0.93" />
          <stop offset="92%"  stopColor="#110b00" stopOpacity="0.97" />
          <stop offset="100%" stopColor="#110b00" stopOpacity="0" />
        </radialGradient>

        {/* Rim glow — navy phase */}
        <radialGradient id="cs-rim-navy" cx="50%" cy="50%" r="50%">
          <stop offset="84%" stopColor="#4a8cff" stopOpacity="0" />
          <stop offset="97%" stopColor="#4a8cff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#4a8cff" stopOpacity="0" />
        </radialGradient>

        {/* Rim glow — gold phase */}
        <radialGradient id="cs-rim-gold" cx="50%" cy="50%" r="50%">
          <stop offset="84%" stopColor="#F4C430" stopOpacity="0" />
          <stop offset="97%" stopColor="#F4C430" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#F4C430" stopOpacity="0" />
        </radialGradient>

        {/* Node gradients */}
        <radialGradient id="cs-gold-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#FFF1B8" stopOpacity="1" />
          <stop offset="35%"  stopColor="#F4C430" stopOpacity="1" />
          <stop offset="100%" stopColor="#F4C430" stopOpacity="0.8" />
        </radialGradient>
        <radialGradient id="cs-gold-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#FFE38A" stopOpacity="0.85" />
          <stop offset="35%"  stopColor="#F4C430" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#F4C430" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="cs-navy" cx="38%" cy="35%" r="65%">
          <stop offset="0%"   stopColor="#2a4a7a" stopOpacity="1" />
          <stop offset="55%"  stopColor="#0D1B2A" stopOpacity="1" />
          <stop offset="100%" stopColor="#050B14" stopOpacity="1" />
        </radialGradient>

        <filter id="cs-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
      </defs>

      {/* Sphere body — crossfading between navy and gold */}
      {showSphereBody && (
        <>
          <circle cx={cx} cy={cy} r={R} fill="url(#cs-body-navy)" style={fadeStyle(sphereColor === "navy")} />
          <circle cx={cx} cy={cy} r={R} fill="url(#cs-body-gold)" style={fadeStyle(sphereColor === "gold")} />
          <circle cx={cx} cy={cy} r={R} fill="url(#cs-rim-navy)"  style={fadeStyle(sphereColor === "navy")} />
          <circle cx={cx} cy={cy} r={R} fill="url(#cs-rim-gold)"  style={fadeStyle(sphereColor === "gold")} />
          <circle cx={cx} cy={cy} r={R} fill="none"
            stroke={sphereColor === "navy" ? "#4a8cff" : "#F4C430"}
            strokeOpacity="0.14"
            strokeWidth="0.8"
            style={{ transition: "stroke 1.8s ease" }}
          />
        </>
      )}

      {/* Edges */}
      <g>
        {edges
          .map((e) => {
            const a = projected[e.a];
            const b = projected[e.b];
            const avgZ = (a.pz + b.pz) / 2;
            const closeness = 1 - e.d / edgeThreshold;
            const op = depthOp(avgZ) * 0.42 * (0.35 + closeness * 0.65);
            return { e, a, b, avgZ, op };
          })
          .sort((a, b) => a.avgZ - b.avgZ)
          .map(({ e, a, b, op }) => (
            <line key={`l-${e.a}-${e.b}`} x1={a.px} y1={a.py} x2={b.px} y2={b.py}
              stroke="#F4C430" strokeOpacity={op} strokeWidth={0.7} strokeLinecap="round" />
          ))}
      </g>

      {/* Nodes — bigger */}
      <g>
        {sortedNodes.map((n) => {
          const op = depthOp(n.pz);
          const pulse = 0.5 + 0.5 * Math.sin(tSec * n.pulseRate * 1.6 + n.pulsePhase);
          // ~1.9x bigger than before
          const baseR = (n.gold ? (n.hero ? 8.8 : 6.0) : 6.8) * n.sizeJ * n.scale;
          const rPulse = baseR * (n.gold ? 1 + pulse * 0.18 : 1 + pulse * 0.04);

          if (n.gold) {
            const haloR = rPulse * (n.hero ? 5.5 : 3.6);
            const haloOp = (n.hero ? 0.7 : 0.45) * op * (0.7 + pulse * 0.3);
            return (
              <g key={`n-${n.i}`} style={{ opacity: op }}>
                <circle cx={n.px} cy={n.py} r={haloR} fill="url(#cs-gold-halo)"
                  opacity={haloOp} filter={n.hero ? "url(#cs-glow)" : undefined} />
                <circle cx={n.px} cy={n.py} r={rPulse} fill="url(#cs-gold-core)" />
                <circle cx={n.px - rPulse * 0.25} cy={n.py - rPulse * 0.25}
                  r={rPulse * 0.35} fill="#FFF6D0" opacity={0.85} />
              </g>
            );
          }
          return (
            <g key={`n-${n.i}`} style={{ opacity: op }}>
              <circle cx={n.px} cy={n.py} r={rPulse} fill="url(#cs-navy)"
                stroke="#0A1422" strokeWidth={0.5} />
              <circle cx={n.px - rPulse * 0.3} cy={n.py - rPulse * 0.3}
                r={rPulse * 0.28} fill="#3a6aaa" opacity={0.55} />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
