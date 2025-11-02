import { LucideIcon } from "lucide-react";
import LinkButton from "./LinkButton";

/**
 * Props for the ServiceBlock component
 */
interface ServiceBlockProps {
  /** Lucide icon component to display */
  icon: LucideIcon;
  /** Service title */
  title: string;
  /** Detailed description of the service */
  description: string;
  /** List of key features or benefits */
  features: string[];
  /** If true, reverses the layout (image on right) for alternating design */
  reverse?: boolean;
}

/**
 * ServiceBlock - Full-width service display with features list
 * 
 * Displays detailed service information with an icon, description,
 * feature list, and CTA button. Supports alternating left/right layout.
 * 
 * @example
 * ```tsx
 * <ServiceBlock
 *   icon={Monitor}
 *   title="Turnkey Website Design"
 *   description="Custom websites that convert visitors..."
 *   features={["Mobile-first design", "SEO optimization"]}
 *   reverse={false}
 * />
 * ```
 */
export default function ServiceBlock({ icon: Icon, title, description, features, reverse }: ServiceBlockProps) {
  return (
    <div className={`grid md:grid-cols-2 gap-12 items-center py-12 ${reverse ? 'md:flex-row-reverse' : ''}`}>
      <div className={`flex justify-center ${reverse ? 'md:order-2' : ''}`}>
        <div className="w-64 h-64 bg-gradient-to-br from-card to-card/50 rounded-2xl flex items-center justify-center">
          <Icon className="w-24 h-24 text-sidebar-primary" />
        </div>
      </div>
      <div className={reverse ? 'md:order-1' : ''}>
        <h2 className="font-heading font-bold text-3xl text-foreground mb-4">{title}</h2>
        <p className="text-lg text-muted-foreground mb-6">{description}</p>
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-sidebar-primary rounded-full mt-2" />
              <span className="text-foreground">{feature}</span>
            </li>
          ))}
        </ul>
        <LinkButton 
          href="/contact" 
          variant="primary" 
          data-testid={`button-quote-${title.toLowerCase().replace(/\s+/g, '-')}`}
        >
          Get a Quote
        </LinkButton>
      </div>
    </div>
  );
}
