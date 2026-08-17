const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
addEventListener('load',()=>setTimeout(()=>document.body.classList.add('loaded'),250));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
if(!reduceMotion){
  const cursor=document.querySelector('.cursor');
  addEventListener('pointermove',e=>{cursor.style.left=`${e.clientX}px`;cursor.style.top=`${e.clientY}px`});
  document.querySelectorAll('a,button,.deck-card').forEach(el=>{el.addEventListener('pointerenter',()=>cursor.classList.add('big'));el.addEventListener('pointerleave',()=>cursor.classList.remove('big'))});
  const deck=document.querySelector('#deck');
  deck.addEventListener('pointermove',e=>{const r=deck.getBoundingClientRect(),nx=(e.clientX-r.left)/r.width-.5,ny=(e.clientY-r.top)/r.height-.5;deck.style.transform=`rotateX(${ny*-5}deg) rotateY(${nx*7}deg)`;deck.querySelectorAll('.deck-card').forEach(card=>card.style.marginTop=`${ny*Number(card.dataset.depth)*-13}px`)});
  deck.addEventListener('pointerleave',()=>{deck.style.transform='';deck.querySelectorAll('.deck-card').forEach(c=>c.style.marginTop='')});
  addEventListener('scroll',()=>document.querySelectorAll('[data-parallax]').forEach(el=>{const r=el.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight)el.style.setProperty('--parallax',`${(r.top-innerHeight/2)*-.025}px`)}),{passive:true});
  document.querySelectorAll('.magnetic').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.12}px)`});el.addEventListener('pointerleave',()=>el.style.transform='')});
}
const reel=document.querySelector('#showreel');
const openReel=()=>{reel.classList.add('open');reel.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'};
const closeReel=()=>{reel.classList.remove('open');reel.setAttribute('aria-hidden','true');document.body.style.overflow=''};
document.querySelector('#showreelBtn').addEventListener('click',openReel);document.querySelector('#closeReel').addEventListener('click',closeReel);reel.addEventListener('click',e=>{if(e.target===reel)closeReel()});addEventListener('keydown',e=>{if(e.key==='Escape')closeReel()});
