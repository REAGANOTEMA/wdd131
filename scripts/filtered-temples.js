document.addEventListener("DOMContentLoaded", () => {
  // ========== Hamburger Menu (Accessible & Responsive) ==========
  const menuButton = document.getElementById("menu");
  const nav = document.querySelector("nav.navigation");

  if (menuButton && nav) {
    menuButton.setAttribute("aria-controls", "primary-nav");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
    menuButton.setAttribute("role", "button");
    menuButton.setAttribute("tabindex", "0");

    const toggleMenu = () => {
      const isOpen = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
      menuButton.textContent = isOpen ? "✖" : "☰";
    };

    menuButton.addEventListener("click", toggleMenu);
    menuButton.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleMenu();
      }
    });
  }

  // ========== Footer: Dynamic Year & Last Modified ==========
  const yearSpan = document.getElementById("year");
  const modifiedSpan = document.getElementById("lastModified");

  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  if (modifiedSpan) modifiedSpan.textContent = document.lastModified;

  // ========== Typewriter Contact Info ==========
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

  // ========== Temple Data Array ==========
  const temples = [
    {
      name: "Salt Lake Temple",
      location: "Salt Lake City, Utah, USA",
      dedicated: 1893,
      area: 107240,
      imageUrl: "https://cdn.example.com/salt-lake-temple.jpg",
      alt: "Salt Lake Temple"
    },
    {
      name: "Laie Hawaii Temple",
      location: "Laie, Hawaii, USA",
      dedicated: 1919,
      area: 45000,
      imageUrl: "https://cdn.example.com/laie-hawaii-temple.jpg",
      alt: "Laie Hawaii Temple"
    },
    {
      name: "London England Temple",
      location: "London, England, UK",
      dedicated: 1958,
      area: 25000,
      imageUrl: "https://cdn.example.com/london-england-temple.jpg",
      alt: "London England Temple"
    },
    // Added 3 more to meet requirements:
    {
      name: "Rome Italy Temple",
      location: "Rome, Italy",
      dedicated: 2019,
      area: 90000,
      imageUrl: "https://cdn.example.com/rome-italy-temple.jpg",
      alt: "Rome Italy Temple"
    },
    {
      name: "Kirtland Ohio Temple",
      location: "Kirtland, Ohio, USA",
      dedicated: 1836,
      area: 10000,
      imageUrl: "https://cdn.example.com/kirtland-ohio-temple.jpg",
      alt: "Kirtland Ohio Temple"
    },
    {
      name: "Monticello Utah Temple",
      location: "Monticello, Utah, USA",
      dedicated: 1998,
      area: 9300,
      imageUrl: "https://cdn.example.com/monticello-utah-temple.jpg",
      alt: "Monticello Utah Temple"
    }
  ];

  // ========== DOM Elements ==========
  const gallery = document.getElementById("temple-cards");
  const navLinks = document.querySelectorAll("nav a[data-filter]");

  // ========== Helper: Create Temple Card ==========
  function createTempleCard(temple) {
    const figure = document.createElement("figure");
    figure.className = "temple-card";

    const img = document.createElement("img");
    img.src = temple.imageUrl;
    img.alt = temple.alt || temple.name;
    img.loading = "lazy";
    figure.appendChild(img);

    const figcaption = document.createElement("figcaption");
    figcaption.innerHTML = `
      <h3>${temple.name}</h3>
      <p><strong>Location:</strong> ${temple.location}</p>
      <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
      <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
    `;
    figure.appendChild(figcaption);

    // Add 3D tilt effect on each figure
    figure.addEventListener("mousemove", (e) => {
      const rect = figure.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateX = ((y - rect.height / 2) / rect.height) * -15;
      const rotateY = ((x - rect.width / 2) / rect.width) * 15;

      figure.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.07)`;
    });

    figure.addEventListener("mouseleave", () => {
      figure.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    });

    return figure;
  }

  // ========== Render Temples ==========
  function renderTemples(filter = "all") {
    gallery.innerHTML = "";

    let filteredTemples = temples;

    switch (filter) {
      case "old":
        filteredTemples = temples.filter(t => t.dedicated < 1900);
        break;
      case "new":
        filteredTemples = temples.filter(t => t.dedicated > 2000);
        break;
      case "large":
        filteredTemples = temples.filter(t => t.area > 90000);
        break;
      case "small":
        filteredTemples = temples.filter(t => t.area < 10000);
        break;
      case "all":
      default:
        filteredTemples = temples;
        break;
    }

    if (filteredTemples.length === 0) {
      const msg = document.createElement("p");
      msg.textContent = "No temples match this filter.";
      gallery.appendChild(msg);
      return;
    }

    filteredTemples.forEach(temple => {
      const card = createTempleCard(temple);
      gallery.appendChild(card);
    });
  }

  // ========== Navigation Filter Clicks ==========
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Close menu if open (mobile)
      if (nav.classList.contains("open")) {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-label", "Open menu");
      }

      const filter = link.getAttribute("data-filter");
      renderTemples(filter);
    });
  });

  // ========== Initial Render ==========
  renderTemples();

  // ========== Scroll Reveal for cards ==========
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

  // Add hidden class and observe newly created temple cards
  function observeCards() {
    document.querySelectorAll(".temple-card").forEach(card => {
      card.classList.add("hidden");
      revealObserver.observe(card);
    });
  }

  // Observe after render
  const observerInterval = setInterval(() => {
    if (document.querySelectorAll(".temple-card").length) {
      observeCards();
      clearInterval(observerInterval);
    }
  }, 100);

});
