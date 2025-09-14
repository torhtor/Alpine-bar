#!/bin/bash

# 🚀 Alpine Bar - Quick Setup Script
# Script pour implémenter les Quick Wins rapidement

set -e  # Exit on error

echo "🏔️ Alpine Bar - Quick Setup pour Production"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_step() {
    echo -e "${BLUE}📋 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "💡 $1"
}

# Check if gh CLI is installed
check_gh_cli() {
    if command -v gh &> /dev/null; then
        print_success "GitHub CLI détecté"
        return 0
    else
        print_warning "GitHub CLI non installé"
        print_info "Installer avec: brew install gh (macOS) ou https://cli.github.com/"
        return 1
    fi
}

# Step 1: GitHub Repository Setup
setup_github() {
    print_step "1. Configuration GitHub Repository"
    
    if ! check_gh_cli; then
        print_info "Passer cette étape et configurer manuellement :"
        print_info "1. Créer un repo privé sur GitHub: alpine-bar-website"
        print_info "2. git remote add origin https://github.com/torhtor/alpine-bar-website.git"
        print_info "3. git push -u origin main --all"
        echo ""
        return
    fi
    
    echo "Nom du repository GitHub (défaut: alpine-bar-website):"
    read -r REPO_NAME
    REPO_NAME=${REPO_NAME:-alpine-bar-website}
    
    echo "Créer repository privé ? (Y/n):"
    read -r PRIVATE
    PRIVATE=${PRIVATE:-Y}
    
    PRIVACY_FLAG=""
    if [[ "$PRIVATE" =~ ^[Yy]$ ]]; then
        PRIVACY_FLAG="--private"
    fi
    
    print_info "Création du repository $REPO_NAME..."
    
    if gh repo create "$REPO_NAME" $PRIVACY_FLAG --description "Alpine Bar - Bar à cocktails d'exception à Annecy"; then
        print_success "Repository créé sur GitHub"
        
        # Add remote and push
        git remote add origin "https://github.com/$(gh api user --jq .login)/$REPO_NAME.git" 2>/dev/null || true
        
        print_info "Push vers GitHub..."
        if git push -u origin main --all && git push --tags; then
            print_success "Code synchronisé avec GitHub"
        else
            print_error "Erreur lors du push"
        fi
    else
        print_error "Erreur lors de la création du repository"
    fi
    echo ""
}

# Step 2: Basic CI/CD Setup
setup_github_actions() {
    print_step "2. Configuration GitHub Actions (CI/CD basique)"
    
    mkdir -p .github/workflows
    
    cat > .github/workflows/quality-check.yml << 'EOF'
name: Quality Check

on:
  push:
    branches: [ main, develop, staging ]
  pull_request:
    branches: [ main ]

jobs:
  quality-check:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Validate HTML
      run: |
        sudo apt-get update
        sudo apt-get install -y tidy
        find . -name "*.html" -exec tidy -q -e {} \; || true
    
    - name: Check Analytics Implementation
      run: |
        echo "Vérification Google Analytics..."
        if grep -r "G-49Z27M7V6G" *.html; then
          echo "✅ Google Analytics ID trouvé"
        else
          echo "❌ Google Analytics ID manquant"
          exit 1
        fi
        
        if grep -r "consent.*default" *.html; then
          echo "✅ Consent Mode configuré"
        else
          echo "❌ Consent Mode manquant"
          exit 1
        fi
    
    - name: SEO Basic Check
      run: |
        echo "Vérification SEO basique..."
        for file in *.html; do
          if grep -q "<title>" "$file" && grep -q "meta.*description" "$file"; then
            echo "✅ $file: SEO tags OK"
          else
            echo "❌ $file: SEO tags manquants"
          fi
        done
    
    - name: Performance Check
      run: |
        echo "Vérification taille des assets..."
        find . -name "*.js" -exec wc -c {} \; | awk '{total+=$1} END{print "JS Total:", total/1024, "KB"}'
        find . -name "*.css" -exec wc -c {} \; | awk '{total+=$1} END{print "CSS Total:", total/1024, "KB"}'
EOF
    
    print_success "GitHub Actions workflow créé"
    echo ""
}

