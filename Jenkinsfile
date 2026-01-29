pipeline {
  agent any

  environment {
    DOCKER_CREDENTIALS_ID = "dockerhub"
    AWS_DEFAULT_REGION    = "ap-south-1"
    EC2_SSH_CRED          = "ec2-ssh"
  }

  stages {

    stage('Checkout') {
      steps {
        git branch: 'main',
            url: 'https://github.com/KalaniChethana/devops.git'
      }
    }

    stage('Terraform Init') {
      steps {
        dir('terraform') {
          sh 'terraform init'
        }
      }
    }

    stage('Terraform Plan') {
      steps {
        dir('terraform') {
          sh 'terraform plan -out=tfplan'
        }
      }
    }

    stage('Terraform Apply') {
      steps {
        dir('terraform') {
          sh 'terraform apply -auto-approve tfplan'
        }
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

    stage('Ansible Deploy') {
      steps {
        sshagent(credentials: [EC2_SSH_CRED]) {
          sh '''
            ansible --version
            ansible-galaxy collection install community.docker || true
            ansible-playbook \
              -i ansible/inventory.ini \
              ansible/deploy.yml \
              --private-key /var/lib/jenkins/.ssh/devops-key.pem
          '''
        }
      }
    }

  }

  post {
    success {
      echo "✅ Terraform + Build + Push + Ansible Deploy completed successfully"
    }
    failure {
      echo "❌ Pipeline failed"
    }
  }
}
