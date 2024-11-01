# Deploying Files to DStorage

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Commands](#commands)
- [Deploy the files](#deploy-the-files)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

DStorage is a revolutionary decentralized storage platform that offers you a fast, secure, and reliable way to store and distribute your data.

## Prerequisites

Make sure you have `npm` or `yarn` installed on your machine.

## Commands

The `tpe` CLI has the following commands:

1. `tpe storage tasklist` — shows the list of all tasks for the current account;
2. `tpe storage upload` — upload application files to the storage.

## Deploy the files

Follow the steps below to deploy files to a decentralized storage:

1. Install the `@thepowereco/cli` package globally:

   ```bash npm2yarn
   npm install -g @thepowereco/cli
   ```

2. Register an account:

   ```bash
   tpe register
   ```

3. Select the `devnet` option and make a note of the provided information, as it will be needed later. Here is the example:

   ```bash
   ✔ Please, select the network: · devnet
   Loading... done
   Network: devnet
   Chain number: 1
   Account address: AA100000001677740890
   Account seed phrase: peanut shadow approve put grain outdoor hand program angry tiger cry diary
   Account wif: L2NzLJEtduehhwxT7cidd13tNDmsnZn9neoYa9wRg9W89gDcdeVu
   To replenish the balance of your account please visit: https://faucet.thepower.io
   ```

4. Go to the [**Faucet**](https://faucet.thepower.io/).
5. Select the chain 1 option:

   ![chain](../tools/resources/chain.jpg)

6. Copy the provided address into the information from step 3.
7. Click **Send tokens**:

   ![send_tokens](../tools/resources/send_tokens.jpg)

8. Navigate to the folder one level above the folder you want to upload. For example, if you want to upload the `/home/app` folder, navigate to the `/home` folder.
9. Run the following command:

   ```bash
   tpe storage upload 
   ```

   and specify the folder you want to upload, for example `./app`.
10. Enter the `address` and `wif` from step 3. The files will be uploaded.
11. After the files are uploaded, the location where they will be stored will be indicated.

:::info Note

To deploy a basic `create-react-app` template, modify the paths so that they start from the root domain.

For example, replace all instances of `="/` with `="./`.

:::