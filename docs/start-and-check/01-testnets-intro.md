<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [What is a testnet in DCloud?](#what-is-a-testnet-in-dcloud)
  - [Introduction](#introduction)
  - [Terminology](#terminology)
  - [Public testnet](#public-testnet)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# What is a testnet in DCloud?

<!-- start DOCTOC -->
<!-- end DOCTOC -->

## Introduction

The testnet is a testing network, consisting of nodes divided into chains. The main purposes of testnet are to:

- test the survivability of the network under different workloads; 
- test the connectivity of nodes in different configurations; 
- test the survivability of chains in different configurations; 
- test different DCloud services.

The testnets can be public or local. Technically, local testnet is a local-hosted test chain — temporary network of three local-hosted nodes used for testing. For more information about the test chain, please, refer to "Local Testnet" page.

The testnet is a powerful tool aimed to help you contribute to web3 as:

- a DCloud developer,
- a developer using DCloud as a core service for app development,
- a researcher who wants to learn something new about the technology.

## Terminology

- **Community nodes** — nodes, run by users, or node providers. They form chains, that form a testnet.
- **Node providers** — users, who connect their servers with the Power software to our network and provide their computing resources.

## Public testnet

A public testnet is a network formed by Community nodes and run by node providers.

Testnet allows you to:

- deploy your DApps code (smart contracts, decentralized backend),
- connect your DApp to the testnet and interact with it by reading and writing the DApp frontend data using the [Power API](../api/01-common-terms.md), or
- run autotests for your DApps.

Before using the public testnet, you need to build and start the node: 

- from [source code](build-and-start-a-node/06-startingTpNode_source.md) (for advanced users only), 
- from [Docker image](build-and-start-a-node/05-startingTpNode_docker.md), or
- using [`docker-compose`](build-and-start-a-node/07-startingTpNode_docker_compose.md) (recommended).

Use our [guide](02-testnet-start.md) to start your public testnet.

When connecting your node to the public testnet, you connect it to either a new or an existing chain.

After you've connected your node to the testnet, it starts to take part in [Consensus](../terms_technologies/technology/03-resonance-consensus.md). You can also connect your node as a [Seed node](../terms_technologies/basic-terms/01-101.md#nodes).

> **Note**
>
> Only the nodes specified in `genesis.txt` can participate in Consensus in this version. The functionality of connecting to a chain without specifying your node in `genesis.txt` will be added in future releases.