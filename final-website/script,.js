// Initialize headings for animation on load
document.querySelectorAll(".animate-heading").forEach(el => {
  el.style.opacity = 0;
  el.style.transform = "translateY(-20px)";
});

// Animate headings when they come into view on scroll
window.addEventListener("scroll", () => {
  document.querySelectorAll(".animate-heading").forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }
  });
});

// DOM ready: hamburger toggle and form submission
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }

  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (form && status) {
    form.addEventListener("submit", e => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (name && email && message) {
        const formData = {
          name,
          email,
          message,
          timestamp: new Date().toISOString()
        };

        const stored = JSON.parse(localStorage.getItem("messages")) || [];
        stored.push(formData);
        localStorage.setItem("messages", JSON.stringify(stored));

        status.textContent = `Thanks ${name}, your message was saved!`;
        form.reset();
      } else {
        status.textContent = "Please fill in all fields.";
      }
    });
  }
});
