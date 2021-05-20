## Test environment
First the .env file needs to be set up. Follow the following template:

```
DB_CONNECT =
PORT = 
```
Where DB_CONNECT is a mongoDB database accessed through mongoose.
PORT is which port the server is listening on.

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
