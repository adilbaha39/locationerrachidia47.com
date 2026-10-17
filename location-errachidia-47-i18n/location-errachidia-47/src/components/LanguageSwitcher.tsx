"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  locales,
  localeNames,
  type Locale,
  pathnames,
  type PathnameKey,
} from "@/i18n/config";

/**
 * Switch language while staying on the equivalent page.
 * Maps path segments across locales (voitures ↔ cars ↔ sayarat).
 */
export function LanguageSwitcher({
  currentLocale,
  label,
}: {
  currentLocale: Locale;
  label: string;
}) {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  // parts[0] = locale, parts[1] = section?, parts[2] = slug?

  function targetPath(targetLocale: Locale): string {
    if (parts.length < 1) return `/${targetLocale}`;

    const section = parts[1]; // may be undefined
    const slug = parts[2];

    if (!section) return `/${targetLocale}`;

    // Find which pathname key matches current section
    let key: PathnameKey | null = null;
    for (const [k, map] of Object.entries(pathnames)) {
      if (Object.values(map).includes(section as never)) {
        key = k as PathnameKey;
        break;
      }
    }

    if (!key || key === "home") return `/${targetLocale}`;

    const newSection = pathnames[key][targetLocale];
    if (slug && key === "fleet") {
      return `/${targetLocale}/${newSection}/${slug}`;
    }
    return `/${targetLocale}/${newSection}`;
  }

  return (
    <div className="flex items-center gap-1 text-sm" role="navigation" aria-label={label}>
      {locales.map((loc) => (
        <Link
          key={loc}
          href={targetPath(loc)}
          hrefLang={loc}
          className={`
            px-2 py-1 rounded transition-colors
            ${loc === currentLocale
              ? "bg-[var(--gold)] text-white font-medium"
              : "text-[var(--muted)] hover:text-[var(--gold)]"}
          `}
          aria-current={loc === currentLocale ? "page" : undefined}
        >
          {localeNames[loc]}
        </Link>
      ))}
    </div>
  );
}
