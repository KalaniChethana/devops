# DevOps Project

A full-stack application with React frontend, Node.js/Express backend, and complete DevOps infrastructure using Docker, Kubernetes, Terraform, and Ansible.

## Project Overview

This project demonstrates a complete DevOps setup with:
- **Frontend**: React-based dashboard with multiple user roles (Admin, Client, Provider)
- **Backend**: Express.js REST API with MongoDB integration
- **Infrastructure**: Terraform for IaC, Ansible for configuration management
- **CI/CD**: Jenkins pipeline for automated builds and deployments
- **Containerization**: Docker & Docker Compose for local development

## Project Structure

```
├── frontend/              # React application
│   ├── src/
│   │   ├── components/    # Reusable components (Navbar)
│   │   └── pages/         # Page components (Login, Dashboard, etc.)
│   ├── public/            # Static assets
│   └── package.json
├── backend/               # Node.js/Express API
│   ├── models/            # Database models (User)
│   ├── routes/            # API routes (auth)
│   ├── index.js           # Server entry point
│   └── package.json
├── terraform/             # Infrastructure as Code
│   └── main.tf
├── ansible/               # Configuration management
│   ├── deploy.yml
│   └── inventory.ini
├── scripts/               # Utility scripts
│   ├── build.sh
│   ├── deploy.sh
│   └── push.sh
├── docker-compose.yaml    # Local development orchestration
├── Jenkinsfile            # CI/CD pipeline
└── README.md
```

## Features

### Frontend
- **Multi-role dashboard**: Admin, Client, and Provider dashboards
- **Authentication**: Login and signup pages
- **Navigation**: Responsive navbar component
- **Styling**: CSS module-based styling
- **Routing**: React Router for client-side navigation

### Backend
- **Authentication**: JWT-based authentication with bcryptjs
- **API**: RESTful endpoints for user management
- **Database**: MongoDB integration via Mongoose
- **Security**: CORS enabled, JWT token management

## Prerequisites

- Node.js (v14+)
- Docker & Docker Compose
- MongoDB (or Docker container)
- Terraform (v1.0+)
- Ansible (v2.9+)
- Jenkins (for CI/CD)

## Getting Started

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd devops
   ```

2. **Start with Docker Compose**
   ```bash
   docker-compose up -d
   ```
   This will start both frontend (port 3000) and backend (port 5000) services.

3. **Manual Setup**

   **Backend:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

   **Frontend:**
   ```bash
   cd frontend
   npm install
   npm start
   ```

## Available Scripts

### Frontend
- `npm start` - Run development server (localhost:3000)
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (irreversible)

### Backend
- `npm start` - Start production server
- `npm run dev` - Start with nodemon for development

### Shell Scripts
- `scripts/build.sh` - Build Docker images
- `scripts/push.sh` - Push images to registry
- `scripts/deploy.sh` - Deploy to infrastructure

## Infrastructure

### Docker Compose
Local development environment with containerized services.

### Terraform
Infrastructure provisioning defined in `terraform/main.tf`

### Ansible
Configuration management and deployment automation:
- Playbook: `ansible/deploy.yml`
- Inventory: `ansible/inventory.ini`

### CI/CD Pipeline
Jenkins pipeline (`Jenkinsfile`) for automated:
- Code compilation
- Testing
- Docker image building
- Deployment

## Environment Variables

Create `.env` files for sensitive configuration:

**Backend** (.env):
```
MONGODB_URI=mongodb://localhost:27017/devops
JWT_SECRET=your_jwt_secret
PORT=5000
```

**Frontend** (.env):
```
REACT_APP_API_URL=http://localhost:5000/api
```

## API Documentation

### Authentication Routes
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

Responses include JWT tokens for authenticated requests.

## Development Workflow

1. Create feature branch: `git checkout -b feature/feature-name`
2. Make changes to frontend/backend as needed
3. Test locally with Docker Compose
4. Commit and push changes
5. Jenkins pipeline will automatically build and test
6. Merge to main branch after approval

## Deployment

### Using Terraform
```bash
cd terraform
terraform init
terraform plan
terraform apply
```

### Using Ansible
```bash
cd ansible
ansible-playbook -i inventory.ini deploy.yml
```

### Using Scripts
```bash
./scripts/build.sh
./scripts/push.sh
./scripts/deploy.sh
```

## Testing

### Frontend
```bash
cd frontend
npm test
```

### Backend
Backend tests can be run using your preferred testing framework.

## Troubleshooting

- **Port already in use**: Change port in docker-compose.yaml or kill existing process
- **MongoDB connection error**: Ensure MongoDB is running or check connection string
- **Dependencies issues**: Delete node_modules and package-lock.json, then reinstall

## Contributing

1. Follow the existing code structure
2. Add tests for new features
3. Update documentation
4. Create pull request with detailed description

## License

ISC

## Support

For issues or questions, please create an issue in the repository.

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

kalani