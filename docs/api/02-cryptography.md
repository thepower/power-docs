# Cryptography

Before we start talking about API methods, there is a need to deal with cryptography issues. This document will give examples of work with cryptography using openssl. Many programming languages are suitable for working with this program, thus the presented examples could be transferred to these languages without any extra difficulties.

The following version of openssl is used for given examples:

```console
~ openssl version
OpenSSL 1.1.1 11 Sep 2018
```

## 1. Generating a Private Key

In order to generate a private key using openssl, you can use the following command:

```console
~ openssl ecparam -name secp256k1 -genkey -text -out ./key.priv.pem
```

A file with your private key will be result of performing it. This private key can be used later to sign all your wallet transactions. Example of a file obtained with a private key:

```console
~ cat ./key.priv.pem

ASN1 OID: secp256k1
-----BEGIN EC PARAMETERS-----
BgUrgQQACg==
-----END EC PARAMETERS-----
-----BEGIN EC PRIVATE KEY-----
MHQCAQEEID/VMb8FeEUT25fMlECFXFFmrlN2JyIaAq8wCurYix/LoAcGBSuBBAAK
oUQDQgAEc9EfjNOS77aPvokdhShEXfJinwQ3dOqZp9YOVdegIIXz0uYvt+VY08nG
0o2127zrMVETlRG4/qJT8zz1hOMBGA==
-----END EC PRIVATE KEY-----
```

## 2. Generating a public key

For signing any data or documents, having a private key is necessary. This key is the only way to perform any actions with the wallet that was created for it. Please, ensure security of your private key, making access to it as limited as possible.

A public key is required to verify the signature. This key is passed to Power_ecosystem network in the moment of wallet registration (process of its registration will be discussed later). This key is kept in the blockchain and can be accessed by anyone. To get the public key as a pair for your private key, please use the command:

```bash
~ openssl ec -in ./key.priv.pem -pubout -out ./key.pub.pem
read EC key
writing EC key
```

The result is a file with your public key. The contents of this file should look like this:

```bash
~ cat ./key.pub.pem
-----BEGIN PUBLIC KEY-----
MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEc9EfjNOS77aPvokdhShEXfJinwQ3dOqZ
p9YOVdegIIXz0uYvt+VY08nG0o2127zrMVETlRG4/qJT8zz1hOMBGA==
-----END PUBLIC KEY-----
```

## 3. Data Signature

```bash
~ echo 'test123' > textfile.txt
openssl dgst -sha256 -sign ./key.priv.pem -out ./sign.bin textfile.txt
openssl base64 -in ./sign.bin -out ./sign.txt
```

In the 10th row of this example, a "textfile.txt" file is created with the contents of test123 (on some operating systems this command could add a newline character). In the 11th row, the data is signed in the file "textfile.txt". The signature itself is written in binary form to the file sign.bin. In the 12th line, the binary file sign.bin is converted to base64 (for convenience of display, sign.bin with binary data will be used for signature verification).

**Signature obtained:**

```bash
~ cat ./sign.txt
MEUCIQDYso2HZkuQHw82FT8PtYa8Qf832tWLTk9KYfzUlxa0ZQIgLS6ljjr0y5Mj
SEwTQt5biOLb+dsLhbv4SxbTIQPeiO0=
```

## 4. Signature verification

To verify the signature, use the following command:

```bash
~ openssl dgst -sha256 -verify ./key.pub.pem -signature ./sign.bin ./textfile.txt
Verified OK
```

## 5. Full Example body

```console
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

## 6. Wallet Import Format

The current implementation of the wallet stores keys in WIF format. Guidelines for working with this format can be found here:
['https://en.bitcoin.it/wiki/Wallet_import_format'](https://en.bitcoin.it/wiki/Wallet_import_format)

## 7. Key Conversion to DER format

In order to register, you need to create a compressed public key (such a key that has the Y coordinate in its entirety and the parity of the X coordinate). This key occupies 33 bytes without a header and the first byte here is 2 or 3, depending on the parity of the X coordinate.

**From the private key created by openssl we get the key with the following command:**

```console
~ openssl ec -in key.priv.pem -conv_form compressed -outform DER | dd bs=1 skip=53 > key.raw.bin
```

In this example, the dd removes the first 53 bytes of the data received from the openssl program (it skips ASN.1 header and writes only the key to file 'key.raw.bin'). The size of the 'key.raw.bin' file should be 33 bytes.
