document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);

  // Mapping product IDs to names (should match the form)
  const products = {
    prod1: "Deluxe Toaster",
    prod2: "Super Blender",
    prod3: "Smart Vacuum",
    prod4: "4K TV",
    prod5: "Wireless Headphones",
  };

  // Get references
  const reviewCount = document.getElementById('reviewCount');
  if (!reviewCount) return; // safety check

  // Helper to escape HTML
  const escapeHTML = (str) => 
    String(str).replace(/[&<>"']/g, c => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[c]);

  // Extract values from URL
  const productId = urlParams.get('productName');
  const ratingRaw = urlParams.get('rating');
  const rating = ratingRaw && !isNaN(ratingRaw) ? parseInt(ratingRaw, 10) : 'N/A';
  const installationDate = urlParams.get('installationDate');
  const features = urlParams.getAll('features'); // may be multiple
  const writtenReview = urlParams.get('writtenReview') || 'No written review provided.';
  const userName = urlParams.get('userName') || 'Anonymous';

  // Build display HTML
  let html = `<h2>Review Details</h2>`;
  html += `<p><strong>Product:</strong> ${escapeHTML(products[productId] || 'Unknown Product')}</p>`;
  html += `<p><strong>Rating:</strong> ${escapeHTML(rating)} ${rating === 1 ? 'star' : 'stars'}</p>`;
  html += `<p><strong>Installation Date:</strong> ${escapeHTML(installationDate || 'N/A')}</p>`;

  if (features.length > 0) {
    html += `<p><strong>Features Found Useful:</strong> ${features.map(escapeHTML).join(', ')}</p>`;
  } else {
    html += `<p><strong>Features Found Useful:</strong> None selected</p>`;
  }

  html += `<p><strong>Review:</strong> ${escapeHTML(writtenReview)}</p>`;
  html += `<p><strong>Reviewed By:</strong> ${escapeHTML(userName)}</p>`;

  reviewCount.innerHTML = html;
});
