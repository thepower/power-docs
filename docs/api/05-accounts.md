# Accounts

To request information about the state of the wallet, use the following API:

| Request Type | GET                                                                                                                                                                                                          |
| :----------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URL          | `/api/address/{address}`                                                                                                                                                                                     |
| Parameters   | `{address}` — wallet address in a text or binary representation as hex. Examples: AA100000001677722412 - address in a textual representation 0x800140000100000B - address in a binary representation as hex. |

Examples of requests (curl is used to execute http requests and the jq program for highlighting the json syntax):

**API request for a valid address:**

```bash
~ curl -s http://c103n10.thepower.io:49841/api/address/AA100000172805325404 | jq
```

**API response for a valid address:**

```json
{
  "info": {
    "amount": {
      "SK": 99999998
    },
    "code": 45864,
    "contract": ["wasm", "WebAssembly"],
    "lastblk": "89EDEB022263D98948C91445933605C59BA6BA1664D80BFA2A7E0274D21AC9B9",
    "preblk": "E188F404907DCEE56F0D04123C24951AA356B8A04E082942AD92871CCE122E20",
    "pubkey": "02D240F5F816302BD5D435720943CD715F2E735220C44648BBED39EEB6CE52A149",
    "seq": 1630647029317,
    "state": 1,
    "t": 1630647029317,
    "usk": 1,
    "view": [],
    "vm": "wasm"
  },
  "result": "ok",
  "address": "0x8001400067000006",
  "ok": true,
  "txtaddress": "AA100000172805325404"
}
```

**API request for a invalid address:**

```bash
~ curl -s http://c103n10.thepower.io:49841/api/address/AA100000172805325405 | jq
```

**API response for a invalid address:**

```json
{
  "result": "error",
  "code": 10004,
  "msg": "Invalid address",
  "ok": false
}
```

**API request for a non-existent address:**

```bash
~ curl -s http://c103n10.thepower.io:49841/api/address/0x800140000100000B | jq
```

**API response for a non-existent address:**

```json
{
  "result": "not_found",
  "code": 10003,
  "msg": "Not found",
  "ok": false
}
```

## Description of the fields of the info block:

| Field   | Purpose                                                                                                                                                                                                             |
| :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| amount  | Wallet balance in various currencies. Only the currencies in which transactions were made are displayed.                                                                                                            |
| lastblk | Hash of the block in which the last transaction modified this wallet.                                                                                                                                               |
| pubkey  | The public key for this wallet in a compact DER format.                                                                                                                                                             |
| seq     | The current value of seq for this address. Executing transactions through the API, the seq value should always be greater than the current value in the wallet (in other implementations the name is called nonce). |
| t       | The last transaction time in milliseconds.                                                                                                                                                                          |

Conversion of a public key into PEM format (usually this format is used for work with the openssl) can be performed as follows (example in php language):

```php
function der2pem($der_data, $type='PUBLIC KEY') {
    $der_data = hex2bin('3036301006072a8648ce3d020106052b8104000a032200') . $der_data;
    $pem = chunk_split(base64_encode($der_data), 64, "\n");
    $pem = "-----BEGIN ".$type."-----\n".
        trim($pem) .
        "\n-----END ".$type."-----\n";
    return $pem;
}
```

### An example of work.

The program converts the public key of one of the wallets to PEM format, and also loads this key for further work with openssl. Execution of openssl_pkey_get_public fails due to the key problem. The resource (4) of type (OpenSSL key) row at the end says that there were no errors, the key was correctly converted and openssl accepted this key for further work.

```php
<?php
function der2pem($der_data, $type='PUBLIC KEY') {
  $der_data = hex2bin('3036301006072a8648ce3d020106052b8104000a032200') . $der_data;
  $pem = chunk_split(base64_encode($der_data), 64, "\n");
  $pem = "-----BEGIN ".$type."-----\n".
      trim($pem) .
      "\n-----END ".$type."-----\n";
  return $pem;
}

$pub_key = nex2bin('036A21F068BE92697268B60D96C4CA93052EC104E49E003AE2C404D916864372F4');
$pub_key_pem = der2pem($pub_key);
$pub_key_handle = openssl_pkey_get_public($pub_key_pem);

printf("pub key:\n%s\n", $pub_key_pem);
var_dump($pub_key_handle);
%>
```

```bash
~ php example.php
pub key:
-----BEGIN PUBLIC KEY-----
MDYwEAYHKoZIzj0CAQYFK4EEAAoDIgADaiHwaL7SaXJoyg2WqTBS7BBOSeADrixAt5FoZDcvQ=
-----END PUBLIC KEY-----

resource(4) of type (OpenSSL key)
```

## Obtaining a public key via API

It is also possible to obtain a public key in PEM format.

**To do this, you must pass the GET parameter pubkey=pem:**

```bash
~ curl -s http://c103n10.thepower.io:49841/api/address/AA100000172805325404?pubkey=pem | jq
```

```json
{
  "info": {
    "amount": {
      "SK": 99999998
    },
    "code": 45864,
    "contract": ["wasm", "WebAssembly"],
    "lastblk": "89EDEB022263D98948C91445933605C59BA6BA1664D80BFA2A7E0274D21AC9B9",
    "preblk": "E188F404907DCEE56F0D04123C24951AA356B8A04E082942AD92871CCE122E20",
    "pubkey": "-----BEGIN PUBLIC KEY-----\nMDYwEAYHKoZIzj0CAQYFK4EEAAoDIgAC0kD1+BYwK9XUNXIJQ81xXy5zUiDERki77Tnuts5SoUk=\n-----END PUBLIC KEY-----",
    "seq": 1630647029317,
    "state": 1,
    "t": 1630647029317,
    "usk": 1,
    "view": [],
    "vm": "wasm"
  },
  "result": "ok",
  "address": "0x8001400067000006",
  "ok": true,
  "txtaddress": "AA100000172805325404"
}
```
