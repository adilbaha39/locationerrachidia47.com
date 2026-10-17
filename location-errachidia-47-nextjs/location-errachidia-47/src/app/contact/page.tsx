import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import { whatsappLink } from "@/lib/whatsapp";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm } from "@/components/ContactForm";
import {
  IconPhone,
  IconWhatsApp,
  IconMail,
  IconPin,
  IconClock,
} from "@/components/Icons";

export const metadata = buildMetadata({
  title: "Contact – Agence de location de voitures à Errachidia",
  description:
    "Contactez Location Errachidia 47 pour louer une voiture à Errachidia. Téléphone, WhatsApp et formulaire. Réponse rapide.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-[#e9d3a8] to-[#6b4a30] py-12 md:py-16">
        <div className="wrap">
          <Breadcrumbs
            items={[
              { name: "Accueil", path: "/" },
              { name: "Contact", path: "/contact" },
            ]}
          />
          <div className="text-white/80 text-xs uppercase tracking-wider mb-2">
            Contactez-nous
          </div>
          <h1 className="serif text-3xl md:text-4xl font-medium text-white leading-tight">
            Nous sommes{" "}
            <em className="not-italic text-[var(--gold2)]">à votre écoute</em>
          </h1>
          <p className="mt-3 text-white/85 max-w-xl">
            Une question ? Un besoin spécifique ? Notre équipe est disponible
            pour vous répondre et vous accompagner dans votre réservation.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="wrap grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="serif text-2xl font-medium mb-6">Nos coordonnées</h2>
            <ul className="space-y-5">
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-full border border-[var(--gold)] grid place-items-center shrink-0">
                  <IconPhone className="w-5 h-5 text-[var(--gold)]" aria-hidden />
                </div>
                <div>
                  <b className="block text-sm">Téléphone</b>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="text-[var(--muted)] hover:text-[var(--gold)]"
                  >
                    {siteConfig.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-full border border-[var(--gold)] grid place-items-center shrink-0">
                  <IconWhatsApp
                    className="w-5 h-5 text-[var(--gold)]"
                    aria-hidden
                  />
                </div>
                <div>
                  <b className="block text-sm">WhatsApp</b>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--muted)] hover:text-[var(--gold)]"
                  >
                    {siteConfig.phoneDisplay}
                  </a>
                  <small className="block text-xs text-[var(--muted)]">
                    Réponse pendant les horaires d&apos;ouverture
                  </small>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-full border border-[var(--gold)] grid place-items-center shrink-0">
                  <IconMail className="w-5 h-5 text-[var(--gold)]" aria-hidden />
                </div>
                <div>
                  <b className="block text-sm">Email</b>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-[var(--muted)] hover:text-[var(--gold)] break-all"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-full border border-[var(--gold)] grid place-items-center shrink-0">
                  <IconPin className="w-5 h-5 text-[var(--gold)]" aria-hidden />
                </div>
                <div>
                  <b className="block text-sm">Adresse</b>
                  <p className="text-[var(--muted)]">
                    Errachidia {siteConfig.address.postalCode},{" "}
                    {siteConfig.address.countryName}
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-full border border-[var(--gold)] grid place-items-center shrink-0">
                  <IconClock
                    className="w-5 h-5 text-[var(--gold)]"
                    aria-hidden
                  />
                </div>
                <div>
                  <b className="block text-sm">Horaires</b>
                  <p className="text-[var(--muted)]">
                    {siteConfig.openingHours.display}
                  </p>
                </div>
              </li>
            </ul>

            <div className="mt-8">
              <h3 className="serif text-lg font-medium mb-3">
                Villes couvertes
              </h3>
              <ul className="flex flex-wrap gap-2">
                {siteConfig.areaServed.map((city) => (
                  <li
                    key={city}
                    className="text-xs border border-[var(--line)] px-3 py-1 rounded-full text-[var(--muted)]"
                  >
                    {city}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
