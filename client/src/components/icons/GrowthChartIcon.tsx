interface GrowthChartIconProps {
  isVisible?: boolean;
  className?: string;
}

/**
 * GrowthChartIcon - Animated SVG icon for Scalable USP
 * 
 * Features ascending bar chart with arrow, gentle upward slide animation.
 * Animations trigger when scrolled into view.
 */
export default function GrowthChartIcon({ isVisible = false, className = "" }: GrowthChartIconProps) {
  return (
    <svg 
      width="76" 
      height="76" 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g className={isVisible ? "chart-slide" : ""}>
        {/* Base grid lines */}
        <line x1="8" y1="36" x2="40" y2="36" stroke="currentColor" strokeWidth="2" opacity="0.3" strokeLinecap="round" />
        <line x1="8" y1="28" x2="40" y2="28" stroke="currentColor" strokeWidth="1.5" opacity="0.2" strokeLinecap="round" />
        <line x1="8" y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="1.5" opacity="0.2" strokeLinecap="round" />
        
        {/* Ascending bars */}
        <rect x="10" y="30" width="5" height="6" rx="1" fill="currentColor" opacity="0.5" />
        <rect x="18" y="26" width="5" height="10" rx="1" fill="currentColor" opacity="0.6" />
        <rect x="26" y="21" width="5" height="15" rx="1" fill="currentColor" opacity="0.7" />
        <rect x="34" y="15" width="5" height="21" rx="1" fill="currentColor" opacity="0.8" />
        
        {/* Trend line */}
        <path
          d="M 12.5 33 L 20.5 29 L 28.5 23.5 L 36.5 16"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* Arrow head */}
        <path
          d="M 36.5 16 L 33 18 M 36.5 16 L 34.5 19.5"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Growth accent */}
        <circle cx="36.5" cy="16" r="1.5" fill="currentColor" />
      </g>

      <style>{`
        @keyframes chartSlide {
          0%, 100% {
            transform: translateY(0px);
            filter: drop-shadow(0 0 3px rgba(244, 180, 0, 0.4));
          }
          50% {
            transform: translateY(-3px);
            filter: drop-shadow(0 0 8px rgba(244, 180, 0, 0.6));
          }
        }
        
        .chart-slide {
          animation: chartSlide 2.5s ease-in-out infinite;
        }
        
        svg:hover .chart-slide {
          filter: drop-shadow(0 0 12px rgba(244, 180, 0, 0.5));
        }
      `}</style>
    </svg>
  );
}
