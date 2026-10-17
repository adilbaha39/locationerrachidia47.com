import { notFound } from "next/navigation";
import { vehicles } from "@/data/vehicles";
import { buildMetadata } from "@/lib/seo";
import { VehicleGrid } from "@/components/VehicleGrid";
import { VehicleCard } from "@/components/VehicleCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { isValidLocale, localizedPath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale: loc } = await params;
  if (!isValidLocale(loc)) return {};
  const dict = await getDictionary(loc);
  return buildMetadata({
    title: dict.meta.fleetTitle,
    description: dict.meta.fleetDescription,
    locale: loc,
    pathKey: "fleet",
  });
}

export default async function VoituresPage({ params }: Props) {
  const { locale: loc } = await params;
  if (!isValidLocale(loc)) notFound();
  const locale = loc as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <section className="bg-gradient-to-br from-[#e9d3a8] to-[#6b4a30] py-12 md:py-16">
        <div className="wrap">
          <Breadcrumbs
            items={[
              { name: dict.common.home, path: localizedPath(locale, "home") },
              { name: dict.nav.fleet, path: localizedPath(locale, "fleet") },
            ]}
          />
          <div className="text-white/80 text-xs uppercase tracking-wider mb-2">
            {dict.fleet.tag}
          </div>
          <h1 className="serif text-3xl md:text-4xl font-medium text-white leading-tight">
            {dict.fleet.h1}{" "}
            <em className="not-italic text-[var(--gold2)]">{dict.fleet.h1Em}</em>
          </h1>
          <p className="mt-3 text-white/85 max-w-xl">{dict.fleet.intro}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="wrap">
          <noscript>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {vehicles.map((v) => (
                <VehicleCard key={v.slug} vehicle={v} locale={locale} dict={dict} />
              ))}
            </div>
          </noscript>
          <VehicleGrid vehicles={vehicles} locale={locale} dict={dict} />
        </div>
      </section>
    </>
  );
}
