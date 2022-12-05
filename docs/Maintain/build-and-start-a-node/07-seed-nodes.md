# Seed node: theory and starting


## Introduction

There are two types of nodes used in The Power Ecosystem:

1. **Consensus node**. It is a node that connects to a chain and participates in Consensus along with other Consensus nodes.
2. **Seed node**. It is a node that connects to a chain of nodes, receives a copy of a blockchain data, and provides it to the users upon a request. As opposed to Consensus nodes, Seed nodes don't participate in Consensus.

## Seed nodes theory

As determined above, Seed nodes store and spread the copy of blockchain data, but don't participate in Consensus on creating new blocks.

**Seed nodes** are necessary to **undertake** the extra-load caused by the increased quantity of users from the Consensus nodes, as well as **minimize** the security risks. So, the users connect to Seed nodes, receive their copy of blockchain data needed, and send their transaction into the blockchain.

## How to use the Seed node?

To use the Seed node:

1. Check the prerequisites [here](./01-prerequisites.md).
2. Download the node. Here you have two options:

   1. Download the node using the [Docker image](https://hub.docker.com/r/thepowerio/tpnode).
   2. Download the [source](../../Maintain/build-and-start-a-node/06-startingTpNode_source.md#downloading-and-building-the-node) code and build it (only for advanced users).

3. Install Erlang (this step is applicable for Docker installation **ONLY**):

   Before starting Tea Ceremony you need to set up your environment by installing Erlang. You will need Erlang to run the Tea Ceremony client. You will not be able to start the node and connect to the chain without Tea Ceremony. To install Erlang, run:

   ```bash
   apt -y install erlang-base erlang-public-key erlang-ssl
   ```

   > **Note**
   >
   > You need to install `erlang-public key` and `erlang-ssl`. Otherwise, Erlang will not operate properly!

4. Get Tea Ceremony client and token

   1. Get the Tea Ceremony client by running the following command:

      ```bash
      wget https://tea.thepower.io/teaclient
      ```

   2. Change the `teaclient` file mode to executable by running the following command:

      ```bash
      chmod +x teaclient
      ```

      Otherwise, you will NOT be able to start the client.

   3. Get the Tea Ceremony token from the testnet bot.

      :::note

      This and the following steps are crucial because you will NOT be able to start your node without `genesis.txt` and `node.config` files. You can find more information about these files [here](https://doc.thepower.io/docs/Maintain/build-and-start-a-node/tpNodeConfiguration).

      :::

5. Generate private key with **wrong** token:

   1. Start the Tea Ceremony client with wrong token:

      ```bash
      ./teaclient 123456
      ```

   2. The Client will respond:
   
      ```text
      Server rejects connection, reason: bad_token
      ```

   3. You will receive `node.config` file with the private key. Delete all the contents of the file except the key (`privkey` line) (if any content present) and copy the following:

      ```erlang
      {tpic,#{peers => [],port => 1800}}.
      {discovery,#{addresses => []}}.

      {privkey,"302E020100300506032B6570042204200011223344556677001122334455667700112233445566770011223344556677"}.

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
      
      :::warning

      Use [this]() guide for more information on `node.config`.
      :::

      :::attention

      You need to replace:

      - `privkey` with your private key; 
      - `hostname` with your hostname;
      - `upstream`. It is obtained from The Power Ecosystem administrators.

      :::
   

7. Build and run the node using the following guides. Which guide to use depends on the way you've downloaded the node:

   1. Use [this guide](../../Community/phase-1/02-download-build-run-docker.md) to build and start the node from Docker image.
   2. Use [this guide](../../Community/phase-1/03-download-build-run-source.md) to build and start the node from sources.

