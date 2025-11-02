# Smart Klix Agency Website - Design Guidelines v2.0

## Design Approach: Professional Agency System
**Selected Approach**: Reference-based design inspired by modern agency leaders (Webflow, Linear, Vercel) with custom brand identity. This is a marketing/agency website requiring visual impact, trust-building elements, and conversion optimization.

---

## Core Design Elements

### A. Color Palette
**Primary Brand Colors:**
- Deep Navy: `210 85% 11%` (HSL) - Primary brand, headings, navigation
- Gold Accent: `45 94% 47%` (HSL) - CTAs, highlights, hover states
- White: `0 0% 100%` - Clean backgrounds, cards

**Supporting Colors:**
- Cool Gray: `0 0% 31%` - Body text, secondary content
- Light Gray: `210 17% 98%` - Section backgrounds, subtle contrast
- Success Green: `158 64% 52%` - Special CTAs, success states
- Border Gray: `220 13% 91%` - Dividers, card borders

**Dark Mode** (if implemented): Invert navy to backgrounds, use gold sparingly for accents.

### B. Typography
**Font Families:**
- Headings: Poppins (600-700 weight) - Bold, professional, geometric
- Body: Inter (400-500 weight) - Clean, readable, modern

**Type Scale:**
- Hero Title: 48-60px (3xl-5xl)
- Section Titles: 30-36px (2xl-3xl)  
- Card Titles: 20-24px (xl-2xl)
- Body Text: 16-18px (base-lg)
- Small Text: 14px (sm)

**Key Principle**: Generous line-height (1.6-1.8) for readability, tight tracking (-0.02em) on large headings for impact.

### C. Layout System
**Spacing Primitives**: Use Tailwind units of **4, 8, 12, 16, 20, 24, 32** for consistent rhythm
- Component padding: `p-8` to `p-12`
- Section padding: `py-20` to `py-32` (desktop), `py-12` to `py-16` (mobile)
- Card gaps: `gap-6` to `gap-8`
- Container max-width: `max-w-7xl` (1200px)

**Grid Patterns:**
- 3-column service cards (mobile: 1-col, tablet: 2-col, desktop: 3-col)
- 2-column content splits for text + image sections
- Full-width hero with centered content max-width

### D. Component Library

**Navigation:**
- Fixed header with backdrop blur on scroll
- Logo height: 40px, left-aligned
- Desktop: Horizontal menu, right-aligned CTAs
- Mobile: Hamburger menu with slide-in overlay
- Active state: Gold underline (2px, bottom offset)

**Hero Section:**
- Height: 80vh minimum (not forced 100vh)
- Two-column grid: Content left, Visual right
- Large hero image or abstract gradient graphic (400x400px rounded)
- Dual CTAs: Primary (Gold) + Ghost (Navy outline)
- Animated gradient background (subtle)

**Service Cards:**
- Background: Light gray with 1px border
- Hover: Lift transform (-10px), shadow increase, gold border
- Icon: 48-64px, gold color, centered
- Padding: 32px all sides
- Border-radius: 16px (large)

**Team Cards:**
- Circular avatars: 120px diameter
- Placeholder initials: Gold text on navy gradient background
- Card background: Light gray
- Hover: Subtle lift (-5px)

**Forms:**
- Input height: 48px
- Border: 1px cool gray, focus: 2px gold
- Label: Bold, 14px, above input
- Button: Full-width on mobile, auto on desktop
- Validation: Inline errors in red, success in green

**FAQ Accordion:**
- White cards on gray background
- Question: 18px bold, navy
- Icon: Gold plus/minus, rotates on expand
- Border: 1px gray
- Smooth height transition (300ms)

### E. Animations
**Minimal & Purposeful:**
- Hover lifts: `translateY(-5px)` to `translateY(-10px)` with 0.3s ease
- Fade-in on scroll: Opacity 0→1 with slight Y translation
- Hero graphic: Subtle float animation (6s infinite)
- Button hover: Transform + shadow, no color flash
- Page transitions: None (static site)

**Performance**: CSS-only animations, no JavaScript libraries. Use `will-change` sparingly.

---

## Page-Specific Guidelines

