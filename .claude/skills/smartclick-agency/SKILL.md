---
name: smartklix-agency
description: Smart Klix Agency specific patterns, conventions, and rules
version: 1.0.0
platforms: [windows, linux]
metadata:
  hermes:
    tags: [agency, conventions, smartklix]
    category: agency
    requires_toolsets: [terminal, code]
---
# Smart Klix Agency — Custom Skill

## Agency Identity
- Full stack developer agency
- Services: websites, apps, Chrome extensions, automations
- Deploy pipeline: local build → GitHub → Vercel → live URL
- Agency name: Smart Klix (never "Smart Click")

## Build Conventions
- Always write SPEC.md before touching code
- Always run GitNexus before starting a project
- Always install framer-motion in web projects
- Always check 21st.dev before building UI components from scratch
- Every build outputs: /src, README.md, deploy-instructions.md, .env.example

## Models
- Claude Sonnet 4.6 → complex builds, architecture, QA
- DeepSeek V3 → simple tasks, scripts, bulk generation

## Client Project Structure
Each client gets:
/clients/[client-name]/
├── /src
├── README.md
├── deploy-instructions.md
├── .env.example
└── SPEC.md

## Pitfalls to Avoid
- Never hardcode API keys in files
- Never skip SPEC.md approval before building
- Never silently change approach — always explain why
- Never push credentials folder to GitHub
- Never use banned phrases from anti-style.md

## Verification Checklist
Before marking any build complete:
- [ ] Code runs without errors
- [ ] Pushed to GitHub successfully
- [ ] Deployed to Vercel successfully
- [ ] Live URL confirmed working
- [ ] README.md included
- [ ] .env.example included
