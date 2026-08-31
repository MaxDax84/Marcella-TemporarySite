import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LocalizedLink from "./LocalizedLink";
import LanguageSwitcher from "./LanguageSwitcher";
import { teamMembers } from "../data/team";
import { localizeMember } from "../lib/team";
import { ui } from "../data/i18n";

const lastName = (m) => m.name.split(" ").pop();

function groupTeam(members, locale) {
  const sortLocale = locale === "en" ? "en" : "it";
  return Object.entries(
    members
      .map((m) => localizeMember(m, locale))
      .sort((a, b) => lastName(a).localeCompare(lastName(b), sortLocale))
      .reduce((acc, m) => {
        const cat = m.category || "Altro";
        (acc[cat] = acc[cat] || []).push(m);
        return acc;
      }, {})
  ).sort(([a], [b]) => a.localeCompare(b, sortLocale));
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [teamOpen, setTeamOpen] = useState(false);
  const router = useRouter();
  const locale = router.locale || "it";
  const t = ui[locale] || ui.it;
  const groupedTeam = groupTeam(teamMembers, locale);

  useEffect(() => {
    const handleRouteChange = () => { setOpen(false); setTeamOpen(false); };
    router.events.on("routeChangeStart", handleRouteChange);
    return () => router.events.off("routeChangeStart", handleRouteChange);
  }, [router.events]);

  const teamActive = router.pathname === "/team" || router.pathname === "/team/[slug]";

  return (
    <>
      <nav className="navbar">
        <div className="container navbar-inner">
          <LocalizedLink href="/" className="navbar-logo">
            Sostegno alla Genitorialità
          </LocalizedLink>

          <div className="navbar-links">
            <LocalizedLink href="/" className={router.pathname === "/" ? "active" : ""}>
              {t.nav.home}
            </LocalizedLink>

            {/* Dropdown Il Team */}
            <div className="navbar-dropdown">
              <LocalizedLink
                href="/team"
                className={teamActive ? "active navbar-dropdown-trigger" : "navbar-dropdown-trigger"}
              >
                {t.nav.team} <span className="navbar-dropdown-arrow">▾</span>
              </LocalizedLink>
              <div className="navbar-dropdown-menu">
                <LocalizedLink href="/team" className="navbar-dropdown-all">
                  {t.nav.allTeam}
                </LocalizedLink>
                {groupedTeam.map(([category, members]) => (
                  <div key={category}>
                    <div className="navbar-dropdown-divider" />
                    <div className="navbar-dropdown-category">{category}</div>
                    {members.map((m) => (
                      <LocalizedLink
                        key={m.slug}
                        href={`/team/${m.slug}`}
                        className="navbar-dropdown-item"
                      >
                        <span className="navbar-dropdown-name">{m.name}</span>
                        <span className="navbar-dropdown-role">{m.role}</span>
                      </LocalizedLink>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <LocalizedLink href="/blog" className={router.pathname.startsWith("/blog") ? "active" : ""}>
              {t.nav.blog}
            </LocalizedLink>

            <LocalizedLink href="/team" className="navbar-cta">
              {t.nav.contact}
            </LocalizedLink>

            <LanguageSwitcher className="navbar-lang" />
          </div>

          <button
            className={`navbar-hamburger${open ? " is-open" : ""}`}
            onClick={() => setOpen(!open)}
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Backdrop */}
      {open && <div className="mobile-menu-backdrop" onClick={() => setOpen(false)} />}

      {/* Mobile menu */}
      <div className={`mobile-menu${open ? " open" : ""}`}>
        <LocalizedLink href="/" onClick={() => setOpen(false)}>{t.nav.home}</LocalizedLink>

        <button
          className="mobile-menu-team-toggle"
          onClick={() => setTeamOpen(!teamOpen)}
        >
          {t.nav.team} <span>{teamOpen ? "▴" : "▾"}</span>
        </button>
        {teamOpen && (
          <div className="mobile-menu-submenu">
            <LocalizedLink href="/team" onClick={() => { setOpen(false); setTeamOpen(false); }}>
              {t.nav.allTeam}
            </LocalizedLink>
            {groupedTeam.map(([category, members]) => (
              <div key={category}>
                <div className="mobile-menu-submenu-category">{category}</div>
                {members.map((m) => (
                  <LocalizedLink
                    key={m.slug}
                    href={`/team/${m.slug}`}
                    onClick={() => { setOpen(false); setTeamOpen(false); }}
                  >
                    {m.name}
                  </LocalizedLink>
                ))}
              </div>
            ))}
          </div>
        )}

        <LocalizedLink href="/blog" onClick={() => setOpen(false)}>{t.nav.blog}</LocalizedLink>
        <a href="mailto:mmarcone@me.com" onClick={() => setOpen(false)}>
          {t.nav.contact}
        </a>
        <LanguageSwitcher className="mobile-menu-lang" />
      </div>
    </>
  );
}
