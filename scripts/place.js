document.addEventListener("DOMContentLoaded", () => {
  // Set current year and last modified date
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const modifiedEl = document.getElementById("modified");
  if (modifiedEl) {
    const modifiedDate = new Date(document.lastModified);
    modifiedEl.textContent = modifiedDate.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }

  // HERO SLIDESHOW: auto-slide every 3 seconds
  const slides = document.querySelectorAll(".hero-slideshow .slide");
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  if (slides.length > 0) {
    showSlide(currentSlide);
    setInterval(nextSlide, 3000);
  }

  // WEATHER: mock data update
  function updateWeather() {
    const weatherData = {
      temp: 26,
      windSpeed: 12,
      chill: 24,
      conditions: "Sunny",
      icon: "☀️"
    };

    const tempEl = document.getElementById("temp");
    if (tempEl) tempEl.textContent = `${weatherData.temp} °C`;

    const windSpeedEl = document.getElementById("windSpeed");
    if (windSpeedEl) windSpeedEl.textContent = `${weatherData.windSpeed} km/h`;

    const chillEl = document.getElementById("chill");
    if (chillEl) chillEl.textContent = `${weatherData.chill} °C`;

    const conditionsEl = document.getElementById("conditions");
    if (conditionsEl) conditionsEl.textContent = weatherData.conditions;

    const weatherIconWideEl = document.getElementById("weatherIconWide");
    if (weatherIconWideEl) weatherIconWideEl.textContent = weatherData.icon;

    const weatherIconMobileEl = document.getElementById("weatherIconMobile");
    if (weatherIconMobileEl) weatherIconMobileEl.textContent = weatherData.icon;
  }

  updateWeather();

  // Animate elements on scroll using Intersection Observer
  const animatedElements = document.querySelectorAll(
    ".fade-in, .fade-in-up, .slide-in-down"
  );

  if (animatedElements.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    animatedElements.forEach(el => observer.observe(el));
  }
});
