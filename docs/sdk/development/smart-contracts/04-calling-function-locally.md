<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Calling EVM smart contract function locally](#calling-evm-smart-contract-function-locally)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Calling EVM smart contract function locally

You can call EVM smart contract function locally to get the data from contract. To do this:

1. Ensure you are in `dcloud_example` directory.
2. Start `callScTx.js` by running the following command:

   ```bash
   node callScTx.js
   ```

   Code example and comments:

   ```javascript title="callScTx.js"
   import { NetworkApi, WalletApi, EvmCore, EvmContract } from '@thepowereco/tssdk';
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
   
   //call function from smart-contract locale
   const EVM = await EvmCore.build(networkApi);
   const storageSc = await EvmContract.build(EVM,importedWallet.address, greeterAbi);
   const greetMessage = await storageSc.scGet(
   'greet',
   [],
   );
   console.log(greetMessage);
   
   //call function from smart-contract in blockchain
   const resSet = await storageSc.scSet(
   importedWallet,
   'setGreeting',
   ['New hello!'],
   );
   console.log(resSet);
   ```

The command outputs the following:

```bash
   % node callScTx.js
(node:54656) ExperimentalWarning: Importing JSON modules is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
import data {
  address: 'AA100001733086416001',
  wif: 'L12trJ1suQMKCEWfTC6Ng5pn8mRwjaTBuwTN2K1M9tEF4y39sY9t'
}
accountData {
  amount: { SK: 14.496452344 },
  code: 1660,
  contract: [ 'evm', 'EVM' ],
  lastblk: 'E1833D1BB436257C88CC9083214B2CA58AE841F8DA627BAD14227D0FE60A1A04',
  preblk: 'C277BE883DC6E934E8EEDFACCF6D04EFCAD4EFFC4954BC12C137069C7B99D937',
  pubkey: '034589D99AF47F882DE1C53B53C9A53F1C53F2D7B1E0DA28F07C6D9D50DC7C9BA5',
  seq: 1679510688481,
  state: 1,
  t: 1679510688480,
  usk: 1,
  view: [],
  vm: 'evm'
}
Hello World!
Transaction result: {
  txId: '3VWtHVYbnN2VNk9xw-c1033.debobus',
  res: 'ok',
  block: '9944ACCC4CF3B451457D8EB3CD62A58CF60C7C4940686F91883CF4506ACDA6E1'
}
{
  txId: '3VWtHVYbnN2VNk9xw-c1033.debobus',
  res: 'ok',
  block: '9944ACCC4CF3B451457D8EB3CD62A58CF60C7C4940686F91883CF4506ACDA6E1'
}
```
