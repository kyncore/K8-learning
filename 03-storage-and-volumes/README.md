# Module 3: Storage and Volumes

This module covers how to manage persistent storage in Kubernetes.

## Core Concepts

### 1. Volumes

A **Volume** is a directory, possibly with some data in it, which is accessible to the Containers in a Pod. A Kubernetes volume has a defined lifetime, the same as the Pod that encloses it. Consequently, a volume outlives any Containers that run within the Pod, and data is preserved across Container restarts.

### 2. PersistentVolumes (PV)

A **PersistentVolume (PV)** is a piece of storage in the cluster that has been provisioned by an administrator or dynamically provisioned using Storage Classes. It is a resource in the cluster just like a node is a cluster resource. PVs are volume plugins like Volumes, but have a lifecycle independent of any individual Pod that uses the PV.

### 3. PersistentVolumeClaims (PVC)

A **PersistentVolumeClaim (PVC)** is a request for storage by a user. It is similar to a Pod. Pods consume node resources and PVCs consume PV resources. Pods can request specific levels of resources (CPU and Memory). Claims can request specific size and access modes (e.g., they can be mounted once read/write or many times read-only).

## Project: Stateful Web Server

This project demonstrates how to use PersistentVolumes and PersistentVolumeClaims to provide persistent storage to a web server.

### Step 1: Build the Docker Image

1.  **Navigate to the project directory:**
    ```bash
    cd kubernetes-learning-path/03-storage-and-volumes/storage-app
    ```

2.  **Build the image:**
    ```bash
    docker build -t storage-app:latest .
    ```

### Step 2: Load the Image into Minikube

```bash
minikube image load storage-app:latest
```

### Step 3: Deploy the Application

1.  **Create the PersistentVolume and PersistentVolumeClaim:**
    ```bash
    kubectl apply -f persistentvolume.yaml
    kubectl apply -f persistentvolumeclaim.yaml
    ```

2.  **Deploy the application:**
    ```bash
    kubectl apply -f deployment.yaml
    ```

3.  **Create the Service:**
    ```bash
    kubectl apply -f service.yaml
    ```

### Step 4: Access the Application

1.  **Get the Service URL:**
    ```bash
    minikube service storage-app-service --url
    ```

2.  **Open the URL in your browser.** You should see "Last timestamp: No timestamp saved yet.".

3.  **Save a timestamp:**
    ```bash
    curl -X POST <service-url>
    ```
    Replace `<service-url>` with the URL from the previous step.

4.  **Refresh your browser.** You should now see the timestamp you just saved.

### Step 5: Simulate a Pod Crash

Now, let's see what happens when the Pod crashes and is recreated.

1.  **Delete the Pod:**
    ```bash
    kubectl delete pods -l app=storage-app
    ```

2.  **Wait for the Pod to be recreated:**
    ```bash
    kubectl get pods -l app=storage-app -w
    ```
    Wait until the new Pod is in the `Running` state.

3.  **Refresh your browser.** You should see the same timestamp as before, demonstrating that the data has been persisted.

This module has taught you how to manage storage in a way that is independent of the Pod lifecycle, a critical skill for running stateful applications in Kubernetes.
