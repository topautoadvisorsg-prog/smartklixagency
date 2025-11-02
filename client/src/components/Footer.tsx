import { Link } from "wouter";
import { Mail, Globe, Facebook, Instagram, Linkedin } from "lucide-react";
import logoWebp from "@/assets/smartklix-logo.webp";

/**
 * Footer - Light-themed footer with brand, links, and contact information
 * 
 * Features 3-column layout (desktop) with logo, quick links, and contact/social.
 * Includes hover animations and responsive mobile stacking.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 pt-20 pb-8">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Left Column - Brand */}
          <div className="space-y-4">
            <div className="space-y-2 mb-2">
              <img 
                src={logoWebp} 
                alt="Smart Klix Logo" 
                className="w-32 md:w-36 max-w-[160px] h-auto logo-float"
                data-testid="img-footer-logo"
              />
              <h3 className="font-heading font-bold text-2xl text-card-foreground pl-4">
                Smart&nbsp;Klix
              </h3>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-xs">
              Smart design, automation, and scalable digital systems — built to help small businesses grow like enterprise brands.
            </p>
          </div>

          {/* Center Column - Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg text-card-foreground mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/" 
                  className="text-muted-foreground hover:text-sidebar-primary transition-colors duration-300 footer-link"
                  data-testid="link-footer-home"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-muted-foreground hover:text-sidebar-primary transition-colors duration-300 footer-link"
                  data-testid="link-footer-about"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="/services" 
                  className="text-muted-foreground hover:text-sidebar-primary transition-colors duration-300 footer-link"
                  data-testid="link-footer-services"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-muted-foreground hover:text-sidebar-primary transition-colors duration-300 footer-link"
                  data-testid="link-footer-contact"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  href="/privacy" 
                  className="text-muted-foreground hover:text-sidebar-primary transition-colors duration-300 footer-link"
                  data-testid="link-footer-privacy"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  className="text-muted-foreground hover:text-sidebar-primary transition-colors duration-300 footer-link"
                  data-testid="link-footer-terms"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Column - Contact & Social */}
          <div>
            <h4 className="font-heading font-semibold text-lg text-card-foreground mb-6">
              Contact & Social
            </h4>
            <div className="space-y-4 mb-6">
              <a 
                href="mailto:hello@smartklix.com" 
                className="flex items-center gap-2 text-muted-foreground hover:text-sidebar-primary transition-colors duration-300"
                data-testid="link-footer-email"
              >
                <Mail className="w-5 h-5" />
                <span>hello@smartklix.com</span>
              </a>
              <div className="flex items-start gap-2 text-muted-foreground">
                <Globe className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed">
                  Serving clients remotely — bilingual (English / Spanish)
                </span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon text-card-foreground hover:text-sidebar-primary transition-all duration-300"
                data-testid="link-footer-facebook"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon text-card-foreground hover:text-sidebar-primary transition-all duration-300"
                data-testid="link-footer-instagram"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon text-card-foreground hover:text-sidebar-primary transition-all duration-300"
                data-testid="link-footer-linkedin"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-card-foreground/10 pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Smart Klix. All rights reserved.
          </p>
        </div>
      </div>

      <style>{`
        .footer-link {
          position: relative;
          display: inline-block;
        }

        .footer-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background-color: hsl(var(--sidebar-primary));
          transition: width 0.3s ease;
        }

        .footer-link:hover::after {
          width: 100%;
        }

        .social-icon {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .social-icon:hover {
          filter: drop-shadow(0 0 8px rgba(244, 180, 0, 0.5));
          transform: scale(1.05);
        }

        .logo-float {
          animation: logoFloat 3s ease-in-out infinite;
        }

        @keyframes logoFloat {
          0%, 100% {
            transform: translateY(0);
            filter: drop-shadow(0 2px 4px rgba(244, 180, 0, 0.2));
          }
          50% {
            transform: translateY(-4px);
            filter: drop-shadow(0 4px 8px rgba(244, 180, 0, 0.4));
          }
        }

        @media (max-width: 768px) {
          footer .grid {
            text-align: center;
          }

          footer .flex {
            justify-content: center;
          }

          .footer-link::after {
            left: 50%;
            transform: translateX(-50%);
          }

          .footer-link:hover::after {
            left: 50%;
            transform: translateX(-50%);
          }
        }
      `}</style>
    </footer>
  );
}
