// Cookie Banner RGPD - Alpine Bar
// Gestion des cookies conforme à la réglementation européenne

class CookieBanner {
    constructor() {
        this.cookieName = 'alpine-cookie-consent';
        this.cookieExpiry = 365; // jours
        this.init();
    }

    init() {
        // Vérifier si le consentement existe déjà
        if (!this.getCookie(this.cookieName)) {
            this.showBanner();
        } else {
            // Activer Google Analytics si consentement donné
            const consent = JSON.parse(this.getCookie(this.cookieName));
            if (consent.analytics) {
                this.enableGoogleAnalytics();
            }
        }
    }

    showBanner() {
        // Créer la bannière
        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.innerHTML = this.getBannerHTML();
        
        // Ajouter les styles
        this.addStyles();
        
        // Ajouter au DOM
        document.body.appendChild(banner);
        
        // Ajouter les event listeners
        this.addEventListeners();
    }

    getBannerHTML() {
        const isEnglish = document.documentElement.lang === 'en';
        
        if (isEnglish) {
            return `
                <div class="cookie-banner-content">
                    <div class="cookie-banner-text">
                        <h4>🍪 We use cookies</h4>
                        <p>We use cookies to improve your browsing experience and analyze our traffic with Google Analytics. By accepting, you help us provide better service.</p>
                    </div>
                    <div class="cookie-banner-actions">
                        <button id="cookie-accept-all" class="cookie-btn cookie-btn-primary">Accept all</button>
                        <button id="cookie-reject-all" class="cookie-btn cookie-btn-secondary">Reject all</button>
                        <button id="cookie-customize" class="cookie-btn cookie-btn-link">Customize</button>
                    </div>
                </div>
                <div id="cookie-details" class="cookie-details" style="display: none;">
                    <h4>Cookie preferences</h4>
                    <div class="cookie-category">
                        <label class="cookie-checkbox">
                            <input type="checkbox" id="essential-cookies" checked disabled>
                            <span class="checkmark"></span>
                            <div>
                                <strong>Essential cookies</strong>
                                <p>Necessary for the website to function properly. Cannot be disabled.</p>
                            </div>
                        </label>
                    </div>
                    <div class="cookie-category">
                        <label class="cookie-checkbox">
                            <input type="checkbox" id="analytics-cookies">
                            <span class="checkmark"></span>
                            <div>
                                <strong>Analytics cookies (Google Analytics)</strong>
                                <p>Help us understand how visitors interact with our website by collecting and reporting information anonymously.</p>
                            </div>
                        </label>
                    </div>
                    <div class="cookie-banner-actions">
                        <button id="cookie-save-preferences" class="cookie-btn cookie-btn-primary">Save preferences</button>
                        <button id="cookie-back" class="cookie-btn cookie-btn-link">Back</button>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="cookie-banner-content">
                    <div class="cookie-banner-text">
                        <h4>🍪 Nous utilisons des cookies</h4>
                        <p>Nous utilisons des cookies pour améliorer votre expérience de navigation et analyser notre trafic avec Google Analytics. En acceptant, vous nous aidez à améliorer notre service.</p>
                    </div>
                    <div class="cookie-banner-actions">
                        <button id="cookie-accept-all" class="cookie-btn cookie-btn-primary">Tout accepter</button>
                        <button id="cookie-reject-all" class="cookie-btn cookie-btn-secondary">Tout refuser</button>
                        <button id="cookie-customize" class="cookie-btn cookie-btn-link">Personnaliser</button>
                    </div>
                </div>
                <div id="cookie-details" class="cookie-details" style="display: none;">
                    <h4>Préférences des cookies</h4>
                    <div class="cookie-category">
                        <label class="cookie-checkbox">
                            <input type="checkbox" id="essential-cookies" checked disabled>
                            <span class="checkmark"></span>
                            <div>
                                <strong>Cookies essentiels</strong>
                                <p>Nécessaires au bon fonctionnement du site. Ne peuvent pas être désactivés.</p>
                            </div>
                        </label>
                    </div>
                    <div class="cookie-category">
                        <label class="cookie-checkbox">
                            <input type="checkbox" id="analytics-cookies">
                            <span class="checkmark"></span>
                            <div>
                                <strong>Cookies d'analyse (Google Analytics)</strong>
                                <p>Nous aident à comprendre comment les visiteurs interagissent avec notre site en collectant des informations de manière anonyme.</p>
                            </div>
                        </label>
                    </div>
                    <div class="cookie-banner-actions">
                        <button id="cookie-save-preferences" class="cookie-btn cookie-btn-primary">Enregistrer les préférences</button>
                        <button id="cookie-back" class="cookie-btn cookie-btn-link">Retour</button>
                    </div>
                </div>
            `;
        }
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            #cookie-banner {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: rgba(65, 53, 43, 0.98);
                color: var(--color-neutral-light);
                padding: var(--space-6);
                box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3);
                z-index: 10000;
                backdrop-filter: blur(10px);
                border-top: 3px solid var(--color-primary);
            }

            .cookie-banner-content {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                gap: var(--space-6);
            }

            .cookie-banner-text {
                flex: 1;
                min-width: 300px;
            }

            .cookie-banner-text h4 {
                margin: 0 0 var(--space-2) 0;
                font-size: 1.2rem;
                font-weight: 600;
                color: var(--color-neutral-light);
            }

            .cookie-banner-text p {
                margin: 0;
                font-size: 0.95rem;
                line-height: 1.4;
                opacity: 0.9;
            }

            .cookie-banner-actions {
                display: flex;
                gap: var(--space-4);
                flex-wrap: wrap;
            }

            .cookie-btn {
                padding: var(--space-2) var(--space-6);
                border: none;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 0.9rem;
            }

            .cookie-btn-primary {
                background: var(--color-primary);
                color: var(--color-neutral-light);
            }

            .cookie-btn-primary:hover {
                background: var(--color-neutral-light);
                color: var(--color-secondary);
                transform: translateY(-2px);
            }

            .cookie-btn-secondary {
                background: transparent;
                color: var(--color-neutral-light);
                border: 2px solid var(--color-primary);
            }

            .cookie-btn-secondary:hover {
                background: var(--color-primary);
                transform: translateY(-2px);
            }

            .cookie-btn-link {
                background: transparent;
                color: var(--color-primary);
                text-decoration: underline;
                font-weight: 400;
            }

            .cookie-btn-link:hover {
                color: var(--color-neutral-light);
            }

            .cookie-details {
                max-width: 1200px;
                margin: var(--space-6) auto 0;
                padding-top: var(--space-6);
                border-top: 1px solid rgba(156, 122, 96, 0.3);
            }

            .cookie-details h4 {
                margin: 0 0 var(--space-6) 0;
                font-size: 1.1rem;
                font-weight: 600;
            }

            .cookie-category {
                margin-bottom: var(--space-6);
            }

            .cookie-checkbox {
                display: flex;
                align-items: flex-start;
                gap: var(--space-4);
                cursor: pointer;
                padding: var(--space-4);
                border-radius: 8px;
                transition: background 0.3s ease;
            }

            .cookie-checkbox:hover {
                background: rgba(156, 122, 96, 0.1);
            }

            .cookie-checkbox input[type="checkbox"] {
                position: absolute;
                opacity: 0;
                cursor: pointer;
            }

            .checkmark {
                width: 20px;
                height: 20px;
                background: transparent;
                border: 2px solid var(--color-primary);
                border-radius: 4px;
                position: relative;
                flex-shrink: 0;
                margin-top: 2px;
            }

            .cookie-checkbox input:checked ~ .checkmark {
                background: var(--color-primary);
            }

            .cookie-checkbox input:checked ~ .checkmark:after {
                content: '';
                position: absolute;
                left: 6px;
                top: 2px;
                width: 6px;
                height: 10px;
                border: solid white;
                border-width: 0 2px 2px 0;
                transform: rotate(45deg);
            }

            .cookie-checkbox input:disabled ~ .checkmark {
                opacity: 0.6;
            }

            .cookie-checkbox div {
                flex: 1;
            }

            .cookie-checkbox strong {
                display: block;
                margin-bottom: var(--space-1);
                color: var(--color-neutral-light);
            }

            .cookie-checkbox p {
                margin: 0;
                font-size: 0.85rem;
                opacity: 0.8;
                line-height: 1.3;
            }

            @media (max-width: 768px) {
                #cookie-banner {
                    padding: var(--space-4);
                }

                .cookie-banner-content {
                    flex-direction: column;
                    align-items: stretch;
                    gap: var(--space-4);
                }

                .cookie-banner-actions {
                    justify-content: stretch;
                }

                .cookie-btn {
                    flex: 1;
                    text-align: center;
                }

                .cookie-checkbox {
                    flex-direction: column;
                    gap: var(--space-2);
                }

                .checkmark {
                    margin-top: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    addEventListeners() {
        // Accepter tous les cookies
        document.getElementById('cookie-accept-all').addEventListener('click', () => {
            this.setConsent({ essential: true, analytics: true });
            this.enableGoogleAnalytics();
            this.hideBanner();
        });

        // Refuser tous les cookies (sauf essentiels)
        document.getElementById('cookie-reject-all').addEventListener('click', () => {
            this.setConsent({ essential: true, analytics: false });
            this.disableGoogleAnalytics();
            this.hideBanner();
        });

        // Personnaliser
        document.getElementById('cookie-customize').addEventListener('click', () => {
            document.querySelector('.cookie-banner-content').style.display = 'none';
            document.getElementById('cookie-details').style.display = 'block';
        });

        // Retour
        document.getElementById('cookie-back').addEventListener('click', () => {
            document.querySelector('.cookie-banner-content').style.display = 'flex';
            document.getElementById('cookie-details').style.display = 'none';
        });

        // Sauvegarder les préférences
        document.getElementById('cookie-save-preferences').addEventListener('click', () => {
            const analytics = document.getElementById('analytics-cookies').checked;
            this.setConsent({ essential: true, analytics });
            
            if (analytics) {
                this.enableGoogleAnalytics();
            } else {
                this.disableGoogleAnalytics();
            }
            this.hideBanner();
        });
    }

    setConsent(consent) {
        const consentData = {
            ...consent,
            timestamp: Date.now(),
            version: '1.0'
        };
        this.setCookie(this.cookieName, JSON.stringify(consentData), this.cookieExpiry);
    }

    enableGoogleAnalytics() {
        // Activer Google Analytics si gtag existe
        if (typeof gtag === 'function') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
        }
    }

    disableGoogleAnalytics() {
        // S'assurer que GA reste désactivé si gtag existe
        if (typeof gtag === 'function') {
            gtag('consent', 'update', {
                'analytics_storage': 'denied'
            });
        }
    }

    hideBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.style.animation = 'slideDown 0.3s ease-out forwards';
            setTimeout(() => banner.remove(), 300);
        }

        // Ajouter animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideDown {
                from { transform: translateY(0); opacity: 1; }
                to { transform: translateY(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // Utilitaires cookies
    setCookie(name, value, days) {
        const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
        document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
    }

    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }
}

// Initialiser la bannière au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    new CookieBanner();
});