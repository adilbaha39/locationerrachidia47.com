import { notFound } from "next/navigation";
import Link from "next/link";
import {
  vehicles,
  getVehicleBySlug,
  getAllVehicleSlugs,
  formatPrice,
} from "@/data/vehicles";
import { vehicleMetadata, vehicleProductJsonLd } from "@/lib/seo";
import { vehicleWhatsAppLink } from "@/lib/whatsapp";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import {
  IconGear,
  IconFuel,
  IconUser,
  IconWhatsApp,
  IconArrow,
} from "@/components/Icons";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllVehicleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) return { title: "Véhicule introuvable" };
  return vehicleMetadata(vehicle);
}

export default async function VehiclePage({ params }: Props) {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) notFound();

  const waHref = vehicleWhatsAppLink(vehicle);

  return (
    <>
      <JsonLd data={vehicleProductJsonLd(vehicle)} />

      <section className="py-10 md:py-14">
        <div className="wrap">
          <Breadcrumbs
            items={[
              { name: "Accueil", path: "/" },
              { name: "Nos Voitures", path: "/voitures" },
              { name: vehicle.name, path: `/voitures/${vehicle.slug}` },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-4">
            {/* Image placeholder */}
            <div className="aspect-[4/3] img-placeholder rounded border border-[var(--line)]">
              <span>
                Photo : {vehicle.name}
                <br />
                <span className="text-xs">
                  Ajoutez {vehicle.image} dans public/
                </span>
              </span>
            </div>

            <div>
              <div className="text-[11px] tracking-wider uppercase text-[var(--gold)] font-medium mb-1">
                {vehicle.category}
              </div>
              <h1 className="serif text-3xl md:text-4xl font-medium mb-2">
                {vehicle.name}
              </h1>
              <p className="text-[var(--muted)] mb-4">{vehicle.year}</p>

              <div className="serif text-3xl text-[var(--gold)] font-semibold mb-6">
                {formatPrice(vehicle.pricePerDay)}{" "}
                <span className="font-sans text-base text-[var(--muted)] font-normal">
                  DH / jour
                </span>
              </div>

              <ul className="flex flex-wrap gap-4 text-sm text-[var(--muted)] mb-6">
                <li className="flex items-center gap-1.5">
                  <IconGear className="w-4 h-4" aria-hidden />
                  {vehicle.transmission}
                </li>
                <li className="flex items-center gap-1.5">
                  <IconFuel className="w-4 h-4" aria-hidden />
                  {vehicle.fuel}
                </li>
                <li className="flex items-center gap-1.5">
                  <IconUser className="w-4 h-4" aria-hidden />
                  {vehicle.seats} places
                </li>
              </ul>

              <p className="text-[var(--ink)] leading-relaxed mb-8">
                {vehicle.description}
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-wa"
                >
                  <IconWhatsApp className="w-5 h-5" aria-hidden />
                  Réserver sur WhatsApp
                  <IconArrow className="w-4 h-4" aria-hidden />
                </a>
                <Link href="/voitures" className="btn-line">
                  Retour à la flotte
                </Link>
                <Link href="/contact" className="btn-line">
                  Contact
                </Link>
              </div>

              <p className="mt-6 text-xs text-[var(--muted)]">
                Les prix indiqués sont à titre indicatif. La disponibilité et le
                tarif définitif sont confirmés lors de la réservation.
              </p>
            </div>
          </div>

          {/* Related */}
          <div className="mt-16">
            <h2 className="serif text-2xl font-medium mb-6">
              Autres véhicules
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {vehicles
                .filter((v) => v.slug !== vehicle.slug)
                .slice(0, 3)
                .map((v) => (
                  <article key={v.slug} className="car-card p-4">
                    <Link href={`/voitures/${v.slug}`}>
                      <div className="text-[10px] uppercase text-[var(--gold)]">
                        {v.category}
                      </div>
                      <h3 className="font-medium mt-0.5">{v.name}</h3>
                      <p className="text-sm text-[var(--muted)]">
                        {formatPrice(v.pricePerDay)} DH /jour
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
