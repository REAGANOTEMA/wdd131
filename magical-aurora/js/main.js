// main.js

// 1. Update footer year dynamically
function updateYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) {
        const currentYear = new Date().getFullYear();
        yearEl.textContent = `${currentYear}`;
    }
}

// 2. Validate Contact Form Input
function validateForm(name, email, message) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
        return { valid: false, error: 'All fields are required.' };
    }
    if (!emailRegex.test(email)) {
        return { valid: false, error: 'Please enter a valid email address.' };
    }
    return { valid: true };
}

// 3. Save message to localStorage
function saveMessageToLocalStorage(messageObj) {
    let messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push(messageObj);
    localStorage.setItem('messages', JSON.stringify(messages));
}

// 4. Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const responseDiv = document.getElementById('formResponse');

    const name = nameInput.value;
    const email = emailInput.value;
    const message = messageInput.value;

    // Validate inputs
    const validation = validateForm(name, email, message);

    if (!validation.valid) {
        responseDiv.textContent = validation.error;
        responseDiv.style.color = '#ff6b6b'; // red for error
        responseDiv.style.fontWeight = 'bold';
        return;
    }

    // Create message object
    const messageObj = {
        name,
        email,
        message,
        timestamp: new Date().toLocaleString()
    };

    // Save to localStorage
    saveMessageToLocalStorage(messageObj);

    // Show success message using template literals
    responseDiv.innerHTML = `
        <p style="color: #5ee7df; font-weight: bold;">
        Thank you, <span style="color: var(--accent);">${name}</span>! Your message has been received at ${messageObj.timestamp}.</p>
    `;

    // Clear form
    nameInput.value = '';
    emailInput.value = '';
    messageInput.value = '';
}

// 5. Lazy load images using native attribute (for images below the fold)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
    });
}

// 6. Animate elements on scroll (fadeIn effect)
function animateOnScroll() {
    const sections = document.querySelectorAll('section');
    const options = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        section.style.animationPlayState = 'paused';
        observer.observe(section);
    });
}

// 7. Array + array methods: Get stored messages, count messages, and log them
function displayStoredMessagesCount() {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    // Filter messages sent today (example of array method)
    const today = new Date().toISOString().slice(0,10);
    const todaysMessages = messages.filter(msg => msg.timestamp.startsWith(today));

    console.log(`Total messages stored: ${messages.length}`);
    console.log(`Messages sent today: ${todaysMessages.length}`);
}

// 8. Initialize everything
function init() {
    updateYear();
    lazyLoadImages();
    animateOnScroll();
    displayStoredMessagesCount();

    // Attach form event listener if form exists
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}

// Run init when DOM content is loaded
document.addEventListener('DOMContentLoaded', init);
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
    hamburger.setAttribute('aria-expanded', !expanded);
    navLinks.classList.toggle('active');
  });
});
