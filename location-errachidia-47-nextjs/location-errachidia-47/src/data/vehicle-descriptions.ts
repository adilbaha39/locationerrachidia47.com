import type { Locale } from "@/i18n/config";

/** Localized vehicle descriptions — same slugs as vehicles.ts */
export const vehicleDescriptions: Record<
  string,
  Record<Locale, string>
> = {
  "volkswagen-golf-8": {
    fr: "Volkswagen Golf 8 automatique diesel, idéale pour les trajets en ville et sur route à Errachidia. Compacte, économique et confortable pour 5 personnes.",
    en: "Volkswagen Golf 8 automatic diesel, ideal for city and road trips in Errachidia. Compact, economical and comfortable for 5 people.",
    ar: "فولكسفاغن غولف 8 أوتوماتيك ديزل، مثالية للمدينة والطرق في الرشيدية. مدمجة واقتصادية ومريحة لـ 5 أشخاص.",
  },
  "mercedes-classe-e": {
    fr: "Mercedes Classe E 2021, berline premium automatique diesel. Confort et élégance pour vos déplacements professionnels ou voyages dans le Sud marocain.",
    en: "Mercedes E-Class 2021, premium automatic diesel sedan. Comfort and elegance for business trips or travel in southern Morocco.",
    ar: "مرسيدس فئة E 2021، سيدان فاخرة أوتوماتيك ديزل. راحة وأناقة لرحلات العمل أو السفر في جنوب المغرب.",
  },
  "ford-raptor": {
    fr: "Ford Raptor 2023, SUV performant adapté aux routes et pistes de la région d'Errachidia et Merzouga. Puissance et polyvalence pour vos aventures.",
    en: "Ford Raptor 2023, capable SUV suited to roads and tracks around Errachidia and Merzouga. Power and versatility for your adventures.",
    ar: "فورد رابتور 2023، SUV قوي يناسب طرق ومسارات الرشيدية ومرزوكة. قوة وتنوع لمغامراتك.",
  },
  "kia-sportage": {
    fr: "Kia Sportage 2023 automatique diesel. SUV spacieux et économique, parfait pour explorer Errachidia, Rissani et les environs.",
    en: "Kia Sportage 2023 automatic diesel. Spacious and economical SUV, perfect for exploring Errachidia, Rissani and the area.",
    ar: "كيا سبورتاج 2023 أوتوماتيك ديزل. SUV واسع واقتصادي، مثالي لاستكشاف الرشيدية والريصاني والمناطق المجاورة.",
  },
  "audi-a3": {
    fr: "Audi A3 2021, berline compacte automatique essence. Style et agrément de conduite pour vos déplacements à Errachidia et dans la région.",
    en: "Audi A3 2021, compact automatic petrol sedan. Style and driving pleasure for trips in Errachidia and the region.",
    ar: "أودي A3 2021، سيدان مدمجة أوتوماتيك بنزين. أناقة ومتعة قيادة لتنقلاتك في الرشيدية والمنطقة.",
  },
  "range-rover-evoque": {
    fr: "Range Rover Evoque 2022, SUV de luxe automatique diesel. Prestige et confort pour découvrir le Sud marocain avec élégance.",
    en: "Range Rover Evoque 2022, luxury automatic diesel SUV. Prestige and comfort to discover southern Morocco in style.",
    ar: "رينج روفر إيفوك 2022، SUV فاخر أوتوماتيك ديزل. فخامة وراحة لاكتشاف جنوب المغرب بأناقة.",
  },
  "mercedes-gle": {
    fr: "Mercedes GLE 2021, grand SUV 7 places automatique diesel. Idéal pour les familles ou les groupes voyageant vers Merzouga et le Tafilalet.",
    en: "Mercedes GLE 2021, large 7-seat automatic diesel SUV. Ideal for families or groups travelling to Merzouga and Tafilalet.",
    ar: "مرسيدس GLE 2021، SUV كبير 7 مقاعد أوتوماتيك ديزل. مثالي للعائلات أو المجموعات المتجهة إلى مرزوكة وتافيلالت.",
  },
  "dacia-duster": {
    fr: "Dacia Duster 2022 manuelle diesel. 4x4 robuste et économique, adapté aux pistes et routes de la région d'Errachidia.",
    en: "Dacia Duster 2022 manual diesel. Robust and economical 4x4, suited to tracks and roads around Errachidia.",
    ar: "داسيا داستر 2022 يدوي ديزل. 4x4 قوي واقتصادي، يناسب المسارات والطرق حول الرشيدية.",
  },
  "toyota-hilux": {
    fr: "Toyota Hilux 2021, pick-up manuelle diesel. Fiabilité et polyvalence pour le transport et les trajets tout-terrain autour d'Errachidia.",
    en: "Toyota Hilux 2021, manual diesel pick-up. Reliability and versatility for transport and off-road trips around Errachidia.",
    ar: "تويوتا هايلكس 2021، بيك آب يدوي ديزل. موثوقية وتنوع للنقل والرحلات الوعرة حول الرشيدية.",
  },
};

export function getVehicleDescription(slug: string, locale: Locale): string {
  return (
    vehicleDescriptions[slug]?.[locale] ||
    vehicleDescriptions[slug]?.fr ||
    ""
  );
}
