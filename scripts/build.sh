#!/usr/bin/env bash
set -e

BACKEND_IMAGE="kalanichethana/mern-backend"
FRONTEND_IMAGE="kalanichethana/mern-frontend"

echo "🔨 Building backend image..."
cd backend
docker build -t ${BACKEND_IMAGE}:latest .
cd ..

echo "🔨 Building frontend image..."
cd frontend
docker build -t ${FRONTEND_IMAGE}:latest .
cd ..

echo "✅ Docker build completed."
