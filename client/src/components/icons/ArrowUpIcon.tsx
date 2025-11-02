interface ArrowUpIconProps {
  isVisible?: boolean;
  className?: string;
}

/**
 * ArrowUpIcon - Animated SVG icon for Scalable USP
 * 
 * Features gentle upward slide animation (3px loop).
 * Animations trigger when scrolled into view.
 */
export default function ArrowUpIcon({ isVisible = false, className = "" }: ArrowUpIconProps) {
  return (
    <svg 
      width="54" 
      height="54" 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g className={isVisible ? "arrow-slide" : ""}>
        {/* Arrow shaft */}
        <path
          d="M 12 28 L 20 12 L 28 28"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* Arrow base line */}
        <line
          x1="8"
          y1="32"
          x2="32"
          y2="32"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        
        {/* Accent dots */}
        <circle cx="20" cy="20" r="1.5" fill="currentColor" opacity="0.6" />
        <circle cx="20" cy="26" r="1.5" fill="currentColor" opacity="0.4" />
      </g>

      <style>{`
        @keyframes arrowSlide {
          0%, 100% {
            transform: translateY(0px);
            filter: drop-shadow(0 0 2px rgba(244, 180, 0, 0.3));
          }
          50% {
            transform: translateY(-3px);
            filter: drop-shadow(0 0 6px rgba(244, 180, 0, 0.5));
          }
        }
        
        .arrow-slide {
          animation: arrowSlide 2.5s ease-in-out infinite;
        }
        
        svg:hover .arrow-slide {
          filter: drop-shadow(0 0 12px rgba(244, 180, 0, 0.5));
        }
      `}</style>
    </svg>
  );
}
