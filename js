const faders = document.querySelectorAll('.fade-up');

const appearOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer){
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    entry.target.style.opacity = 1;
    entry.target.style.transform = 'translateY(0)';
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// BACK TO TOP BUTTON
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if(window.scrollY > 300){
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});
backToTop.addEventListener('click', () => {
    window.scrollTo({top:0, behavior:'smooth'});
});

// HERO PARTICLE FLOAT
const particles = document.querySelectorAll('.particle');
particles.forEach((particle, index) => {
    let delay = index * 2; // staggered animation
    particle.style.animationDelay = ${delay}s;
});
// JS for scroll reveal
const sections = document.querySelectorAll('.scroll-reveal');

window.addEventListener('scroll', () => {
  const triggerBottom = window.innerHeight * 0.85;

  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if(sectionTop < triggerBottom){
      section.classList.add('active');
    }
  });
});
window.addEventListener('load', () => {
  document.getElementById('preloader').style.display = 'none';
});
