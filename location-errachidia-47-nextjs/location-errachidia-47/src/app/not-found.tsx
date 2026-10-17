import Link from "next/link";
import type { Metadata } from "next";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="py-20 text-center">
      <div className="wrap max-w-lg mx-auto">
        <p className="text-[var(--gold)] text-6xl font-serif mb-4">404</p>
        <h1 className="serif text-2xl md:text-3xl font-medium mb-3">
          Page introuvable
        </h1>
        <p className="text-[var(--muted)] mb-8">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-dark">
            Accueil
          </Link>
          <Link href="/voitures" className="btn-line">
            Nos voitures
          </Link>
          <Link href="/contact" className="btn-line">
            Contact
          </Link>
        </div>
        <div className="mt-8">
          <WhatsAppButton>Réserver sur WhatsApp</WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
