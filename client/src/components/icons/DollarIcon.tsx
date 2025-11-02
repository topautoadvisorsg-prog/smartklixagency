interface DollarIconProps {
  isVisible?: boolean;
  className?: string;
}

/**
 * DollarIcon - Animated SVG icon for Affordable USP
 * 
 * Features bold dollar symbol inside a gold circle with soft pulse animation.
 * Animations trigger when scrolled into view.
 */
export default function DollarIcon({ isVisible = false, className = "" }: DollarIconProps) {
  return (
    <svg 
      width="76" 
      height="76" 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g className={isVisible ? "dollar-pulse" : ""}>
        {/* Gold circle background */}
        <circle
          cx="24"
          cy="24"
          r="20"
          fill="rgba(244, 180, 0, 0.12)"
          stroke="currentColor"
          strokeWidth="2"
        />
        
        {/* Dollar sign - vertical line */}
        <path
          d="M 24 10 L 24 38"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        
        {/* Top curve of S */}
        <path
          d="M 30 16 C 30 13.2 27.3 11 24 11 C 20.7 11 18 13.2 18 16 C 18 18.8 20.7 21 24 21 L 24 21"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        
        {/* Bottom curve of S */}
        <path
          d="M 18 32 C 18 34.8 20.7 37 24 37 C 27.3 37 30 34.8 30 32 C 30 29.2 27.3 27 24 27 L 24 27"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      <style>{`
        @keyframes dollarPulse {
          0%, 100% {
            filter: drop-shadow(0 0 3px rgba(244, 180, 0, 0.4));
            transform: scale(1);
          }
          50% {
            filter: drop-shadow(0 0 10px rgba(244, 180, 0, 0.7));
            transform: scale(1.03);
          }
        }
        
        .dollar-pulse {
          animation: dollarPulse 3s ease-in-out infinite;
          transform-origin: center;
        }
        
        svg:hover .dollar-pulse {
          filter: drop-shadow(0 0 12px rgba(244, 180, 0, 0.5));
        }
      `}</style>
    </svg>
  );
}
