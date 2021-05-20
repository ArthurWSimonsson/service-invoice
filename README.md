## Test environment
First the .env file needs to be set up. Follow the following template:

`DB_CONNECT =
   PORT = `


To run the service locally, only run ```npm start```


Using a program like Postman, use the following template as a request.

``` {
    "sendDate": 2012,
    "dueDate": 2013,
    "clientNr" : 3,
    "invoiceNr": 8,
    "total": 100000,
    "currency": "SEK",
    "payment": 50
} ```
