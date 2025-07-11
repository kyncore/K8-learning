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

### Step 1: Install Helm

If you don't have Helm installed, you can find the installation instructions [here](https://helm.sh/docs/intro/install/).

### Step 2: Package the Application

1.  **Navigate to the chart directory:**
    ```bash
    cd kubernetes-learning-path/05-helm-for-package-management/helm-chart
    ```

2.  **Package the chart:**
    ```bash
    helm package .
    ```
    This will create a `my-chart-0.1.0.tgz` file.

### Step 3: Deploy the Application

1.  **Install the chart:**
    ```bash
    helm install my-release my-chart-0.1.0.tgz
    ```
    This will create a new release named `my-release`.

2.  **Check the status of the release:**
    ```bash
    helm status my-release
    ```

### Step 4: Access the Application

1.  **Get the Service URL:**
    ```bash
    minikube service my-release-service --url
    ```

2.  **Open the URL in your browser.** You should see "Hello, World!".

### Step 5: Upgrade the Release

Now, let's upgrade the release to increase the number of replicas.

1.  **Upgrade the release:**
    ```bash
    helm upgrade my-release my-chart-0.1.0.tgz --set replicaCount=3
    ```

2.  **Check the number of Pods:**
    ```bash
    kubectl get pods -l app=my-release
    ```
    You should now see three Pods running.

### Step 6: Uninstall the Release

To clean up, you can uninstall the release.

```bash
helm uninstall my-release
```

This module has introduced you to Helm, a powerful tool for managing Kubernetes applications. You have learned how to create a chart, package it, and use it to deploy, upgrade, and uninstall an application.
