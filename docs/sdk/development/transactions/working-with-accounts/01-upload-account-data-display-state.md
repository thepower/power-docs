# Account data uploading and displaying account state

Follow the steps below to upload the account data and then display the account state:

1. Ensure you are in `dcloud_example` directory.

2. Run `showAccountInfo.js` in the terminal by running the following command:

   ```bash
   node showAccountInfo.js
   ```

   Code example and comments:

   ```javascript title="showAccountInfo.js"
   import { NetworkApi, WalletApi } from '@thepowereco/tssdk';
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
   ```

   The account information loaded from the file, and then from the blockchain will be displayed in the terminal subsequently:

   ```text
   dcloud_example % node showAccountInfo.js       
   import data {
   address: 'AA100001733086416001',
   wif: 'L12trJ1suQMKCEWfTC6Ng5pn8mRwjaTBuwTN2K1M9tEF4y39sY9t'
   }
   accountData {
   amount: {},
   lastblk: 'D28DDE54D920F67D430E2EAA0B90A94077907AD6EBC6F5ED3219C61E57949182',
   pubkey: '034589D99AF47F882DE1C53B53C9A53F1C53F2D7B1E0DA28F07C6D9D50DC7C9BA5'
   }

   ```

The part of `NetworkApi` library can be used differently in the code above. Let's check out the usages of this library part:

1. ```javascript
   const importNetworkApi = new NetworkApi(1025);
   ```

   This constant creates an instance of `NetworkApi` and uses 1025 chain parameter (chain 1025 is one of the first chains in the testnet).

   ```javascript
   const importWalletApi = new WalletApi(importNetworkApi);
   ```

   This constant creates an instance of `WalletApi`, linking to `NetworkApi` instance.

   Here you don't need to think of what number of chain to use. The most important is that it is valid. The point is that `importWalletApi` is used only for processing the local file that contains the account data. That is why, there is no need in full network library initialization.

2. ```javascript
   const letNetworkApi = new NetworkApi(1025);
   ```

   This constant creates an instance of `NetworkApi` and uses 1025 chain parameter (chain 1025 is one of the first chains in the testnet).

   ```javascript
   await letNetworkApi.bootstrap();
   ```

   This method initializes the network library by uploading information about the nodes of chain 1025.

   ```javascript
   let subChain = await letNetworkApi.getAddressChain(importedWallet.address);
   ```

   This method invokes chain 1025 API and requests to search the chain, to which the account imported from file belongs.

3. ```javascript
   const networkApi = new NetworkApi(subChain.chain);
   ```

   This constant creates an instance of `NetworkApi` with the chain parameter that conforms the account, about which the data will be received in the future.

   ```javascript
   await networkApi.bootstrap();
   ```

   Initialize the chain described above and receive data about the nodes it contains.
