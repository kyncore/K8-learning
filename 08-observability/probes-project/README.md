### Project: Liveness and Readiness Probes

This project demonstrates how Kubernetes uses probes to manage application health and availability.

#### Step 1: Build and Load the Docker Image

1.  **Navigate to the project directory:**
    ```bash
    cd /Users/kyawyenaing/Klab/kubernetes-learning-path/08-observability/probes-project
    ```
2.  **Build the image:**
    ```bash
    docker build -t probes-app:latest .
    ```
3.  **Load the image into Minikube:**
    ```bash
    minikube image load probes-app:latest
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

1.  **Once the pod is ready, forward a port to the service:**
    ```bash
    kubectl port-forward svc/probes-app-service 8080:80
    ```
2.  **In a new terminal, "break" the application by hitting the `/break` endpoint:**
    ```bash
    curl localhost:8080/break
    ```
    This will cause the `/healthz` endpoint to start returning a 500 error.

3.  **Watch the Pod status again:**
    ```bash
    kubectl get pod -w
    ```
    After a few failed liveness checks (based on the `periodSeconds`), Kubernetes will kill the pod and create a new one. You will see the pod's `RESTARTS` count go up.

#### Step 4: Clean Up
```bash
kubectl delete -f deployment.yaml
```
