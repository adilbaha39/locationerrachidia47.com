"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { WhatsAppButton } from "./WhatsAppButton";
import { IconMenu, IconClose } from "./Icons";
import { siteConfig } from "@/data/site";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/voitures", label: "Nos Voitures" },
  { href: "/apropos", label: "À Propos" },
  { href: "/conditions", label: "Conditions" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/96 backdrop-blur-sm border-b border-[var(--line)]">
      <div className="wrap flex items-center justify-between h-[78px] gap-5">
        <Link
          href="/"
          className="flex items-center gap-2.5 min-w-[170px]"
          aria-label={siteConfig.name}
        >
          {/* Logo image: add public/images/logo.png */}
          <span className="serif leading-none text-[var(--gold)]">
            <small className="block text-[13px] text-[var(--ink)] font-semibold tracking-wide">
              LOCATION
            </small>
            <b className="text-[22px] tracking-wide">ERRACHIDIA 47</b>
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
            px-6 py-2 md:p-0 gap-0 md:gap-[34px]
            text-sm z-40
          `}
          aria-label="Navigation principale"
        >
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
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
        </nav>

        <div className="hidden md:block">
          <WhatsAppButton />
        </div>

        <button
          type="button"
          className="md:hidden p-2 text-[var(--ink)]"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          aria-controls="main-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <IconClose className="w-6 h-6" />
          ) : (
            <IconMenu className="w-6 h-6" />
          )}
        </button>
      </div>
    </header>
  );
}
