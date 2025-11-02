import { Monitor } from "lucide-react";
import ServiceBlock from "../ServiceBlock";

export default function ServiceBlockExample() {
  return (
    <div className="p-8 bg-background">
      <ServiceBlock
        icon={Monitor}
        title="Turnkey Website Design"
        description="Custom websites that convert visitors into customers. We build responsive, SEO-optimized sites that represent your brand professionally and drive results."
        features={[
          "Mobile-first responsive design",
          "SEO optimization included",
          "Content management system",
          "Performance optimization",
          "Brand integration"
        ]}
      />
    </div>
  );
}
