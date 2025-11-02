import { motion } from "framer-motion";
import LinkButton from "./LinkButton";

/**
 * ServicesSphere - Geometric sphere visualization with three service pillars
 * 
 * Displays icosahedron-inspired wireframe sphere with distributed vertices
 * and three highlighted service pillars: Website Development, Automation Hub, Brand Services
 * 
 * NEXT STEP: Replace with 3D WebGL animation for smooth rotation and pulse effects
 */
function ServicesSphere() {
  // All sphere vertices (12 vertices in an icosahedron pattern)
  const allNodes = [
    { x: 400, y: 100 },    // Top
    { x: 300, y: 180 },    // Upper ring
    { x: 360, y: 140 },
    { x: 440, y: 140 },
    { x: 500, y: 180 },
    { x: 280, y: 300 },    // Middle ring
    { x: 400, y: 280 },
    { x: 520, y: 300 },
    { x: 300, y: 420 },    // Lower ring
    { x: 360, y: 460 },
    { x: 440, y: 460 },
    { x: 500, y: 420 },
  ];

  // Labeled service pillars (subset of vertices with labels)
  const labeledNodes = [
    { x: 400, y: 140, label: "Website\nDevelopment", sublabel: "" },
    { x: 400, y: 350, label: "Automation Hub", sublabel: "(AI Receptionists, GPT Systems,\nIntegrations)" },
    { x: 400, y: 500, label: "Brand Services", sublabel: "" }
  ];

  // Icosahedron edge connections
  const sphereLines = [
    // Top vertex to upper ring
    { x1: 400, y1: 100, x2: 300, y2: 180 },
    { x1: 400, y1: 100, x2: 360, y2: 140 },
    { x1: 400, y1: 100, x2: 440, y2: 140 },
    { x1: 400, y1: 100, x2: 500, y2: 180 },
    
    // Upper ring internal
    { x1: 300, y1: 180, x2: 360, y2: 140 },
    { x1: 360, y1: 140, x2: 440, y2: 140 },
    { x1: 440, y1: 140, x2: 500, y2: 180 },
    { x1: 500, y1: 180, x2: 300, y2: 180 },
    
    // Upper ring to middle ring
    { x1: 300, y1: 180, x2: 280, y2: 300 },
    { x1: 360, y1: 140, x2: 400, y2: 280 },
    { x1: 440, y1: 140, x2: 400, y2: 280 },
    { x1: 500, y1: 180, x2: 520, y2: 300 },
    
    // Middle ring internal
    { x1: 280, y1: 300, x2: 400, y2: 280 },
    { x1: 400, y1: 280, x2: 520, y2: 300 },
    { x1: 520, y1: 300, x2: 280, y2: 300 },
    
    // Middle ring to lower ring
    { x1: 280, y1: 300, x2: 300, y2: 420 },
    { x1: 400, y1: 280, x2: 360, y2: 460 },
    { x1: 400, y1: 280, x2: 440, y2: 460 },
    { x1: 520, y1: 300, x2: 500, y2: 420 },
    
    // Lower ring internal
    { x1: 300, y1: 420, x2: 360, y2: 460 },
    { x1: 360, y1: 460, x2: 440, y2: 460 },
    { x1: 440, y1: 460, x2: 500, y2: 420 },
    { x1: 500, y1: 420, x2: 300, y2: 420 },
    
    // Cross connections for depth
    { x1: 300, y1: 180, x2: 400, y2: 280 },
    { x1: 500, y1: 180, x2: 400, y2: 280 },
    { x1: 280, y1: 300, x2: 360, y2: 460 },
    { x1: 280, y1: 300, x2: 440, y2: 460 },
    { x1: 520, y1: 300, x2: 360, y2: 460 },
    { x1: 520, y1: 300, x2: 440, y2: 460 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative w-full h-full flex items-center justify-center"
    >
      <svg
        viewBox="0 0 800 600"
        className="w-full max-w-[600px] h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Geometric sphere lines */}
        <g className="opacity-40">
          {sphereLines.map((line, index) => (
            <motion.line
              key={`line-${index}`}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="hsl(var(--primary))"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.4 }}
              transition={{ duration: 1.5, delay: 0.5 + index * 0.02 }}
            />
          ))}
        </g>

        {/* All sphere vertices (small dots) */}
        {allNodes.map((node, index) => (
          <motion.circle
            key={`vertex-${index}`}
            cx={node.x}
            cy={node.y}
            r="3"
            fill="hsl(var(--primary))"
            opacity="0.6"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ duration: 0.4, delay: 0.8 + index * 0.05 }}
          />
        ))}

        {/* Labeled service pillar nodes with animations */}
        {labeledNodes.map((node, index) => (
          <g key={`labeled-${index}`}>
            {/* Node circle with pulse animation */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="8"
              fill="hsl(var(--primary))"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.2, 1],
                opacity: 1
              }}
              transition={{ 
                duration: 0.6, 
                delay: 1 + index * 0.2,
                scale: {
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 2,
                  delay: 2 + index * 0.3
                }
              }}
            />
            
            {/* Outer glow ring */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="16"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="1"
              opacity="0.3"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.1, 0.3]
              }}
              transition={{ 
                duration: 2,
                delay: 1.2 + index * 0.2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />

            {/* Main label */}
            <motion.text
              x={node.x + 50}
              y={node.y - (node.sublabel ? 10 : 0)}
              fill="hsl(var(--foreground))"
              fontSize="18"
              fontWeight="600"
              fontFamily="Inter, sans-serif"
              textAnchor="start"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.3 + index * 0.2 }}
            >
              {node.label.split('\n').map((line, i) => (
                <tspan key={i} x={node.x + 50} dy={i === 0 ? 0 : 20}>
                  {line}
                </tspan>
              ))}
            </motion.text>

            {/* Sublabel */}
            {node.sublabel && (
              <motion.text
                x={node.x + 50}
                y={node.y + 15}
                fill="hsl(var(--muted-foreground))"
                fontSize="13"
                fontFamily="Inter, sans-serif"
                textAnchor="start"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.5 + index * 0.2 }}
              >
                {node.sublabel.split('\n').map((line, i) => (
                  <tspan key={i} x={node.x + 50} dy={i === 0 ? 0 : 16}>
                    {line}
                  </tspan>
                ))}
              </motion.text>
            )}
          </g>
        ))}
      </svg>
    </motion.div>
  );
}

