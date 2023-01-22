# Working with EVM smart contracts

## Table of contents

<!-- START doctoc -->
<!-- END doctoc -->

## Introduction

This manual will help you work with the EVM smart contracts.

:::warning

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

1. Revert the `index.js` file to its state, described [here](./01-transactions.md#account-data-uploading-and-displaying-account-state).
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

:::attention

The contract must be deployed on an address, specified by the first parameter of the `composeDeployTX` function. In the case described in these docs, the contract is now at the following address:

   ```javascript
   importedWallet.address
   ```

:::