# Step 3: Create production deployment script
create_deploy_script() {
    print_step "3. Script de déploiement production"
    
    cat > deploy-production.sh << 'EOF'
#!/bin/bash

# 🚀 Alpine Bar - Production Deployment Script

set -e

echo "🏔️ Déploiement Production Alpine Bar"
echo "==================================="

# Pre-deployment checks
echo "🔍 Vérifications pré-déploiement..."

# Check we're on main branch
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" != "main" ]; then
    echo "❌ Déploiement possible uniquement depuis main branch"
    echo "   Branche actuelle: $BRANCH"
    exit 1
fi

# Check no uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "❌ Des changements non commitéees détectés"
    git status
    exit 1
fi

# Basic tests
echo "🧪 Tests basiques..."
if ! grep -q "G-49Z27M7V6G" index.html; then
    echo "❌ Google Analytics manquant"
    exit 1
fi

echo "✅ Pré-vérifications OK"

# Create backup tag
TAG="backup-$(date +%Y%m%d-%H%M%S)"
git tag "$TAG"
echo "🏷️ Backup tag créé: $TAG"

# Docker build (if using Docker)
if [ -f "Dockerfile" ]; then
    echo "🐳 Build Docker..."
    docker build -t alpine-bar:latest .
    echo "✅ Docker build terminé"
fi

# Sync files (adapt to your hosting)
echo "📤 Déploiement des fichiers..."
# rsync -avz --exclude='.*' ./ user@yourserver.com:/var/www/alpine-bar/
# ou votre méthode de déploiement

echo "🎉 Déploiement terminé!"
echo "🔗 Site: https://www.alpine-bar.com"
echo "📊 Analytics: https://analytics.google.com/"
EOF
    
    chmod +x deploy-production.sh
    print_success "Script de déploiement créé: deploy-production.sh"
    echo ""
}

# Step 4: Health check endpoint
create_health_check() {
    print_step "4. Endpoint de monitoring"
    
    cat > health-check.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Alpine Bar - Health Check</title>
</head>
<body>
    <h1>Alpine Bar - Health Check</h1>
    <div id="status">
        <h2>System Status</h2>
        <ul>
            <li>Site: <span id="site-status">OK</span></li>
            <li>Analytics: <span id="analytics-status">Checking...</span></li>
            <li>Cookie Banner: <span id="cookie-status">Checking...</span></li>
        </ul>
        <p>Last check: <span id="timestamp"></span></p>
    </div>

    <script>
        document.getElementById('timestamp').textContent = new Date().toLocaleString();
        
        // Check Analytics
        if (typeof gtag !== 'undefined') {
            document.getElementById('analytics-status').textContent = 'OK';
        } else {
            document.getElementById('analytics-status').textContent = 'ERROR';
        }
        
        // Check Cookie Banner
        if (typeof CookieBanner !== 'undefined') {
            document.getElementById('cookie-status').textContent = 'OK';
        } else {
            document.getElementById('cookie-status').textContent = 'ERROR';
        }
    </script>
    
    <!-- Include Analytics for testing -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-49Z27M7V6G"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-49Z27M7V6G');
    </script>
    
    <!-- Include Cookie Banner for testing -->
    <script src="cookie-banner.js?v=2025091301"></script>
</body>
</html>
EOF
    
    print_success "Page de health check créée: health-check.html"
    print_info "URL: http://localhost:8080/health-check.html"
    echo ""
}

# Step 5: Documentation updates
update_documentation() {
    print_step "5. Mise à jour documentation"
    
    # Update README with production info
    if [ -f "README.md" ]; then
        cat >> README.md << 'EOF'

## 🚀 Production Setup

### Quick Start
```bash
# Run quick setup
./quick-setup.sh

# Deploy to production
./deploy-production.sh
```

### Monitoring
- Health check: `/health-check.html`
- Analytics: [Google Analytics](https://analytics.google.com/)
- Uptime: Configure UptimeRobot.com

### CI/CD
GitHub Actions runs automatically on push to main branch.
EOF
        print_success "README.md mis à jour"
    fi
    
    echo ""
}

# Step 6: Commit all changes
commit_changes() {
    print_step "6. Commit des changements"
    
    git add .
    if git diff --staged --quiet; then
        print_info "Aucun changement à commiter"
    else
        git commit -m "feat: add production infrastructure and CI/CD

- GitHub Actions workflow for quality checks
- Production deployment script  
- Health check endpoint for monitoring
- Updated documentation for production setup

🤖 Generated with Claude Code"
        print_success "Changements commités"
        
        if git remote get-url origin &>/dev/null; then
            print_info "Push vers le repository distant ? (y/N)"
            read -r PUSH
            if [[ "$PUSH" =~ ^[Yy]$ ]]; then
                git push origin main
                print_success "Changements synchronisés"
            fi
        fi
    fi
    echo ""
}

# Main execution
main() {
    echo "Ce script va configurer l'infrastructure de production pour Alpine Bar."
    echo "Continuer ? (Y/n)"
    read -r CONTINUE
    CONTINUE=${CONTINUE:-Y}
    
    if [[ ! "$CONTINUE" =~ ^[Yy]$ ]]; then
        echo "Setup annulé."
        exit 0
    fi
    
    echo ""
    
    # Run setup steps
    setup_github
    setup_github_actions
    create_deploy_script  
    create_health_check
    update_documentation
    commit_changes
    
    print_success "🎉 Setup terminé !"
    echo ""
    echo "📋 Prochaines étapes manuelles :"
    echo "1. 🔍 UptimeRobot.com - monitoring gratuit"
    echo "2. 🌐 Google Search Console - SEO tracking"  
    echo "3. ⚡ Cloudflare.com - CDN gratuit"
    echo "4. 📊 Vérifier Google Analytics dashboard"
    echo ""
    echo "📖 Voir ROADMAP.md pour les étapes suivantes"
}

# Run main function
main "$@"