/**
 * ServicesHero - Hero section for Services Page
 * 
 * Two-column Webflow-quality layout featuring:
 * - Left: Bold headline with service pillars, description, dual CTAs
 * - Right: Geometric sphere visualization with service nodes
 * 
 * Design: Light gradient background, generous spacing, professional typography
 */
export default function ServicesHero() {
  return (
    <section className="relative pt-[140px] pb-[140px] overflow-hidden">
      {/* Light gradient background - Webflow style */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/30 -z-10" />
      
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[600px]">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Headline - Bold, stacked words */}
            <h1 className="font-heading font-bold text-6xl md:text-7xl lg:text-8xl leading-[1.1] text-foreground">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Websites.
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Automation.
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Branding.
              </motion.div>
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl"
            >
              We design conversion-ready websites, automate your operations with GPT-powered systems, and build digital brands that stand out and scale.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <LinkButton
                href="#services"
                variant="primary"
                size="lg"
                data-testid="button-explore-services"
              >
                Explore Our Services
              </LinkButton>
              <LinkButton
                href="/contact"
                variant="outline"
                size="lg"
                data-testid="button-free-consultation"
              >
                Get a Free Consultation
              </LinkButton>
            </motion.div>
          </motion.div>

          {/* Right Column - Sphere Visualization */}
          <div className="hidden lg:flex items-center justify-center">
            <ServicesSphere />
          </div>
        </div>
      </div>
    </section>
  );
}
