/**
 * Font loading — single source of truth for the HigiRapid site.
 *
 * - Google Fonts: loaded only via next/font/google (no <link> or external stylesheet).
 *   This self-hosts at build time and avoids layout shift; use this for any new Google font.
 * - Local fonts: next/font/local for files in public/fonts.
 *
 * Usage: Import the font objects here and apply their .variable in the root layout
 * (e.g. src/app/[locale]/layout.tsx). Tailwind references the CSS variables in
 * tailwind.config.ts (fontFamily). See docs/fonts.md for how to add a new font.
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
