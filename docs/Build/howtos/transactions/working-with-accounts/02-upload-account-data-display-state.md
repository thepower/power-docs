# Account data uploading and displaying account state

Follow the steps below to upload the account data and then display the account state:

1. Delete or comment the current `index.js` file content.
2. Copy the following code into the file:

   ```javascript
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
   let subChain = await letNetworkApi.getAddressChain(importedWallet.address);
   const networkApi = new NetworkApi(subChain.chain);
   await networkApi.bootstrap();
   const walletApi = new WalletApi(networkApi);
   const accountData= await walletApi.loadBalance(importedWallet.address);
   console.log('accountData',accountData);
   ```

3. Run this code in the terminal by running the following command:

   ```bash
   node index.js
   ```

   The account information loaded from the file, and then from the blockchain will be displayed in the terminal subsequently:

   ```bash
   dcloud_example % node index.js
   import data {
   address: 'AA100001733086414002',
   wif: 'KywHx4qhG49JEms15jmgXDGMq7xKkmhQSpiZihWi5bbvL8QvjyUD'
   }
   accountData {
   amount: {},
   lastblk: 'CF298CFA64D7CD1FB420034E19BE2C1AD1BAE59610AEA51F3061E0ADEFAFC8B0',
   pubkey: '0207FE4A91CE18E398B8BF7DF7B3BF13D99712C1DB8F3FA856E43C9839452424E1'
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
