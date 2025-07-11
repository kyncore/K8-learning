# Module 6: Advanced Workloads

Welcome to Module 6. Here, we will explore specialized workload types in Kubernetes for handling stateful applications, node-level tasks, and batch jobs.

## Core Concepts

### 1. StatefulSets

A **StatefulSet** is the workload API object used to manage stateful applications. It manages the deployment and scaling of a set of Pods, *and provides guarantees about the ordering and uniqueness* of these Pods. Unlike a Deployment, a StatefulSet maintains a sticky identity for each of their Pods. These pods are created from the same spec, but are not interchangeable: each has a persistent identifier that it maintains across any rescheduling.

This is crucial for applications that need stable network identifiers and persistent storage, such as databases (e.g., MySQL, PostgreSQL).

### 2. DaemonSets

A **DaemonSet** ensures that all (or some) Nodes run a copy of a Pod. As nodes are added to the cluster, Pods are added to them. As nodes are removed from the cluster, those Pods are garbage collected. Deleting a DaemonSet will clean up the Pods it created.

Some typical uses of a DaemonSet are:
*   Running a cluster storage daemon on every node.
*   Running a logs collection daemon on every node.
*   Running a node monitoring daemon on every node.

### 3. Jobs

A **Job** creates one or more Pods and will continue to retry execution of the Pods until a specified number of them successfully terminate. As pods successfully complete, the Job tracks the successful completions. When a specified number of successful completions is reached, the task (ie, Job) is complete. Deleting a Job will clean up the Pods it created.

This is perfect for one-off tasks like database migrations or batch processing.

### 4. CronJobs

A **CronJob** creates Jobs on a repeating schedule. One CronJob object is like one line of a *crontab* (cron table) file. It runs a job periodically on a given schedule, written in [Cron](https://en.wikipedia.org/wiki/Cron) format.

This is ideal for periodic tasks like backups, report generation, or sending emails.

## Projects

This module contains three separate mini-projects to illustrate each concept:
*   **StatefulSet Project:** Deploy a simple stateful application that maintains a unique identity and storage.
*   **DaemonSet Project:** Deploy a "dummy" node-exporter Pod to every node in your cluster.
*   **Job & CronJob Project:** Run a one-off task and then schedule it to run periodically.
