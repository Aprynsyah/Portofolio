AOS.init({duration:750,once:true,offset:50,easing:'ease-out-quart'});

// Custom cursor
const cur=document.getElementById('cur'),ring=document.getElementById('curRing');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx-4+'px';cur.style.top=my-4+'px';});
(function loop(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.left=rx-18+'px';ring.style.top=ry-18+'px';requestAnimationFrame(loop);})();
document.querySelectorAll('a,button').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cur.style.transform='scale(2.5)';ring.style.opacity='0';});
  el.addEventListener('mouseleave',()=>{cur.style.transform='scale(1)';ring.style.opacity='1';});
});

// Navbar
const nav=document.getElementById('navbar');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>40));

// Active nav
const secs=document.querySelectorAll('section[id]'),navAs=document.querySelectorAll('.nav-links a');
new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){navAs.forEach(a=>a.classList.remove('active'));const a=document.querySelector(`.nav-links a[href="#${e.target.id}"]`);if(a)a.classList.add('active');}});
},{threshold:.4}).observe.bind(null)&&secs.forEach(s=>new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){navAs.forEach(a=>a.classList.remove('active'));const a=document.querySelector(`.nav-links a[href="#${e.target.id}"]`);if(a)a.classList.add('active');}});},{threshold:.4}).observe(s));

// Mobile menu
function toggleMenu(){document.getElementById('mobileMenu').classList.toggle('open');}

// Theme
function toggleMode(){document.body.classList.toggle('light');document.getElementById('themeBtn').textContent=document.body.classList.contains('light')?'🌙':'☀️';}

// Skill bars
new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.querySelectorAll('.skill-fill').forEach(b=>b.style.transform=`scaleX(${b.dataset.w/100})`);});
},{threshold:.2}).observe(document.getElementById('skills'));

// Contact send
function handleSend(){
  const b=document.getElementById('sendBtn');
  b.textContent='Terkirim ✓';b.style.background='#3ecf8e';
  setTimeout(()=>{b.textContent='Kirim Pesan →';b.style.background='';},3000);
}