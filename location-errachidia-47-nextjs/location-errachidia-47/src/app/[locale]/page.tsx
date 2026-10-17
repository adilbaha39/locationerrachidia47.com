import Link from "next/link";
import { notFound } from "next/navigation";
import { vehicles } from "@/data/vehicles";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import { VehicleCard } from "@/components/VehicleCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import {
  IconShield,
  IconCar,
  IconCalendar,
  IconWhatsApp,
  IconPin,
  IconCheck,
  IconPhone,
  IconMail,
} from "@/components/Icons";
import { isValidLocale, localizedPath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale: loc } = await params;
  if (!isValidLocale(loc)) return {};
  const dict = await getDictionary(loc);
  return buildMetadata({
    title: dict.meta.homeTitle,
    description: dict.meta.homeDescription,
    locale: loc,
    pathKey: "home",
  });
}

export default async function HomePage({ params }: Props) {
  const { locale: loc } = await params;
  if (!isValidLocale(loc)) notFound();
  const locale = loc as Locale;
  const dict = await getDictionary(locale);
  const featured = vehicles.slice(0, 5);

  return (
    <>
      <section className="relative bg-gradient-to-br from-[#e9d3a8] to-[#6b4a30] min-h-[420px] md:min-h-[520px] flex items-center">
        <div className="wrap py-12 md:py-16 w-full">
          <div className="max-w-xl bg-white/95 p-8 md:p-10 shadow-lg">
            <div className="eyebrow mb-2">{dict.home.eyebrow}</div>
            <h1 className="serif text-3xl md:text-4xl lg:text-[42px] font-medium leading-tight mb-4">
              {dict.home.h1}{" "}
              <em className="text-[var(--gold)] not-italic">{dict.home.h1Em}</em>
            </h1>
            <p className="text-[var(--muted)] mb-6 leading-relaxed">
              {dict.home.intro}
            </p>
            <div className="flex flex-wrap gap-3">
              <WhatsAppButton showArrow>{dict.nav.bookWhatsApp}</WhatsAppButton>
              <Link href={localizedPath(locale, "fleet")} className="btn-line">
                {dict.home.seeFleet}
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 end-4 md:bottom-8 md:end-8 text-white/90 text-sm md:text-lg flex items-center gap-2">
          <IconPin className="w-5 h-5" aria-hidden />
          <span>
            Errachidia
            <br />
            <span className="text-xs opacity-80">{dict.home.tagline}</span>
          </span>
        </div>
      </section>

      <section className="py-14" id="voitures">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <div className="eyebrow">{dict.home.fleetEyebrow}</div>
              <h2 className="serif text-2xl md:text-3xl font-medium mt-1">
                {dict.home.fleetH2}
              </h2>
            </div>
            <Link
              href={localizedPath(locale, "fleet")}
              className="text-sm text-[var(--gold)] hover:underline"
            >
              {dict.home.seeAllFleet} →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {featured.map((v) => (
              <VehicleCard key={v.slug} vehicle={v} locale={locale} dict={dict} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-[var(--bg)] border-y-2 border-[var(--gold2)]">
        <div className="wrap grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: IconCar, t: dict.home.perkFleet, d: dict.home.perkFleetDesc },
            { icon: IconWhatsApp, t: dict.home.perkWa, d: dict.home.perkWaDesc },
            { icon: IconPin, t: dict.home.perkLocal, d: dict.home.perkLocalDesc },
            { icon: IconShield, t: dict.home.perkService, d: dict.home.perkServiceDesc },
          ].map((p) => (
            <div key={p.t} className="flex items-center gap-4">
              <p.icon className="w-12 h-12 text-[var(--gold)] shrink-0" aria-hidden />
              <div>
                <b className="block text-sm font-medium">{p.t}</b>
                <small className="text-xs text-[var(--muted)]">{p.d}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14">
        <div className="wrap">
          <div className="eyebrow text-[var(--gold)]">{dict.home.stepsEyebrow}</div>
          <h2 className="serif text-2xl md:text-3xl font-medium mt-1 mb-8">
            {dict.home.stepsH2}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { n: "01", title: dict.home.step1, desc: dict.home.step1Desc, icon: IconCar },
              { n: "02", title: dict.home.step2, desc: dict.home.step2Desc, icon: IconCalendar },
              { n: "03", title: dict.home.step3, desc: dict.home.step3Desc, icon: IconWhatsApp },
            ].map((s) => (
              <div key={s.n} className="step-shape flex items-center gap-5 px-7 py-6 min-h-[118px]">
                <s.icon className="w-10 h-10 text-[var(--gold)] shrink-0" aria-hidden />
                <div>
                  <div className="text-[var(--gold)] text-xs font-medium">{s.n}</div>
                  <b className="block text-sm font-medium">{s.title}</b>
                  <small className="text-xs text-[var(--muted)]">{s.desc}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-[var(--bg)]">
        <div className="wrap grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="eyebrow">{dict.home.citiesEyebrow}</div>
            <h3 className="serif text-xl font-medium mt-1 mb-4">{dict.home.citiesH3}</h3>
            <ul className="space-y-2">
              {siteConfig.areaServed.slice(0, 4).map((city) => (
                <li key={city} className="flex items-center gap-2 text-sm">
                  <IconPin className="w-4 h-4 text-[var(--gold)]" aria-hidden />
                  {city}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="serif text-xl font-medium mb-4">{dict.home.conditionsH3}</h3>
            <ul className="space-y-2 text-sm">
              {dict.home.conditionItems.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <IconCheck className="w-4 h-4 text-[var(--gold)] mt-0.5 shrink-0" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href={localizedPath(locale, "conditions")}
              className="inline-block mt-4 text-sm text-[var(--gold)] hover:underline"
            >
              {dict.home.seeConditions} →
            </Link>
          </div>
          <div>
            <h3 className="serif text-xl font-medium mb-4">{dict.home.contactH3}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <IconPhone className="w-4 h-4 text-[var(--gold)]" aria-hidden />
                <a href={`tel:${siteConfig.phone}`} className="hover:text-[var(--gold)]">
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <IconWhatsApp className="w-4 h-4 text-[var(--gold)]" aria-hidden />
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--gold)]"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <IconMail className="w-4 h-4 text-[var(--gold)]" aria-hidden />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-[var(--gold)] break-all">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <IconPin className="w-4 h-4 text-[var(--gold)]" aria-hidden />
                Errachidia 52000, Maroc
              </li>
            </ul>
            <p className="mt-3 text-xs text-[var(--muted)]">
              {dict.home.hours} : {siteConfig.openingHours.display}
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 text-center">
        <div className="wrap max-w-2xl mx-auto">
          <h2 className="serif text-2xl md:text-3xl font-medium mb-3">{dict.home.ctaH2}</h2>
          <p className="text-[var(--muted)] mb-6">{dict.home.ctaText}</p>
          <WhatsAppButton showArrow variant="dark">{dict.home.bookNow}</WhatsAppButton>
        </div>
      </section>
    </>
  );
}
