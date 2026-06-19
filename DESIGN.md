---
name: Smart Klix
colors:
  primary: "#F4B400"
  foreground: "#0D1B2A"
  background: "#FFFFFF"
  card: "#FAFAFA"
  card-border: "#E4E7EC"
  muted: "#344A6E"
  muted-background: "#F3F4F6"
  border: "#E4E7EC"
  destructive: "#9B1C1C"
  dark-surface: "#0D1B2A"
  dark-card: "#112236"
typography:
  h1:
    fontFamily: Poppins
    fontSize: 3.75rem
    fontWeight: "700"
  h2:
    fontFamily: Poppins
    fontSize: 3rem
    fontWeight: "700"
  h3:
    fontFamily: Poppins
    fontSize: 1.875rem
    fontWeight: "600"
  h4:
    fontFamily: Poppins
    fontSize: 1.25rem
    fontWeight: "600"
  body-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: "400"
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: "400"
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: "400"
  label:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: "600"
  mono:
    fontFamily: Menlo
    fontSize: 0.875rem
    fontWeight: "400"
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  2xl: 24px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  section: 100px
---

## Overview

Smart Klix is a premium AI automation and web design agency. The visual language is bold, cinematic, and conversion-focused — a dark navy foundation contrasted by a single high-energy gold accent. Every component should feel purposeful and premium, never decorative for its own sake.

The UI runs in both light and dark modes. Light mode: white/near-white surfaces with dark navy text and gold CTAs. Dark mode: deep navy backgrounds (`#0D1B2A`) with gold accents and white text. The gold (`#F4B400`) is the sole driver for all primary interactions — buttons, highlights, hover glows, badges.

## Colors

The palette is rooted in two brand anchors: deep navy and agency gold.

- **Primary / Gold (`#F4B400`):** The agency accent. Used exclusively for: primary CTA buttons, active states, hover glows, badge borders, animated highlights, and the constellation sphere nodes. Never use it for body text or large backgrounds.
- **Foreground / Navy (`#0D1B2A`):** Deep ink for all body text in light mode. Also the primary dark-mode background surface. High contrast against white and gold.
- **Background (`#FFFFFF`):** Clean white. Base surface for all light-mode sections.
- **Card (`#FAFAFA`):** Slightly off-white for card and panel surfaces in light mode — visually distinct from the page background without being grey.
- **Card Border (`#E4E7EC`):** Subtle dividing lines between cards, form inputs, and section separators.
- **Muted (`#344A6E`):** Secondary body text, captions, metadata, placeholder text. A desaturated mid-navy — readable but subordinate to the primary foreground.
- **Muted Background (`#F3F4F6`):** Low-emphasis backgrounds for tags, secondary badges, and disabled states.
- **Destructive (`#9B1C1C`):** Error states, form validation, danger banners only.
- **Dark Surface (`#0D1B2A`):** Dark-mode base background. Also used as the sphere body interior.
- **Dark Card (`#112236`):** Dark-mode card surface — one step lighter than the base background.

Gold glow is applied via `box-shadow: 0 0 20px rgba(244, 180, 0, 0.3)` on hover for cards and CTAs. Never apply gold glow to more than one element in a given viewport area — it loses impact.

## Typography

Two typefaces only. Never introduce a third.

- **Poppins** — All headings (h1–h4), CTA button text, navigation labels, section eyebrows. Weights: 600 (semibold) and 700 (bold). Tracking: normal to wide for uppercase badge labels.
- **Inter** — All body copy, descriptions, form labels, input text, captions. Weights: 400 (regular), 500 (medium), 600 (semibold). Never use Inter heavier than 600.
- **Menlo** — Code snippets, technical labels only.

Scale: h1 at `3.75rem` is reserved for hero sections. Section titles use h2 at `3rem` on desktop, scaling to `2.25rem` on mobile. Never use h1 outside a hero context.

Uppercase tracking (`tracking-widest`) is used for section eyebrow labels (small caps above a heading) — these are always Poppins semibold, ~`0.75rem`, gold color, paired with a heading beneath.

## Layout

12-column grid. Max content width: `1200px`. Horizontal padding: `1rem` (mobile), `1.5rem` (tablet), `2rem` (desktop).

Sections use `py-20` (80px) on mobile and `py-[100px]` on desktop as the standard vertical rhythm. Do not use section padding smaller than 80px.

