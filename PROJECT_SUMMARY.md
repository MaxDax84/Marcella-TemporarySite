# Sostegno Maternità — Project Summary

> Ultimo aggiornamento: 2026-06-30

## Panoramica

Sito web vetrina per un team multidisciplinare di professioniste/i specializzati nel sostegno alla maternità fisiologica e patologica. Il sito serve a:
1. Presentare il team e le relative competenze
2. Pubblicare contenuti informativi (blog) su tematiche legate alla maternità
3. Posizionarsi sui motori di ricerca per query italiane legate a maternità, gravidanza, parto, PMA, aborto, morte fetale, depressione post-partum, ambientamento, asilo nido

## Stack tecnico

| Tecnologia | Scelta | Motivo |
|---|---|---|
| Framework | Next.js 14 (Pages Router) | SSG/SSR nativo, ottimo SEO, integrazione Vercel |
| Stile | CSS globale (globals.css) | Semplicità, nessuna dipendenza aggiuntiva |
| Deploy | Vercel (progetto `sostegno-maternita`) | Piano gratuito, integrazione nativa Next.js |
| Repository | GitHub — `MaxDax84/Sostegno-Maternita` | |
| URL attuale | `https://www.sostegnoallamaternita.com` | Dominio personalizzato, collegato su Vercel e verificato su Google Search Console |

## Struttura del progetto

```
Sostegno Maternità/
├── components/
│   ├── Layout.js         # Head (SEO, JSON-LD), Navbar, Footer
│   ├── Navbar.js         # Nav fissa, responsive con menu hamburger e dropdown team scrollabile
│   ├── Footer.js         # Footer con colonne e disclaimer medico
│   ├── CookieBanner.js   # Banner consenso cookie
│   ├── EmailReveal.js    # Reveal email su click (anti-scraping)
│   └── WhatsAppReveal.js # Reveal numero WhatsApp su click
├── data/
│   ├── team.js           # Dati REALI delle professioniste/i
│   └── posts.js          # Articoli del blog (contenuto completo + keywords SEO)
├── pages/
│   ├── _app.js           # Fade tra pagine
│   ├── index.js          # Homepage: Hero + Chi Siamo + Cosa Facciamo + CTA
│   ├── blog.js            # Pagina Blog: griglia articoli
│   ├── sitemap.xml.js    # Sitemap dinamica (generata server-side)
│   ├── privacy-policy.js
│   ├── cookie-policy.js
│   ├── blog/[slug].js    # Singolo articolo con sidebar + JSON-LD Article
│   └── team/
│       ├── index.js      # Pagina Team: griglia card professioniste/i
│       └── [slug].js     # Profilo singola professionista + JSON-LD Person
├── public/
│   ├── robots.txt        # Consente indicizzazione, punta alla sitemap
│   └── *.jpg/.png/.jpeg  # Foto profilo team + sfondo farfalle
├── styles/
│   └── globals.css       # Tutto il CSS: variabili, componenti, responsive
└── PROJECT_SUMMARY.md    # Questo file
```

## Team attuale

| Nome | Ruolo | Città |
|------|-------|-------|
| Dott.ssa Eleonora Papa | Medico Chirurgo e Omeopata | Milano |
| Dott.ssa Fabiana Toneatto | Ostetrica libero professionista | Milano |
| Dott.ssa Giuliana Pino | Ostetrica | Milano |
| Dott. Paolo Torri | Maestro Riflessologo | Milano |
| Dott.ssa Simona Bensi | Psicologa | Piacenza |
| Dott.ssa Marcella Marcone | Psicologa e Psicoterapeuta | Milano |
| Dott.ssa Claudia Belvedere | Psicologa | Firenze / Rende (CS) |
| Federica Arcuri | Integrative Nutrition Health Coach / Integrative Fertility Coach | New York |
| Dott.ssa Chiara Mauri | Educatrice per la Prima Infanzia | Como |

## Blog — articoli pubblicati

| ID | Titolo | Autrice |
|----|--------|---------|
| 1 | È possibile programmare la gravidanza? | Marcella Marcone |
| 2 | Alcuni aspetti psicologici della paternità | — |
| 3 | Scegliere il servizio educativo per la prima infanzia | Chiara Mauri |

## SEO — stato attuale

### Implementato
- `robots.txt` — consente indicizzazione completa, punta alla sitemap
- `sitemap.xml` dinamica — elenca tutte le pagine (home, team, blog, slug)
- `canonical` URL per ogni pagina
- `og:url` + `og:locale` (it_IT) per Open Graph
- `keywords` meta tag per ogni pagina (usato da Bing)
- JSON-LD `MedicalOrganization` sulla homepage
- JSON-LD `Article` su ogni post del blog
- JSON-LD `Person` su ogni profilo professionista
- Meta description ottimizzate con keyword target su ogni pagina, tutte entro 160 caratteri
- `SITE_URL` centralizzato in `next.config.js` (facile da cambiare con nuovo dominio)
- `<h1>` corretto e gerarchia heading valida su tutte le pagine
- Pagina 404 personalizzata con `noindex`
- `loading="lazy"` sulle immagini fuori schermo

### Da fare
- [x] Comprare dominio personalizzato e aggiornare `SITE_URL` in `next.config.js`, `public/robots.txt`, `pages/sitemap.xml.js`, `pages/privacy-policy.js`, `pages/cookie-policy.js` → `www.sostegnoallamaternita.com`
- [x] Aggiungere `sostegnoallamaternita.com` su Vercel (Settings → Domains), configurare i record DNS presso il registrar (Aruba) e attendere la propagazione
- [x] Impostare `www.sostegnoallamaternita.com` come dominio di produzione su Vercel (apex → www con redirect 308)
- [x] Configurare redirect da `portale-maternita.vercel.app` → nuovo dominio (da pannello Vercel)
- [x] Iscrivere il sito a **Google Search Console** (proprietà di dominio, verificata via TXT DNS su Aruba) e inviare la sitemap
- [ ] Aggiungere **Google Analytics** o Plausible per il tracking
- [x] Immagini Open Graph (og:image) per condivisioni social
- [x] Favicon reale (favicon.svg/.ico, apple-touch-icon, icone manifest, monogramma "SM")
- [ ] Comprimere le foto profilo più pesanti in `public/` (alcune superano 500KB, impattano il tempo di caricamento/LCP)

## Design

- **Palette**: Verde salvia (`#4E7B6D`) primario, crema (`#F6F2EC`) sfondo
- **Font**: Playfair Display (serif, titoli) + Inter (sans-serif, corpo)
- **Sfondo**: farfalle in overlay su sezioni chiave
- **Responsive**: mobile-first, breakpoint a 640px e 1024px

## Deploy

1. Repository GitHub: `MaxDax84/Sostegno-Maternita` (branch `master`)
2. Collegato a Vercel (progetto `sostegno-maternita`) — deploy automatico ad ogni push su `master`
3. URL produzione attuale: `https://www.sostegnoallamaternita.com` (dominio definitivo, collegato e verificato su Google Search Console). `portale-maternita.vercel.app` reindirizza al nuovo dominio.
4. ⚠️ Nota: il dominio automatico `sostegno-maternita.vercel.app` (generato dal nome attuale del progetto) **non è collegato** alla produzione — risulta 404.
5. Variabile d'ambiente su Vercel: `SITE_URL=https://www.sostegnoallamaternita.com`
