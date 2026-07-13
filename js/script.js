// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Header background on scroll
const header = document.querySelector('.site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 20 ? '0 4px 20px rgba(0,0,0,0.06)' : 'none';
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

// Contact form (front-end only placeholder)
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formNote.classList.add('visible');
    contactForm.reset();
  });
}
