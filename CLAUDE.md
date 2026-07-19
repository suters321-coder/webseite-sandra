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
- No test suite, linter, or CI configuration exists; verification is manual (open in browser / use the dev server).
