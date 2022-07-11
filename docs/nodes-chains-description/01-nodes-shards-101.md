# Nodes and chains one-o-one

This article is aimed to help you understand the basic terms used in the Power Docs.

## Nodes

Let's assume, there are several servers with the same software configuration, except for the server addresses and cryptographic keys. This software builds a decentralized network among the servers based on the blockchain technology. The servers are network nodes, called **Power Nodes**, or **TP-Nodes**.

Three or more TP-nodes form a chain, or a shard. The terms "chain" and "shard" mean the same, but "chain" is more often to hear in the blockchain community. We can also say that the nodes form a testnet. Testnet consists of chains of three or more nodes.

There are two types of nodes:

1. **Consensus node**. It is a node that connects to a chain and participate in Consensus with other Consensus nodes.
2. **Seed node**. It is a node that connects to a chain of nodes, receives a copy of a blockchain, and can provide it to the users upon request.

### TP-Node Consensus

To provide such kind of communication between servers, the servers must follow the consensus rules.

The consensus is written by developers and architects. There are a lot of implementations of consensus. The Power Ecosystem uses the [Resonance Consensus Implementation](https://doc.thepower.io/docs/technology/resonance-consensus).

The consensus results in a new **block** in a chain. 

The block is a data structure describing the block number, its ID, transactions processed by the block, and the result of the processing.

## Chains

These TP-Nodes communicate with each other, depending on the configuration file named `node.config`. This file tells the nodes, how exactly they can find other nodes.

There are four different types of chains:

- **Community chains**. These chains are public networks, available for all users, developers, and projects supported by the Power Ecosystem community of node providers (DAO).

   The only way for node providers to participate in network consensus is to lock a number of native utility tokens (tokens giving the right for a future product or service) and mint NFT.

- **Project chains**. These chains work same as the community chains, but the project in this type of chain has the right to deploy smart contracts in the project chain. 

  To get the right to form a chain in a public network and give the right to node providers to connect and maintain it, a project must lock a number of native utility tokens and mint NFT. Only NFT owners in a project chain have the right to deploy DApps to it.
  
  The project chain is a chain that has special purposes: it serves DAO, DEX, GameFi, Metaverse, and a broad variety of other decentralized services.

  The project chain is supported by the Power Ecosystem community of node providers.

- **Satellite chains**. These are public chains supported by external node provider communities. They have a special native token instead of ours. They are connected to the Power Ecosystem network. This means that the transactions from the Power Ecosystem network are anchored there.

  Dedicated communities mint NFT with the rights to connect their chains to the whole network like private chains.

- **Private chains**. These chains are centralized blockchain network for business purposes. They work in a private business infrastructure.

  Businesses mint NFT with the right to connect the private chain to a public network and communicate with other users from community, project, private, or satellite chains via the native interchain protocol. Public network users can anchor transactions to these private chains.