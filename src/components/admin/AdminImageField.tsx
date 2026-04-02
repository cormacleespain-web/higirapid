"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const BUILT_IN_HERO = "/images/hero.png";

const hints = {
  hero: "Wide image works best (about 16:9). Max 5 MB. JPG, PNG, or WebP.",
  gallery: "Landscape or square works well for the gallery. Max 5 MB.",
  services: "4:3 or 16:9 works well for service cards (image on top, text below). Max 5 MB.",
} as const;

type Variant = keyof typeof hints;

export function AdminImageField({
  name,
  value,
  onChange,
  variant,
  builtInFallbackSrc,
}: {
  name?: string;
  value: string;
  onChange: (url: string) => void;
  variant: Variant;
  builtInFallbackSrc?: string | null;
}) {
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const trimmed = value.trim();
  const previewSrc =
    trimmed || (variant === "hero" ? builtInFallbackSrc || BUILT_IN_HERO : "");
  const isFallbackOnly = variant === "hero" && !trimmed && !!previewSrc;

  async function handleUpload() {
    const input = fileRef.current;
    if (!input?.files?.[0]) return;
    setUploadError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", input.files[0]);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: fd,
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok) {
        setUploadError(data.error ?? "Upload failed");
        return;
      }
      if (data.url) onChange(data.url);
    } catch {
      setUploadError("Upload failed");
    } finally {
      setUploading(false);
      input.value = "";
    }
  }

  function clearToBuiltIn() {
    onChange("");
  }

  return (
    <div className="space-y-3">
      {name ? <input type="hidden" name={name} value={value} readOnly aria-hidden /> : null}

      <div
        className={`relative flex min-h-[140px] w-full max-w-xl items-center justify-center overflow-hidden rounded-lg border border-dashed border-border bg-surface-subtle ${
          previewSrc ? "aspect-video border-solid" : "aspect-video"
        }`}
      >
        {previewSrc ? (
          <>
            <Image
              src={previewSrc}
              alt=""
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 640px"
              unoptimized={previewSrc.startsWith("http")}
            />
            {isFallbackOnly && (
              <p className="absolute bottom-0 left-0 right-0 bg-black/70 px-2 py-1 text-center text-xs text-white/90">
                Built-in default (no custom image saved)
              </p>
            )}
          </>
        ) : (
          <p className="px-4 text-center text-sm text-content-secondary">No image yet. Upload a photo below.</p>
        )}
      </div>

      <p className="text-xs text-content-secondary">{hints[variant]}</p>

      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="max-w-[220px] text-sm text-content-secondary file:mr-2 file:rounded file:border-0 file:bg-surface-subtle file:px-2 file:py-1 file:text-sm file:text-content-primary"
        />
        <button
          type="button"
          onClick={handleUpload}
          disabled={uploading}
          className="focus-ring rounded-md border border-border bg-surface-primary px-3 py-1.5 text-sm text-content-primary hover:bg-surface-subtle disabled:opacity-50"
        >
          {uploading ? "Uploading…" : "Upload a new photo"}
        </button>
        {trimmed ? (
          <button
            type="button"
            onClick={clearToBuiltIn}
            className="text-sm text-content-secondary underline decoration-border hover:text-content-primary"
          >
            {variant === "hero" ? "Remove custom (use built-in default)" : "Clear URL"}
          </button>
        ) : null}
      </div>
      {uploadError && <p className="text-sm text-error">{uploadError}</p>}

      <div>
        <button
          type="button"
          onClick={() => setAdvancedOpen((o) => !o)}
          className="text-sm text-content-secondary underline decoration-border hover:text-content-primary"
        >
          {advancedOpen ? "Hide advanced" : "Advanced: paste image URL"}
        </button>
        {advancedOpen && (
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://… or /images/…"
            className="focus-ring mt-2 w-full max-w-xl rounded-md border border-border bg-surface-primary px-3 py-2 text-sm text-content-primary"
          />
        )}
      </div>
    </div>
  );
}
