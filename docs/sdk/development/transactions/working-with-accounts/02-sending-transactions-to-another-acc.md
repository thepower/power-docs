# Sending a transaction to another account

To send a transaction within the system you need to pay commission. That is why, you need to have sufficient amount of tokens to send the transaction. The code `console.log('accountData',accountData)` from the `showAccountInfo.js` example above outputs the account data. The `amount` field in the output will also display the tokens assigned to the account.

Code example and comments:

```javascript title="sendTransferTx.js"
import { NetworkApi, WalletApi, Num } from '@thepowereco/tssdk';
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
//find the chain where the account is 
let subChain = await letNetworkApi.getAddressChain(importedWallet.address);
const networkApi = new NetworkApi(subChain.chain);
await networkApi.bootstrap();
const walletApi = new WalletApi(networkApi);
const accountData= await walletApi.loadBalance(importedWallet.address);
console.log('accountData',accountData);

//send 10 tokens to another account
let to='AA100001733086416001';
let amount=0.000000001;
let comment='test';
let res= await walletApi.makeNewTx (importedWallet.wif,importedWallet.address,to,'SK',amount,comment,new Date().getTime());
console.log(res);
```

:::caution

The account address

```javascript
let to='AA100001733086413603';
```

specified in `sendTransferTx.js` is an example address. Please, replace it with your actual destination address.

:::

Check out the next document to learn how to work with smart contracts.