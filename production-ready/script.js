// script.js - Alpine Bar

document.addEventListener("DOMContentLoaded", function() {
    // Charger le header
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-placeholder").innerHTML = data;
            
            // Une fois le header chargé, activer la navigation
            setupActiveNavigation();
            
            // Initialiser le comportement du header après son chargement
            initHeaderScroll();
        })
        .catch(error => console.error('Erreur lors du chargement du header:', error));
    
    // Charger le footer
    fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-placeholder").innerHTML = data;
        })
        .catch(error => console.error('Erreur lors du chargement du footer:', error));
});

// Fonction pour gérer la navigation active
function setupActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Marquer le lien actif
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Fixer les liens de langue
    setupLanguageLinks();
}

// Fonction pour gérer les liens de langue
function setupLanguageLinks() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    const isEnglish = currentPath.includes('/en/');
    
    // Mapping des pages FR -> EN
    const pageMapping = {
        'index.html': 'index.html',
        'menu.html': 'menu.html',
        'actualites.html': 'news.html',
        'findus.html': 'location.html',
        'contact.html': 'contact.html',
        'privacy-policy.html': 'privacy-policy.html'
    };
    
    // Reverse mapping EN -> FR
    const reverseMapping = Object.fromEntries(
        Object.entries(pageMapping).map(([fr, en]) => [en, fr])
    );
    
    const langLinks = document.querySelectorAll('.language-selector a:not(.active)');
    langLinks.forEach(link => {
        if (isEnglish) {
            // Sur page EN, lien vers FR
            const frPage = reverseMapping[currentPage] || 'index.html';
            link.href = `../${frPage}`;
        } else {
            // Sur page FR, lien vers EN
            const enPage = pageMapping[currentPage] || 'index.html';
            link.href = `en/${enPage}`;
        }
    });
}

// Animation smooth pour les ancres
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

// Carousel d'actualités
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
    
    // Move container - chaque slide fait 33.333% de la largeur totale
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
        // Initialize opening banner scroll behavior (only if not loaded via header)
        setTimeout(initOpeningBanner, 200);
    });
} else {
    // DOM already loaded
    setTimeout(initNewsCarousel, 100);
    setTimeout(initOpeningBanner, 200);
}

// Gestion du bandeau d'ouverture au scroll
function initOpeningBanner() {
    const openingBanner = document.getElementById('opening-status');
    if (!openingBanner) return;
    
    let lastScrollY = window.scrollY;
    let isHidden = false;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Gestion du bandeau d'ouverture
        // Si on scroll vers le bas et qu'on a dépassé 100px
        if (currentScrollY > lastScrollY && currentScrollY > 100 && !isHidden) {
            openingBanner.classList.add('hidden');
            isHidden = true;
        }
        // Si on scroll vers le haut
        else if (currentScrollY < lastScrollY && isHidden) {
            openingBanner.classList.remove('hidden');
            isHidden = false;
        }
        
        lastScrollY = currentScrollY;
    });
}

// Gestion du header compact au scroll (appelé après chargement du header)
function initHeaderScroll() {
    const header = document.querySelector('header');
    const body = document.body;
    const main = document.querySelector('main');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 0) {
            // Header devient fixé
            main.classList.add('header-fixed');
            
            if (currentScrollY > 250) {
                // Mode compact après plus de scroll
                header.classList.add('compact');
                body.classList.add('header-compact');
            } else {
                header.classList.remove('compact');
                body.classList.remove('header-compact');
            }
        } else {
            // Retour en haut, header normal
            header.classList.remove('compact');
            body.classList.remove('header-fixed', 'header-compact');
        }
    });
}
