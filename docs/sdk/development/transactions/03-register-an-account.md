<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Register an account](#register-an-account)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Register an account

1. Ensure you are in `dcloud_example` directory, and you have [installed the Power SDK](../02-quick-start.md).
2. Execute the following command:

   ```bash
   yarn
   ```

3. Start up `register.js` in terminal using the following command to register an account:

   ```bash npm2yarn
   node register.js
   ```

   Code example and comments:

   ```javascript title="register.js"
   import { NetworkApi, WalletApi } from '@thepowereco/tssdk';
   import {writeFileSync} from 'fs';
   
   //register in chain number 1033
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
   
:::info

You can find your actual account address in `address` field. You will need it in the next tasks.

Now you can work with [transactions](01-intro.md) and [smart contracts](../smart-contracts/01-intro.md).