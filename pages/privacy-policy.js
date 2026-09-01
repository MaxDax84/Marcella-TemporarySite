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
      <p className="legal-update">Ultimo aggiornamento: giugno 2026</p>

      <p>
        La presente informativa è resa ai sensi dell'art. 13 del Regolamento UE 2016/679
        (GDPR) agli utenti che visitano il sito <strong>{SITE_HOST}</strong>.
      </p>

      <h2>1. Titolare del trattamento</h2>
      <p>
        <strong>Massimo Dassano</strong> — gestore tecnico del sito<br />
        Email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
      <p>
        Ogni professionista presente nel team tratta in autonomia, in qualità di titolare
        distinto, i dati personali che riceve direttamente tramite il proprio recapito
        email o WhatsApp indicato nel proprio profilo, per le finalità legate alla
        richiesta di consulenza professionale.
      </p>

      <h2>2. Dati raccolti e finalità</h2>

      <h3>Dati di navigazione</h3>
      <p>
        I sistemi informatici e le procedure software preposte al funzionamento del sito
        acquisiscono, nel corso del loro normale esercizio, alcuni dati la cui trasmissione
        è implicita nell'uso dei protocolli di comunicazione Internet (indirizzo IP,
        tipo di browser, sistema operativo, pagine visitate, data e ora della visita).
        Questi dati sono utilizzati esclusivamente per finalità statistiche anonime e per
        verificare il corretto funzionamento del sito. Non sono conservati oltre il tempo
        strettamente necessario.
      </p>

      <h3>Dati forniti volontariamente</h3>
      <p>
        Quando contatti una professionista tramite email o WhatsApp, i dati personali che
        fornisci (nome, indirizzo email, numero di telefono, contenuto del messaggio)
        vengono trattati esclusivamente dalla professionista contattata, per rispondere
        alla tua richiesta e, se necessario, per fornirti il servizio richiesto.
      </p>

      <h2>3. Base giuridica del trattamento</h2>
      <ul>
        <li><strong>Dati di navigazione:</strong> legittimo interesse del titolare (art. 6, par. 1, lett. f) GDPR) alla sicurezza e al corretto funzionamento del sito.</li>
        <li><strong>Richieste di contatto:</strong> esecuzione di misure precontrattuali o contrattuali (art. 6, par. 1, lett. b) GDPR) oppure consenso dell'interessato.</li>
      </ul>

      <h2>4. Conservazione dei dati</h2>
      <p>
        I dati di navigazione vengono conservati per il tempo strettamente necessario
        alla loro elaborazione. I dati forniti volontariamente tramite contatto diretto
        con una professionista sono conservati da quest'ultima per il tempo necessario a
        gestire la richiesta e, in seguito, per il periodo previsto dagli obblighi di legge.
      </p>

      <h2>5. Destinatari dei dati</h2>
      <p>
        I dati non sono ceduti a terzi né diffusi. Possono essere comunicati a soggetti
        che forniscono servizi tecnici necessari al funzionamento del sito (hosting,
        infrastruttura cloud), designati come responsabili del trattamento ai sensi
        dell'art. 28 GDPR. Il sito è ospitato su <strong>Vercel Inc.</strong>
        (USA), che aderisce a standard di adeguatezza approvati dalla Commissione Europea.
      </p>

      <h2>6. Font di terze parti</h2>
      <p>
        Il sito utilizza Google Fonts, un servizio di Google LLC (USA), che carica
        file tipografici dai server di Google. In questo processo l'indirizzo IP
        dell'utente può essere trasmesso a Google. Per maggiori informazioni:
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer"> Privacy Policy di Google</a>.
      </p>

      <h2>7. Diritti dell'interessato</h2>
      <p>Ai sensi degli artt. 15–22 GDPR, hai il diritto di:</p>
      <ul>
        <li>Accedere ai tuoi dati personali</li>
        <li>Richiederne la rettifica o la cancellazione</li>
        <li>Opporti al trattamento o richiederne la limitazione</li>
        <li>Richiedere la portabilità dei dati</li>
        <li>Revocare il consenso in qualsiasi momento, senza pregiudicare la liceità del trattamento precedente</li>
        <li>Proporre reclamo all'autorità di controllo (Garante per la Protezione dei Dati Personali – <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">www.garanteprivacy.it</a>)</li>
      </ul>
      <p>
        Per esercitare i tuoi diritti relativi al funzionamento del sito scrivi a: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        Per i dati trattati da una singola professionista, contattala direttamente tramite i recapiti indicati nel suo profilo.
      </p>

      <h2>8. Cookie</h2>
      <p>
        Per informazioni dettagliate sull'uso dei cookie consulta la nostra{" "}
        <LocalizedLink href="/cookie-policy">Cookie Policy</LocalizedLink>.
      </p>
    </>
  );
}

