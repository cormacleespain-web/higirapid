---
title: Premium improvements and imagery — consolidated checklist
author-agent: team-orchestrator
date: 2026-03-14
---

# Consolidated checklist: Phase B implementation

From Design Lead and Frontend Artist handoffs.

## Language switcher (B1)

- [x] Default locale English; dropdown trigger + list; a11y (listbox, Escape, outside click).

## Logo (B2)

- [x] Text-only logo asset in header (logo-text.svg from TextLogo_BlueGreen).

## Imagery (B3)

- [x] Hero: right-side image block on desktop; next/image, priority, picsum placeholder.
- [x] Services: brand-colour circle per card.
- [x] Gallery: placeholder images (picsum) in slider with Before/After labels.
- [ ] Testimonials: optional avatar placeholder (deferred).

## Premium feel (B4)

- [x] Section padding increase (py-20 md:py-24).
- [x] Button hover: scale 1.02, 150ms; reduced-motion: no scale (media query).
- [x] Floating CTA: pulse disabled when prefers-reduced-motion (existing).

## WhatsApp-only contact (B5)

- [x] Contact section: two CTAs only (Get a Quote, Contact Us + icon); no form.
- [x] Hero + Header: both CTAs to WhatsApp; Contact Us with icon.
- [x] Form removed; API route left in place unused.
