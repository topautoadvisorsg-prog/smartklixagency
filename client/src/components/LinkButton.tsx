import { Link } from "wouter";
import { ReactNode } from "react";

/**
 * Button variant types for consistent styling across the application
 */
type ButtonVariant = "primary" | "outline" | "ghost";

/**
 * Button size types
 */
type ButtonSize = "default" | "lg" | "sm" | "xl" | "2xl";

interface LinkButtonProps {
  /** URL to navigate to when clicked */
  href: string;
  /** Button text or content */
  children: ReactNode;
  /** Visual variant of the button (default: "primary") */
  variant?: ButtonVariant;
  /** Size of the button (default: "default") */
  size?: ButtonSize;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for automated testing */
  "data-testid"?: string;
  /** Optional click handler */
  onClick?: () => void;
}

/**
 * LinkButton - A reusable button component that handles navigation
 * 
 * Combines wouter's Link with consistent button styling to avoid
 * repeated inline styles throughout the application.
 * 
 * @example
 * ```tsx
 * <LinkButton href="/contact" variant="primary" size="lg">
 *   Get Started
 * </LinkButton>
 * ```
 */
export default function LinkButton({
  href,
  children,
  variant = "primary",
  size = "default",
  className = "",
  "data-testid": dataTestId,
  onClick,
}: LinkButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-md transition-all duration-300";
  
  const sizeStyles = {
    sm: "min-h-9 px-4 py-2 text-sm",
    default: "min-h-9 px-4 py-2 text-sm",
    lg: "min-h-12 px-8 text-lg",
    xl: "min-h-14 px-10 text-lg",
    "2xl": "min-h-16 px-12 text-xl",
  };

  const variantStyles = {
    primary: "bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground border border-sidebar-primary-border hover:shadow-[0_0_20px_rgba(244,180,0,0.5)]",
    outline: "border border-input bg-background hover:bg-sidebar-primary hover:text-sidebar-primary-foreground hover:border-sidebar-primary-border",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };

  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  return (
    <Link href={href}>
      <button
        className={combinedStyles}
        data-testid={dataTestId}
        onClick={onClick}
      >
        {children}
      </button>
    </Link>
  );
}
