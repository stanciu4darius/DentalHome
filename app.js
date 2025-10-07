// Burger toggle
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
burger?.addEventListener('click', () => menu.classList.toggle('open'));

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Back to top
const toTop = document.getElementById('toTop');
const onScroll = () => {
  if (window.scrollY > 480) toTop.classList.add('visible');
  else toTop.classList.remove('visible');
};
window.addEventListener('scroll', onScroll);
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