function EnContent() {
  return (
    <>
      <p className="legal-update">Last updated: June 2026</p>

      <p>
        This notice is provided pursuant to Art. 13 of EU Regulation 2016/679 (GDPR)
        to users visiting the website <strong>{SITE_HOST}</strong>.
      </p>

      <h2>1. Data Controller</h2>
      <p>
        <strong>Massimo Dassano</strong> — technical operator of the website<br />
        Email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
      <p>
        Each professional on the team independently processes, as a separate data
        controller, the personal data they receive directly through their own email
        or WhatsApp contact listed on their profile, for purposes related to requests
        for professional consultation.
      </p>

      <h2>2. Data Collected and Purposes</h2>

      <h3>Browsing data</h3>
      <p>
        The computer systems and software procedures used to operate this website
        acquire, during their normal operation, certain data whose transmission is
        implicit in the use of Internet communication protocols (IP address, browser
        type, operating system, pages visited, date and time of the visit). This data
        is used exclusively for anonymous statistical purposes and to verify the
        correct functioning of the website. It is not retained beyond the time
        strictly necessary.
      </p>

      <h3>Voluntarily provided data</h3>
      <p>
        When you contact a professional via email or WhatsApp, the personal data you
        provide (name, email address, phone number, message content) is processed
        exclusively by the professional you contacted, in order to respond to your
        request and, if necessary, to provide the requested service.
      </p>

      <h2>3. Legal Basis for Processing</h2>
      <ul>
        <li><strong>Browsing data:</strong> legitimate interest of the controller (Art. 6(1)(f) GDPR) in the security and proper functioning of the website.</li>
        <li><strong>Contact requests:</strong> performance of pre-contractual or contractual measures (Art. 6(1)(b) GDPR) or consent of the data subject.</li>
      </ul>

      <h2>4. Data Retention</h2>
      <p>
        Browsing data is retained for the time strictly necessary for its processing.
        Data voluntarily provided through direct contact with a professional is
        retained by that professional for the time needed to handle the request and,
        afterwards, for the period required by legal obligations.
      </p>

      <h2>5. Data Recipients</h2>
      <p>
        Data is not sold to or shared with third parties. It may be disclosed to
        parties providing technical services necessary for the operation of the
        website (hosting, cloud infrastructure), appointed as data processors pursuant
        to Art. 28 GDPR. The website is hosted on <strong>Vercel Inc.</strong> (USA),
        which adheres to adequacy standards approved by the European Commission.
      </p>

      <h2>6. Third-Party Fonts</h2>
      <p>
        The website uses Google Fonts, a service provided by Google LLC (USA), which
        loads font files from Google's servers. In this process, the user's IP
        address may be transmitted to Google. For more information:
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer"> Google Privacy Policy</a>.
      </p>

      <h2>7. Data Subject Rights</h2>
      <p>Pursuant to Arts. 15–22 GDPR, you have the right to:</p>
      <ul>
        <li>Access your personal data</li>
        <li>Request its rectification or erasure</li>
        <li>Object to processing or request its restriction</li>
        <li>Request data portability</li>
        <li>Withdraw consent at any time, without affecting the lawfulness of processing carried out prior to withdrawal</li>
        <li>Lodge a complaint with the supervisory authority (Garante per la Protezione dei Dati Personali – <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">www.garanteprivacy.it</a>)</li>
      </ul>
      <p>
        To exercise your rights regarding the website itself, write to: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        For data processed by an individual professional, contact them directly using the details on their profile.
      </p>

      <h2>8. Cookies</h2>
      <p>
        For detailed information on the use of cookies, see our{" "}
        <LocalizedLink href="/cookie-policy">Cookie Policy</LocalizedLink>.
      </p>
    </>
  );
}

export default function PrivacyPolicy() {
  const { locale } = useRouter();
  const t = (ui[locale] || ui.it).legal;

  return (
    <Layout
      title="Privacy Policy"
      description={
        locale === "en"
          ? `Privacy notice on the processing of personal data under EU Regulation 2016/679 (GDPR) for the ${SITE_HOST} website.`
          : `Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR) per il sito ${SITE_HOST}.`
      }
      canonicalPath="/privacy-policy"
    >
      <div className="page-header page-header-short">
        <div className="container">
          <span className="page-header-label">{t.label}</span>
          <h1>Privacy Policy</h1>
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
