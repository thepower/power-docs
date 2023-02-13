# Seed node: theory and starting

**Table of contents**

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Introduction](#introduction)
- [Seed nodes theory](#seed-nodes-theory)
- [How to use the Seed node?](#how-to-use-the-seed-node)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

There are three types of nodes used in The Power Ecosystem:

1. **Consensus nodes** are an essential component of the Power DCloud infrastructure that connects to a chain and participates in consensus with other nodes to build blocks and perform computations of smart contracts and decentralized backend.
2. **Seed nodes** are the nodes that connect to a chain and provide a copy of the blockchain to users upon request, like a CDN network of decentralized RPC providers. Seed nodes serve as a network of decentralized RPC providers, connecting to a chain and providing a copy of the blockchain to users upon request, much like a CDN network. This ensures that users have access to a reliable copy of the blockchain for their needs.
3. **Storage nodes** are the nodes that store frontend code, NFT data, or files in a decentralized way. Decentralized Storage (DStorage) allows users to store files in a truly decentralized manner, eliminating the need for centralized Web2 Clouds, and giving the user control over the number of copies of the file that should be created. The files are stored with access through HTTP standards, allowing users to reach them through different software such as browsers.

Go to [Nodes and chains basics](../../Explore/nodes-chains-description/01-nodes-shards-101.md) page to get more information on types of nodes and chains.

## Seed nodes theory

As determined above, Seed nodes store and spread the copy of blockchain data, but don't participate in Consensus on creating new blocks.

**Seed nodes** are necessary to **undertake** the extra-load caused by the increased quantity of users from the Consensus nodes, as well as **minimize** the security risks. So, the users connect to Seed nodes, receive their copy of blockchain data needed, and send their transaction into the blockchain.

## How to use the Seed node?

To use the Seed node:

1. Check the prerequisites [here](./01-prerequisites.md).

2. Install Erlang (this step is applicable for Docker installation **ONLY**):

   Before starting Tea Ceremony you need to set up your environment by installing Erlang. You will need Erlang to run the Tea Ceremony client. You will not be able to start the node and connect to the chain without Tea Ceremony. To install Erlang, run:

   ```bash
   apt -y install erlang-base erlang-public-key erlang-ssl
   ```

   > **Note**
   >
   > You need to install `erlang-public key` and `erlang-ssl`. Otherwise, Erlang will not operate properly!

3. Get the power CLI:

   1. Get the power cli by running the following command:

      ```bash
      sudo wget https://tea.thepower.io/tp -O /usr/local/bin/tp
      ```
      
   2. Change the `tp` file mode to executable by running the following command:

      ```bash
      sudo chmod a+x /usr/local/bin/tp
      ```
      
4. Generate private key by running the following command:

   ```bash
   tp --genkey --ed25519
   ```
   
   As a result of this action, you will get the `tpcli.key` file. This file contains your private and public keys. Here is an example of this file. **DON'T use the keys specified in this example**:

   ```bash
   % cat tpcli.key
   {privkey,"302E020100300506032B6570042204204B1F52826447066469E7DBCA4E95CB0A03A2998D268C27885364D4AD7B7B0A8E"}.
   {pubkey,"302A300506032B6570032100667C84FB1195C73F97AE14430C2024490C0EA6490F6EC0C1DE3FAEB4B6B32251"}.
   ```

   :::caution

   You may share your public key when necessary, but never share your private key.

   :::

   **Backup the file and continue.**

5. Delete all the contents of the file and copy the following:

   ```erlang title="node.config"
   {tpic,#{peers => [],port => 1800}}.
   {discovery,#{addresses => []}}.
   
   {replica, true}.
   {upstream, [
      <PEER_ADDRESS>
   ]}.
   
   {hostname, <Hostname>}.
   
   {dbsuffix,""}.
   {loglevel, info}.
   {info_log, "log/info.log"}.
   {error_log, "log/error.log"}.
   {debug_log, "log/debug.log"}.
   {rpcsport, 1443}.
   {rpcport, 1080}.
   ```
      
   :::caution Note

   Use [this](./02-tpNodeConfiguration.md#nodeconfig-description) guide for more information on `node.config`.

   :::

   :::caution

   You need to replace:

      - `hostname` with your hostname;
      - `upstream`. It is obtained from The Power Ecosystem [**bot**](https://t.me/thepowerio_bot).
      - `<PEER_ADDRESS>`. It is obtained from The Power Ecosystem [**bot**](https://t.me/thepowerio_bot).

   :::
   
6. Run the following command:

   ```bash
   grep priv tpcli.key >> node.config
   ```

   :::caution
   
   This and the following steps are crucial because you will NOT be able to start your node without `node.config` file. You can find more information about these files [here](https://doc.thepower.io/docs/Maintain/build-and-start-a-node/tpNodeConfiguration).
   
   :::

7. Build and run the node using the following guides. Which guide to use depends on the way you've downloaded the node:

   1. Use [this guide](../../Community/phase-2/02-download-build-run-compose.md) to build and start the node using `docker-compose` (**recommended for most users**).
   2. Use [this guide](../../Community/phase-2/03-download-build-run-docker.md) to build and start the node from Docker image.
   3. Use [this guide](../../Community/phase-2/04-download-build-run-source.md) to build and start the node from sources (for advanced users **ONLY**).

   :::info Note

   We strongly recommend you to build and run the node using [`docker-compose`](../../Community/phase-2/02-download-build-run-compose.md). It will help you eliminate the possible errors and make it easier for you to build your node.

   :::

