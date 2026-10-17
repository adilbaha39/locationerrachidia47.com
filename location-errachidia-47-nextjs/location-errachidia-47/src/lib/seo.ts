import type { Metadata } from "next";
import { SITE_URL, siteConfig } from "@/data/site";
import type { Vehicle } from "@/data/vehicles";
import { formatPrice } from "@/data/vehicles";

const defaultOgImage = `${SITE_URL}/images/hero.jpg`;

type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  image = defaultOgImage,
  imageAlt = siteConfig.name,
  noIndex = false,
}: PageSeoInput): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: image,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function vehicleMetadata(vehicle: Vehicle): Metadata {
  const title = `Location ${vehicle.name} à Errachidia | ${siteConfig.name}`;
  const description = `Louez une ${vehicle.name} ${vehicle.year} à Errachidia dès ${formatPrice(vehicle.pricePerDay)} DH/jour. ${vehicle.transmission}, ${vehicle.fuel}, ${vehicle.seats} places. Réservation WhatsApp.`;
  return buildMetadata({
    title,
    description,
    path: `/voitures/${vehicle.slug}`,
    image: `${SITE_URL}${vehicle.image}`,
    imageAlt: `Location ${vehicle.name} à Errachidia`,
  });
}

/* ---------- JSON-LD helpers ---------- */

export function localBusinessJsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    name: siteConfig.name,
    description: siteConfig.description,
    url: SITE_URL,
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
  };
  return data;
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: SITE_URL,
    description: siteConfig.description,
    inLanguage: "fr",
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

export function vehicleProductJsonLd(vehicle: Vehicle) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: vehicle.name,
    description: vehicle.description,
    brand: {
      "@type": "Brand",
      name: vehicle.brand,
    },
    category: vehicle.category,
    offers: {
      "@type": "Offer",
      price: vehicle.pricePerDay,
      priceCurrency: vehicle.currency,
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/voitures/${vehicle.slug}`,
      seller: {
        "@type": "Organization",
        name: siteConfig.name,
      },
    },
  };
}
