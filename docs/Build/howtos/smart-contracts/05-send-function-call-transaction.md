# Sending the EVM smart contract function call via a transaction

You can send the EVM smart contract function call via a transaction. To do this:

1. Revert the `index.js` file to its initial state, described [here](../transactions/01-intro.md#account-data-uploading-and-displaying-account-state).
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