# Chains Layer

All platform nodes, in accordance with the chaining idea, are divided into separate mini-blockchains called chains. The combined set of shards and their interaction in Power_blockhain performs transactions, just like in a classic blockchain.
Shard is a blockchain with a small number of nodes operating based on the Resonance consensus algorithm. We call it a mini- blockchain to emphasize that its size is small compared to the Management layer blockchain.
Assume that the system includes n shards, system users are distributed evenly across all shards. Then the number of users in every shard will cshard = cusers_total / n. Let the user may choose a shard to send a transaction with equal probability among the shards. Then the probability that the transaction will be sent to itsownshardwillbe1/n.Givenn=3,weget the probability that the transaction will not leave the sender shard = 33%, and if n = 100, the probability of it becomes 1%. As can be seen for systems such as The Power (with a large number of parallel running Blockchains), a top priority is to ensure effective and safe inter-chain interaction.
For the purpose of all the shards together to perform as a single platform, the shards operate in a standardized way that allows for fast and reliable inter-chain interaction.

## Single address space

In the classic "monolithic" blockchain platform all of its customers interact directly with each other using the addressing rules of a particular platform. The interaction between customers of different blockchain platforms even built on the same code (forks) is difficult. The difficulty is not only due to the fact that the addressing rules may differ, but even if the rules are the same (just as in forks). In the first case, it is not clear how to address from one blockchain to another, in the second case it is unclear to which of two blockchain platforms this address may apply.
Despite the fact that the platform is based on a set of shards, it must look for the client as the single-space blockchain platform in usage. This requires that all shards are working in a single address space. Enabling a single address space for customers in all shards we also solve the problem of addressing between clients connected to different shards. This becomes a problem of finding customers in shards and routing between shards.
Therefore, the client sending a transaction doesn’t need to worry in which shard is a recipient of the transaction, when the shard recipient will receive information on customer transactions. Everything is managed by shards themselves.

In contrast to platforms where customer's address is a cryptographically processed public key, The Power platform uses common accounts registry to ensure a single address space. This method provides great opportunities but doesn’t make the system too complex:

- Address easily readable by a person and transferable to the other party using conventional methods.
- Versatility of cryptography type use. When adding new methods of asymmetric cryptography, there is no need to abandon old addresses.
- Simpler methods of the multi-signature use or even multi-signatures with hierarchy use.
- Smaller address size, especially in cases of multi-signatures and high bit depth cryptographic keys.

The system accounts addresses are divided into two types: used in private shards and in public shards. Any addresses stored requires 8 bytes from MSB to LSB. The highest three bits are used to indicate the address type (private or public). A value of 100 indicates a public address, 101 - private. Any other values of the three highest bits make an address invalid.

In general, the address has the following structure:

- for public address
  100GGGGG GGGGGGGG GGGBBBBB BBBBBBBB BBBBBBBB AAAAAAAA AAAAAAAA AAAAAAAA
- for private address
  101BBBBB BBBBBBBB BBBBBBBB BBBBBBBB BBBBBBBB AAAAAAAA AAAAAAAA AAAAAAAA

Where:
101 and 100 - type of address (private or public);
G - public address group ID;
B – address unit ID;
A – wallet ID in a unit.

To be human-readable, the addresses can be presented as text or hexadecimal format. The hexadecimal addresses are converted according to the rules of conversion from binary to hexadecimal notation.

Converting to text is performed according to the following rules:

- public addresses have the following format
  AADD LLLL LLLL LLLL LLCC (20 symbols length)

Where:
AA - two letters of the Latin alphabet, encoding two MSBs of the decimal representation of the group identifier in a number system to base 26.

The values of bits are coded as follows:

A-0, B-1, C-2, ..., Z- 25;

DD - two decimal LSBs of the group-identifier;

AADD – corresponds to G bits in binary representation.

L - decimal representation of block identifier and wallet in a block;

SS - checksum calculated by CRC32 algorithm.

Since the bit representation can not be accurately converted to decimal and 26-based, the conversion in AADD group may generate not more than 216 options, and in the group LLLL LLLL LLLL LL - not more than 245.

format HHHHHHHHHHHHHHHH CC (18 symbols) is used for private addresses, wherein:

H - hexadecimal representation of block ID and wallet ID;

SS - checksum calculated by CRC32 algorithm.

Registering of the address occurs after sending specialized transaction in the shard. In this transaction, public key/keys might be specified, as well as the results of the PoW (proof-of-work) might be shown. The PoW task is needed to counter the massive addresses registering attack. In case of high- speed address registrations in the system, the complexity of the PoW task will be raised by the Management layer. If the speed is normal, the PoW complexity will be reduced.
To enable smooth registration of public address, the Management layer assigns to each shard a pool of addresses G and B bits in the address mask. In case of imminent exhaustion of the address pool, the shard requests a new pool from the Management layer.

## Avoiding double spending

