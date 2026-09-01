import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LocalizedLink from "./LocalizedLink";
import { ui } from "../data/i18n";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const { locale } = useRouter();
  const t = (ui[locale] || ui.it).cookie;

  useEffect(() => {
    if (!localStorage.getItem("cookie_consent")) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie_consent", "true");
    window.dispatchEvent(new Event("cookie-consent-granted"));
    setVisible(false);
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
        <button className="cookie-banner-btn" onClick={accept}>
          {t.accept}
        </button>
      </div>
    </div>
  );
}
