"use client";

import {
  BadgeCheck,
  Building2,
  Car,
  Circle,
  Droplets,
  Grid2x2,
  Home,
  Leaf,
  RectangleHorizontal,
  ShieldCheck,
  Sofa,
  Sparkles,
  Wind,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SERVICE_ICON_OPTIONS } from "@/lib/service-icons";

/** Explicit map so we never `import *` from lucide-react (breaks Next/webpack vendor chunks on `/services`). */
const ICON_BY_NAME: Record<string, LucideIcon> = {
  Sofa,
  Grid2x2,
  RectangleHorizontal,
  Car,
  Sparkles,
  Home,
  Building2,
  ShieldCheck,
  Droplets,
  Wind,
  Leaf,
  BadgeCheck,
};

function getIconName(iconKey: string): string {
  return SERVICE_ICON_OPTIONS.find((x) => x.key === iconKey)?.iconName ?? "Sofa";
}

export function ServiceIconGlyph({
  iconKey,
  className,
}: {
  iconKey: string;
  className?: string;
}) {
  const iconName = getIconName(iconKey);
  const Icon = ICON_BY_NAME[iconName] ?? Circle;
  return <Icon className={className} aria-hidden />;
}
