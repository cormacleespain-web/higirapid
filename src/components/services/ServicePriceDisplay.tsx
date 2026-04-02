"use client";

import { useTranslations } from "next-intl";

export function isServiceOnSale(
  priceFrom: number | null | undefined,
  priceWas: number | null | undefined
): boolean {
  return priceWas != null && priceFrom != null && priceWas > priceFrom;
}

type ImageBadgeProps = {
  priceFrom: number | null;
  priceWas: number | null;
};

const carouselBadgeClass =
  "bottom-3 right-3 z-10 text-xs px-2.5 py-1 rounded-md bg-black/65 font-semibold text-white shadow-sm backdrop-blur-[2px]";

/** Dark overlay badge on service carousel images only (full `/services` page uses inline pricing). */
export function ServicePriceImageBadge({ priceFrom, priceWas }: ImageBadgeProps) {
  const t = useTranslations("services");
  const sale = isServiceOnSale(priceFrom, priceWas);

  if (sale) {
    return (
      <div
        className={`absolute ${carouselBadgeClass} flex flex-col items-end gap-0.5`}
      >
        <span className="text-[0.65rem] font-semibold uppercase tracking-wide text-red-400">{t("sale")}</span>
        <div className="flex flex-col items-end gap-0 leading-tight">
          <span className="text-[0.7rem] font-normal line-through opacity-85 text-white/85">
            {t("wasPrice", { price: priceWas! })}
          </span>
          <span>{t("fromPrice", { price: priceFrom! })}</span>
        </div>
      </div>
    );
  }

  if (priceFrom != null) {
    return (
      <div className={`absolute ${carouselBadgeClass}`}>
        {t("fromPrice", { price: priceFrom })}
      </div>
    );
  }

  return null;
}

type InlineProps = {
  priceFrom: number | null;
  priceWas: number | null;
};

/** Price row under the service title on the Our Services page. */
export function ServicePriceInline({ priceFrom, priceWas }: InlineProps) {
  const t = useTranslations("services");
  const sale = isServiceOnSale(priceFrom, priceWas);

  if (sale) {
    return (
      <div className="mt-2 space-y-0.5">
        <p className="text-xs font-semibold uppercase tracking-wide text-red-600">{t("sale")}</p>
        <p className="text-lg text-content-primary">
          <span className="mr-2 text-content-secondary line-through decoration-content-secondary/80">
            {t("wasPrice", { price: priceWas! })}
          </span>
          <span className="font-semibold text-primary">{t("fromPrice", { price: priceFrom! })}</span>
        </p>
      </div>
    );
  }

  if (priceFrom != null) {
    return <p className="mt-2 text-lg font-semibold text-primary">{t("fromPrice", { price: priceFrom })}</p>;
  }

  return null;
}
