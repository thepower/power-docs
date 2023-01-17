# Transactions



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

1. Create an `index.js` file in any editor you use and copy the following code there:

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

   ```