# Module 4: Networking and Ingress

This module introduces advanced networking concepts in Kubernetes, focusing on how to expose your applications to the outside world.

## Core Concepts

### 1. Ingress

An **Ingress** is an API object that manages external access to the services in a cluster, typically HTTP. Ingress can provide load balancing, SSL termination and name-based virtual hosting.

### 2. Ingress Controller

In order for the Ingress resource to work, the cluster must have an Ingress controller running. An Ingress controller is responsible for fulfilling the Ingress, usually with a load balancer.

## Project: Path-Based Routing with Ingress

This project demonstrates how to use Ingress to route traffic to different services based on the URL path.

### Step 1: Enable the Ingress Controller

In Minikube, you need to enable the Ingress controller addon.

```bash
minikube addons enable ingress
```

### Step 2: Build the Docker Images

1.  **Navigate to the project directory:**
    ```bash
    cd kubernetes-learning-path/04-networking-and-ingress/ingress-app
    ```

2.  **Build the images:**
    ```bash
    docker build -t app1:latest -f Dockerfile.app1 .
    docker build -t app2:latest -f Dockerfile.app2 .
    ```

### Step 3: Load the Images into Minikube

```bash
minikube image load app1:latest
minikube image load app2:latest
```

### Step 4: Deploy the Applications

1.  **Deploy the applications and services:**
    ```bash
    kubectl apply -f deployment-app1.yaml
    kubectl apply -f service-app1.yaml
    kubectl apply -f deployment-app2.yaml
    kubectl apply -f service-app2.yaml
    ```

2.  **Deploy the Ingress:**
    ```bash
    kubectl apply -f ingress.yaml
    ```

### Step 5: Access the Applications

1.  **Get the Minikube IP address:**
    ```bash
    minikube ip
    ```

2.  **Access App 1:**
    Open `http://<minikube-ip>/app1` in your browser. You should see "Hello from App 1!".

3.  **Access App 2:**
    Open `http://<minikube-ip>/app2` in your browser. You should see "Hello from App 2!".

This module has shown you how to use Ingress to expose your applications to the outside world and how to implement path-based routing. This is a powerful feature for managing traffic to your microservices.
