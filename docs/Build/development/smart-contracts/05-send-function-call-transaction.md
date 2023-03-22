# Sending the EVM smart contract function call via a transaction

You can send the EVM smart contract function call via a transaction. To do this:

1. Ensure you are in `dcloud_example` directory.
2. Ensure you have `greeter_sol_Greeter.json` file in your directory. The following line of code imports data from this file:

   ```javascript
   import greeterAbi from './greeter_sol_Greeter.json' assert { type: "json" };
   ```

   This data is used to automatically convert requests to smart contract.

3. Start the code by running the following command:

   ```bash
   node index.js
   ```

As a result, you will see the transaction result message. If the transaction is successful, you will see the following output:

```bash
 % node getScData.js 
(node:55768) ExperimentalWarning: Importing JSON modules is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
import data {
  address: 'AA100001733086416001',
  wif: 'L12trJ1suQMKCEWfTC6Ng5pn8mRwjaTBuwTN2K1M9tEF4y39sY9t'
}
accountData {
  amount: { SK: 14.398451094 },
  code: 1660,
  contract: [ 'evm', 'EVM' ],
  lastblk: '9944ACCC4CF3B451457D8EB3CD62A58CF60C7C4940686F91883CF4506ACDA6E1',
  preblk: 'E1833D1BB436257C88CC9083214B2CA58AE841F8DA627BAD14227D0FE60A1A04',
  pubkey: '034589D99AF47F882DE1C53B53C9A53F1C53F2D7B1E0DA28F07C6D9D50DC7C9BA5',
  seq: 1679511800248,
  state: 1,
  t: 1679511800248,
  usk: 2,
  view: [],
  vm: 'evm'
}
New hello!
```

:::info Note

If you try to repeat the code described in the section [**above**](#calling-evm-smart-contract-function-locally), in the console you will see the following output:

```bash
 % node callScTx.js 
(node:55960) ExperimentalWarning: Importing JSON modules is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
import data {
  address: 'AA100001733086416001',
  wif: 'L12trJ1suQMKCEWfTC6Ng5pn8mRwjaTBuwTN2K1M9tEF4y39sY9t'
}
accountData {
  amount: { SK: 14.398451094 },
  code: 1660,
  contract: [ 'evm', 'EVM' ],
  lastblk: '9944ACCC4CF3B451457D8EB3CD62A58CF60C7C4940686F91883CF4506ACDA6E1',
  preblk: 'E1833D1BB436257C88CC9083214B2CA58AE841F8DA627BAD14227D0FE60A1A04',
  pubkey: '034589D99AF47F882DE1C53B53C9A53F1C53F2D7B1E0DA28F07C6D9D50DC7C9BA5',
  seq: 1679511800248,
  state: 1,
  t: 1679511800248,
  usk: 2,
  view: [],
  vm: 'evm'
}
New hello!
Transaction result: {
  txId: '3VWtLkYM5QzpkLinT-c1033.debobus',
  res: 'ok',
  block: 'C8F8DEE7AE0A59FE7D1094C7FD4E6AB816A170FA6A4BC72D516FEB451ECAEDF0'
}
{
  txId: '3VWtLkYM5QzpkLinT-c1033.debobus',
  res: 'ok',
  block: 'C8F8DEE7AE0A59FE7D1094C7FD4E6AB816A170FA6A4BC72D516FEB451ECAEDF0'
}

```

As you can see, The result of a local function call is "New hello!" instead of a classic "Hello World!".

:::