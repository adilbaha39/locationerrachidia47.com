/**
 * Vehicle fleet data for Location Errachidia 47
 * Prices and specs taken from the original static website.
 * Do not invent new vehicles or change prices without confirmation.
 */

export type VehicleCategory =
  | "Économique"
  | "Berline"
  | "SUV"
  | "Luxe"
  | "4x4"
  | "Pick-up";

export type VehicleGroup = "eco" | "berline" | "suv" | "luxe" | "4x4";

export type Vehicle = {
  slug: string;
  name: string;
  brand: string;
  model: string;
  category: VehicleCategory;
  group: VehicleGroup;
  year: number;
  transmission: "Auto" | "Manuelle";
  fuel: "Diesel" | "Essence";
  seats: number;
  pricePerDay: number;
  currency: "MAD";
  /** Relative path under /images/ — file may be missing until owner adds it */
  image: string;
  description: string;
  available?: boolean;
};

export const vehicles: Vehicle[] = [
  {
    slug: "volkswagen-golf-8",
    name: "Volkswagen Golf 8",
    brand: "Volkswagen",
    model: "Golf 8",
    category: "Économique",
    group: "eco",
    year: 2022,
    transmission: "Auto",
    fuel: "Diesel",
    seats: 5,
    pricePerDay: 900,
    currency: "MAD",
    image: "/images/golf.jpg",
    description:
      "Volkswagen Golf 8 automatique diesel, idéale pour les trajets en ville et sur route à Errachidia. Compacte, économique et confortable pour 5 personnes.",
  },
  {
    slug: "mercedes-classe-e",
    name: "Mercedes Classe E",
    brand: "Mercedes-Benz",
    model: "Classe E",
    category: "Luxe",
    group: "luxe",
    year: 2021,
    transmission: "Auto",
    fuel: "Diesel",
    seats: 5,
    pricePerDay: 1200,
    currency: "MAD",
    image: "/images/classe-e.jpg",
    description:
      "Mercedes Classe E 2021, berline premium automatique diesel. Confort et élégance pour vos déplacements professionnels ou voyages dans le Sud marocain.",
  },
  {
    slug: "ford-raptor",
    name: "Ford Raptor",
    brand: "Ford",
    model: "Raptor",
    category: "SUV",
    group: "suv",
    year: 2023,
    transmission: "Auto",
    fuel: "Essence",
    seats: 5,
    pricePerDay: 1500,
    currency: "MAD",
    image: "/images/raptor.jpg",
    description:
      "Ford Raptor 2023, SUV performant adapté aux routes et pistes de la région d'Errachidia et Merzouga. Puissance et polyvalence pour vos aventures.",
  },
  {
    slug: "kia-sportage",
    name: "Kia Sportage",
    brand: "Kia",
    model: "Sportage",
    category: "SUV",
    group: "suv",
    year: 2023,
    transmission: "Auto",
    fuel: "Diesel",
    seats: 5,
    pricePerDay: 600,
    currency: "MAD",
    image: "/images/sportage.jpg",
    description:
      "Kia Sportage 2023 automatique diesel. SUV spacieux et économique, parfait pour explorer Errachidia, Rissani et les environs.",
  },
  {
    slug: "audi-a3",
    name: "Audi A3",
    brand: "Audi",
    model: "A3",
    category: "Berline",
    group: "berline",
    year: 2021,
    transmission: "Auto",
    fuel: "Essence",
    seats: 5,
    pricePerDay: 800,
    currency: "MAD",
    image: "/images/audi.jpg",
    description:
      "Audi A3 2021, berline compacte automatique essence. Style et agrément de conduite pour vos déplacements à Errachidia et dans la région.",
  },
  {
    slug: "range-rover-evoque",
    name: "Range Rover Evoque",
    brand: "Land Rover",
    model: "Range Rover Evoque",
    category: "Luxe",
    group: "luxe",
    year: 2022,
    transmission: "Auto",
    fuel: "Diesel",
    seats: 5,
    pricePerDay: 1800,
    currency: "MAD",
    image: "/images/evoque.jpg",
    description:
      "Range Rover Evoque 2022, SUV de luxe automatique diesel. Prestige et confort pour découvrir le Sud marocain avec élégance.",
  },
  {
    slug: "mercedes-gle",
    name: "Mercedes GLE",
    brand: "Mercedes-Benz",
    model: "GLE",
    category: "SUV",
    group: "suv",
    year: 2021,
    transmission: "Auto",
    fuel: "Diesel",
    seats: 7,
    pricePerDay: 1600,
    currency: "MAD",
    image: "/images/gle.jpg",
    description:
      "Mercedes GLE 2021, grand SUV 7 places automatique diesel. Idéal pour les familles ou les groupes voyageant vers Merzouga et le Tafilalet.",
  },
  {
    slug: "dacia-duster",
    name: "Dacia Duster",
    brand: "Dacia",
    model: "Duster",
    category: "4x4",
    group: "4x4",
    year: 2022,
    transmission: "Manuelle",
    fuel: "Diesel",
    seats: 5,
    pricePerDay: 450,
    currency: "MAD",
    image: "/images/duster.jpg",
    description:
      "Dacia Duster 2022 manuelle diesel. 4x4 robuste et économique, adapté aux pistes et routes de la région d'Errachidia.",
  },
  {
    slug: "toyota-hilux",
    name: "Toyota Hilux",
    brand: "Toyota",
    model: "Hilux",
    category: "Pick-up",
    group: "4x4",
    year: 2021,
    transmission: "Manuelle",
    fuel: "Diesel",
    seats: 5,
    pricePerDay: 700,
    currency: "MAD",
    image: "/images/hilux.jpg",
    description:
      "Toyota Hilux 2021, pick-up manuelle diesel. Fiabilité et polyvalence pour le transport et les trajets tout-terrain autour d'Errachidia.",
  },
];

export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return vehicles.find((v) => v.slug === slug);
}

export function getAllVehicleSlugs(): string[] {
  return vehicles.map((v) => v.slug);
}

export function formatPrice(price: number): string {
  return price.toLocaleString("fr-FR");
}
