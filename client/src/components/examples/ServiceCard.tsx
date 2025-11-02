import { Monitor } from "lucide-react";
import ServiceCard from "../ServiceCard";

export default function ServiceCardExample() {
  return (
    <div className="p-8 bg-background">
      <ServiceCard
        icon={Monitor}
        title="Web Design"
        description="Custom websites that convert visitors into customers"
      />
    </div>
  );
}
