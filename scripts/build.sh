#!/usr/bin/env bash
set -e

BACKEND_IMAGE="kalanichethana/mern-backend"
FRONTEND_IMAGE="kalanichethana/mern-frontend"
VERSION=$(git rev-parse --short HEAD)-$(date +%Y%m%d-%H%M%S)

echo "🔨 Building backend image..."
cd backend
docker build -t ${BACKEND_IMAGE}:latest -t ${BACKEND_IMAGE}:${VERSION} .
cd ..

echo "🔨 Building frontend image..."
cd frontend
docker build -t ${FRONTEND_IMAGE}:latest -t ${FRONTEND_IMAGE}:${VERSION} .
cd ..

echo "✅ Docker build completed. Version: ${VERSION}"
