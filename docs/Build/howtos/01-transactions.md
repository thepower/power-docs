# Transactions: the guide

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Introduction](#introduction)
- [Prerequisisites](#prerequisisites)
- [Preparing the project](#preparing-the-project)
- [Working with the accounts](#working-with-the-accounts)
  - [Write the code that will register an account](#write-the-code-that-will-register-an-account)
  - [Account data uploading and displaying account state](#account-data-uploading-and-displaying-account-state)
  - [Sending a transaction to another account](#sending-a-transaction-to-another-account)

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
   
   The file will then look as follows:

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

   :::info

   Don't forget to add a comma after `"license": "ISC"` when copying `"type": "module"`.

   :::

5. Add `tssdk` library to the project by running the following command:

   ```bash
   npm install @thepowereco/tssdk
   ```

## Working with the accounts

### Write the code that will register an account

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
   node index.js
   ```
   
   The information about the registered account will be displayed in the terminal (console), and the file `example.pem` will appear in the `dcloud_example` directory:

   ```bash
   dcloud_example % node index.js
   register data {
   chain: 1033,
   wif: 'KywHx4qhG49JEms15jmgXDGMq7xKkmhQSpiZihWi5bbvL8QvjyUD',
   address: 'AA100001733086414002',
   seed: 'resource butter table ivory try churn banner toilet depart camera peace decide'
   }
   ```

### Account data uploading and displaying account state

Follow the steps below to upload the account data and then display the account state:

1. Delete or comment the current `index.js` file content.
2. Copy the following code into the file:

   ```javascript
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
   node index.js
   ```

   The account information loaded from the file, and then from the blockchain will be displayed in the terminal subsequently:

   ```bash
   dcloud_example % node index.js
   import data {
   address: 'AA100001733086414002',
   wif: 'KywHx4qhG49JEms15jmgXDGMq7xKkmhQSpiZihWi5bbvL8QvjyUD'
   }
   accountData {
   amount: {},
   lastblk: 'CF298CFA64D7CD1FB420034E19BE2C1AD1BAE59610AEA51F3061E0ADEFAFC8B0',
   pubkey: '0207FE4A91CE18E398B8BF7DF7B3BF13D99712C1DB8F3FA856E43C9839452424E1'
   }
   ```

The part of `NetworkApi` library can be used differently in the code above. Let's check out the usages of this library part:

1. ```javascript
   const importNetworkApi = new NetworkApi(1025);
   ```
   
   This constant creates an instance of `NetworkApi` and uses 1025 chain parameter (chain 1025 is one of the first chains in the testnet).

   ```javascript
   const importWalletApi = new WalletApi(importNetworkApi);
   ```
   
   This constant creates an instance of `WalletApi`, linking to `NetworkApi` instance.

   Here you don't need to think of what number of chain to use. The most important is that it is valid. The point is that `importWalletApi` is used only for processing the local file that contains the account data. That is why, there is no need in full network library initialization.

2. ```javascript
   const letNetworkApi = new NetworkApi(1025);
   ```

   This constant creates an instance of `NetworkApi` and uses 1025 chain parameter (chain 1025 is one of the first chains in the testnet).

   ```javascript
   await letNetworkApi.bootstrap();
   ```
   
   This method initializes the network library by uploading information about the nodes of chain 1025.

   ```javascript
   let subChain = await letNetworkApi.getAddressChain(importedWallet.address);
   ```
   
   This method invokes chain 1025 API and requests to search the chain, to which the account imported from file belongs.

3. ```javascript
   const networkApi = new NetworkApi(subChain.chain);
   ```
   
   This constant creates an instance of `NetworkApi` with the chain parameter that conforms the account, about which the data will be received in the future.

   ```javascript
   await networkApi.bootstrap();
   ```
   
   Initialize the chain described above and receive data about the nodes it contains.

### Sending a transaction to another account

To send a transaction within the system you need to: 

1. Pay commission. That is why, you need to have sufficient amount of tokens to send the transaction. The code `console.log('accountData',accountData)` from the example in the code snippet above outputs the account data. The `amount` field will also display the tokens assigned to the account.

2. Add the following code to the code example specified in paragraph 2 of [the section above](#account-data-uploading-and-displaying-account-state):

   ```javascript
   //send 10 tokens to another account
   let to='AA100001733086413603';
   let amount=10;
   let comment='test';
   let res= await walletApi.makeNewTx (importedWallet.wif,importedWallet.address,to,'SK',amount,comment,new Date().getTime());
   console.log(res);
   ```

   :::warning
   
   The account address

   ```javascript
   let to='AA100001733086413603';
   ```

   is an example address. Please, replace it with your actual destination address.

   :::

Check out the next document to learn how to work with the transactions.