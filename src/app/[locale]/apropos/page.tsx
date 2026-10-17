import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { IconCar, IconWhatsApp, IconPin, IconShield } from "@/components/Icons";
import { isValidLocale, localizedPath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale: loc } = await params;
  if (!isValidLocale(loc)) return {};
  const dict = await getDictionary(loc);
  return buildMetadata({ title: dict.meta.aboutTitle, description: dict.meta.aboutDescription, locale: loc, pathKey: "about" });
}

export default async function AproposPage({ params }: Props) {
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
            { name: dict.nav.about, path: localizedPath(locale, "about") },
          ]} />
          <div className="text-white/80 text-xs uppercase tracking-wider mb-2">{dict.about.tag}</div>
          <h1 className="serif text-3xl md:text-4xl font-medium text-white leading-tight max-w-2xl">
            {dict.about.h1} <em className="not-italic text-[var(--gold2)]">{dict.about.h1Em}</em>
          </h1>
          <p className="mt-3 text-white/85 max-w-xl">{dict.about.intro}</p>
        </div>
      </section>
      <section className="py-14">
        <div className="wrap max-w-3xl">
          <div className="eyebrow text-[var(--gold)]">{dict.about.storyEyebrow}</div>
          <h2 className="serif text-2xl md:text-3xl font-medium mt-1 mb-4">{dict.about.storyH2}</h2>
          <p className="text-[var(--muted)] leading-relaxed mb-4">{dict.about.storyP1}</p>
          <p className="text-[var(--muted)] leading-relaxed">{dict.about.storyP2}</p>
        </div>
      </section>
      <section className="py-12 bg-[var(--bg)] border-y border-[var(--line)]">
        <div className="wrap">
          <div className="eyebrow text-[var(--gold)]">{dict.about.servicesEyebrow}</div>
          <h2 className="serif text-2xl font-medium mt-1 mb-8">{dict.about.servicesH2}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: IconCar, t: dict.about.svc1, d: dict.about.svc1Desc },
              { icon: IconWhatsApp, t: dict.about.svc2, d: dict.about.svc2Desc },
              { icon: IconPin, t: dict.about.svc3, d: dict.about.svc3Desc },
              { icon: IconShield, t: dict.about.svc4, d: dict.about.svc4Desc },
            ].map((s) => (
              <div key={s.t} className="bg-white border border-[var(--line)] p-5 rounded">
                <s.icon className="w-10 h-10 text-[var(--gold)] mb-3" aria-hidden />
                <b className="block text-sm font-medium">{s.t}</b>
                <small className="text-xs text-[var(--muted)]">{s.d}</small>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-14 text-center">
        <div className="wrap max-w-xl mx-auto">
          <h2 className="serif text-2xl font-medium mb-3">{dict.about.ctaH2}</h2>
          <p className="text-[var(--muted)] mb-6">{dict.about.ctaText}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <WhatsAppButton showArrow>{dict.nav.bookWhatsApp}</WhatsAppButton>
            <Link href={localizedPath(locale, "fleet")} className="btn-line">{dict.home.seeFleet}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
