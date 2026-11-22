const motion=document.querySelector('#motion');
motion.checked=matchMedia('(prefers-reduced-motion: reduce)').matches;
document.body.classList.toggle('no-motion',motion.checked);
motion.addEventListener('change',()=>document.body.classList.toggle('no-motion',motion.checked));
const art=document.querySelector('#art');
art.addEventListener('pointermove',e=>{if(motion.checked||e.pointerType==='touch')return;const r=art.getBoundingClientRect();art.style.transform=`perspective(1000px) rotateX(${-(e.clientY-r.top-r.height/2)/70}deg) rotateY(${(e.clientX-r.left-r.width/2)/70}deg)`});
art.addEventListener('pointerleave',()=>art.style.transform='');
const audienceText={learners:'Smaller lessons, visual maths and short quizzes help learners explore one idea at a time. Swipeable cards and a quiet pause space keep the experience flexible.',parents:'Explore the same small lessons together, celebrate effort, and make room for breaks. The browser demo lets you try the experience without creating a learner account.',educators:'The sample educator dashboard brings lesson completion and recall results together. Explore fictional learner profiles and see your current demo progress update as you learn.'};
document.querySelectorAll('[data-audience]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-audience]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));document.querySelector('#audience-copy').textContent=audienceText[b.dataset.audience]});
document.querySelector('#privacy').onclick=()=>document.querySelector('#privacy-dialog').showModal();
const menu=document.querySelector('.menu-toggle'),mainNav=document.querySelector('#main-nav');
function closeMenu(){menu.setAttribute('aria-expanded','false');mainNav.classList.remove('open')}
menu.onclick=()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));mainNav.classList.toggle('open',open)};
mainNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus()}});
document.querySelector('#download-product').onclick=()=>{document.querySelector('#release-note').textContent='Coming soon — the product is still in development. Explore the five working prototypes in the learning lab.'};
