# diamoon-art – Website für Sandra

Statische Portfolio-Website für **diamoon-art**, die Kunst von Sandra, einer Malerin und Zeichnerin aus Altdorf (Schweiz). Die Seite präsentiert ihre Werke (Zeichnungen, Gemälde, geplant: Objekte), stellt sie kurz vor und bietet ein Kontaktformular. Laut `robots.txt` (`Disallow: /`) und den `<meta name="robots" content="noindex, nofollow">`-Tags auf allen Seiten ist die Website aktuell bewusst von der Suchmaschinen-Indexierung ausgeschlossen (z. B. weil sie sich noch im Aufbau befindet).

Hinweis: In `extracted_text.txt` und `Soulpaint.docx` findet sich eine frühere Konzept-/Textgrundlage unter dem Arbeitstitel „Soulpaint – Sandra" (Domain `soulpaint-sandra.ch`). Die umgesetzte Website verwendet inzwischen den Namen **diamoon-art** (Domain `diamoon-art.ch`, Logo `images/logo.svg`). Diese beiden Dateien werden hier nur als Kontext erwähnt und nicht verändert.

## Tech-Stack

- Reines HTML5, CSS3 und Vanilla JavaScript – kein Framework, kein Build-Tool
- Google Fonts (`EB Garamond`, `Lato`) werden per `@import` in `css/style.css` eingebunden
- Ein winziger, abhängigkeitsfreier Node.js-Entwicklungsserver (`scripts/serve.js`, nur Node-Standardbibliothek) für die lokale Vorschau – kein `package.json`, kein npm-Paket erforderlich

## Seiten / Funktionen

- **`index.html`** – Startseite mit Hero-Bereich, kurzer Einleitung, drei Themenkarten (Zeichnungen, Gemälde, Objekte) und einer Galerie-Vorschau
- **`galerie.html`** – Galerie aller Werke mit Filterbuttons (Alle / Zeichnungen / Gemälde / Objekte) und Lightbox zur Grossansicht (Klick auf ein Bild, Navigation per Pfeiltasten/Buttons, Escape zum Schliessen); Objekte/Skulpturen sind laut Seite „in Kürze" verfügbar
- **`ueber-mich.html`** – Vorstellung von Sandra (Wohnort Altdorf, Beruf Polygrafin, künstlerischer Stil und Motive)
- **`kontakt.html`** – Kontaktseite mit Standort-/E-Mail-Angabe, Social-Media-Icons (Platzhalter-Links) und einem Kontaktformular (nur Frontend – das Formular verhindert lediglich das Neuladen und zeigt eine Dankes-Notiz, es wird nichts an einen Server gesendet)
- **`blog.html`** – „Coming soon"-Platzhalterseite für einen künftigen Blog
- Responsive Navigation mit Hamburger-Menü für mobile Ansicht, Scroll-Reveal-Animationen und Header-Statuswechsel beim Scrollen (`js/script.js`)

## Lokal ansehen

Am einfachsten `index.html` direkt im Browser öffnen. Da einige Funktionen (z. B. relative Pfade) auch ohne Server funktionieren, reicht das für die meisten Zwecke aus.

Alternativ mit dem mitgelieferten Mini-Server (kein npm-Install nötig, nur Node.js erforderlich):

```
node scripts/serve.js
```

Die Seite ist danach unter `http://localhost:5500` erreichbar.

## Struktur

```
index.html          Startseite
galerie.html         Galerie mit Filter & Lightbox
ueber-mich.html       Über-mich-Seite
kontakt.html          Kontaktseite mit Formular
blog.html            Blog-Platzhalter ("Coming soon")
css/style.css         Zentrales Stylesheet (Farbvariablen, Layout, Lightbox, Animationen)
js/script.js          Navigation, Scroll-Reveal, Galerie-Filter, Lightbox, Kontaktformular-Handler
scripts/serve.js       Abhängigkeitsfreier lokaler Dev-Server (Node.js)
images/              Bilder der Werke (gemaelde-*.jpeg, zeichnung-*.jpeg), Logo, Portrait
images/design/        Zusätzliche Design-/Referenzbilder
images/unused/        Nicht verwendete Bilder (von Git ignoriert)
robots.txt            Steuert die Suchmaschinen-Indexierung
Soulpaint.docx         Früheres Konzeptdokument (Arbeitstitel „Soulpaint") – nicht verändern
extracted_text.txt     Extrahierter Text aus Soulpaint.docx, von Git ignoriert – nicht verändern
```

## Lizenz

Dieses Repository steht unter einer **dualen Lizenz**:

- **Quellcode** (HTML, CSS, JavaScript, Skripte): [MIT-Lizenz](LICENSE) – frei
  nutzbar, veränderbar und weitergebbar unter Nennung des Copyright-Hinweises.
- **Bilder, Kunstwerke und Texte** (u. a. alles im Ordner `images/` sowie die
  redaktionellen Inhalte): urheberrechtlich geschützt, siehe
  [IMAGES-LICENSE](IMAGES-LICENSE).

  > © 2026 Sandra Suter (diamoon-art), alle Bilder und Texte sind
  > urheberrechtlich geschützt, Nutzung nur mit ausdrücklicher Erlaubnis.

Kurz: Den Code darfst du gerne als Vorlage verwenden, die Kunstwerke und Texte
von Sandra jedoch nicht ohne schriftliche Zustimmung.
