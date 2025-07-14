This project demonstrates how Kubernetes uses probes to manage application health and availability.

#### Step 1: Build the Docker Image

First, ensure your terminal is configured to use the Docker daemon inside Minikube.
```bash
eval $(minikube -p minikube docker-env)
```

1.  **Navigate to the project directory:**
    ```bash
    cd 08-observability/probes-project
    ```
2.  **Build the image:**
    ```bash
    docker build -t probes-app:latest .
    ```

#### Step 2: Deploy the Application and Observe Readiness

1.  **Apply the manifest:**
    ```bash
    kubectl apply -f deployment.yaml
    ```
2.  **Watch the Pod status:**
    ```bash
    kubectl get pod -w
    ```
    You will see the pod get created, but it will stay in the `0/1` READY state for about 15 seconds. You can also use `kubectl describe pod <pod-name>` and look at the Events section to see the Readiness probe failing. After 15 seconds, the readiness probe will succeed, and the pod will become `1/1` READY.

#### Step 3: Test the Liveness Probe

1.  **Once the pod is ready, get the service URL:**
    ```bash
    minikube service probes-app-service --url
    ```
2.  **In a new terminal, "break" the application by hitting the `/break` endpoint:**
    Use the URL from the previous command.
    ```bash
    curl <service-url>/break
    ```
    This will cause the `/healthz` endpoint to start returning a 500 error.

3.  **Watch the Pod status again:**
    In your other terminal, watch the pod status.
    ```bash
    kubectl get pod -w
    ```
    After a few failed liveness checks (based on the `periodSeconds`), Kubernetes will kill the pod and create a new one. You will see the pod's `RESTARTS` count go up.

#### Step 4: Clean Up
```bash
kubectl delete -f deployment.yaml
```
