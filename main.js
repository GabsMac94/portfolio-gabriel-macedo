// Menu responsivo
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

function closeMenu() {
  nav.classList.remove('open');
  document.body.classList.remove('menu-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
}

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  document.body.classList.toggle('menu-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

// Elementos aparecem suavemente ao entrar na tela
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 3, 2) * 80}ms`;
  observer.observe(element);
});

// Contadores da seção de conquistas
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(({ isIntersecting, target }) => {
    if (!isIntersecting || target.dataset.count === '∞') return;
    const end = Number(target.dataset.count);
    const duration = 1300;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      target.textContent = Math.round(end * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    countObserver.unobserve(target);
  });
}, { threshold: 0.7 });

document.querySelectorAll('[data-count]').forEach(counter => countObserver.observe(counter));
document.querySelector('#year').textContent = new Date().getFullYear();
