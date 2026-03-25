"use client";

import { ServiceIconGlyph } from "@/components/ui/ServiceIconGlyph";
import { SERVICE_ICON_OPTIONS } from "@/lib/service-icons";

export function ServiceIconChoice({ defaultValue }: { defaultValue: string }) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium text-content-primary">Icon on the services list</legend>
      <p className="text-xs text-content-secondary">
        Pick from a free icon set and change this any time.
      </p>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {SERVICE_ICON_OPTIONS.map((k) => (
          <label
            key={k.key}
            className="flex cursor-pointer items-center gap-3 rounded-md border border-border bg-surface-primary px-3 py-2 has-[:checked]:border-primary has-[:checked]:bg-primary/10"
          >
            <input
              type="radio"
              name="icon_key"
              value={k.key}
              defaultChecked={defaultValue === k.key}
              required
              className="h-4 w-4 border-border text-primary"
            />
            <ServiceIconGlyph iconKey={k.key} className="h-6 w-6 text-primary" />
            <span className="text-sm text-content-primary">{k.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
