#!/bin/bash

# Déploiement simple avec rsync dans le container
echo "🔄 Synchronisation rapide des fichiers..."

# Copier directement les fichiers dans le container en cours d'exécution
docker cp . alpine-bar-site:/usr/share/nginx/html/

# Redémarrer nginx pour prendre en compte les changements
docker exec alpine-bar-site nginx -s reload

echo "✅ Déploiement terminé!"
echo "📍 Site mis à jour sur http://localhost:8081"

# Test
curl -s -o /dev/null -w "Status: %{http_code}\n" http://localhost:8081