# Block operations

| Title            | Description                                                                                             |
| :--------------- | :------------------------------------------------------------------------------------------------------ |
| url request      | `/api/block/{hash}`                                                                                     |
| Request type     | GET                                                                                                     |
| Input parameters | `{hash}` - the hash of the block, or the word "last", if it is necessary to get latest generated block. |

Response:

```bash
{
    "block":
    {
        "bals": {...},
        "hash": "...",
        "child": "...",
        "header": {...},
        "outbound": [...],
        "settings": [...],
        "sign": [...],
        "txs": {...},
    },
    "result": "ok"
}
```

Assignment of response fields:

| Field    | Descripton                                                                                                    |
| :------- | :------------------------------------------------------------------------------------------------------------ |
| block    | An object containing information about a block                                                                |
| bals     | An object containing information about the balance of the wallets affected by the transactions in the block   |
| hash     | hash of the block                                                                                             |
| child    | hash of the next block in the blockchain. It may be absent if the current block is the newest in its own unit |
| header   | an object containing the block header                                                                         |
| outbound | Transactions to be transferred to other chains                                                                |
| settings | patches on the configuration of the chain                                                                     |
| sign     | array of signatures of the block                                                                              |
| txs      | An object containing information about the transactions in the block                                          |

Object "bals":
Response:

```js
{
  "8001400002000001":
  {
    "amount": {...},
    "lastblk": "...",
    "seq": Х,
    "t": Х
  }
}
```

- "8001400002000001" - address of the wallet in the binary representation in the form of hex;
- "amount" - an object that contains information about the balance of the wallet. The object fields are currency designations, and their values are the balanced in each wallet currency;
- "lastblk" - hash of the last block, showing operations with this wallet;
- "seq" is the last non-repeated sequential number of the outgoing transactions;
- "t" is the timestamp in milliseconds.

The object containing the block header has the following structure:

Response

```json
{ "balroot":"...",

  {
      "balroot":"...",
      "chain":Х,
      "height":Х,
      "ledger_hash":"...",
      "settings_hash":"...",
      "parent":"...",
      "txroot":"..."
  }

```

- "balroot" - merkle tree root of wallet snapshots in the block (absent in the fields with no ledger);
- "chain" - the number of the subchains;
- "height" - block height;
- "ledger_hash" is the root of the merkle tree ledger, which should be obtained AFTER deriving the transactions from the block (absent in the cells without ledger);
- "settings_hash" is the merkle tree ledger root, which should be obtained AFTER applying patches to the configuration of the cell from the block (may be absent);
- "parent" - the hash of the previous block in the blockchain;
- "txroot" is the root of merkle tree transactions in the block;

Object "txs":
Response:

```bash
{
  "15190FBE2E428790-XUkvyU3JvUoMPyHEhkCKnsbD7jT-03":
    {
      "amount":Х,
      "cur":"...",
      "extradata":"{...}",
      "from":"...",
      "seq":Х,
      "sig": {...},
      "sigverify":
        {
          "invalid":Х,
          "valid":Х
        },
      "timestamp":Х,
      "to":"...",
      "type":"tx"
```

- "15190FBE2E428790-XUkvyU3JvUoMPyHEhkCKnsbD7jT-03" - example of transaction identifier
- "amount" - transaction sum;
- "cur" - transaction currency;
- "extradata" - arbitrary additional information added to the transaction;
- "from" - address of the wallet of the sender for transaction;
- "seq" is a non-repeating sequence number of the transaction originating from its sender;
- "sig" is an object in which the public key of the wallet that created the transaction is used as the field title and the signature of this transaction as the field value;
- "sigverify" - an object containing the number of invalid signatures in the invalid fields, and the number of valid signatures in valid fields;
- "timestamp" - time-stamp for creating a transaction in milliseconds;
- "to" - address of the wallet of the recipient of the transaction;
- "type": "tx" is a transaction characteristic.

The array of signatures of the block contains objects with the following structure:
Response:

```bash
{ "binextra": "...",
  "extra": {
    "pubkey": "...",
    "timestamp": Х,
    "createduration": Х
  },
  "nodeid": "...",
  "signature": "..."
}
```

- "extra" - additional information of the signing node (for example timestamp);
- "binextra" - the same additional information in the original binary form (for verifying the signature);
- "nodeid" - the identifier of the node that issued the signature (it is computed from pubkey);
- "signature" - a signature.
