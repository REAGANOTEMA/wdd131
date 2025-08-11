document.addEventListener('DOMContentLoaded', () => {
  // Hamburger menu toggle
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';

      hamburger.setAttribute('aria-expanded', String(!isExpanded));
      hamburger.classList.toggle('active');

      if (isExpanded) {
        mobileMenu.style.animation = 'slideFadeOut 300ms forwards';
        mobileMenu.addEventListener(
          'animationend',
          () => {
            mobileMenu.setAttribute('hidden', '');
            mobileMenu.style.animation = '';
          },
          { once: true }
        );
      } else {
        mobileMenu.removeAttribute('hidden');
        mobileMenu.style.animation = 'slideFadeIn 300ms forwards';
      }
    });
  }

  // Product list - single source of truth
  const products = [
    { id: "prod1", name: "Deluxe Toaster" },
    { id: "prod2", name: "Super Blender" },
    { id: "prod3", name: "Smart Vacuum" },
    { id: "prod4", name: "4K TV" },
    { id: "prod5", name: "Wireless Headphones" }
  ];

  // Populate product select dropdown (if present)
  const productSelect = document.getElementById('productName');
  if (productSelect) {
    // Clear existing options (optional, in case they exist)
    productSelect.innerHTML = '<option value="">Select a product</option>';
    products.forEach(product => {
      const option = document.createElement('option');
      option.value = product.id;
      option.textContent = product.name;
      productSelect.appendChild(option);
    });
  }

  // Set max date for installationDate input (if present)
  const installationDate = document.getElementById('installationDate');
  if (installationDate) {
    const today = new Date().toISOString().split('T')[0];
    installationDate.setAttribute('max', today);
  }

  // Review form validation and char count
  const reviewForm = document.getElementById('reviewForm');
  if (reviewForm) {
    const reviewTextarea = document.getElementById('writtenReview');
    const charCount = document.getElementById('charCount');
    const submitButton = reviewForm.querySelector('button[type="submit"]');

    if (reviewTextarea && charCount) {
      reviewTextarea.addEventListener('input', () => {
        const length = reviewTextarea.value.length;
        charCount.textContent = `${length} / 500 characters`;
      });
    }

    function validateForm() {
      const productSelected = productSelect ? productSelect.value !== "" : false;
      const installationDateSet = installationDate ? installationDate.value !== "" : false;
      const ratingChecked = reviewForm.querySelector('input[name="rating"]:checked') !== null;
      if (submitButton) {
        submitButton.disabled = !(productSelected && installationDateSet && ratingChecked);
      }
    }

    validateForm();

    if (productSelect) productSelect.addEventListener('change', validateForm);
    if (installationDate) installationDate.addEventListener('change', validateForm);
    reviewForm.querySelectorAll('input[name="rating"]').forEach(radio => {
      radio.addEventListener('change', validateForm);
    });

    reviewForm.addEventListener('submit', (e) => {
      if (!confirm('Are you sure you want to submit your review?')) {
        e.preventDefault();
      }
    });
  }

  // Smooth scrolling for internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href.length > 1) { // ignore href="#"
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const reviewTextarea = document.getElementById('writtenReview');
  const charCount = document.getElementById('charCount');

  if (!reviewTextarea || !charCount) return;

  reviewTextarea.addEventListener('input', () => {
    const currentLength = reviewTextarea.value.length;
    charCount.textContent = `${currentLength} / 500 characters`;
  });
});
