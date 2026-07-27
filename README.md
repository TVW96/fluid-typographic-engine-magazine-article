# Common Form

Common Form is a modern, accessible curation and discovery storefront for
independent home objects. It combines editorial storytelling with functional
product search, saved-item controls, bag feedback, newsletter validation, and a
persistent light/dark theme.

## Accessibility and design

- Semantic HTML landmarks and sequential heading levels
- WCAG 2.1 AA color contrast verified from OKLCH tokens
- Keyboard-visible focus states and a skip link
- Screen-reader status announcements for interactive actions
- Reduced-motion support
- Responsive CSS Grid and Flexbox layouts
- Fluid main-title sizing from `1.75rem` at 375px to `3rem` at 1440px

## Local development

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

## Production builds

```bash
# Cloudflare-compatible vinext build
npm run build

# Static GitHub Pages build
npm run build:pages
```

The GitHub Pages build is written to `pages-dist/` and uses the repository
subpath configured in `vite.pages.config.ts`.

## Project structure

- `app/page.tsx` — semantic storefront and client interactions
- `app/globals.css` — OKLCH themes, responsive layout, and fluid typography
- `github-pages/` — static Pages entry point and social metadata
- `public/` — product photography and social preview artwork
