import { siteConfig } from "@/data/site";
import type { Vehicle } from "@/data/vehicles";
import { formatPrice } from "@/data/vehicles";

const WA_NUMBER = siteConfig.whatsapp;

/**
 * Build a WhatsApp wa.me link.
 * Always open in a new tab with rel="noopener noreferrer".
 */
export function whatsappLink(message?: string): string {
  const text = message || "Bonjour, je souhaite réserver une voiture à Errachidia.";
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * Pre-filled booking message for a specific vehicle.
 */
export function vehicleBookingMessage(vehicle: Vehicle): string {
  return `Bonjour, je souhaite réserver la ${vehicle.name} ${vehicle.year} à Errachidia (${formatPrice(vehicle.pricePerDay)} DH/jour). Merci de me confirmer la disponibilité et le prix.`;
}

export function vehicleWhatsAppLink(vehicle: Vehicle): string {
  return whatsappLink(vehicleBookingMessage(vehicle));
}

/**
 * Build WhatsApp message from contact form data.
 */
export function contactFormMessage(data: {
  name: string;
  phone: string;
  email?: string;
  subject?: string;
  message: string;
}): string {
  const parts = [
    `Bonjour, je vous contacte via le site Location Errachidia 47.`,
    ``,
    `Nom : ${data.name}`,
    `Téléphone : ${data.phone}`,
  ];
  if (data.email) parts.push(`Email : ${data.email}`);
  if (data.subject) parts.push(`Sujet : ${data.subject}`);
  parts.push(``, `Message :`, data.message);
  return parts.join("\n");
}
