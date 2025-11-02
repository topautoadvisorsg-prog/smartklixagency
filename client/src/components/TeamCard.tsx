/**
 * Props for the TeamCard component
 */
interface TeamCardProps {
  /** Team member's full name */
  name: string;
  /** Job title or role */
  role: string;
  /** Optional initials for avatar fallback (auto-generated if not provided) */
  initials?: string;
  /** Optional profile image URL */
  image?: string;
}

/**
 * TeamCard - Displays a team member's information
 * 
 * Shows either a profile image or an auto-generated avatar with initials.
 * Used on the About page and team preview sections.
 * 
 * @example
 * ```tsx
 * <TeamCard
 *   name="Jovan Palomera"
 *   role="Director of Strategy & Solutions"
 *   initials="JP"
 * />
 * ```
 */
export default function TeamCard({ name, role, initials, image }: TeamCardProps) {
  return (
    <div className="text-center p-6 bg-card rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover-elevate" data-testid={`card-team-${name.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="flex justify-center mb-6">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-32 h-32 rounded-full object-cover"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
            <span className="font-heading font-bold text-3xl text-sidebar-primary">
              {initials || name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        )}
      </div>
      <h3 className="font-heading font-semibold text-lg text-card-foreground mb-2">
        {name}
      </h3>
      <p className="text-sm text-muted-foreground">
        {role}
      </p>
    </div>
  );
}
