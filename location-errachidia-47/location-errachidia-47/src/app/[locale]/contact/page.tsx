import { notFound } from "next/navigation";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import { whatsappLink } from "@/lib/whatsapp";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm } from "@/components/ContactForm";
import { IconPhone, IconWhatsApp, IconMail, IconPin, IconClock } from "@/components/Icons";
import { isValidLocale, localizedPath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale: loc } = await params;
  if (!isValidLocale(loc)) return {};
  const dict = await getDictionary(loc);
  return buildMetadata({ title: dict.meta.contactTitle, description: dict.meta.contactDescription, locale: loc, pathKey: "contact" });
}

export default async function ContactPage({ params }: Props) {
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
            { name: dict.nav.contact, path: localizedPath(locale, "contact") },
          ]} />
          <div className="text-white/80 text-xs uppercase tracking-wider mb-2">{dict.contact.tag}</div>
          <h1 className="serif text-3xl md:text-4xl font-medium text-white leading-tight">
            {dict.contact.h1} <em className="not-italic text-[var(--gold2)]">{dict.contact.h1Em}</em>
          </h1>
          <p className="mt-3 text-white/85 max-w-xl">{dict.contact.intro}</p>
        </div>
      </section>
      <section className="py-14">
        <div className="wrap grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="serif text-2xl font-medium mb-6">{dict.contact.coordsH2}</h2>
            <ul className="space-y-5">
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-full border border-[var(--gold)] grid place-items-center shrink-0">
                  <IconPhone className="w-5 h-5 text-[var(--gold)]" aria-hidden />
                </div>
                <div>
                  <b className="block text-sm">{dict.contact.phone}</b>
                  <a href={`tel:${siteConfig.phone}`} className="text-[var(--muted)] hover:text-[var(--gold)]">{siteConfig.phoneDisplay}</a>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-full border border-[var(--gold)] grid place-items-center shrink-0">
                  <IconWhatsApp className="w-5 h-5 text-[var(--gold)]" aria-hidden />
                </div>
                <div>
                  <b className="block text-sm">{dict.contact.whatsapp}</b>
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="text-[var(--muted)] hover:text-[var(--gold)]">{siteConfig.phoneDisplay}</a>
                  <small className="block text-xs text-[var(--muted)]">{dict.contact.waNote}</small>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-full border border-[var(--gold)] grid place-items-center shrink-0">
                  <IconMail className="w-5 h-5 text-[var(--gold)]" aria-hidden />
                </div>
                <div>
                  <b className="block text-sm">{dict.contact.email}</b>
                  <a href={`mailto:${siteConfig.email}`} className="text-[var(--muted)] hover:text-[var(--gold)] break-all">{siteConfig.email}</a>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-full border border-[var(--gold)] grid place-items-center shrink-0">
                  <IconPin className="w-5 h-5 text-[var(--gold)]" aria-hidden />
                </div>
                <div>
                  <b className="block text-sm">{dict.contact.address}</b>
                  <p className="text-[var(--muted)]">Errachidia {siteConfig.address.postalCode}, {siteConfig.address.countryName}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-full border border-[var(--gold)] grid place-items-center shrink-0">
                  <IconClock className="w-5 h-5 text-[var(--gold)]" aria-hidden />
                </div>
                <div>
                  <b className="block text-sm">{dict.contact.hours}</b>
                  <p className="text-[var(--muted)]">{siteConfig.openingHours.display}</p>
                </div>
              </li>
            </ul>
            <div className="mt-8">
              <h3 className="serif text-lg font-medium mb-3">{dict.contact.citiesH3}</h3>
              <ul className="flex flex-wrap gap-2">
                {siteConfig.areaServed.map((city) => (
                  <li key={city} className="text-xs border border-[var(--line)] px-3 py-1 rounded-full text-[var(--muted)]">{city}</li>
                ))}
              </ul>
            </div>
          </div>
          <ContactForm dict={dict} />
        </div>
      </section>
    </>
  );
}
