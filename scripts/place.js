document.addEventListener("DOMContentLoaded", () => {
  // Set current year and last modified date
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("modified").textContent = new Date(document.lastModified).toLocaleDateString();

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

  // Initial show
  showSlide(currentSlide);

  // Auto cycle
  setInterval(nextSlide, 3000);

  // WEATHER: simulate fetch and fill automatically (mock data)
  function updateWeather() {
    // Mock data, replace with real API if needed
    const weatherData = {
      temp: 26,
      windSpeed: 12,
      chill: 24,
      conditions: "Sunny",
      icon: "☀️"
    };
    document.getElementById("temp").textContent = `${weatherData.temp} °C`;
    document.getElementById("windSpeed").textContent = `${weatherData.windSpeed} km/h`;
    document.getElementById("chill").textContent = `${weatherData.chill} °C`;
    document.getElementById("conditions").textContent = weatherData.conditions;
    document.getElementById("weatherIconWide").textContent = weatherData.icon;
    document.getElementById("weatherIconMobile").textContent = weatherData.icon;
  }

  updateWeather();

  // Animate writings fade-in on scroll (optional)
  const animatedElements = document.querySelectorAll(".fade-in, .fadeInUp, .slideInDown");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add("animated");
      }
    });
  }, { threshold: 0.2 });

  animatedElements.forEach(el => observer.observe(el));
});
