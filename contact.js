// Burger (dacă nu e deja în app.js, îl ai aici oricum)
document.getElementById('burger')?.addEventListener('click',()=>{
  document.getElementById('menu')?.classList.toggle('open');
});

// --- Form submit via fetch către PHP ---
const form = document.getElementById('contactForm');
const alertBox = document.getElementById('formAlert');

form?.addEventListener('submit', async (e)=>{
  e.preventDefault();
  alertBox.className = 'alert';
  alertBox.textContent = '';

  const fd = new FormData(form);

  // honeypot: dacă e completat, oprim
  if (fd.get('website')) { return; }

  try{
    const res = await fetch('contact-send.php', { method:'POST', body: fd });
    const data = await res.json();
    if(data.success){
      alertBox.classList.add('ok');
      alertBox.textContent = 'Mulțumim! Mesajul a fost trimis.';
      form.reset();
    }else{
      alertBox.classList.add('err');
      alertBox.textContent = data.error || 'Eroare la trimitere. Încearcă din nou.';
    }
  }catch(err){
    alertBox.classList.add('err');
    alertBox.textContent = 'Eroare de rețea. Reîncearcă.';
  }
});

// --- WhatsApp & Instagram: long-press tip + click ---
const IG_TIP = 'urmarește-ne pe Instagram';
const WA_TIP = 'contactează-ne pe WhatsApp';

// Număr WhatsApp în format internațional FĂRĂ 0 inițial
// Am folosit 0758 639 548 => 40758639548
const WHATSAPP_NUMBER_INT = '40758639548'; 
const waBtn = document.getElementById('waBtn');
const igBtn = document.getElementById('igBtn');
const waTip = document.getElementById('waTip');
const igTip = document.getElementById('igTip');

function setupLongPress(el, tipEl){
  let timer=null;
  const show=()=> el.classList.add('show-tip');
  const hide=()=> el.classList.remove('show-tip');

  const start=()=>{ timer=setTimeout(show, 500); }; // 0.5s hold
  const end=()=>{ clearTimeout(timer); hide(); };

  el.addEventListener('mousedown', start);
  el.addEventListener('touchstart', start, {passive:true});
  ['mouseleave','mouseup','touchend','touchcancel','blur'].forEach(ev=> el.addEventListener(ev, end));
}

if (waBtn && waTip) setupLongPress(waBtn, waTip);
if (igBtn && igTip) setupLongPress(igBtn, igTip);

// Clicks
waBtn?.addEventListener('click', ()=>{
  // mesaj precompletat (opțional)
  const txt = encodeURIComponent('Bună! Aș dori informații despre serviciile DentalHome.');
  window.open(`https://wa.me/${WHATSAPP_NUMBER_INT}?text=${txt}`, '_blank');
});
