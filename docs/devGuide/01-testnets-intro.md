# What is a testnet in DCloud?

The testnet is a network consisting of three or more nodes. The testnets can be public or local.

The testnet is a powerful tool aimed to help you contribute to web3 as:

- a DCloud developer,
- a developer using DCloud as a core service for app development,
- a researcher who wants to learn something new about the technology.

## Local testnet

A local testnet is a network consisting of nodes virtually created by you on your machine.

The local testnet could be a good idea if you need to:

- test how the network works,
- run autotests for your DApps, or
- customize your node to satisfy your needs.

Before using the local testnet, you need to build and start the node from [source code](../build-and-start-a-node/02-startingTpNode_source.md) or [Docker image](../build-and-start-a-node/01-startingTpNode_docker.md).

Use our [guide](./02-local-testnet.md) to start your local testnet.

## Public testnet

A public testnet is a network formed by user nodes.

Testnet allows you to:

- deploy your DApps code (smart contracts, decentralized backend),
- connect your DApp to the testnet and interact with it by reading and writing the DApp frontend data using the [Power API](https://doc.thepower.io/docs/api/common-terms), or
- run autotests for your DApps.

Before using the public testnet, you need to build and start the node from [source code](../build-and-start-a-node/02-startingTpNode_source.md) or [Docker image](../build-and-start-a-node/01-startingTpNode_docker.md).

> **Note**
>
> You don't need to start a network if you want to use the public testnet. Just run the node and enjoy the Power!

When connecting your node to the public testnet, you connect it to either a new or an existing chain.

After you've connected your node to the testnet, it starts to take part in [Consensus](https://doc.thepower.io/docs/technology/resonance-consensus). You can also connect your node as a Seed node.

> **Note**
>
> Only the nodes specified in `genesis.txt` can participate in Consensus in this version. The functionality of connecting to chains without specifying your node in `genesis.txt` will be added in future releases.