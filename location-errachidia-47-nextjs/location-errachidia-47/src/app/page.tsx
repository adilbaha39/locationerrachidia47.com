import Link from "next/link";
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

export const metadata = buildMetadata({
  title: "Location de voitures à Errachidia | Location Errachidia 47",
  description:
    "Louez une voiture à Errachidia avec Location Errachidia 47. Berlines, SUV et 4x4, réservation rapide par WhatsApp et service local.",
  path: "/",
});

const featured = vehicles.slice(0, 5);

export default function HomePage() {
  return (
    <>
      <section className="relative bg-gradient-to-br from-[#e9d3a8] to-[#6b4a30] min-h-[420px] md:min-h-[520px] flex items-center">
        <div className="wrap py-12 md:py-16 w-full">
          <div className="max-w-xl bg-white/95 p-8 md:p-10 shadow-lg">
            <div className="eyebrow mb-2">LOCATION ERRACHIDIA 47</div>
            <h1 className="serif text-3xl md:text-4xl lg:text-[42px] font-medium leading-tight mb-4">
              Location de voitures à{" "}
              <em className="text-[var(--gold)] not-italic">Errachidia</em>
            </h1>
            <p className="text-[var(--muted)] mb-6 leading-relaxed">
              Agence de location de voitures à Errachidia. Véhicules fiables,
              confortables et adaptés à tous vos trajets — ville, désert ou
              excursion vers Merzouga.
            </p>
            <div className="flex flex-wrap gap-3">
              <WhatsAppButton showArrow>Réserver sur WhatsApp</WhatsAppButton>
              <Link href="/voitures" className="btn-line">
                Voir la flotte
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 text-white/90 text-sm md:text-lg flex items-center gap-2">
          <IconPin className="w-5 h-5" aria-hidden />
          <span>
            Errachidia
            <br />
            <span className="text-xs opacity-80">
              Votre destination, notre priorité
            </span>
          </span>
        </div>
      </section>

      <section className="py-14" id="voitures">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <div className="eyebrow">NOTRE FLOTTE</div>
              <h2 className="serif text-2xl md:text-3xl font-medium mt-1">
                Des véhicules pour chaque voyage
              </h2>
            </div>
            <Link
              href="/voitures"
              className="text-sm text-[var(--gold)] hover:underline flex items-center gap-1"
            >
              Voir toute la flotte →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {featured.map((v) => (
              <VehicleCard key={v.slug} vehicle={v} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-[var(--bg)] border-y-2 border-[var(--gold2)]">
        <div className="wrap grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4">
            <IconCar className="w-12 h-12 text-[var(--gold)] shrink-0" aria-hidden />
            <div>
              <b className="block text-sm font-medium">Flotte variée</b>
              <small className="text-xs text-[var(--muted)]">
                Économique, SUV, 4x4 et luxe
              </small>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <IconWhatsApp className="w-12 h-12 text-[var(--gold)] shrink-0" aria-hidden />
            <div>
              <b className="block text-sm font-medium">Réservation WhatsApp</b>
              <small className="text-xs text-[var(--muted)]">
                Simple et rapide
              </small>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <IconPin className="w-12 h-12 text-[var(--gold)] shrink-0" aria-hidden />
            <div>
              <b className="block text-sm font-medium">Agence locale</b>
              <small className="text-xs text-[var(--muted)]">
                Basée à Errachidia
              </small>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <IconShield className="w-12 h-12 text-[var(--gold)] shrink-0" aria-hidden />
            <div>
              <b className="block text-sm font-medium">Service personnalisé</b>
              <small className="text-xs text-[var(--muted)]">
                Accompagnement sur mesure
              </small>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="wrap">
          <div className="eyebrow text-[var(--gold)]">RÉSERVATION FACILE</div>
          <h2 className="serif text-2xl md:text-3xl font-medium mt-1 mb-8">
            En 3 étapes seulement
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                n: "01",
                title: "Choisissez votre voiture",
                desc: "Parmi notre flotte à Errachidia",
                icon: IconCar,
              },
              {
                n: "02",
                title: "Indiquez vos dates",
                desc: "De prise et de retour",
                icon: IconCalendar,
              },
              {
                n: "03",
                title: "Réservez sur WhatsApp",
                desc: "Rapide et simple",
                icon: IconWhatsApp,
              },
            ].map((s) => (
              <div
                key={s.n}
                className="step-shape flex items-center gap-5 px-7 py-6 min-h-[118px]"
              >
                <s.icon
                  className="w-10 h-10 text-[var(--gold)] shrink-0"
                  aria-hidden
                />
                <div>
                  <div className="text-[var(--gold)] text-xs font-medium">
                    {s.n}
                  </div>
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
            <div className="eyebrow">NOS VILLES</div>
            <h3 className="serif text-xl font-medium mt-1 mb-4">
              Nous couvrons toute la région
            </h3>
            <ul className="space-y-2">
              {siteConfig.areaServed.slice(0, 4).map((city) => (
                <li key={city} className="flex items-center gap-2 text-sm">
                  <IconPin
                    className="w-4 h-4 text-[var(--gold)]"
                    aria-hidden
                  />
                  {city}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="serif text-xl font-medium mb-4">
              Conditions de location
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                "Permis de conduire valide",
                "Âge minimum : 21 ans",
                "Caution selon le véhicule",
                "Réservation possible à l'avance",
                "Kilométrage selon contrat",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <IconCheck
                    className="w-4 h-4 text-[var(--gold)] mt-0.5 shrink-0"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/conditions"
              className="inline-block mt-4 text-sm text-[var(--gold)] hover:underline"
            >
              Voir toutes les conditions →
            </Link>
          </div>
          <div>
            <h3 className="serif text-xl font-medium mb-4">Contactez-nous</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <IconPhone
                  className="w-4 h-4 text-[var(--gold)]"
                  aria-hidden
                />
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="hover:text-[var(--gold)]"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <IconWhatsApp
                  className="w-4 h-4 text-[var(--gold)]"
                  aria-hidden
                />
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
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-[var(--gold)] break-all"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <IconPin className="w-4 h-4 text-[var(--gold)]" aria-hidden />
                Errachidia 52000, Maroc
              </li>
            </ul>
            <p className="mt-3 text-xs text-[var(--muted)]">
              Horaires : {siteConfig.openingHours.display}
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 text-center">
        <div className="wrap max-w-2xl mx-auto">
          <h2 className="serif text-2xl md:text-3xl font-medium mb-3">
            Prêt à prendre la route ?
          </h2>
          <p className="text-[var(--muted)] mb-6">
            Contactez Location Errachidia 47 pour réserver votre voiture à
            Errachidia. Réponse rapide sur WhatsApp.
          </p>
          <WhatsAppButton showArrow variant="dark">
            Réserver maintenant
          </WhatsAppButton>
        </div>
      </section>
    </>
  );
}
