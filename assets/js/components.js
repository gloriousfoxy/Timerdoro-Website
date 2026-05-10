// ============================================
// Timerdoro — Shared Components (Nav + Footer)
// ============================================
// Base path is detected from the stylesheet <link> tag so this file
// works correctly at every folder depth without any per-page config.

document.addEventListener('DOMContentLoaded', function () {

  // ── Detect base path ──
  // e.g. "../../assets/css/style.css" → base = "../../"
  //      "assets/css/style.css"       → base = ""
  var cssLink = document.querySelector('link[href*="style.css"]');
  var base = '';
  if (cssLink) {
    base = cssLink.getAttribute('href').replace(/assets\/css\/style\.css$/, '');
  }

  // ── Nav ──
  var navPlaceholder = document.getElementById('nav-placeholder');
  if (navPlaceholder) {
    navPlaceholder.outerHTML =
      '<nav class="nav">' +
        '<div class="nav-inner">' +
          '<a href="' + base + 'index.html" class="nav-logo">' +
            '<img src="' + base + 'assets/images/app-icon.png"' +
                 ' alt="Timerdoro" width="28" height="28"' +
                 ' style="border-radius: 8px; display: block;">' +
            'Timerdoro' +
          '</a>' +
          '<button class="nav-toggle" aria-label="Toggle menu">☰</button>' +
          '<div class="nav-links">' +
            '<a href="' + base + 'index.html" class="nav-link">Home</a>' +
            '<a href="' + base + 'about/index.html" class="nav-link">About</a>' +
            '<a href="' + base + 'faq/index.html" class="nav-link">FAQ</a>' +
            '<a href="' + base + 'press/index.html" class="nav-link">Press</a>' +
            '<a href="' + base + 'contact/index.html" class="nav-link">Contact</a>' +
            '<a href="#" class="nav-link nav-cta">Join Beta</a>' +
          '</div>' +
        '</div>' +
      '</nav>';
  }

  // ── Footer ──
  var footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.outerHTML =
      '<footer>' +
        '<div class="footer-inner">' +
          '<div class="footer-grid">' +
            '<div class="footer-brand">' +
              '<a href="' + base + 'index.html" class="nav-logo">' +
                '<img src="' + base + 'assets/images/app-icon.png"' +
                     ' alt="Timerdoro" width="28" height="28"' +
                     ' style="border-radius: 8px; display: block;">' +
                'Timerdoro' +
              '</a>' +
              '<p>A beautiful, privacy-respecting Pomodoro timer for Apple devices. Made with care in Vienna, Austria.</p>' +
            '</div>' +
            '<div class="footer-col">' +
              '<h4>Product</h4>' +
              '<ul>' +
                '<li><a href="' + base + 'index.html#features">Features</a></li>' +
                '<li><a href="' + base + 'index.html#pricing">Pricing</a></li>' +
                '<li><a href="' + base + 'faq/index.html">FAQ</a></li>' +
                '<li><a href="#">Join Beta</a></li>' +
              '</ul>' +
            '</div>' +
            '<div class="footer-col">' +
              '<h4>Company</h4>' +
              '<ul>' +
                '<li><a href="' + base + 'about/index.html">About</a></li>' +
                '<li><a href="' + base + 'contact/index.html">Contact</a></li>' +
                '<li><a href="' + base + 'press/index.html">Press Kit</a></li>' +
              '</ul>' +
            '</div>' +
            '<div class="footer-col">' +
              '<h4>Legal</h4>' +
              '<ul>' +
                '<li><a href="' + base + 'legal/privacy/index.html">Privacy</a></li>' +
                '<li><a href="' + base + 'legal/cookies/index.html">Cookies</a></li>' +
                '<li><a href="' + base + 'legal/impressum/index.html">Impressum</a></li>' +
              '</ul>' +
            '</div>' +
          '</div>' +
          '<div class="footer-bottom">' +
            '<span>© 2026 Timerdoro · Made with Joy in Austria</span>' +
            '<div class="footer-bottom-links">' +
              '<a href="' + base + 'legal/privacy/index.html">Privacy</a>' +
              '<a href="' + base + 'legal/impressum/index.html">Impressum</a>' +
              '<a href="' + base + 'legal/cookies/index.html">Cookies</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</footer>';
  }

});
