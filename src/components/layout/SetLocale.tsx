"use client";

import { useLocale } from "next-intl";
import { useEffect } from "react";

/**
 * Sets document.documentElement.lang to current locale for a11y and SEO.
 * Root layout cannot know locale; this runs on client when locale is known.
 */
export default function SetLocale() {
  const locale = useLocale();
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
