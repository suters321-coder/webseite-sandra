# CLAUDE.md

Guidance for Claude Code instances working in this repository.

## Project overview

This is a static portfolio website for "diamoon-art", showcasing the artwork (drawings, paintings, and a planned "objects" category) of an artist named Sandra, based in Altdorf, Switzerland. It's plain HTML/CSS/JS with no framework and no build step — five hand-written HTML pages (`index.html`, `galerie.html`, `ueber-mich.html`, `kontakt.html`, `blog.html`) sharing one stylesheet and one script file. All visible content is in German. The site is currently blocked from search indexing (`robots.txt` disallows everything, and every page has `<meta name="robots" content="noindex, nofollow">`), suggesting it's still in progress / not yet publicly launched. Note: `extracted_text.txt` and `Soulpaint.docx` are leftover planning material from an earlier working title ("Soulpaint"/`soulpaint-sandra.ch`) before the site was rebranded to "diamoon-art" — do not edit or rely on them as current spec, and do not modify them.

## Running / previewing locally

No install step and no `package.json` — this is dependency-free.

- Simplest: open `index.html` directly in a browser.
- Or run the included zero-dependency dev server (Node stdlib only): `node scripts/serve.js`, then visit `http://localhost:5500`. It serves static files relative to the repo root and maps common extensions (`.html`, `.css`, `.js`, `.png`, `.jpg`/`.jpeg`, `.svg`, `.ico`) to MIME types; unknown extensions fall back to `application/octet-stream`, and `/` maps to `index.html`.

## Structure notes

- `css/style.css` (~1350 lines) is the single stylesheet for all pages — color palette and design tokens are defined as CSS custom properties in `:root` (e.g. `--color-navy`, `--color-gold`, `--shadow-soft`, `--radius`). Reuse existing variables rather than hardcoding new colors.
- `js/script.js` is shared across all pages and is written defensively — every feature block checks `if (element)` / `if (list.length)` before wiring up listeners, since not every page has every element (e.g. gallery filters only exist on `galerie.html`, the contact form only on `kontakt.html`). Follow this pattern when adding new page-specific behavior to the shared script rather than splitting into per-page files.
- The gallery (`galerie.html`) drives both filtering and the lightbox off `data-cat` attributes on `.gallery-item` elements (values: `zeichnungen`, `gemaelde`, `objekte`). Adding a new artwork means adding a new `.gallery-item` block with the correct `data-cat` and an `<img loading="lazy" ...>` — the JS auto-discovers items via `querySelectorAll`, no registration step needed.
- The contact form in `kontakt.html` (`#contactForm`) is front-end only: `js/script.js` just calls `preventDefault()`, shows a "thanks" note, and resets the form. There is no backend/email integration — do not assume messages are actually sent anywhere unless that's added.
- Images live in `images/` with a naming convention: `gemaelde-*.jpeg` for paintings, `zeichnung-*.jpeg` for drawings. `images/unused/` and `extracted_text.txt` are listed in `.gitignore`.
- Every page repeats the same header/nav/footer markup by hand (no templating). When changing navigation or footer content, update it in all five HTML files.

## Conventions observed

- All user-facing text and `<html lang="de">` are German; keep new content consistent with that.
- Site branding is "diamoon-art" (domain `diamoon-art.ch`) — the older "Soulpaint" name in `Soulpaint.docx`/`extracted_text.txt` is historical and should not be reintroduced.
- No test suite, linter, or CI configuration exists; verification is manual (open in browser / use the dev server). Note: Node.js is **not installed** on this machine, so `scripts/serve.js` can't run and `node --check` isn't available — verify by opening files in a browser instead.

## Deployment & Betrieb (Stand Juli 2026)

- **Hosting:** GitHub Pages aus Repo `suters321-coder/webseite-sandra` (öffentlich), Branch `main`, Ordner `/root`. Jeder Push auf `main` deployt automatisch neu.
- **Domain:** `www.diamoon-art.ch` (Datei `CNAME`), HTTPS-Zertifikat aktiv, "Enforce HTTPS" an. DNS liegt bei **hosttech** (Nameserver ns1/2/3.hosttech.ch): Apex → 4 GitHub-A-Records (185.199.108–111.153), `www` → CNAME `suters321-coder.github.io`. E-Mail läuft über hosttech-MX (`mail1/mail2.hosttech.eu`) — bei DNS-Änderungen **nie** die MX-/TXT(SPF/DMARC)-Records anfassen. Ein Wildcard `*.diamoon-art.ch` zeigt noch auf hosttech (harmlos).
- **Sicherheit:** Strikte CSP + Referrer-Policy als `<meta>` auf allen Seiten; Formular-Härtung in `js/script.js`; Web3Forms-Spamschutz auf "Strict". Fonts sind lokal (`fonts/*.woff2`), einzige externe Verbindung ist `api.web3forms.com`.
- **Barrierefreiheit:** Alt-Texte, Skip-Link, `aria-expanded` am Menü, Lightbox mit Fokus-Falle + Tastaturbedienung, `aria-pressed` an Galerie-Filtern, Formular-Fehler per ARIA. Nicht maschinell verifiziert: Farbkontraste (WCAG) und echter Screenreader-Test.

### Bewusste Entscheidung: KEIN Cloudflare (vorerst)

X-Frame-Options / X-Content-Type-Options / frame-ancestors brauchen echte HTTP-Header, die GitHub Pages nicht setzen kann — dafür bräuchte es Cloudflare (o. Ä.) davor. **Bewusst nicht gemacht**, weil: Cloudflare erfordert Konto + Nameserver-Umzug weg von hosttech + fehleranfälliges Übertragen aller DNS-/MX-Records (Risiko E-Mail-Ausfall). Für eine Portfolio-Seite ohne Logins/Zahlungen ist der Nutzen (v. a. Clickjacking-Schutz) minimal. **Erst angehen, wenn die Seite wächst** (z. B. Shop mit Zahlungen).

## Offene To-dos / mögliche nächste Schritte

Diese Punkte stehen noch offen — bei Gelegenheit ansprechen/erinnern:

- [ ] **Google Search Console** einrichten (Sitemap `sitemap.xml` einreichen) für schnellere Indexierung — braucht Google-Konto + Domain-Verifizierung.
- [ ] **hCaptcha** im Kontaktformular (gratis) als zusätzlicher Spamschutz — braucht Konto auf hCaptcha.com + Site-Key + Widget-Code in `kontakt.html`.
- [ ] **Farbkontrast-Prüfung** (WCAG AA) mit einem Kontrast-Tool + Screenreader-Test für "vollständige" Barrierefreiheit.
- [ ] **Social-Media-Links** in `kontakt.html` sind noch Platzhalter (`href="#"`) — echte Instagram/Facebook/Pinterest-URLs eintragen.
- [ ] **Objekte-Kategorie** in der Galerie ist noch leer ("in Kürze") — Werke ergänzen, sobald vorhanden.
- [ ] **Cloudflare** (siehe oben) — nur falls die Seite mal wächst.
- [ ] Chrome "Sicheres DNS" auf dem Kundinnen-Laptop war nur zum Testen des Router-Caches — kann bei Übergabe zurückgestellt werden (optional).
