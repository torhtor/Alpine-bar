// script.js - Alpine Bar

document.addEventListener("DOMContentLoaded", function() {
    // Déterminer si on est sur une page anglaise
    const isEnglish = window.location.pathname.includes('/en/');
    const headerPath = isEnglish ? "header.html" : "header.html";
    const footerPath = isEnglish ? "footer.html" : "footer.html";

    // Charger le header
    fetch(headerPath)
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-placeholder").innerHTML = data;

            // Attendre un peu que le DOM soit prêt
            setTimeout(() => {
                // Une fois le header chargé, activer la navigation
                setupActiveNavigation();

                // Initialiser le menu mobile hamburger
                initMobileMenu();

                // Initialiser le comportement du header après son chargement
                initHeaderScroll();
            }, 50);
        })
        .catch(error => console.error('Erreur lors du chargement du header:', error));

    // Charger le footer
    fetch(footerPath)
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-placeholder").innerHTML = data;
        })
        .catch(error => console.error('Erreur lors du chargement du footer:', error));
});

// Fonction pour gérer la navigation active
function setupActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav__link');

    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            if (!link || !link.classList) return;

            const href = link.getAttribute('href');

            // Marquer le lien actif
            if (href === currentPage ||
                (currentPage === '' && href === 'index.html') ||
                (currentPage === 'index.html' && href === 'index.html')) {
                link.classList.add('nav__link--active');
            } else {
                link.classList.remove('nav__link--active');
            }
        });
    }

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
    
    const langButtons = document.querySelectorAll('.lang-switcher__btn');

    if (langButtons.length === 0) {
        console.warn('Aucun bouton de langue trouvé');
        return;
    }

    // D'abord retirer la classe active de tous les boutons
    langButtons.forEach(button => {
        if (button && button.classList) {
            button.classList.remove('lang-switcher__btn--active');
        }
    });

    // Puis configurer chaque bouton
    langButtons.forEach(button => {
        // Vérifier que button n'est pas undefined/null
        if (!button || !button.classList) {
            console.warn('Bouton de langue invalide:', button);
            return;
        }

        button.addEventListener('click', function() {
            if (isEnglish && this.textContent === 'FR') {
                // Sur page EN, aller vers FR
                const frPage = reverseMapping[currentPage] || 'index.html';
                window.location.href = `../${frPage}`;
            } else if (!isEnglish && this.textContent === 'EN') {
                // Sur page FR, aller vers EN
                const enPage = pageMapping[currentPage] || 'index.html';
                window.location.href = `en/${enPage}`;
            }
        });

        // Activer le bon bouton selon la langue courante
        if ((isEnglish && button.textContent.trim() === 'EN') ||
            (!isEnglish && button.textContent.trim() === 'FR')) {
            button.classList.add('lang-switcher__btn--active');
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

// Gestion du menu mobile hamburger
function initMobileMenu() {
    const navToggle = document.querySelector('.nav__toggle');
    const nav = document.querySelector('.nav');
    const navList = document.querySelector('.nav__list');

    if (!navToggle || !nav || !navList) return;

    // Toggle menu mobile
    navToggle.addEventListener('click', function() {
        const isOpen = navList.classList.contains('active');

        if (isOpen) {
            navList.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.textContent = '☰';
            document.body.classList.remove('nav-open');
        } else {
            navList.classList.add('active');
            navToggle.setAttribute('aria-expanded', 'true');
            navToggle.textContent = '✕';
            document.body.classList.add('nav-open');
        }
    });

    // Fermer le menu lors du clic sur un lien de navigation
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navList.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.textContent = '☰';
            document.body.classList.remove('nav-open');
        });
    });

    // Fermer le menu lors du clic en dehors (sur l'overlay)
    document.addEventListener('click', function(e) {
        if (navList.classList.contains('active') &&
            !nav.contains(e.target) &&
            !navToggle.contains(e.target)) {
            navList.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.textContent = '☰';
            document.body.classList.remove('nav-open');
        }
    });

    // Fermer le menu avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navList.classList.contains('active')) {
            navList.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.textContent = '☰';
            document.body.classList.remove('nav-open');
        }
    });

    // Initialiser l'attribut aria-expanded
    navToggle.setAttribute('aria-expanded', 'false');
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
