# Working with the API

Work with the API is supported by https protocol using `GET` or `POST` requests (there are different request types for different APIs). Thus, it is possible for you to send data to the server in one of the following ways:

- as a URL component in the address bar;
- as a `GET` parameter (`/url/param1` or `/url/?param1=123`). 

If the API is accessed using the `POST` request method, then the data is encoded into `*.json` format and placed in the request body. 

You can combine the both transfer methods. For different API data is transmitted in different ways, and for each specific endpoint information on how to pass arguments will be given.

The result of a query is always placed in the server response body in `*.json` format. There are several mandatory fields that will always be present in the response. The following table describes these fields: 

| Field     | Type | Purpose                                                                                                                                                                                                                                                                                                                     |
|---------|--------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `ok`        | `boolean` | This field is always present in the response. If the query is executed correctly, the value will be set to `true`. If an error occurred as a result of the query execution, then the value of this field will be set to `false`. Use this field to determine, if the query is successful                                    |
| `code`      | `int` | This field is present in the response, if the request is executed with an error and contains an error code. Code `1` means generic error and can also appear for errors, different in their nature. The remaining codes are unique for specific types of errors. Most of errors mean "Invalid address" or "Result is not found" |
| `msg`       | `String` | This field is shown in the response if a query is executed with an error. It contains a text message about the error. This message is usually shown for failed requests                                                                                                                                                     |
| `address`   | `String` | This field can be present in some responses. It contains information on wallet address in the binary representation hex format                                                                                                                                                                                              |
| `txtaddress` | `String` | This field can be present in some responses. It contains an address in the textual format |
