interface MonitorIconProps {
  isVisible?: boolean;
  className?: string;
}

/**
 * MonitorIcon - Animated SVG icon for Website Development
 * 
 * Features glow pulse and horizontal scanline animation.
 * Animations trigger when scrolled into view.
 */
export default function MonitorIcon({ isVisible = false, className = "" }: MonitorIconProps) {
  return (
    <svg 
      width="73" 
      height="73" 
      viewBox="0 0 52 52" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <filter id="monitor-glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Monitor Base */}
      <rect 
        x="6" 
        y="6" 
        width="40" 
        height="28" 
        rx="2" 
        stroke="currentColor" 
        strokeWidth="2" 
        fill="none"
        className={isVisible ? "monitor-screen" : ""}
      />
      
      {/* Monitor Stand */}
      <path 
        d="M 20 34 L 26 38 L 32 34" 
        stroke="currentColor" 
        strokeWidth="2" 
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line 
        x1="16" 
        y1="46" 
        x2="36" 
        y2="46" 
        stroke="currentColor" 
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* Screen Content */}
      <g className={isVisible ? "screen-content" : ""}>
        <line x1="12" y1="14" x2="28" y2="14" stroke="currentColor" strokeWidth="1.5" opacity="0.6" strokeLinecap="round"/>
        <line x1="12" y1="19" x2="35" y2="19" stroke="currentColor" strokeWidth="1.5" opacity="0.6" strokeLinecap="round"/>
        <line x1="12" y1="24" x2="32" y2="24" stroke="currentColor" strokeWidth="1.5" opacity="0.6" strokeLinecap="round"/>
      </g>
      
      {/* Animated Scanline */}
      {isVisible && (
        <line 
          x1="8" 
          y1="10" 
          x2="44" 
          y2="10" 
          stroke="#F4B400" 
          strokeWidth="1" 
          opacity="0"
          className="scanline"
          strokeLinecap="round"
        />
      )}

      <style>{`
        @keyframes monitorGlow {
          0%, 100% {
            filter: drop-shadow(0 0 2px rgba(244, 180, 0, 0.3));
          }
          50% {
            filter: drop-shadow(0 0 8px rgba(244, 180, 0, 0.6));
          }
        }
        
        @keyframes scanlineMove {
          0% {
            y1: 10;
            y2: 10;
            opacity: 0;
          }
          5% {
            opacity: 0.8;
          }
          95% {
            opacity: 0.8;
          }
          100% {
            y1: 32;
            y2: 32;
            opacity: 0;
          }
        }
        
        .monitor-screen {
          animation: monitorGlow 2.5s ease-in-out infinite;
        }
        
        .scanline {
          animation: scanlineMove 3s ease-in-out infinite;
          animation-delay: 0.5s;
        }
        
        svg:hover .monitor-screen {
          filter: drop-shadow(0 0 12px rgba(244, 180, 0, 0.8));
        }
        
        svg:hover .scanline {
          animation-duration: 2s;
        }
      `}</style>
    </svg>
  );
}
