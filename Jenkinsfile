pipeline {
  agent any

  environment {
    DOCKER_CREDENTIALS_ID = "dockerhub"
    EC2_HOST = "13.205.2.218"
    EC2_USER = "ubuntu"
    EC2_SSH_CRED = "ec2-ssh"
  }

  stages {

    stage('Checkout') {
      steps {
        git branch: 'main',
            url: 'https://github.com/KalaniChethana/devops.git'
      }
    }

    stage('Build') {
      steps {
        sh 'chmod +x scripts/build.sh'
        sh './scripts/build.sh'
      }
    }

    stage('Push') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: DOCKER_CREDENTIALS_ID,
          usernameVariable: 'DOCKER_USER',
          passwordVariable: 'DOCKER_PASS'
        )]) {
          sh 'chmod +x scripts/push.sh'
          sh './scripts/push.sh $DOCKER_USER $DOCKER_PASS'
        }
      }
    }

    stage('Deploy') {
      steps {
        sshagent(credentials: [EC2_SSH_CRED]) {
          sh 'chmod +x scripts/deploy.sh'
          sh "./scripts/deploy.sh ${EC2_USER} ${EC2_HOST}"
        }
      }
    }
  }

  post {
    success {
      echo "✅ Build, Push, and Deploy completed successfully"
    }
    failure {
      echo "❌ Pipeline failed"
    }
  }
}
