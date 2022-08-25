# Accounts

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Request examples](#request-examples)
   - [Valid request](#valid-request)
      - [API request](#api-request)
      - [API response](#api-response)
   - [Invalid address](#invalid-address)
       - [API request](#api-request-1)
       - [API response](#api-response-1)
   - [Non-existent address](#non-existent-address)
       - [API request](#api-request-2)
       - [API response](#api-response-2)
   - [Description of info block fields](#description-of-info-block-fields)
       - [Conversion of a public key into PEM format](#conversion-of-a-public-key-into-pem-format)
       - [Working example](#working-example)
   - [Obtaining a public key via API](#obtaining-a-public-key-via-api)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


Use the following API to request information about the wallet state:

| Request type | URL                      | Parameters                                                                                                                                                                                                                        |
|--------------|--------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `GET`        | `/api/address/{address}` | `{address}` — wallet address in textual or binary representation in hex format.   Examples:   `AA100000001677722412` — address in textual representation   `0x800140000100000B` — address in  binary representation in hex format |

## Request examples

> **Note**
>
> For `http`-requests `curl` is used.
> For highlighting the `json`-formatted syntax `jq`-program is used.

### Valid request

#### API request

```bash
~ curl -s http://c103n10.thepower.io:49841/api/address/AA100000172805325404 | jq
```

#### API response

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

### Invalid address

#### API request

```bash
~ curl -s http://c103n10.thepower.io:49841/api/address/AA100000172805325405 | jq
```

#### API response

```json
{
  "result": "error",
  "code": 10004,
  "msg": "Invalid address",
  "ok": false
}
```

### Non-existent address

#### API request

```bash
~ curl -s http://c103n10.thepower.io:49841/api/address/0x800140000100000B | jq
```

#### API response

```json
{
  "result": "not_found",
  "code": 10003,
  "msg": "Not found",
  "ok": false
}
```

## Description of info block fields

| Field     | Purpose                                                                                                                                                                                                                              |
|-----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `amount`  | Wallet balance in various currencies. Only the transaction currencies are displayed in this field                                                                                                                                    |
| `lastblk` | Hash of the block in which the last transaction modified this wallet                                                                                                                                                                 |
| `pubkey`  | The public key for this wallet in a compact `DER` format                                                                                                                                                                             |
| `seq`     | The current value of `seq` for the address. When the transactions are executed through the API, the `seq` value should always be greater than the current value in the wallet (in other implementations, the name is called `nonce`) |
| `t`       | The last transaction time in milliseconds                                                                                                                                                                                            |

### Conversion of a public key into PEM format

PEM format is usually used to work with openssl. Conversion can be performed as follows:

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

### Working example

The program converts the public key of one of the wallets into PEM format and loads this key for further work with openssl:

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

The key problem can fail execution of `openssl_pkey_get_public`. The `resource (4) of type (OpenSSL key)` row at the end means that there were no errors, the key was correctly converted, and openssl accepted this key for further work:

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

**To do this, you must pass the `GET` parameter `pubkey=pem` using the following command:**

```bash
~ curl -s http://c103n10.thepower.io:49841/api/address/AA100000172805325404?pubkey=pem | jq
```

After the command has finished execution, you'll get the following result:

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

> **Note**
>
> The result of command execution you get may differ from the result in the example.
