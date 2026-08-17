const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index % 4, 3) * 80}ms`;
  observer.observe(item);
});

const stage = document.querySelector('#cardStage');
if (stage && !reduceMotion) {
  stage.addEventListener('pointermove', (event) => {
    const rect = stage.getBoundingClientRect();
    const rx = ((event.clientY - rect.top) / rect.height - .5) * -5;
    const ry = ((event.clientX - rect.left) / rect.width - .5) * 7;
    stage.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  stage.addEventListener('pointerleave', () => { stage.style.transform = ''; });
}

const showreel = document.querySelector('#showreel');
const openShowreel = () => { showreel.classList.add('open'); showreel.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; };
const closeShowreel = () => { showreel.classList.remove('open'); showreel.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; };
document.querySelector('#playShowreel').addEventListener('click', openShowreel);
document.querySelector('.showreel-close').addEventListener('click', closeShowreel);
showreel.addEventListener('click', (event) => { if (event.target === showreel) closeShowreel(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeShowreel(); });

document.querySelectorAll('button.round-link').forEach((button) => {
  button.addEventListener('click', () => button.closest('.project').classList.toggle('expanded'));
});
