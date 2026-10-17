"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { WhatsAppButton } from "./WhatsAppButton";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { IconMenu, IconClose } from "./Icons";
import { siteConfig } from "@/data/site";
import { localizedPath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/fr";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function Header({ locale, dict }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: localizedPath(locale, "home"), label: dict.nav.home, key: "home" },
    { href: localizedPath(locale, "fleet"), label: dict.nav.fleet, key: "fleet" },
    { href: localizedPath(locale, "about"), label: dict.nav.about, key: "about" },
    { href: localizedPath(locale, "conditions"), label: dict.nav.conditions, key: "conditions" },
    { href: localizedPath(locale, "contact"), label: dict.nav.contact, key: "contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/96 backdrop-blur-sm border-b border-[var(--line)]">
      <div className="wrap flex items-center justify-between h-[78px] gap-3 md:gap-5">
        <Link
          href={localizedPath(locale, "home")}
          className="flex items-center gap-2.5 min-w-[140px]"
          aria-label={siteConfig.name}
        >
          <span className="serif leading-none text-[var(--gold)]">
            <small className="block text-[12px] md:text-[13px] text-[var(--ink)] font-semibold tracking-wide">
              LOCATION
            </small>
            <b className="text-[18px] md:text-[22px] tracking-wide">ERRACHIDIA 47</b>
          </span>
        </Link>

        <nav
          id="main-menu"
          className={`
            ${open ? "flex" : "hidden"}
            md:flex flex-col md:flex-row
            absolute md:static top-[78px] left-0 right-0
            bg-white md:bg-transparent
            border-b md:border-0 border-[var(--line)]
            px-6 py-2 md:p-0 gap-0 md:gap-5 lg:gap-7
            text-sm z-40
          `}
          aria-label={dict.nav.mainNav}
        >
          {navLinks.map((link) => {
            const active =
              link.key === "home"
                ? pathname === `/${locale}` || pathname === `/${locale}/`
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`
                  py-3 md:py-2 border-b-2 transition-colors
                  ${active
                    ? "border-[var(--gold)] text-[var(--gold)]"
                    : "border-transparent hover:border-[var(--gold)] hover:text-[var(--gold)]"}
                `}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="py-3 md:hidden">
            <LanguageSwitcher currentLocale={locale} label={dict.common.language} />
          </div>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher currentLocale={locale} label={dict.common.language} />
          <WhatsAppButton>{dict.nav.bookWhatsApp}</WhatsAppButton>
        </div>

        <button
          type="button"
          className="md:hidden p-2 text-[var(--ink)]"
          aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
          aria-expanded={open}
          aria-controls="main-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IconClose className="w-6 h-6" /> : <IconMenu className="w-6 h-6" />}
        </button>
      </div>
    </header>
  );
}
