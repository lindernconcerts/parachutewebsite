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

## Jährliche Aufgaben – Neues Festival

### 1. Countdown & Festivaldatum aktualisieren

Datei: `src/data/site.json`

```json
"nextEdition": {
  "date": "2027-04-24T17:00:00+02:00",   ← Datum + Uhrzeit (CEST = +02:00)
  "dateDisplay": "24. April 2027",        ← Anzeige-Text
  "location": "Schützenplatz, Lindern (Oldenburg)"
},
"futureEdition": {
  "date": "2028-04-...",                  ← Schon das übernächste Jahr eintragen
  "dateDisplay": "... 2028",
  "location": "..."
}
```

Der Countdown auf der Startseite und der Tickets-Seite aktualisiert sich automatisch.
Nach Ablauf von `nextEdition` springt der Countdown automatisch auf `futureEdition`.

---

### 2. Lineup auf der Startseite aktualisieren

Datei: `src/pages/index.astro`

Das Array `lineup2026` (oben in der Datei) auf das neue Jahr umbenennen und befüllen:

```js
const lineup2027 = [
  {
    name: 'Bandname',
    role: 'Headliner',       // oder 'Support'
    genre: 'Punk Rock',
    origin: 'Stadt',
    image: '/images/bands/bandname.jpg',
    description: 'Beschreibung der Band...',
    links: { instagram: '...', spotify: '...' },
    highlight: true,         // true = Headliner-Layout, false = Support-Grid
  },
];
```

Auch die `eyebrow`-Zeile ("Lineup 2026") und den `subtitle` ("...brachten am 25. April 2026...") anpassen.

---

### 3. Bands in die Band Library aufnehmen

Datei: `src/data/bands.json`

Für jede neue Band einen Eintrag hinzufügen:

```json
{
  "id": "band-slug",                        ← Kleinbuchstaben, Bindestriche statt Leerzeichen
  "name": "Bandname",
  "genre": ["Rock", "Punk"],
  "image": "/images/bands/band-slug.jpg",   ← Bild unter public/images/bands/ ablegen
  "bio": "Kurze Beschreibung der Band.",
  "links": {
    "website":   "https://...",
    "spotify":   "https://open.spotify.com/artist/...",
    "instagram": "https://www.instagram.com/...",
    "facebook":  "https://www.facebook.com/..."
  },
  "parachuteFestivals": [2027],             ← Jahr eintragen
  "headliner": false,
  "active": true
}
```

Bestehende Bands, die wieder spielen: einfach das neue Jahr in `parachuteFestivals` ergänzen:
```json
"parachuteFestivals": [2024, 2027]
```

**Bandbilder** unter `public/images/bands/{band-slug}.jpg` ablegen.
Die Suche und A-Z-Filter aktualisieren sich automatisch.

---

### 4. Festival Historie aktualisieren

Datei: `src/data/historie.json`

