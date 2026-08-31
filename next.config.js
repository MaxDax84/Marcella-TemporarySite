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

    return legacyPostRedirects
  },
}

module.exports = nextConfig
