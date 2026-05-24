import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * ScrollToTop component
 * 
 * Automatically scrolls the window to the top when the route changes.
 * This ensures users start at the top of each page during navigation,
 * providing a clean and expected user experience.
 * 
 * Uses smooth scrolling for a polished transition effect.
 */
export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    const hash = window.location.hash.replace("#", "") || location.split("#")[1];

    if (hash) {
      const scrollToHash = () => {
        document.getElementById(hash)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      };

      window.setTimeout(scrollToHash, 0);
      window.setTimeout(scrollToHash, 250);
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location]); // Trigger effect when location changes

  // This component doesn't render anything
  return null;
}
