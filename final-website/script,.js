// Dynamic heading animation on scroll
window.addEventListener("scroll", () => {
  document.querySelectorAll(".animate-heading").forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }
  });
});

// Contact form handler with localStorage
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

if (form) {
  form.addEventListener("submit", (e) => {
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
      let stored = JSON.parse(localStorage.getItem("messages")) || [];
      stored.push(formData);
      localStorage.setItem("messages", JSON.stringify(stored));
      status.textContent = `Thanks ${name}, your message was saved!`;
      form.reset();
    } else {
      status.textContent = "Please fill in all fields.";
    }
  });
}
