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


buyBtn?.addEventListener('click', async () => {
  try {
    // trimitem detalii minime; prețul îl stabilește backend-ul (sursă de adevăr)
    const resp = await fetch('https://backendul-tau.exemplu.com/create-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        packageCode: 'BASIC',
        // opțional: email client, nume etc. dacă vrei precompletare
      })
    });
    const data = await resp.json();

    if (data.redirectUrl) {
      window.location.href = data.redirectUrl; // redirect către pagina EuPlătesc
    } else if (data.formHtml) {
      // unele integrări cer POST cu formular; îl injectăm și îl trimitem
      const div = document.createElement('div');
      div.innerHTML = data.formHtml;
      document.body.appendChild(div);
      div.querySelector('form')?.submit();
    } else {
      alert('Nu am putut porni plata. Încearcă din nou.');
    }

  } catch (e) {
    console.error(e);
    alert('Eroare la inițierea plății.');
  }
});


askBtn?.addEventListener('click', ()=>{
  // deschide email implicit cu subiect presetat
  window.location.href = 'mailto:contact@clinicadentalhome.ro?subject=Întrebare%20despre%20Pachet%20Basic';
});
