pipeline {
  agent any

  environment {
    // DockerHub
    DOCKER_CREDENTIALS_ID = "dockerhub"

    // EC2 SSH deploy
    EC2_HOST = "13.205.2.218"
    EC2_USER = "ubuntu"
    EC2_SSH_CRED = "ec2-ssh"

    // AWS (Secret Text credentials)
   
    AWS_DEFAULT_REGION    = 'ap-south-1'
  }

  stages {

    stage('Checkout') {
      steps {
        git branch: 'main',
            url: 'https://github.com/KalaniChethana/devops.git'
      }
    }

    /* =========================
       TERRAFORM STAGES
       ========================= */

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

    /* =========================
       DOCKER STAGES
       ========================= */

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

    /* =========================
       DEPLOY STAGE
       ========================= */

    stage('Deploy') {
      steps {
        sshagent(credentials: [EC2_SSH_CRED]) {
          sh 'chmod +x scripts/deploy.sh'
          sh "./scripts/deploy.sh ${EC2_USER} ${EC2_HOST}"
        }
      }
    }
  }

   /* ======================
       ANSIBLE DEPLOY
       ====================== */
       
  stage('Ansible Deploy') {
  steps {
    sshagent(credentials: [EC2_SSH_CRED]) {
      sh '''
        ansible --version
        ansible-galaxy collection install community.docker
        ansible-playbook -i ansible/inventory.ini ansible/deploy.yml \
          --private-key /var/lib/jenkins/.ssh/devops-key.pem
      '''
    }
  }
}


  post {
    success {
      echo "✅ Terraform + Build + Push + Deploy completed successfully"
    }
    failure {
      echo "❌ Pipeline failed"
    }
  }
}
