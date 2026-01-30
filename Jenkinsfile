pipeline {
  agent any

  environment {
    DOCKER_CREDENTIALS_ID = "dockerhub"

    AWS_DEFAULT_REGION = "ap-south-1"

    EC2_SSH_CRED = "ec2-ssh"
    EC2_USER     = "ubuntu"
    EC2_HOST     = "13.205.2.218"
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
    withCredentials([
      string(credentialsId: 'aws-access-key', variable: 'AWS_ACCESS_KEY_ID'),
      string(credentialsId: 'aws-secret-key', variable: 'AWS_SECRET_ACCESS_KEY')
    ]) {
      dir('terraform') {
        sh 'terraform init'
      }
    }
  }
}

stage('Terraform Plan') {
  steps {
    withCredentials([
      string(credentialsId: 'aws-access-key', variable: 'AWS_ACCESS_KEY_ID'),
      string(credentialsId: 'aws-secret-key', variable: 'AWS_SECRET_ACCESS_KEY')
    ]) {
      dir('terraform') {
        sh 'terraform plan -out=tfplan'
      }
    }
  }
}

stage('Terraform Apply') {
  steps {
    withCredentials([
      string(credentialsId: 'aws-access-key', variable: 'AWS_ACCESS_KEY_ID'),
      string(credentialsId: 'aws-secret-key', variable: 'AWS_SECRET_ACCESS_KEY')
    ]) {
      dir('terraform') {
        sh 'terraform apply -auto-approve tfplan'
      }
    }
  }
}


    /* ---------- DOCKER ---------- */

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

    /* ---------- ANSIBLE ---------- */

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

    /* ---------- KUBERNETES ---------- */

    stage('Deploy to Kubernetes') {
      steps {
        sshagent(credentials: [EC2_SSH_CRED]) {
          sh """
            ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} << EOF
              kubectl apply -f ~/devops/k8s/
              kubectl rollout status deployment/backend
              kubectl rollout status deployment/frontend
            EOF
          """
        }
      }
    }
  }

  post {
    success {
      echo "✅ Terraform + Docker + Ansible + Kubernetes completed successfully"
    }
    failure {
      echo "❌ Pipeline failed"
    }
  }
}
