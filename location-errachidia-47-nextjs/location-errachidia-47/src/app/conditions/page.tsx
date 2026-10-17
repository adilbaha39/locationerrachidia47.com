import Link from "next/link";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { IconCheck, IconPin, IconPhone } from "@/components/Icons";

export const metadata = buildMetadata({
  title: "Conditions de location – Location Errachidia 47",
  description:
    "Conditions de location de voitures à Errachidia : documents requis, âge minimum, caution, règles importantes. Transparence et clarté.",
  path: "/conditions",
});

export default function ConditionsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-[#e9d3a8] to-[#6b4a30] py-12 md:py-16">
        <div className="wrap">
          <Breadcrumbs
            items={[
              { name: "Accueil", path: "/" },
              { name: "Conditions", path: "/conditions" },
            ]}
          />
          <div className="text-white/80 text-xs uppercase tracking-wider mb-2">
            Conditions de location
          </div>
          <h1 className="serif text-3xl md:text-4xl font-medium text-white leading-tight">
            Location en toute{" "}
            <em className="not-italic text-[var(--gold2)]">transparence</em>
          </h1>
          <p className="mt-3 text-white/85 max-w-xl">
            Pour une expérience sereine et sans surprise, voici les informations
            importantes concernant la location de votre véhicule chez{" "}
            {siteConfig.name}.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="wrap grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <div className="eyebrow text-[var(--gold)]">Documents requis</div>
            <h2 className="serif text-2xl font-medium mt-1 mb-4">
              Pièces à fournir
            </h2>
            <p className="text-[var(--muted)] mb-4">
              Pour finaliser votre réservation, merci de préparer :
            </p>
            <ul className="space-y-3">
              {[
                "Pièce d'identité nationale (CIN) ou passeport",
                "Permis de conduire valide (depuis au moins 1 an)",
                "Justificatif de domicile (facultatif)",
                "Carte bancaire (pour la caution)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <IconCheck
                    className="w-4 h-4 text-[var(--gold)] mt-0.5 shrink-0"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[var(--bg)] border border-[var(--line)] p-6 md:p-8 rounded">
            <div className="eyebrow text-[var(--gold)]">Conditions générales</div>
            <h2 className="serif text-xl font-medium mt-1 mb-4">
              Les conditions de location
            </h2>
            <ol className="space-y-3 text-sm">
              {[
                "Âge minimum : 21 ans",
                "Caution selon le véhicule (bloquée temporairement)",
                "Réservation possible à l'avance",
                "Kilométrage selon contrat",
              ].map((item, i) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[var(--gold)] text-white text-xs grid place-items-center shrink-0 font-medium">
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="py-10 bg-[var(--bg)]">
        <div className="wrap">
          <h2 className="serif text-xl font-medium mb-4">Règles importantes</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {[
              "Respect du code de la route",
              "Interdiction de sortie du territoire sans autorisation",
              "Le véhicule doit être restitué dans le même état",
              "En cas de retard, des frais supplémentaires peuvent s'appliquer",
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
          <p className="mt-6 text-xs text-[var(--muted)]">
            Les détails d&apos;assurance, de franchise et de livraison sont
            confirmés au moment de la réservation. Contactez-nous pour toute
            question.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="wrap grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="serif text-2xl font-medium mb-3">
              Nos villes couvertes
            </h2>
            <p className="text-[var(--muted)] mb-4">
              Nous desservons la région de Drâa-Tafilalet et ses environs.
            </p>
            <ul className="space-y-2">
              {siteConfig.areaServed.map((city) => (
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
          <div className="bg-[var(--bg)] border border-[var(--line)] p-6 rounded text-center">
            <h3 className="serif text-xl font-medium mb-2">
              Besoin d&apos;informations ?
            </h3>
            <p className="text-sm text-[var(--muted)] mb-4">
              Notre équipe vous répond pendant les horaires d&apos;ouverture (
              {siteConfig.openingHours.display}).
            </p>
            <WhatsAppButton>Contacter sur WhatsApp</WhatsAppButton>
            <p className="mt-4 flex items-center justify-center gap-2 text-sm">
              <IconPhone className="w-4 h-4 text-[var(--gold)]" aria-hidden />
              <a
                href={`tel:${siteConfig.phone}`}
                className="hover:text-[var(--gold)]"
              >
                {siteConfig.phoneDisplay}
              </a>
            </p>
            <Link
              href="/voitures"
              className="inline-block mt-4 text-sm text-[var(--gold)] hover:underline"
            >
              Découvrir notre flotte →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
