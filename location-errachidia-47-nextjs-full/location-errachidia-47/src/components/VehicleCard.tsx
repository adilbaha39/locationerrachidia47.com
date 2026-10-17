import Link from "next/link";
import type { Vehicle } from "@/data/vehicles";
import { formatPrice } from "@/data/vehicles";
import { vehicleWhatsAppLink } from "@/lib/whatsapp";
import { IconGear, IconFuel, IconUser, IconArrow, IconWhatsApp } from "./Icons";

type Props = {
  vehicle: Vehicle;
  /** When true, card links to detail page; WhatsApp is secondary CTA */
  linkToDetail?: boolean;
};

/**
 * Server-rendered vehicle card.
 * Name, price, specs and link are in the initial HTML.
 */
export function VehicleCard({ vehicle, linkToDetail = true }: Props) {
  const detailHref = `/voitures/${vehicle.slug}`;
  const waHref = vehicleWhatsAppLink(vehicle);

  const content = (
    <>
      <div className="aspect-[4/3.3] img-placeholder relative overflow-hidden">
        {/* Owner must add image at public{vehicle.image} */}
        <span className="text-[var(--muted)] text-sm px-3">
          {vehicle.name}
        </span>
        <span className="absolute top-2 left-2 bg-[var(--gold)] text-white text-[10px] uppercase tracking-wider px-2 py-0.5 font-medium">
          {vehicle.category}
        </span>
      </div>
      <div className="p-4 relative flex-1 flex flex-col">
        <div className="text-[10px] tracking-wider uppercase text-[var(--gold)] font-medium">
          {vehicle.category}
        </div>
        <h3 className="text-[15px] font-medium mt-0.5">{vehicle.name}</h3>
        <div className="text-xs text-[var(--muted)] mb-2.5">{vehicle.year}</div>
        <div className="flex flex-wrap gap-3 text-[11px] text-[var(--muted)] mb-3.5">
          <span className="flex items-center gap-1">
            <IconGear className="w-3.5 h-3.5" aria-hidden />
            {vehicle.transmission}
          </span>
          <span className="flex items-center gap-1">
            <IconFuel className="w-3.5 h-3.5" aria-hidden />
            {vehicle.fuel}
          </span>
          <span className="flex items-center gap-1">
            <IconUser className="w-3.5 h-3.5" aria-hidden />
            {vehicle.seats}
          </span>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div className="serif text-[22px] text-[var(--gold)] font-semibold">
            {formatPrice(vehicle.pricePerDay)}{" "}
            <span className="font-sans text-xs text-[var(--muted)] font-normal">
              DH /jour
            </span>
          </div>
          <span
            className="w-7 h-7 border-[1.5px] border-[var(--gold)] rounded-full grid place-items-center text-[var(--gold)]"
            aria-hidden
          >
            <IconArrow className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </>
  );

  if (linkToDetail) {
    return (
      <article className="car-card">
        <Link href={detailHref} className="flex flex-col flex-1">
          {content}
        </Link>
        <div className="px-4 pb-4">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2 text-sm border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-white transition-colors"
          >
            <IconWhatsApp className="w-4 h-4" aria-hidden />
            Réserver
          </a>
        </div>
      </article>
    );
  }

  return (
    <a
      href={waHref}
      target="_blank"
      rel="noopener noreferrer"
      className="car-card"
    >
      {content}
    </a>
  );
}
