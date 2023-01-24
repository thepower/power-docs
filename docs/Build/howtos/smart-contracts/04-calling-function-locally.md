# Calling EVM smart contract function locally

You can call EVM smart contract function locally to get the data from contract. To do this:

1. Revert the `index.js` file to its initial state, described [here](../transactions/working-with-accounts/02-upload-account-data-display-state.md).
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
