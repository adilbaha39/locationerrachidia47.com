"use client";

import { useMemo, useState } from "react";
import type { Vehicle, VehicleGroup } from "@/data/vehicles";
import { VehicleCard } from "./VehicleCard";
import { IconCar } from "./Icons";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/fr";

type Filter = "all" | VehicleGroup;
type Sort = "default" | "asc" | "desc" | "name";

type Props = {
  vehicles: Vehicle[];
  locale: Locale;
  dict: Dictionary;
};

export function VehicleGrid({ vehicles, locale, dict }: Props) {
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("default");

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: dict.fleet.filterAll },
    { id: "eco", label: dict.fleet.filterEco },
    { id: "berline", label: dict.fleet.filterSedan },
    { id: "suv", label: dict.fleet.filterSuv },
    { id: "luxe", label: dict.fleet.filterLuxury },
    { id: "4x4", label: dict.fleet.filter4x4 },
  ];

  const list = useMemo(() => {
    const result =
      filter === "all"
        ? [...vehicles]
        : vehicles.filter((v) => v.group === filter);
    if (sort === "asc") result.sort((a, b) => a.pricePerDay - b.pricePerDay);
    else if (sort === "desc") result.sort((a, b) => b.pricePerDay - a.pricePerDay);
    else if (sort === "name") result.sort((a, b) => a.name.localeCompare(b.name, locale));
    return result;
  }, [vehicles, filter, sort, locale]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-2" role="group" aria-label={dict.fleet.filterLabel}>
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border rounded-full transition-colors
                ${filter === f.id
                  ? "bg-[var(--gold)] text-white border-[var(--gold)]"
                  : "border-[var(--line)] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--gold)]"}`}
              aria-pressed={filter === f.id}
            >
              <IconCar className="w-3.5 h-3.5" aria-hidden />
              {f.label}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm text-[var(--muted)]">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="border border-[var(--line)] rounded px-3 py-1.5 bg-white text-[var(--ink)]"
          >
            <option value="default">{dict.fleet.sortDefault}</option>
            <option value="asc">{dict.fleet.sortAsc}</option>
            <option value="desc">{dict.fleet.sortDesc}</option>
            <option value="name">{dict.fleet.sortName}</option>
          </select>
        </label>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" aria-live="polite">
        {list.length === 0 ? (
          <p className="col-span-full text-center text-[var(--muted)] py-12">{dict.fleet.empty}</p>
        ) : (
          list.map((v) => (
            <VehicleCard key={v.slug} vehicle={v} locale={locale} dict={dict} />
          ))
        )}
      </div>
    </div>
  );
}
