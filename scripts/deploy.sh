#!/usr/bin/env bash
set -e

EC2_USER="$1"
EC2_HOST="$2"

BACKEND_IMAGE="kalanichethana/mern-backend"
FRONTEND_IMAGE="kalanichethana/mern-frontend"

if [ -z "$EC2_USER" ] || [ -z "$EC2_HOST" ]; then
  echo "Usage: ./deploy.sh <EC2_USER> <EC2_HOST>"
  exit 1
fi

echo "🚀 Deploying to ${EC2_USER}@${EC2_HOST}"

ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} << EOF
  set -e

  echo "⬇ Pulling images from Docker Hub"
  docker pull ${BACKEND_IMAGE}:latest
  docker pull ${FRONTEND_IMAGE}:latest

  echo "🔄 Restarting containers"
  docker stop backend frontend || true
  docker rm backend frontend || true

  docker run -d --name backend -p 5000:5000 ${BACKEND_IMAGE}:latest
  docker run -d --name frontend -p 3000:80 ${FRONTEND_IMAGE}:latest

  echo "✅ Deployment completed"
EOF
