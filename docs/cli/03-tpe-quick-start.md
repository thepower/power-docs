# CLI Quick Start Guide

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Getting Started](#getting-started)
  - [Account Management](#account-management)
  - [Container Management](#container-management)
  - [Smart Contract Management](#smart-contract-management)
  - [Storage Management](#storage-management)
  - [Additional Commands](#additional-commands)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
   tpe acc register --chain 1 --password yourpassword --filePath /path/to/save_a_file.pem
   ```
   
   Keys:

   - `--chain` — a chain, where the account will be created,
   - `--password` — password for a key file. Ensure, you've remembered it, otherwise you'll lose access to your account!
   - `--filePath` — path to save account key file.

   :::tip Note

   Make sure you add `.pem` to your account key file.

   :::

   If the account is created successfully, you'll get a message like:

   ```bash
   Account registration... done
   {
     "chain": 1,
     "wif": "ACCOUNT_WIF",
     "address": "ACCOUNT_ADDRESS",
     "seed": "SEED_PHRASE"
   }
   File saved at: /Users/usr/new_account_test.pem
   ```

2. Check wallet balance:

   ```bash
   tpe acc get-balance --address YOUR_WALLET_ADDRESS
   ```

3. Send SK tokens:

   ```bash
   tpe acc send-sk -a 100 -t RECIPIENT_ADDRESS -k /path/to/keyfile.pem --password yourpassword
   ```

   Keys:

   - `-a` — amount to be sent,
   - `-t` — recipient address,
   - `-k` — path to your key file,
   - `--password` — your key file password.

   If the command is successful, you'll get the following message:

   ```text
   Loading... done
   {
     "txId": "2hcUb7e4QstfpX4W-c1n1.ed",
     "res": "ok",
     "block": "C67977213CF7C1BEE04935E047C8469FDA1111EA328DB4E93E58D442F1D65FB1"
   }
   ```

4. Send tokens to contracts, without running EVM:

   ```bash
   tpe acc send-sk -a 1 -k ./power_wallet_**_***.pem -t AA100002352165683776 -g NORUN -v 0
   ```

   Keys:

   - `-a` — amount to be sent,
   - `-t` — recipient address,
   - `-k` — path to your key file,
   - `-g` - token used to pay for gas. `NORUN` means that EVM will not start,
   - `-v` — gas value for deployment.

### Container Management

1. Create a new container:

   ```bash
   tpe container create --keyFilePath /path/to/keyfile.pem --password yourpassword --containerName "MyContainer"
   ```

   Keys:

   - `keyFilePath` — path to your key file,
   - `--password` — your key file password,
   - `containerName` — choose the name for your container.

   If a container has been created successfully, you'll get the following message:

   ```text
   Loading... done
   Container Container_test created with order ID: 9
   Transaction: [TRANSACTION_LINK]
   ```

2. List your containers:

   ```bash
   tpe container list --keyFilePath /path/to/keyfile.pem --password yourpassword
   ```

   Keys:

   - `keyFilePath` — path to your key file,
   - `--password` — your key file password.

   If the command is successful, you'll get the following message:

   ```text
   Loading... done
   ┌────┬────────────────┬─────────┬──────────────────────────────────────────────┬─────────────────────┬─────────────────┬──────────────────────┬───────────┐
   │ Id │ Name           │ Status  │ Pubkey                                       │ Created             │ Active provider │ Handover To Provider │ Hold time │
   ├────┼────────────────┼─────────┼──────────────────────────────────────────────┼─────────────────────┼─────────────────┼──────────────────────┼───────────┤
   │ 9  │ Container_test │ Pending │ CONTAINER_PUBLIC_KEY                         │ 16.07.2024 20:23:36 │ 0               │ 0                    │ 0         │
   └────┴────────────────┴─────────┴──────────────────────────────────────────────┴─────────────────────┴─────────────────┴──────────────────────┴───────────┘
   ```

3. Upload files to a container:

   ```bash
   tpe container upload --containerId CONTAINER_ID --keyFilePath /path/to/keyfile.pem --password yourpassword --filesPath /path/to/files
   ```

   Keys:

   - `containerId` — your container ID. You can 
   - `keyFilePath` — path to your key file,
   - `--password` — your key file password.

### Smart Contract Management

1. Deploy a smart contract:

   ```bash
   tpe contract deploy --abiPath /path/to/contract.abi --binPath /path/to/bin --keyFilePath /path/to/keyfile.pem --password yourpassword
   ```

   Keys:

   - `--abiPath` — path to contract `.abi` file. Please, refer to [Create and prepare a smart contract](../sdk/development/smart-contracts/02-create-project.md) section for more information,
   - `--binPath` — path to contract `.bin` file. Please, refer to [Create and prepare a smart contract](../sdk/development/smart-contracts/02-create-project.md) section for more information,
   - `--keyFilePath` — path to your account key file. Please, refer to [Account Management](#account-management) section of this document,
   - `--password` — your account password.

2. Call a method on a deployed contract:

   ```bash
   tpe contract get --abiPath /path/to/contract.abi --address CONTRACT_ADDRESS --method METHOD_NAME --params "param1 param2"
   ```

   Keys:

   - `--abiPath` — path to contract `.abi` file. Please, refer to [Create and prepare a smart contract](../sdk/development/smart-contracts/02-create-project.md) section for more information,
   - `--address` — your deployed contract address,
   - `--method` — method you'd like to call,
   - `--params` — method parameters.

3. Execute a method on a smart contract:

   ```bash
   tpe contract set --abiPath /path/to/abi.json --address CONTRACT_ADDRESS --keyFilePath /path/to/keyfile.pem --method METHOD_NAME --params "param1 param2" --password yourpassword
   ```

   Keys:

   - `--abiPath` — path to contract `.abi` file. Please, refer to [Create and prepare a smart contract](../sdk/development/smart-contracts/02-create-project.md) section for more information,
   - `--address` — your deployed contract address,
   - `--keyFilePath` — path to your account key file. Please, refer to [Account Management](#account-management) section of this document,
   - `--method` — method you'd like to call,
   - `--params` — method parameters,
   - `--password` — your account password.


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