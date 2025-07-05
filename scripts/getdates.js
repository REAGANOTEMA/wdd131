document.addEventListener("DOMContentLoaded", () => {
  // Set current year
  const yearSpan = document.getElementById("currentyear");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Typewriter effect for last modified date
  const lastModifiedElement = document.getElementById("lastModified");
  if (!lastModifiedElement) return;

  const text = `Last Modified: ${document.lastModified}`;
  let index = 0;

  function typeWriter() {
    if (index < text.length) {
      lastModifiedElement.textContent += text.charAt(index);
      index++;
      setTimeout(typeWriter, 50);
    }
  }

  typeWriter();
});
