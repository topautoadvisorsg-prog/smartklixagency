# Smart Klix — Project Setup

---

## Stack

- **Framework:** React 18 + Vite + TypeScript
- **Styling:** Tailwind CSS + Radix UI
- **Animations:** Framer Motion
- **Router:** Wouter
- **i18n:** Custom LanguageContext + locales

---

## Tools Installed

### Spec Kit (`specify` CLI)
**What it is:** GitHub's spec-driven development toolkit. Forces a structured spec before any code gets written.

**Install:**
```bash
# uv must be installed first
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@v0.8.11
```

**Initialized:** Yes — `.github/` folder created at project root.

**Usage in Claude Code:**
```
/speckit.specify    → Write functional spec
/speckit.clarify    → Resolve ambiguity before planning
/speckit.plan       → Technical architecture + stack
/speckit.tasks      → Break into executable tasks
/speckit.implement  → Build it
```

**Rule:** Every new feature or client build starts with `/speckit.specify`. No code before the spec is approved.

---

### DESIGN.md (`@google/design.md` CLI)
**What it is:** Google Labs' open-source format for describing a design system to AI agents. YAML frontmatter tokens + human-readable Markdown rationale. Lives at `DESIGN.md` in the project root.

**CLI:**
```bash
npx @google/design.md lint DESIGN.md        # Validate
npx @google/design.md export --format tailwind DESIGN.md  # Export to Tailwind theme
npx @google/design.md spec --rules          # View the full format spec
```

**File:** `DESIGN.md` at project root — validated clean (exit 0).

**What's defined:**
- Brand colors: Gold `#F4B400`, Navy `#0D1B2A`, full light + dark surface scale
- Typography: Poppins (headings) + Inter (body) — weights, sizes, scale
- Spacing: xs/sm/md/lg/xl/2xl/3xl/section scale
- Border radius: sm/md/lg/xl/2xl/full scale
- Components: CTA button, section eyebrow, feature card, ConstellationSphere, ConsultationCard
- Do's and Don'ts for the design system

**Rule for Claudio:** Always read `DESIGN.md` before building any UI, component, or frontend code. Color tokens, typography, spacing — all defined there. Don't invent styles. If it's not in DESIGN.md, ask before adding it.

---

## Acontext (Pending — Dashboard Down)
**What it is:** Open-source skill memory layer. Captures agent learnings as Markdown skill files.
**Repo:** `memodb-io/Acontext`
**Status:** Plugin files downloaded to `C:\Users\jovan\.claude\plugins\acontext\`. Dashboard at `dash.acontext.io` was down (went viral). Resume when stable.

**To complete setup:**
1. Create account at `dash.acontext.io`
2. Grab API key
3. Paste the two JSON configs (see conversation history)

---

## Git
- Remote: `https://github.com/topautoadvisorsg-prog/smartklixagency`
- Config: `user.name = Smart Klix`, `user.email = smartklix@agency.com`

---

## Deployment
- Platform: Vercel (auto-deploy on push to main)
- Token stored in: `C:\SmartClick\credentials\.env`
