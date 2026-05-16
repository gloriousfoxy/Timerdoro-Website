# Timerdoro — Website

Bilinguale (DE/EN) Marketing- und Rechtsseite für die Timerdoro Pomodoro-App.
Live unter → https://timerdoro.wudernitz.at

## Was das hier ist

Zwei Dinge in einem Repo:

1. Die **echte Produkt-Website** für Timerdoro (Beta in TestFlight)
2. Eine **komplette LVA-Abgabe**, gemappt auf sechs Uni-Aufgaben

## LVA-Aufgaben — Mapping

| Aufgabe                                       | Wo gelöst                                                  |
|-----------------------------------------------|------------------------------------------------------------|
| **1.** Barrierefreiheit (WCAG 2.2 AA)         | `legal/accessibility/index.html` + Skip-Link in `components.js` + Kontrast-Fixes in `style.css` |
| **2.** Urheberrecht / Quellen & Lizenzen      | `legal/credits/index.html` — mit echtem Audio + animiertem SVG |
| **3.** Marke (Wort/Bild/Farbe + Nizza-Klassen)| `about/index.html` — Brand-Section mit drei Marken         |
| **4.** Lizenzbestimmungen (EULA)              | `legal/license/index.html` — 10 Sektionen nach KSchG/ABGB/UrhG |
| **5.** Datenschutz + Cookies (DSGVO)          | `legal/privacy/index.html` + `legal/cookies/index.html` + Mock-Banner in `main.js` |
| **6.** Gewerbe / Impressum / Kontaktformular  | `legal/impressum/index.html` + `contact/index.html` (Mock-Formular) |

## Dateistruktur

```
timerdoro/
├── index.html                       Landing-Page (Showcase pro Plattform)
├── 404.html                         Not-found-Seite
├── robots.txt                       Crawler-Anweisungen
├── sitemap.xml                      URL-Liste für Suchmaschinen
├── README.md                        Diese Datei
├── about/index.html                 Über mich + Marke (3 Markenformen)
├── contact/index.html               E-Mail + Mock-Kontaktformular
├── faq/index.html                   15 Q&A
├── press/index.html                 Pressemappe
└── legal/
    ├── privacy/index.html           DSGVO Datenschutz
    ├── cookies/index.html           Cookie-Policy mit Kategorien
    ├── impressum/index.html         § 5 ECG / § 25 MedienG
    ├── license/index.html           EULA (KSchG/ABGB/UrhG)
    ├── credits/index.html           Urheberrecht-Doku mit Audio/SVG
    ├── accessibility/index.html     Barrierefreiheitserklärung
    └── ai-disclosure/index.html     KI-Transparenz (EU AI Act)

assets/
├── audio/completion-chime.mp3       4 KB  — CC0 (selbst generiert)
│       completion-chime.wav        70 KB — CC0 Backup
├── video/timer-ring-animation.svg   2 KB  — CC BY 4.0 SMIL-Animation
├── images/                          App-Screenshots + Icons
├── css/style.css                   ~1900 Zeilen
└── js/
    ├── translations.js              EN + DE Strings
    ├── i18n.js                      i18n-Engine + Sprachumschalter
    ├── components.js                Nav, Footer, Skip-Link
    └── main.js                      Cookie-Banner-Mock + Formular-Mock
```

## Wie das i18n funktioniert

Jeder sichtbare Text trägt ein `data-i18n="namespace.key"`-Attribut.
Die Engine in `i18n.js` schaut den Key in `translations.js` für die
aktuell aktive Sprache nach und ersetzt den textContent.

Beispiele:
```html
<h1 data-i18n="hero.titleA">Focus, simplified.</h1>
<input data-i18n-attr="placeholder:contact.form.namePh">
<title data-i18n="index.title">Timerdoro</title>
```

Der Default-Text im HTML ist der englische Fallback, der angezeigt wird,
bis JS läuft.

Die Sprache wird in `localStorage` unter `timerdoro_lang` gespeichert und
über alle Seiten hinweg beibehalten. Beim ersten Besuch wird die Browser-Sprache
erkannt.

## Wie der Cookie-Banner funktioniert (DSGVO-Mock)

Der Banner zeigt 4 Kategorien gemäß § 165 TKG 2021 / DSGVO Art. 6:

- **Unbedingt erforderlich** — immer an (Sprache + Einwilligungs-Flag)
- **Funktional** — würde UI-Einstellungen speichern (aktuell inert)
- **Analyse (Mock)** — als „aktuell nicht aktiv" beschriftet
- **Marketing (Mock)** — als „aktuell nicht aktiv" beschriftet

Das UI ist voll implementiert (Akzeptieren / Ablehnen / Speichern / Verwalten).
Einwilligungen landen in `localStorage.timerdoro_cookie_consent_v2`. Übertragen
wird nichts — die inaktiven Kategorien sind in der Cookie-Policy entsprechend
dokumentiert.

## Lokales Testen

Für volle Funktionalität (Cookie-Banner braucht JS, Sprachumschalter braucht
`translations.js`) lokal über einen kleinen HTTP-Server laufen lassen:

```bash
cd /pfad/zu/timerdoro
python3 -m http.server 8000
# → http://localhost:8000
```

`file://` direkt im Browser geht nicht — der Browser blockiert dann das
Laden der JS-Module aus Sicherheitsgründen.

## Deployment

Standard-FTP zu World4You:

- Host: `ftp.world4you.com`
- Port: `21`
- Zielordner: `html/`

Inhalt dieses Verzeichnisses hochladen, fertig.

## Autor

Raphael Wudernitz · timerdoro@wudernitz.at · github.com/gloriousfoxy

## Lizenz

Sämtlicher Code und alle Inhalte © Raphael Wudernitz 2026, soweit nicht
auf `/legal/credits` anders ausgewiesen.
