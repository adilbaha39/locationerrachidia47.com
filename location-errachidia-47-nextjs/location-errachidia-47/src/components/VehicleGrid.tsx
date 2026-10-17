"use client";

import { useMemo, useState } from "react";
import type { Vehicle, VehicleGroup } from "@/data/vehicles";
import { VehicleCard } from "./VehicleCard";
import { IconCar } from "./Icons";

type Filter = "all" | VehicleGroup;
type Sort = "default" | "asc" | "desc" | "name";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "Tous" },
  { id: "eco", label: "Économique" },
  { id: "berline", label: "Berline" },
  { id: "suv", label: "SUV" },
  { id: "luxe", label: "Luxe" },
  { id: "4x4", label: "4x4 & Pick-up" },
];

type Props = {
  vehicles: Vehicle[];
};

/**
 * Client enhancement for filter/sort.
 * All vehicles are still in the initial HTML via the parent server render
 * (noscript fallback + initial list). This component re-orders the visible grid.
 */
export function VehicleGrid({ vehicles }: Props) {
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("default");

  const list = useMemo(() => {
    const result =
      filter === "all"
        ? [...vehicles]
        : vehicles.filter((v) => v.group === filter);
    if (sort === "asc") result.sort((a, b) => a.pricePerDay - b.pricePerDay);
    else if (sort === "desc")
      result.sort((a, b) => b.pricePerDay - a.pricePerDay);
    else if (sort === "name")
      result.sort((a, b) => a.name.localeCompare(b.name, "fr"));
    return result;
  }, [vehicles, filter, sort]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer par catégorie">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`
                inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border rounded-full transition-colors
                ${filter === f.id
                  ? "bg-[var(--gold)] text-white border-[var(--gold)]"
                  : "border-[var(--line)] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--gold)]"}
              `}
              aria-pressed={filter === f.id}
            >
              <IconCar className="w-3.5 h-3.5" aria-hidden />
              {f.label}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm text-[var(--muted)]">
          <span className="sr-only">Trier par</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="border border-[var(--line)] rounded px-3 py-1.5 bg-white text-[var(--ink)]"
          >
            <option value="default">Par défaut</option>
            <option value="asc">Prix croissant</option>
            <option value="desc">Prix décroissant</option>
            <option value="name">Nom (A-Z)</option>
          </select>
        </label>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        aria-live="polite"
      >
        {list.length === 0 ? (
          <p className="col-span-full text-center text-[var(--muted)] py-12">
            Aucun véhicule dans cette catégorie.
          </p>
        ) : (
          list.map((v) => <VehicleCard key={v.slug} vehicle={v} />)
        )}
      </div>
    </div>
  );
}
