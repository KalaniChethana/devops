# DevOps Project - Complete Stack

A production-ready full-stack application demonstrating modern DevOps practices with infrastructure-as-code, containerization, CI/CD automation, and comprehensive deployment orchestration.

## 🎯 Project Overview

This is an enterprise-grade DevOps project featuring:
- **Frontend**: React 19 with role-based dashboards (Admin, Client, Provider)
- **Backend**: Express.js REST API with MongoDB persistence
- **Infrastructure**: Terraform-managed cloud resources
- **Configuration Management**: Ansible playbooks for automated deployments
- **CI/CD**: Jenkins pipeline for continuous integration and deployment
- **Containerization**: Docker & Docker Compose for environment consistency
- **Development**: Multi-role authentication system with JWT

## 📁 Project Structure

```
devops/
├── frontend/                 # React SPA Application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components with role-based dashboards
│   │   ├── App.js           # Main app component
│   │   ├── App.css          # Global styles
│   │   └── index.js         # React entry point
│   ├── public/              # Static assets
│   ├── Dockerfile           # Frontend container image
│   ├── package.json         # Dependencies and scripts
│   └── README.md            # Frontend documentation
│
├── backend/                  # Node.js/Express API Server
│   ├── models/              # Database models
│   │   └── User.js          # User model with schema
│   ├── routes/              # API endpoints
│   │   └── auth.js          # Authentication routes
│   ├── index.js             # Express server setup
│   ├── Dockerfile           # Backend container image
│   ├── package.json         # Dependencies and scripts
│   └── .env.example         # Environment variables template
│
├── terraform/               # Infrastructure as Code
│   └── main.tf              # Terraform configuration for cloud resources
│
├── ansible/                 # Configuration Management
│   ├── deploy.yml           # Deployment playbook
│   ├── inventory.ini        # Ansible inventory
│   └── .gitignore           # Ansible-specific ignores
│
├── scripts/                 # Automation Scripts
│   ├── build.sh             # Docker image build script
│   ├── push.sh              # Image registry push script
│   └── deploy.sh            # Deployment orchestration script
│
├── docker-compose.yaml      # Local development environment
├── Jenkinsfile              # CI/CD pipeline configuration
└── README.md                # This file
```

## 🚀 Quick Start

### Prerequisites
- **System**: Linux, macOS, or Windows with WSL2
- **Runtime**: Node.js 14+ and npm 6+
- **Containers**: Docker 20.10+ and Docker Compose 1.29+
- **Infrastructure**: Terraform 1.0+, Ansible 2.9+
- **CI/CD**: Jenkins 2.300+

### Local Development (5 minutes)

1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd devops
   ```

2. **Start Services with Docker Compose**
   ```bash
   docker-compose up -d
   ```
   
   Services will be available at:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - MongoDB: localhost:27017

3. **Access Application**
   - Open http://localhost:3000 in your browser
   - Login page will appear - create an account or use test credentials

### Manual Setup (Without Docker)

**Backend Setup:**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

**Frontend Setup:**
```bash
cd frontend
npm install
npm start
```

## 🔐 Authentication System

The application uses JWT (JSON Web Tokens) for stateless authentication:

- Passwords hashed with `bcryptjs` (cost factor: 10)
- JWTs signed with `HS256` algorithm
- Tokens included in Authorization header: `Bearer <token>`
- Role-based access control (RBAC) for Admin/Client/Provider

### User Roles

1. **Admin**: Full system access, user management
2. **Client**: Access to client dashboard, submit requests
3. **Provider**: Access to provider dashboard, manage services

## 📚 Technology Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Frontend** | React | 19.1.1 | UI framework |
| | React Router | 7.9.0 | Client-side routing |
| | Axios | 1.12.1 | HTTP client |
| **Backend** | Express.js | 5.1.0 | Web framework |
| | Node.js | 14+ | Runtime |
| | MongoDB | 5.0+ | Database |
| | Mongoose | 8.18.1 | ODM |
| | JWT | 9.0.2 | Authentication |
| | bcryptjs | 3.0.2 | Password hashing |
| **Infrastructure** | Docker | 20.10+ | Containerization |
| | Terraform | 1.0+ | IaC |
| | Ansible | 2.9+ | Configuration Mgmt |
| | Jenkins | 2.300+ | CI/CD |

## 🛠️ Development Commands

### Frontend
```bash
cd frontend

# Development server (hot reload on localhost:3000)
npm start

# Build for production
npm run build

# Run tests
npm test

# Build Docker image
docker build -t devops-frontend:latest .
```

### Backend
```bash
cd backend

# Production server
npm start

# Development server with auto-reload
npm run dev

# Install dependencies
npm install

# Build Docker image
docker build -t devops-backend:latest .
```

### Infrastructure

**Terraform:**
```bash
cd terraform

# Initialize Terraform
terraform init

# Validate configuration
terraform validate

# Plan infrastructure changes
terraform plan

# Apply infrastructure changes
terraform apply

# Destroy infrastructure
terraform destroy
```

**Ansible:**
```bash
cd ansible

# Check connectivity to managed hosts
ansible all -i inventory.ini -m ping

# Run deployment playbook
ansible-playbook -i inventory.ini deploy.yml

# Run with verbose output
ansible-playbook -i inventory.ini deploy.yml -v
```

## 🐳 Docker & Docker Compose

### Docker Compose Development Environment
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild images
docker-compose build --no-cache
```

