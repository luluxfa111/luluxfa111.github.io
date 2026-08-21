const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
addEventListener('load',()=>setTimeout(()=>document.body.classList.add('loaded'),250));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
// GSAP layer: deliberate entrance rhythm and scroll-linked case reveals.
if(!reduceMotion && window.gsap){
  gsap.registerPlugin(window.ScrollTrigger);
  const intro=gsap.timeline({defaults:{ease:'power3.out'}});
  intro.from('.hero>.eyebrow',{y:14,opacity:0,duration:.55})
    .from('.portfolio-title',{y:22,opacity:0,duration:.7},'-=.2')
    .from('.hero-manifesto,.actions',{y:16,opacity:0,stagger:.12,duration:.5},'-=.35')
    .from('.deck-card',{y:44,opacity:0,rotate:0,stagger:.09,duration:.8},'-=.2');
  gsap.utils.toArray('.case,.archive-feature,.archive-card,.lab-card,.personal-card').forEach((el,i)=>{
    gsap.from(el,{y:42,opacity:0,duration:.8,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 84%',once:true},delay:(i%3)*.04});
  });
}
if(!reduceMotion){
  const cursor=document.querySelector('.cursor');
  let lastStar=0;
  addEventListener('pointermove',e=>{if(Date.now()-lastStar<85)return;lastStar=Date.now();const star=document.createElement('i');star.className='cursor-star';star.textContent=Math.random()>.5?'✦':'·';star.style.left=`${e.clientX+(Math.random()*12-6)}px`;star.style.top=`${e.clientY+(Math.random()*12-6)}px`;document.body.append(star);setTimeout(()=>star.remove(),700)});
  addEventListener('pointermove',e=>{cursor.style.left=`${e.clientX}px`;cursor.style.top=`${e.clientY}px`});
  const hero=document.querySelector('.hero');
  addEventListener('pointermove',e=>{if(hero){hero.style.setProperty('--mx',`${e.clientX}px`);hero.style.setProperty('--my',`${e.clientY}px`)}});
  document.querySelectorAll('a,button,.deck-card').forEach(el=>{el.addEventListener('pointerenter',()=>cursor.classList.add('big'));el.addEventListener('pointerleave',()=>cursor.classList.remove('big'))});
  document.querySelectorAll('.deck-card,.case,.archive-card,.archive-feature,.lab-card,.personal-card').forEach(el=>el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.setProperty('--spot-x',`${e.clientX-r.left}px`);el.style.setProperty('--spot-y',`${e.clientY-r.top}px`)}));
  const deck=document.querySelector('#deck');
  deck.addEventListener('pointermove',e=>{const r=deck.getBoundingClientRect(),nx=(e.clientX-r.left)/r.width-.5,ny=(e.clientY-r.top)/r.height-.5;deck.style.transform=`rotateX(${ny*-5}deg) rotateY(${nx*7}deg)`;deck.querySelectorAll('.deck-card').forEach(card=>card.style.marginTop=`${ny*Number(card.dataset.depth)*-13}px`)});
  deck.addEventListener('pointerleave',()=>{deck.style.transform='';deck.querySelectorAll('.deck-card').forEach(c=>c.style.marginTop='')});
  addEventListener('scroll',()=>document.querySelectorAll('[data-parallax]').forEach(el=>{const r=el.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight)el.style.setProperty('--parallax',`${(r.top-innerHeight/2)*-.025}px`)}),{passive:true});
  document.querySelectorAll('.magnetic').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.12}px)`});el.addEventListener('pointerleave',()=>el.style.transform='')});
  const helloGlass=document.querySelector('.glass-heading img');
  if(helloGlass){
    addEventListener('pointermove',e=>{
      helloGlass.style.setProperty('--hello-y',`${(e.clientX/innerWidth-.5)*5}deg`);
      helloGlass.style.setProperty('--hello-x',`${(e.clientY/innerHeight-.5)*-3}deg`);
    });
  }
}
const reel=document.querySelector('#showreel');
const openReel=()=>{reel.classList.add('open');reel.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'};
const closeReel=()=>{reel.classList.remove('open');reel.setAttribute('aria-hidden','true');document.body.style.overflow=''};
document.querySelector('#showreelBtn').addEventListener('click',openReel);document.querySelector('#closeReel').addEventListener('click',closeReel);reel.addEventListener('click',e=>{if(e.target===reel)closeReel()});addEventListener('keydown',e=>{if(e.key==='Escape')closeReel()});
