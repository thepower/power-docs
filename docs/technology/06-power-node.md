# Power_node

The most important part of the platform is a network node. The system of cross-node interactions creates all vital functions of transactions registration services and decentralized code execution. What the network node is?

In Power_blockchain, the node is a combination of the following:

- Software allowing to perform consensus-finding in order to create a new block in the shard (Shards layer).
- Software allowing to perform consensus-finding in order to create a new block in the Management layer.
- Software that allowing to perform verification of new shard block at the Validators layer.
- Cryptographic key pair, through which other nodes can identify the relation of all service packs on the network during the nodes interaction.
- The system of node management access.

## Nodes ownership structure

In Power_blockchain, the right to manage the node is regulated by records in the blockchain. Technically, this right is given in the form of a special token (NT, Node Token). The account having this token is able to manage the node and owns it. Each token has an ID so that even in case of the owner change it does not affect a node identification.
All Node Token s are initially stored in the system smart contract. The user can get a Node Token by transferring SK tokens to the address of the smart contract. If the user has decided to refuse the node, he can transfer NТ token to the system smart contract and get back SK tokens.

The Node Token entitles the account to which it is assigned to change the node public key. Thus, the node owner can not worry about the private key theft if a fraud gains physical access to the server with node software. In such a situation, the account owner can generate a new pair of cryptographic keys and register the public key in blockchain as the new key in a second. When a new key is registered, a node captured with the old key will be recognized as invalid and will not be taken into account in the course of the system operation.

## Node roles

In classical decentralized platforms, a system node is a combination of platform software and hardware. Typically, one node as a server unit performs one role, e.g. blocks producer or validator. However, a Power_blockchain node simultaneously performs three roles:

- Participates in the platform management as a part of Management layer;
- Handles user transaction as a part of a shard;
- Verifies the blocks generated in other shards as a validator at the Validators layer.

Thus, there is no need to require that all roles were performed by a single software on a single server. As noted above, each role in Power_blockchain has its own software. And due to the fact that the system of node ownership is secure and there is no need for a high level of cryptographic keys storage security, each role can be performed both on the same physical or virtual server and on different ones.
