# Module 5: Helm for Package Management

This module introduces Helm, the package manager for Kubernetes.

## Core Concepts

### 1. Helm

Helm is a tool that streamlines installing and managing Kubernetes applications. Think of it like `apt`, `yum`, or `homebrew` for Kubernetes.

### 2. Charts

Helm uses a packaging format called **charts**. A chart is a collection of files that describe a related set of Kubernetes resources. A single chart might be used to deploy something simple, like a memcached pod, or something complex, like a full web app stack with HTTP servers, databases, caches, and so on.

### 3. Releases

A **Release** is an instance of a chart running in a Kubernetes cluster. One chart can often be installed many times into the same cluster. And each time it is installed, a new release is created.

## Project: Deploying with Helm

This project demonstrates how to use Helm to package and deploy the "Hello, World" application from Module 1.

### Step 1: Ensure the Image is Available

This Helm chart deploys the `hello-world:latest` image. Make sure you have built this image by following the instructions in Module 1, using the `eval $(minikube docker-env)` command.

### Step 2: Package and Deploy with Helm

1.  **Navigate to the chart directory:**
    ```bash
    cd 05-helm-for-package-management/helm-chart
    ```

2.  **Install the chart:**
    You can install the chart directly without packaging it first. Helm will create a release named `my-release`.
    ```bash
    helm install my-release .
    ```

3.  **Check the status of the release:**
    ```bash
    helm status my-release
    ```

### Step 3: Access the Application

1.  **Get the Service URL and open it:**
    ```bash
    minikube service my-release-service
    ```
    You should see "Hello, World!".

### Step 4: Upgrade the Release

Now, let's upgrade the release to increase the number of replicas.

1.  **Upgrade the release:**
    The `--set` flag allows you to override values from `values.yaml`.
    ```bash
    helm upgrade my-release . --set replicaCount=3
    ```

2.  **Check the number of Pods:**
    ```bash
    kubectl get pods -l app.kubernetes.io/instance=my-release
    ```
    You should now see three Pods running.

### Step 5: Uninstall the Release

To clean up, you can uninstall the release.
```bash
helm uninstall my-release
```

This module has introduced you to Helm, a powerful tool for managing Kubernetes applications. You have learned how to create a chart, and use it to deploy, upgrade, and uninstall an application.
