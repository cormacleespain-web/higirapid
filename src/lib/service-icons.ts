export const SERVICE_ICON_OPTIONS = [
  { key: "upholstery", label: "Upholstery", iconName: "Sofa" },
  { key: "carpet", label: "Carpet", iconName: "Grid2x2" },
  { key: "rug", label: "Rug", iconName: "RectangleHorizontal" },
  { key: "car", label: "Car interior", iconName: "Car" },
  { key: "hygiene", label: "Hygiene", iconName: "Sparkles" },
  { key: "home", label: "Home cleaning", iconName: "Home" },
  { key: "office", label: "Office cleaning", iconName: "Building2" },
  { key: "disinfection", label: "Disinfection", iconName: "ShieldCheck" },
  { key: "steam", label: "Steam clean", iconName: "Droplets" },
  { key: "fresh-air", label: "Air refresh", iconName: "Wind" },
  { key: "eco", label: "Eco service", iconName: "Leaf" },
  { key: "premium", label: "Premium care", iconName: "BadgeCheck" },
  { key: "facade", label: "Facade cleaning", iconName: "Building2" },
  { key: "ozone", label: "Ozone therapy", iconName: "Wind" },
  { key: "detailing", label: "Car detailing", iconName: "Car" },
  { key: "commercial-carpet", label: "Commercial carpet", iconName: "Grid2x2" },
] as const;

export type ServiceIconKey = (typeof SERVICE_ICON_OPTIONS)[number]["key"];

export const SERVICE_ICON_KEYS = SERVICE_ICON_OPTIONS.map((x) => x.key) as readonly ServiceIconKey[];
