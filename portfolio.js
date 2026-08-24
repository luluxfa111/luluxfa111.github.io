(() => {
  const root = document.documentElement;
  const revealItems = [...document.querySelectorAll('.reveal')];
  const motionQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  const reduceMotion = motionQuery?.matches ?? false;

  const showEverything = () => {
    root.classList.remove('motion-ready');
    revealItems.forEach((item) => {
      item.classList.add('visible');
      item.style.removeProperty('transition-delay');
    });
  };

  if (reduceMotion) {
    showEverything();
    return;
  }

  try {
    if (!('IntersectionObserver' in window)) {
      showEverything();
      return;
    }

    root.classList.add('motion-ready');

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -5%',
    });

    revealItems.forEach((item, index) => {
      // A short repeating cadence adds hierarchy without delaying later sections.
      item.style.transitionDelay = `${(index % 3) * 70}ms`;
      revealObserver.observe(item);
    });

    const canTilt = window.matchMedia?.('(hover: hover) and (pointer: fine)').matches;
    if (!canTilt) return;

    const activeCards = [];

    document.querySelectorAll('.instant').forEach((card) => {
      const photo = card.querySelector('.instant-image');
      if (!photo) return;

      let animationFrame = 0;
      let resetTimer = 0;
      let rotateX = 0;
      let rotateY = 0;

      const paintTilt = () => {
        animationFrame = 0;
        photo.style.transform = `translateZ(10px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
      };

      const resetTilt = () => {
        if (animationFrame) cancelAnimationFrame(animationFrame);
        clearTimeout(resetTimer);
        animationFrame = 0;
        rotateX = 0;
        rotateY = 0;
        photo.style.transition = 'transform 480ms cubic-bezier(.22, 1, .36, 1)';
        photo.style.transform = '';
        resetTimer = window.setTimeout(() => {
          photo.style.removeProperty('transition');
          photo.style.removeProperty('will-change');
        }, 500);
      };

      card.addEventListener('pointerenter', () => {
        clearTimeout(resetTimer);
        photo.style.willChange = 'transform';
        photo.style.transition = 'transform 140ms cubic-bezier(.22, 1, .36, 1)';
      }, { passive: true });

      card.addEventListener('pointermove', (event) => {
        const bounds = card.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        rotateX = y * -3;
        rotateY = x * 4;

        if (!animationFrame) animationFrame = requestAnimationFrame(paintTilt);
      }, { passive: true });

      card.addEventListener('pointerleave', resetTilt, { passive: true });
      card.addEventListener('pointercancel', resetTilt, { passive: true });
      activeCards.push(resetTilt);
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) activeCards.forEach((reset) => reset());
    });
  } catch (error) {
    // Motion is decorative: a runtime failure must never hide portfolio content.
    showEverything();
    console.warn('Portfolio motion was disabled.', error);
  }
})();