**Schritt A:** Das neue kommende Festival oben eintragen (`"upcoming": true`):
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
  "highlights": [],
  "missing": false,
  "cancelled": false,
  "upcoming": true
}
```

**Schritt B:** Nach dem Festival – den Eintrag des abgelaufenen Jahres vervollständigen:
```json
{
  "year": 2026,
  "upcoming": false,        ← auf false setzen
  "description": "...",
  "highlights": ["...", "..."],
  "attendance": 3000
}
```

**Plakatbild** unter `public/images/historie/{jahr}.jpg` (oder `.png`) ablegen.
Das Bild wird automatisch in der Timeline angezeigt.

---

### 5. Galerie aktualisieren

Datei: `src/data/gallery.json`

Neues Jahr hinzufügen:
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

**Vorschaubilder** unter `public/images/gallery/2027/1.jpg` und `2.jpg` ablegen.
Ordner vorher anlegen: `public/images/gallery/2027/`

---

### 6. CI-Wechsel (jährliche neue Optik)

Nur **5 Dateien** müssen angepasst werden:

| Datei | Was ändern |
|---|---|
| `src/styles/theme.css` | Farben (`--color-primary`, `--color-secondary` etc.) und Gradienten |
| `tailwind.config.mjs` | Font-Namen falls Schrift wechselt |
| `src/layouts/BaseLayout.astro` | Google Fonts URL falls Schrift wechselt |
| `public/images/Logo.png` | Neues Logo einsetzen (gleicher Dateiname!) |
| `public/favicon.ico` | Neues Favicon einsetzen (gleicher Dateiname!) |

**Farben** in `theme.css`:
```css
--color-primary:   #c5138d;   /* Hauptfarbe (Akzent, Buttons, Badges) */
--color-secondary: #6fc29d;   /* Sekundärfarbe */
--color-dark:      #2c282a;   /* Dunkler Hintergrund */
--color-black:     #000000;   /* Seitenhintergrund */
```

---

### 7. Tickets aktualisieren

Datei: `src/pages/tickets.astro`

Wenn der Vorverkauf startet: den Eventfrog-Platzhalter-Block durch den echten Einbettungscode ersetzen.

Datei: `src/data/site.json`

```json
"ticketsUrl": "https://eventfrog.de/..."   ← echte VVK-URL eintragen
```

---

### 8. Partner aktualisieren

Datei: `src/data/partners.json`

- Neue Partner hinzufügen (Tier: `"kooperation"` oder `"partner"`)
- Nicht mehr aktive Partner entfernen
- Logos unter `public/images/partners/{id}.svg` ablegen

---

### 9. FAQ aktualisieren

Datei: `src/data/faq.json`

- Datum in der Antwort auf "Wann findet das Festival statt?" aktualisieren
- Neue Fragen ergänzen falls nötig

---

### 10. Awareness-Wort setzen

Datei: `src/pages/awareness.astro`

Den Platzhalter-Block mit dem aktuellen Awareness-Wort befüllen:
```html
<p class="font-heading text-2xl text-primary mb-2">Euer Awareness-Wort 2027</p>
```

---

### 11. SEO & AI-Dateien aktualisieren

Nach jedem Festivalwechsel diese Dateien prüfen:

| Datei | Was prüfen |
|---|---|
| `public/sitemap.xml` | Alle Seiten vorhanden? |
| `public/llms.txt` | Lineup, Datum, Bands aktuell? |
| `public/llms-full.txt` | Alle Infos zum neuen Festival ergänzen |
| `public/.well-known/security.txt` | `Expires`-Datum aktualisieren |
| `src/pages/index.astro` | JSON-LD Event-Schema: Datum, Bands, Ort aktualisieren |

---

## Technischer Überblick

```
public/                  Statische Dateien (werden 1:1 deployed)
├── images/
│   ├── bands/           Bandfotos: {band-id}.jpg
│   ├── partners/        Partner-Logos: {partner-id}.svg
│   ├── gallery/         Galerie-Vorschaubilder: {jahr}/1.jpg, 2.jpg
│   └── historie/        Festival-Plakate: {jahr}.jpg oder {jahr}.png
├── _headers             Cloudflare Security- & Cache-Header
├── _redirects           URL-Weiterleitungen
├── robots.txt           Crawler-Regeln
├── sitemap.xml          Seitenübersicht für Suchmaschinen
├── manifest.json        Web App Manifest
├── llms.txt             KI-Suchoptimierung
├── llms-full.txt        Erweiterte KI-Informationen
├── ai.txt               AI-Crawler-Richtlinien
├── humans.txt           Team-Infos
└── .well-known/
    └── security.txt     Sicherheitskontakt

src/
├── data/                Inhalte (JSON) – hier werden die meisten Änderungen gemacht
│   ├── site.json        Festivaldatum, Ort, Social Links, Maps
│   ├── bands.json       Band Library
│   ├── partners.json    Partner & Sponsoren
│   ├── faq.json         FAQ-Fragen & Antworten
│   ├── gallery.json     Galerie-Links
│   └── historie.json    Festival-Timeline
├── styles/
│   └── theme.css        ⭐ CI-Datei – Farben, Fonts, Gradienten
├── layouts/
│   └── BaseLayout.astro HTML-Shell, Fonts, Meta-Tags
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
