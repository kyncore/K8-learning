# Module 8: Observability

Welcome to the final module in this learning path. Observability is the practice of instrumenting your applications to provide actionable data, allowing you to understand their internal state and performance. In Kubernetes, this primarily involves logging, monitoring, and health checks.

## Core Concepts

### 1. Logging

Logging is fundamental to debugging. In Kubernetes, the standard practice is for applications to write their logs to standard output (`stdout`) and standard error (`stderr`). The container engine redirects these streams to a logging driver. You can then access these logs using the `kubectl logs` command. For production environments, logs are typically collected by a cluster-level logging agent (like Fluentd or Logstash) and shipped to a centralized logging backend (like Elasticsearch or Splunk).

### 2. Liveness and Readiness Probes

Kubernetes uses probes to determine the health of a container.
*   **Liveness Probe:** This probe checks if a container is still running. If the liveness probe fails, the kubelet kills the container, and the container is subjected to its restart policy. If a container doesn't have a liveness probe, the kubelet assumes it's healthy as long as the main process is running.
*   **Readiness Probe:** This probe checks if a container is ready to start accepting traffic. If the readiness probe fails, the container's IP address is removed from the endpoints of all Services. This is useful for applications that need time to warm up before they can serve requests.
*   **Startup Probe:** This probe checks if an application within a container is started. All other probes are disabled if a startup probe is provided, until it succeeds. This is useful for slow-starting containers, preventing them from being killed by the liveness probe before they are up and running.

### 3. Monitoring

Monitoring involves collecting and analyzing metrics from your applications and infrastructure to gain insights into performance and behavior. The de facto standard for monitoring in the cloud-native ecosystem is **Prometheus**, an open-source systems monitoring and alerting toolkit. Applications expose metrics via an HTTP endpoint, and a Prometheus server scrapes these endpoints periodically, storing the data and allowing for powerful queries and visualization.

## Projects

This module contains two projects to illustrate these observability concepts:
*   **Probes Project:** Deploy an application with liveness and readiness probes and see how Kubernetes reacts when the application becomes unhealthy or not ready.
*   **Monitoring Project:** Deploy a simple Prometheus server and a sample application that exposes custom metrics, then learn to scrape and view those metrics.
