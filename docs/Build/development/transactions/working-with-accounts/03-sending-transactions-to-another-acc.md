# Sending a transaction to another account

To send a transaction within the system you need to:

1. Pay commission. That is why, you need to have sufficient amount of tokens to send the transaction. The code `console.log('accountData',accountData)` from the example in the code snippet above outputs the account data. The `amount` field will also display the tokens assigned to the account.

2. Add the following code to the code example specified in paragraph 2 of [the section above](#account-data-uploading-and-displaying-account-state):

   ```javascript
   //send 10 tokens to another account
   let to='AA100001733086413603';
   let amount=10;
   let comment='test';
   let res= await walletApi.makeNewTx (importedWallet.wif,importedWallet.address,to,'SK',amount,comment,new Date().getTime());
   console.log(res);
   ```

   :::warning

   The account address

   ```javascript
   let to='AA100001733086413603';
   ```

   is an example address. Please, replace it with your actual destination address.

   :::

Check out the next document to learn how to work with the transactions.