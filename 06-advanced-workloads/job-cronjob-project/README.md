### Project: Job & CronJob

This project demonstrates how to run finite tasks with Jobs and scheduled tasks with CronJobs.

#### Part 1: The Job

A Job is used for a one-off task. We will create a Job that calculates Pi to 2000 places and prints it.

1.  **Navigate to the project directory:**
    ```bash
    cd kubernetes-learning-path/06-advanced-workloads/job-cronjob-project
    ```

2.  **Apply the Job manifest:**
    ```bash
    kubectl apply -f job.yaml
    ```

3.  **Watch the Pods:**
    ```bash
    kubectl get pods -w
    ```
    You will see a `pi-calculator` pod get created, run to completion, and then the status will change to `Completed`.

4.  **Check the logs of the completed Pod:**
    First, get the full pod name:
    ```bash
    kubectl get pods
    ```
    Then, view its logs (replace `<pod-name>` with the name from the previous command):
    ```bash
    kubectl logs <pod-name>
    ```
    You will see the value of Pi!

5.  **Clean up the Job:**
    ```bash
    kubectl delete job pi-calculator
    ```

#### Part 2: The CronJob

A CronJob is used for repeating tasks. We will create a CronJob that prints a message every minute.

1.  **Apply the CronJob manifest:**
    ```bash
    kubectl apply -f cronjob.yaml
    ```

2.  **Verify the CronJob:**
    ```bash
    kubectl get cronjob
    ```
    You should see the `repeating-hello` CronJob scheduled.

3.  **Watch for Jobs to be created:**
    Over the next few minutes, you can watch as the CronJob creates new Jobs, which in turn create Pods.
    ```bash
    kubectl get jobs --watch
    ```
    Every minute, you will see a new job appear, like `repeating-hello-1678886400`.

4.  **Check the logs of a recent job's pod:**
    Get the pod name for a recent job and check its logs as you did for the `pi-calculator` job. You will see the "Hello from the CronJob!" message.

5.  **Clean up the CronJob:**
    Deleting the CronJob will also delete the Jobs it created.
    ```bash
    kubectl delete cronjob repeating-hello
    ```
