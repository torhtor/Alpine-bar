#!/bin/bash

# Script simple pour démarrer en mode volume (changements instantanés)
echo "🚀 Démarrage Alpine Bar en mode développement..."
echo "📁 Utilisation de volumes pour changements instantanés"

docker compose -f docker-compose-dev.yml up -d

echo "✅ Container démarré!"
echo "📍 Site accessible sur:"
echo "   - Local: http://localhost:8081"
echo "   - Tailscale: http://$(tailscale ip -4 2>/dev/null || echo "IP-TAILSCALE"):8081"
echo ""
echo "💡 Vos changements sont maintenant visibles instantanément!"
echo "🔄 Pas besoin de rebuild - modifiez vos fichiers et rafraîchissez le navigateur"

# Test rapide
sleep 1
curl -s -o /dev/null -w "🔍 Test: %{http_code}\n" http://localhost:8081