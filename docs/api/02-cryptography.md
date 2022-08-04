# Cryptography

Before we start talking about API methods, there is a need to deal with cryptography issues. This document will give examples of work with cryptography using openssl. Many programming languages are suitable for working with this program, thus the presented examples could be transferred to these languages without any extra difficulties.

The following version of openssl is used for given examples:

```console
~ openssl version
OpenSSL 1.1.1f  31 Mar 2020
```

## How the cryptography works?

```bash
#! /bin/sh -x

~ openssl version
openssl ecparam -name secp256k1 -genkey -text -out ./key.priv.pem
~ cat ./key.priv.pem
openssl ec -in ./key.priv.pem -pubout -out ./key.pub.pem
~ cat ./key.pub.pem
~ echo 'test123' > textfile.txt
openssl dgst -sha256 -sign ./key.priv.pem -out ./sign.bin textfile.txt
openssl base64 -in ./sign.bin -out ./sign.txt
~ cat ./sign.txt
openssl dgst -sha256 -verify ./key.pub.pem -signature ./sign.bin ./textfile.txt

~ openssl version
OpenSSL 1.1.0h  27 Mar 2018
~ openssl ecparam -name secp256k1 -genkey -text -out ./key.priv.pem
~ cat ./key.priv.pem
ASN1 OID: secp256k1
-----BEGIN EC PARAMETERS-----
BgUrgQQACg==
-----END EC PARAMETERS-----
-----BEGIN EC PRIVATE KEY-----
MHQCAQEEIA8XwLgEqy+WW9shqLrT2zrp4B4kSqC7RA6QrQLyXltsoAcGBSuBBAAK
oUQDQgAEIBSsyL1UjQlmML9w7ecF6fhnEaQgqXkyrgjdhYXgcNovMeWwoIp+SxQv
jNgdaTCr/dq5IlznxMaoBlHnqwKS2A==
-----END EC PRIVATE KEY-----
~ openssl ec -in ./key.priv.pem -pubout -out ./key.pub.pem
read EC key
writing EC key
~ cat ./key.pub.pem
-----BEGIN PUBLIC KEY-----
MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEIBSsyL1UjQlmML9w7ecF6fhnEaQgqXky
rgjdhYXgcNovMeWwoIp+SxQvjNgdaTCr/dq5IlznxMaoBlHnqwKS2A==
-----END PUBLIC KEY-----
~ echo test123
openssl dgst -sha256 -sign ./key.priv.pem -out ./sign.bin textfile.txt
openssl base64 -in ./sign.bin -out ./sign.txt
~ cat ./sign.txt
MEQCIGfvYyBggaT0f3B1GxNxbJnYXciSfJFgi5J5UaWx7TnVAiBAnFmgAj1R/kni
dcXQU+3MEiN67owdK2aIaTQpVRDHWA==
~ openssl dgst -sha256 -verify ./key.pub.pem -signature ./sign.bin ./textfile.txt
Verified OK
```

### Private key generation

Refer to the [Private key generation](../build-and-start-a-node/03-private-keys-generation.md#private-key-generation) guide to learn how to generate a private key using OpenSSL.

Ensure your private key is securely stored.

### Public key generation

A public key is necessary for signing any data or documents. This key is the only way to perform any actions with the Power Ecosystem.

The public key is required to verify that the private key signature conforms with the information in the public key. The public key is passed to Power_ecosystem network in the moment of wallet registration. This key is kept in the blockchain and can be accessed by anyone. Use our [guide](../build-and-start-a-node/03-private-keys-generation.md#calculation-of-a-public-key-out-of-a-private-key) to get the public key as a pair for your private key.

### Data Signature

On the line 6 of the example given in [How the cryptography works](#how-the-cryptography-works) section, a `textfile.txt` file is created with the contents of `test123` (on some operating systems this command could add a newline character):

```bash
~ echo 'test123' > textfile.txt
```

On the next line, the data is signed in the file `textfile.txt`:

```bash
openssl dgst -sha256 -sign ./key.priv.pem -out ./sign.bin textfile.txt
```

Then, the binary file `sign.bin` is converted into `base64` format (for the example purposes, `sign.bin` with binary data will be used for signature verification):

```bash
openssl base64 -in ./sign.bin -out ./sign.txt
```

**Signature obtained:**

```bash
~ cat ./sign.txt
MEUCIQDYso2HZkuQHw82FT8PtYa8Qf832tWLTk9KYfzUlxa0ZQIgLS6ljjr0y5Mj
SEwTQt5biOLb+dsLhbv4SxbTIQPeiO0=
```

#### Signature verification

To verify the signature, use the following command:

```bash
~ openssl dgst -sha256 -verify ./key.pub.pem -signature ./sign.bin ./textfile.txt
Verified OK
```

## Wallet Import Format

The current implementation of the wallet stores keys in WIF format. [Here](https://en.bitcoin.it/wiki/Wallet_import_format) you can find the guidelines for working with this format.

## Key Conversion to DER format

In order to register your account, you need to create a compressed public key (such a key that has the Y coordinate in its entirety and the parity of the X coordinate). This key occupies 33 bytes without a header and the first byte here is 2 or 3, depending on the parity of the X coordinate.

Get the DER-formatted key from the private key created by openssl using the following command:

```console
~ openssl ec -in key.priv.pem -conv_form compressed -outform DER | dd bs=1 skip=53 > key.raw.bin
```

In this example, the `dd` option removes the first 53 bytes of the data received from an openssl program (it skips ASN.1 header and writes only the key to a file 'key.raw.bin'). The size of the `key.raw.bin` file should be 33 bytes.
