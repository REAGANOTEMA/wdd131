// temples.js - Magical Experience ✨ (Audit Optimized with Shining Background)

document.addEventListener("DOMContentLoaded", () => {
  // ========== Hamburger Menu (Accessible + Audit-Friendly) ==========
  const menuButton = document.getElementById("menu");
  const nav = document.querySelector("nav.navigation");

  if (menuButton && nav) {
    menuButton.setAttribute("aria-controls", "navigation");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("role", "button");
    menuButton.setAttribute("tabindex", "0");

    const toggleMenu = () => {
      const isOpen = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", isOpen.toString());
      menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
      menuButton.textContent = isOpen ? "✖" : "☰";
    };

    menuButton.addEventListener("click", toggleMenu);

    // Support keyboard access (Enter or Space)
    menuButton.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleMenu();
      }
    });
  }

  // ========== Dynamic Year & Last Modified ==========
  const yearSpan = document.getElementById("year");
  const modifiedSpan = document.getElementById("lastModified");

  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  if (modifiedSpan) modifiedSpan.textContent = document.lastModified;

  // ========== Typewriter Contact Info (Safe DOM) ==========
  const contact = document.getElementById("contact-info");

  if (contact) {
    const contactText = "Contact: +256 772 514 889 | ";
    const email = "rotema@byupathway.edu";
    const fullText = contactText + email;

    let i = 0;
    const span = document.createElement("span");
    contact.appendChild(span);

    function typeWriter() {
      if (i < fullText.length) {
        span.textContent += fullText.charAt(i);
        i++;
        setTimeout(typeWriter, 25);
      } else {
        // Clear previous content safely
        contact.textContent = contactText;

        const link = document.createElement("a");
        link.href = `mailto:${email}`;
        link.textContent = email;
        link.style.color = "#fff";
        link.style.textDecoration = "underline";
        link.setAttribute("aria-label", `Email ${email}`);

        contact.appendChild(link);
      }
    }

    typeWriter();
  }

  // ========== 3D Parallax Tilt ==========
  const figures = document.querySelectorAll("figure");

  figures.forEach((figure) => {
    let requestId;

    figure.addEventListener("mousemove", (e) => {
      if (requestId) cancelAnimationFrame(requestId);

      requestId = requestAnimationFrame(() => {
        const rect = figure.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = ((y - rect.height / 2) / rect.height) * -15;
        const rotateY = ((x - rect.width / 2) / rect.width) * 15;

        figure.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.07)`;
      });
    });

    figure.addEventListener("mouseleave", () => {
      figure.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    });
  });

  // ========== Scroll Reveal Animation ==========
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          entry.target.classList.remove("hidden");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll("figure").forEach((figure) => {
    figure.classList.add("hidden");
    revealObserver.observe(figure);
  });

  // ========== Magical Shining Background Effect ==========
  const shiningLayer = document.createElement("div");
  shiningLayer.style.position = "fixed";
  shiningLayer.style.top = "0";
  shiningLayer.style.left = "0";
  shiningLayer.style.width = "100%";
  shiningLayer.style.height = "100%";
  shiningLayer.style.pointerEvents = "none";
  shiningLayer.style.zIndex = "-1";
  shiningLayer.style.background = `
    radial-gradient(circle at center, 
      rgba(255, 255, 255, 0.35) 0%, 
      rgba(255, 255, 255, 0) 80%)`;
  shiningLayer.style.mixBlendMode = "screen";
  shiningLayer.style.transition = "opacity 2s ease-in-out";
  document.body.appendChild(shiningLayer);

  let shining = true;
  setInterval(() => {
    shiningLayer.style.opacity = shining ? "0.8" : "0.4";
    shining = !shining;
  }, 3000);

  // Floating effect
  let posY = 0;
  let direction = 1;
  function floatingEffect() {
    posY += 0.1 * direction;
    if (posY > 8 || posY < -8) direction *= -1;
    shiningLayer.style.backgroundPosition = `center calc(50% + ${posY}px)`;
    requestAnimationFrame(floatingEffect);
  }
  floatingEffect();
});
