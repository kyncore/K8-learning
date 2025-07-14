# Kubernetes Learning Path

Welcome to your personal Kubernetes learning journey! This repository is designed to guide you through the essential concepts of Kubernetes, from the ground up. Each module provides clear explanations and a hands-on project.

## Prerequisites & Setup (macOS)

For the best experience that closely mirrors a real-world production environment on macOS, we will use **Minikube with the QEMU driver and `socket_vmnet` for networking**. This provides a dedicated, high-performance virtual machine with robust networking capabilities.

### Step 1: Install Homebrew

If you don't have it already, install the Homebrew package manager.
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Step 2: Install Core Tools

Install the Kubernetes CLI (`kubectl`), Minikube, and the QEMU hypervisor.
```bash
brew install kubernetes-cli minikube qemu
```

### Step 3: Install and Start the Network Driver

The `minikube service` command requires a component called `socket_vmnet`.
```bash
# Install the component
brew install socket_vmnet

# Start the component as a privileged service (password required)
sudo brew services start socket_vmnet
```

### Step 4: Start Your Minikube Cluster

Start Minikube, telling it to use the QEMU driver and the `socket_vmnet` network. We also enable the Calico CNI for Network Policy support.
```bash
minikube start --driver=qemu --network=socket_vmnet --cni=calico
```
Your local Kubernetes cluster is now running correctly!

## A Note on Docker Images

For these tutorials, you need to build Docker images and make them available to your Minikube cluster. Instead of a slow `image load`, we will use a professional workflow that configures your Docker CLI to communicate directly with the Docker daemon *inside* the Minikube VM.

**Before building an image in any module, run this command:**
```bash
eval $(minikube -p minikube docker-env)
```
This points your terminal's Docker client to the Docker service inside Minikube. Now, any `docker build` command will build the image directly where Kubernetes can see it instantly.

When you are finished with a session, you can undo this with:
```bash
eval $(minikube -p minikube docker-env -u)

```
---

## Learning Modules

*   **Module 1: Core Concepts (Pods, Deployments, and Services)**
*   **Module 2: Configuration and Secrets**
*   **Module 3: Storage and Volumes**
*   **Module 4: Networking and Ingress**
*   **Module 5: Helm for Package Management**
*   **Module 6: Advanced Workloads**
*   **Module 7: Security**
*   **Module 8: Observability**
