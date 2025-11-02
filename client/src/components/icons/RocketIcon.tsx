interface RocketIconProps {
  isVisible?: boolean;
  className?: string;
}

/**
 * RocketIcon - Animated SVG icon for Digital Brand Services
 * 
 * Features floating motion and exhaust shimmer animation.
 * Animations trigger when scrolled into view.
 */
export default function RocketIcon({ isVisible = false, className = "" }: RocketIconProps) {
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
        <linearGradient id="exhaust-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F4B400" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#F4B400" stopOpacity="0"/>
        </linearGradient>
      </defs>
      
      <g className={isVisible ? "rocket-float" : ""}>
        {/* Rocket Body */}
        <path
          d="M 26 8 L 32 18 L 32 32 L 26 36 L 20 32 L 20 18 Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinejoin="round"
        />
        
        {/* Rocket Nose Cone */}
        <path
          d="M 26 4 L 32 12 L 26 8 L 20 12 Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinejoin="round"
        />
        
        {/* Window */}
        <circle
          cx="26"
          cy="20"
          r="3"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        
        {/* Fins */}
        <path
          d="M 20 26 L 14 30 L 20 32"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinejoin="round"
        />
        <path
          d="M 32 26 L 38 30 L 32 32"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinejoin="round"
        />
      </g>
      
      {/* Exhaust Flames */}
      {isVisible && (
        <g className="exhaust">
          <path
            d="M 23 36 Q 23 42 26 46 Q 29 42 29 36"
            fill="url(#exhaust-gradient)"
            opacity="0"
            className="flame flame-1"
          />
          <path
            d="M 24 38 Q 24 43 26 46 Q 28 43 28 38"
            fill="url(#exhaust-gradient)"
            opacity="0"
            className="flame flame-2"
          />
          <path
            d="M 25 39 Q 25 43 26 45 Q 27 43 27 39"
            fill="url(#exhaust-gradient)"
            opacity="0"
            className="flame flame-3"
          />
        </g>
      )}

      <style>{`
        @keyframes rocketFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        
        @keyframes rocketGlow {
          0%, 100% {
            filter: drop-shadow(0 0 2px rgba(244, 180, 0, 0.3));
          }
          50% {
            filter: drop-shadow(0 0 6px rgba(244, 180, 0, 0.5));
          }
        }
        
        @keyframes exhaustShimmer1 {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 0.9;
          }
        }
        
        @keyframes exhaustShimmer2 {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.7;
          }
        }
        
        @keyframes exhaustShimmer3 {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
        
        .rocket-float {
          animation: rocketFloat 3s ease-in-out infinite, rocketGlow 2.5s ease-in-out infinite;
        }
        
        .flame-1 {
          animation: exhaustShimmer1 1.5s ease-in-out infinite;
        }
        
        .flame-2 {
          animation: exhaustShimmer2 1.5s ease-in-out infinite;
          animation-delay: 0.15s;
        }
        
        .flame-3 {
          animation: exhaustShimmer3 1.5s ease-in-out infinite;
          animation-delay: 0.3s;
        }
        
        svg:hover .rocket-float {
          animation: rocketFloat 2s ease-in-out infinite, rocketGlow 2.5s ease-in-out infinite;
          filter: drop-shadow(0 0 10px rgba(244, 180, 0, 0.8));
        }
        
        svg:hover .flame-1 {
          animation-duration: 1s;
        }
        
        svg:hover .flame-2 {
          animation-duration: 1s;
        }
        
        svg:hover .flame-3 {
          animation-duration: 1s;
        }
      `}</style>
    </svg>
  );
}
