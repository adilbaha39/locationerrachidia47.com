/**
 * Site configuration for Location Errachidia 47
 * Replace SITE_URL with the real production domain before deployment.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://REPLACE-WITH-REAL-DOMAIN.example";

export const siteConfig = {
  name: "Location Errachidia 47",
  shortName: "Errachidia 47",
  tagline: "Votre mobilité, notre passion",
  description:
    "Location de voitures à Errachidia. Berlines, SUV et 4x4. Réservation rapide par WhatsApp.",
  locale: "fr_MA",
  language: "fr",
  phone: "+212619213238",
  phoneDisplay: "+212 6 19 21 32 38",
  phoneLocal: "06 19 21 32 38",
  email: "locationerrachidia47@gmail.com",
  whatsapp: "212619213238",
  address: {
    locality: "Errachidia",
    postalCode: "52000",
    country: "MA",
    countryName: "Maroc",
    /** Exact street address not confirmed — owner should update if available */
    streetAddress: undefined as string | undefined,
  },
  /** Opening hours from original site: 8h00 - 22h00, 7j/7 */
  openingHours: {
    opens: "08:00",
    closes: "22:00",
    days: "Mo-Su",
    display: "8h00 – 22h00 · 7j/7",
  },
  areaServed: [
    "Errachidia",
    "Rissani",
    "Merzouga",
    "Tafilalet",
    "Tinghir",
    "Ouarzazate",
  ],
  services: [
    "Location courte durée",
    "Location longue durée",
    "Tourisme & Excursions",
  ],
  /** Unverified claims — set to true only after owner confirmation */
  features: {
    airportDelivery: false, // claimed but not confirmed
    insuranceIncluded: false, // claimed but not confirmed
    service24_7: false, // hours are 08:00-22:00, not 24/7
  },
  social: {
    /** Placeholder — owner must provide real URLs */
    facebook: undefined as string | undefined,
    instagram: undefined as string | undefined,
    tiktok: undefined as string | undefined,
  },
} as const;

export type SiteConfig = typeof siteConfig;
