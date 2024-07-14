<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [`tpe` CLI Quick Start Guide](#tpe-cli-quick-start-guide)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Getting Started](#getting-started)
    - [Account Management](#account-management)
    - [Container Management](#container-management)
    - [Smart Contract Management](#smart-contract-management)
    - [Storage Management](#storage-management)
    - [Additional Commands](#additional-commands)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# `tpe` CLI Quick Start Guide

<!-- start DOCTOC -->
<!-- end DOCTOC -->

Hey, Powerian! Welcome to the Power DCloud CLI! This guide will help you get started with the `tpe` CLI to manage your decentralized applications and services on the Power DCloud platform.

## Prerequisites

- `Node.js` must be installed on your machine. 
- You must have access to terminal or command line interface.

## Installation

1. Install the `tpe` CLI:

   ```bash npm2yarn
   npm install -g @thepowereco/cli
   ```

2. Verify the installation:

   ```bash
   tpe --version
   ```

   If the installation was successful, the command returns something like this:

   ```bash
   @thepowereco/cli/1.11.131 darwin-arm64 node-v20.12.2
   ```

## Getting Started

### Account Management

1. Register a new account:

   ```bash
   tpe acc register --chain 1 --password yourpassword --filePath /path/to/save
   ```

   It creates the account file.

2. Check wallet balance:

   ```bash
   tpe acc get-balance --address YOUR_WALLET_ADDRESS
   ```

3. Send SK tokens:

   ```bash
   tpe acc send-sk -a 100 -t RECIPIENT_ADDRESS -k /path/to/keyfile.pem --password yourpassword
   ```

:::warning

The command is unstable. Please use [Faucet](https://faucet.thepower.io) to send tokens.

:::

### Container Management

1. Create a new container:

   ```bash
   tpe container create --keyFilePath /path/to/keyfile.pem --password yourpassword --containerName "MyContainer"
   ```

2. List your containers:

   ```bash
   tpe container list --keyFilePath /path/to/keyfile.pem --password yourpassword
   ```

3. Upload files to a container:

   ```bash
   tpe container upload --containerId CONTAINER_ID --keyFilePath /path/to/keyfile.pem --password yourpassword --filesPath /path/to/files
   ```

### Smart Contract Management

1. Deploy a smart contract:

   ```bash
   tpe contract deploy --abiPath /path/to/abi.json --binPath /path/to/bin --keyFilePath /path/to/keyfile.pem --password yourpassword
   ```

2. Call a method on a deployed contract:

   ```bash
   tpe contract get --abiPath /path/to/abi.json --address CONTRACT_ADDRESS --method METHOD_NAME --params "param1 param2"
   ```
   
3. Execute a method on a smart contract:

   ```bash
   tpe contract set --abiPath /path/to/abi.json --address CONTRACT_ADDRESS --keyFilePath /path/to/keyfile.pem --method METHOD_NAME --params "param1 param2" --password yourpassword
   ```

### Storage Management

1. Upload application files to storage:

   ```bash
   tpe storage upload --configPath /path/to/config.json
   ```
   
2. List storage tasks:

   ```bash
   tpe storage tasklist --configPath /path/to/config.json
   ```

### Additional Commands

1. View all available commands:

   ```bash
   tpe help
   ```

2. Update the `tpe` CLI:

   ```bash
   tpe update
   ```