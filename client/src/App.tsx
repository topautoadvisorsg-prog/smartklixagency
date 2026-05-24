import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/lib/ThemeContext";
import { LanguageProvider } from "@/lib/LanguageContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import ScrollToTop from "@/components/ScrollToTop";
import TidioChat from "@/components/TidioChat";
import HomePage from "@/pages/HomePage";
import ServicesPage from "@/pages/ServicesPage";
import WebsitesPage from "@/pages/WebsitesPage";
import AppsPage from "@/pages/AppsPage";
import AutomationPage from "@/pages/AutomationPage";
import BrandingPage from "@/pages/BrandingPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import PrivacyPage from "@/pages/PrivacyPage";
import TermsPage from "@/pages/TermsPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <>
      {/* Scroll to top on route change for clean navigation UX */}
      <ScrollToTop />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/services" component={ServicesPage} />
        <Route path="/services/websites" component={WebsitesPage} />
        <Route path="/services/apps" component={AppsPage} />
        <Route path="/services/automation" component={AutomationPage} />
        <Route path="/services/branding" component={BrandingPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/privacy" component={PrivacyPage} />
        <Route path="/terms" component={TermsPage} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <Toaster />
          <Router />
          {/* Global Tidio Chat Widget - persists across all pages */}
          <TidioChat />
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
