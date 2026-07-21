// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
    });
  });
}

// Header state on scroll
const header = document.querySelector('.site-header');

function updateHeader() {
  if (header) {
    header.classList.toggle('scrolled', window.scrollY > 24);
  }
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// Scroll-reveal animations
const revealSelectors = [
  '.section-header', '.card', '.gallery-item', '.intro-visual',
  '.intro-text', '.about-content', '.portrait', '.contact-info',
  'form', '.coming-soon .icon', '.coming-soon h1', '.coming-soon p',
  '.blog-card', '.post-image', '.post-content'
].join(', ');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll(revealSelectors).forEach(el => {
    // Leichter Versatz für Elemente, die nebeneinander stehen
    const siblings = Array.from(el.parentElement.children).filter(s => s.matches('.card, .gallery-item, .blog-card'));
    const index = siblings.indexOf(el);
    if (index > 0) {
      el.style.transitionDelay = `${(index % 6) * 70}ms`;
    }
    el.classList.add('reveal');
    observer.observe(el);
  });
}

// Gallery filtering (galerie.html)
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryEmpty = document.getElementById('galleryEmpty');

if (filterButtons.length) {
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      let visibleCount = 0;
      galleryItems.forEach(item => {
        const match = filter === 'all' || item.dataset.cat === filter;
        item.style.display = match ? '' : 'none';
        if (match) visibleCount++;
      });

      if (galleryEmpty) {
        galleryEmpty.classList.toggle('visible', visibleCount === 0);
      }
    });
  });
}

// Lightbox: Werke in Grossansicht
const galleryImages = Array.from(document.querySelectorAll('.gallery-item img'));

if (galleryImages.length) {
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-label', 'Bildansicht');
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Schliessen">&times;</button>
    <button class="lightbox-prev" aria-label="Vorheriges Bild">&#8249;</button>
    <figure>
      <img alt="">
      <figcaption></figcaption>
    </figure>
    <button class="lightbox-next" aria-label="N&auml;chstes Bild">&#8250;</button>
  `;
  document.body.appendChild(lightbox);

  const lbImage = lightbox.querySelector('figure img');
  const lbCaption = lightbox.querySelector('figcaption');
  const btnClose = lightbox.querySelector('.lightbox-close');
  const btnPrev = lightbox.querySelector('.lightbox-prev');
  const btnNext = lightbox.querySelector('.lightbox-next');

  let currentList = [];
  let currentIndex = 0;

  function visibleImages() {
    return galleryImages.filter(img => {
      const item = img.closest('.gallery-item');
      return item && item.style.display !== 'none';
    });
  }

  function renderLightbox() {
    const img = currentList[currentIndex];
    if (!img) return;
    lbImage.src = img.src;
    lbImage.alt = img.alt;
    lbCaption.textContent = img.alt || '';
    const multiple = currentList.length > 1;
    btnPrev.style.display = multiple ? '' : 'none';
    btnNext.style.display = multiple ? '' : 'none';
  }

  function openLightbox(img) {
    currentList = visibleImages();
    currentIndex = Math.max(0, currentList.indexOf(img));
    renderLightbox();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    btnClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function stepLightbox(direction) {
    if (!currentList.length) return;
    currentIndex = (currentIndex + direction + currentList.length) % currentList.length;
    renderLightbox();
  }

  galleryImages.forEach(img => {
    const item = img.closest('.gallery-item');
    if (item) {
      item.addEventListener('click', () => openLightbox(img));
    }
  });

  btnClose.addEventListener('click', closeLightbox);
  btnPrev.addEventListener('click', (e) => { e.stopPropagation(); stepLightbox(-1); });
  btnNext.addEventListener('click', (e) => { e.stopPropagation(); stepLightbox(1); });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') stepLightbox(-1);
    if (e.key === 'ArrowRight') stepLightbox(1);
  });
}

// Kontaktformular: Client-Validierung + Versand über Web3Forms (api.web3forms.com)
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
const formSubmitBtn = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

if (contactForm && formNote) {
  // JS aktiv → eigene, konsistente Fehlermeldungen statt Browser-Standardbubbles.
  // Die HTML-Attribute (required, maxlength …) bleiben als Fallback ohne JS erhalten.
  contactForm.setAttribute('novalidate', 'novalidate');

  const fields = {
    name: {
      el: contactForm.querySelector('#name'),
      err: contactForm.querySelector('#name-error'),
      validate: (v) => {
        if (!v) return 'Bitte gib deinen Namen ein.';
        if (v.length < 2) return 'Der Name ist zu kurz.';
        if (v.length > 100) return 'Der Name ist zu lang (max. 100 Zeichen).';
        return '';
      }
    },
    email: {
      el: contactForm.querySelector('#email'),
      err: contactForm.querySelector('#email-error'),
      validate: (v) => {
        if (!v) return 'Bitte gib deine E-Mail-Adresse ein.';
        if (v.length > 150) return 'Die E-Mail-Adresse ist zu lang.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Bitte gib eine gültige E-Mail-Adresse ein.';
        return '';
      }
    },
    message: {
      el: contactForm.querySelector('#message'),
      err: contactForm.querySelector('#message-error'),
      validate: (v) => {
        if (!v) return 'Bitte schreib eine kurze Nachricht.';
        if (v.length < 5) return 'Deine Nachricht ist zu kurz.';
        if (v.length > 2000) return 'Deine Nachricht ist zu lang (max. 2000 Zeichen).';
        return '';
      }
    }
  };

  const setFieldError = (field, msg) => {
    if (field.err) field.err.textContent = msg;
    if (field.el) {
      field.el.setAttribute('aria-invalid', msg ? 'true' : 'false');
      field.el.classList.toggle('input-invalid', !!msg);
    }
  };

  const validateField = (field) => {
    const value = field.el ? field.el.value.trim() : '';
    const msg = field.validate(value);
    setFieldError(field, msg);
    return !msg;
  };

  // Live-Feedback: Fehler prüfen beim Verlassen des Feldes bzw. beim Korrigieren.
  Object.values(fields).forEach((field) => {
    if (!field.el) return;
    field.el.addEventListener('blur', () => validateField(field));
    field.el.addEventListener('input', () => {
      if (field.el.getAttribute('aria-invalid') === 'true') validateField(field);
    });
  });

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    formNote.classList.remove('visible', 'error');

    // Alle Felder prüfen; bei Fehlern ersten fokussieren und abbrechen.
    let firstInvalid = null;
    Object.values(fields).forEach((field) => {
      if (!validateField(field) && !firstInvalid) firstInvalid = field.el;
    });
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    if (formSubmitBtn) {
      formSubmitBtn.disabled = true;
      formSubmitBtn.textContent = 'Wird gesendet …';
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(contactForm)))
      });

      let result = {};
      try { result = await response.json(); } catch (_) { /* keine/ungültige JSON-Antwort */ }

      if (response.ok && result.success) {
        formNote.textContent = 'Danke für deine Nachricht! Ich melde mich bald bei dir zurück.';
        formNote.classList.add('visible');
        contactForm.reset();
        Object.values(fields).forEach((field) => setFieldError(field, ''));
      } else {
        throw new Error(result.message || ('HTTP ' + response.status));
      }
    } catch (error) {
      formNote.textContent = 'Ups, das hat leider nicht geklappt. Bitte versuch es in ein paar Minuten nochmal oder schreib mir direkt eine E-Mail.';
      formNote.classList.add('visible', 'error');
    } finally {
      if (formSubmitBtn) {
        formSubmitBtn.disabled = false;
        formSubmitBtn.textContent = 'Nachricht senden';
      }
    }
  });
}
