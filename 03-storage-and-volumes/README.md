# Module 3: Storage and Volumes

This module covers how to manage persistent storage in Kubernetes.

## Core Concepts

### 1. Volumes

A **Volume** is a directory, possibly with some data in it, which is accessible to the Containers in a Pod. A Kubernetes volume has a defined lifetime, the same as the Pod that encloses it. Consequently, a volume outlives any Containers that run within the Pod, and data is preserved across Container restarts.

### 2. PersistentVolumes (PV)

A **PersistentVolume (PV)** is a piece of storage in the cluster. In this tutorial, we use a `hostPath` PV, which is a simple file/directory on your local machine's filesystem. This is great for single-node testing with Minikube.

*Note: In a real-world cloud environment (like AWS or GCP), you would use a different type of PV, like `awsElasticBlockStore` or `gcePersistentDisk`, which provision network-attached storage.*

### 3. PersistentVolumeClaims (PVC)

A **PersistentVolumeClaim (PVC)** is a request for storage by a user. It's how a Pod requests a PV. The PVC "claims" a PV for the Pod to use.

## Project: Stateful Web Server

This project demonstrates how to use PVs and PVCs to provide persistent storage to a web server.

### Step 1: Build the Docker Image

First, ensure your terminal is configured to use the Docker daemon inside Minikube.
```bash
eval $(minikube -p minikube docker-env)
```

1.  **Navigate to the project directory:**
    ```bash
    cd /Users/kyawyenaing/Klab/kubernetes-learning-path/03-storage-and-volumes/storage-app
    ```

2.  **Build the image:**
    ```bash
    docker build -t storage-app:latest .
    ```

### Step 2: Deploy the Application

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

### Step 3: Access the Application

1.  **Get the Service URL and open it:**
    ```bash
    minikube service storage-app-service
    ```
    You should see "Last timestamp: No timestamp saved yet.".

2.  **Save a timestamp:**
    In a new terminal, use `curl` to POST to the service.
    ```bash
    # Get the URL from the 'minikube service' command if you closed it
    SERVICE_URL=$(minikube service storage-app-service --url)
    curl -X POST $SERVICE_URL
    ```

3.  **Refresh your browser.** You should now see the timestamp you just saved.

### Step 4: Simulate a Pod Crash

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

3.  **Refresh your browser.** You should see the same timestamp as before, demonstrating that the data has been persisted in the `hostPath` volume.

This module has taught you how to manage storage in a way that is independent of the Pod lifecycle, a critical skill for running stateful applications in Kubernetes.
