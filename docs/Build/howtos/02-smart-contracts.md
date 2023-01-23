# Working with EVM smart contracts

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Introduction](#introduction)
- [Create and prepare a smart contract](#create-and-prepare-a-smart-contract)
- [Deploy EVM smart contract](#deploy-evm-smart-contract)
- [Calling EVM smart contract function locally](#calling-evm-smart-contract-function-locally)
- [Sending the EVM smart contract function call via a transaction](#sending-the-evm-smart-contract-function-call-via-a-transaction)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

This manual will help you work with the EVM smart contracts.

:::warning Attention

Before you start working with the smart contracts, please, go through the steps in ["Transactions: the guide"](./01-transactions.md). You won't be able to work with smart contracts without a prepared project and registered account.

:::

## Create and prepare a smart contract

First of all, you need to create and prepare your smart contract to work with it. To do this:

1. Install Solidity compiler by running the following command:

   ```bash
   npm install -g solc
   ```
   
2. Create a smart contract file `greeter.sol`, which contains the following code:

   ```solidity
   //SPDX-License-Identifier: Unlicense
   pragma solidity ^0.8.13;
   contract Greeter {
   string private greeting;

    constructor() {
        greeting = 'Hello World!';
    }
   function greet() public view returns (string memory) {
   return greeting;
   }
   function setGreeting(string memory _greeting) public {
   greeting = _greeting;
   }
   }
   ```
   
   The main actions in this code example:

   1. Declaration of a new contract variable, where the `greeting` variable will be stored:

      ```solidity
      string private greeting;
      ```
      
   2. Declaration of contract inner variable, where the `greeting` variable will be stored:

      ```solidity
      constructor() {
        greeting = 'Hello World!';
      }
      ```
      
      When you create a smart contract, the `greeting` variable is initialized with a classical `Hello World!` text.

   3. The `greet()` function returns the current greeting.
   4. The `setGreeting()` function replaces the current greeting with a new one.

3. Compile the given code. You will receive an `.abi` file:
   
   Run the following commands in the directory, where the `greeter.sol` file is stored:

      1. ```solidity
         solcjs --bin greeter.sol
         ```
      
         As a result you will get a `greeter_sol_Greeter.bin` file.

      2. ```solidity
         solcjs --abi greeter.sol
         ```
      
         As a result you will get a `greeter_sol_Greeter.abi` file.

4. Replace the `greeter_sol_Greeter.abi` file extension from `.abi` to `.json` to let the code recognize it right.

## Deploy EVM smart contract

EVM smart contract deployment also requires tokens. Moreover, you have to pay more expensive commission for such kind of action.

To deploy an EVM smart contract:

1. Revert the `index.js` file to its initial state, described [here](./01-transactions.md#account-data-uploading-and-displaying-account-state).
2. Replace the first line in the file:

   ```javascript
   import { NetworkApi, WalletApi } from '@thepowereco/tssdk';
   ```
   
   with:

   ```javascript
   import { NetworkApi, WalletApi, TransactionsApi, EvmApi } from '@thepowereco/tssdk';
   ```
   
   The file will look like this:

   ```javascript
   import { NetworkApi, WalletApi, TransactionsApi, EvmApi } from '@thepowereco/tssdk';
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

3. Add the following code to the file:

   ```javascript
   //deploy smart-contract
   const code = readFileSync("greeter_sol_Greeter.bin");
   let deployTX= TransactionsApi.composeDeployTX(importedWallet.address,code.toString(),[],'',0,importedWallet.wif,"evm",networkApi.feeSettings,networkApi.gasSettings);
   let resDeploy=await networkApi.sendPreparedTX(deployTX);
   console.log(resDeploy);
   ```

4. Start this code from the terminal using the following command:

   ```bash
   node index.js
   ```

As a result you will see a deploy contract transaction:

```bash
dcloud_example % node index.js
import data {
  address: 'AA100001733086414002',
  wif: 'KywHx4qhG49JEms15jmgXDGMq7xKkmhQSpiZihWi5bbvL8QvjyUD'
}
accountData {
  amount: { SK: 110100000 },
  lastblk: '82C1D404FEBC267FCDE33252F9965D7836934B755BC17E6D7AB9D763BDE5A37D',
  preblk: 'CC0F76855B346A53AC8FA04F033B8150D92087AF98795ADBDAE8EA4CA7A57FD5',
  pubkey: '0207FE4A91CE18E398B8BF7DF7B3BF13D99712C1DB8F3FA856E43C9839452424E1'
}
{ txId: '3VWq91nneRZR5uXcR-c1033.gemsfinder', res: 'ok' }
```

:::caution Attention

The contract must be deployed on an address, specified by the first parameter of the `composeDeployTX` function. In the case described in these docs, the contract is now at the following address:

   ```javascript
   importedWallet.address
   ```

:::

## Calling EVM smart contract function locally

You can call EVM smart contract function locally to get the data from contract. To do this:

1. Revert the `index.js` file to its initial state, described [here](./01-transactions.md#account-data-uploading-and-displaying-account-state).
2. Replace the first line in the file:

   ```javascript
   import { NetworkApi, WalletApi } from '@thepowereco/tssdk';
   ```

   with:

   ```javascript
   import { NetworkApi, WalletApi, TransactionsApi, EvmApi } from '@thepowereco/tssdk';
   ```

3. Add the following line to the file:

   ```javascript
   import greeterAbi from './greeter_sol_Greeter.json' assert { type: "json" };
   ```

   This line imports the data from the `.abi` smart contract file, you have generated before. This data is used to automatically convert requests to smart contract.

   The file will look like this:

   ```javascript
   import { NetworkApi, WalletApi, TransactionsApi, EvmApi } from '@thepowereco/tssdk';
   import {readFileSync} from 'fs';
   import greeterAbi from './greeter_sol_Greeter.json' assert { type: "json" };

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
   console.log('accountData',accountData)
   
   //call function from smart-contract
   const storageSc = await EvmApi.build(importedWallet.address, subChain.chain, greeterAbi);
   const greetMessage = await storageSc.scGet(
   'greet',
   [],
   );
   console.log(greetMessage);
   ```

4. Add the following code to the file:

   ```javascript
   //call function from smart-contract
   const storageSc = await EvmApi.build(importedWallet.address, subChain.chain, greeterAbi);
   const greetMessage = await storageSc.scGet(
   'greet',
   [],
   );
   console.log(greetMessage);
   ```

5. Start the code by running the following command:

   ```bash
   node index.js
   ```
   
   The command outputs the following result:

   ```bash
   dcloud_example % node index.js
   (node:16086) ExperimentalWarning: Importing JSON modules is an experimental feature and might change at any time
   (Use `node --trace-warnings ...` to show where the warning was created)
   import data {
   address: 'AA100001733086414002',
   wif: 'KywHx4qhG49JEms15jmgXDGMq7xKkmhQSpiZihWi5bbvL8QvjyUD'
   }
   accountData {
   amount: { SK: 105064523.44 },
   code: 1660,
   contract: [ 'evm', 'EVM' ],
   lastblk: 'BCC621A4CFFF373369B68251B1FF4BE650494915E08A9251640F7DDCA9F6F3CB',
   preblk: '82C1D404FEBC267FCDE33252F9965D7836934B755BC17E6D7AB9D763BDE5A37D',
   pubkey: '0207FE4A91CE18E398B8BF7DF7B3BF13D99712C1DB8F3FA856E43C9839452424E1',
   seq: 1674401187596,
   state: 1,
   t: 1674401187596,
   usk: 1,
   view: [],
   vm: 'evm'
   }
   Hello World!
   ```

## Sending the EVM smart contract function call via a transaction

You can send the EVM smart contract function call via a transaction. To do this:

1. Revert the `index.js` file to its initial state, described [here](./01-transactions.md#account-data-uploading-and-displaying-account-state).
2. Replace the first line in the file:

   ```javascript
   import { NetworkApi, WalletApi } from '@thepowereco/tssdk';
   ```

   with:

   ```javascript
   import { NetworkApi, WalletApi, TransactionsApi, EvmApi } from '@thepowereco/tssdk';
   ```

3. Add the following line to the file:

   ```javascript
   import greeterAbi from './greeter_sol_Greeter.json' assert { type: "json" };
   ```

   This line imports the data from the `.abi` smart contract file, you have generated before. This data is used to automatically convert requests to smart contract.

   The file will look like this:

   ```javascript
   import { NetworkApi, WalletApi, TransactionsApi, EvmApi } from '@thepowereco/tssdk';
   import {readFileSync} from 'fs';
   import greeterAbi from './greeter_sol_Greeter.json' assert { type: "json" };

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
   console.log('accountData',accountData)
   
   //call function from smart-contract
   const storageSc = await EvmApi.build(importedWallet.address, subChain.chain, greeterAbi);
   const greetMessage = await storageSc.scGet(
   'greet',
   [],
   );
   console.log(greetMessage);
   ```

4. Add the following code to the file:

   ```javascript
   //send a smart-contract function call
   const storageSc = await EvmApi.build(importedWallet.address, subChain.chain, greeterAbi);

   const resSet = await storageSc.scSet(
   importedWallet,
   'setGreeting',
   ['New hello!'],
   );
   console.log(resSet);
   ```

5. Start the code by running the following command:

   ```bash
   node index.js
   ```

As a result, you will see the transaction result message. If the transaction is successful, you will see the following output:

```bash
dcloud_example % node index.js
(node:98047) ExperimentalWarning: Importing JSON modules is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
import data {
  address: 'AA100001733086414002',
  wif: 'KywHx4qhG49JEms15jmgXDGMq7xKkmhQSpiZihWi5bbvL8QvjyUD'
}
accountData {
  amount: { SK: 103104498.44 },
  code: 1660,
  contract: [ 'evm', 'EVM' ],
  lastblk: '298295D8FC695B41DED607F3AD1A88AA3930D245979BD2054B43D8DB4C45A5B4',
  preblk: '1B58AF728AB74C87B0E56CE99C1D118B8F983620E9C0F656AE19ACFD677BBA1B',
  pubkey: '0207FE4A91CE18E398B8BF7DF7B3BF13D99712C1DB8F3FA856E43C9839452424E1',
  seq: 1674467848612,
  state: 1,
  t: 1674467848612,
  usk: 2,
  view: [],
  vm: 'evm'
}
Transaction result: { txId: '3VWqJnn2Y47RVhhgC-c1033.debobus', res: 'ok' }
undefined
```

:::info Note

If you will try to repeat the code described in the section [**above**](#calling-evm-smart-contract-function-locally), in the console you will see the following output:

```bash
dcloud_example % node index.js
(node:32365) ExperimentalWarning: Importing JSON modules is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
import data {
  address: 'AA100001733086414002',
  wif: 'KywHx4qhG49JEms15jmgXDGMq7xKkmhQSpiZihWi5bbvL8QvjyUD'
}
accountData {
  amount: { SK: 102124485.94 },
  code: 1660,
  contract: [ 'evm', 'EVM' ],
  lastblk: '789A6495C33679AF46333257CE44D1501566578FEC517AC8222CD0611CE9573E',
  preblk: '298295D8FC695B41DED607F3AD1A88AA3930D245979BD2054B43D8DB4C45A5B4',
  pubkey: '0207FE4A91CE18E398B8BF7DF7B3BF13D99712C1DB8F3FA856E43C9839452424E1',
  seq: 1674467952302,
  state: 1,
  t: 1674467952302,
  usk: 3,
  view: [],
  vm: 'evm'
}
New hello!
```

As you can see, The result of a local function call is "New hello!" instead of a classic "Hello World!".

:::
