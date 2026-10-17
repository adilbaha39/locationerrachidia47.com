import { whatsappLink } from "@/lib/whatsapp";
import { IconWhatsApp, IconArrow } from "./Icons";

type Props = {
  message?: string;
  children?: React.ReactNode;
  variant?: "gold" | "dark" | "line";
  className?: string;
  showArrow?: boolean;
};

/**
 * Server-compatible WhatsApp CTA.
 * Renders a plain <a> so it works without JavaScript.
 */
export function WhatsAppButton({
  message,
  children = "Réserver sur WhatsApp",
  variant = "gold",
  className = "",
  showArrow = false,
}: Props) {
  const href = whatsappLink(message);
  const base =
    variant === "dark"
      ? "btn-dark"
      : variant === "line"
        ? "btn-line"
        : "btn-wa";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${className}`}
    >
      <IconWhatsApp className="w-5 h-5" aria-hidden />
      <span>{children}</span>
      {showArrow && <IconArrow className="w-4 h-4" aria-hidden />}
    </a>
  );
}
