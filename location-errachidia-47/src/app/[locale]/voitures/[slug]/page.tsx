import { notFound } from "next/navigation";
import Link from "next/link";
import {
  vehicles,
  getVehicleBySlug,
  getAllVehicleSlugs,
  formatPrice,
} from "@/data/vehicles";
import { getVehicleDescription } from "@/data/vehicle-descriptions";
import { vehicleMetadata, vehicleProductJsonLd } from "@/lib/seo";
import { vehicleWhatsAppLink } from "@/lib/whatsapp";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  IconGear,
  IconFuel,
  IconUser,
  IconWhatsApp,
  IconArrow,
} from "@/components/Icons";
import {
  isValidLocale,
  localizedPath,
  locales,
  type Locale,
} from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const slugs = getAllVehicleSlugs();
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale: loc, slug } = await params;
  if (!isValidLocale(loc)) return {};
  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) return {};
  const dict = await getDictionary(loc);
  const price = formatPrice(vehicle.pricePerDay);
  return vehicleMetadata(
    vehicle,
    loc,
    dict.meta.vehicleTitle(vehicle.name),
    dict.meta.vehicleDescription(vehicle.name, vehicle.year, price)
  );
}

export default async function VehiclePage({ params }: Props) {
  const { locale: loc, slug } = await params;
  if (!isValidLocale(loc)) notFound();
  const locale = loc as Locale;
  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) notFound();

  const dict = await getDictionary(locale);
  const description = getVehicleDescription(vehicle.slug, locale);
  const waHref = vehicleWhatsAppLink(vehicle);
  const catLabel = dict.categories[vehicle.category] || vehicle.category;
  const gearLabel =
    dict.transmission[vehicle.transmission] || vehicle.transmission;
  const fuelLabel = dict.fuel[vehicle.fuel] || vehicle.fuel;

  return (
    <>
      <JsonLd data={vehicleProductJsonLd(vehicle, locale, description)} />

      <section className="py-10 md:py-14">
        <div className="wrap">
          <Breadcrumbs
            items={[
              { name: dict.common.home, path: localizedPath(locale, "home") },
              { name: dict.nav.fleet, path: localizedPath(locale, "fleet") },
              {
                name: vehicle.name,
                path: localizedPath(locale, "fleet", vehicle.slug),
              },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-4">
            <div className="aspect-[4/3] img-placeholder rounded border border-[var(--line)]">
              <span>
                {vehicle.name}
                <br />
                <span className="text-xs">
                  {dict.vehicle.photoNote} {vehicle.image}
                </span>
              </span>
            </div>

            <div>
              <div className="text-[11px] tracking-wider uppercase text-[var(--gold)] font-medium mb-1">
                {catLabel}
              </div>
              <h1 className="serif text-3xl md:text-4xl font-medium mb-2">
                {vehicle.name}
              </h1>
              <p className="text-[var(--muted)] mb-4">{vehicle.year}</p>

              <div className="serif text-3xl text-[var(--gold)] font-semibold mb-6">
                {formatPrice(vehicle.pricePerDay)}{" "}
                <span className="font-sans text-base text-[var(--muted)] font-normal">
                  {dict.fleet.perDay}
                </span>
              </div>

              <ul className="flex flex-wrap gap-4 text-sm text-[var(--muted)] mb-6">
                <li className="flex items-center gap-1.5">
                  <IconGear className="w-4 h-4" aria-hidden />
                  {gearLabel}
                </li>
                <li className="flex items-center gap-1.5">
                  <IconFuel className="w-4 h-4" aria-hidden />
                  {fuelLabel}
                </li>
                <li className="flex items-center gap-1.5">
                  <IconUser className="w-4 h-4" aria-hidden />
                  {vehicle.seats} {dict.vehicle.seats}
                </li>
              </ul>

              <p className="text-[var(--ink)] leading-relaxed mb-8">
                {description}
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-wa"
                >
                  <IconWhatsApp className="w-5 h-5" aria-hidden />
                  {dict.vehicle.bookWa}
                  <IconArrow className="w-4 h-4" aria-hidden />
                </a>
                <Link href={localizedPath(locale, "fleet")} className="btn-line">
                  {dict.vehicle.backFleet}
                </Link>
                <Link
                  href={localizedPath(locale, "contact")}
                  className="btn-line"
                >
                  {dict.vehicle.contact}
                </Link>
              </div>

              <p className="mt-6 text-xs text-[var(--muted)]">
                {dict.vehicle.priceNote}
              </p>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="serif text-2xl font-medium mb-6">
              {dict.vehicle.otherVehicles}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {vehicles
                .filter((v) => v.slug !== vehicle.slug)
                .slice(0, 3)
                .map((v) => (
                  <article key={v.slug} className="car-card p-4">
                    <Link href={localizedPath(locale, "fleet", v.slug)}>
                      <div className="text-[10px] uppercase text-[var(--gold)]">
                        {dict.categories[v.category] || v.category}
                      </div>
                      <h3 className="font-medium mt-0.5">{v.name}</h3>
                      <p className="text-sm text-[var(--muted)]">
                        {formatPrice(v.pricePerDay)} {dict.fleet.perDay}
                      </p>
                    </Link>
                  </article>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
