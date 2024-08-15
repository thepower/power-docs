
# Deploy EVM smart contract

EVM smart contract deployment also requires tokens. Moreover, you have to pay more expensive commission for such kind of action.

To deploy an EVM smart contract:

1. Ensure you are in `dcloud_example` directory.
2. Start `deploySc.js` from the terminal using the following command:

   ```bash
   node deploySc.js
   ```

Code examples and comments:

   ```javascript title="deploySc.js"
   import { NetworkApi, WalletApi, TransactionsApi } from '@thepowereco/tssdk';
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
   
   //deploy smart-contract
   const code = readFileSync("greeter_sol_Greeter.bin");
   let deployTX= TransactionsApi.composeDeployTX(importedWallet.address,code.toString(),[],'',0,importedWallet.wif,"evm",networkApi.feeSettings,networkApi.gasSettings);
   let resDeploy=await networkApi.sendPreparedTX(deployTX);
   console.log(resDeploy);
   ```

As a result you will see a contract deployment transaction:

```bash
node deploySc.js       
import data {
  address: 'AA100001733086416001',
  wif: 'L12trJ1suQMKCEWfTC6Ng5pn8mRwjaTBuwTN2K1M9tEF4y39sY9t'
}
accountData {
  amount: { SK: 15 },
  lastblk: 'C277BE883DC6E934E8EEDFACCF6D04EFCAD4EFFC4954BC12C137069C7B99D937',
  preblk: 'D28DDE54D920F67D430E2EAA0B90A94077907AD6EBC6F5ED3219C61E57949182',
  pubkey: '034589D99AF47F882DE1C53B53C9A53F1C53F2D7B1E0DA28F07C6D9D50DC7C9BA5'
}
{
  txId: '3VWtEEYrVKRDbZQNE-c1033.debobus',
  res: 'ok',
  block: 'E1833D1BB436257C88CC9083214B2CA58AE841F8DA627BAD14227D0FE60A1A04'
}

```

:::caution Attention

The contract must be deployed on an address, specified by the first parameter of the `composeDeployTX` function. In the case described in these docs, the contract is now at the following address:

   ```javascript
   importedWallet.address
   ```

:::
