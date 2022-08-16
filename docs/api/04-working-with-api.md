# Working with the API

## General provisions

Work with the API is supported by https protocol using `GET` or `POST` requests (there are different request types for different APIs). Thus, it is possible for you to send data to the server in one of the following ways:

- in the address bar as one of the URL components;
- as a `GET` parameter (`/url/param1` or `/url/?param1=123`). 

If the API is accessed using the `POST` request method, then the data is encoded into `*.json` format and placed in the request body. 

You can combine the both transfer methods. For different API data is transmitted in different ways, and for each specific endpoint information on how to pass arguments will be given.

The result of the query is always placed in the body of the response from the server in json format. There are several mandatory fields that will always be present in the response when it comes to certain situations.

| Field      | Purpose                                                                                                                                                                                                                                                                             |
| :--------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ok         | Boolean type. The field is always present in the response. If the query is correctly executed, it will be true. If an error occurred as a result of the query execution, then the value of this field will be false. Use this field in order to determine the success of the query. |
| code       | Integer type. The field is present in the response when the request is executed with an error and contains an error code. Code 1 means generic error and can also appear for errors, different in their nature. The remaining codes are unique for specific types of errors.        |
| msg        | String type. The field is shown in the response if the query is executed with an error. It contains a text message (in English) about the error. This message usually can be shown to the user for failed requests.                                                                 |
| address    | String type. The field can be present in some responses with information on wallet address in the binary representation in the form of hex.                                                                                                                                         |
| txtaddress | String type. The field can be present in some replies, containing an address in the textual format.                                                                                                                                                                                 |
