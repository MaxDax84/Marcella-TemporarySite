import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CookieBanner from "./CookieBanner";
import { ui } from "../data/i18n";

const SITE_URL = process.env.SITE_URL || "";
const LOCALES = ["it", "en"];

export default function Layout({ children, title, description, keywords, canonicalPath, jsonLd, noIndex }) {
  const { locale } = useRouter();
  const t = ui[locale] || ui.it;

  const siteTitle = title
    ? `${title} | Sostegno Maternità`
    : t.layout.defaultTitle;

  const siteDesc = description || t.layout.defaultDescription;

  const path = canonicalPath === "/" ? "" : canonicalPath;
  const canonical = canonicalPath ? `${SITE_URL}/${locale}${path}` : null;

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDesc} />
        {keywords && <meta name="keywords" content={keywords} />}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={t.layout.ogLocale} />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        {canonical && <meta property="og:url" content={canonical} />}
        {canonical && <link rel="canonical" href={canonical} />}
        {canonicalPath &&
          LOCALES.map((loc) => (
            <link
              key={loc}
              rel="alternate"
              hrefLang={loc}
              href={`${SITE_URL}/${loc}${path}`}
            />
          ))}
        {canonicalPath && (
          <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/it${path}`} />
        )}
        <meta name="robots" content={noIndex ? "noindex, follow" : "index, follow"} />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#2D5A82" />
        {jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}
      </Head>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <CookieBanner />
    </>
  );
}
