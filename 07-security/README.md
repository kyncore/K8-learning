# Module 7: Security

Welcome to Module 7. Security is a critical aspect of any Kubernetes environment. This module covers two fundamental security mechanisms: Role-Based Access Control (RBAC) to control who can do what, and NetworkPolicies to control how pods communicate.

## Core Concepts

### 1. Role-Based Access Control (RBAC)

RBAC is a method of regulating access to computer or network resources based on the roles of individual users within an enterprise. In Kubernetes, RBAC allows you to specify which users, groups, or service accounts have access to which API resources.

There are four main objects in the RBAC API:
*   **Role:** A set of permissions within a specific namespace. For example, a "pod-reader" role might only have `get`, `watch`, and `list` permissions on `pods` resources within the `default` namespace.
*   **ClusterRole:** A `Role` that is not namespaced. The permissions apply across the entire cluster.
*   **RoleBinding:** Grants the permissions defined in a `Role` to a user, group, or `ServiceAccount` within that specific namespace.
*   **ClusterRoleBinding:** Grants the permissions defined in a `ClusterRole` to users, groups, or `ServiceAccounts` across the entire cluster.

Using RBAC is a security best practice, following the principle of least privilege.

### 2. NetworkPolicies

A **NetworkPolicy** is a specification of how groups of pods are allowed to communicate with each other and other network endpoints. `NetworkPolicy` resources use labels to select pods and define rules which specify what traffic is allowed to the selected pods.

By default, pods are non-isolated; they accept traffic from any source. Once a `NetworkPolicy` selects a pod, that pod becomes isolated and will reject any connections that are not allowed by any `NetworkPolicy`.

To use NetworkPolicies, you must be using a networking solution which supports them, such as Calico, Cilium, or Weave Net. Minikube's default networking driver does not support them, so you will need to start Minikube with a different driver.

## Projects

This module contains two projects to illustrate these security concepts:
*   **RBAC Project:** Create a restricted `ServiceAccount` that can only read pods in a specific namespace.
*   **Network Policy Project:** Deploy frontend and backend services and use a `NetworkPolicy` to restrict traffic flow between them.
