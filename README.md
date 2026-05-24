# SmartKlix - Static Website

A modern, responsive website built with React, TypeScript, and Tailwind CSS. This is a frontend-only static site with no backend dependencies.

## Features

- Modern React 18 with TypeScript
- Beautiful UI components with Radix UI
- Tailwind CSS for styling
- Framer Motion for animations
- 3D elements with Three.js and React Three Fiber
- Fully responsive design
- Optimized for production deployment

## Front-End Behavior

### Scroll-to-Top Navigation

All main navigation links (Home, Services, About, Contact) automatically scroll the page to the top when clicked. This provides a clean and expected user experience, ensuring every page starts from the top regardless of the previous scroll position.

**Implementation:**
- Uses a `ScrollToTop` component that listens to route changes via Wouter's `useLocation` hook
- Triggers smooth scroll behavior: `window.scrollTo({ top: 0, behavior: "smooth" })`
- Works on both desktop and mobile views
- Applies to all internal page transitions

**Component Location:** `client/src/components/ScrollToTop.tsx`

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone this repository or download the project files
2. Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:5000`

### Building for Production

Create a production build:

```bash
npm run build
```

This creates an optimized static build in the `dist/public` folder.

### Preview Production Build

Test the production build locally:

```bash
npm run preview
```

## Project Structure

```
smartklix/
├── client/              # Frontend source code
│   ├── src/
│   │   ├── assets/      # Images and static assets
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utility functions
│   │   └── config/      # Configuration files
│   └── index.html       # Entry HTML file
├── attached_assets/     # Additional assets (logos, images)
├── dist/                # Production build output
└── package.json         # Dependencies and scripts
```

## Deployment

The `dist/public` folder contains all the files needed for deployment. You can deploy this static site to any hosting provider:

### Hostinger

1. Build the project: `npm run build`
2. Upload the contents of `dist/public` folder to your hosting directory
3. Ensure your web server is configured to serve `index.html` for all routes (for client-side routing)

### Netlify

1. Build the project: `npm run build`
2. Deploy the `dist/public` folder via Netlify UI or CLI
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist/public`

### Vercel

1. Build the project: `npm run build`
2. Deploy via Vercel CLI or connect your repository
3. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `dist/public`

### Replit Deployment (Recommended: Static)

**Option 1: Static Deployment (Recommended - Free hosting!)**

This is the best option for this static React site. Static deployments are free (you only pay for data transfer) and optimized for frontend-only sites.

1. Click the "Deploy" or "Publish" button in Replit
2. Select **"Static"** as the deployment type
3. Set the output directory to `dist/public`
4. Replit will automatically build and deploy your site

**Option 2: Autoscale Deployment (Alternative)**

If you prefer Autoscale deployment, the project is already configured with:
- Build command: `npm run build`
- Start command: `npm run start`
- The deployment will run `vite preview` to serve the static files

Note: Autoscale costs more than Static deployment and is better suited for apps with backend servers.

## Configuration

All configuration can be updated without breaking the site:

- **Colors & Styling**: Edit `client/src/index.css` and Tailwind configuration
- **Content**: Update components in `client/src/components/` and pages in `client/src/pages/`
- **Assets**: Add/replace files in `client/src/assets/` or `attached_assets/`
- **Routes**: Modify `client/src/App.tsx` for routing changes

## Recent Changes

### CTA Section Background & Contrast Fix (November 2025)

**Issue Fixed**: The call-to-action section at the bottom of Home, About, and Services pages had white text on a white background, making it unreadable.

**Files Modified**:
- `client/src/components/CTASection.tsx`

**What Changed**:
- Added a solid dark navy background color (`bg-[#0D1B2A]`) as a failsafe before the gradient overlay
- This ensures the background is always dark, even if the gradient doesn't render initially
- The gradient overlay (`bg-gradient-to-br from-[#0D1B2A] via-[#1a2f45] to-[#0D1B2A]`) still renders on top for visual depth

**Background Layering Approach**:
```tsx
className="bg-[#0D1B2A] bg-gradient-to-br from-[#0D1B2A] via-[#1a2f45] to-[#0D1B2A]"
```
- First: Solid dark navy (#0D1B2A) - failsafe background
- Second: Gradient overlay - adds depth and visual interest

**Text Contrast**:
- Heading: White (`text-white`) on dark navy background
- Description: Light gray (`text-gray-300`) on dark navy background
- Ensures clear readability at all times

**Animations & Effects** (unchanged):
- Scroll-triggered entrance animations with staggered delays
- Light sweep effect (15s animation)
- Floating gold particles (12 particles with varied timing)
- Gradient orbs for ambient glow
- All animations respect `prefers-reduced-motion` for accessibility

**Button Styling** (unchanged):
- Primary: Gold button (`bg-[#F4B400]`) with dark text
- Secondary: White outline (`border-white/30`) with backdrop blur
- Both maintain SmartKlix branding consistency

### Hero Section Visual Tuning (November 2025)

**Enhanced Text & Button Sizing for Impact**

The hero section text and buttons were scaled up by ~30% to create a stronger, more balanced visual presence.

**Files Modified**:
- `client/src/components/Hero.tsx` - Hero section component
- `client/src/components/ui/button.tsx` - Added XL button size variant

**Typography Updates**:
- **Headline**: Scaled from `text-5xl md:text-6xl` to `text-6xl md:text-7xl`
  - Mobile: 3.75rem (60px) → Desktop: 4.5rem (72px)
  - Font weight: Bold, maintains tight leading
- **Subheadline**: Scaled from `text-xl` to `text-2xl`
  - Size: 1.25rem (20px) → 1.5rem (24px)
  - Color: Muted foreground for hierarchy

**Button Sizing**:
- Added new **2XL size variant** to Button component for hero sections:
  ```tsx
  "2xl": "min-h-[4.25rem] py-5 px-12 text-xl rounded-md"
  ```
  - **Minimum height**: 68px (min-h-[4.25rem] = 4.25rem) - ensures alignment between primary and outline variants
  - **Vertical padding**: 20px top + 20px bottom (py-5 = 1.25rem each)
  - **Horizontal padding**: 48px left + right (px-12 = 3rem each)
  - **Text size**: 20px (text-xl)
  - Uses **combined approach**: min-height for consistency + padding for actual container expansion
  - Creates physically larger buttons that match the massive headline scale and stay visually aligned

**Spacing Adjustments**:
- Increased vertical spacing from `space-y-6` to `space-y-8` (24px → 32px)
- Increased button gap from `gap-4` to `gap-6` (16px → 24px) for better visual separation
- Provides better breathing room between headline, subheadline, and CTA buttons
- Maintains visual hierarchy and readability

**Developer Box** (unchanged):
- Height remains at 360px
- Terminal-style typing animation intact
- Gold glow gradient effect preserved

**Quick Reference for Future Adjustments**:
```tsx
// Hero text sizes
Headline: text-6xl md:text-7xl (72-96px)
Subheadline: text-2xl (24px)

// Hero button size
size="2xl" (custom 64px variant)

// Hero vertical spacing
space-y-8 (32px)
```

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally
- `npm run check` - Run TypeScript type checking

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible UI components
- **Framer Motion** - Animation library
- **Three.js** - 3D graphics
- **React Router (Wouter)** - Client-side routing
- **React Hook Form** - Form handling
- **Lucide React** - Icon library

## Notes

- This is a purely static site with no backend or database
- All data is embedded in the components
- No server-side processing or API calls
- Perfect for hosting on static site platforms
- All paths are relative and work in any hosting environment

## Support

For issues or questions, please contact the SmartKlix team.

---

Built with ❤️ by SmartKlix
