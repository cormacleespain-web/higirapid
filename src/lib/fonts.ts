/**
 * Font loading — single source of truth for the HigiRapid site.
 *
 * - Google Fonts: loaded only via next/font/google (no <link> or external stylesheet).
 *   This self-hosts at build time and avoids layout shift; use this for any new Google font.
 * - Local fonts: next/font/local for files in public/fonts.
 *
 * **Import only from Server Components** (root layouts). `next/font` must not be imported
 * from `"use client"` modules — it breaks webpack/RSC chunking (`vendor-chunks/next.js`).
 * In client components use Tailwind `font-sans` / `font-heading` (variables are on `<html>`).
 *
 * Usage: Apply `.variable` classes in `src/app/[locale]/layout.tsx` (and admin layout).
 * See tailwind.config.ts `fontFamily` and docs/fonts.md.
 */
import { DM_Sans, Nunito_Sans } from "next/font/google";
import localFont from "next/font/local";

/** Body / UI font (Google Font). Exposed as --font-garet for Tailwind font-sans. */
export const fontSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-garet",
  display: "swap",
});

/** Hero and section titles (Google Font). Nunito Sans Black 900 Italic. */
export const fontNunitoHeading = Nunito_Sans({
  subsets: ["latin"],
  weight: ["900"],
  style: ["italic"],
  variable: "--font-nunito-heading",
  display: "swap",
});

/** Garet Extrabold for hero and section headings (local font). */
export const fontGaretExtrabold = localFont({
  src: "../../public/fonts/garet-extrabold.otf",
  variable: "--font-garet-extrabold",
  display: "swap",
});
