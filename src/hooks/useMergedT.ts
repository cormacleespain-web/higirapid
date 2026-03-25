"use client";

import { useTranslations } from "next-intl";
import { useContentOverrides } from "@/components/providers/ContentOverridesProvider";

/** Prefer DB `namespace.key` override (full key with dot), else next-intl `namespace` + `key`. */
export function useMergedT(namespace: string) {
  const t = useTranslations(namespace);
  const map = useContentOverrides();

  return (key: string) => {
    const composite = `${namespace}.${key}`;
    const override = map[composite];
    if (override !== undefined && override !== "") return override;
    return t(key as never);
  };
}
