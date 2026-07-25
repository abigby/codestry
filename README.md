# Codestry

Marketing site for **Codestry** — we develop and power software applications and tools, AI service
tools, and technical assistance.

Built with Angular 22 (standalone components, signals, zoneless change detection). Dark navy
neon-accent design based on the approved Codestry brand palette:

| Token | Value |
|---|---|
| Codestry Navy | `#0B1D3A` |
| Codestry Blue | `#1E5BFF` |
| Codestry Cyan | `#00D4FF` |

## Development

```bash
npm start          # dev server on http://localhost:4200 (or pass --port)
npm run build      # production build → dist/codestry
npm test           # unit tests (Vitest via ng test)
```

## Structure

```
src/app/
  layout/header    sticky nav with mobile menu
  layout/footer    footer with anchor nav
  pages/home       all landing sections (hero, industries, services, AI, process, stack, about, contact)
  components/contact-form   reactive contact form with validation + honeypot
  core/contact.service.ts   submission relay
public/brand/      approved Codestry logo assets
```

## Contact form

Submissions are relayed to the Codestry inbox through [FormSubmit](https://formsubmit.co) — the
email address is **never rendered on the page**.

One-time setup after deploying:

1. Submit the form once from the live site.
2. FormSubmit sends an activation email to the inbox — click the confirmation link.
3. FormSubmit then issues a **random alias endpoint**. Replace the address in
   `src/app/core/contact.service.ts` with that alias so the raw address is not present in the
   shipped JS bundle either.

The form includes a hidden honeypot field (`website`) that silently drops bot submissions.

## Brand assets

The full approved logo package (SVG, PNG, WebP, EPS, PDF, favicons) lives in the design archive;
the subset used by the site is in `public/brand/`. Use the reversed-white logo only on dark
backgrounds, per the brand guidelines.
