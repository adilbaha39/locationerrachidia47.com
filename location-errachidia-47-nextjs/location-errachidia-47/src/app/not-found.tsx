import Link from "next/link";
import type { Metadata } from "next";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "404",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <html lang="fr">
      <body className="antialiased font-sans">
        <section className="py-20 text-center min-h-screen flex items-center justify-center">
          <div className="max-w-lg mx-auto px-6">
            <p className="text-[#b9852b] text-6xl font-serif mb-4">404</p>
            <h1 className="text-2xl md:text-3xl font-medium mb-3">Page introuvable / Page not found / الصفحة غير موجودة</h1>
            <p className="text-[#6d6558] mb-8">The page does not exist.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/fr" className="inline-flex px-6 py-3 bg-[#1a1612] text-white text-sm">Français</Link>
              <Link href="/en" className="inline-flex px-6 py-3 border border-[#b9852b] text-[#b9852b] text-sm">English</Link>
              <Link href="/ar" className="inline-flex px-6 py-3 border border-[#b9852b] text-[#b9852b] text-sm">العربية</Link>
            </div>
            <div className="mt-8">
              <WhatsAppButton>WhatsApp</WhatsAppButton>
            </div>
          </div>
        </section>
      </body>
    </html>
  );
}
