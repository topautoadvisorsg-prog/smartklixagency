import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Globe, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { useTheme } from "@/lib/ThemeContext";
import { useTranslation } from "@/locales";
import logoWebp from "@/assets/smartklix-logo.webp";

/**
 * SECTION: Header - Last updated Nov 2025
 * 
 * Fixed navigation bar with logo, nav links, language switcher, and mobile menu.
 * Features: Sticky positioning, backdrop blur, active link highlighting, responsive mobile drawer
 * Animations: Mobile menu slide-in, hover effects on nav items
 */
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  const { language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const t = useTranslation(language);

  const navLinks = [
    { path: "/", label: t.nav.home },
    { path: "/services", label: t.nav.services },
    { path: "/about", label: t.nav.about },
    { path: "/contact#contact-form", label: t.nav.contact },
  ];

  const currentPath = location.split("#")[0];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm transition-all duration-300">
      <nav className="flex items-center justify-between w-full px-8 md:px-12 lg:px-20 h-[90px]">
        <Link 
          href="/" 
          className="flex min-w-0 items-center gap-2 sm:gap-4 hover-elevate rounded-md px-1 sm:px-2 py-2" 
          data-testid="link-home"
        >
          <img 
            src={logoWebp} 
            alt="Smart Klix - AI Websites and Business Automation Solutions Logo" 
            className="w-[52px] sm:w-[70px] h-auto flex-shrink-0" 
            data-testid="img-logo"
          />
          <span className="font-heading font-semibold text-[24px] sm:text-[34px] text-primary dark:text-white transition-colors whitespace-nowrap leading-none">
            Smart Klix
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.path} className="relative group">
                <Link 
                  href={link.path}
                  className={`text-[17px] font-medium tracking-wide transition-all duration-300 relative pb-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-primary after:rounded-full after:transition-transform after:duration-300 after:origin-left ${
                    currentPath === link.path.split("#")[0] || (link.path === '/services' && currentPath.startsWith('/services'))
                      ? "text-foreground after:scale-x-100"
                      : "text-muted-foreground hover:text-foreground hover:after:scale-x-100 after:scale-x-0"
                  }`}
                  data-testid={`link-${link.label.toLowerCase()}`}
                  style={{ letterSpacing: '0.02em' }}
                >
                  {link.label}
                </Link>
                
                {/* Desktop Services Dropdown */}
                {link.path === '/services' && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-50">
                    <div className="bg-white dark:bg-slate-900 border border-border rounded-xl shadow-xl py-2 w-48 flex flex-col relative before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-b-white dark:before:border-b-slate-900 drop-shadow-sm">
                      <Link href="/services/websites" className="px-5 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary transition-colors">
                        {language === 'en' ? 'Websites' : 'Sitios Web'}
                      </Link>
                      <Link href="/services/apps" className="px-5 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary transition-colors">
                        {language === 'en' ? 'Apps' : 'Apps'}
                      </Link>
                      <Link href="/services/automation" className="px-5 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary transition-colors">
                        {language === 'en' ? 'Automation' : 'Automatización'}
                      </Link>
                      <Link href="/services/branding" className="px-5 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary transition-colors">
                        {language === 'en' ? 'Branding' : 'Marca'}
                      </Link>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
          
          {/* Theme Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="relative group"
            data-testid="button-theme-toggle"
            title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          {/* Language Switcher Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            className="relative group"
            data-testid="button-language-toggle"
            title={language === "en" ? "Cambiar a Español" : "Switch to English"}
          >
            <Globe className="h-5 w-5" />
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {language === "en" ? "ES" : "EN"}
            </span>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden w-14 h-14 flex items-center justify-center rounded-md hover-elevate active-elevate-2 cursor-pointer z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          data-testid="button-menu-toggle"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="w-10 h-10" /> : <Menu className="w-10 h-10" />}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-[90px] left-0 right-0 bg-background border-b border-border md:hidden shadow-xl backdrop-blur-md z-40 max-h-[calc(100vh-90px)] overflow-y-auto">
            <div className="flex flex-col p-6 gap-4">
              <ul className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link 
                      href={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-4 py-3 rounded-md font-medium transition-colors ${
                        currentPath === link.path.split("#")[0] || (link.path === '/services' && currentPath.startsWith('/services'))
                          ? "bg-sidebar-accent text-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      }`}
                      data-testid={`link-mobile-${link.label.toLowerCase()}`}
                    >
                      {link.label}
                    </Link>
                    
                    {/* Mobile Services Sub-menu */}
                    {link.path === '/services' && (
                      <ul className="mt-1 ml-4 pl-4 border-l-2 border-border flex flex-col gap-1">
                        <li>
                          <Link href="/services/websites" onClick={() => setIsMenuOpen(false)} className={`block px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${location === '/services/websites' ? 'text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-accent'}`}>
                            {language === 'en' ? 'Websites' : 'Sitios Web'}
                          </Link>
                        </li>
                        <li>
                          <Link href="/services/apps" onClick={() => setIsMenuOpen(false)} className={`block px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${location === '/services/apps' ? 'text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-accent'}`}>
                            {language === 'en' ? 'Apps' : 'Apps'}
                          </Link>
                        </li>
                        <li>
                          <Link href="/services/automation" onClick={() => setIsMenuOpen(false)} className={`block px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${location === '/services/automation' ? 'text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-accent'}`}>
                            {language === 'en' ? 'Automation' : 'Automatización'}
                          </Link>
                        </li>
                        <li>
                          <Link href="/services/branding" onClick={() => setIsMenuOpen(false)} className={`block px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${location === '/services/branding' ? 'text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-accent'}`}>
                            {language === 'en' ? 'Branding' : 'Marca'}
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
              
              {/* Mobile Theme Toggle */}
              <div className="pt-4 border-t border-border flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    toggleTheme();
                  }}
                  className="flex-1 justify-center gap-2"
                  data-testid="button-theme-toggle-mobile"
                >
                  {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                  <span>{theme === "light" ? "Dark" : "Light"}</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    toggleLanguage();
                    setIsMenuOpen(false);
                  }}
                  className="flex-1 justify-center gap-2"
                  data-testid="button-language-toggle-mobile"
                >
                  <Globe className="h-5 w-5" />
                  <span>{language === "en" ? "Español" : "English"}</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
