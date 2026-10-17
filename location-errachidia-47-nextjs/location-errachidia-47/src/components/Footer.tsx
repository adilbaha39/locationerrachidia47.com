import Link from "next/link";
import { siteConfig } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import { localizedPath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/fr";
import { IconPhone, IconWhatsApp, IconMail, IconPin } from "./Icons";

type Props = { locale: Locale; dict: Dictionary };

export function Footer({ locale, dict }: Props) {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[var(--bg)] border-t-2 border-[var(--gold2)] pt-10 pb-0">
      <div className="wrap">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-7 items-start">
          <div>
            <div className="serif leading-none text-[var(--gold)]">
              <small className="block text-[13px] text-[var(--ink)] font-semibold">LOCATION</small>
              <b className="text-[22px]">ERRACHIDIA 47</b>
            </div>
            <p className="text-[13px] mt-2 text-[var(--muted)]">{dict.footer.tagline}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-[var(--gold)] mb-3">{dict.footer.quickLinks}</h4>
            <ul className="space-y-1.5 text-[12.5px] text-[#4a4338]">
              <li><Link href={localizedPath(locale, "home")} className="hover:text-[var(--gold)]">{dict.nav.home}</Link></li>
              <li><Link href={localizedPath(locale, "fleet")} className="hover:text-[var(--gold)]">{dict.nav.fleet}</Link></li>
              <li><Link href={localizedPath(locale, "about")} className="hover:text-[var(--gold)]">{dict.nav.about}</Link></li>
              <li><Link href={localizedPath(locale, "conditions")} className="hover:text-[var(--gold)]">{dict.nav.conditions}</Link></li>
              <li><Link href={localizedPath(locale, "contact")} className="hover:text-[var(--gold)]">{dict.nav.contact}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-[var(--gold)] mb-3">{dict.footer.services}</h4>
            <ul className="space-y-1.5 text-[12.5px] text-[#4a4338]">
              {dict.footer.serviceList.map((s) => (<li key={s}>{s}</li>))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-[var(--gold)] mb-3">{dict.footer.contactUs}</h4>
            <ul className="space-y-2 text-[12.5px] text-[#4a4338]">
              <li className="flex items-center gap-2">
                <IconPhone className="w-4 h-4 text-[var(--gold)]" aria-hidden />
                <a href={`tel:${siteConfig.phone}`} className="hover:text-[var(--gold)]">{siteConfig.phoneDisplay}</a>
              </li>
              <li className="flex items-center gap-2">
                <IconWhatsApp className="w-4 h-4 text-[var(--gold)]" aria-hidden />
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--gold)]">{siteConfig.phoneDisplay}</a>
              </li>
              <li className="flex items-center gap-2">
                <IconMail className="w-4 h-4 text-[var(--gold)]" aria-hidden />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-[var(--gold)] break-all">{siteConfig.email}</a>
              </li>
              <li className="flex items-center gap-2">
                <IconPin className="w-4 h-4 text-[var(--gold)]" aria-hidden />
                <span>{siteConfig.address.locality} {siteConfig.address.postalCode}, {siteConfig.address.countryName}</span>
              </li>
            </ul>
          </div>
          <div className="text-center text-[var(--gold)]">
            <div className="serif italic text-[30px]">Errachidia</div>
            <small className="block text-[var(--ink)] text-[13px]">{dict.footer.south}</small>
          </div>
        </div>
        <div className="mt-8 border-t border-[var(--line)] py-4 flex flex-wrap justify-between gap-2 text-[11.5px] text-[var(--muted)]">
          <span>© {year} {siteConfig.name}. {dict.footer.rights}</span>
          <span className="space-x-2">
            <Link href={localizedPath(locale, "conditions")} className="hover:text-[var(--gold)]">{dict.nav.conditions}</Link>
            <span>|</span>
            <Link href={localizedPath(locale, "contact")} className="hover:text-[var(--gold)]">{dict.nav.contact}</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
