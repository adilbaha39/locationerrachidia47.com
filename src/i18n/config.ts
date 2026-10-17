export const locales = ["fr", "en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export const localeNames: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  ar: "العربية",
};

export const localeHtmlLang: Record<Locale, string> = {
  fr: "fr",
  en: "en",
  ar: "ar",
};

export const localeDirection: Record<Locale, "ltr" | "rtl"> = {
  fr: "ltr",
  en: "ltr",
  ar: "rtl",
};

export const localeOgLocale: Record<Locale, string> = {
  fr: "fr_MA",
  en: "en_US",
  ar: "ar_MA",
};

/**
 * Path segments — same for all locales for clean App Router structure.
 * SEO differentiation comes from locale prefix + hreflang + translated content.
 * Examples: /fr/voitures, /en/voitures, /ar/voitures
 */
export const pathnames = {
  home: { fr: "", en: "", ar: "" },
  fleet: { fr: "voitures", en: "voitures", ar: "voitures" },
  about: { fr: "apropos", en: "apropos", ar: "apropos" },
  conditions: { fr: "conditions", en: "conditions", ar: "conditions" },
  contact: { fr: "contact", en: "contact", ar: "contact" },
} as const;

export type PathnameKey = keyof typeof pathnames;

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

/** Build a localized path: /fr/voitures, /en/cars, /ar/sayarat */
export function localizedPath(
  locale: Locale,
  key: PathnameKey,
  slug?: string
): string {
  const segment = pathnames[key][locale];
  if (key === "home" || !segment) {
    return `/${locale}`;
  }
  if (slug) {
    return `/${locale}/${segment}/${slug}`;
  }
  return `/${locale}/${segment}`;
}
