import { vehicles } from "@/data/vehicles";
import { buildMetadata } from "@/lib/seo";
import { VehicleGrid } from "@/components/VehicleGrid";
import { VehicleCard } from "@/components/VehicleCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata = buildMetadata({
  title: "Voitures à louer à Errachidia | Location Errachidia 47",
  description:
    "Découvrez notre flotte de voitures à louer à Errachidia : économiques, SUV, 4x4 et luxe. Prix à partir de 450 DH/jour. Réservation WhatsApp.",
  path: "/voitures",
});

export default function VoituresPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-[#e9d3a8] to-[#6b4a30] py-12 md:py-16">
        <div className="wrap">
          <Breadcrumbs
            items={[
              { name: "Accueil", path: "/" },
              { name: "Nos Voitures", path: "/voitures" },
            ]}
          />
          <div className="text-white/80 text-xs uppercase tracking-wider mb-2">
            Notre flotte
          </div>
          <h1 className="serif text-3xl md:text-4xl font-medium text-white leading-tight">
            Trouvez la voiture{" "}
            <em className="not-italic text-[var(--gold2)]">qui vous convient</em>
          </h1>
          <p className="mt-3 text-white/85 max-w-xl">
            Location de voitures à Errachidia : berlines, SUV, 4x4 et pick-up.
            Tous les véhicules listés ci-dessous sont proposés par Location
            Errachidia 47. Contactez-nous pour confirmer la disponibilité.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="wrap">
          {/* Server-rendered list for SEO / no-JS (hidden when JS enhances) */}
          <noscript>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {vehicles.map((v) => (
                <VehicleCard key={v.slug} vehicle={v} />
              ))}
            </div>
          </noscript>

          {/* Client filter/sort — still receives full data SSR */}
          <VehicleGrid vehicles={vehicles} />
        </div>
      </section>
    </>
  );
}
