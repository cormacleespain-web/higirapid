export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "34600000000";

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

export function getQuoteHref(locale: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}`;
  return `${base}?text=${encodeURIComponent(getQuoteMessage(locale))}`;
}

export function getContactHref(locale: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}`;
  return `${base}?text=${encodeURIComponent(getContactMessage(locale))}`;
}
