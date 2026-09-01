import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Carica Google Analytics solo se NEXT_PUBLIC_GA_MEASUREMENT_ID è configurato
// (nessun impatto finché non viene impostato) e solo dopo che l'utente ha
// accettato i cookie da CookieBanner, rispettando il consenso invece di
// tracciare a prescindere.
export default function Analytics() {
  const [consented, setConsented] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!GA_ID) return;
    // "true" è il valore legacy salvato prima che esistesse il pulsante
    // "Rifiuta": lo trattiamo come un'accettazione già espressa.
    const stored = localStorage.getItem("cookie_consent");
    if (stored === "true" || stored === "accepted") {
      setConsented(true);
    }
    const onConsent = () => setConsented(true);
    window.addEventListener("cookie-consent-granted", onConsent);
    return () => window.removeEventListener("cookie-consent-granted", onConsent);
  }, []);

  // Il sito naviga senza full page reload (vedi la transizione in _app.js):
  // senza questo, gtag registrerebbe solo la primissima pagina vista.
  useEffect(() => {
    if (!GA_ID || !consented) return;
    const handleRouteChange = (url) => {
      window.gtag?.("event", "page_view", { page_path: url });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [consented, router.events]);

  if (!GA_ID || !consented) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = function(){dataLayer.push(arguments);};
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
