# Parachute Festival Lindern – Website

Offizielle Website des Parachute Festivals Lindern.
Gebaut mit [Astro](https://astro.build) · Gehostet auf [Cloudflare Pages](https://pages.cloudflare.com) · Quellcode auf GitHub.

---

## Lokale Entwicklung

```bash
npm install        # Abhängigkeiten installieren (einmalig)
npm run dev        # Dev-Server starten → http://localhost:4321
npm run build      # Produktions-Build erstellen → /dist
npm run preview    # Build lokal vorschauen
```

Nach jedem `git push` auf den Hauptbranch wird die Website automatisch über Cloudflare Pages deployed.

---

## Jährliche Aufgaben – Festivaljahr wechseln

Grobe Reihenfolge: erst alles vorbereiten und testen, dann deployen wenn der Vorverkauf startet.

---

### 1. Festivaldatum, Ort & Countdown

**Datei:** `src/data/site.json`

Hier startet jede Vorbereitung. Alle Countdowns auf Startseite und Tickets-Seite ziehen ihren Wert automatisch aus dieser Datei.

```json
"nextEdition": {
  "date": "2027-04-24T17:00:00+02:00",   ← ISO-Datum mit Uhrzeit (CEST = +02:00)
  "dateDisplay": "24. April 2027",        ← Anzeige-Text überall auf der Seite
  "location": "Schützenplatz, Lindern (Oldenburg)"
},
"futureEdition": {
  "date": "2028-04-...",                  ← Übernächstes Jahr schon eintragen
  "dateDisplay": "... 2028",
  "location": "..."
}
```

Nach Ablauf von `nextEdition` springt der Countdown automatisch auf `futureEdition` – kein weiterer Eingriff nötig.

**Location wechseln:** Falls das Festival an einem neuen Ort stattfindet, zusätzlich anpassen:

```json
"maps": {
  "embedUrl":          "...",   ← Neuen Google Maps Einbettungs-Link eintragen
  "directionsUrl":     "...",   ← Neuen Directions-Link eintragen
  "address":           "Neue Adresse, 12345 Ort",
  "parkingEmbedUrl":   "...",   ← Parkplatz-Karte anpassen
  "parkingDirectionsUrl": "..."
}
```

Zusätzlich die Anreise-Seite prüfen: `src/pages/anreise.astro` – dort sind Parkplatz-Beschreibungen und ggf. Taxi-Nummern als Text hinterlegt, die manuell angepasst werden müssen.

---

### 2. CI-Farben, Logo & Favicon

**Farben** – nur in einer Datei: `src/styles/theme.css`

```css
--color-primary:   #c5138d;   /* Akzentfarbe (Buttons, Badges, Glow) */
--color-secondary: #6fc29d;   /* Sekundärfarbe (Announcement-Bar, Filter) */
--color-dark:      #2c282a;   /* Dunkler Hintergrund (Header, Sections) */
--color-black:     #000000;   /* Seitenhintergrund */
```

**Logo:** `public/images/Logo.png` – gleicher Dateiname, einfach ersetzen. Wird in Header, Hero und Footer verwendet.

**Favicon:** `public/favicon.svg` ist das primäre Icon (Vektorformat, vom Browser bevorzugt). Zusätzlich `public/favicon.ico` als Fallback für ältere Browser ersetzen. Beide müssen gleich aussehen.

**Placeholder-Bilder ersetzen** – falls ein neues CI auch neue Platzhaltergrafiken braucht:

| Datei | Verwendet für |
|---|---|
| `public/images/bands/placeholder.jpg` | Bands ohne Foto in der Band Library |
| `public/images/partners/placeholder.jpg` | Partner ohne Logo auf der Partnerseite |

**Fonts wechseln** – Fonts sind selbst-gehostet:
1. Neue woff2-Dateien unter `public/fonts/` ablegen (je Font: latin + latin-ext)
2. `@font-face`-Blöcke am Ende von `src/styles/theme.css` anpassen
3. `--font-heading` / `--font-body` CSS-Variablen in `theme.css` anpassen
4. `<link rel="preload">` Pfade in `src/layouts/BaseLayout.astro` aktualisieren
5. Falls Tailwind Font-Namen sich ändern: `tailwind.config.mjs` anpassen

---

### 3. Startseite – Lineup aktualisieren

**Datei:** `src/pages/index.astro`

Das Lineup-Array umbenennen (z. B. `lineup2026` → `lineup2027`) und befüllen:

```js
const lineup2027 = [
  {
    name: 'Bandname',
    role: 'Headliner',       // oder 'Support'
    genre: 'Punk Rock',
    origin: 'Stadt',
    image: '/images/bands/bandname.jpg',
    description: 'Beschreibung der Band für die Startseite.',
    links: { instagram: 'https://...', spotify: 'https://...' },
    highlight: true,         // true = großes Headliner-Layout, false = Support-Grid
  },
];
```

In der gleichen Datei weiter unten auch anpassen:
- `eyebrow`-Text (z. B. "Lineup 2026" → "Lineup 2027")
- `subtitle`-Text mit Datum des letzten Festivals
- JSON-LD Event-Schema: `startDate`, `endDate`, Bands und Ort aktualisieren

---

### 4. Band Library aktualisieren

**Datei:** `src/data/bands.json`

Neue Bands als Eintrag hinzufügen:

```json
{
  "id": "band-slug",
  "name": "Bandname",
  "genre": ["Rock", "Punk"],
  "image": "/images/bands/band-slug.jpg",
  "bio": "Kurze Beschreibung der Band.",
  "links": {
    "website":   "https://...",
    "spotify":   "https://open.spotify.com/artist/...",
    "instagram": "https://www.instagram.com/...",
    "facebook":  "https://www.facebook.com/..."
  },
  "parachuteFestivals": [2027],
  "headliner": false,
  "active": true
}
```

Bands, die wieder spielen – einfach das neue Jahr ergänzen:
```json
"parachuteFestivals": [2024, 2027]
```

**Bandbilder** unter `public/images/bands/{band-slug}.jpg` ablegen.
Die Suche, A-Z-Filter und Jahresfilter aktualisieren sich automatisch.

---

### 5. Ticketing einbetten

Sobald der Eventfrog-Vorverkauf aktiv ist, den Platzhalter-Block in `src/pages/tickets.astro` durch den echten Widget-Code ersetzen. Den Platzhalter-Block suchen (Kommentar `<!-- Eventfrog Platzhalter -->`) und durch den Einbettungscode von Eventfrog ersetzen.

Außerdem in `src/data/site.json` die Ticket-URL eintragen:
```json
"ticketsUrl": "https://eventfrog.de/..."
```

---

### 6. Festival Historie aktualisieren

**Datei:** `src/data/historie.json`

**Vor dem Festival** – neuen Eintrag ganz oben einfügen:
```json
{
  "year": 2027,
  "name": "Parachute Festival 2027",
  "era": "parachute",
  "location": "Schützenplatz, Lindern (Oldenburg)",
  "date": "24. April 2027",
  "poster": "/images/historie/2027.jpg",
  "description": "",
  "bands": [],
  "missing": false,
  "cancelled": false,
  "upcoming": true
}
```

**Nach dem Festival** – den abgelaufenen Eintrag vervollständigen:
```json
{
  "year": 2026,
  "upcoming": false,
  "description": "Kurze Beschreibung der Edition.",
  "bands": ["band-slug-1", "band-slug-2"]
}
```

Plakatbild unter `public/images/historie/2027.jpg` (oder `.png`) ablegen.

---

### 7. AGB, Jugendschutz & Awareness prüfen

Diese Seiten enthalten rechtlich relevante Texte und müssen vor jedem Festival auf Aktualität geprüft werden. Es gibt keine zentralen Datendateien – alle Änderungen direkt in der jeweiligen `.astro`-Datei vornehmen.

| Seite | Datei | Was prüfen |
|---|---|---|
| AGB | `src/pages/agb.astro` | Datum, Veranstalter, Eventfrog-Konditionen, Ticketpreise |
| Jugendschutz | `src/pages/jugendschutz.astro` | Alkohol-/Tabakregeln, Bändchen-System, Kontaktdaten |
| Awareness | `src/pages/awareness.astro` | Awareness-Wort eintragen, Kontaktmöglichkeiten, Teamstruktur |

**Awareness-Wort** setzen (jährlich neu):
```html
<!-- In src/pages/awareness.astro den Platzhalter ersetzen: -->
<p class="font-heading text-2xl text-primary mb-2">Euer Awareness-Wort 2027</p>
```

---

### 8. Partner aktualisieren

**Datei:** `src/data/partners.json`

- Neue Partner hinzufügen (`"tier": "kooperation"` oder `"tier": "partner"`)
- Nicht mehr aktive Partner entfernen oder auf inaktiv setzen
- Logos unter `public/images/partners/{id}.jpg` ablegen

---

### 9. FAQ aktualisieren

**Datei:** `src/data/faq.json`

- Datum in der Antwort auf "Wann findet das Festival statt?" aktualisieren
- Neue Fragen zu Änderungen (neue Location, neues Ticketing, etc.) ergänzen
- Veraltete Antworten korrigieren

---

### 10. Galerie ergänzen (nach dem Festival)

**Datei:** `src/data/gallery.json`

```json
{
  "year": 2027,
  "title": "Parachute Festival 2027",
  "googlePhotosUrl": "https://photos.app.goo.gl/...",
  "description": "Kurze Beschreibung der Edition.",
  "previews": [
    "/images/gallery/2027/1.jpg",
    "/images/gallery/2027/2.jpg"
  ]
}
```

Vorschaubilder unter `public/images/gallery/2027/1.jpg` und `2.jpg` ablegen.

---

### 11. SEO & AI-Dateien aktualisieren

Nach dem Festivalwechsel diese Dateien prüfen:

| Datei | Was aktualisieren |
|---|---|
| `public/llms.txt` | Lineup, Datum, nächste Edition |
| `public/llms-full.txt` | Vergangene und nächste Edition, technische Infos |
| `public/ai.txt` | `Updated`-Datum auf aktuelles Datum setzen |
| `public/.well-known/security.txt` | `Expires`-Datum um ein Jahr verlängern |
| `src/pages/index.astro` | JSON-LD MusicEvent-Schema: Datum, Bands, Ort |
| `src/layouts/BaseLayout.astro` | Organization-Schema: nur bei Adress- oder Kontaktänderungen |

---

## Technischer Überblick

```
public/                  Statische Dateien (werden 1:1 deployed)
├── fonts/               Selbst-gehostete Webfonts (woff2, latin + latin-ext)
├── images/
│   ├── bands/           Bandfotos: {band-id}.jpg
│   ├── partners/        Partner-Logos: {partner-id}.jpg/.png
│   ├── gallery/         Galerie-Vorschaubilder: {jahr}/1.jpg, 2.jpg
│   └── historie/        Festival-Plakate: {jahr}.jpg oder {jahr}.png
├── _headers             Cloudflare Security- & Cache-Header
├── _redirects           URL-Weiterleitungen
├── robots.txt           Crawler-Regeln (inkl. AI-Crawler)
├── sitemap.xml          Seitenübersicht für Suchmaschinen
├── manifest.json        Web App Manifest
├── llms.txt             KI-Suchoptimierung (kompakt)
├── llms-full.txt        Erweiterte KI-Informationen (vollständig)
├── ai.txt               AI-Crawler-Richtlinien
├── humans.txt           Team-Infos
└── .well-known/
    └── security.txt     Sicherheitskontakt

src/
├── components/
│   ├── home/            Hero, Countdown (mit SSR-Fallback)
│   ├── layout/          Header (animiertes Mobile-Menü), Footer
│   ├── bands/           BandCard
│   └── ui/              SectionHeading, BackToTop, Accordion
├── data/                Inhalte (JSON) – hier werden die meisten Änderungen gemacht
│   ├── site.json        Festivaldatum, Ort, Social Links, Maps
│   ├── bands.json       Band Library
│   ├── partners.json    Partner & Sponsoren
│   ├── faq.json         FAQ-Fragen & Antworten
│   ├── gallery.json     Galerie-Links
│   └── historie.json    Festival-Timeline
├── styles/
│   ├── theme.css        ⭐ CI-Datei – Farben, Fonts (@font-face), Gradienten
│   └── global.css       Basis-Styles, Button-Klassen, Animationen
├── layouts/
│   ├── BaseLayout.astro HTML-Shell, Preload-Links, Meta-Tags, JSON-LD
│   └── PageLayout.astro Wrapper mit Header, Footer und Back-to-Top
└── pages/               Eine .astro Datei pro Seite
```

---

## Cloudflare Pages – Einstellungen

| Einstellung | Wert |
|---|---|
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Node Version | `20` |

**Environment Variables:**

| Variable | Beschreibung |
|---|---|
| `PUBLIC_WEB3FORMS_KEY` | Web3Forms Access Key für das Kontaktformular |
| `NODE_VERSION` | `20` |

---

## Kontakt & Support

**Parachute Festival Lindern**
Teestube Lindern e.V. & Projektunterstützungsverein Lindern e.V.
📧 lindernconcerts@gmail.com
🌐 parachutefestival.de
