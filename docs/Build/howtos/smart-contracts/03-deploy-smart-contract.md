# Deploy EVM smart contract

EVM smart contract deployment also requires tokens. Moreover, you have to pay more expensive commission for such kind of action.

To deploy an EVM smart contract:

1. Revert the `index.js` file to its initial state, described [here](../transactions/01-intro.md#account-data-uploading-and-displaying-account-state).
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
