// arată pachetul cu animația generală
const ioPkg = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('show'); ioPkg.unobserve(e.target); }
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=> ioPkg.observe(el));

// CTA – deocamdată doar mesaj; ulterior legăm metoda de plată
const buyBtn = document.getElementById('buyBasic');
const askBtn = document.getElementById('askBasic');

function toast(msg){
  // toast minimalist
  let t = document.createElement('div');
  t.textContent = msg;
  Object.assign(t.style,{
    position:'fixed',left:'50%',bottom:'24px',transform:'translateX(-50%)',
    background:'#0d1b4f',color:'#fff',padding:'12px 16px',borderRadius:'12px',
    boxShadow:'0 12px 30px rgba(13,27,79,.3)',zIndex:9999,fontWeight:'600'
  });
  document.body.appendChild(t);
  setTimeout(()=>{ t.style.opacity='0'; t.style.transition='opacity .3s'; },1800);
  setTimeout(()=> t.remove(), 2200);
}

buyBtn?.addEventListener('click', ()=>{
  // aici vom integra plata; deocamdată doar feedback
  toast('Plata online va fi disponibilă în curând. Te putem programa telefonic!');
});

askBtn?.addEventListener('click', ()=>{
  // deschide email implicit cu subiect presetat
  window.location.href = 'mailto:contact@clinicadentalhome.ro?subject=Întrebare%20despre%20Pachet%20Basic';
});
