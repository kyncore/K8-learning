# Module 1: Core Concepts (Pods, Deployments, and Services)

Welcome to the first module! Here, we'll explore the fundamental building blocks of Kubernetes.

## Core Concepts

### 1. Containers

A container is a lightweight, standalone, executable package of software that includes everything needed to run an application: code, runtime, system tools, system libraries and settings.

### 2. Pods

In Kubernetes, a **Pod** is the smallest and simplest unit in the Kubernetes object model that you create or deploy. A Pod represents a running process on your cluster. It encapsulates an application's container (or in some cases, multiple containers), storage resources, a unique network IP, and options that govern how the container(s) should run.

### 3. Deployments

A **Deployment** provides declarative updates for Pods and ReplicaSets. You describe a desired state in a Deployment, and the Deployment Controller changes the actual state to the desired state at a controlled rate. You can define Deployments to create new ReplicaSets, or to remove existing Deployments and adopt all their resources with new Deployments.

### 4. Services

A **Service** in Kubernetes is an abstraction which defines a logical set of Pods and a policy by which to access them. Services enable a loose coupling between dependent Pods. A Service is defined using YAML (or JSON), like all Kubernetes objects. The set of Pods targeted by a Service is usually determined by a `selector`.

## Project: "Hello, World" Web Server

This project will guide you through deploying a simple "Hello, World" web server to your local Minikube cluster.

### Step 1: Build the Docker Image

First, you need to build the Docker image for the application.

1.  **Navigate to the project directory:**
    ```bash
    cd kubernetes-learning-path/01-core-concepts/hello-world-app
    ```

2.  **Build the image:**
    ```bash
    docker build -t hello-world:latest .
    ```

### Step 2: Load the Image into Minikube

By default, Minikube has its own Docker daemon. You need to load your local Docker image into Minikube's Docker daemon so that it can be used by Kubernetes.

```bash
minikube image load hello-world:latest
```

### Step 3: Deploy the Application to Kubernetes

Now, you'll apply the `deployment.yaml` and `service.yaml` files to create the Deployment and Service in your cluster.

1.  **Apply the Deployment:**
    ```bash
    kubectl apply -f deployment.yaml
    ```

2.  **Apply the Service:**
    ```bash
    kubectl apply -f service.yaml
    ```

### Step 4: Verify the Deployment

You can check the status of your Deployment and Pods.

1.  **Check the Deployment:**
    ```bash
    kubectl get deployments
    ```
    You should see `hello-world-deployment` with 2/2 replicas ready.

2.  **Check the Pods:**
    ```bash
    kubectl get pods
    ```
    You should see two `hello-world-deployment` Pods running.

### Step 5: Access the Application

Now, you can access your application through the Service.

1.  **Get the Service URL:**
    ```bash
    minikube service hello-world-service --url
    ```
    This will return the URL where you can access the application.

2.  **Open the URL in your browser:**
    Open the URL in your web browser, and you should see the "Hello, World!" message.

Congratulations! You have successfully deployed your first application to Kubernetes.
