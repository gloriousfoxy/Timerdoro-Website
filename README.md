# Timerdoro — Website

A bilingual (DE/EN) marketing & legal site for the Timerdoro Pomodoro app.
Production site → https://timerdoro.wudernitz.at

## What this is

Two things in one repository:

1. The **real product website** for Timerdoro (Beta in TestFlight)
2. A **complete LVA submission** mapped to six university tasks

## LVA-Aufgaben — Mapping

| Aufgabe                                       | Wo gelöst                                                 |
|-----------------------------------------------|------------------------------------------------------------|
| **1.** Barrierefreiheit (WCAG 2.2 AA)         | `legal/accessibility/index.html` + Skip-Link in `components.js` + Kontrast-Fixes in `style.css` |
| **2.** Urheberrecht / Quellen & Lizenzen      | `legal/credits/index.html` — mit echtem Audio + animiertem SVG |
| **3.** Marke (Wort/Bild/Farbe + Nizza-Klassen)| `about/index.html` — Brand-Section mit drei Marken         |
| **4.** Lizenzbestimmungen (EULA)              | `legal/license/index.html` — 10 Sektionen nach KSchG/ABGB/UrhG |
| **5.** Datenschutz + Cookies (DSGVO)          | `legal/privacy/index.html` + `legal/cookies/index.html` + Mock-Banner in `main.js` |
| **6.** Gewerbe / Impressum / Kontaktformular  | `legal/impressum/index.html` + `contact/index.html` (Mock-Formular) |

## File structure

```
timerdoro/
├── index.html                       Landing page (new per-platform showcase)
├── 404.html                         Not-found page
├── README.md                        This file
├── about/index.html                 Team + Brand (3 Markenformen)
├── contact/index.html               Email + Mock contact form
├── faq/index.html                   15 Q&A
├── press/index.html                 Press kit
└── legal/
    ├── privacy/index.html           DSGVO Datenschutz
    ├── cookies/index.html           Cookie-Policy mit Kategorien
    ├── impressum/index.html         § 5 ECG / § 25 MedienG
    ├── license/index.html           EULA (KSchG/ABGB/UrhG)
    ├── credits/index.html           Urheberrecht-Doku mit Audio/SVG
    └── accessibility/index.html     Barrierefreiheitserklärung
```

```
assets/
├── audio/completion-chime.mp3       4 KB  — CC0 (self-generated)
│       completion-chime.wav        70 KB — CC0 backup
├── video/timer-ring-animation.svg   2 KB  — CC BY 4.0 SMIL animation
├── images/                          App screenshots + icons
├── css/style.css                   ~1900 lines
└── js/
    ├── translations.js              509 EN + 509 DE strings
    ├── i18n.js                      i18n engine + language switcher
    ├── components.js                Nav, footer, skip link
    └── main.js                      Cookie banner mock + form mock
```

## How the i18n works

Every visible text is marked with `data-i18n="namespace.key"`.
The engine in `i18n.js` looks up the key in `translations.js` for the
currently active language and replaces the element's textContent.

Examples:
```html
<h1 data-i18n="hero.titleA">Focus, simplified.</h1>
<input data-i18n-attr="placeholder:contact.form.namePh">
<title data-i18n="index.title">Timerdoro</title>
```

Default text in the HTML is the English fallback shown until JS runs.

Language is stored in `localStorage` under `timerdoro_lang` and
preserved across pages. Browser language is detected on first visit.

## How the Cookie banner works (DSGVO mock)

The banner shows 4 categories per § 165 TKG 2021 / GDPR Art. 6:
- **Strictly necessary** — always on (language + consent flag)
- **Functional** — would store UI prefs (currently inert)
- **Analytics (mock)** — labelled "Currently not active"
- **Marketing (mock)** — labelled "Currently not active"

The UI is fully implemented (Accept / Reject / Save / Manage). Consent is stored
in `localStorage.timerdoro_cookie_consent_v2`. Nothing is ever actually transmitted —
the inactive categories are documented as such in the cookie policy.

## Local testing

For full fidelity (the cookie banner needs JS, language toggle needs translations.js):

```bash
cd /path/to/timerdoro
python3 -m http.server 8000
# → http://localhost:8000
```

## Deployment

Standard FTP to World4You:
- Host: `ftp.world4you.com`
- Port: `21`
- Target folder: `html/`

Upload the contents of this directory.

## Author

Raphael Wudernitz · timerdoro@wudernitz.at · github.com/gloriousfoxy

## License

All code and content © Raphael Wudernitz 2026 unless attributed otherwise on `/legal/credits`.
