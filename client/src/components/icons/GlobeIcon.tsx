interface GlobeIconProps {
  isVisible?: boolean;
  className?: string;
}

/**
 * GlobeIcon - Animated SVG icon for Bilingual USP
 * 
 * Features refined globe with smooth, thick lines and slow rotation.
 * Animations trigger when scrolled into view.
 */
export default function GlobeIcon({ isVisible = false, className = "" }: GlobeIconProps) {
  return (
    <svg 
      width="76" 
      height="76" 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer circle (static) */}
      <circle
        cx="24"
        cy="24"
        r="18"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
      />
      
      <g className={isVisible ? "globe-rotate" : ""}>
        {/* Central vertical meridian */}
        <ellipse
          cx="24"
          cy="24"
          rx="8"
          ry="18"
          stroke="currentColor"
          strokeWidth="2.5"
          fill="none"
          opacity="0.8"
        />
        
        {/* Equator */}
        <line
          x1="6"
          y1="24"
          x2="42"
          y2="24"
          stroke="currentColor"
          strokeWidth="2.5"
          opacity="0.7"
        />
        
        {/* Upper latitude */}
        <ellipse
          cx="24"
          cy="24"
          rx="18"
          ry="5"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          opacity="0.5"
          transform="translate(0, -6)"
        />
        
        {/* Lower latitude */}
        <ellipse
          cx="24"
          cy="24"
          rx="18"
          ry="5"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          opacity="0.5"
          transform="translate(0, 6)"
        />
        
        {/* Connection dots */}
        <circle cx="24" cy="6" r="1.5" fill="currentColor" opacity="0.6" />
        <circle cx="24" cy="42" r="1.5" fill="currentColor" opacity="0.6" />
      </g>

      <style>{`
        @keyframes globeRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes globeGlow {
          0%, 100% {
            filter: drop-shadow(0 0 3px rgba(244, 180, 0, 0.4));
          }
          50% {
            filter: drop-shadow(0 0 8px rgba(244, 180, 0, 0.6));
          }
        }
        
        .globe-rotate {
          transform-origin: 24px 24px;
          animation: 
            globeRotate 8s linear infinite,
            globeGlow 3s ease-in-out infinite;
        }
        
        svg:hover .globe-rotate {
          filter: drop-shadow(0 0 12px rgba(244, 180, 0, 0.5));
        }
      `}</style>
    </svg>
  );
}
