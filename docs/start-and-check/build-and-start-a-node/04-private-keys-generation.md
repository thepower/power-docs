# How to generate the private and public keys?

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Introduction](#introduction)
- [Private key generation](#private-key-generation)
- [Calculation of a public key out of a private key](#calculation-of-a-public-key-out-of-a-private-key)
- [Extraction of the private key (HEX)](#extraction-of-the-private-key-hex)
- [Extraction of the public key (HEX)](#extraction-of-the-public-key-hex)
- [Extraction of the public key (DEC)](#extraction-of-the-public-key-dec)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

This guide will help you to easily generate the private and public keys for nodes and accounts.

## Private key generation

To generate the private keys, run:

```bash
openssl ecparam -name secp256k1 -genkey -noout -out priv.key
```

After the key is generated, you will see the following output:

```bash
~ cat ./key.priv.pem

ASN1 OID: secp256k1
-----BEGIN EC PARAMETERS-----
BgUrgQQACg==
-----END EC PARAMETERS-----
-----BEGIN EC PRIVATE KEY-----
MHQCAQEEIFi3694ES2t3WIy1CbGeXsdF7jTQJgd+j9VMkWGsuY1roAcGBSuBBAAK
oUQDQgAEO0Z9+pYftutujvJwKuWaM0L5w0jfi/fIKFypak2csE7jSCAjLDY/GV8y
/fmdC4ksHQQ/ToZhuLDx5yKJiXBbIw==
-----END EC PRIVATE KEY-----
```

Your private key will be stored in a private key file in the directory you've specified in the command. The private key will be used later to sign all transactions you will perform.

## Calculation of a public key out of a private key

To calculate the public key out of the private key file `priv.key`, run:

```bash
openssl ec -in priv.key -pubout -conv_form compressed > pub.key
```

After the key is calculated, you will see the following output:

```bash
-----BEGIN PUBLIC KEY-----
MDYwEAYHKoZIzj0CAQYFK4EEAAoDIgADO0Z9+pYftutujvJwKuWaM0L5w0jfi/fI
KFypak2csE4=
-----END PUBLIC KEY-----
```

## Extraction of the private key (HEX)

To extract the private key out of the private key file `priv.key`, run:

```bash
openssl asn1parse -in priv.key -inform pem | grep -e "\[HEX DUMP\]" | cut -d ":" -f4
```

After the key is extracted, you'll see the following output:

```bash
58B7EBDE044B6B77588CB509B19E5EC745EE34D026077E8FD54C9161ACB98D6B
```

## Extraction of the public key (HEX)

To extract the public key out of the private key file `priv.key`, run:

```bash
openssl ec -in priv.key -noout -text -conv_form compressed 2>/dev/null | grep -A 3 '^pub:' | tail -n 3 | tr '\n' ' '| sed 's/[^01-9a-z]//g' | tr ‘[:lower:]’ ‘[:upper:]’
```

After the key is extracted, you'll see the following output:

```bash
033B467DFA961FB6EB6E8EF2702AE59A3342F9C348DF8BF7C8285CA96A4D9CB04E
```

## Extraction of the public key (DEC)

To extract the public key out of the private key file `priv.key`, run:

```bash
raw=$(openssl ec -in priv.key -noout -text -conv_form compressed 2>/dev/null | grep -A 3 '^pub:' | tail -n 3 | tr '\n' ' ' | tr -d ' ' | tr ':' ' '); b="";for a in $raw; do b="$b$((16#$a)) "; done; echo $b | tr ' ' ','
```

After the key is extracted, you'll see the following output:

```bash
3,59,70,125,250,150,31,182,235,110,142,242,112,42,229,154,51,66,249,195,72,223,139,247,200,40,92,169,106,77,156,176,78
```

> **Attention**
> 
> If you work with `zsh` (MacOS) this command needs another cycle parameter:
> 
> ```bash
> raw=$(openssl ec -in priv.key -noout -text -conv_form compressed 2>/dev/null | grep -A 3 '^pub:' | tail -n 3 | tr '\n' ' ' | tr -d ' ');IFS=":"; b="";for a in ${=raw}; do b="$b$((16#$a)) "; done; echo $b | sed 's/\ $//' | tr ' ' ','
> ```
> 
> Otherwise, the line will be parsed incorrectly.