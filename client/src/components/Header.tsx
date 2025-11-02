import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoWebp from "@/assets/smartklix-logo.webp";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/services", label: "Services" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm transition-all duration-300">
      <nav className="container mx-auto px-4 lg:px-20 h-[90px] flex items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center gap-4 hover-elevate rounded-md px-2 py-2" 
          data-testid="link-home"
        >
          <img 
            src={logoWebp} 
            alt="Smart Klix Icon" 
            className="w-[70px] h-auto" 
            data-testid="img-logo"
          />
          <span className="font-heading font-semibold text-[34px] text-primary" style={{ letterSpacing: '-0.01em' }}>
            Smart Klix
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link 
                href={link.path}
                className={`text-[17px] font-medium tracking-wide transition-all duration-300 relative pb-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-primary after:rounded-full after:transition-transform after:duration-300 after:origin-left ${
                  location === link.path
                    ? "text-foreground after:scale-x-100"
                    : "text-muted-foreground hover:text-foreground hover:after:scale-x-100 after:scale-x-0"
                }`}
                data-testid={`link-${link.label.toLowerCase()}`}
                style={{ letterSpacing: '0.02em' }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          data-testid="button-menu-toggle"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-[90px] left-0 right-0 bg-background border-b border-border md:hidden shadow-lg backdrop-blur-md">
            <ul className="flex flex-col p-6 gap-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    href={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 rounded-md font-medium transition-colors ${
                      location === link.path
                        ? "bg-sidebar-accent text-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    }`}
                    data-testid={`link-mobile-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
