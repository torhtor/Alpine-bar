#!/bin/bash

# 🔍 Alpine Bar - Vérification Monitoring
# Script pour tester que tous les systèmes de monitoring fonctionnent

set -e

echo "🔍 Alpine Bar - Vérification Monitoring"
echo "======================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_test() {
    echo -e "${BLUE}🧪 Test: $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Test 1: Site accessibility
print_test "Accessibilité du site"
if curl -s -o /dev/null -w "%{http_code}" https://www.alpine-bar.com | grep -q "200"; then
    print_success "Site accessible (HTTP 200)"
else
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" https://www.alpine-bar.com || echo "TIMEOUT")
    print_error "Site non accessible (Code: $HTTP_CODE)"
fi
echo ""

# Test 2: Analytics present
print_test "Google Analytics présent"
if curl -s https://www.alpine-bar.com | grep -q "G-49Z27M7V6G"; then
    print_success "Google Analytics détecté"
else
    print_error "Google Analytics manquant"
fi
echo ""

# Test 3: Consent Mode
print_test "RGPD Consent Mode"
if curl -s https://www.alpine-bar.com | grep -q "consent.*default"; then
    print_success "Consent Mode configuré"
else
    print_error "Consent Mode manquant"
fi
echo ""

# Test 4: Essential pages
print_test "Pages critiques"
PAGES=("" "menu.html" "contact.html" "en/" "en/menu.html")
ALL_OK=true

for page in "${PAGES[@]}"; do
    URL="https://www.alpine-bar.com/$page"
    if curl -s -o /dev/null -w "%{http_code}" "$URL" | grep -q "200"; then
        print_success "✓ $URL"
    else
        print_error "✗ $URL"
        ALL_OK=false
    fi
done

if [ "$ALL_OK" = true ]; then
    print_success "Toutes les pages critiques accessibles"
else
    print_error "Certaines pages ont des problèmes"
fi
echo ""

# Test 5: Performance check
print_test "Performance basique"
LOAD_TIME=$(curl -w "%{time_total}" -o /dev/null -s https://www.alpine-bar.com)
LOAD_TIME_MS=$(echo "$LOAD_TIME * 1000" | bc -l | cut -d. -f1)

if [ "$LOAD_TIME_MS" -lt 3000 ]; then
    print_success "Temps de chargement: ${LOAD_TIME_MS}ms (<3s ✓)"
elif [ "$LOAD_TIME_MS" -lt 5000 ]; then
    print_warning "Temps de chargement: ${LOAD_TIME_MS}ms (acceptable mais >3s)"
else
    print_error "Temps de chargement: ${LOAD_TIME_MS}ms (trop lent >5s)"
fi
echo ""

# Test 6: SSL Certificate
print_test "Certificat SSL"
if curl -s -I https://www.alpine-bar.com | grep -q "HTTP/[12]"; then
    print_success "HTTPS fonctionnel"
else
    print_error "Problème HTTPS"
fi
echo ""

# Récapitulatif
echo "📊 RÉCAPITULATIF MONITORING"
echo "=========================="
echo ""
echo "✅ UptimeRobot configuré ? → Vérifier sur uptimerobot.com"
echo "✅ Search Console configuré ? → Vérifier sur search.google.com/search-console"
echo "✅ Cloudflare configuré ? → Vérifier sur dash.cloudflare.com"
echo ""
echo "📋 Dashboards à bookmarquer :"
echo "• UptimeRobot: https://uptimerobot.com/dashboard"
echo "• Analytics: https://analytics.google.com"
echo "• Search Console: https://search.google.com/search-console"
echo "• Cloudflare: https://dash.cloudflare.com (si configuré)"
echo ""
echo "🎯 STATUT GÉNÉRAL:"
if [ "$ALL_OK" = true ] && [ "$LOAD_TIME_MS" -lt 5000 ]; then
    print_success "🎉 TOUT EST OPÉRATIONNEL - PRÊT POUR L'OUVERTURE !"
else
    print_warning "⚠️ Quelques points à vérifier mais site fonctionnel"
fi
echo ""
echo "💡 TIP: Lancez ce script régulièrement pour vérifier la santé du site"