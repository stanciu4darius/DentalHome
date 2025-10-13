// Burger (în caz că nu-l prinzi din app.js)
document.getElementById('burger')?.addEventListener('click',()=>{
  document.getElementById('menu')?.classList.toggle('open');
});

// Reveal on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('show');
      io.unobserve(e.target);
    }
  });
},{threshold:.12});
document.querySelectorAll('.reveal, .feat, .panel, .side-card').forEach(el=> io.observe(el));
