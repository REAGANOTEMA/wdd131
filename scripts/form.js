document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';

    // Toggle aria-expanded attribute
    hamburger.setAttribute('aria-expanded', String(!isExpanded));

    // Toggle active class for hamburger animation
    hamburger.classList.toggle('active');

    // Animate mobile menu
    if (isExpanded) {
      // Hide menu with fade out + slide up
      mobileMenu.style.animation = 'slideFadeOut 300ms forwards';
      // After animation ends, hide menu completely
      mobileMenu.addEventListener(
        'animationend',
        () => {
          mobileMenu.setAttribute('hidden', '');
          mobileMenu.style.animation = '';
        },
        { once: true }
      );
    } else {
      // Remove hidden to show menu
      mobileMenu.removeAttribute('hidden');
      // Animate fade in + slide down
      mobileMenu.style.animation = 'slideFadeIn 300ms forwards';
    }
  });
});
const products = [
  { id: "prod1", name: "Deluxe Toaster" },
  { id: "prod2", name: "Super Blender" },
  { id: "prod3", name: "Smart Vacuum" },
  { id: "prod4", name: "4K TV" },
  { id: "prod5", name: "Wireless Headphones" }
];

document.addEventListener("DOMContentLoaded", () => {
  const productSelect = document.getElementById("productName");
  const installationDate = document.getElementById("installationDate");

  if (productSelect) {
    // Populate product select dynamically
    products.forEach((product) => {
      const option = document.createElement("option");
      option.value = product.id;
      option.textContent = product.name;
      productSelect.appendChild(option);
    });
  }

  if (installationDate) {
    // Set max date for installationDate to today
    const today = new Date().toISOString().split("T")[0];
    installationDate.setAttribute("max", today);
  }

  // Smooth scrolling for internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
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
  const reviewForm = document.getElementById('reviewForm');
  const reviewTextarea = document.getElementById('writtenReview');
  const charCount = document.getElementById('charCount');
  const productSelect = document.getElementById('productName');
  const installationDate = document.getElementById('installationDate');
  const submitButton = reviewForm.querySelector('button[type="submit"]');

  // Product list (unique)
  const products = [
    { id: "prod1", name: "Deluxe Toaster" },
    { id: "prod2", name: "Super Blender" },
    { id: "prod3", name: "Smart Vacuum" },
    { id: "prod4", name: "4K TV" },
    { id: "prod5", name: "Wireless Headphones" },
  ];

  // Populate product dropdown
  products.forEach(product => {
    const option = document.createElement('option');
    option.value = product.id;
    option.textContent = product.name;
    productSelect.appendChild(option);
  });

  // Set max date for installationDate to today
  const today = new Date().toISOString().split('T')[0];
  installationDate.max = today;

  // Update char count on input
  reviewTextarea.addEventListener('input', () => {
    const length = reviewTextarea.value.length;
    charCount.textContent = `${length} / 500 characters`;
  });

  // Enable submit only if required fields filled
  function validateForm() {
    const productSelected = productSelect.value !== "";
    const installationDateSet = installationDate.value !== "";
    const ratingChecked = reviewForm.querySelector('input[name="rating"]:checked') !== null;

    submitButton.disabled = !(productSelected && installationDateSet && ratingChecked);
  }

  // Initial validate & add event listeners to required fields
  validateForm();
  productSelect.addEventListener('change', validateForm);
  installationDate.addEventListener('change', validateForm);
  reviewForm.querySelectorAll('input[name="rating"]').forEach(radio => {
    radio.addEventListener('change', validateForm);
  });

  // Confirm before submit
  reviewForm.addEventListener('submit', (e) => {
    if (!confirm('Are you sure you want to submit your review?')) {
      e.preventDefault();
    }
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const products = [
    { id: "prod1", name: "Deluxe Toaster" },
    { id: "prod2", name: "Super Blender" },
    { id: "prod3", name: "Smart Vacuum" },
    { id: "prod4", name: "4K TV" },
    { id: "prod5", name: "Wireless Headphones" }
  ];

  const productSelect = document.getElementById('productName');

  products.forEach(product => {
    const option = document.createElement('option');
    option.value = product.id;
    option.textContent = product.name;
    productSelect.appendChild(option);
  });
});
