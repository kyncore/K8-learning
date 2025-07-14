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

First, ensure your terminal is configured to use the Docker daemon inside Minikube. This makes your image instantly available to the cluster.
```bash
eval $(minikube -p minikube docker-env)
```

Now, you can build the Docker image.

1.  **Navigate to the project directory:**
    ```bash
    cd /Users/kyawyenaing/Klab/kubernetes-learning-path/01-core-concepts/hello-world-app
    ```

2.  **Build the image:**
    Because you ran the `eval` command, this image is built directly inside the Minikube environment.
    ```bash
    docker build -t hello-world:latest .
    ```

### Step 2: Deploy the Application to Kubernetes

Now, you'll apply the `deployment.yaml` and `service.yaml` files to create the Deployment and Service in your cluster.

1.  **Apply the Deployment:**
    ```bash
    kubectl apply -f deployment.yaml
    ```
    *Note: The `deployment.yaml` uses `imagePullPolicy: IfNotPresent` (or it's omitted, which defaults to that if the image tag is `latest`). This is important. It tells Kubernetes to look for the image locally first before trying to pull from a remote registry.*

2.  **Apply the Service:**
    ```bash
    kubectl apply -f service.yaml
    ```

### Step 3: Verify the Deployment

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

### Step 4: Access the Application

Now, you can access your application through the Service.

1.  **Get the Service URL:**
    ```bash
    minikube service hello-world-service
    ```
    This will automatically open the URL in your browser.

Congratulations! You have successfully deployed your first application to Kubernetes.
