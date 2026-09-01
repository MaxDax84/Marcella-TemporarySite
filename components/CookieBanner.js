import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LocalizedLink from "./LocalizedLink";
import { ui } from "../data/i18n";

// Valori validi salvati in localStorage("cookie_consent"): "accepted" | "rejected".
// "true" è il valore legacy usato prima che esistesse il rifiuto: trattato
// come "accepted" per non perdere la scelta di chi aveva già interagito.
function readConsent() {
  const raw = localStorage.getItem("cookie_consent");
  if (raw === "true") return "accepted";
  return raw;
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const { locale } = useRouter();
  const t = (ui[locale] || ui.it).cookie;

  useEffect(() => {
    if (!readConsent()) setVisible(true);
    const onReopen = () => setVisible(true);
    window.addEventListener("open-cookie-preferences", onReopen);
    return () => window.removeEventListener("open-cookie-preferences", onReopen);
  }, []);

  const choose = (value) => {
    const previous = readConsent();
    localStorage.setItem("cookie_consent", value);
    setVisible(false);
    if (value === "accepted") {
      window.dispatchEvent(new Event("cookie-consent-granted"));
    } else if (previous === "accepted") {
      // L'utente aveva accettato in precedenza e ora rifiuta da "Preferenze
      // cookie": ricarichiamo per fermare Analytics in modo pulito invece di
      // provare a "spegnerlo" a metà sessione.
      window.location.reload();
    }
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-banner-inner">
        <p className="cookie-banner-text">
          {t.text}{" "}
          <LocalizedLink href="/cookie-policy" className="cookie-banner-link">
            {t.link}
          </LocalizedLink>
        </p>
        <div className="cookie-banner-actions">
          <button className="cookie-banner-btn cookie-banner-btn-outline" onClick={() => choose("rejected")}>
            {t.reject}
          </button>
          <button className="cookie-banner-btn" onClick={() => choose("accepted")}>
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
