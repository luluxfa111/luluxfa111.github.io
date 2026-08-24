const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('.reveal').forEach((element)=>{
  if(reduceMotion){element.classList.add('visible');return;}
  const observer=new IntersectionObserver(([entry],instance)=>{
    if(!entry.isIntersecting)return;
    entry.target.classList.add('visible');
    instance.unobserve(entry.target);
  },{threshold:.08,rootMargin:'0px 0px -4%'});
  observer.observe(element);
});

if(!reduceMotion&&matchMedia('(pointer:fine)').matches){
  document.querySelectorAll('.instant').forEach((card)=>{
    card.addEventListener('pointermove',(event)=>{
      const rect=card.getBoundingClientRect();
      const x=(event.clientX-rect.left)/rect.width-.5;
      const y=(event.clientY-rect.top)/rect.height-.5;
      card.querySelector('.instant-image').style.transform=`rotateX(${y*-2.5}deg) rotateY(${x*3.5}deg)`;
    });
    card.addEventListener('pointerleave',()=>{
      card.querySelector('.instant-image').style.transform='';
    });
  });
}
