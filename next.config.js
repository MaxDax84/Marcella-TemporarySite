const { posts } = require("./data/posts")

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
    SITE_URL: process.env.SITE_URL || "https://www.maternita360.it",
  },
  async redirects() {
    // Con l'i18n attivo, Next.js "aiuta" applicando da solo un prefisso di
    // locale ai redirect — comportamento inaffidabile con fonti/destinazioni
    // che hanno già un prefisso esplicito (produce doppi prefissi tipo
    // /it/it/blog). Per avere un comportamento prevedibile disabilitiamo
    // quell'automatismo (locale:false) ed elenchiamo noi le varianti reali
    // con cui un URL può arrivare: senza prefisso (come sul vecchio sito),
    // con /it o con /en (come Google prova a volte, combinando l'URL vecchio
    // con la struttura del sito nuovo).
    function withLocaleVariants(path, destination) {
      return ["", "/it", "/en"].map((prefix) => ({
        source: `${prefix}${path}`,
        destination,
        permanent: true,
        locale: false,
      }))
    }

    // Il vecchio sito WordPress su maternita360.it pubblicava ogni articolo
    // come URL piatto sulla root, es. https://maternita360.it/epigenetica-e-gravidanza/
    // (nessun prefisso di categoria). Ricreiamo qui quel redirect per ogni
    // articolo già migrato in data/posts.js, per non perdere l'indicizzazione
    // storica nel momento in cui il dominio punta a questo sito.
    const legacyPostRedirects = posts.flatMap((post) =>
      withLocaleVariants(`/${post.slug}`, `/it/blog/${post.slug}`)
    )

    // Il vecchio WordPress aveva anche pagine di archivio (categorie, tag,
    // autori, paginazione) che questo sito non replica come pagine dedicate.
    // Senza questi redirect, quegli URL storici (spesso indicizzati da anni)
    // risponderebbero 404 invece di atterrare su una pagina reale.
    const legacyArchiveRedirects = ["/category", "/tag", "/author", "/page"].flatMap((base) =>
      withLocaleVariants(`${base}/:path*`, "/it/blog")
    )

    // Pagine statiche del vecchio sito (non articoli, non archivi), con una
    // destinazione precisa dove ne esiste una reale su questo sito.
    const legacyStaticRedirects = [
      ...withLocaleVariants("/contatti", "/it/team"),
      ...["chi-siamo", "il-progetto", "eventi", "entra-nel-gruppo", "pagina-di-esempio"].flatMap(
        (slug) => withLocaleVariants(`/${slug}`, "/it")
      ),
      // "privacy-policy" (senza "-2") NON va qui: coincide con lo slug della
      // pagina vera già esistente su questo sito, un redirect esplicito
      // creerebbe un loop (la pagina reindirizzerebbe a se stessa). Il
      // middleware la gestisce già correttamente da sola.
      ...withLocaleVariants("/privacy-policy-2", "/it/privacy-policy"),
    ]

    // Tutto il resto del vecchio sito (~130 URL, per lo più articoli storici
    // non ancora migrati con questo esatto slug, o comunque non replicati su
    // questo sito) che Google ha ancora indicizzato: invece di lasciarli
    // rispondere 404, li portiamo genericamente al blog. Elenco calcolato una
    // tantum confrontando le cartelle del backup del vecchio sito con gli
    // slug già migrati in data/posts.js — non è dinamico, se emergono altri
    // URL 404 vanno aggiunti qui a mano.
    const legacyContentFallbackRedirects = [
      "10-linevitabile-gelosia-fraterna", "1364-2", "1696-2", "2058-2", "2474-2", "4500-2",
      "alimentazione-complementare-nei-primi-anni-di-vita", "alla-scoperta-del-mondo-el-portare",
      "allattare-al-seno-e-sempre-sinonimo-di-buona-presenza-materna",
      "ambra-e-antichi-rimedi-per-mamma-e-neonato", "ambra-e-pulizia-delle-frequenze-pesanti",
      "anche-i-buoni-genitori-possono-nuocere-ai-loro-figli-seconda-parte",
      "ansie-intorno-alla-gravida-10", "aspetti-emotivi-della-gravidanza-5",
      "aspetti-psicologici-delle-voglie-in-gravidanza-12",
      "aspetti-somatici-e-psichici-dellaborto-spontaneo", "bebe-in-viaggio",
      "cambiamenti-del-secondo-semestre-di-vita", "cambiamenti-nellinterazione-col-bebe-nel-primo-semestre",
      "caro-diario-istantanee-di-unattesa-2",
      "come-cambia-il-corpo-in-gravidanza-i-test-di-valutazione-dellosteopata",
      "come-curare-il-bacino-della-donna-in-gravidanza",
      "come-deve-essere-trattato-il-moncone-ombelicale-del-neonato",
      "come-mai-le-donne-incinte-spesso-fanno-sogni-popolati-da-animali",
      "come-vivere-bene-il-riposo-forzato-in-maternita", "cose-lo-yoga-in-fascia-prima-parte",
      "costruisci-il-tuo-nido", "curare-le-radici-per-dar-vita-a-un-nuovo-virgulto",
      "da-coppia-a-famiglia", "dire-no-per-nove-mesi", "diventare-mamma-a-ventanni",
      "diventare-papa-a-ventanni", "dove-nasce-linsicurezza-di-molte-neo-mamme",
      "dove-si-mette-a-dormire-il-bebe", "e-nata-2", "e-necessario-avere-figli",
      "e-possibile-programmare-la-gravidanza", "ecografia-e-vissuti-parentali",
      "equilibrio-energetico-in-gravidanza-e-nel-parto", "essere-una-madre-sufficientemente-buona-5",
      "faccia-a-faccia-col-dolore-e-lamorte", "frida-kahlo-radici", "frida-kalho-io-e-la-mia-bambola",
      "frida-kalho-la-mia-balia-e-io-mentre-sto-poppando",
      "giochi-di-fanciulli-di-pieter-bruegel-il-vecchio", "giochi-e-giocattoli-2",
      "giochi-e-giocattoli-un-mondo-a-misura-di-bambino-prima-parte", "gravidanza-e-sogni",
      "i-no-che-aiutano-a-crescere", "i-no-che-fanno-crescere-parte-seconda", "il-baby-blues-6",
      "il-bambino-3-6-mesi-la-prima-rivoluzione-motoria-prima-parte",
      "il-bambino-3-6-mesi-la-prima-rivoluzione-motoria-seconda-parte",
      "il-bambino-6-9-mesi-la-ricchezza-del-movimento-parte-prima",
      "il-bambino-6-9-mesi-la-ricchezza-del-movimento-parte-seconda", "il-bisogno-di-mamma-del-bebe-5",
      "il-corpo-che-cambia-n-polla-mattiot", "il-dopo-parto-4",
      "il-neonato-e-i-riflessi-primitivicosa-sono-e-perche-sono-importanti",
      "il-papa-chioccia-esiste-la-storia-di-giorgio", "il-piede-torto-nel-neonato-curarlo-con-losteopatia",
      "il-primo-colloquio-al-nido-un-passo-fondamentale-per-una-nuova-avventura",
      "il-ruolo-della-psiche-durante-la-gravidanza-e-il-puerperio",
      "il-ruolo-e-l-funzione-del-padre-nello-sviluppo-neuropsicomotorio-del-bambino",
      "il-sesso-del-nascituro-4", "il-sogno-della-nascita", "il-tempo-di-decidere-n-polla-mattiot",
      "importanza-della-psicoterapia-in-gravidanza-soprattutto-in-certi-casi", "in-vacanza-con-il-bebe-8",
      "infertilita-e-sterilita", "ipotesi-sulla-vita-intrauterina-dei-gemell", "la-depressione-post-partum",
      "la-fasciatura-del-bebe", "la-fitoterapia-di-bach-nuovi-orizzonti",
      "la-fitoterapia-di-bach-tecniche-oggettive", "la-madonna-del-latte-di-jan-van-eyck",
      "la-madonna-della-seggiola", "la-madre-morta-e-la-bambina", "la-maternita-negli-orsi",
      "la-matrioshka-un-oggetto-darte-applicata-popolare", "la-plagiocefalia-del-neonato",
      "la-proposta-della-naturopatia-per-la-gravidanza", "la-qualita-della-presenza-materna",
      "la-riflessologia-nel-post-partum", "la-sessualita-in-gravidanza", "la-sterilita-maschile",
      "le-paure-del-parte-2-fase-dilatante", "le-paure-del-parto", "le-stelle-dei-desideri-2",
      "le-tre-eta-della-donna", "lembrione-un-corpo-estraneo-per-la-madre-7",
      "levoluzione-dellimmagine-di-san-giuseppe-nellarte",
      "limportanza-dellattaccamento-del-bambino-per-il-genitore",
      "limportanza-delle-circostanze-in-cui-un-bambino-viene-concepito", "limportanza-delle-origini",
      "linterazione-con-il-bebe-nel-primo-mese-di-vita", "lo-sviluppo-della-motricita-912-18-mesi-seconda-parte",
      "lo-sviluppo-della-motricita-dai-9-ai-12-18-mesi-prima-parte", "lo-yoga-un-alleato-sempre-a-disposizione",
      "losteopatia-in-gravidanza", "mai-piu-sola", "maternita-e-tecniche-olistiche-un-aiuto-concreto",
      "medicinali-e-gravidanza", "metodi-per-controllare-il-dolore-del-parto-parte-prima",
      "metodi-psicologici-per-controllare-il-dolore-del-parto-seconda-parte", "nausea-e-vomito-in-gravidanza-6-2",
      "non-lasciamoci-omologare-ciascuno-di-noi-e-un-essere-unic", "osteopatia-la-gravidanza",
      "osteopatia-la-gravidanza-parte-seconda", "osteopatia-nel-post-partum",
      "per-rilassarsi-e-concedersi-qualche-momento-di-benessere",
      "per-rilassarsi-e-concedersi-qualche-momento-di-benessere-seconda-parte",
      "perche-praticare-la-mindfullness-in-gravidanza", "percorso-nascita",
      "prospettive-dallinterno-storia-di-un-bambino-nellutero",
      "raccontare-la-gravidanza-attraverso-una-protagonista", "rapporto-con-il-partner-6",
      "scegliere-il-servizio-educativo-per-la-prima-infanzia-consigli-per-genitori-consapevoli",
      "speranza-di-gustav-klimt", "tag", "test-di-gravidanza", "tra-madre-e-suocera",
      "un-litigio-con-la-mamma", "un-modo-insolito-per-affrontare-i-problemi-di-sonno-del-bebe",
      "un-sogno-angoscioso-13", "una-richiesta-di-aborto", "voglio-un-figlio-anzidue", "yoga",
      "yoga-e-primo-trimestre-di-gravidanza", "yoga-e-secondo-trimestre-di-gravidanza",
    ].flatMap((slug) => withLocaleVariants(`/${slug}`, "/it/blog"))

    return [
      ...legacyPostRedirects,
      ...legacyArchiveRedirects,
      ...legacyStaticRedirects,
      ...legacyContentFallbackRedirects,
    ]
  },
}

module.exports = nextConfig
