# Smart Klix Agency Website

## Overview

Smart Klix is a modern, responsive React application for a digital services agency. It showcases services like web design, website fixes, business automation, and digital branding, aiming to attract and convert small business clients. The platform emphasizes a professional, trust-building online presence. The application features a full-stack TypeScript architecture, using React for the frontend, Express for the backend, and PostgreSQL (via Drizzle ORM) for data persistence. Its design system leverages Tailwind CSS with shadcn/ui components, inspired by modern design leaders.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

**October 26, 2025 - Enhanced TeamGrid Component**
- Rebuilt TeamGrid component with premium Webflow-level design
- Updated headline: "Meet the Minds Behind SmartKlix" with creative collective subheadline
- Gold glowing circular frames around team portraits (4px border-primary/40, 20px gold shadow)
- NetworkBackground component: SVG with pulsing connecting lines and nodes (3.5s pulse cycle)
- Light gradient background (from-white via-blue-50/30 to-amber-50/20)
- Scroll-triggered staggered entrance animations (200ms delay per card)
- Hover effects: card lift (-translate-y-2), enhanced gold glow border, premium shadows
- Interactive tooltips showing member specializations (e.g., "Specialized in GPT Integrations")
- Added Riplet AI card with Brain icon representing human + AI synergy
- Dark navy gradient for AI card (from-[#0D1B2A] to-[#1a2f45]) with gold border and ping animation
- Dynamic reduced-motion detection: MediaQuery listeners for preference changes
- Mobile viewport detection: animations disabled on devices <767px width
- shouldAnimate flag as single source of truth (gates NetworkBackground, entrance animations, delays)
- Team members enhanced with specialization field for tooltip content
- All interactive elements have data-testid attributes
- CSS animations: pulse-line (network), ping-slow (AI border), fade-in (tooltips)
- Mobile optimizations: network lines hidden, all animations disabled, static rendering
- Passes e2e testing with full accessibility compliance

**October 26, 2025 - Created AboutHero Component for About Page**
- Built new AboutHero component with cinematic two-column layout
- Left column: "The Humans and Systems Powering Tomorrow's Businesses" headline, subheadline, and two CTA buttons (Meet the Team, Our Vision)
- Right column: Video placeholder (solid #0D1B2A background) with play icon overlay and gradient treatment
- Light-to-warm gradient background (from-white via-blue-50/30 to-amber-50/20)
- Scroll-triggered fade-up animations with staggered delays (0ms, 200ms, 400ms)
- Gold glow sweep hover effect on CTA buttons
- Smooth scroll navigation to #team-section and #values-section
- Full accessibility: dynamic prefers-reduced-motion detection with mediaQuery listener
- Responsive design: grid stacks on mobile, proper spacing and typography scaling
- All interactive elements have data-testid attributes for testing
- Replaced PageHeader with AboutHero in AboutPage.tsx
- Added section IDs to TeamGrid and ValuesSection for scroll navigation

**October 26, 2025 - Added BrandPartnerCarousel Component**
- Created BrandPartnerCarousel component showcasing tech partner logos (ChatGPT, Zapier, WordPress, Webflow, Stripe, etc.)
- Infinite horizontal scroll animation (40s duration) with pause-on-hover functionality
- Grayscale-to-color hover transitions for partner logos using CSS filters
- Optional gold pulse accent effect for visual interest
- Scroll-triggered fade-up entrance animation
- Integrated on HomePage (after WhyChooseSmartKlix) and ServicesPage (after BrandServicesSection)
- Mobile optimizations: animations disabled <768px, logos shown in color with reduced opacity
- Accessibility: prefers-reduced-motion support included
- CSS animations: carousel-slide keyframe, partner-logo grayscale filters, gold-pulse glow

**October 26, 2025 - Enhanced CTA Section**
- Updated CTASection component with dark gradient background and premium animations
- Dark navy gradient (from-[#0D1B2A] via-[#1a2f45] to-[#0D1B2A])
- Standardized content: "Ready to Build Smarter?" headline, "Let's turn your website, automation, and brand into a system that works 24/7 — so you don't have to."
- Scroll-triggered entrance animations with staggered delays
- Animated effects: light sweep gradient (15s), floating particles (12 gold particles), gradient orbs
- Gold primary button, outline secondary button with backdrop-blur
- Mobile performance and accessibility optimizations (animations disabled <768px, prefers-reduced-motion support)
- Updated across HomePage, ServicesPage, and AboutPage

**October 26, 2025 - Enhanced ProcessSteps Section**
- Refined ProcessSteps component with cleaner design
- Headline: "How SmartKlix Delivers Results"
- Removed number badges from gold circles
- Updated steps: Discover (Search icon), Build (Code icon), Automate (Settings icon), Launch & Grow (Rocket icon)
- Simplified descriptions for each step
- Horizontal timeline layout (desktop) with animated connecting lines
- Gold circular badges (160px desktop, 96px mobile) with Lucide icons
- Scroll-triggered fade-up entrance, badge glow pulse (8s), light sweep background
- Hover effects: card lift, enhanced shadow and glow
- Mobile: vertical stack with gradient connecting lines

## System Architecture

### Frontend Architecture

**Framework & Build System:** React 18+ with TypeScript, Vite for bundling, and Wouter for client-side routing. Path aliases are configured for clean imports.

**Component Architecture:** Features a component-based architecture with reusable UI components, page-level components, shared layouts (Header, Footer, Hero), and business-specific components. Includes advanced visualization components like `SmartKlixSphere`, `ServicesSphere`, `NetworkHub`, and `FloatingDeviceMockups` to showcase services dynamically. Utilizes `shadcn/ui` for UI primitives.

**Design System:** Custom Tailwind CSS configuration with a brand-specific HSL-based color palette (Deep Navy, Gold Accent), consistent spacing, and responsive grid layouts (mobile-first). Typography uses Poppins (headings) and Inter (body).

**State Management:** React Query (TanStack Query) for server state management, custom hooks for UI state, and local React hooks for form state.

### Backend Architecture

**Server Framework:** Express.js with TypeScript, using Node's `http` module. Includes middleware for JSON parsing, logging, and session management.

**Storage Layer:** Employs a dual storage strategy with an `IStorage` interface, allowing easy switching between in-memory (MemStorage for development) and database (Drizzle ORM) implementations.

**API Design:** RESTful API architecture with routes prefixed `/api`, centralized error handling, and proper HTTP status codes and JSON responses.

**Development Setup:** Integrates Vite development middleware with Express for HMR and debugging, with Replit-specific plugins.

### Database Design

**ORM & Migration System:** Drizzle ORM for type-safe operations with PostgreSQL (@neondatabase/serverless). Migrations are managed in a `./migrations` directory.

**Schema Design:** Includes a `Users` table with UUID primary keys and authentication fields. Zod schemas are used for input validation and type inference.

## External Dependencies

**UI Component Libraries:**
- @radix-ui primitives
- shadcn/ui component system
- Lucide React for iconography
- Embla Carousel

**Development Tools:**
- Drizzle Kit
- Replit-specific plugins (cartographer, dev-banner, runtime-error-modal)
- PostCSS with Tailwind CSS and Autoprefixer

**Form Handling:**
- React Hook Form with @hookform/resolvers
- Zod for schema validation

**Data Fetching:**
- TanStack React Query
- Custom fetch wrapper (`apiRequest`)

**Type Safety:**
- Shared types between client and server via `@shared` alias
- Drizzle-Zod
- TypeScript strict mode

**Static Assets:**
- HTML templates (attached_assets/)
- Logo and brand assets (assets/)