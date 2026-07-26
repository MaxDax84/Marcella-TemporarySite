import { useRouter } from "next/router";
import LocalizedLink from "./LocalizedLink";
import { ui } from "../data/i18n";

export default function Footer() {
  const year = new Date().getFullYear();
  const { locale } = useRouter();
  const t = (ui[locale] || ui.it).footer;
  const tNav = (ui[locale] || ui.it).nav;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">
              Sostegno alla Genitorialità
            </div>
            <p className="footer-desc">
              {t.desc}
            </p>
          </div>

          <div className="footer-col">
            <h4>{t.navTitle}</h4>
            <LocalizedLink href="/">{tNav.home}</LocalizedLink>
            <LocalizedLink href="/team">{tNav.team}</LocalizedLink>
            <LocalizedLink href="/blog">{tNav.blog}</LocalizedLink>
          </div>

          <div className="footer-col">
            <h4>{t.contactsTitle}</h4>
            <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
              {t.contactsDesc}
            </span>
            <LocalizedLink href="/team" style={{ fontSize: "0.82rem", fontWeight: 600, color: "rgba(255,255,255,0.75)", marginTop: 10 }}>
              {t.discoverTeam}
            </LocalizedLink>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} Sostegno alla Genitorialità. {t.rights}</span>
          <span>{t.disclaimer}</span>
          <span className="footer-legal-links">
            <LocalizedLink href="/privacy-policy">Privacy Policy</LocalizedLink>
            {" · "}
            <LocalizedLink href="/cookie-policy">Cookie Policy</LocalizedLink>
          </span>
        </div>
        <div className="footer-credits">
          {t.credits}{" "}
          <a href="https://www.massimodassano.it" target="_blank" rel="noopener noreferrer">
            Massimo Dassano
          </a>
        </div>
      </div>
    </footer>
  );
}
