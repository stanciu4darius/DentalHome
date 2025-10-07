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



// --- Topbar popovers (mobile & desktop) ---
const topbar = document.getElementById('topbar');
if (topbar) {
  // toggle popover la click pe item (doar când are .popover)
  topbar.querySelectorAll('.item').forEach(item => {
    const pop = item.querySelector('.popover');
    if (!pop) return;

    item.addEventListener('click', (e) => {
      // dacă s-a dat click pe link în interior, lăsăm să meargă
      const isInnerLink = e.target.closest('a') && pop.contains(e.target);
      if (isInnerLink) return;

      // toggle curent și închide restul
      const already = item.classList.contains('show');
      topbar.querySelectorAll('.item.show').forEach(i => i.classList.remove('show'));
      if (!already) item.classList.add('show');
      e.stopPropagation();
    });
  });

  // închide popover la click în afara lui sau la ESC
  document.addEventListener('click', () => {
    topbar.querySelectorAll('.item.show').forEach(i => i.classList.remove('show'));
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      topbar.querySelectorAll('.item.show').forEach(i => i.classList.remove('show'));
    }
  });

  // copy to clipboard pe butoanele cu data-copy
  topbar.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      try {
        await navigator.clipboard.writeText(btn.getAttribute('data-copy'));
        btn.textContent = 'Copiat ✔';
        setTimeout(() => btn.textContent = 'Copiază', 1200);
      } catch {
        btn.textContent = 'Nu s-a putut copia';
        setTimeout(() => btn.textContent = 'Copiază', 1500);
      }
    });
  });
}
