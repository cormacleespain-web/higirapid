"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { BeforeAfterSlider } from "./before-after-slider";
import { motion } from "framer-motion";

interface GalleryEntry {
  id: string;
  category: string;
  before: string;
  after: string;
  label: string;
}

const galleryData: GalleryEntry[] = [
  { id: "sofa-1", category: "sofas", before: "https://picsum.photos/seed/sofa1b/600/400", after: "https://picsum.photos/seed/sofa1a/600/400", label: "Sofa cleaning" },
  { id: "sofa-2", category: "sofas", before: "https://picsum.photos/seed/sofa2b/600/400", after: "https://picsum.photos/seed/sofa2a/600/400", label: "Sofa deep clean" },
  { id: "mattress-1", category: "mattresses", before: "https://picsum.photos/seed/matt1b/600/400", after: "https://picsum.photos/seed/matt1a/600/400", label: "Mattress cleaning" },
  { id: "mattress-2", category: "mattresses", before: "https://picsum.photos/seed/matt2b/600/400", after: "https://picsum.photos/seed/matt2a/600/400", label: "Mattress hygienization" },
  { id: "chair-1", category: "chairs", before: "https://picsum.photos/seed/chair1b/600/400", after: "https://picsum.photos/seed/chair1a/600/400", label: "Chair cleaning" },
  { id: "carpet-1", category: "carpets", before: "https://picsum.photos/seed/carp1b/600/400", after: "https://picsum.photos/seed/carp1a/600/400", label: "Carpet cleaning" },
  { id: "car-int-1", category: "carInterior", before: "https://picsum.photos/seed/carint1b/600/400", after: "https://picsum.photos/seed/carint1a/600/400", label: "Car interior" },
  { id: "car-int-2", category: "carInterior", before: "https://picsum.photos/seed/carint2b/600/400", after: "https://picsum.photos/seed/carint2a/600/400", label: "Car seats" },
  { id: "car-ext-1", category: "carExterior", before: "https://picsum.photos/seed/carext1b/600/400", after: "https://picsum.photos/seed/carext1a/600/400", label: "Car exterior" },
];

const categoryKeys = ["all", "sofas", "mattresses", "chairs", "carpets", "carInterior", "carExterior"] as const;

export function GalleryGrid() {
  const t = useTranslations("galleryPage");
  const [selectedEntry, setSelectedEntry] = useState<GalleryEntry | null>(null);

  const getFilteredItems = (category: string) => {
    if (category === "all") return galleryData;
    return galleryData.filter((item) => item.category === category);
  };

  return (
    <>
      <Tabs defaultValue="all">
        <TabsList className="flex w-full overflow-x-auto">
          {categoryKeys.map((key) => (
            <TabsTrigger
              key={key}
              value={key}
              className="min-h-[44px] flex-1 whitespace-nowrap text-xs sm:text-sm"
            >
              {t(`categories.${key}`)}
            </TabsTrigger>
          ))}
        </TabsList>

        {categoryKeys.map((key) => (
          <TabsContent key={key} value={key} className="mt-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {getFilteredItems(key).map((entry, i) => (
                <motion.button
                  key={entry.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  onClick={() => setSelectedEntry(entry)}
                  className="group relative aspect-[4/3] overflow-hidden rounded-xl"
                >
                  <img
                    src={entry.after}
                    alt={entry.label}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="text-sm font-medium text-white">
                      {entry.label}
                    </span>
                    <span className="rounded-full bg-brand-green px-2 py-0.5 text-xs font-semibold text-white">
                      Before / After
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Lightbox */}
      <Dialog
        open={!!selectedEntry}
        onOpenChange={() => setSelectedEntry(null)}
      >
        <DialogContent className="max-w-3xl p-2 sm:p-4">
          <DialogTitle className="sr-only">
            {selectedEntry?.label} - Before and After
          </DialogTitle>
          {selectedEntry && (
            <BeforeAfterSlider
              beforeSrc={selectedEntry.before}
              afterSrc={selectedEntry.after}
              alt={selectedEntry.label}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
