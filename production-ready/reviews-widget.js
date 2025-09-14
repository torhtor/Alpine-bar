// Reviews Widget - Alpine Bar
// Gestion des avis Google My Business et autres plateformes

class ReviewsWidget {
    constructor() {
        this.googleBusinessId = 'PLACE_ID_GOOGLE_BUSINESS'; // À remplacer par l'ID réel
        this.businessName = 'Alpine Bar';
        this.businessAddress = '123 Rue des Alpes, 74000 Annecy';
        this.init();
    }

    init() {
        this.createReviewButtons();
        this.loadGoogleReviews();
    }

    createReviewButtons() {
        // Ajouter les boutons d'avis dans le footer ou la page contact
        const reviewContainer = document.createElement('div');
        reviewContainer.className = 'reviews-widget';
        reviewContainer.innerHTML = this.getReviewButtonsHTML();

        // Ajouter les styles
        this.addStyles();

        // Injecter dans le footer si disponible
        const footer = document.querySelector('footer') || document.getElementById('footer-placeholder');
        if (footer) {
            footer.appendChild(reviewContainer);
        }
    }

    getReviewButtonsHTML() {
        const isEnglish = document.documentElement.lang === 'en';
        
        if (isEnglish) {
            return `
                <div class="reviews-section">
                    <h4>📝 Share your experience</h4>
                    <p>Your opinion helps us improve and helps other customers choose Alpine Bar.</p>
                    <div class="review-buttons">
                        <a href="#" id="google-review-btn" class="review-btn review-btn-google" target="_blank" rel="noopener noreferrer">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                            Review on Google
                        </a>
                        
                        <a href="https://www.tripadvisor.com/Restaurant_Review-g187234-d-Reviews-Alpine_Bar-Annecy_Haute_Savoie_Auvergne_Rhone_Alpes.html" class="review-btn review-btn-tripadvisor" target="_blank" rel="noopener noreferrer">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#00AF87"/>
                            </svg>
                            Review on TripAdvisor
                        </a>
                        
                        <a href="https://www.yelp.com/biz/alpine-bar-annecy" class="review-btn review-btn-yelp" target="_blank" rel="noopener noreferrer">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.08 2c-5.5 0-9.96 4.46-9.96 9.96 0 5.5 4.46 9.96 9.96 9.96s9.96-4.46 9.96-9.96c0-5.5-4.46-9.96-9.96-9.96zM8.69 17.31l-1.7-1.7c-.39-.39-.39-1.02 0-1.41l5.66-5.66c.39-.39 1.02-.39 1.41 0l1.7 1.7c.39.39.39 1.02 0 1.41l-5.66 5.66c-.39.39-1.02.39-1.41 0z" fill="#FF1744"/>
                            </svg>
                            Review on Yelp
                        </a>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="reviews-section">
                    <h4>📝 Partagez votre expérience</h4>
                    <p>Votre avis nous aide à nous améliorer et aide les autres clients à choisir Alpine Bar.</p>
                    <div class="review-buttons">
                        <a href="#" id="google-review-btn" class="review-btn review-btn-google" target="_blank" rel="noopener noreferrer">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                            Avis sur Google
                        </a>
                        
                        <a href="https://www.tripadvisor.fr/Restaurant_Review-g187234-d-Reviews-Alpine_Bar-Annecy_Haute_Savoie_Auvergne_Rhone_Alpes.html" class="review-btn review-btn-tripadvisor" target="_blank" rel="noopener noreferrer">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#00AF87"/>
                            </svg>
                            Avis sur TripAdvisor
                        </a>
                        
                        <a href="https://www.yelp.fr/biz/alpine-bar-annecy" class="review-btn review-btn-yelp" target="_blank" rel="noopener noreferrer">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.08 2c-5.5 0-9.96 4.46-9.96 9.96 0 5.5 4.46 9.96 9.96 9.96s9.96-4.46 9.96-9.96c0-5.5-4.46-9.96-9.96-9.96zM8.69 17.31l-1.7-1.7c-.39-.39-.39-1.02 0-1.41l5.66-5.66c.39-.39 1.02-.39 1.41 0l1.7 1.7c.39.39.39 1.02 0 1.41l-5.66 5.66c-.39.39-1.02.39-1.41 0z" fill="#FF1744"/>
                            </svg>
                            Avis sur Yelp
                        </a>
                    </div>
                </div>
            `;
        }
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .reviews-widget {
                margin: var(--spacing-xl) 0;
                padding: var(--spacing-xl);
                background: rgba(156, 122, 96, 0.1);
                border-radius: 15px;
                text-align: center;
            }

            .reviews-section h4 {
                color: var(--alpine-black);
                font-size: 1.3rem;
                font-weight: 600;
                margin-bottom: var(--spacing-sm);
            }

            .reviews-section p {
                color: var(--alpine-brown-dark);
                margin-bottom: var(--spacing-lg);
                font-size: 0.95rem;
            }

            .review-buttons {
                display: flex;
                flex-wrap: wrap;
                gap: var(--spacing-md);
                justify-content: center;
                align-items: center;
            }

            .review-btn {
                display: inline-flex;
                align-items: center;
                gap: var(--spacing-sm);
                padding: var(--spacing-md) var(--spacing-lg);
                border-radius: 25px;
                text-decoration: none;
                font-weight: 600;
                font-size: 0.9rem;
                transition: all 0.3s ease;
                border: 2px solid transparent;
                min-width: 160px;
                justify-content: center;
            }

            .review-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            }

