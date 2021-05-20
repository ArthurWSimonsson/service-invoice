## Test environment
First the .env file needs to be set up. Follow the following template:

```
DB_CONNECT =
PORT = 
TRANSACTION_URL = 
CLIENT_URL = 
```
Where DB_CONNECT is a mongoDB database accessed through mongoose.<br/>
PORT is which port the server is listening on.<br/>
The remaining two are for the other services in the chain, <br/>
an example would be: ```TRANSACTION_URL = http://localhost:3004/api/transaction/```

To run the service locally, only run ```npm start```


Using a program like Postman, use the following template as a request.

``` 
{
    "sendDate":  "2021-01-01",
    "dueDate": "2021-02-01",
    "clientNr" : 3,
    "invoiceNr": 8,
    "total": 100000,
    "currency": "SEK",
    "payment": 50
} 
```
For the chain to work without errors the other services needs to be set up. These are: <br/>
https://github.com/ArthurWSimonsson/service-client  <br/>
https://github.com/ArthurWSimonsson/service-tag  <br/>
https://github.com/ArthurWSimonsson/service-transaction  <br/>

## Purpose
This chain serves as an example of a flow of where to apply the Saga-pattern.
## Kubernetes
In the kube folder there are examples of how to construct the correct .yaml files for the entire chain. Create docker images of the services and push to them to your repository and change the corresponding parts in the .yaml file.
