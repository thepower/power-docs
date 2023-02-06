# Nodes and chains basics

**Table of Contents**

   - [Introduction](#introduction)
   - [Nodes](#nodes)
      - [Power Node Consensus](#power-node-consensus)
   - [Chains](#chains)

## Introduction

This article is aimed to help you understand the basic terms used in the Power Docs.

## Nodes

Let's assume, there are several servers with the same software configuration, except for the server addresses and cryptographic keys. This software builds a decentralized network among the servers based on the blockchain technology. The servers are network nodes, called **Power Nodes**.

Three or more nodes form a chain, or a shard. The terms "chain" and "shard" mean the same, but "chain" is more often to hear in the blockchain community. We can also say that the nodes form a network. The network consists of chains of three or more nodes.

There are three types of nodes:

1. **Consensus nodes** are an essential component of the Power DCloud infrastructure that connects to a chain and participates in consensus with other nodes to build blocks and perform computations of smart contracts and decentralized backend.
2. **Seed nodes** are the nodes that connect to a chain and provide a copy of the blockchain to users upon request, like a CDN network of decentralized RPC providers. Seed nodes serve as a network of decentralized RPC providers, connecting to a chain and providing a copy of the blockchain to users upon request, much like a CDN network. This ensures that users have access to a reliable copy of the blockchain for their needs.
3. **Storage nodes** are the nodes that store frontend code, NFT data, or files in a decentralized way. Decentralized Storage (DStorage) allows users to store files in a truly decentralized manner, eliminating the need for centralized Web2 Clouds, and giving the user control over the number of copies of the file that should be created. The files are stored with access through HTTP standards, allowing users to reach them through different software such as browsers.

### Power Node Consensus

To provide communication between servers, or nodes, the servers must follow the Consensus rules.

The consensus is written by developers and architects. There are a lot of implementations of consensus. The Power Ecosystem uses the [Resonance Consensus Implementation](../technology/03-resonance-consensus.md).

The consensus results in a new **block** in a chain. 

The block is a data structure describing the block number, its ID, transactions processed by the block, and the result of the processing.

## Chains

These TP-Nodes communicate with each other, depending on the configuration file named `node.config`. This file tells the nodes, how exactly they can find other nodes.

There are four different types of chains:

- **Community chains**. These chains are public networks, available for all users, developers, and projects supported by the Power Ecosystem community of node providers (DAO).

   The only way for node providers to participate in network consensus is to lock a number of native utility tokens (tokens giving the right for a future product or service) and mint NFT.

- **AppChains**. These chains work same as the community chains, but the app in this type of chain has the right to deploy smart contracts in the AppChain. 

  To get the right to form a chain in a public network and give the right to node providers to connect and maintain it, a project must lock a number of native utility tokens and mint NFT. Only NFT owners in an AppChain have the right to deploy DApps to it.
  
  The AppChain is a chain that has special purposes: it serves DAO, DEX, GameFi, Metaverse, and a broad variety of other decentralized services.

  The AppChain is supported by the Power Ecosystem community of node providers.

- **Satellite chains**. These are public chains supported by external node provider communities. They have a special native token instead of ours. They are connected to the Power Ecosystem network. This means that the transactions from the Power Ecosystem network are anchored there.

  Dedicated communities mint NFT with the rights to connect their chains to the whole network like private chains.

- **Private chains**. These chains are centralized blockchain network for business purposes. They work in a private business infrastructure.

  Businesses mint NFT with the right to connect the private chain to a public network and communicate with other users from community, project, private, or satellite chains via the native interchain protocol. Public network users can anchor transactions to these private chains.