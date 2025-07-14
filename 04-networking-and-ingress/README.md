# Module 4: Networking and Ingress

This module introduces advanced networking concepts in Kubernetes, focusing on how to expose your applications to the outside world in a powerful and flexible way.

## Core Concepts Explained

### The Problem: How Do We Manage External Access?

In Module 1, we used a `Service` of `type: NodePort` to expose our application. This worked, but it has major limitations in the real world:
*   You have to use a high, ugly port number (e.g., `31109`). You can't use standard ports `80` (for HTTP) or `443` (for HTTPS).
*   You get a separate IP and Port for every service you want to expose, which becomes unmanageable.
*   It doesn't handle routing based on the URL path (e.g., `/api` goes to one service, `/ui` goes to another).

We need a smarter way to manage incoming traffic.

### The Solution: Ingress and the Ingress Controller

Kubernetes solves this with two components that work together:

**1. The Ingress Resource (`ingress.yaml`)**
*   **What it is:** An `Ingress` is a Kubernetes resource that acts as a **set of routing rules**. It's a configuration file where you define *how* you want external traffic to be directed to services inside your cluster.
*   **What it does:** You create rules based on the requested hostname or URL path. For example, you can say:
    *   "When a request comes in for `my-app.com/api`, send it to the `backend-api-service`."
    *   "When a request comes in for `my-app.com/ui`, send it to the `frontend-web-service`."
*   **Its Limitation:** Creating an Ingress resource by itself does nothing. It's just a set of rules. You need something in the cluster that can read these rules and actually *act* on them.

**2. The Ingress Controller**
*   **What it is:** The **Ingress Controller** is the actual engine that makes the Ingress rules work. It's a specialized, powerful web server (usually NGINX, Traefik, or HAProxy) that runs in a Pod inside your cluster.
*   **What it does:**
    1.  It constantly watches the Kubernetes API for any `Ingress` resources.
    2.  When it sees one, it reads the rules you defined.
    3.  It automatically reconfigures itself based on those rules.
    4.  It exposes itself to the outside world (e.g., on your Minikube IP at ports 80 and 443).
*   **How it works:** When you ran `minikube addons enable ingress`, Minikube installed an NGINX Ingress Controller for you. This is the Pod we saw running in the `ingress-nginx` namespace.

### How They Work Together (This Project's Idea)

The goal of this project is to demonstrate **path-based routing**. We want a single entry point (the Minikube IP address) to intelligently route traffic to two different applications based on the URL.

1.  We create two different applications (`app1` and `app2`), each with its own Deployment and internal Service.
2.  We enable the **Ingress Controller** (`minikube addons enable ingress`), which acts as the traffic cop for our cluster, listening on the main Minikube IP.
3.  We create an **Ingress Resource** (`ingress.yaml`) with the following rules:
    *   If a request arrives for `/app1`, route it to `app1-service`.
    *   If a request arrives for `/app2`, route it to `app2-service`.
4.  The Ingress Controller sees these rules, configures itself, and handles the rest.

This setup is far more powerful and realistic than using `NodePort` for every service.

---

## Project: Path-Based Routing with Ingress

### Step 1: Enable the Ingress Controller

In Minikube, you must enable the Ingress controller addon. This will deploy an NGINX Ingress Controller for you.
```bash
minikube addons enable ingress
```
You can verify it's running with `kubectl get pods -n ingress-nginx`.

### Step 2: Build the Docker Images

First, ensure your terminal is configured to use the Docker daemon inside Minikube.
```bash
eval $(minikube -p minikube docker-env)
```

1.  **Navigate to the project directory:**
    ```bash
    cd /Users/kyawyenaing/Klab/kubernetes-learning-path/04-networking-and-ingress/ingress-app
    ```

2.  **Build the images:**
    ```bash
    docker build -t app1:latest -f Dockerfile.app1 .
    docker build -t app2:latest -f Dockerfile.app2 .
    ```

### Step 3: Deploy the Applications

1.  **Deploy the applications and their internal services:**
    ```bash
    kubectl apply -f deployment-app1.yaml
    kubectl apply -f service-app1.yaml
    kubectl apply -f deployment-app2.yaml
    kubectl apply -f service-app2.yaml
    ```

2.  **Deploy the Ingress Resource:**
    This applies the routing rules.
    ```bash
    kubectl apply -f ingress.yaml
    ```

### Step 4: Access the Applications

1.  **Get the Minikube IP address:**
    This is the single IP address that the Ingress controller is listening on.
    ```bash
    minikube ip
    ```

2.  **Access App 1:**
    Open `http://<minikube-ip>/app1` in your browser (replace `<minikube-ip>` with the actual IP). The Ingress Controller will route this to `app1-service`.

3.  **Access App 2:**
    Open `http://<minikube-ip>/app2` in your browser. The Ingress Controller will route this to `app2-service`.
