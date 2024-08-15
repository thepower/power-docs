# Three-level architecture

## The Power is a Blockchain platform with three- level architecture:

1. Shards layer.
   Multiple mini-Blockchains called shards. All working transaction interactions and smart contracts are performed at this layer.

2. Validators layer.
   This level is implemented to increase security of inter-chain (cross-shard) transactions. An inter-chain transaction not approved by the validators team will not be valid in a destination shard.

3. Management layer.
   This level includes only one blockchain consisted of all system nodes. The purpose of this chain is key systems platform management, including all nodes, shards and accounts.
   Classic blockchain is not divided by separate execution levels and has no interactions between the system levels. All the transactions had the same utility role.

## In the platform, the transactions are divided into:

1. utility transactions intended for the interactions between the system users. These transactions account for the vast majority of all transactions;

2. managing transactions intended for the management of the system elements to ensure its effective operation. Security of these transactions is critical to the platform.

The multi-layer architecture allows us to separate different types of transactions to increase overall performance. The utility transactions are carried out in Shards layer, which provides their scalability and minimizes transaction costs since the transactions are performed in separate shards. The managing transactions are performed at the Management layer, which increases their performance safety since all the nodes are involved in the transactions processing.
As a result, this interaction structure allows us to perform the most important functions in the most secure level of the platform, and the ordinary transactions are performed in less secure but more productive mini-blockchains (shards).
