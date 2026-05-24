import { useEffect } from 'react';

interface SEOMetaProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
}

/**
 * SEOMeta - Dynamic SEO component for page-level meta tags
 * 
 * Updates document title, meta description, Open Graph tags,
 * and Twitter Card tags for each page.
 * 
 * Usage:
 * <SEOMeta 
 *   title="Page Title | Smart Klix"
 *   description="Page-specific description"
 *   canonicalUrl="/page-path"
 * />
 */
export default function SEOMeta({ title, description, canonicalUrl, ogImage }: SEOMetaProps) {
  useEffect(() => {
    // Update title
    document.title = title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // Update or create Open Graph title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', title);

    // Update or create Open Graph description
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute('content', description);

    // Update or create Open Graph type
    let ogType = document.querySelector('meta[property="og:type"]');
    if (!ogType) {
      ogType = document.createElement('meta');
      ogType.setAttribute('property', 'og:type');
      ogType.setAttribute('content', 'website');
      document.head.appendChild(ogType);
    }

    // Update or create Open Graph image
    let ogImageTag = document.querySelector('meta[property="og:image"]');
    if (!ogImageTag) {
      ogImageTag = document.createElement('meta');
      ogImageTag.setAttribute('property', 'og:image');
      document.head.appendChild(ogImageTag);
    }
    ogImageTag.setAttribute('content', ogImage || 'https://smartklix.com/assets/branding-hero-assets/hero-brand-section.png');

    // Update or create Twitter Card
    let twitterCard = document.querySelector('meta[name="twitter:card"]');
    if (!twitterCard) {
      twitterCard = document.createElement('meta');
      twitterCard.setAttribute('name', 'twitter:card');
      twitterCard.setAttribute('content', 'summary_large_image');
      document.head.appendChild(twitterCard);
    }

    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (!twitterTitle) {
      twitterTitle = document.createElement('meta');
      twitterTitle.setAttribute('name', 'twitter:title');
      document.head.appendChild(twitterTitle);
    }
    twitterTitle.setAttribute('content', title);

    let twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (!twitterDescription) {
      twitterDescription = document.createElement('meta');
      twitterDescription.setAttribute('name', 'twitter:description');
      document.head.appendChild(twitterDescription);
    }
    twitterDescription.setAttribute('content', description);

    // Update canonical URL if provided
    if (canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', `https://smartklix.com${canonicalUrl}`);
    }

    // Cleanup function
    return () => {
      // Meta tags will be updated by next page component, no cleanup needed
    };
  }, [title, description, canonicalUrl, ogImage]);

  return null; // This component only updates meta tags, no visual output
}
