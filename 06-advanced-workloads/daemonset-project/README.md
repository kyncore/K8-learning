### Project: DaemonSet

This project demonstrates how a DaemonSet ensures one Pod runs on every node in the cluster.

#### Step 1: Deploy the DaemonSet

1.  **Navigate to the project directory:**
    ```bash
    cd 06-advanced-workloads/daemonset-project
    ```

2.  **Apply the DaemonSet manifest:**
    ```bash
    kubectl apply -f daemonset.yaml
    ```

#### Step 2: Verify the DaemonSet

1.  **Check the DaemonSet status:**
    ```bash
    kubectl get daemonset
    ```
    You should see the `dummy-node-exporter` DaemonSet.

2.  **Check the Pods:**
    ```bash
    kubectl get pods -l app=dummy-node-exporter -o wide
    ```
    You will see that a Pod has been scheduled on every node in your cluster (for Minikube, this will likely be just one Pod on the `minikube` node). The `-o wide` flag shows which node the pod is running on.

#### Step 3: Clean Up

1.  **Delete the DaemonSet:**
    ```bash
    kubectl delete -f daemonset.yaml
    ```
