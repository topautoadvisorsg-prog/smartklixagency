# Smart Klix Agency Website

## Overview

Smart Klix is a modern, responsive React application for a digital services agency, showcasing services like web design, website fixes, business automation, and digital branding. It aims to attract and convert small business clients by presenting a professional and trustworthy online presence. The application features a full-stack TypeScript architecture, utilizing React for the frontend, Express for the backend, and PostgreSQL (via Drizzle ORM) for data persistence. Its design system leverages Tailwind CSS with shadcn/ui components, inspired by modern design principles.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:** React 18+ with TypeScript, Vite for bundling, and Wouter for client-side routing.
**Component Architecture:** Reusable UI components, page-level components, shared layouts (Header, Footer, Hero), and business-specific components. Utilizes `shadcn/ui` for UI primitives and includes advanced visualization components like `SmartKlixSphere`, `ServicesSphere`, `NetworkHub`, and `FloatingDeviceMockups`.
**Design System:** Custom Tailwind CSS configuration with a brand-specific HSL-based color palette (Deep Navy, Gold Accent), consistent spacing, and responsive grid layouts (mobile-first). Typography uses Poppins (headings) and Inter (body).
**State Management:** React Query (TanStack Query) for server state management, custom hooks for UI state, and local React hooks for form state.

### Backend Architecture

**Server Framework:** Express.js with TypeScript, using Node's `http` module. Includes middleware for JSON parsing, logging, and session management.
**Storage Layer:** Employs a dual storage strategy with an `IStorage` interface, allowing easy switching between in-memory (MemStorage for development) and database (Drizzle ORM) implementations.
**API Design:** RESTful API architecture with routes prefixed `/api`, centralized error handling, and proper HTTP status codes and JSON responses.
**Development Setup:** Integrates Vite development middleware with Express for HMR and debugging.

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
- PostCSS with Tailwind CSS and Autoprefixer

**Form Handling:**
- React Hook Form with @hookform/resolvers
- Zod for schema validation

**Data Fetching:**
- TanStack React Query

**Type Safety:**
- Shared types between client and server via `@shared` alias
- Drizzle-Zod
- TypeScript strict mode