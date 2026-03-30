import { buildFaqContentGroupFields } from "./faq-content";

export type ContentEditorTier = "essential" | "full";

/**
 * Page copy editor sections. `editorTier: "essential"` shows in the simplified view; `"full"` only when
 * “Show all sections” is on. Adjust tiers here without hunting components.
 */
export const CONTENT_GROUPS: {
  id: string;
  title: string;
  editorTier: ContentEditorTier;
  fields: { key: string; label: string; hint?: string }[];
}[] = [
  {
    id: "hero",
    title: "Hero",
    editorTier: "essential",
    fields: [
      { key: "hero.headline", label: "Headline", hint: "Suggested max ~60 characters" },
      { key: "hero.subhead", label: "Subhead", hint: "Suggested max ~160 characters" },
      { key: "hero.ctaQuote", label: "Primary CTA label (quote)" },
      { key: "hero.ctaContactUs", label: "WhatsApp CTA label" },
      { key: "hero.ctaWhatsApp", label: "Hero WhatsApp line (if used)" },
    ],
  },
  {
    id: "services",
    title: "Services section",
    editorTier: "essential",
    fields: [
      { key: "services.title", label: "Section title" },
      { key: "services.subtitle", label: "Section subtitle" },
    ],
  },
  {
    id: "process",
    title: "Process",
    editorTier: "full",
    fields: [
      { key: "process.title", label: "Section title" },
      { key: "process.subtitle", label: "Section subtitle" },
      { key: "process.step1.title", label: "Step 1 title" },
      { key: "process.step1.description", label: "Step 1 description" },
      { key: "process.step2.title", label: "Step 2 title" },
      { key: "process.step2.description", label: "Step 2 description" },
      { key: "process.step3.title", label: "Step 3 title" },
      { key: "process.step3.description", label: "Step 3 description" },
    ],
  },
  {
    id: "gallery",
    title: "Gallery",
    editorTier: "essential",
    fields: [
      { key: "gallery.title", label: "Section title" },
      { key: "gallery.subtitle", label: "Section subtitle" },
    ],
  },
  {
    id: "testimonials",
    title: "Testimonials",
    editorTier: "full",
    fields: [
      { key: "testimonials.title", label: "Section title" },
      { key: "testimonials.subtitle", label: "Section subtitle" },
      { key: "testimonials.1.quote", label: "Testimonial 1 quote" },
      { key: "testimonials.1.author", label: "Testimonial 1 author" },
      { key: "testimonials.1.location", label: "Testimonial 1 location" },
      { key: "testimonials.2.quote", label: "Testimonial 2 quote" },
      { key: "testimonials.2.author", label: "Testimonial 2 author" },
      { key: "testimonials.2.location", label: "Testimonial 2 location" },
      { key: "testimonials.3.quote", label: "Testimonial 3 quote" },
      { key: "testimonials.3.author", label: "Testimonial 3 author" },
      { key: "testimonials.3.location", label: "Testimonial 3 location" },
    ],
  },
  {
    id: "areas",
    title: "Service areas",
    editorTier: "full",
    fields: [
      { key: "areas.title", label: "Section title" },
      { key: "areas.subtitle", label: "Section subtitle" },
      { key: "areas.list", label: "Areas list (one block of text)" },
    ],
  },
  {
    id: "faq",
    title: "FAQ",
    editorTier: "full",
    fields: buildFaqContentGroupFields(),
  },
  {
    id: "hrClubTeaser",
    title: "HR-Club teaser",
    editorTier: "essential",
    fields: [
      { key: "hrClubTeaser.title", label: "Section title" },
      { key: "hrClubTeaser.subtitle", label: "Section subtitle" },
      { key: "hrClubTeaser.benefit1", label: "Benefit 1" },
      { key: "hrClubTeaser.benefit2", label: "Benefit 2" },
      { key: "hrClubTeaser.benefit3", label: "Benefit 3" },
      { key: "hrClubTeaser.cta", label: "CTA label" },
    ],
  },
  {
    id: "whyChooseUs",
    title: "Why choose us",
    editorTier: "full",
    fields: [
      { key: "whyChooseUs.title", label: "Section title" },
      { key: "whyChooseUs.subtitle", label: "Section subtitle" },
      { key: "whyChooseUs.point1", label: "Point 1" },
      { key: "whyChooseUs.point2", label: "Point 2" },
      { key: "whyChooseUs.point3", label: "Point 3" },
      { key: "whyChooseUs.point4", label: "Point 4" },
    ],
  },
  {
    id: "hrClubPage",
    title: "HR-Club page",
    editorTier: "full",
    fields: [
      { key: "hrClubPage.title", label: "Page title" },
      { key: "hrClubPage.subtitle", label: "Page subtitle" },
      { key: "hrClubPage.item1", label: "Plan point 1" },
      { key: "hrClubPage.item2", label: "Plan point 2" },
      { key: "hrClubPage.item3", label: "Plan point 3" },
      { key: "hrClubPage.item4", label: "Plan point 4" },
    ],
  },
  {
    id: "contact",
    title: "Contact (footer / CTAs copy)",
    editorTier: "essential",
    fields: [
      { key: "contact.title", label: "Contact title" },
      { key: "contact.subtitle", label: "Contact subtitle" },
      { key: "contact.ctaQuote", label: "Quote button label" },
      { key: "contact.ctaContactUs", label: "Contact button label" },
    ],
  },
];

export const LOCALES = ["en", "es", "ca"] as const;
