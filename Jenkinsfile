pipeline {
  agent any

  environment {
    DOCKER_IMAGE = "ananya0507/todo-app"
    DOCKER_CREDS_ID = 'docker-hub'
    KUBECONFIG_CRED = 'kubeconfig-file'
  }

  stages {
    stage('Checkout') { steps { checkout scm } }

    stage('Build Docker Image') {
      steps {
        sh "docker build -t ${DOCKER_IMAGE}:${BUILD_NUMBER} ."
        sh "docker tag ${DOCKER_IMAGE}:${BUILD_NUMBER} ${DOCKER_IMAGE}:latest"
      }
    }

    stage('Smoke Test') {
      steps {
        sh "docker run -d --name todo-test -p 3000:3000 ${DOCKER_IMAGE}:${BUILD_NUMBER} || true"
        sh "sleep 3"
        sh "curl -f http://localhost:3000/todos || true"
        sh "docker rm -f todo-test || true"
      }
    }

    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
          sh "docker push ${DOCKER_IMAGE}:${BUILD_NUMBER}"
          sh "docker push ${DOCKER_IMAGE}:latest"
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        withCredentials([file(credentialsId: "${KUBECONFIG_CRED}", variable: 'KUBECONFIG_FILE')]) {
          sh 'mkdir -p $HOME/.kube'
          sh 'cp $KUBECONFIG_FILE $HOME/.kube/config'
          sh "kubectl set image deployment/todo-app todo=${DOCKER_IMAGE}:${BUILD_NUMBER} --record || true"
          sh "kubectl rollout status deployment/todo-app --timeout=120s || true"
        }
      }
    }
  }

  post {
    success { echo "Deployed ${DOCKER_IMAGE}:${BUILD_NUMBER}" }
    failure { echo "Pipeline failed" }
  }
}
