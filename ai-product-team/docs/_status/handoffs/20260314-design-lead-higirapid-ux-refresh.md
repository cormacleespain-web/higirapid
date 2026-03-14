---
title: Handoff — Design Lead (HigiRapid UX refresh)
author-agent: design-lead
date: 2026-03-14
---

# Design Lead: Language switcher, imagery, premium priorities

## Context

HigiRapid UX refresh: default English, dropdown language switcher, text-only logo, image placeholders, WhatsApp-only contact, premium feel. Design Lead recommends patterns and placement.

## 1. Language switcher: dropdown

- **Recommendation**: Use a **dropdown** (button + list) instead of inline links. Reduces header clutter and scales if more locales are added.
- **Placement**: Header right, before or after primary CTA. Trigger shows current language (e.g. "English"); click opens list (English, Español,Català). Select navigates to `/${locale}/` and closes dropdown.
- **A11y**: Trigger has `aria-haspopup="listbox"`, `aria-expanded`, `aria-controls`; list has `role="listbox"` and options `role="option"`. Keyboard: Enter/Space opens; arrow keys move; Enter selects; Escape closes. Focus trap inside list while open; focus returns to trigger on close. Outside click closes.

## 2. Image placeholder placement (full-page, on-brand)

- **Hero**: Add a **right-side image block** (or background image) on desktop; full-width optional on mobile. Use a single strong placeholder (cleaning/sofa or abstract brand-colour gradient) to add weight. Preserve LCP: use `next/image` with priority and explicit dimensions.
- **Services**: Optional **small icon or image per card** (e.g. sofa, carpet, car, home). If no assets, use brand-colour circles or simple SVG icons so cards feel distinct.
- **Gallery**: Replace empty Before/After boxes with **real placeholder images** (e.g. two columns or slider with placeholder URLs or static files). Same aspect ratio per slot to avoid CLS. Keep prev/next and keyboard access.
- **Testimonials**: Optional **avatar placeholder** (initials or generic silhouette) per card to add warmth; not required for MVP.

## 3. Premium feel — high-impact changes

- **Spacing**: Slightly increase section padding (e.g. py-20 → py-24 on desktop) and max-width consistency (e.g. 6xl for content, 4xl for text blocks) for breathing room.
- **Typography**: Ensure hero headline uses largest scale (e.g. 4xl/5xl); section titles consistent (2xl/3xl); line-height relaxed for lead paragraphs.
- **Hierarchy**: One clear focal point per section (title or one CTA). Contact section: two CTAs with clear primary ("Get a Quote") and secondary ("Contact Us" with icon).
- **Section order**: Keep current order; FAQ before Contact is correct. No reorder needed.

## Open questions

- None for implementation; Frontend can proceed with dropdown, imagery placement, and spacing/typography tweaks above.
