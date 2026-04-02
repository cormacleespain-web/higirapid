/** Order and keys under `services` in locale JSON (matches homepage fallback grid). */
export const SERVICE_DISPLAY_KEYS = [
  "upholstery",
  "carpet",
  "ozone",
  "facade",
  "detailing",
  "commercialCarpet",
] as const;

export type ServiceDisplayKey = (typeof SERVICE_DISPLAY_KEYS)[number];

export function serviceKeyToSlug(key: string): string {
  return key === "commercialCarpet" ? "commercial-carpet" : key;
}

/** Static images when DB has no service rows (same assets as seed). */
export const SERVICE_FALLBACK_IMAGE: Record<ServiceDisplayKey, string> = {
  upholstery: "/images/sofa-after-cleaning.png",
  carpet: "/images/carpet-after-cleaning.png",
  ozone: "/images/armchair-after-cleaning.png",
  facade: "/images/office-upholstery-cleaning.png",
  detailing: "/images/car-seats-after-cleaning.png",
  commercialCarpet: "/images/commercial-space-after-cleaning.png",
};

export const SERVICE_FALLBACK_OBJECT_POSITION: Partial<
  Record<ServiceDisplayKey, "bottom" | "center">
> = {
  upholstery: "bottom",
  ozone: "bottom",
};

/** Slug from DB → static placeholder image when admin has not set `image_url`. */
const SLUG_TO_DISPLAY_KEY: Record<string, ServiceDisplayKey> = {
  upholstery: "upholstery",
  carpet: "carpet",
  ozone: "ozone",
  facade: "facade",
  detailing: "detailing",
  "commercial-carpet": "commercialCarpet",
};

/**
 * When slug is unknown, map admin `icon_key` to the closest seed asset so every service gets a photo.
 */
const ICON_KEY_TO_DISPLAY_KEY: Record<string, ServiceDisplayKey> = {
  upholstery: "upholstery",
  carpet: "carpet",
  rug: "carpet",
  car: "detailing",
  detailing: "detailing",
  facade: "facade",
  ozone: "ozone",
  "fresh-air": "ozone",
  "commercial-carpet": "commercialCarpet",
  steam: "carpet",
  home: "upholstery",
  office: "facade",
  hygiene: "upholstery",
  disinfection: "ozone",
  eco: "upholstery",
  premium: "upholstery",
};

const DEFAULT_PLACEHOLDER_KEY: ServiceDisplayKey = "upholstery";

/**
 * Always returns a public image path: slug match, then icon match, then default upholstery asset.
 */
export function getServicePlaceholderImage(slug: string, iconKey: string): string {
  const slugKey = SLUG_TO_DISPLAY_KEY[slug];
  if (slugKey) return SERVICE_FALLBACK_IMAGE[slugKey];
  const icon = iconKey?.trim() ?? "";
  const iconKeyMapped = ICON_KEY_TO_DISPLAY_KEY[icon];
  if (iconKeyMapped) return SERVICE_FALLBACK_IMAGE[iconKeyMapped];
  return SERVICE_FALLBACK_IMAGE[DEFAULT_PLACEHOLDER_KEY];
}

/** Object position for placeholder-only images (slug rules, then icon-derived key, else center). */
export function getServicePlaceholderObjectPosition(slug: string, iconKey: string): "bottom" | "center" | null {
  const slugKey = SLUG_TO_DISPLAY_KEY[slug];
  if (slugKey) return SERVICE_FALLBACK_OBJECT_POSITION[slugKey] ?? null;
  const icon = iconKey?.trim() ?? "";
  const iconKeyMapped = ICON_KEY_TO_DISPLAY_KEY[icon];
  if (iconKeyMapped) return SERVICE_FALLBACK_OBJECT_POSITION[iconKeyMapped] ?? null;
  return null;
}
