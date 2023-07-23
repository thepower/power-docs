# Long-Lived Testnet Flow

:::warning

This section is under development. Any actions with this document are not recommended.

:::
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Introduction](#introduction)
  - [Prerequisites for a node](#prerequisites-for-a-node)
    - [Hardware](#hardware)
    - [Software](#software)
- [What do I need to participate in testnet campaign?](#what-do-i-need-to-participate-in-testnet-campaign)
  - [Step 1: Prepare your directory structure](#step-1-prepare-your-directory-structure)
  - [Step 2: Get IP addresses and DNS](#step-2-get-ip-addresses-and-dns)
  - [Step 3: Download `docker-compose.yml`](#step-3-download-docker-composeyml)
  - [Step 4: Download the configuration files](#step-4-download-the-configuration-files)
  - [Step 5: Set up the configs](#step-5-set-up-the-configs)
    - [How to generate the private key](#how-to-generate-the-private-key)
  - [Step 6: Start the node](#step-6-start-the-node)
    - [How to stop the node?](#how-to-stop-the-node)
  - [Step 7: Set up SSL](#step-7-set-up-ssl)

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

| OS           | Erlang version | Docker version                         | Server                      |
|--------------|----------------|----------------------------------------|-----------------------------|
| Ubuntu 22.04 | 24.3           | latest (20.10.18 as of September 2022) | Virtual machine or hardware |

:::note

You need to have a clear server to work with your node. If you have done any experiments before, please delete the previous builds.

:::

:::warning

If you use other versions of Ubuntu, you'll have to resolve the Erlang dependencies manually.

:::

## What do I need to participate in testnet campaign?

To participate in ThePower testnet campaign you need to:

### Step 1: Prepare your directory structure

The following directory tree describes the directories and files in them:

```text
/opt/storage/
├── data
│   ├── db
│   ├── html
│   └── tmp
├── log
│   ├── nginx
│   └── rhea
└── ssl
```

1. Create the directories using the following command:

    ```bash
    mkdir -p /opt/storage/{ssl,data/{db,html,tmp},log/{nginx,rhea}} 
    ```

2. Check that you are in the `storage` directory, or go to this directory using the following command:

   ```bash
   cd /opt/storage/
   ```

### Step 2: Get IP addresses and DNS

You need to have a public IP address to take part in the testnet campaign. You can register a DNS for your server, if you want. The word "domain" will be used in the text below with the meaning of "domain", or of "IP address". The Power DCloud team is not responsible for assignment or registration of IP addresses or DNS.

Here you have the following options:

1. You may have your own domain name (**recommended**).
2. You may use the VPS-generated domain name. You can check your domain name at your VPS. Here is the examples for Hetzner and Scaleway:

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


### Step 3: Download `docker-compose.yml`

:::warning

See the link below!

:::

Use the following command to download `docker-compose.yml`:

```bash
wget https://raw.githubusercontent.com/thepower/power-docs/master/docs/Community/phase-3/resources/docker-compose.yml -O /opt/storage/docker-compose.yml
```

### Step 4: Download the configuration files

Download `storage.conf.template`, [env](./resources/env.env), and `rhea.config` using the following commands:

```bash
wget https://raw.githubusercontent.com/thepower/power-docs/master/docs/Community/phase-3/resources/storageconf.template -O /opt/storage/storage.conf.template

wget https://raw.githubusercontent.com/thepower/power-docs/master/docs/Community/phase-3/resources/rhea.config -O /opt/storage/rhea.config
```

### Step 5: Set up the configs

:::warning

The configs are under development. Some features may not work correctly.

:::

You need to set up the configuration files you've downloaded on the previous step:

1. Fill your data into the following fields of `rhea.config`:

   ```nginx configuration
   {contract_address,"AA1000000016xxxxxx63"}.
   {contract_gas, 1000000}.
   {temp_dir,"/opt/storage/data/tmp"}.
   {http_dir,"/opt/storage/data/html"}.
   {db_dir,"/opt/storage/data/db"}.
   
   {my_address,"AA1000000016xxxxxx41"}.
   {my_privkey,"A5B277FCC00391D067A1C509EA96ExxxxxxxxxxxxxxxxxxxxxxxxxxxxxA79544"}. //Generate the key using tp_cli.
   ```

2. Fill in your hostname into `HOSTNAME` field of `env.env` file. Go back to [Step 2](#step-2-get-ip-addresses-and-dns) to get information about how to get your IP addresses and DNS names.

#### How to generate the private key

Before getting the keys you need to set up your environment by installing Erlang and getting `tpcli`. Follow the steps below:

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

3. Go to `/opt/storage` by running the following command:

   ```bash
   cd /opt/storage
   ```

4. Generate private key by running the following command:

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

5. Copy `privkey` into `my_privkey` field of `rhea.config` file. You can also use the following command:

   ```bash
   grep privkey tpcli.key >> rhea.config
   ```
   
   :::caution Note

   Delete the second `{my_privkey,"..."}` string from `rhea.config` file after using the command.

   :::

### Step 6: Start the node

Start your node using the following command:

```bash
docker-compose up -d
```

#### How to stop the node?

To stop the node run the following command:

```bash
docker-compose down
```

### Step 7: Set up SSL

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
5. Issue the certificate. To do this, run the following command:

   ```bash
   acme.sh --issue -d your_storage_node.example.com -w /opt/storage/data/html/ --keylength ec-256
   ```

   :::warning

   `your_storage_node.example.com` is an example. **Replace it** with your node link.

   :::

6. Install the certificate by running the following command:

   ```bash
   acme.sh --install-cert --ecc -d your_storage_node.example.com \
   --key-file       /opt/storage/ssl/ssl.key  \
   --fullchain-file /opt/storage/ssl/ssl.crt \
   --reloadcmd     "docker restart nginx"
   ```

   :::warning

   `your_storage_node.example.com` is an example. **Replace it** with your node link.

   :::

   After you've installed the certificate, you can get the certificate status by running the following command:

   ```bash
   acme.sh --info -d your_storage_node.example.com
   ```

   where

   `your_storage_node.example.com` — your node address link. Replace it with your node link.


