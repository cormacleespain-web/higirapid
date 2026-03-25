"use client";

import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SERVICE_ICON_OPTIONS } from "@/lib/service-icons";

type LucideNamespace = Record<string, LucideIcon>;

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
  const Icon = (Icons as unknown as LucideNamespace)[iconName] ?? Icons.Circle;
  return <Icon className={className} aria-hidden />;
}
