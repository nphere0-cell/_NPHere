// Scroll animation for features
const features = document.querySelectorAll('.feature');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

features.forEach(f => observer.observe(f));
// About Section scroll animation
const aboutSection = document.querySelector('.about-section');
const aboutObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      aboutSection.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

aboutObserver.observe(aboutSection);
