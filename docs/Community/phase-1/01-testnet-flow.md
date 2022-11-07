# Testnet Campaign Flow (Phase 1)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Introduction](#introduction)
  - [Prerequisites for a node](#prerequisites-for-a-node)
    - [Hardware](#hardware)
    - [Software](#software)
- [What do I need to participate in testnet campaign?](#what-do-i-need-to-participate-in-testnet-campaign)
  - [Step 1: Learn](#step-1-learn)
  - [Step 2: IP addresses and DNS](#step-2-ip-addresses-and-dns)
  - [Step 3: Install Erlang](#step-3-install-erlang)
  - [Step 4: Get Tea Ceremony client and token](#step-4-get-tea-ceremony-client-and-token)
  - [Step 5: Start the Tea Ceremony client](#step-5-start-the-tea-ceremony-client)
  - [Step 6: Download the node](#step-6-download-the-node)
    - [Download, build, and run the node using Docker](#download-build-and-run-the-node-using-docker)
    - [Download, build, and run the node using the source code](#download-build-and-run-the-node-using-the-source-code)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Introduction

This simple guide will help you participate in The Power testnet campaign.

### Prerequisites for a node

#### Hardware

| CPU cores | Memory       | Hard disk                     | Network    |
|-----------|--------------|-------------------------------|------------|
| 4         | 4 GB or more | Minimum: 40 GB, SSD preferred | 100 Mbit/s |

#### Software

| OS           | Erlang version | Eshell version | Docker version                         | Server          |
|--------------|----------------|----------------|----------------------------------------|-----------------|
| Ubuntu 22.04 | 24.3           | 10.4           | latest (20.10.18 as of September 2022) | Virtual machine |

## What do I need to participate in testnet campaign?

To participate in ThePower testnet campaign you need to:

### Step 1: Learn

[Learn what is a testnet in DCloud](../../Maintain/01-testnets-intro.md). This guide will help you understand what ThePower Testnet is.

### Step 2: IP addresses and DNS

You need to have a public IP address to take part in the testnet campaign. You can register a DNS for your server, if you want. The word "domain" will be used in the text below with the meaning of "domain", or of "IP address".

### Step 3: Install Erlang

Before starting Tea Ceremony you need to set up your environment by installing Erlang. You will need Erlang to run the Tea Ceremony client. You will not be able to start the node and connect to the chain without Tea Ceremony. To install Erlang, run:

   ```bash
   apt -y install erlang-base erlang-public-key erlang-ssl
   ```

> **Note**
>
> You need to install `erlang-public key` and `erlang-ssl`. Otherwise, Erlang will not operate properly!

### Step 4: Get Tea Ceremony client and token

1. Get the Tea Ceremony client by running the following command:

   ```bash
   wget https://tea.thepower.io/teaclient
   ```

2. Change the `teaclient` file mode to executable by running the following command:

   ```bash
   chmod +x teaclient
   ```

   Otherwise, you will NOT be able to start the client.

3. Get the Tea Ceremony token from the testnet bot.

   > **Note**
   >
   > This and the following steps are crucial because you will NOT be able to start your node without `genesis.txt` and `node.config` files. You can find more information about these files [here](https://doc.thepower.io/docs/Maintain/build-and-start-a-node/tpNodeConfiguration).

### Step 5: Start the Tea Ceremony client

[Start the Tea Ceremony client](https://doc.thepower.io/docs/Maintain/get-and-start-tea-ceremony-client/#start-the-tea-ceremony-client) using the token you've got from the testnet administrators.

To start the client, run the following command:

```erlang
./teaclient -n nickname token
```

where

- `teaclient` — Tea Ceremony client,
- `nickname` - The name of your node. Maximum 10 characters.
- `token` — Tea Ceremony Token, you've got from the Tea Ceremony bot.

After you have started the client, wait for other participants. Please, DON'T turn off the Tea Ceremony client for 24 hours.

> **Note**
>
> If the client is started without options, you will see a short reference on the command and options.

If you have successfully started the Tea Ceremony client, you will get `node.config` and `genesis.txt` files after the ceremony ends. You can find these files under the same directory where you have started the Tea Ceremony client.

> **Attention**
>
> After the tea ceremony ends, you need to edit the `node.config`. To do this, refer to the guide, depending on your way of building the node (Step 6). 

:: tip Tip
You can get a ready-to-work `node.config` file. To do this, rerun the Tea Ceremony.
::

### Step 6: Download the node

Download ThePower Node. Here you have two options:

1. Download ThePower node using the [Docker image](https://hub.docker.com/r/thepowerio/tpnode) (recommended for most users), or
2. Download the [source](../../Maintain/build-and-start-a-node/06-startingTpNode_source.md#downloading-and-building-the-node) code and build it (only for advanced users).

#### Download, build, and run the node using Docker

Use [this manual](./02-download-build-run-docker.md) to download, build, and run the node using Docker. It is a fast and easy way to build and run the Power Node. Recommended to the most of testneters.

#### Download, build, and run the node using the source code

Use [this manual](./03-download-build-run-source.md) to download, build, and run the node from the source code if you want to go through the advanced way of building sources, but we still recommend you to use the Docker image.