# Testnet Campaign Flow (Phase 2)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Introduction](#introduction)
  - [Prerequisites for a node](#prerequisites-for-a-node)
    - [Hardware](#hardware)
    - [Software](#software)
- [What do I need to participate in testnet campaign?](#what-do-i-need-to-participate-in-testnet-campaign)
  - [Step 1: Learn](#step-1-learn)
  - [Step 2: Get IP addresses and DNS](#step-2-get-ip-addresses-and-dns)
  - [Step 3: Install Erlang](#step-3-install-erlang)
  - [Step 4: Download and start a seed node](#step-4-download-and-start-a-seed-node)
    - [Download, build, and run the node using `docker-compose`](#download-build-and-run-the-node-using-docker-compose)
    - [Download, build, and run the node using Docker](#download-build-and-run-the-node-using-docker)
    - [Download, build, and run the node using the source code](#download-build-and-run-the-node-using-the-source-code)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Introduction

This simple guide will help you participate in The Power testnet campaign.

:::warning

Please, turn off the firewall before you start working with the node.

:::

### Prerequisites for a node

#### Hardware

| CPU cores | Memory       | Hard disk                     | Network    |
|-----------|--------------|-------------------------------|------------|
| 4         | 4 GB or more | Minimum: 40 GB, SSD preferred | 100 Mbit/s |

#### Software

| OS           | Erlang version | Eshell version | Docker version                         | Server          |
|--------------|----------------|----------------|----------------------------------------|-----------------|
| Ubuntu 22.04 | 24.3           | 10.4           | latest (20.10.18 as of September 2022) | Virtual machine |

:::note

You need to have a clear server to work with your node. If you have done any experiments before, please delete the previous builds.

:::

:::warning

If you use other versions of Ubuntu, you'll have to resolve the Erlang dependencies manually.

:::

## What do I need to participate in testnet campaign?

To participate in ThePower testnet campaign you need to:

### Step 1: Learn

[Learn what is a testnet in DCloud](../../Maintain/01-testnets-intro.md). This guide will help you understand what ThePower Testnet is.

Use [**this manual**](../../Maintain/build-and-start-a-node/08-seed-nodes.md) to learn how to start a seed node.

### Step 2: Get IP addresses and DNS

You need to have a public IP address to take part in the testnet campaign. You can register a DNS for your server, if you want. The word "domain" will be used in the text below with the meaning of "domain", or of "IP address".

### Step 3: Install Erlang and get keys

Before start working with the node you need to set up your environment by installing Erlang, getting `tpcli`, and SSL keys. Follow the steps below:

1. To install Erlang, run:

   ```bash
   apt -y install erlang-base erlang-public-key erlang-ssl
   ```

   > **Note**
   >
   > You need to install `erlang-public key` and `erlang-ssl`. Otherwise, Erlang will not operate properly!

2. Get the power CLI:

   1. Get the power cli by running the following command:

      ```bash
      sudo wget https://tea.thepower.io/tp -O /usr/local/bin/tp
      ```

   2. Change the `tp` file mode to executable by running the following command:

      ```bash
      sudo chmod a+x /usr/local/bin/tp
      ```

3. Generate private key by running the following command:

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

4. Replace the `node.config` file content with the following:

   ```erlang title="node.config"
   {tpic,#{peers => [],port => 1800}}.
   {discovery,#{addresses => []}}.
   
   {replica, true}.
   % ====== [ here is an example of upstream configuration ] ======
   % {upstream, [                                                                               [ uncomment this line after copying ]
   %   "http://c1038n3.deinfra.net:1080/?genesis=4InSbdZywQX8ySEHoKdZis5ghsA2oakfL7fegeOgM3U",  [ uncomment this line and replace with proper data ]
   %   "http://c1038n5.deinfra.net:1080/?genesis=4InSbdZywQX8ySEHoKdZis5ghsA2oakfL7fegeOgM3U"   [ uncomment this line and replace with proper data ]
   % ]}.                                                                                        [ uncomment this line after copying ]
   % ======= [ end of example ] =========
   
   % ====== [ here is an example of hostname configuration ] ======
   % {hostname, <Hostname>}. [ Uncomment this line and replace with proper data ]
   % ======= [ end of example ] =========
   {dbsuffix,""}.
   {loglevel, info}.
   {info_log, "log/info.log"}.
   {error_log, "log/error.log"}.
   {debug_log, "log/debug.log"}.
   {rpcsport, 1443}.
   {rpcport, 1080}.
   ```

   :::caution

   You need to replace:

  - `hostname` with your hostname;
  - `<PEER_ADDRESS>`. It is obtained from The Power Ecosystem [**bot**](https://t.me/thepowerio_bot).

   :::

   :::caution Note

   Use [this](../../Maintain/build-and-start-a-node/02-tpNodeConfiguration.md#nodeconfig-example) guide for more information on `node.config`.

   :::

5. Run the following command:

   ```bash
   grep priv tpcli.key >> node.config
   ```

   :::caution

   This and the following steps are crucial because you will NOT be able to start your node without `node.config` file. You can find more information about these files [here](https://doc.thepower.io/docs/Maintain/build-and-start-a-node/tpNodeConfiguration).

   :::

### Step 4: Start a seed node

Follow the steps below to start your seed node.

#### Step 1: Set up your environment

You need to have `docker-compose` package installed on your machine. If you don't have this package installed, run the following command in terminal for:

1. `root` user:

   ```bash
   apt-get -y install docker-compose
   ```

2. Normal user:

   ```bash
   sudo apt-get -y install docker-compose
   ```

   :::info Attention

   By implementing this way of starting the node we assume that

  - `node.config`,
  - `db` and `log` directories,
  - SSL keys

   are present and stored in `/opt/thepower/` like described in [Docker](./03-download-build-run-docker.md) and [source](./04-download-build-run-source.md) manuals.

   The following tree describes the directories and files in them:

   ![tree](./resources/seed_compose_tree.png)

   `hostname` here is an example. Please, **replace** it with the hostname specified in your `node.config` file.

   :::

3. Go to `/opt/thepower`:

   ```bash
   cd /opt/thepower
   ```

4. Create `docker-compose.yml` file with the following code:

```yaml title="docker-compose.yml"
version: "3.3"

services:

  tpnode:
    restart: unless-stopped
    container_name: tpnode
    cap_add:
      - NET_ADMIN
    devices:
      - /dev/net/tun
    image: thepowerio/tpnode
    volumes:
      - type: bind
        source: /opt/thepower/node.config
        target: /opt/thepower/node.config
        read_only: true
      - type: bind
        source: /opt/thepower/db
        target: /opt/thepower/db
      - type: bind
        source: /opt/thepower/log
        target: /opt/thepower/log
    network_mode: 'host'

  watchtower:
    restart: unless-stopped
    container_name: watchtower
    image: containrrr/watchtower
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    command: --interval 3600 --cleanup
```

:::tip Note

This file also allows `watchtower` to automatically update the node.

:::

#### Step 2: Start the node

To start the node:

1. Ensure, that you are in `/opt/thepower` directory. If not, run:

   ```bash
   cd /opt/thepower
   ```

2. Run the following command:

   ```bash
   docker-compose up -d
   ```

#### How to stop the node?

1. Ensure, that you are in `/opt/thepower` directory. If not, run:

```bash
cd /opt/thepower
```

2. Run the following command:

```bash
docker-compose down
```