### Homepage
**Structure (7 sections):**
1. **Hero**: Large headline "Fix. Launch. Grow. Automate." + subtext + dual CTAs + animated graphic
2. **Services Preview**: 3-card grid with icons (Web Design, Fixes, Automation)
3. **USP Grid**: 3 value props (Affordable, Scalable, Bilingual) with icons
4. **Team Preview**: 3 key members with photos/placeholders
5. **How It Works**: 4-step process timeline (optional visual enhancement)
6. **FAQ**: 5 questions accordion
7. **Final CTA**: Full-width conversion section with primary button

**Visual Enhancements:**
- Add subtle diagonal lines or dot patterns in backgrounds
- Gradient overlays on hero (navy to transparent)
- Floating elements animation on hero graphic

### Services Page
**Structure (6 sections):**
1. **Page Header**: Centered title + description
2. **Service Blocks**: 5 alternating 2-column layouts (image left/right flip)
3. **Process Timeline**: 4 numbered steps with connecting lines
4. **Testimonial Band** (add if space): Single rotating quote
5. **CTA Section**: "Ready to Transform" conversion

**Layout Pattern**: Zigzag (image-text-image-text) for visual interest, not monotonous stacking.

### About Page
**Structure (5 sections):**
1. **Page Header**: "Who We Are" with mission statement
2. **Company Story**: Full-width text block, 2-column on desktop
3. **Team Grid**: 6 members, 3-column (2-col tablet, 1-col mobile)
4. **Values Cards**: 3 core values with icons
5. **CTA Section**: Join/contact invitation

**Visual Touch**: Team photos with subtle hover zoom, gradient overlays on value cards.

### Contact Page
**Structure (3 sections):**
1. **Page Header**: Compelling headline + trust indicators
2. **Form + Info Split**: 60/40 grid (form left, contact details right)
3. **FAQ**: 4 contact-related questions

**Form Enhancement**: Real-time validation, character counter on textarea, success animation on submit.

---

## Images & Media Strategy

### Hero Images
**Homepage Hero**: Use abstract geometric graphic (coded SVG or CSS gradient shapes) - 400x400px, rounded, animated float. Alternative: High-quality image of modern workspace or digital interfaces.

### Service Page Images
- Web Design: Laptop mockup showing beautiful website
- Automation: Dashboard with workflow visualization  
- Profile Setup: Multi-platform logos/screenshots
- Use illustrations or high-quality stock photos (unsplash.com)
- Image dimensions: 600x400px, optimized WebP format

### Team Photos
- Professional headshots: 2 real photos (Jovan, Christian) provided
- 4 placeholders: Circular initials on gradient background
- Consistent 1:1 aspect ratio, 300x300px minimum

### Background Patterns
- Subtle dot grid overlays (10% opacity)
- Diagonal lines for section dividers
- Gradient meshes on CTA sections (navy to gold, low opacity)

---

## Critical Quality Standards

**Viewport Management:**
- Hero: 80vh for impact, not forced 100vh
- Content sections: Natural height based on content
- Responsive vertical rhythm: py-12 (mobile) to py-24 (desktop)

**Multi-Column Strategy:**
- Service cards: 3-column desktop, 2-column tablet, 1-column mobile
- Team grid: 3-2-1 responsive pattern
- Contact split: 2-column desktop, stack on mobile

**Component Richness:**
- Headers: Logo + nav + trust badge ("Trusted by 50+ businesses")
- Footers: Logo + quick links + social icons + newsletter signup + copyright
- CTA sections: Primary button + supporting text + secondary link
- Service cards: Icon + title + description + feature bullets + CTA link

**White-Label Readiness:**
- All colors defined in CSS `:root` variables
- Logo swappable via single image file
- Typography changeable through 2 Google Font links
- Component classes follow BEM for easy customization

**Performance Targets:**
- Lighthouse: 95+ Performance, 100 Accessibility, 100 SEO
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Total page weight: <500KB (excluding images)

---

## Final Notes
This is a **professional agency website** that must inspire confidence and convert visitors. Every section should feel intentional, polished, and worthy of showcasing to potential clients. Balance minimalism with richness—don't leave sections sparse, but don't overcrowd. The design should say: "We build world-class digital products, and our own site proves it."