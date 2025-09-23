/* script.js — interactions for NP-Here */

/* Navbar toggle */
const navToggle = document.querySelector("#navToggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    navToggle.classList.toggle("active");
  });
}

/* Smooth scroll */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const targetId = link.getAttribute("href").slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
      if (navLinks && navToggle) {
        navLinks.classList.remove("open");
        navToggle.classList.remove("active");
      }
    }
  });
});

/* Scroll reveal */
const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => observer.observe(el));
} else {
  // Fallback: just show everything if IntersectionObserver not supported
  revealElements.forEach(el => el.classList.add("visible"));
}

/* Theme toggle */
const themeToggle = document.querySelector("#themeToggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const html = document.documentElement;
    html.dataset.theme = html.dataset.theme === "dark" ? "light" : "dark";
  });
}

/* Contact form (mock) */
const contactForm = document.querySelector("#contact form");
if (contactForm) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    alert("Thanks! We'll get back to you soon.");
    contactForm.reset();
  });
}
