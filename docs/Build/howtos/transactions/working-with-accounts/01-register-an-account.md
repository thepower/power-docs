# Write the code that will register an account

1. Create an `index.js` file in the `dcloud_example` directory in any editor you use and copy the following code there:

   ```javascript
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