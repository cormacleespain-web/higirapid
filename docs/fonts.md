---
title: Fonts — HigiRapid
author-agent: team-orchestrator
date: 2026-03-14
status: approved
---

# Fonts on the HigiRapid site

## How fonts are loaded

- **Google Fonts**: Loaded **only** via `next/font/google` in `src/lib/fonts.ts`. Next.js fetches and self-hosts the font files at build time, so there is no runtime request to Google and no duplicate loading (no `<link>` or external stylesheet to Google Fonts).
- **Local fonts**: Loaded via `next/font/local` in `src/lib/fonts.ts`, pointing at files under `public/fonts/`.

All font loading is centralized in `src/lib/fonts.ts`; the root layout applies the CSS variables, and Tailwind consumes them. There is a single place of truth: no other file should load Google Fonts.

## Font families in use

| Role            | Font            | Source        | CSS variable           | Tailwind class          |
|-----------------|-----------------|---------------|------------------------|-------------------------|
| Body / UI       | DM Sans         | Google (next/font) | `--font-garet`         | `font-sans`             |
| Hero & section titles (h1/h2) | Nunito Sans Black Italic | Google (next/font) | `--font-nunito-heading` | `font-heading`          |
| Other headings  | Garet Extrabold | Local (OTF)   | `--font-garet-extrabold` | `font-garet-extrabold` |

Note: The body font uses the variable name `--font-garet` for historical reasons; it is DM Sans, not Garet. Hero and section titles use **Nunito Sans Black (900) Italic**, loaded via `next/font/google` in `src/lib/fonts.ts` and applied with the `font-heading` Tailwind class.

## How to add a new Google font

1. **`src/lib/fonts.ts`**
   - Import the font from `next/font/google` (e.g. `import { Some_Font } from "next/font/google"`).
   - Call it with `subsets: ["latin"]`, the weights you need, a unique `variable: "--font-yourname"`, and `display: "swap"`.
   - Export the result (e.g. `export const fontYourName = ...`).

2. **Layout**
   - In `src/app/[locale]/layout.tsx`, add the new font’s `.variable` to the wrapper element’s `className` (e.g. `${fontYourName.variable}`) so the CSS variable is set on the tree.

3. **Tailwind**
   - In `tailwind.config.ts`, under `theme.extend.fontFamily`, add an entry that uses the variable, e.g. `"your-name": ["var(--font-yourname)", "system-ui", "sans-serif"]`.

4. **Usage**
   - Use the new Tailwind class (e.g. `font-your-name`) where needed. Do not add a `<link>` or `@import` to Google Fonts; that would duplicate loading and break the single source of truth.
   - In **`"use client"`** components, **never** import `src/lib/fonts.ts` (it uses `next/font`, which must run only from Server Components / layouts). Use Tailwind classes such as `font-heading` so headings pick up the variables already set on the root layout.

## Summary

- One place for font loading: `src/lib/fonts.ts`.
- Google Fonts only via `next/font/google`; no external Google Fonts link/stylesheet.
- New fonts: add in `fonts.ts` → expose variable in layout → add to Tailwind `fontFamily` → use Tailwind class.
