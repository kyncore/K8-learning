# Module 1: Core Concepts (Pods, Deployments, and Services)

Welcome to the first module! Here, we'll explore the three most fundamental building blocks of any Kubernetes application.

## Core Concepts Explained

### 1. Pods: The Smallest Unit

Think of a **Pod** as the smallest, most basic deployable object in Kubernetes.
*   **What it is:** A Pod is a wrapper around one or more running containers (in our case, just one Node.js container).
*   **What it has:** Each Pod gets its own private IP address within the cluster, and its own set of resources (CPU, memory).
*   **Its Weakness:** Pods are "mortal". If a Pod crashes or the node it's on fails, the Pod is gone forever. You would never deploy a single Pod by itself in production.

### 2. Deployments: The Self-Healing Manager

This is where the `deployment.yaml` file comes in. A **Deployment** is a controller or a "manager" that ensures your application is always running as you intend. It brings intelligence and self-healing to your Pods.

*   **What it does:** Its primary job is to maintain a **desired state**. You tell the Deployment you want "2 replicas" (copies) of your application running, and the Deployment's job is to make sure that's always the case.
*   **How it works:**
    1.  **Pod Blueprint:** The `template` section in your `deployment.yaml` is a blueprint for the Pods it will create. It defines everything about the Pod: the containers to run, the Docker image to use (`my-hello-app:latest`), and the container port (`3000`).
    2.  **Labeling:** The Deployment creates Pods and gives them a label (in our case, `app: hello-world`). This is like putting a name tag on them.
    3.  **Self-Healing:** The Deployment constantly watches for Pods with that label. If it sees only 1 Pod, but the desired state is 2, it will automatically create a new one. If a Pod crashes, the Deployment sees it's missing and creates a replacement. This is the magic of Kubernetes.
    4.  **Rolling Updates:** When you want to update your application (e.g., with a new Docker image), you update the `template` in your Deployment file. The Deployment will then perform a safe "rolling update": it will create a new Pod with the new version, wait for it to be ready, then terminate an old Pod, repeating the process until all Pods are updated with zero downtime.

In short, the **Deployment** is your primary tool for putting applications on Kubernetes. You tell it *what* to run and *how many*, and it handles the rest.

### 3. Services: The Stable Network Endpoint

Now we know Deployments manage Pods, but Pods can be created and destroyed at any time. Each time a new Pod is created, it gets a new private IP address. So how can other parts of your application (or the outside world) reliably connect to them?

This is the problem the **Service** solves.

*   **What it does:** A Service provides a single, stable network endpoint (a single IP address and DNS name) for a group of Pods.
*   **How it works:**
    1.  **Label Matching:** The `selector` in your `service.yaml` (`selector: app: hello-world`) tells the Service to constantly look for all Pods with that label.
    2.  **Load Balancing:** If it finds multiple Pods (like the 2 created by our Deployment), it will automatically distribute incoming traffic among them.
    3.  **Stable Address:** The Service itself gets an IP address that does *not* change. Other Pods in the cluster can always reach your application by using the Service's name (`hello-world-service`).
    4.  **External Exposure:** By setting `type: NodePort`, the Service also exposes itself on a high-numbered port on the cluster nodes, which is what allows external traffic to get in.

## How They Work Together: A Summary

1.  You create a **Deployment** to define your application's desired state (e.g., "I want 2 replicas of the `my-hello-app` image running").
2.  The **Deployment** creates and manages **Pods** based on its template, ensuring the correct number are always running and healthy.
3.  You create a **Service** to provide a stable network entry point for those Pods, so they can be accessed reliably, both internally and externally.

---

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
    cd 01-core-concepts/hello-world-app
    ```

2.  **Build the image:**
    Because you ran the `eval` command, this image is built directly inside the Minikube environment.
    ```bash
    docker build -t my-hello-app:latest .
    ```

### Step 2: Deploy the Application to Kubernetes

Now, you'll apply the `deployment.yaml` and `service.yaml` files to create the Deployment and Service in your cluster.

1.  **Apply the Deployment:**
    ```bash
    kubectl apply -f deployment.yaml
    ```
    *Note: The `deployment.yaml` uses `imagePullPolicy: IfNotPresent`. This is important. It tells Kubernetes to look for the image locally first before trying to pull from a remote registry.*

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
