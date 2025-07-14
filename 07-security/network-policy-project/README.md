This project demonstrates how to use a NetworkPolicy to restrict traffic between pods.

**IMPORTANT:** This project requires a CNI (Container Network Interface) plugin that supports NetworkPolicies. If you followed the main `README.md` for this learning path, you started Minikube with the `--cni=calico` flag, so you are all set.

#### Step 1: Build the Docker Image

First, ensure your terminal is configured to use the Docker daemon inside Minikube.
```bash
eval $(minikube -p minikube docker-env)
```

1.  **Navigate to the project directory:**
    ```bash
    cd /Users/kyawyenaing/Klab/kubernetes-learning-path/07-security/network-policy-project
    ```
2.  **Build the image:**
    ```bash
    docker build -t backend-api:latest -f Dockerfile.backend .
    ```

#### Step 2: Deploy the Application

1.  **Apply the manifests:**
    ```bash
    kubectl apply -f namespace.yaml
    kubectl apply -f backend.yaml
    kubectl apply -f frontend-pod.yaml
    ```
2.  **Wait for the pods to be running:**
    ```bash
    kubectl get pods -n network-policy-demo -w
    ```

#### Step 3: Test Connectivity (Before Policy)

1.  **Exec into the frontend pod:**
    ```bash
    kubectl exec -it frontend-tester -n network-policy-demo -- /bin/sh
    ```
2.  **From inside the pod, try to connect to the backend service.** It should succeed.
    ```sh
    # First, install curl
    apk add --no-cache curl

    # Now, curl the backend service. The service name resolves to the correct IP.
    curl http://backend-api-service/api/users
    # You should see the JSON user data.
    # Exit the pod
    exit
    ```

#### Step 4: Apply the NetworkPolicy

1.  **Apply the policy manifest:**
    ```bash
    kubectl apply -f network-policy.yaml
    ```

#### Step 5: Test Connectivity (After Policy)

1.  **Exec into the frontend pod again:**
    ```bash
    kubectl exec -it frontend-tester -n network-policy-demo -- /bin/sh
    ```
2.  **Try to connect to the backend service.** It should still succeed, because the policy explicitly allows traffic from pods with the `app: frontend` label.
    ```sh
    curl http://backend-api-service/api/users
    # This should still work.
    ```
3.  **Now, let's test from a pod *without* the correct label.**
    We can do this by running a temporary pod.
    ```sh
    # Exit the frontend-tester pod
    exit

    # Run a temporary pod without the 'app: frontend' label
    kubectl run tmp-tester -n network-policy-demo --image=busybox --rm -it -- /bin/sh

    # Inside the new pod, install curl and try to connect.
    apk add --no-cache curl
    curl -m 5 http://backend-api-service/api/users
    # This command will hang for 5 seconds and then time out, because the NetworkPolicy is blocking the connection.
    ```

#### Step 6: Clean Up
```bash
kubectl delete namespace network-policy-demo
```
