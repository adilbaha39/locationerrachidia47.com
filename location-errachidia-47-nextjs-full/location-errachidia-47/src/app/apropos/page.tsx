import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import {
  IconCar,
  IconWhatsApp,
  IconPin,
  IconShield,
} from "@/components/Icons";

export const metadata = buildMetadata({
  title: "À propos – Agence de location de voitures à Errachidia",
  description:
    "Location Errachidia 47 est une agence locale de location de voitures à Errachidia. Découvrez notre histoire et nos services.",
  path: "/apropos",
});

export default function AproposPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-[#e9d3a8] to-[#6b4a30] py-12 md:py-16">
        <div className="wrap">
          <Breadcrumbs
            items={[
              { name: "Accueil", path: "/" },
              { name: "À Propos", path: "/apropos" },
            ]}
          />
          <div className="text-white/80 text-xs uppercase tracking-wider mb-2">
            À propos
          </div>
          <h1 className="serif text-3xl md:text-4xl font-medium text-white leading-tight max-w-2xl">
            Plus qu&apos;une agence,{" "}
            <em className="not-italic text-[var(--gold2)]">
              une expérience de voyage.
            </em>
          </h1>
          <p className="mt-3 text-white/85 max-w-xl">
            Location Errachidia 47 est votre partenaire local pour la location
            de voitures à Errachidia. Véhicules adaptés à tous vos besoins, avec
            un service professionnel et personnalisé.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="wrap grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="eyebrow text-[var(--gold)]">Notre histoire</div>
            <h2 className="serif text-2xl md:text-3xl font-medium mt-1 mb-4">
              Une agence locale, au service de votre mobilité
            </h2>
            <p className="text-[var(--muted)] leading-relaxed mb-4">
              Créée à Errachidia, Location Errachidia 47 est née d&apos;une
              passion pour la route et d&apos;un engagement envers nos clients.
              Notre objectif : vous offrir une expérience de location simple et
              agréable, que ce soit pour un court séjour, un voyage
              d&apos;affaires ou une aventure dans le sud marocain.
            </p>
            <p className="text-[var(--muted)] leading-relaxed">
              Nous proposons des véhicules économiques, des SUV, des 4x4 et des
              modèles plus confortables pour explorer Errachidia, Merzouga,
              Rissani et toute la région du Tafilalet.
            </p>
          </div>
          <div className="aspect-[4/3] img-placeholder rounded border border-[var(--line)]">
            <span>
              Photo de l&apos;agence
              <br />
              <span className="text-xs">Ajoutez /images/agence.jpg</span>
            </span>
          </div>
        </div>
      </section>

      <section className="py-12 bg-[var(--bg)] border-y border-[var(--line)]">
        <div className="wrap">
          <div className="eyebrow text-[var(--gold)]">Nos services</div>
          <h2 className="serif text-2xl font-medium mt-1 mb-8">
            Tout ce dont vous avez besoin
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: IconCar,
                title: "Location courte & longue durée",
                desc: "Selon vos besoins de voyage",
              },
              {
                icon: IconWhatsApp,
                title: "Réservation WhatsApp",
                desc: "Rapide et sans complication",
              },
              {
                icon: IconPin,
                title: "Couverture régionale",
                desc: "Errachidia, Merzouga, Tafilalet…",
              },
              {
                icon: IconShield,
                title: "Service personnalisé",
                desc: "Accompagnement local",
              },
            ].map((s) => (
              <div
                key={s.title}
                className="bg-white border border-[var(--line)] p-5 rounded"
              >
                <s.icon
                  className="w-10 h-10 text-[var(--gold)] mb-3"
                  aria-hidden
                />
                <b className="block text-sm font-medium">{s.title}</b>
                <small className="text-xs text-[var(--muted)]">{s.desc}</small>
              </div>
            ))}
          </div>
          {/* Note: claims like "assurance incluse", "24/7", "livraison aéroport"
              were removed pending owner confirmation. */}
        </div>
      </section>

      <section className="py-14 text-center">
        <div className="wrap max-w-xl mx-auto">
          <h2 className="serif text-2xl font-medium mb-3">
            Prêt à prendre la route ?
          </h2>
          <p className="text-[var(--muted)] mb-6">
            Contactez-nous pour réserver votre véhicule à Errachidia.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <WhatsAppButton showArrow>Réserver sur WhatsApp</WhatsAppButton>
            <Link href="/voitures" className="btn-line">
              Voir la flotte
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
