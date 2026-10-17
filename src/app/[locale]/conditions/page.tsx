import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { IconCheck, IconPin, IconPhone } from "@/components/Icons";
import { isValidLocale, localizedPath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale: loc } = await params;
  if (!isValidLocale(loc)) return {};
  const dict = await getDictionary(loc);
  return buildMetadata({ title: dict.meta.conditionsTitle, description: dict.meta.conditionsDescription, locale: loc, pathKey: "conditions" });
}

export default async function ConditionsPage({ params }: Props) {
  const { locale: loc } = await params;
  if (!isValidLocale(loc)) notFound();
  const locale = loc as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <section className="bg-gradient-to-br from-[#e9d3a8] to-[#6b4a30] py-12 md:py-16">
        <div className="wrap">
          <Breadcrumbs items={[
            { name: dict.common.home, path: localizedPath(locale, "home") },
            { name: dict.nav.conditions, path: localizedPath(locale, "conditions") },
          ]} />
          <div className="text-white/80 text-xs uppercase tracking-wider mb-2">{dict.conditions.tag}</div>
          <h1 className="serif text-3xl md:text-4xl font-medium text-white leading-tight">
            {dict.conditions.h1} <em className="not-italic text-[var(--gold2)]">{dict.conditions.h1Em}</em>
          </h1>
          <p className="mt-3 text-white/85 max-w-xl">{dict.conditions.intro}</p>
        </div>
      </section>
      <section className="py-14">
        <div className="wrap grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <div className="eyebrow text-[var(--gold)]">{dict.conditions.docsEyebrow}</div>
            <h2 className="serif text-2xl font-medium mt-1 mb-4">{dict.conditions.docsH2}</h2>
            <p className="text-[var(--muted)] mb-4">{dict.conditions.docsIntro}</p>
            <ul className="space-y-3">
              {dict.conditions.docs.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <IconCheck className="w-4 h-4 text-[var(--gold)] mt-0.5 shrink-0" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[var(--bg)] border border-[var(--line)] p-6 md:p-8 rounded">
            <div className="eyebrow text-[var(--gold)]">{dict.conditions.generalEyebrow}</div>
            <h2 className="serif text-xl font-medium mt-1 mb-4">{dict.conditions.generalH2}</h2>
            <ol className="space-y-3 text-sm">
              {dict.conditions.general.map((item, i) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[var(--gold)] text-white text-xs grid place-items-center shrink-0 font-medium">{i + 1}</span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
      <section className="py-10 bg-[var(--bg)]">
        <div className="wrap">
          <h2 className="serif text-xl font-medium mb-4">{dict.conditions.rulesH2}</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {dict.conditions.rules.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <IconCheck className="w-4 h-4 text-[var(--gold)] mt-0.5 shrink-0" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-[var(--muted)]">{dict.conditions.note}</p>
        </div>
      </section>
      <section className="py-14">
        <div className="wrap grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="serif text-2xl font-medium mb-3">{dict.conditions.citiesH2}</h2>
            <p className="text-[var(--muted)] mb-4">{dict.conditions.citiesIntro}</p>
            <ul className="space-y-2">
              {siteConfig.areaServed.map((city) => (
                <li key={city} className="flex items-center gap-2 text-sm">
                  <IconPin className="w-4 h-4 text-[var(--gold)]" aria-hidden />
                  {city}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[var(--bg)] border border-[var(--line)] p-6 rounded text-center">
            <h3 className="serif text-xl font-medium mb-2">{dict.conditions.helpH3}</h3>
            <p className="text-sm text-[var(--muted)] mb-4">
              {dict.conditions.helpText} ({siteConfig.openingHours.display}).
            </p>
            <WhatsAppButton>{dict.conditions.contactWa}</WhatsAppButton>
            <p className="mt-4 flex items-center justify-center gap-2 text-sm">
              <IconPhone className="w-4 h-4 text-[var(--gold)]" aria-hidden />
              <a href={`tel:${siteConfig.phone}`} className="hover:text-[var(--gold)]">{siteConfig.phoneDisplay}</a>
            </p>
            <Link href={localizedPath(locale, "fleet")} className="inline-block mt-4 text-sm text-[var(--gold)] hover:underline">
              {dict.conditions.seeFleet} →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
