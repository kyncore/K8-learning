This project provides a basic introduction to monitoring a Kubernetes application with Prometheus.

#### Step 1: Build the Docker Image

First, ensure your terminal is configured to use the Docker daemon inside Minikube.
```bash
eval $(minikube -p minikube docker-env)
```

1.  **Navigate to the project directory:**
    ```bash
    cd /Users/kyawyenaing/Klab/kubernetes-learning-path/08-observability/monitoring-project
    ```
2.  **Build the image:**
    ```bash
    docker build -t monitoring-app:latest .
    ```

#### Step 2: Deploy Prometheus and the Application

1.  **Apply the Prometheus manifests:**
    ```bash
    kubectl apply -f prometheus.yaml
    ```
2.  **Apply the application manifest:**
    ```bash
    kubectl apply -f app-deployment.yaml
    ```
3.  **Verify everything is running:**
    ```bash
    kubectl get pods
    ```
    You should see pods for `monitoring-app-deployment` and `prometheus-deployment`.

#### Step 3: Access Prometheus and View Metrics

1.  **Open the Prometheus UI in your browser:**
    Minikube makes this easy. The service is of type `NodePort`, exposed on port `30090`.
    ```bash
    minikube service prometheus-service
    ```
    This will open the Prometheus dashboard in your browser.

2.  **Check the scrape targets:**
    In the Prometheus UI, navigate to **Status -> Targets**. You should see your `monitoring-app` pod listed as a target, and its state should be `UP`. It may take a minute for Prometheus to discover and scrape the target.

3.  **Generate some traffic for the app:**
    Let's get the URL for our monitoring app and send some requests to it.
    ```bash
    APP_URL=$(minikube service monitoring-app-service --url)
    curl $APP_URL
    curl $APP_URL
    curl $APP_URL
    ```

4.  **Query your metrics in Prometheus:**
    *   Go back to the Prometheus UI.
    *   In the expression bar, type `http_requests_total` and click **Execute**.
    *   You will see the counter metric, showing the requests you just made.
    *   Try another query to see one of the default metrics: `process_cpu_seconds_total{serviceName="monitoring-app"}`

#### Step 4: Clean Up
```bash
kubectl delete -f app-deployment.yaml
kubectl delete -f prometheus.yaml
```
