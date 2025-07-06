// temples.js - Magical Experience ✨
document.addEventListener("DOMContentLoaded", () => {
  // ========== Hamburger Menu ==========
  const menuButton = document.getElementById("menu");
  const nav = document.querySelector("nav.navigation");

  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.textContent = isOpen ? "✖" : "☰";
  });

  // ========== Dynamic Year & Last Modified ==========
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = document.lastModified;

  // ========== Typewriter Contact Info ==========
  const contact = document.getElementById("contact-info");
  const contactHTML = `
    Contact: +256 772 514 889 | 
    <a href="mailto:rotema@byupathway.edu" style="color:#fff; text-decoration:underline;">
      rotema@byupathway.edu
    </a>
  `;

  let i = 0;
  function typeWriter() {
    if (i < contactHTML.length) {
      contact.innerHTML += contactHTML.charAt(i);
      i++;
      setTimeout(typeWriter, 25);
    }
  }
  typeWriter();

  // ========== 3D Parallax Tilt on Hover ==========
  document.querySelectorAll("figure").forEach(figure => {
    figure.style.transformStyle = "preserve-3d";
    figure.style.perspective = "1000px";

    figure.addEventListener("mousemove", e => {
      const rect = figure.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      figure.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    figure.addEventListener("mouseleave", () => {
      figure.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    });
  });

  // ========== Scroll Reveal Animation ==========
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          entry.target.classList.remove("hidden");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll("figure").forEach(figure => {
    figure.classList.add("hidden");
    observer.observe(figure);
  });
});
