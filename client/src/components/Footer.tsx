import { Link } from "wouter";
import { Mail, Globe, Facebook, Instagram, Linkedin } from "lucide-react";
import logoWebp from "@/assets/smartklix-logo.webp";
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";

/**
 * SECTION: Footer - Last updated Nov 2025
 * 
 * Features 3-column layout (desktop) with logo, quick links, and contact/social.
 * Animations: Logo float animation, link underline sweep, social icon glow on hover
 * Responsive: Mobile stacking with centered alignment
 */
export default function Footer() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-background to-muted/30 pt-20 pb-8">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Left Column - Brand */}
          <div className="space-y-4">
            <div className="flex flex-col items-center md:items-start mb-6">
              <img 
                src={logoWebp} 
                alt="Smart Klix Logo - Professional Web Design and AI Automation Services"
                className="w-32 md:w-36 max-w-[160px] h-auto logo-float mb-2"
                data-testid="img-footer-logo"
              />
              <h3 className="font-heading font-bold text-2xl text-card-foreground md:pl-4">
                Smart Klix
              </h3>
            </div>
            <p className="text-foreground/80 leading-relaxed max-w-xs text-center md:text-left mx-auto md:mx-0">
              {t.footer.brandDescription}
            </p>
          </div>

          {/* Center Column - Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg text-card-foreground mb-6">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/" 
                  className="text-foreground/80 hover:text-sidebar-primary transition-colors duration-300 footer-link"
                  data-testid="link-footer-home"
                >
                  {t.footer.links.home}
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-foreground/80 hover:text-sidebar-primary transition-colors duration-300 footer-link"
                  data-testid="link-footer-about"
                >
                  {t.footer.links.about}
                </Link>
              </li>
              <li>
                <Link 
                  href="/services" 
                  className="text-foreground/80 hover:text-sidebar-primary transition-colors duration-300 footer-link"
                  data-testid="link-footer-services"
                >
                  {t.footer.links.services}
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact#contact-form" 
                  className="text-foreground/80 hover:text-sidebar-primary transition-colors duration-300 footer-link"
                  data-testid="link-footer-contact"
                >
                  {t.footer.links.contact}
                </Link>
              </li>
              <li>
                <Link 
                  href="/privacy" 
                  className="text-foreground/80 hover:text-sidebar-primary transition-colors duration-300 footer-link"
                  data-testid="link-footer-privacy"
                >
                  {t.footer.links.privacy}
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  className="text-foreground/80 hover:text-sidebar-primary transition-colors duration-300 footer-link"
                  data-testid="link-footer-terms"
                >
                  {t.footer.links.terms}
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Column - Contact & Social */}
          <div>
            <h4 className="font-heading font-semibold text-lg text-card-foreground mb-6">
              {t.footer.contactSocial}
            </h4>
            <div className="space-y-4 mb-6">
              <a 
                href="mailto:hello@smartklix.com" 
                className="flex items-center gap-2 text-foreground/80 hover:text-sidebar-primary transition-colors duration-300"
                data-testid="link-footer-email"
              >
                <Mail className="w-5 h-5" />
                <span>hello@smartklix.com</span>
              </a>
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
        <div className="border-t border-border pt-6 text-center">
          <p className="text-sm text-foreground/60">
            {t.footer.copyright.replace('{year}', currentYear.toString())}
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
