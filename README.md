
# HOW TO SET UP TEST ENVIRONMENT

To set up the test environment, run the following  command, `kubectl apply -f kube`. First, please add an environment variable to each service with the correct database url called DB_CONNECT. It should use a MongoDB database hosted on Atlas. The idea is that each service has its own database.
