#!/usr/bin/env bash
set -e

DOCKER_USER="$1"
DOCKER_PASS="$2"

BACKEND_IMAGE="kalanichethana/mern-backend"
FRONTEND_IMAGE="kalanichethana/mern-frontend"

if [ -z "$DOCKER_USER" ] || [ -z "$DOCKER_PASS" ]; then
  echo "Usage: ./push.sh <DOCKER_USER> <DOCKER_PASS>"
  exit 1
fi

echo "🔐 Logging into Docker Hub..."
echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin

echo "📤 Pushing backend image..."
docker push ${BACKEND_IMAGE}:latest

echo "📤 Pushing frontend image..."
docker push ${FRONTEND_IMAGE}:latest

docker logout
echo "✅ Docker push completed."
