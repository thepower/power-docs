# Testnet Campaign Flow

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Introduction](#introduction)
- [What do I need to participate in testnet campaign?](#what-do-i-need-to-participate-in-testnet-campaign)
  - [Step 1: Learn](#step-1-learn)
  - [Step 2: Register the DNS](#step-2-register-the-dns)
  - [Step 3: Download the node](#step-3-download-the-node)
  - [Step 4: Get the client](#step-4-get-the-client)
  - [Step 5: Start the client](#step-5-start-the-client)
  - [Step 6: Create directories and place the files](#step-6-create-directories-and-place-the-files)
  - [Step 7: Edit the file](#step-7-edit-the-file)
  - [Step 8: Get the certificate](#step-8-get-the-certificate)
  - [Step 9: Start the node](#step-9-start-the-node)
- [What do I need to do if something goes wrong?](#what-do-i-need-to-do-if-something-goes-wrong)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Introduction

This simple guide will help you participate in ThePower testnet campaign.

## What do I need to participate in testnet campaign?

All you need to participate in ThePower testnet campaign is:

### Step 1: Learn

[Learn what is a testnet in DCloud](./Maintain/01-testnets-intro.md). This guide will help you understand what ThePower Testnet is.

### Step 2: Register the DNS

Register your DNS. ThePower will give you the third-level domain during the testnet campaign.

### Step 3: Download the node

Download ThePower Node. Here you have two options:

1.  Download ThePower node using the [Docker image](https://hub.docker.com/r/thepowerio/tpnode) and [set up your environment](./Maintain/build-and-start-a-node/04-startingTpNode_docker.md#setting-up-the-environment), or
2.  Download the [source](./Maintain/build-and-start-a-node/05-startingTpNode_source.md#downloading-and-building-the-node), code, and build it.

> **Note**
> 
> In these guides, you will also find information on how to start up your node using the Docker image or the source code.

### Step 4: Get the client

[Get the Tea Ceremony client](./Maintain/03-get-and-start-tea-ceremony-client.md#get-the-tea-ceremony-client). Then, get the Tea Ceremony token from the testnet administrators.

This and the following steps are crucial because you will NOT be able to start your node without `genesis.txt` and `node.config` files. You can find more information about these files [here](./Maintain/build-and-start-a-node/01-tpNodeConfiguration.md).

### Step 5: Start the client

[Start the Tea Ceremony client](./Maintain/03-get-and-start-tea-ceremony-client.md#start-the-tea-ceremony-client) using the token you've got from the testnet administrators.

### Step 6: Create directories and place the files

Create `db` and `log` directories in your working directory (`/opt`, for instance) and place `genesis.txt` and `node.config` near these directories.

### Step 7: Edit the file

Edit `node.config` by adding the addresses of nodes. See the [example](https://doc.thepower.io/docs/build-and-start-a-node/tpNodeConfiguration#nodeconfig-example) in [How to configure TP-Node?](https://doc.thepower.io/docs/build-and-start-a-node/tpNodeConfiguration) guide.

### Step 8: Get the certificate

[Obtain the SSL certificate for your node](./Maintain/build-and-start-a-node/02-ssl-certs-for-node.md) and place it into the `db` directory.

### Step 9: Start the node

Start your node. Here you have two options:

1.  Start your node using [the Docker image](./Maintain/build-and-start-a-node/04-startingTpNode_docker.md#starting-the-node), or
2.  Start your node from the [source code](./Maintain/build-and-start-a-node/05-startingTpNode_source.md#starting-the-node).

> **Note**  
>
> Before starting up the node ensure, you have set up your environment.

## What do I need to do if something goes wrong?

If something goes wrong, go to the `log` folder, and read the logs. If there are errors, write to Power Ecosystem Telegram chat: `https://t.me/thepower_chat`.