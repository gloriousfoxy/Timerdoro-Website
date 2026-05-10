# 🍅 Timerdoro — Website

The marketing website for **Timerdoro**, a beautiful, privacy-first Pomodoro timer for iPhone, iPad, and Mac.

> Live: [raphael.wudernitz.at/raphael/timerdoro](https://raphael.wudernitz.at/raphael/timerdoro)

---

## Pages

| Route | Description |
|---|---|
| `/` | Landing page — hero, features, pricing |
| `/about/` | The story behind Timerdoro |
| `/faq/` | Frequently asked questions |
| `/press/` | Press kit & brand assets |
| `/contact/` | Contact information |
| `/legal/privacy/` | Privacy policy |
| `/legal/impressum/` | Impressum (Austrian law) |
| `/legal/cookies/` | Cookie policy |
| `/404.html` | Custom 404 page |

---

## Structure

```
timerdoro/
├── index.html
├── 404.html
├── about/
│   └── index.html
├── contact/
│   └── index.html
├── faq/
│   └── index.html
├── press/
│   └── index.html
├── legal/
│   ├── privacy/index.html
│   ├── impressum/index.html
│   └── cookies/index.html
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   ├── components.js   ← shared nav & footer
    │   └── main.js         ← nav toggle, active links, cookie banner
    └── images/
        └── app-icon.png
```

### Key architecture note

Nav and footer live **once** in `assets/js/components.js` and are injected into every page at runtime. Each page only contains a `<div id="nav-placeholder"></div>` and `<div id="footer-placeholder"></div>`. The correct relative base path is auto-detected from the stylesheet `<link>` tag — no per-page config needed.

---

## Local development

No build step, no dependencies. Just open `index.html` in a browser:

```bash
# Option A — direct file open
open index.html

# Option B — local server (avoids any file:// quirks)
python3 -m http.server 8080
# → http://localhost:8080
```

---

## Deployment

The site is plain HTML/CSS/JS — deploy anywhere that serves static files.

**GitHub Pages**
1. Push to `main`
2. Settings → Pages → Source: `main / (root)`
3. Available at `https://USERNAME.github.io/timerdoro/`

---

## Tech

- Plain HTML5, CSS3, vanilla JS — zero dependencies, zero build tools
- Dark-mode-first design with CSS custom properties
- Responsive & mobile-friendly

---

## Developer

**Raphael Wudernitz** — Informatics student at TU Wien, indie iOS developer  
[raphael@wudernitz.at](mailto:raphael@wudernitz.at) · [github.com/gloriousfoxy](https://github.com/gloriousfoxy)
