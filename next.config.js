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
    SITE_URL: process.env.SITE_URL || "https://www.sostegnoallamaternita.com",
  },
}

module.exports = nextConfig
