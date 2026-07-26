import { useRouter } from "next/router";
import LocalizedLink from "../components/LocalizedLink";
import Layout from "../components/Layout";
import { ui } from "../data/i18n";

export default function Home() {
  const { locale } = useRouter();
  const t = (ui[locale] || ui.it).home;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "name": "Sostegno alla Genitorialità",
    "url": process.env.SITE_URL,
    "description": t.jsonLdDescription,
    "areaServed": { "@type": "Country", "name": "Italy" },
    "availableLanguage": ["Italian", "English"],
  };

  return (
    <Layout
      canonicalPath="/"
      keywords="gravidanza, parto, depressione post partum, infertilità, PMA, aborto, morte fetale, lutto perinatale, psicologia perinatale, ambientamento asilo nido, educazione prima infanzia, supporto maternità Milano, psicologa gravidanza"
      jsonLd={jsonLd}
    >
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg-circle" />
        <div className="hero-bg-circle" />
        <div className="container">
          <div className="hero-content">
            <span className="hero-tag">{t.heroTag}</span>
            <h1 className="hero-title">
              {t.heroTitle}
            </h1>
            <p className="hero-desc">
              {t.heroDesc}
            </p>
            <div className="hero-actions">
              <LocalizedLink href="/team" className="btn btn-white">
                {t.ctaKnowTeam}
              </LocalizedLink>
              <LocalizedLink href="/blog" className="btn btn-white-outline">
                {t.ctaReadBlog}
              </LocalizedLink>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHI SIAMO ── */}
      <section className="section chi-siamo" id="chi-siamo">
        <div className="container">
          <div>
            <span className="section-label">{t.chiSiamoLabel}</span>
            <h2 className="section-title">
              {t.chiSiamoTitle}
            </h2>
            <div className="chi-siamo-text">
              <p>{t.chiSiamoP1}</p>
              <p>{t.chiSiamoP2}</p>
              <p>{t.chiSiamoP3}</p>
            </div>
            <LocalizedLink href="/team" className="btn btn-primary" style={{ marginTop: 8 }}>
              {t.chiSiamoCta}
            </LocalizedLink>
          </div>
        </div>
      </section>

      {/* ── COSA FACCIAMO ── */}
      <section className="section cosa-facciamo" id="cosa-facciamo">
        <div className="container">
          <div className="features-intro">
            <span className="section-label">{t.cosaFacciamoLabel}</span>
            <h2 className="section-title">
              {t.cosaFacciamoTitle}
            </h2>
            <p className="section-desc">
              {t.cosaFacciamoDesc}
            </p>
          </div>

          <div className="features-grid">
            {["🗺️", "💻", "👤", "👥", "🏥", "🌿"].map((icon, i) => (
              <div className="feature-card" key={i}>
                <div className="feature-icon">{icon}</div>
                <div className="feature-title">{t.features[i].title}</div>
                <p className="feature-desc">{t.features[i].desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section cta-strip">
        <div className="container">
          <h2>{t.ctaStripTitle}</h2>
          <p>
            {t.ctaStripDesc}
          </p>
          <div className="cta-actions">
            <LocalizedLink href="/team" className="btn btn-white">
              {t.ctaStripKnowTeam}
            </LocalizedLink>
            <LocalizedLink href="/blog" className="btn btn-white-outline">
              {t.ctaStripReadArticles}
            </LocalizedLink>
          </div>
        </div>
      </section>
    </Layout>
  );
}
