import { posts } from "../data/posts";
import { teamMembers } from "../data/team";

const SITE_URL = process.env.SITE_URL || "https://www.maternita360.it";
const LOCALES = ["it", "en"];

const ITALIAN_MONTHS = {
  gennaio: "01", febbraio: "02", marzo: "03", aprile: "04",
  maggio: "05", giugno: "06", luglio: "07", agosto: "08",
  settembre: "09", ottobre: "10", novembre: "11", dicembre: "12",
};

// Converte una data italiana tipo "18 agosto 2019" in "2019-08-18" (ISO,
// richiesto dal tag <lastmod> della sitemap). Ritorna null se non riconosciuta,
// così l'URL viene pubblicata senza <lastmod> invece che con una data inventata.
function toIsoDate(italianDate) {
  if (!italianDate) return null;
  const match = italianDate.trim().match(/^(\d{1,2})\s+([a-zàèìòù]+)\s+(\d{4})$/i);
  if (!match) return null;
  const [, day, monthName, year] = match;
  const month = ITALIAN_MONTHS[monthName.toLowerCase()];
  if (!month) return null;
  return `${year}-${month}-${day.padStart(2, "0")}`;
}

function generateSitemap() {
  const staticPages = [
    { path: "/", priority: "1.0", changefreq: "weekly" },
    { path: "/team", priority: "0.8", changefreq: "monthly" },
    { path: "/blog", priority: "0.9", changefreq: "weekly" },
    { path: "/privacy-policy", priority: "0.3", changefreq: "yearly" },
    { path: "/cookie-policy", priority: "0.3", changefreq: "yearly" },
  ];
  const teamPages = teamMembers.map((m) => ({
    path: `/team/${m.slug}`,
    priority: "0.7",
    changefreq: "monthly",
  }));
  const blogPages = posts.map((p) => ({
    path: `/blog/${p.slug}`,
    priority: "0.8",
    changefreq: "monthly",
    lastmod: toIsoDate(p.date),
  }));

  const allPages = [...staticPages, ...teamPages, ...blogPages];

  const urls = allPages.flatMap((p) =>
    LOCALES.map((locale) => ({ ...p, locale }))
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map((u) => {
    const path = u.path === "/" ? "" : u.path;
    return `  <url>
    <loc>${SITE_URL}/${u.locale}${path}</loc>
${LOCALES.map(
  (loc) =>
    `    <xhtml:link rel="alternate" hreflang="${loc}" href="${SITE_URL}/${loc}${path}" />`
).join("\n")}
${u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>\n` : ""}    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`;
  })
  .join("\n")}
</urlset>`;
}

export default function Sitemap() {
  return null;
}

export async function getServerSideProps({ res }) {
  res.setHeader("Content-Type", "text/xml");
  res.write(generateSitemap());
  res.end();
  return { props: {} };
}
