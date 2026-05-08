---
name: figma
description: Convert Figma designs to production-ready code. Triggers when user shares a Figma URL, uploads a Figma export, shares screenshots of a Figma design, or says "convert this design", "build from Figma", "code this up", "/figma". Produces clean React/HTML+CSS components that match the design pixel-for-pixel.
---

# Figma → Production Code Skill

## What This Does
Converts any Figma design into production-ready, deployable code.
Input: Figma URL, exported assets, or screenshots.
Output: Clean code that matches the design exactly.

## Process

### Step 1 — Extract Design Tokens
From the Figma input, identify:
- Colors (exact hex values)
- Typography (font family, sizes, weights, line heights)
- Spacing (padding, margins, gaps)
- Border radius values
- Shadow values
- Breakpoints if visible

### Step 2 — Map Components
Identify every distinct component in the design:
- Layout sections (hero, nav, footer, cards, etc.)
- Reusable elements (buttons, inputs, badges, etc.)
- State variations (hover, active, disabled)

### Step 3 — Check 21st.dev First
Before building any component from scratch:
→ Check 21st.dev for a matching component
→ Pull it, customize to match the Figma design exactly
→ Only build from scratch if nothing matches

### Step 4 — Build
- Use the extracted design tokens — no hardcoded random values
- Match spacing, typography, and colors exactly
- Add Framer Motion animations where the design implies movement
- Make it fully responsive unless design specifies desktop-only
- Use semantic HTML
- TypeScript if the project uses it

### Step 5 — Output
```
/component-name/
├── index.tsx (or .jsx / .html)
├── styles.css (if not using Tailwind)
└── README.md (what it is, how to use it)
```

## Rules
- Never approximate colors — extract exact values
- Never change layout proportions from the design
- Never add features not in the design without flagging it
- Always match font sizes exactly
- Framer Motion for any animations or transitions
- Mobile-first responsive unless told otherwise

## Stack Options
Ask once if unclear, then proceed:
- React + Tailwind (default for new projects)
- React + CSS Modules
- Vanilla HTML + CSS
- Vue (if project uses Vue)

## What To Do With Figma URLs
If operator shares a Figma link:
1. Ask them to export assets or share screenshots — direct Figma API access requires a token
2. Or ask them to paste their Figma API token if they want direct access
3. Work from whatever they provide — URL context, screenshots, or exports
