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



// ===== Topbar: icon-only on mobile with bottom sheet =====
(function(){
  const topbar = document.getElementById('topbar');
  const sheet  = document.getElementById('sheet');
  const backdrop = document.getElementById('sheetBackdrop');
  const closeBtn = document.getElementById('sheetClose');
  const titleEl  = document.getElementById('sheetTitle');
  const bodyEl   = document.getElementById('sheetBody');
  const actionsEl= document.getElementById('sheetActions');

  if(!topbar || !sheet) return;

  function openSheetFor(item){
    const type  = item.getAttribute('data-type');
    const title = item.getAttribute('data-title') || '';
    titleEl.textContent = title;
    bodyEl.innerHTML = '';
    actionsEl.innerHTML = '';

    if(type === 'tel'){
      const val = item.getAttribute('data-value');
      const link= item.getAttribute('data-link');
      bodyEl.innerHTML = `<p>Număr: <strong>${val}</strong></p>`;
      actionsEl.innerHTML = `
        <a href="${link}">Apelează</a>
        <button type="button" data-copy="${val}">Copiază numărul</button>
      `;
    }else if(type === 'addr'){
      const val = item.getAttribute('data-value');
      const link= item.getAttribute('data-link');
      bodyEl.innerHTML = `<p>Adresă: <strong>${val}</strong></p>`;
      actionsEl.innerHTML = `
        <a href="${link}" target="_blank" rel="noopener">Deschide pe Google Maps</a>
        <button type="button" data-copy="${val}">Copiază adresa</button>
      `;
    }else if(type === 'prog'){
      const lines = (item.getAttribute('data-lines') || '').split('|');
      bodyEl.innerHTML = lines.map(l=>`<div style="padding:6px 0;border-top:1px dashed #e9eef5">${l}</div>`).join('');
    }

    sheet.classList.add('is-open');
    sheet.setAttribute('aria-hidden','false');
  }
  function closeSheet(){
    sheet.classList.remove('is-open');
    sheet.setAttribute('aria-hidden','true');
  }

  // Copy handler
  sheet.addEventListener('click', async (e)=>{
    const btn = e.target.closest('[data-copy]');
    if(!btn) return;
    const txt = btn.getAttribute('data-copy');
    try{
      await navigator.clipboard.writeText(txt);
      btn.textContent = 'Copiat ✔';
      setTimeout(()=>{ btn.textContent = 'Copiază'; }, 1200);
    }catch{
      btn.textContent = 'Eroare la copiere';
      setTimeout(()=>{ btn.textContent = 'Copiază'; }, 1500);
    }
  });

  // Close interactions
  backdrop.addEventListener('click', closeSheet);
  closeBtn.addEventListener('click', closeSheet);
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeSheet(); });

  // Tap + long-press (400ms) pentru item
  topbar.querySelectorAll('.item').forEach(item=>{
    let pressTimer = null;
    const open = ()=> openSheetFor(item);

    // click (tap) deschide
    item.addEventListener('click', (e)=>{ e.preventDefault(); open(); });

    // long-press suport (util pe Android)
    item.addEventListener('touchstart', ()=>{
      pressTimer = setTimeout(open, 400);
    }, {passive:true});
    item.addEventListener('touchend', ()=>{ clearTimeout(pressTimer); });
    item.addEventListener('touchmove', ()=>{ clearTimeout(pressTimer); });
  });
})();

