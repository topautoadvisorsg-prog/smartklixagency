import { useEffect } from 'react';

/**
 * TidioChat - Global chat widget integration
 * 
 * Loads Tidio chat script asynchronously for non-blocking performance.
 * The widget persists across all page navigations when placed at app root level.
 * 
 * Setup required:
 * 1. Create account at https://www.tidio.com
 * 2. Get public key from Settings > Developer
 * 3. Add to .env file: VITE_TIDIO_PUBLIC_KEY=your_key_here
 */
export default function TidioChat() {
  useEffect(() => {
    const tidioKey = import.meta.env.VITE_TIDIO_PUBLIC_KEY;
    
    if (!tidioKey || tidioKey === 'your_tidio_public_key_here') {
      console.warn('Tidio public key not configured. Chat widget will not load.');
      return;
    }

    // Create and inject Tidio script
    const script = document.createElement('script');
    script.src = `//code.tidio.co/${tidioKey}.js`;
    script.async = true;
    document.body.appendChild(script);

    // Cleanup on unmount (optional - Tidio persists well across navigation)
    return () => {
      const existingScript = document.querySelector(`script[src*="tidio.co"]`);
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, []);

  return null; // Widget renders via script injection, no JSX needed
}