            .review-btn-google {
                background: linear-gradient(135deg, #4285F4, #34A853);
                color: white;
            }

            .review-btn-google:hover {
                background: linear-gradient(135deg, #3367D6, #0F9D58);
            }

            .review-btn-tripadvisor {
                background: linear-gradient(135deg, #00AF87, #00D2AA);
                color: white;
            }

            .review-btn-tripadvisor:hover {
                background: linear-gradient(135deg, #008F6F, #00B894);
            }

            .review-btn-yelp {
                background: linear-gradient(135deg, #FF1744, #FF5722);
                color: white;
            }

            .review-btn-yelp:hover {
                background: linear-gradient(135deg, #D50000, #E64A19);
            }

            .reviews-display {
                margin: var(--spacing-xl) 0;
                padding: var(--spacing-xl);
                background: var(--alpine-white);
                border-radius: 15px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            }

            .reviews-display h4 {
                text-align: center;
                color: var(--alpine-black);
                margin-bottom: var(--spacing-lg);
                font-size: 1.3rem;
            }

            .review-item {
                padding: var(--spacing-lg);
                margin-bottom: var(--spacing-md);
                border-left: 4px solid var(--alpine-brown-light);
                background: rgba(156, 122, 96, 0.05);
                border-radius: 8px;
            }

            .review-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: var(--spacing-sm);
            }

            .review-author {
                font-weight: 600;
                color: var(--alpine-brown-dark);
            }

            .review-rating {
                display: flex;
                gap: 2px;
            }

            .review-star {
                color: #FFD700;
                font-size: 1rem;
            }

            .review-text {
                color: var(--alpine-black);
                line-height: 1.5;
                font-style: italic;
            }

            .review-source {
                font-size: 0.8rem;
                color: var(--alpine-brown-dark);
                margin-top: var(--spacing-sm);
                opacity: 0.7;
            }

            @media (max-width: 768px) {
                .review-buttons {
                    flex-direction: column;
                    align-items: stretch;
                }

                .review-btn {
                    min-width: auto;
                    width: 100%;
                }

                .reviews-widget {
                    padding: var(--spacing-lg);
                }
            }
        `;
        document.head.appendChild(style);
    }

    loadGoogleReviews() {
        // Simuler des avis pour la démo (à remplacer par l'API Google Places)
        const mockReviews = [
            {
                author: "Marie D.",
                rating: 5,
                text: "Excellent bar avec des cocktails innovants ! L'ambiance est parfaite pour une soirée entre amis.",
                source: "Google",
                date: "2024-12-15"
            },
            {
                author: "Thomas L.",
                rating: 5,
                text: "Service impeccable et cocktails d'exception. Les produits locaux font vraiment la différence.",
                source: "Google",
                date: "2024-12-10"
            },
            {
                author: "Sophie M.",
                rating: 4,
                text: "Très bonne découverte ! Ambiance cosy et mixologie de qualité. Je recommande vivement.",
                source: "TripAdvisor",
                date: "2024-12-08"
            }
        ];

        this.displayReviews(mockReviews);
    }

    displayReviews(reviews) {
        // Créer la section d'affichage des avis
        const reviewsDisplay = document.createElement('div');
        reviewsDisplay.className = 'reviews-display';
        
        const isEnglish = document.documentElement.lang === 'en';
        const title = isEnglish ? '⭐ What our customers say' : '⭐ Ce que disent nos clients';
        
        let reviewsHTML = `<h4>${title}</h4>`;
        
        reviews.forEach(review => {
            const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
            reviewsHTML += `
                <div class="review-item">
                    <div class="review-header">
                        <span class="review-author">${review.author}</span>
                        <div class="review-rating">
                            ${stars.split('').map(star => `<span class="review-star">${star}</span>`).join('')}
                        </div>
                    </div>
                    <p class="review-text">"${review.text}"</p>
                    <div class="review-source">${review.source} - ${new Date(review.date).toLocaleDateString()}</div>
                </div>
            `;
        });
        
        reviewsDisplay.innerHTML = reviewsHTML;
        
        // Injecter dans la page (par exemple dans contact.html)
        if (window.location.pathname.includes('contact')) {
            const main = document.querySelector('main .page-card');
            if (main) {
                main.appendChild(reviewsDisplay);
            }
        }
    }

    setupGoogleReviewLink() {
        // Configurer le lien direct vers les avis Google
        const googleBtn = document.getElementById('google-review-btn');
        if (googleBtn) {
            // URL générique pour laisser un avis (à personnaliser avec le vrai Place ID)
            const reviewUrl = `https://search.google.com/local/writereview?placeid=${this.googleBusinessId}`;
            googleBtn.href = reviewUrl;
        }
    }
}

// Initialiser le widget d'avis
document.addEventListener('DOMContentLoaded', () => {
    const reviewsWidget = new ReviewsWidget();
    reviewsWidget.setupGoogleReviewLink();
});