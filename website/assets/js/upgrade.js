// Page-wide text controls. Session-only; no cookies or stored learner data.
document.querySelectorAll('[data-text-size]').forEach(button => {
  button.addEventListener('click', () => {
    document.documentElement.dataset.textSize = button.dataset.textSize;
    document.querySelectorAll('[data-text-size]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  });
});
const navToggle = document.querySelector('.menu-toggle');
new MutationObserver(() => {
  navToggle.setAttribute('aria-label', navToggle.getAttribute('aria-expanded') === 'true' ? 'Close navigation' : 'Open navigation');
}).observe(navToggle, { attributes: true, attributeFilter: ['aria-expanded'] });
document.addEventListener('click', event => {
  if (!event.target.closest('header')) {
    navToggle.setAttribute('aria-expanded', 'false');
    document.querySelector('#main-nav').classList.remove('open');
  }
});
