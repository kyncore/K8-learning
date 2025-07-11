### Project: Role-Based Access Control (RBAC)

This project demonstrates how to create a user (represented by a ServiceAccount) with restricted permissions.

#### Step 1: Create the RBAC Resources

1.  **Navigate to the project directory:**
    ```bash
    cd kubernetes-learning-path/07-security/rbac-project
    ```

2.  **Apply the manifests:**
    ```bash
    kubectl apply -f namespace.yaml
    kubectl apply -f role.yaml
    kubectl apply -f serviceaccount.yaml
    kubectl apply -f rolebinding.yaml
    ```

#### Step 2: Test the Permissions

We will use the `--as` flag with `kubectl` to impersonate our new `restricted-user` ServiceAccount.

1.  **Verify that the user CAN list pods in the `restricted-ns` namespace:**
    ```bash
    kubectl auth can-i list pods --as=system:serviceaccount:restricted-ns:restricted-user --namespace=restricted-ns
    ```
    This should return `yes`.

2.  **Verify that the user CANNOT list deployments in the `restricted-ns` namespace:**
    ```bash
    kubectl auth can-i list deployments --as=system:serviceaccount:restricted-ns:restricted-user --namespace=restricted-ns
    ```
    This should return `no`.

3.  **Verify that the user CANNOT list pods in the `default` namespace:**
    ```bash
    kubectl auth can-i list pods --as=system:serviceaccount:restricted-ns:restricted-user --namespace=default
    ```
    This should return `no`, because the Role and RoleBinding are specific to `restricted-ns`.

#### Step 3: Clean Up

1.  **Delete the namespace. This will also delete the Role, ServiceAccount, and RoleBinding within it.**
    ```bash
    kubectl delete namespace restricted-ns
    ```
