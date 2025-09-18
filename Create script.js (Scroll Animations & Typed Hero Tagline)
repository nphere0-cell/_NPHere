// Typed.js Effect (Hero Tagline)
const typed = new Typed('.hero p', {
    strings: ["Beyond Limits, Into Tomorrow"],
    typeSpeed: 60,
    backSpeed: 30,
    loop: true
});

// Scroll Reveal Animations
const faders = document.querySelectorAll('.fade-up');

const appearOptions = { threshold: 0.5, rootMargin: "0px 0px -50px 0px" };
const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('show');
        appearOnScroll.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));
