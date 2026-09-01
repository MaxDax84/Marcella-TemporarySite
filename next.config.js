const { posts } = require("./data/posts")

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // "x-default" is a sentinel locale that no page ever targets. Without it,
  // Next.js treats "it" (our real default) and its unprefixed form as the
  // same route, which makes it impossible for middleware to reliably force
  // an explicit /it prefix (see middleware.js). Using an unused sentinel as
  // defaultLocale keeps both "it" and "en" always-prefixed and distinguishable.
  i18n: {
    locales: ["x-default", "it", "en"],
    defaultLocale: "x-default",
    localeDetection: false,
  },
  env: {
    SITE_URL: process.env.SITE_URL || "https://www.maternita360.it",
  },
  async redirects() {
    // Il vecchio sito WordPress su maternita360.it pubblicava ogni articolo
    // come URL piatto sulla root, es. https://maternita360.it/epigenetica-e-gravidanza/
    // (nessun prefisso di categoria). Ricreiamo qui quel redirect per ogni
    // articolo già migrato in data/posts.js, per non perdere l'indicizzazione
    // storica nel momento in cui il dominio punta a questo sito.
    const legacyPostRedirects = posts.map((post) => ({
      source: `/${post.slug}`,
      destination: `/it/blog/${post.slug}`,
      permanent: true,
    }))

    // Il vecchio WordPress aveva anche pagine di archivio (categorie, tag,
    // autori, paginazione) che questo sito non replica come pagine dedicate.
    // Senza questi redirect, quegli URL storici (spesso indicizzati da anni)
    // risponderebbero 404 invece di atterrare su una pagina reale.
    const legacyArchiveRedirects = [
      "/category/:path*",
      "/it/category/:path*",
      "/en/category/:path*",
      "/tag/:path*",
      "/it/tag/:path*",
      "/en/tag/:path*",
      "/author/:path*",
      "/it/author/:path*",
      "/en/author/:path*",
      "/page/:path*",
    ].map((source) => ({
      source,
      destination: "/it/blog",
      permanent: true,
    }))

    return [...legacyPostRedirects, ...legacyArchiveRedirects]
  },
}

module.exports = nextConfig
