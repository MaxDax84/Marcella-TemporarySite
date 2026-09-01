import { useRouter } from "next/router";
import Layout from "../components/Layout";
import LocalizedLink from "../components/LocalizedLink";
import { ui } from "../data/i18n";

const SITE_URL = process.env.SITE_URL || "https://www.maternita360.it";
const SITE_HOST = SITE_URL.replace(/^https?:\/\//, "");
const CONTACT_EMAIL = "massimo.dassano@gmail.com";

function ItContent() {
  return (
    <>
      <p className="legal-update">Ultimo aggiornamento: settembre 2026</p>

      <p>
        La presente Cookie Policy descrive come il sito <strong>{SITE_HOST}</strong>,
        gestito da Massimo Dassano, utilizza i cookie e tecnologie analoghe,
        ai sensi del D.Lgs. 196/2003, del Provvedimento del Garante dell'8 maggio 2014
        e del Regolamento UE 2016/679 (GDPR).
      </p>

      <h2>Cosa sono i cookie</h2>
      <p>
        I cookie sono piccoli file di testo che i siti web visitati dall'utente inviano
        al suo dispositivo (computer, tablet, smartphone), dove vengono memorizzati e
        ritrasmessi al sito alla visita successiva.
      </p>

      <h2>Cookie utilizzati da questo sito</h2>

      <h3>Cookie tecnici (strettamente necessari)</h3>
      <p>
        Il sito utilizza cookie tecnici indispensabili al corretto funzionamento delle
        pagine. Questi cookie non raccolgono informazioni per finalità di marketing e
        non richiedono consenso.
      </p>
      <div className="legal-table-wrap">
        <table className="legal-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Finalità</th>
              <th>Durata</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>cookie_consent</code></td>
              <td>Memorizza la preferenza sul banner informativo cookie</td>
              <td>1 anno</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Cookie di terze parti</h3>
      <p>
        Il sito utilizza <strong>Google Fonts</strong> (Google LLC, USA) per caricare
        i caratteri tipografici. Durante il caricamento delle pagine, il browser
        dell'utente può effettuare richieste ai server di Google, trasmettendo
        l'indirizzo IP. Google Fonts non imposta cookie di profilazione. Per
        maggiori informazioni: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy di Google</a>.
      </p>

      <h3>Cookie analitici</h3>
      <p>
        Il sito utilizza <strong>Google Analytics 4</strong> (Google Ireland Limited),
        un servizio di analisi statistica che aiuta a capire come viene utilizzato il
        sito (pagine visitate, provenienza del traffico, tempo di permanenza), in forma
        aggregata. L'indirizzo IP viene troncato/anonimizzato prima della memorizzazione
        (<code>anonymize_ip</code>). Questi cookie <strong>vengono attivati solo dopo che
        hai espresso il consenso</strong> tramite il banner presente sul sito: se non
        acconsenti, nessun cookie di Google Analytics viene installato. Per maggiori
        informazioni: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy di Google</a> e{" "}
        <a href="https://business.safety.google/adscookies/" target="_blank" rel="noopener noreferrer">informativa sui cookie di Google</a>.
      </p>
      <div className="legal-table-wrap">
        <table className="legal-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Finalità</th>
              <th>Durata</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>_ga</code></td>
              <td>Distingue gli utenti in forma anonima per le statistiche di utilizzo</td>
              <td>2 anni</td>
            </tr>
            <tr>
              <td><code>_ga_&lt;container-id&gt;</code></td>
              <td>Mantiene lo stato della sessione per Google Analytics 4</td>
              <td>2 anni</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Il sito <strong>non utilizza</strong> cookie di profilazione pubblicitaria o di
        marketing di terze parti, e non abbiamo attivato funzionalità pubblicitarie
        o di collegamento tra dispositivi in Google Analytics.
      </p>

      <h2>Gestisci la tua scelta su questo sito</h2>
      <p>
        Puoi accettare o rifiutare i cookie analitici in qualsiasi momento tramite
        il banner mostrato alla prima visita, oppure tornare qui e modificare la
        tua scelta quando vuoi:
      </p>
      <button
        type="button"
        className="btn btn-outline"
        onClick={() => window.dispatchEvent(new Event("open-cookie-preferences"))}
      >
        Modifica le tue preferenze cookie
      </button>

      <h2>Come gestire i cookie dal browser</h2>
      <p>
        Puoi disabilitare i cookie attraverso le impostazioni del tuo browser.
        Tieni presente che disabilitare i cookie tecnici potrebbe compromettere
        il corretto funzionamento del sito.
      </p>
      <ul>
        <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
        <li><a href="https://support.mozilla.org/it/kb/Attivare%20e%20disattivare%20i%20cookie" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
        <li><a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Apple Safari</a></li>
        <li><a href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
      </ul>

      <h2>Modifiche alla Cookie Policy</h2>
      <p>
        Il titolare si riserva il diritto di modificare la presente Cookie Policy
        in qualsiasi momento. Le modifiche entrano in vigore dalla data di pubblicazione
        sul sito.
      </p>

      <h2>Contatti</h2>
      <p>
        Per qualsiasi domanda relativa ai cookie scrivi a:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
      <p>
        Per informazioni più ampie sul trattamento dei dati personali consulta la{" "}
        <LocalizedLink href="/privacy-policy">Privacy Policy</LocalizedLink>.
      </p>
    </>
  );
}

function EnContent() {
  return (
    <>
      <p className="legal-update">Last updated: September 2026</p>

      <p>
        This Cookie Policy describes how the website <strong>{SITE_HOST}</strong>,
        operated by Massimo Dassano, uses cookies and similar technologies, in
        accordance with Legislative Decree 196/2003, the Italian Data Protection
        Authority's Order of 8 May 2014, and EU Regulation 2016/679 (GDPR).
      </p>

      <h2>What are cookies</h2>
      <p>
        Cookies are small text files that websites visited by the user send to
        their device (computer, tablet, smartphone), where they are stored and
        then sent back to the site on the next visit.
      </p>

      <h2>Cookies used on this website</h2>

      <h3>Technical cookies (strictly necessary)</h3>
      <p>
        The website uses technical cookies that are essential for the pages to
        function correctly. These cookies do not collect information for
        marketing purposes and do not require consent.
      </p>
      <div className="legal-table-wrap">
        <table className="legal-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Purpose</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>cookie_consent</code></td>
              <td>Stores the user's preference on the cookie information banner</td>
              <td>1 year</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Third-party cookies</h3>
      <p>
        The website uses <strong>Google Fonts</strong> (Google LLC, USA) to load
        typographic files. While pages load, the user's browser may make requests
        to Google's servers, transmitting the IP address. Google Fonts does not
        set profiling cookies. For more information:{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>.
      </p>

      <h3>Analytics cookies</h3>
      <p>
        The website uses <strong>Google Analytics 4</strong> (Google Ireland Limited),
        a statistical analysis service that helps us understand how the site is used
        (pages visited, traffic sources, time spent), in aggregate form. The IP
        address is truncated/anonymized before being stored (<code>anonymize_ip</code>).
        These cookies are <strong>only activated after you give consent</strong> via the
        banner shown on the site: if you do not consent, no Google Analytics cookie is
        set. For more information:{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a> and{" "}
        <a href="https://business.safety.google/adscookies/" target="_blank" rel="noopener noreferrer">Google's cookie information</a>.
      </p>
      <div className="legal-table-wrap">
        <table className="legal-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Purpose</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>_ga</code></td>
              <td>Anonymously distinguishes users for usage statistics</td>
              <td>2 years</td>
            </tr>
            <tr>
              <td><code>_ga_&lt;container-id&gt;</code></td>
              <td>Persists session state for Google Analytics 4</td>
              <td>2 years</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        The website <strong>does not use</strong> third-party advertising or marketing
        profiling cookies, and we have not enabled advertising or cross-device
        linking features in Google Analytics.
      </p>

      <h2>Manage your choice on this website</h2>
      <p>
        You can accept or reject analytics cookies at any time via the banner
        shown on your first visit, or come back here and change your choice
        whenever you like:
      </p>
      <button
        type="button"
        className="btn btn-outline"
        onClick={() => window.dispatchEvent(new Event("open-cookie-preferences"))}
      >
        Change your cookie preferences
      </button>

      <h2>How to manage cookies from your browser</h2>
      <p>
        You can disable cookies through your browser settings. Keep in mind that
        disabling technical cookies may affect the correct functioning of the
        website.
      </p>
      <ul>
        <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
        <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
        <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer">Apple Safari</a></li>
        <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
      </ul>

      <h2>Changes to this Cookie Policy</h2>
      <p>
        The data controller reserves the right to modify this Cookie Policy at
        any time. Changes take effect from the date of publication on the
        website.
      </p>

      <h2>Contact</h2>
      <p>
        For any questions about cookies, write to:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
      <p>
        For broader information on the processing of personal data, see our{" "}
        <LocalizedLink href="/privacy-policy">Privacy Policy</LocalizedLink>.
      </p>
    </>
  );
}

export default function CookiePolicy() {
  const { locale } = useRouter();
  const t = (ui[locale] || ui.it).legal;

  return (
    <Layout
      title="Cookie Policy"
      description={
        locale === "en"
          ? `Information on the use of cookies on the ${SITE_HOST} website, in accordance with the Italian Data Protection Authority and GDPR.`
          : `Informativa sull'uso dei cookie sul sito ${SITE_HOST}, ai sensi del Provvedimento del Garante Privacy e del GDPR.`
      }
      canonicalPath="/cookie-policy"
    >
      <div className="page-header page-header-short">
        <div className="container">
          <span className="page-header-label">{t.label}</span>
          <h1>Cookie Policy</h1>
        </div>
      </div>

      <section className="section">
        <div className="container legal-content">
          {locale === "en" ? <EnContent /> : <ItContent />}
        </div>
      </section>
    </Layout>
  );
}
