# Testnet Campaign Flow (Phase 2)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Introduction](#introduction)
  - [Prerequisites for a node](#prerequisites-for-a-node)
    - [Hardware](#hardware)
    - [Software](#software)
- [What do I need to participate in testnet campaign?](#what-do-i-need-to-participate-in-testnet-campaign)
  - [Step 1: Learn](#step-1-learn)
  - [Step 2: Get IP addresses and DNS](#step-2-get-ip-addresses-and-dns)
  - [Step 3: Install Erlang](#step-3-install-erlang)
  - [Step 4: Download and start a seed node](#step-4-download-and-start-a-seed-node)
    - [Download, build, and run the node using `docker-compose`](#download-build-and-run-the-node-using-docker-compose)
    - [Download, build, and run the node using Docker](#download-build-and-run-the-node-using-docker)
    - [Download, build, and run the node using the source code](#download-build-and-run-the-node-using-the-source-code)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Introduction

This simple guide will help you participate in The Power testnet campaign.

:::warning

Please, turn off the firewall before you start working with the node.

:::

### Prerequisites for a node

#### Hardware

| CPU cores | Memory       | Hard disk                     | Network    |
|-----------|--------------|-------------------------------|------------|
| 4         | 4 GB or more | Minimum: 40 GB, SSD preferred | 100 Mbit/s |

#### Software

| OS           | Erlang version | Eshell version | Docker version                         | Server          |
|--------------|----------------|----------------|----------------------------------------|-----------------|
| Ubuntu 22.04 | 24.3           | 10.4           | latest (20.10.18 as of September 2022) | Virtual machine |

:::note

You need to have a clear server to work with your node. If you have done any experiments before, please delete the previous builds.

:::

:::warning

If you use other versions of Ubuntu, you'll have to resolve the Erlang dependencies manually.

:::

## What do I need to participate in testnet campaign?

To participate in ThePower testnet campaign you need to:

### Step 1: Learn

[Learn what is a testnet in DCloud](../../Maintain/01-testnets-intro.md). This guide will help you understand what ThePower Testnet is.

Use [**this manual**](../../Maintain/build-and-start-a-node/08-seed-nodes.md) to learn how to start a seed node.

### Step 2: Get IP addresses and DNS

You need to have a public IP address to take part in the testnet campaign. You can register a DNS for your server, if you want. The word "domain" will be used in the text below with the meaning of "domain", or of "IP address".

### Step 3: Install Erlang

Before start working with the node you need to set up your environment by installing Erlang. You will need Erlang to run the Tea Ceremony client. You will not be able to start the node and connect to the chain without Tea Ceremony. To install Erlang, run:

   ```bash
   apt -y install erlang-base erlang-public-key erlang-ssl
   ```

> **Note**
>
> You need to install `erlang-public key` and `erlang-ssl`. Otherwise, Erlang will not operate properly!

### Step 4: Download and start a seed node

Download ThePower Node. Here you have three options:

1. Download ThePower node using [`docker-compose`](./02-download-build-run-compose.md) (recommended for all users).
2. Download ThePower node using the [Docker image](https://hub.docker.com/r/thepowerio/tpnode).
3. Download the [source](https://github.com/thepower/tpnode) code and build it (only for advanced users).

:::info Note

The first two options are almost the same, but we recommend you to use the `docker-compose` option to make the process faster and easier for you.

:::

#### Download, build, and run the node using `docker-compose`

Use [this manual](./02-download-build-run-compose.md) to download, build, and run the node using `docker-compose`. It is even easier than running a node using Docker image. We strongly recommend to use this option.

#### Download, build, and run the node using Docker

Use [this manual](./03-download-build-run-docker.md) to download, build, and run the node using Docker. It is a fast and easy way to build and run the Power Node.

#### Download, build, and run the node using the source code

Use [this manual](./04-download-build-run-source.md) to download, build, and run the node from the source code if you want to go through the advanced way of building sources, but we still recommend you to use the `docker-compose`.
