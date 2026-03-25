/**
 * Server-only machine translation for admin (DeepL). Copy is sent to DeepL’s API; review output before publishing.
 */

const LOCALE_TO_DEEPL: Record<"en" | "es" | "ca", string> = {
  en: "EN",
  es: "ES",
  ca: "CA",
};

export function isDeepLConfigured(): boolean {
  return Boolean(process.env.DEEPL_API_KEY?.trim());
}

export function getDeepLApiBase(): string {
  const raw = process.env.DEEPL_API_URL?.trim();
  if (raw) return raw.replace(/\/$/, "");
  return "https://api-free.deepl.com";
}

/**
 * Translates a list of strings in order. Empty strings stay empty in output.
 */
export async function translateTextsDeepL(params: {
  texts: string[];
  sourceLocale: "en" | "es" | "ca";
  targetLocale: "en" | "es" | "ca";
}): Promise<string[]> {
  const key = process.env.DEEPL_API_KEY?.trim();
  if (!key) {
    throw new Error("DEEPL_API_KEY is not set");
  }

  const source = LOCALE_TO_DEEPL[params.sourceLocale];
  const target = LOCALE_TO_DEEPL[params.targetLocale];
  if (source === target) {
    return [...params.texts];
  }

  const nonEmptyIndices: number[] = [];
  const toSend: string[] = [];
  params.texts.forEach((t, i) => {
    if (t.trim()) {
      nonEmptyIndices.push(i);
      toSend.push(t);
    }
  });

  if (toSend.length === 0) {
    return params.texts.map(() => "");
  }

  const body = new URLSearchParams();
  for (const t of toSend) {
    body.append("text", t);
  }
  body.set("source_lang", source);
  body.set("target_lang", target);

  const url = `${getDeepLApiBase()}/v2/translate`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `DeepL-Auth-Key ${key}`,
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body: body.toString(),
  });

  if (!res.ok) {
    const snippet = await res.text().catch(() => "");
    console.error("DeepL translate failed", res.status, snippet.slice(0, 120));
    throw new Error("Translation request failed");
  }

  const data = (await res.json()) as { translations?: { text: string }[] };
  const outs = data.translations?.map((x) => x.text) ?? [];
  if (outs.length !== toSend.length) {
    throw new Error("Translation response mismatch");
  }

  const result = params.texts.map(() => "");
  nonEmptyIndices.forEach((origIdx, j) => {
    result[origIdx] = outs[j] ?? "";
  });
  return result;
}