### Build Images Manually
```bash
# Frontend image
docker build -t devops-frontend:1.0.0 ./frontend

# Backend image
docker build -t devops-backend:1.0.0 ./backend

# Run containers
docker run -p 3000:3000 devops-frontend:1.0.0
docker run -p 5000:5000 devops-backend:1.0.0
```

## 🔄 CI/CD Pipeline (Jenkins)

The Jenkins pipeline (`Jenkinsfile`) automates:

1. **Build Stage**
   - Checkout code
   - Install dependencies for frontend and backend
   - Run linting and syntax checks

2. **Test Stage**
   - Run frontend tests (Jest)
   - Run backend tests
   - Generate coverage reports

3. **Build Docker Images**
   - Build frontend and backend Docker images
   - Tag images with build number and version

4. **Push to Registry**
   - Push images to Docker registry
   - Tag as 'latest' for main branch

5. **Deploy**
   - Deploy to staging environment
   - Run smoke tests
   - Deploy to production (manual approval)

## 📝 Environment Configuration

### Backend (.env)
```env
# Database
MONGODB_URI=mongodb://localhost:27017/devops
MONGODB_USER=admin
MONGODB_PASSWORD=password

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRY=7d

# Server
PORT=5000
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)
```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development

# Authentication
REACT_APP_JWT_STORAGE_KEY=auth_token
```

## 📊 API Endpoints

### Authentication Routes
```
POST   /api/auth/signup       - Register new user
POST   /api/auth/login        - User login (returns JWT)
POST   /api/auth/logout       - User logout
POST   /api/auth/refresh      - Refresh authentication token
GET    /api/auth/me           - Get current user profile
```

### User Routes
```
GET    /api/users             - List all users (Admin only)
GET    /api/users/:id         - Get user by ID
PUT    /api/users/:id         - Update user
DELETE /api/users/:id         - Delete user
```

## 🚢 Deployment Guide

### Prerequisites for Deployment
- AWS/GCP/Azure account with credentials
- Terraform state backend configured
- Ansible inventory configured with deployment targets
- Docker registry credentials set up

### Deployment Steps

1. **Provision Infrastructure**
   ```bash
   cd terraform
   terraform init
   terraform apply -auto-approve
   ```

2. **Configure Servers**
   ```bash
   cd ansible
   ansible-playbook -i inventory.ini deploy.yml
   ```

3. **Deploy Application**
   ```bash
   bash scripts/deploy.sh
   ```

## 🧪 Testing

### Frontend Testing
```bash
cd frontend

# Run all tests
npm test

# Generate coverage report
npm test -- --coverage

# Run specific test file
npm test LoginPage.test.js
```

### Backend Testing
```bash
cd backend

# Run tests (configure test command in package.json first)
npm test

# Run with coverage
npm test -- --coverage
```

## 📊 Project Features

### Multi-Role Dashboard System
- **Admin Dashboard**: User management, system analytics
- **Client Dashboard**: Service requests, order history
- **Provider Dashboard**: Service offerings, customer management

### Security Features
- JWT-based stateless authentication
- Password hashing with bcryptjs
- CORS protection
- Request validation
- Environment-based configuration

### Scalability
- Containerized services for horizontal scaling
- Load balancer-ready architecture
- Database connection pooling
- Session management via JWT (no server state)

## 🐛 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Find and kill process using port 3000
lsof -ti:3000 | xargs kill -9

# Or change port in docker-compose.yaml
```

**MongoDB Connection Error**
```bash
# Check MongoDB is running
docker ps | grep mongodb

# Check connection string in .env
# Verify credentials: MONGODB_USER and MONGODB_PASSWORD
```

**Docker Build Fails**
```bash
# Clear Docker cache
docker system prune -a

# Rebuild with no cache
docker-compose build --no-cache
```

**Node Modules Issues**
```bash
# Clean reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📖 Documentation

- [Frontend Documentation](./frontend/README.md)
- [Backend Documentation](#) (Add backend/README.md)
- [Infrastructure Guide](#) (Add terraform/README.md)
- [Deployment Guide](#) (Add ansible/README.md)

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/your-feature-name`
2. Make changes following code style guidelines
3. Test locally: `docker-compose up`
4. Commit with clear messages: `git commit -m "feat: add new feature"`
5. Push and create Pull Request
6. Request code review
7. Merge after approval

## 📋 Checklist Before Deployment

- [ ] All environment variables configured
- [ ] Database migrations completed
- [ ] Tests passing (frontend & backend)
- [ ] Docker images built and tagged
- [ ] Docker Compose tested locally
- [ ] Terraform configuration validated
- [ ] Ansible playbooks tested
- [ ] Security scanning completed
- [ ] Load testing done
- [ ] Rollback plan documented

## 📞 Support & Contact

- **Issues**: Create an issue in the repository
- **Documentation**: See respective README files
- **Questions**: Reach out to the DevOps team

## 📄 License

ISC License - See LICENSE file for details

## 🏆 Best Practices

This project implements:
- Infrastructure as Code (Terraform)
- Configuration Management (Ansible)
- Continuous Integration/Deployment (Jenkins)
- Containerization and Orchestration (Docker)
- JWT-based authentication
- Role-based access control
- Environment-based configuration
- Comprehensive logging and monitoring setup
- Security hardening
- Scalable architecture

---

**Last Updated**: February 2026
**Version**: 1.0.0
**Status**: Production Ready
