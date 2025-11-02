interface GearIconProps {
  isVisible?: boolean;
  className?: string;
}

/**
 * GearIcon - Animated SVG icon for Automation & Integrations
 * 
 * Features continuous rotation animation.
 * Animations trigger when scrolled into view.
 */
export default function GearIcon({ isVisible = false, className = "" }: GearIconProps) {
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
        <filter id="gear-glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <g className={isVisible ? "gear-rotate" : ""}>
        {/* Main Gear */}
        <circle 
          cx="26" 
          cy="26" 
          r="8" 
          stroke="currentColor" 
          strokeWidth="2" 
          fill="none"
        />
        
        {/* Gear Teeth (8 teeth) */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => {
          const radian = (angle * Math.PI) / 180;
          const outerR = 18;
          const innerR = 14;
          const toothWidth = 3;
          
          const x1 = 26 + Math.cos(radian - toothWidth * Math.PI / 180) * innerR;
          const y1 = 26 + Math.sin(radian - toothWidth * Math.PI / 180) * innerR;
          const x2 = 26 + Math.cos(radian - toothWidth * Math.PI / 180) * outerR;
          const y2 = 26 + Math.sin(radian - toothWidth * Math.PI / 180) * outerR;
          const x3 = 26 + Math.cos(radian + toothWidth * Math.PI / 180) * outerR;
          const y3 = 26 + Math.sin(radian + toothWidth * Math.PI / 180) * outerR;
          const x4 = 26 + Math.cos(radian + toothWidth * Math.PI / 180) * innerR;
          const y4 = 26 + Math.sin(radian + toothWidth * Math.PI / 180) * innerR;
          
          return (
            <path
              key={index}
              d={`M ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3} L ${x4} ${y4} Z`}
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinejoin="miter"
            />
          );
        })}
        
        {/* Center Circle */}
        <circle 
          cx="26" 
          cy="26" 
          r="4" 
          stroke="currentColor" 
          strokeWidth="2" 
          fill="none"
        />
      </g>
      
      {/* Small Inner Gear (counter-rotation) */}
      <g className={isVisible ? "gear-counter-rotate" : ""} opacity="0.6">
        <circle 
          cx="26" 
          cy="26" 
          r="2" 
          stroke="currentColor" 
          strokeWidth="1" 
          fill="none"
        />
      </g>

      <style>{`
        @keyframes gearRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes gearCounterRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
        
        @keyframes gearGlow {
          0%, 100% {
            filter: drop-shadow(0 0 2px rgba(244, 180, 0, 0.3));
          }
          50% {
            filter: drop-shadow(0 0 6px rgba(244, 180, 0, 0.5));
          }
        }
        
        .gear-rotate {
          transform-origin: 26px 26px;
          animation: gearRotate 8s linear infinite, gearGlow 3s ease-in-out infinite;
        }
        
        .gear-counter-rotate {
          transform-origin: 26px 26px;
          animation: gearCounterRotate 6s linear infinite;
        }
        
        svg:hover .gear-rotate {
          animation: gearRotate 5s linear infinite, gearGlow 3s ease-in-out infinite;
          filter: drop-shadow(0 0 10px rgba(244, 180, 0, 0.7));
        }
        
        svg:hover .gear-counter-rotate {
          animation: gearCounterRotate 4s linear infinite;
        }
      `}</style>
    </svg>
  );
}
