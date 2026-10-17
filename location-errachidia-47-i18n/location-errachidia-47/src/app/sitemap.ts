import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";
import { getAllVehicleSlugs } from "@/data/vehicles";
import { locales, localizedPath } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    entries.push(
      {
        url: `${SITE_URL}${localizedPath(locale, "home")}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1,
      },
      {
        url: `${SITE_URL}${localizedPath(locale, "fleet")}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${SITE_URL}${localizedPath(locale, "about")}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      },
      {
        url: `${SITE_URL}${localizedPath(locale, "conditions")}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      },
      {
        url: `${SITE_URL}${localizedPath(locale, "contact")}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      }
    );

    for (const slug of getAllVehicleSlugs()) {
      entries.push({
        url: `${SITE_URL}${localizedPath(locale, "fleet", slug)}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  return entries;
}