Two-column layouts split 50/50 on desktop, stack vertically on mobile (text above, visual below). The sphere and illustration panels are always `hidden md:block` — never shown on mobile where they'd compete with content.

Breakpoints: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`.

## Elevation & Depth

Elevation is expressed through gold glow and backdrop blur, not traditional drop shadows. The shadow scale in the CSS is intentionally zeroed out — do not add standard box shadows.

- **Level 0 (flat):** Base cards — `bg-card border border-card-border rounded-xl`
- **Level 1 (hover):** Add `box-shadow: 0 0 20px rgba(244, 180, 0, 0.3)` on hover
- **Level 2 (active / focused):** `box-shadow: 0 0 32px rgba(244, 180, 0, 0.5), 0 4px 15px rgba(0,0,0,0.2)`
- **Glassmorphism:** `bg-white/80 backdrop-blur-sm border border-white/20` — used for overlaid cards on dark/image backgrounds

Framer Motion transitions: prefer `duration: 0.6` with `ease: [0.22, 0.61, 0.36, 1]` (custom spring). Entry animations use `opacity: 0 → 1` and `y: 30 → 0`. Never animate scale on large sections — only on cards and icons.

## Shapes

Border radius follows a strict scale. Never use arbitrary radius values.

- Buttons: `rounded-lg` (8px)
- Cards: `rounded-xl` (12px) or `rounded-2xl` (16px) for hero cards
- Badges / pills: `rounded-full` (9999px)
- Inputs: `rounded-lg` (8px)
- Icon containers: `rounded-xl` (12px) for feature icons, `rounded-full` for avatar rings

## Components

**Primary CTA Button:**
```
bg-sidebar-primary text-card-foreground font-heading font-semibold px-8 py-4 rounded-lg
box-shadow: 0 4px 12px rgba(244, 180, 0, 0.3)
hover: box-shadow: 0 6px 20px rgba(244, 180, 0, 0.5), translateY(-2px), brightness(1.05)
```
Always includes a right-arrow icon (`ArrowRight`) that translates +4px on hover via `group-hover:translate-x-1`.

**Section Eyebrow:**
```
text-sidebar-primary font-heading font-semibold text-sm uppercase tracking-widest
```
Placed above h2 section titles. Gold color, small caps, Poppins.

**Feature Card:**
```
bg-card border border-card-border rounded-xl p-6 md:p-8
hover: translateY(-8px), gold glow
```
Icon in a `rounded-xl bg-yellow-50 border border-yellow-200` container, 40x40px.

**ConstellationSphere:**
SVG-based 3D constellation sphere with 72 fibonacci-distributed nodes. Rotates on Y-axis (28s default). Sphere body alternates between deep navy and dark amber every 5s with a 1.8s crossfade. Gold nodes pulse with a halo glow. Responds to cursor movement (mouse X/Y tilts the sphere). Used in: Mission section, Contact section. Never place two spheres on the same page.

**ConsultationCard:**
`rounded-2xl border border-yellow-400/30 bg-white/80 backdrop-blur-sm shadow-xl`
Gold gradient top bar. Staggered-entry checklist items. Stats row at bottom. Used in FreeConsultation section only.

## Do's and Don'ts

**Do:**
- Use gold exclusively for primary actions and interactive highlights
- Pair every CTA with an arrow icon that animates on hover
- Use `font-heading` (Poppins) for all heading and button text
- Apply section eyebrows (small gold caps) above every major section heading
- Keep section padding at minimum `py-20` — spacious layouts feel premium
- Use `hidden md:block` for decorative visuals — never show complex animations on mobile
- Follow the stagger pattern for list items: `delay: 0.1 * index`

**Don't:**
- Don't add a third typeface
- Don't use gold for body text, large backgrounds, or decorative purposes unrelated to interaction
- Don't use box shadows from Tailwind's shadow scale — it's zeroed out intentionally
- Don't place two ConstellationSphere instances on the same page
- Don't invent new spacing values — use the defined scale (xs/sm/md/lg/xl/2xl/3xl/section)
- Don't use `opacity-50` or similar washed-out states for disabled elements — use muted colors instead
- Don't add gradients that weren't in the existing design — the background gradient is `from-white via-gray-50/30 to-amber-50/10`
