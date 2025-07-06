// temples.js - Add JavaScript magic ✨

document.addEventListener("DOMContentLoaded", () => {
  // Hamburger Menu
  const menuButton = document.getElementById("menu");
  const nav = document.querySelector("nav.navigation");
  
  menuButton.addEventListener("click", () => {
    nav.classList.toggle("open");
    menuButton.textContent = nav.classList.contains("open") ? "✖" : "☰";
  });

  // Dynamic Footer Year and Last Modified Date
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = document.lastModified;

  // Contact Info
  const contact = document.getElementById("contact-info");
  contact.innerHTML = `
    <p>Contact: +256 772 514 889 | <a href="mailto:rotema@byupathway.edu" style="color:#fff; text-decoration:underline;">rotema@byupathway.edu</a></p>
  `;

  // 3D Image Tilt Effect on Figures
  document.querySelectorAll("figure").forEach(figure => {
    figure.addEventListener("mousemove", e => {
      const { left, top, width, height } = figure.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      figure.style.transform = `rotateY(${x * 15}deg) rotateX(${-y * 15}deg)`;
    });
    figure.addEventListener("mouseleave", () => {
      figure.style.transform = "rotateY(0deg) rotateX(0deg)";
    });
  });

  // Scroll Animation for figures
  const figures = document.querySelectorAll("figure");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  figures.forEach(figure => {
    figure.classList.add("hidden");
    observer.observe(figure);
  });
});
