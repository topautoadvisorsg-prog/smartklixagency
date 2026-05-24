import { useEffect, useRef, useState } from "react";

/**
 * useScrollReveal — Returns a ref and isVisible state for scroll-triggered animations.
 * Consolidates the repeated IntersectionObserver pattern used across the codebase.
 * 
 * @param threshold - Visibility threshold (0-1, default: 0.15)
 * @returns [ref, isVisible]
 */
export function useScrollReveal(threshold = 0.15) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible] as const;
}