Due to the fact that most transactions are performed at the Shards Layer, and all the actions take place in separate shards, there are two options of "double spending" attacks.
The first option occurring in any classic blockchain platforms is an attack on the superiority on a particular time to enter invalid information in a new block, such as re- spending. In our platform, protection from attacks on the Shards layer is implemented through a Resonance consensus algorithm. At the platform level, the Validators layer is responsible for this problem. See detailed information in Validators layer section.
The second attack option abuses the feature described above - a single address space. The attacker may try to make expenses in several shards at the same time. Since the shards operate independently without receiving information on spending, they could have registered such transactions. To prevent these types of attacks, an additional rule is introduced in the platform:
The customer transaction is carried out only in the shard in which it is registered.
This rule is very similar to the behaviour of the phone in today’s cellular networks. Despite the availability of several radio spots, the cell phone automatically selects one and registers there to receive and send calls to the network.
Just like with a cell phone, the platform customer is free to choose the transition between any shards.

## Inter-chain interaction

The block validation mechanism is similar for all the shards. This allows you to check a transaction from one shard in another shard. All nodes contain information about the system structure.

## Triple recording rule

In order to guarantee the delivery of the transaction between shards, the platform uses the following mechanism called a "triple recording rule":

- The client sends a transaction and a transaction signature to the shard node in which he/she is currently registered. The node launches a consensus algorithm and transmits the transactions and signatures received by it to other nodes of the shard in order to include all new transactions in the new shard block. When forming a new data block, all transactions, wherein the transaction recipient is not registered in the same shard as sender, allocated in a separate section of the new data block. Thus, the new data block includes two sections:

  - section of the new data block including transactions which sender and recipient are registered in the same shard;
  - section of the new data block including transactions which sender and recipient are not registered in the same shard.

- After adding a new block in blockchain of sender shard, the nodes extract from this block data on all transactions with their MTP (Merkle Tree Proof) from the 2nd section. Then the node generates outgoing transactions packages with their MTP for each recipient shard. Each transaction package with their MTP contains the packet number for the recipient shard, address of the recipient shard, the title of the new data block, as well as transactions with their MTP.
- Then, the nodes belonging to the sender shard transmitted via communication channels all generated packages to at least one of the recipient nodes.
- When the recipient shards receive packages with transactions from sender shards, the nodes of recipient nodes shards first check the number of each transaction package. If the package number from sender shard exceeds the number recorded in the previous recipient shard of transactions package into two units or more, the nodes of recipient shards send the received packets with the transactions to the queue. Upon receipt of missing transaction packages, they go to the next step from the queue.
- The package with a number next after previously registered in the shard of recipient of the package is validated by the receiving shard nodes through the validation of all transactions contained in the package.
- After validation, the transaction package is included in the new shard recipient block, and the transactions of this package are applied to the receivers.
- After including the block with the transactions package to the recipient shard blockchain, the recipient shard sends an information to a sender shard information on including a transaction package in a new recipient shard data with confirmation in the form of MTP.
- When a sender shard node receives an information on including transactions package into a new data block of recipient shard with MTP, a sender shard node validates this MTP. After validation by the sender node shard, the information on including transactions package with MTP in the new shard block data, the node sends this information to be included in the new sender shard block. After this, the transaction registration is completed.

Let us describe the above process simply: the information about the transactions route is recorded three times. First, the transaction is registered in the sender shard (where the client is registered). Second, in the recipient shard where the transaction also finds its recipient customer. The third record is performed in the sender shard - the fact that the transaction has been successfully transferred is recorded. While this record has not appeared in the sender shard, its nodes will try to bring the transaction to the sender shard.

## Private shards

The private shards structure is somewhat different from the public shards. The main difference is that all of the nodes composing a private shard are controlled by private shard owner. The private shard has no validators, as the shard owner does not want to provide independent validators access to its data and there is no need for its own validators.
Although ensuring the information validity and smart contracts within the private shard is performed by the owner, there is still a problem of ensuring the immutability of the data recorded in the shard. To do this, we use a well-known anchoring mechanism. As has already become a classic method, a hash of the next block is located within a public blockchain thus placing the block hash in the protected environment.

However, in this case, the classic method is inapplicable: in order to confirm the validity of the information in the block located in the chain between blocks with anchored hashes, all the block chains might be collected till the block with anchored hash, and then all the hashes to be counted to verify the validity. To simplify interactions with honest shards, we offer to produce anchoring of each private shard block in the public space - Shards Layer. This seriously simplifies the interaction between the private and the public shards in the platform.

Also, the anchoring mechanism for private shards has been expanded the system. The public level of Shards Layer, upon receiving specialized anchoring transaction, verifies it, specifically:

- block number – the shard will not accept hash of a block with number different from the number next to the last block of the registered shard;
- block signature - the transaction should include signatures of nodes created a block. It checks whether the nodes signed this block are legitimate and whether the consensus has been achieved.

The owner of the private shard may record in the blockchain an information on the public key of the legitimate nodes of its shards. This eliminates the possibility of attackers to create their blocks in a private shard by adding illegitimate nodes. When checking the transaction, it will not be considered valid.
Another difference between the private and public shard: the public blockchain considers itself as a common public account, in which all of its assets are stored. So it is impossible to generate an asset and give it to another public account within the private shard. Only those assets that had previously been transferred to the account of the private shard can be transferred to other customers with public accounts. All tokens generated within the private shard can be transferred only within it.
