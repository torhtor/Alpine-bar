// script.js - Alpine Bar English version

document.addEventListener("DOMContentLoaded", function() {
    // Load header
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-placeholder").innerHTML = data;
            
            // Once header is loaded, activate navigation
            setupActiveNavigation();
        })
        .catch(error => console.error('Error loading header:', error));
    
    // Load footer
    fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-placeholder").innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
});

// Function to handle active navigation
function setupActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Mark active link
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Fix language links
    setupLanguageLinks();
}

// Function to handle language links
function setupLanguageLinks() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    const isEnglish = currentPath.includes('/en/');
    
    // Mapping EN -> FR pages
    const pageMapping = {
        'index.html': 'index.html',
        'menu.html': 'menu.html',
        'news.html': 'actualites.html',
        'location.html': 'findus.html',
        'contact.html': 'contact.html',
        'privacy-policy.html': 'privacy-policy.html'
    };
    
    // Reverse mapping FR -> EN
    const reverseMapping = Object.fromEntries(
        Object.entries(pageMapping).map(([en, fr]) => [fr, en])
    );
    
    const langLinks = document.querySelectorAll('.language-selector a:not(.active)');
    langLinks.forEach(link => {
        if (isEnglish) {
            // On EN page, link to FR
            const frPage = pageMapping[currentPage] || 'index.html';
            link.href = `../${frPage}`;
        } else {
            // On FR page, link to EN
            const enPage = reverseMapping[currentPage] || 'index.html';
            link.href = `en/${enPage}`;
        }
    });
}

// Smooth animation for anchors
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// News Carousel
let currentSlide = 0;
const totalSlides = 3;
let carouselInterval;

function initNewsCarousel() {
    const container = document.getElementById('newsCarouselContainer');
    if (!container) return;
    
    // Auto-slide every 10 seconds
    carouselInterval = setInterval(nextSlide, 10000);
    
    // Pause on hover
    const carousel = document.querySelector('.news-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(carouselInterval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            carouselInterval = setInterval(nextSlide, 10000);
        });
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateCarousel();
    
    // Reset interval
    clearInterval(carouselInterval);
    carouselInterval = setInterval(nextSlide, 10000);
}

function updateCarousel() {
    const container = document.getElementById('newsCarouselContainer');
    const dots = document.querySelectorAll('.carousel-dot');
    
    if (!container) return;
    
    // Move container - each slide is 33.333% of total width
    const translatePercent = currentSlide * 33.333;
    container.style.transform = `translateX(-${translatePercent}%)`;
    
    // Update dots
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
            dot.setAttribute('aria-selected', 'true');
        } else {
            dot.classList.remove('active');
            dot.setAttribute('aria-selected', 'false');
        }
    });
}

// Initialize carousel when DOM is loaded - éviter doublon avec premier DOMContentLoaded  
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize carousel after a short delay to ensure DOM is fully ready
        setTimeout(initNewsCarousel, 100);
    });
} else {
    // DOM already loaded
    setTimeout(initNewsCarousel, 100);
}