// siteplan.js

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';

    // Toggle aria-expanded attribute
    hamburger.setAttribute('aria-expanded', String(!isExpanded));

    // Toggle the hidden attribute on the mobile menu
    if (isExpanded) {
      mobileMenu.setAttribute('hidden', '');
    } else {
      mobileMenu.removeAttribute('hidden');
    }
  });
});
