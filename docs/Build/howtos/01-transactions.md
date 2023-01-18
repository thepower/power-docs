# Transactions

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Introduction](#introduction)
- [Prerequisisites](#prerequisisites)
- [Preparing the project](#preparing-the-project)
- [Write the code that will register an account](#write-the-code-that-will-register-an-account)
- [Account data uploading and displaying account state](#account-data-uploading-and-displaying-account-state)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Introduction

This manual will help you understand, how the transactions work.

## Prerequisisites

You need the last version of `nodejs` to be installed on your machine.

## Preparing the project

First, you need to prepare your project. To do this, follow the steps:

1. Create `dcloud_example` directory.
2. Open the console (terminal) and make the path to `dcloud_example` folder as a home directory.
3. To initially prepare the `package.json` project configuration file, run the following command:

   ```bash
   npm init
   ```

   It will ask you some questions. Just click **Enter** and answer `yes` to the last question.

   After the command is executed, the `package.json` file appears in the empty `dcloud_example` directory.

   The successfully executed command will output the following:

   ```text
   This utility will walk you through creating a package.json file.
   It only covers the most common items, and tries to guess sensible defaults.
   See `npm help init` for definitive documentation on these fields and exactly what they do.

   Use `npm install <pkg>` afterwards to install a package and save it as a dependency in the package.json file.

   Press ^C at any time to quit.
   package name: (dcloud_example)
   version: (1.0.0)
   description:
   entry point: (index.js)
   test command:
   git repository:
   keywords:
   author:
   license: (ISC)
   About to write to D:\Temp\111\dcloud_example\package.json:

   {
   "name": "dcloud_example",
   "version": "1.0.0",
   "description": "",
   "main": "index.js",
   "scripts": {
   "test": "echo \"Error: no test specified\" && exit 1"
   },
   "author": "",
   "license": "ISC"
   }

   Is this OK? (yes) yes
   ```

4. Open the file and add the following line:

   ```json
   "type": "module"
   ```
   
   The file will then look as folllows:

   ```json
   {
   "name": "dcloud_example",
   "version": "1.0.0",
   "description": "",
   "main": "index.js",
   "scripts": {
   "test": "echo \"Error: no test specified\" && exit 1"
   },
   "author": "",
   "license": "ISC",
   "type": "module"
   }
   ```

5. Add `tssdk` library to the project by running the following command:

   ```bash
   npm install @thepowereco/tssdk
   ```

## Write the code that will register an account

1. Create an `index.js` file in the `dcloud_example` directory in any editor you use and copy the following code there:

   ```javascript
   import { NetworkApi, WalletApi } from '@thepowereco/tssdk';
   import {writeFileSync} from 'fs';

   //register in cahin number 1033
   let acc = await WalletApi.registerCertainChain(1033);
   console.log('register data',acc);

   //save account data to file
   const networkApi = new NetworkApi(1033);
   const walletApi = new WalletApi(networkApi);

   let password='111';
   let hint='three one';
   const exportedData =  walletApi.getExportData(acc.wif, acc.address, password, hint);
   writeFileSync('example.pem', exportedData);
   ```
   
   This code registers account in chain 1033 and then downloads the account data in `pem` format.

2. Start up this code in terminal using the following command:

   ```bash
   >node index.js
   ```
   
   The information about the registered account will be displayed in the terminal (console), and the file `example.pem` will appear in the `dcloud_example` directory.

## Account data uploading and displaying account state

Follow the steps below to upload the account data and then display the account state:

1. Delete or comment the current `index.js` file content.
2. Copy the following code into the file:

   ```Javascript
   import { NetworkApi, WalletApi } from '@thepowereco/tssdk';
   import {readFileSync} from 'fs';
   //load account data from file
   const importNetworkApi = new NetworkApi(1025);
   const importWalletApi = new WalletApi(importNetworkApi);
   let password='111';
   const importedData = readFileSync("example.pem");
   const importedWallet = await importWalletApi.parseExportData(importedData.toString(), password);
   console.log('import data',importedWallet);

   //load balance for account
   const letNetworkApi = new NetworkApi(1025);
   await letNetworkApi.bootstrap();
   let subChain = await letNetworkApi.getAddressChain(importedWallet.address);
   const networkApi = new NetworkApi(subChain.chain);
   await networkApi.bootstrap();
   const walletApi = new WalletApi(networkApi);
   const accountData= await walletApi.loadBalance(importedWallet.address);
   console.log('accountData',accountData);
   ```
   
3. Run this code in the terminal by running the following command:

   ```bash
   >node index.js
   ```

   The account information loaded from the file, and then from the blockchain will be displayed in the terminal subsequently.

The part of `NetworkApi` library can be used differently in the code above. Let's check out the usages of this library part:

1. ```Javascript
   const importNetworkApi = new NetworkApi(1025);
   ```
   
   This constant creates an instance of `NetworkApi` and uses 1025 chain parameter (chain 1025 is one of the first chains in the testnet).

   ```Javascript
   const importWalletApi = new WalletApi(importNetworkApi);
   ```
   
   This constant creates an instance of `WalletApi`, linking to `NetworkApi` instance.

   Here you don't need to think of what number of chain to use. The most important is that it is valid. The point is that `importWalletApi` is used only for processing the local file that contains the account data. That is why, there is no need in full network library initialization.

2. ```Javascript
   const letNetworkApi = new NetworkApi(1025);
   ```

   This constant creates an instance of `NetworkApi` and uses 1025 chain parameter (chain 1025 is one of the first chains in the testnet).

   ```Javascript
   await letNetworkApi.bootstrap();
   ```
   
   This method initializes the network library by uploading information about the nodes of chain 1025.

   ```Javascript
   let subChain = await letNetworkApi.getAddressChain(importedWallet.address);
   ```
   
   This method invokes chain 1025 API and requests to search the chain, to which the account imported from file belongs.

3. ```Javascript
   const networkApi = new NetworkApi(subChain.chain);
   ```
   
   This constant creates an instance of `NetworkApi` with the chain parameter that conforms the account, about which the data will be received in the future.

   ```Javascript
   await networkApi.bootstrap();
   ```
   
   Initialize the chain described above and receive data about the nodes it contains.