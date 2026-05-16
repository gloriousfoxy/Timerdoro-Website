// ============================================
// Timerdoro — Shared Components (Nav + Footer + Skip Link)
// ============================================
// All text is rendered via data-i18n keys so i18n.js can fill it in.
// Base path is detected from the stylesheet <link> tag so this file
// works correctly at every folder depth without per-page config.
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  // ── Detect base path ──
  var cssLink = document.querySelector('link[href*="style.css"]');
  var base = '';
  if (cssLink) {
    base = cssLink.getAttribute('href').replace(/assets\/css\/style\.css$/, '');
  }

  // ── Skip Link (a11y: first focusable element) ──
  if (!document.getElementById('skip-link')) {
    var skip = document.createElement('a');
    skip.id = 'skip-link';
    skip.className = 'skip-link';
    skip.href = '#main';
    skip.setAttribute('data-i18n', 'a11y.skip');
    skip.textContent = 'Skip to main content';
    document.body.insertBefore(skip, document.body.firstChild);
  }

  // Ensure <main> has id="main" so the skip link works
  var mainEl = document.querySelector('main');
  if (mainEl && !mainEl.id) mainEl.id = 'main';
  if (mainEl) mainEl.setAttribute('tabindex', '-1');

  // ── Nav ──
  var navPlaceholder = document.getElementById('nav-placeholder');
  if (navPlaceholder) {
    navPlaceholder.outerHTML =
      '<nav class="nav" aria-label="Primary">' +
        '<div class="nav-inner">' +
          '<a href="' + base + 'index.html" class="nav-logo" aria-label="Timerdoro home">' +
            '<img src="' + base + 'assets/images/app-icon.png"' +
                 ' alt=""' +
                 ' width="28" height="28"' +
                 ' style="border-radius: 8px; display: block;">' +
            '<span>Timerdoro</span>' +
          '</a>' +
          '<button class="nav-toggle" aria-label="Toggle menu" data-i18n-attr="aria-label:nav.menuToggle" aria-expanded="false" aria-controls="primary-nav-links">' +
            '<span aria-hidden="true">☰</span>' +
          '</button>' +
          '<div class="nav-links" id="primary-nav-links">' +
            '<a href="' + base + 'index.html" class="nav-link" data-i18n="nav.home">Home</a>' +
            '<a href="' + base + 'about/index.html" class="nav-link" data-i18n="nav.about">About</a>' +
            '<a href="' + base + 'faq/index.html" class="nav-link" data-i18n="nav.faq">FAQ</a>' +
            '<a href="' + base + 'press/index.html" class="nav-link" data-i18n="nav.press">Press</a>' +
            '<a href="' + base + 'contact/index.html" class="nav-link" data-i18n="nav.contact">Contact</a>' +
            '<button type="button" class="nav-lang" data-lang-toggle aria-label="Switch language">DE</button>' +
            '<a href="https://testflight.apple.com/join/EP1wd7Ma" class="nav-link nav-cta" data-i18n="nav.cta">Join Beta</a>' +
          '</div>' +
        '</div>' +
      '</nav>';
  }

  // ── Footer ──
  var footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.outerHTML =
      '<footer role="contentinfo">' +
        '<div class="footer-inner">' +
          '<div class="footer-grid">' +
            '<div class="footer-brand">' +
              '<a href="' + base + 'index.html" class="nav-logo" aria-label="Timerdoro home">' +
                '<img src="' + base + 'assets/images/app-icon.png"' +
                     ' alt=""' +
                     ' width="28" height="28"' +
                     ' style="border-radius: 8px; display: block;">' +
                '<span>Timerdoro</span>' +
              '</a>' +
              '<p data-i18n="footer.brand.tagline">A beautiful, privacy-respecting Pomodoro timer for Apple devices. Made with care in Vienna, Austria.</p>' +
            '</div>' +
            '<div class="footer-col">' +
              '<h2 class="footer-col-h" data-i18n="footer.col.product">Product</h2>' +
              '<ul>' +
                '<li><a href="' + base + 'index.html#features" data-i18n="footer.link.features">Features</a></li>' +
                '<li><a href="' + base + 'index.html#pricing" data-i18n="footer.link.pricing">Pricing</a></li>' +
                '<li><a href="' + base + 'faq/index.html" data-i18n="footer.link.faq">FAQ</a></li>' +
                '<li><a href="https://testflight.apple.com/join/EP1wd7Ma" data-i18n="footer.link.beta">Join Beta</a></li>' +
                '<li><a href="' + base + 'privacypolicy/index.html" data-i18n="footer.link.privacypolicy">App Store Policy Privacy</a></li>' +
              '</ul>' +
            '</div>' +
            '<div class="footer-col">' +
              '<h2 class="footer-col-h" data-i18n="footer.col.company">Company</h2>' +
              '<ul>' +
                '<li><a href="' + base + 'about/index.html" data-i18n="footer.link.about">About</a></li>' +
                '<li><a href="' + base + 'contact/index.html" data-i18n="footer.link.contact">Contact</a></li>' +
                '<li><a href="' + base + 'press/index.html" data-i18n="footer.link.press">Press Kit</a></li>' +
              '</ul>' +
            '</div>' +
            '<div class="footer-col">' +
              '<h2 class="footer-col-h" data-i18n="footer.col.legal">Legal</h2>' +
              '<ul>' +
                '<li><a href="' + base + 'legal/privacy/index.html" data-i18n="footer.link.privacy">Privacy</a></li>' +
                '<li><a href="' + base + 'legal/cookies/index.html" data-i18n="footer.link.cookies">Cookies</a></li>' +
                '<li><a href="' + base + 'legal/license/index.html" data-i18n="footer.link.license">License (EULA)</a></li>' +
                '<li><a href="' + base + 'legal/ai-disclosure/index.html" data-i18n="footer.link.ai-disclosure">AI Disclosure</a></li>' +
                '<li><a href="' + base + 'legal/credits/index.html" data-i18n="footer.link.credits">Credits</a></li>' +
                '<li><a href="' + base + 'legal/accessibility/index.html" data-i18n="footer.link.accessibility">Accessibility</a></li>' +
                '<li><a href="' + base + 'legal/impressum/index.html" data-i18n="footer.link.impressum">Impressum</a></li>' +
              '</ul>' +
            '</div>' +
          '</div>' +
          '<div class="footer-bottom">' +
            '<span data-i18n="footer.bottom.copy">© 2026 Timerdoro · Made with care in Austria</span>' +
            '<div class="footer-bottom-links">' +
              '<a href="' + base + 'legal/privacy/index.html" data-i18n="footer.link.privacy">Privacy</a>' +
              '<a href="' + base + 'legal/impressum/index.html" data-i18n="footer.link.impressum">Impressum</a>' +
              '<a href="' + base + 'legal/cookies/index.html" data-i18n="footer.link.cookies">Cookies</a>' +
              '<button type="button" class="footer-cookie-trigger" data-cookie-open data-i18n="cookie.openSettings">Manage cookies</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</footer>';
  }

  // ── Mobile Nav Toggle ──
  var toggle = document.querySelector('.nav-toggle');
  var links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // ── Active Link Highlighting ──
  var path = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (!href || href === '#') return;
    var absoluteHref = new URL(href, window.location.href).pathname;
    if (absoluteHref === path ||
        (absoluteHref.endsWith('/') && path.startsWith(absoluteHref) && absoluteHref !== '/')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // ── Language Toggle Click ──
  document.querySelectorAll('[data-lang-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (window.I18n) window.I18n.toggle();
    });
  });

});
