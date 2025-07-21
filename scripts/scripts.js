document.addEventListener('DOMContentLoaded', () => {
  // Animate sections on scroll with IntersectionObserver
  const sections = document.querySelectorAll('main section');
  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };

  const revealOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(revealOnScroll, observerOptions);

  sections.forEach(section => {
    section.classList.add('hidden');
    observer.observe(section);
  });

  // Focus styling on headings (h2) for keyboard accessibility
  const headings = document.querySelectorAll('h2');
  headings.forEach(h2 => {
    h2.addEventListener('focusin', () => h2.classList.add('focused'));
    h2.addEventListener('focusout', () => h2.classList.remove('focused'));
  });

  // Wireframe images hover & keyboard focus effect
  const wireframeImages = document.querySelectorAll('.wireframe-images img');
  wireframeImages.forEach(img => {
    // Make images keyboard focusable if not already
    if (!img.hasAttribute('tabindex')) img.setAttribute('tabindex', '0');

    const addActive = () => img.classList.add('active');
    const removeActive = () => img.classList.remove('active');

    img.addEventListener('mouseenter', addActive);
    img.addEventListener('mouseleave', removeActive);
    img.addEventListener('focus', addActive);
    img.addEventListener('blur', removeActive);
  });
});
