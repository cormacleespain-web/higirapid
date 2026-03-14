---
title: User Journey — Visitor to Contact
author-agent: design-lead
date: 2026-03-14
status: draft
---

# User Journey: Visitor to Contact

**User**: Homeowner or car owner in El Masnou / Barcelona area looking for cleaning (upholstery, carpet, rug, or car interior).

**Goal**: Understand what HigiRapid offers and request a quote or contact them (form or WhatsApp).

## Stages

| Stage | User action | Touchpoints | Pain points | Opportunities |
|-------|-------------|-------------|-------------|----------------|
| Land | Arrives via search or direct; may be on mobile | Hero, first CTA | Unclear what they do; too much text | Clear headline + one-line value prop; two CTAs (quote + WhatsApp) |
| Explore | Scrolls to see services and process | Services, Process sections | Need to know “how much” or “how long” | Short copy; FAQ later for detail; “Get Quote” as path |
| Trust | Looks for proof and reassurance | Before/After, Testimonials, FAQ | No reviews or photos | Placeholder testimonials and gallery; FAQ answers objections |
| Decide | Chooses to contact | Contact section or floating CTA | Form too long or unclear | Short form; service dropdown; WhatsApp alternative |
| Act | Submits form or taps WhatsApp | Form submit / WhatsApp link | Form error or no confirmation | Clear validation; success message; WhatsApp opens with pre-filled text |

## Flow Summary

1. User lands on `/[locale]/` (ES/CA/EN already selected or switches in header).
2. Reads hero and may tap “Get Quote” (scroll to form) or “WhatsApp” (leave site to chat).
3. Scrolls through Services and Process; optionally Before/After and Testimonials.
4. Reads FAQ if they have doubts.
5. In Contact section: fills form and submits, or taps WhatsApp. On mobile, may use floating WhatsApp without scrolling to Contact.
6. Success: sees confirmation (form) or is in WhatsApp (chat).

## Design Implications

- Hero must communicate “cleaning” and “Barcelona/El Masnou” quickly; CTAs above the fold.
- One-page flow supports “scroll to contact”; anchor links in nav and sticky CTA support this.
- Form must be short and validated; success state and error state must be clear and accessible.
- WhatsApp path must be obvious on mobile (floating button) and in Contact section.
- Language switcher in header so multilingual users can switch before committing to contact.
