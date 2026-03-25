export function normalizeWhatsAppDigits(raw: string): string {
  return raw.replace(/\D/g, "");
}

const ENV_DEFAULT = normalizeWhatsAppDigits(
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "34600000000"
);

export const WHATSAPP_NUMBER = ENV_DEFAULT;

export function getQuoteMessage(locale: string): string {
  switch (locale) {
    case "es":
      return "Hola, me gustaría solicitar un presupuesto.";
    case "ca":
      return "Hola, m'agradaria sol·licitar un pressupost.";
    default:
      return "Hi, I'd like to get a quote.";
  }
}

export function getContactMessage(locale: string): string {
  switch (locale) {
    case "es":
      return "Hola, me gustaría hacer una consulta.";
    case "ca":
      return "Hola, m'agradaria fer una consulta.";
    default:
      return "Hi, I'd like to get in touch.";
  }
}

export function getQuoteHref(locale: string, whatsappDigits: string = ENV_DEFAULT): string {
  const base = `https://wa.me/${normalizeWhatsAppDigits(whatsappDigits)}`;
  return `${base}?text=${encodeURIComponent(getQuoteMessage(locale))}`;
}

export function getContactHref(locale: string, whatsappDigits: string = ENV_DEFAULT): string {
  const base = `https://wa.me/${normalizeWhatsAppDigits(whatsappDigits)}`;
  return `${base}?text=${encodeURIComponent(getContactMessage(locale))}`;
}
