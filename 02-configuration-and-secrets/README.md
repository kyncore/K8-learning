# Module 2: Configuration and Secrets

In this module, we'll learn how to manage application configuration and sensitive data in Kubernetes.

## Core Concepts

### 1. ConfigMaps

A **ConfigMap** is an API object used to store non-confidential data in key-value pairs. Pods can consume ConfigMaps as environment variables, command-line arguments, or as configuration files in a volume. This allows you to decouple configuration from your application's code.

### 2. Secrets

**Secrets** are similar to ConfigMaps but are intended for sensitive data, such as passwords, OAuth tokens, and ssh keys. Storing confidential data in a Secret is safer and more flexible than putting it verbatim in a Pod definition or in a container image. Kubernetes stores secrets in `etcd` as base64-encoded strings, but can provide additional layers of encryption at rest.

---

### An Important Lesson: Troubleshooting `ImagePullBackOff`

In this module, you may have encountered an `ImagePullBackOff` error. This is one of the most common errors when learning Kubernetes, and understanding it is crucial.

**What does it mean?**
It means that the Kubelet (the agent on the Kubernetes node) is trying to start your Pod but cannot fetch the container image specified in your Deployment.

**Why does it happen in a local environment?**
The most common reason is a mismatch between where the image was built and where Kubernetes is looking for it.

1.  **The Wrong Docker Daemon:** If you run `docker build` in your terminal *without* first running `eval $(minikube docker-env)`, you build the image on your Mac's Docker daemon. Kubernetes, running inside the Minikube VM, has its *own* Docker daemon and cannot see your Mac's images. The `eval` command temporarily points your terminal to the Docker daemon inside Minikube, ensuring the image is built in the right place.

2.  **The `imagePullPolicy`:** This is the most important concept. In your `deployment.yaml`, you specify an image for your container. You can also specify an `imagePullPolicy`.
    *   `imagePullPolicy: Always`: This tells Kubernetes to *always* try to download the image from a remote registry (like Docker Hub). It will ignore any local image with the same name.
    *   `imagePullPolicy: IfNotPresent`: This tells Kubernetes to look for the image locally first. Only if it can't find it locally will it try to download it.
    *   `imagePullPolicy: Never`: This tells Kubernetes to *only* look for the image locally and never try to download it.

    **The Trap:** If you use an image tag of `:latest`, Kubernetes defaults to an `imagePullPolicy` of `Always`. This is why our initial attempts failed. Even though the `config-app:latest` image existed inside Minikube, the policy forced Kubernetes to ignore it and try (and fail) to download it from the internet.

    **The Fix:** By explicitly adding `imagePullPolicy: IfNotPresent` to the deployment manifest, we force Kubernetes to use the local image we built, which solves the problem. For local development, this is almost always the behavior you want.

---

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
    Make sure your `deployment-configmap.yaml` includes `imagePullPolicy: IfNotPresent`.
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
    (Ensure the `deployment-secret.yaml` also has the correct `imagePullPolicy`).
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
