#!/bin/bash

# Script de rebuild complet pour Alpine Bar
echo "🔄 Arrêt du container..."
docker compose down

echo "🧹 Nettoyage Docker COMPLET..."
docker system prune -af
docker builder prune -af
docker volume prune -f

# Supprimer spécifiquement l'image Alpine Bar
echo "🗑️ Suppression de l'image Alpine Bar..."
docker rmi alpine-alpine-bar-web:latest 2>/dev/null || echo "Image déjà supprimée"

echo "🔨 Rebuild FORCE avec nouveau contexte..."
DOCKER_BUILDKIT=0 docker compose build --no-cache --pull --force-rm

echo "🚀 Redémarrage..."
docker compose up -d

echo "✅ Rebuild terminé!"
echo "📍 Site accessible sur:"
echo "   - Local: http://localhost:8081"  
echo "   - Tailscale: http://$(tailscale ip -4):8081"

# Test rapide avec timestamp
sleep 2
echo "🔍 Test de connectivité..."
curl -s -o /dev/null -w "Status: %{http_code}\n" http://localhost:8081

echo "📊 Vérification des timestamps..."
echo "Local contact.html:"
stat contact.html | grep Modify
echo "Container contact.html:"
docker exec alpine-bar-site stat /usr/share/nginx/html/contact.html | grep Modify