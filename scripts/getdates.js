// Update current year in footer
const currentYearElem = document.getElementById("currentyear");
if (currentYearElem) {
  const currentYear = new Date().getFullYear();
  currentYearElem.textContent = currentYear;
}

// Update last modified date in footer
const lastModifiedElem = document.getElementById("lastModified");
if (lastModifiedElem) {
  const lastModified = new Date(document.lastModified);
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  lastModifiedElem.textContent = `Last modified: ${lastModified.toLocaleDateString(undefined, options)}`;
}
