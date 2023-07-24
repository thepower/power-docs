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
  - [Step 3: Set up your environment](#step-3-set-up-your-environment)
  - [Step 4: Set up SSL](#step-4-set-up-ssl)
  - [Step 5: Start a seed node](#step-5-start-a-seed-node)
    - [Step 1: Set up your environment](#step-1-set-up-your-environment)
    - [Step 2: Start the node](#step-2-start-the-node)
    - [How to stop the node?](#how-to-stop-the-node)
    - [How to check, that the node works?](#how-to-check-that-the-node-works)
    - [Node update](#node-update)

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

### Step 2: Get IP addresses and DNS

You need to have a public IP address to take part in the testnet campaign. You can register a DNS for your server, if you want. The word "domain" will be used in the text below with the meaning of "domain", or of "IP address". The Power DCloud team is not responsible for assignment or registration of IP addresses or DNS.

Here you have the following options:

1. You may have your own domain name (**recommended**).
2. You may use the VPS-generated domain name. You can check your domain name at your VPS. Here are the examples for Hetzner and Scaleway:

   ![Hetzner](./resources/Hetzner.jpg)

   ![Scaleway](./resources/Scaleway.jpg)

3. You may use free services, like [FreeDNS](https://freedns.afraid.org). You can also use the following hosting services from the list below:

   - https://www.noip.com;
   - https://dns.he.net/;
   - https://www.dynu.com/;
   - https://entrydns.net/.

4. **If none of the options above didn't work,** submit a request for a domain name in our [Discord chat](https://discord.com/channels/966339938960412723/1035928948669947946).

   :::info Note

   This option takes much more time, then the others, due to manual proccessing of submitted requests by the team.

   :::

### Step 3: Set up your environment

Before start working with the node you need to set up your environment by installing Erlang, getting `tpcli`, and keys. Follow the steps below:

1. To install Erlang, run:

   ```bash
   apt -y install erlang-base erlang-public-key erlang-ssl docker-compose jq
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

3. Create `/opt/thepower/db/cert` and `/opt/thepower/log` directories by running the following command:

   ```bash
   mkdir -p {/opt/thepower/db/cert,/opt/thepower/log}
   ```

4. Go to `/opt/thepower` by running the following command:

   ```bash
   cd /opt/thepower
   ```

5. Generate private key by running the following command:

   ```bash
   tp --genkey --ed25519
   ```

   As a result of this action, you will get the `tpcli.key` file. This file contains your private and public keys. Here is an example of this file. **DON'T use the keys specified in this example**:

   ```bash
   cat tpcli.key
   {privkey,"302E020100300506032B6570042204204B1F52826447066469E7DBCA4E95CB0A03A2998D268C27885364D4AD7B7B0A8E"}.
   {pubkey,"302A300506032B6570032100667C84FB1195C73F97AE14430C2024490C0EA6490F6EC0C1DE3FAEB4B6B32251"}.
   ```

   :::caution

   You may share your public key when necessary, but never share your private key.

   :::

   **Backup the file and continue.**

6. Download the `node.config` file using the [link](./resources/node.config). Here is the example of code:

   ```erlang title="node.config"
   {tpic,#{peers => [],port => 1800}}.
   
   
   % ====== [ here is an example of configuration ] ======
   
   {discovery,#{addresses =>[
   #{address => "replace_with_your_hostname", port => 1800, proto => tpic},
   #{address => "replace_with_your_hostname", port => 1443, proto => apis},
   #{address => "replace_with_your_hostname", port => 1080, proto => api}
   ]}}.
   
   {replica, true}.
   
   {hostname, "replace_with_your_hostname"}.
   
   {upstream, [
   "Insert_here_your_upstream_link1",
   "Insert_here_your_upstream_link2"
   ]}.
   
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
   
   You need to replace the following:
   
   - ```erlang
     #{address => "replace_with_your_hostname", port => 1800, proto => tpic},
     #{address => "replace_with_your_hostname", port => 1443, proto => apis},
     #{address => "replace_with_your_hostname", port => 1080, proto => api}
     ```
   - ```erlang 
     {hostname, "replace_with_your_hostname"}.
     ```
     
   - `"Insert_here_your_upstream_link1", "Insert_here_your_upstream_link2"`. The links are obtained from The Power DCloud [**bot**](https://t.me/thepowerio_bot).
   
   :::

   :::caution Note
   
   Use [this](../../Maintain/build-and-start-a-node/02-tpNodeConfiguration.md#nodeconfig-example) guide for more information on `node.config`.
   
   :::

   :::info Note

   The first upstream node in the link must be active. Otherwise, the `node.config` will not work properly.

   You can check the upstream node status by running the following command:

   ```bash
   curl -s http://upstream_host:1080/api/node/status | jq .result
   ```

   If the command returns `ok` it means that no problems were discovered. If there is an **error**, then change the upstream links order in `node.config` file.

   :::

7. Run the following command:

   ```bash
   grep priv tpcli.key >> node.config
   ```

   :::caution

   This and the following steps are crucial because you will NOT be able to start your node without `node.config` file. You can find more information about these files [here](https://doc.thepower.io/docs/Maintain/build-and-start-a-node/tpNodeConfiguration).

   :::

### Step 4: Set up SSL

Follow the steps below to set up SSL:

1. Ensure that you use `root` account. It is necessary for further steps.
2. Install `acme.sh` by running the following command. Please, specify your real e-mail address:

   ```bash
   apt-get install socat
   curl https://get.acme.sh | sh -s email=my@example.com
   ```

   where

   `my@example.com` — your active e-mail. Make sure, you have replaced it with your e-mail address.

3. Log out of the system.
4. Log in again.
5. Obtain the certificate. To do this, run the following command:

   ```bash
   acme.sh --issue --standalone -d your_node.example.com
   ```

   :::warning

   `your_node.example.com` is an example. **Replace it** with your node link.

   :::

6. Install the certificate by running the following command:

   ```bash
   acme.sh --install-cert -d your_node.example.com \
   --cert-file /opt/thepower/db/cert/your_node.example.com.crt \
   --key-file /opt/thepower/db/cert/your_node.example.com.key \
   --ca-file /opt/thepower/db/cert/your_node.example.com.crt.ca.crt
   ```

   :::warning

   `your_node.example.com` is an example. **Replace it** with your node link.

   :::

   After you've installed the certificate, you can get the certificate status by running the following command:

   ```bash
   acme.sh --info -d your_node.example.com
   ```

   where

   `your_node.example.com` — your node address link. Replace it with your node link.

### Step 5: Start a seed node

Follow the steps below to start your seed node.

#### Step 1: Set up your environment

1. Go to `/opt/thepower`:

   ```bash
   cd /opt/thepower
   ```

2. Download `docker-compose.yml` file under the [link](./resources/docker-compose.yml). Here is the example of code:

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

:::info Attention

By starting the node we assume that

- `node.config`,
- `db` and `log` directories,
- SSL keys, and
- `docker-compose.yml`

are present and stored in `/opt/thepower/` like described in [Docker](../../Maintain/build-and-start-a-node/05-startingTpNode_docker.md) manual.

The following tree describes the directories and files in them:

```text
/opt/thepower/
├── db
│   └── cert
│       ├── hostname.crt
│       ├── hostname.crt.ca.crt
│       └── hostname.key
├── log
├── docker-compose.yml   
├── node.config  
└── tpcli.key  
```

We assume you have the same tree.

`hostname` here is an example. Please, **replace** it with the hostname specified in your `node.config` file.

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

#### How to check, that the node works?

Check, if your node work properly by running the following command:

```bash
curl https://your_node.example.com:1443/api/node/status | jq
```

The command above returns `.json` with actual info about the node.

:::info

`https` is essential for normal operation of your node. Though, if you experience problems when connecting to your node via `https`, you can also check your node status via `http` using the following command:

```bash
curl http://your_node.example.com:1080/api/node/status | jq
```

You can also look through the logs by running the following command:

```bash
docker logs tpnode
```

:::

#### How to stop the node?

1. Ensure, that you are in `/opt/thepower` directory. If not, run:

```bash
cd /opt/thepower
```

2. Run the following command:

```bash
docker-compose down
```

#### Node update

Your node will be updated automatically.

:::caution Attention

After you start a node, please, send your node link to [RoverBot](https://t.me/thepowerio_bot). Otherwise, you won't get points.

:::