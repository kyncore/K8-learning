# Kubernetes Learning Path

Welcome to your personal Kubernetes learning journey! This repository is designed to guide you through the essential concepts of Kubernetes, from the ground up. Each module provides clear explanations and a hands-on project.

## Prerequisites & Setup (macOS)

For the best experience that closely mirrors a real-world production environment on macOS, we will use **Minikube with the QEMU driver**. This runs your cluster in a dedicated, high-performance virtual machine.

### Step 1: Install Homebrew

If you don't have it already, install the Homebrew package manager.
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Step 2: Install Tools (kubectl, Minikube, QEMU)

Install the Kubernetes CLI (`kubectl`), Minikube, and the QEMU hypervisor.
```bash
brew install kubernetes-cli minikube qemu
```

### Step 3: Start Your Minikube Cluster

Start Minikube using the `qemu` driver. We will also enable a CNI (Container Network Interface) plugin called Calico, which is required for the Network Policy module and is common in production environments.

```bash
# This command will configure and start your local Kubernetes cluster
minikube start --driver=qemu --network-plugin=cni --cni=calico
```
Your local Kubernetes cluster is now running!

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

This learning path is divided into a series of modules. It is recommended to follow them in order.

*   **Module 1: Core Concepts (Pods, Deployments, and Services)**
*   **Module 2: Configuration and Secrets**
*   **Module 3: Storage and Volumes**
*   **Module 4: Networking and Ingress**
*   **Module 5: Helm for Package Management**
*   **Module 6: Advanced Workloads**
*   **Module 7: Security**
*   **Module 8: Observability**

Let's get started!