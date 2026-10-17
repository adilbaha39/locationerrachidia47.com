import type { Metadata } from "next";
import { SITE_URL, siteConfig } from "@/data/site";
import type { Vehicle } from "@/data/vehicles";
import { formatPrice } from "@/data/vehicles";
import type { Locale } from "@/i18n/config";
import {
  locales,
  localeOgLocale,
  localizedPath,
  type PathnameKey,
} from "@/i18n/config";

const defaultOgImage = `${SITE_URL}/images/hero.jpg`;

type PageSeoInput = {
  title: string;
  description: string;
  locale: Locale;
  pathKey: PathnameKey;
  slug?: string;
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
};

/** Build hreflang alternates for all locales */
function languageAlternates(
  pathKey: PathnameKey,
  slug?: string
): Record<string, string> {
  const map: Record<string, string> = {};
  for (const loc of locales) {
    map[loc] = `${SITE_URL}${localizedPath(loc, pathKey, slug)}`;
  }
  map["x-default"] = `${SITE_URL}${localizedPath("fr", pathKey, slug)}`;
  return map;
}

export function buildMetadata({
  title,
  description,
  locale,
  pathKey,
  slug,
  image = defaultOgImage,
  imageAlt = siteConfig.name,
  noIndex = false,
}: PageSeoInput): Metadata {
  const path = localizedPath(locale, pathKey, slug);
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
      languages: languageAlternates(pathKey, slug),
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: localeOgLocale[locale],
      url,
      siteName: siteConfig.name,
      title,
      description,
      images: [{ url: image, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function vehicleMetadata(
  vehicle: Vehicle,
  locale: Locale,
  title: string,
  description: string
): Metadata {
  return buildMetadata({
    title,
    description,
    locale,
    pathKey: "fleet",
    slug: vehicle.slug,
    image: `${SITE_URL}${vehicle.image}`,
    imageAlt: title,
  });
}

export function localBusinessJsonLd(locale: Locale = "fr") {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    name: siteConfig.name,
    description: siteConfig.description,
    url: `${SITE_URL}/${locale}`,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.locality,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    areaServed: siteConfig.areaServed.map((city) => ({
      "@type": "City",
      name: city,
    })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: siteConfig.openingHours.opens,
      closes: siteConfig.openingHours.closes,
    },
    priceRange: "450–1800 MAD",
    inLanguage: locale,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: SITE_URL,
    description: siteConfig.description,
    inLanguage: locales,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: SITE_URL,
    },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function vehicleProductJsonLd(
  vehicle: Vehicle,
  locale: Locale,
  description: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: vehicle.name,
    description,
    brand: { "@type": "Brand", name: vehicle.brand },
    category: vehicle.category,
    offers: {
      "@type": "Offer",
      price: vehicle.pricePerDay,
      priceCurrency: vehicle.currency,
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}${localizedPath(locale, "fleet", vehicle.slug)}`,
      seller: {
        "@type": "Organization",
        name: siteConfig.name,
      },
    },
  };
}
