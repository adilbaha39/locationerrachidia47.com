import { notFound } from "next/navigation";
import { Playfair_Display, Poppins, Noto_Sans_Arabic } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessJsonLd, websiteJsonLd } from "@/lib/seo";
import { SITE_URL, siteConfig } from "@/data/site";
import {
  locales,
  isValidLocale,
  localeHtmlLang,
  localeDirection,
  type Locale,
} from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import "@/styles/globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  variable: "--font-arabic",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);
  const dir = localeDirection[locale];

  return (
    <html
      lang={localeHtmlLang[locale]}
      dir={dir}
      className={`${playfair.variable} ${poppins.variable} ${notoArabic.variable}`}
    >
      <body
        className="antialiased"
        style={{
          fontFamily:
            locale === "ar"
              ? "var(--font-arabic), system-ui, sans-serif"
              : "var(--font-poppins), system-ui, sans-serif",
        }}
      >
        <JsonLd data={localBusinessJsonLd(locale)} />
        <JsonLd data={websiteJsonLd()} />
        <Header locale={locale} dict={dict} />
        <main>{children}</main>
        <Footer locale={locale} dict={dict} />
      </body>
    </html>
  );
}
