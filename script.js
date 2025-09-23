/* script.js — np-here.vercel.app interactions */

/* ----------- Navbar toggle (mobile) ----------- */
const navToggle = document.querySelector("#navToggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    navToggle.classList.toggle("active");
  });
}

/* ----------- Smooth scroll ----------- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const targetId = link.getAttribute("href").slice(1);
    const target = document.getElementById(targetId);

    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
      navLinks?.classList.remove("open"); // close menu after click (mobile)
      navToggle?.classList.remove("active");
    }
  });
});

/* ----------- Scroll reveal (cards, hero, etc.) ----------- */
const revealElements = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => observer.observe(el));

/* ----------- Theme toggle ----------- */
const themeToggle = document.querySelector("#themeToggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.documentElement.dataset.theme =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  });
}

