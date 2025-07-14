This project demonstrates how a StatefulSet provides stable, unique network identifiers and stable, persistent storage to its Pods.

#### Step 1: Build the Docker Image

First, ensure your terminal is configured to use the Docker daemon inside Minikube.
```bash
eval $(minikube -p minikube docker-env)
```

1.  **Navigate to the project directory:**
    ```bash
    cd 06-advanced-workloads/statefulset-project
    ```

2.  **Build the image:**
    ```bash
    docker build -t stateful-app:latest .
    ```

#### Step 2: Deploy the Application

1.  **Apply the headless service and the StatefulSet:**
    ```bash
    kubectl apply -f headless-service.yaml
    kubectl apply -f statefulset.yaml
    ```

2.  **Verify the Pods are created:**
    It might take a minute for the Pods to be created, as the PersistentVolumes are being provisioned.
    ```bash
    kubectl get pods -l app=stateful-app -w
    ```
    You will see the pods being created one by one, from `stateful-app-0` to `stateful-app-2`. Wait for all 3 to be `Running`.

3.  **Check the PersistentVolumeClaims (PVCs):**
    ```bash
    kubectl get pvc
    ```
    You will see a PVC created for each Pod, e.g., `data-stateful-app-0`.

#### Step 3: Test the Stable Identity

1.  **Forward a local port to one of the pods (e.g., `stateful-app-0`):**
    ```bash
    kubectl port-forward stateful-app-0 8080:3000
    ```

2.  **In a new terminal, access the application:**
    ```bash
    curl localhost:8080
    ```
    The output will show the Pod's hostname (`stateful-app-0`) and that it has stored this hostname as its stable identity.

#### Step 4: Simulate a Pod Deletion

1.  **Delete one of the Pods:**
    ```bash
    kubectl delete pod stateful-app-0
    ```

2.  **Wait for the Pod to be recreated:**
    ```bash
    kubectl get pods -l app=stateful-app -w
    ```
    A new Pod named `stateful-app-0` will be created to replace the one you deleted. It has the same name and is attached to the same PersistentVolumeClaim.

3.  **Verify the identity is unchanged:**
    *   Forward the port again to the new `stateful-app-0` pod.
    *   Access it with `curl localhost:8080`.
    *   You will see that the `storedHostname` is still `stateful-app-0`, even though the current pod name might be different, proving that its storage and identity were persisted.
