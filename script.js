/* script.js — interactions (no modern optional chaining used) */

/* small selectors */
function $ (sel, root) { return (root || document).querySelector(sel); }
function $$ (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

/* NAV TOGGLE */
var navToggle = $('#navToggle');
var navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', function () {
    var opened = navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', String(opened));
  });
}

/* THEME TOGGLE (persist) */
var themeToggle = $('#themeToggle');
var stored = localStorage.getItem('np-theme');
if (stored === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  if (themeToggle) themeToggle.setAttribute('aria-pressed', 'true');
} else {
  document.documentElement.setAttribute('data-theme', 'light');
  if (themeToggle) themeToggle.setAttribute('aria-pressed', 'false');
}
if (themeToggle) {
  themeToggle.addEventListener('click', function () {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('np-theme', isDark ? 'light' : 'dark');
    themeToggle.setAttribute('aria-pressed', String(!isDark));
  });
}

/* SMOOTH SCROLL FOR INTERNAL LINKS */
$$('a[href^="#"]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    var href = link.getAttribute('href');
    if (!href || href === '#') return;
    var id = href.slice(1);
    var target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      // close mobile nav if open
      if (navLinks && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
      }
    }
  });
});

/* REVEAL ON SCROLL (IntersectionObserver with fallback) */
var reveals = $$('.reveal');
if ('IntersectionObserver' in window) {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(function (r) { observer.observe(r); });
} else {
  reveals.forEach(function (r) { r.classList.add('visible'); });
}

/* FAQ ACCORDION */
$$('.faq-item').forEach(function (item) {
  var q = item.querySelector('.faq-question');
  if (!q) return;
  q.addEventListener('click', function () {
    var isOpen = item.classList.toggle('open');
    var toggle = q.querySelector('.toggle');
    if (toggle) toggle.textContent = isOpen ? '-' : '+';
  });
});

/* NEWSLETTER (mock) */
var newsletter = $('#newsletter');
if (newsletter) {
  newsletter.addEventListener('submit', function (e) {
    e.preventDefault();
    var fm = new FormData(newsletter);
    var email = fm.get('email') || '';
    alert('Subscribed: ' + email);
    newsletter.reset();
  });
}

/* CONTACT FORM (mock) */
var contactForm = $('#contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var fm = new FormData(contactForm);
    var name = fm.get('name') || 'Friend';
    alert('Thanks ' + name + ', we received your message. (This is a demo.)');
    contactForm.reset();
  });
}

/* small nicety: year in footer */
var y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();
