import { Mail, MapPin, Globe, Clock } from "lucide-react";

export default function ContactInfo() {
  const info = [
    {
      icon: Mail,
      label: "Email",
      value: "info@smartklix.com"
    },
    {
      icon: MapPin,
      label: "Service Areas",
      value: "United States, Mexico, Canada"
    },
    {
      icon: Globe,
      label: "Languages Supported",
      value: "English & Spanish"
    },
    {
      icon: Clock,
      label: "Response Time",
      value: "Within 24 hours"
    }
  ];

  return (
    <div className="bg-card border border-card-border rounded-xl p-8 space-y-6">
      <h3 className="font-heading font-semibold text-2xl text-card-foreground mb-6">
        Get In Touch
      </h3>
      {info.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.label} className="space-y-2" data-testid={`info-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
            <div className="flex items-center gap-2 text-sidebar-primary">
              <Icon className="w-5 h-5" />
              <h4 className="font-semibold text-foreground">{item.label}</h4>
            </div>
            <p className="text-muted-foreground pl-7">{item.value}</p>
          </div>
        );
      })}
    </div>
  );
}
