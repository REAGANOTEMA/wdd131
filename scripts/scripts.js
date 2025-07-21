// scripts.js

document.addEventListener('DOMContentLoaded', () => {
  // Select all sections to animate on scroll
  const sections = document.querySelectorAll('main section');

  // Options for IntersectionObserver for smooth fade-in
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15, // 15% visible
  };

  // Callback for IntersectionObserver
  const revealOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.unobserve(entry.target);
      }
    });
  };

  // Create observer and observe each section
  const observer = new IntersectionObserver(revealOnScroll, observerOptions);
  sections.forEach(section => {
    // Initialize hidden state in case JS loads after CSS animation
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    observer.observe(section);
  });

  // Add subtle hover focus effect on h2 headings for accessibility and interactivity
  const headings = document.querySelectorAll('h2');
  headings.forEach(h2 => {
    h2.addEventListener('focus', () => {
      h2.style.color = '#D32F2F';
      h2.style.outline = '2px solid #D32F2F';
      h2.style.outlineOffset = '4px';
    });
    h2.addEventListener('blur', () => {
      h2.style.color = '#1A237E';
      h2.style.outline = 'none';
    });
  });

  // Add subtle floating effect on wireframe images on hover and keyboard focus
  const wireframeImages = document.querySelectorAll('.wireframe-images img');
  wireframeImages.forEach(img => {
    img.addEventListener('mouseenter', () => {
      img.style.transform = 'scale(1.05) rotate(1deg)';
      img.style.boxShadow = '0 8px 20px rgba(251, 192, 45, 0.8)';
      img.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });
    img.addEventListener('mouseleave', () => {
      img.style.transform = 'translateY(0)';
      img.style.boxShadow = '0 4px 12px rgba(251, 192, 45, 0.5)';
      img.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });
    img.addEventListener('focus', () => {
      img.style.transform = 'scale(1.05) rotate(1deg)';
      img.style.boxShadow = '0 8px 20px rgba(251, 192, 45, 0.8)';
      img.style.outline = 'none';
    });
    img.addEventListener('blur', () => {
      img.style.transform = 'translateY(0)';
      img.style.boxShadow = '0 4px 12px rgba(251, 192, 45, 0.5)';
    });
  });

});
