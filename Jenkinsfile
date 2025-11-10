pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = "kalanichethana/mern-frontend"
        BACKEND_IMAGE  = "kalanichethana/mern-backend"
        DOCKER_CREDENTIALS_ID = "dockerhub"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'git@github.com:KalaniChethana/devops.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                script {
                    sh """
                        cd backend
                        docker build -t ${BACKEND_IMAGE}:latest .
                    """
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                script {
                    sh """
                        cd frontend
                        docker build -t ${FRONTEND_IMAGE}:latest .
                    """
                }
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}",
                        usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh """
                            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                            docker push ${BACKEND_IMAGE}:latest
                            docker push ${FRONTEND_IMAGE}:latest
                            docker logout
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            echo "✅ Both Docker images built and pushed to Docker Hub successfully."
        }
    }
}
