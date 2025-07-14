# Module 2: Configuration and Secrets

In this module, we'll learn how to manage application configuration and sensitive data in Kubernetes.

## Core Concepts

### 1. ConfigMaps

A **ConfigMap** is an API object used to store non-confidential data in key-value pairs. Pods can consume ConfigMaps as environment variables, command-line arguments, or as configuration files in a volume.

### 2. Secrets

**Secrets** are similar to ConfigMaps but are intended for sensitive data, such as passwords, OAuth tokens, and ssh keys. Storing confidential data in a Secret is safer and more flexible than putting it verbatim in a Pod definition or in a container image.

## Project: Configurable Web Server

This project demonstrates how to use ConfigMaps and Secrets to configure a simple web server.

### Step 1: Build the Docker Image

First, ensure your terminal is configured to use the Docker daemon inside Minikube.
```bash
eval $(minikube -p minikube docker-env)
```

1.  **Navigate to the project directory:**
    ```bash
    cd /Users/kyawyenaing/Klab/kubernetes-learning-path/02-configuration-and-secrets/config-app
    ```

2.  **Build the image:**
    ```bash
    docker build -t config-app:latest .
    ```

### Step 2: Deploy the Application

1.  **Create the ConfigMap and Secret:**
    ```bash
    kubectl apply -f configmap.yaml
    kubectl apply -f secret.yaml
    ```

2.  **Deploy the application using the ConfigMap:**
    ```bash
    kubectl apply -f deployment-configmap.yaml
    ```

3.  **Create the Service:**
    ```bash
    kubectl apply -f service.yaml
    ```

### Step 3: Access the Application

1.  **Get the Service URL:**
    ```bash
    minikube service config-app-service
    ```
    This will open the application in your browser. You should see "Hello, from a ConfigMap!".

### Step 4: Update the Deployment to Use the Secret

Now, let's update the application to use the Secret instead of the ConfigMap.

1.  **Delete the existing Deployment:**
    ```bash
    kubectl delete deployment config-app-deployment-configmap
    ```

2.  **Deploy the application using the Secret:**
    ```bash
    kubectl apply -f deployment-secret.yaml
    ```

3.  **Update the Service selector:**
    The service needs to know about the new labels on the secret-based deployment.
    ```bash
    kubectl patch service config-app-service -p '{"spec":{"selector":{"app":"config-app-secret"}}}'
    ```

### Step 5: Access the Application Again

1.  **Get the Service URL:**
    ```bash
    minikube service config-app-service
    ```

2.  **Open the URL in your browser.** You should now see "Hello, from a Secret!".

This module has shown you how to decouple configuration from your application code, which is a crucial practice for building portable and scalable applications in Kubernetes.
