# Testnet Campaign Flow (Phase 3)

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
  - [Step 2: Download `docker-compose.yaml`](#step-2-download-docker-composeyaml)
  - [Step 3: Download the configuration files](#step-3-download-the-configuration-files)
  - [Step 4: Set up the configs](#step-4-set-up-the-configs)
  - [Step 5: Set up SSL](#step-5-set-up-ssl)
  - [Step 6: Start the node](#step-6-start-the-node)
    - [How to stop the node?](#how-to-stop-the-node)

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

### Step 1: Prepare your directory structure

Ensure you've created the following directories:

- `ssl`,
- `html`,
- `nginx_log`,
- `rhea_log`,

or create these using the following command:

```bash
mkdir -p {ssl,html,nginx_log,rhea_log}
```

### Step 2: Download `docker-compose.yaml`

Use [this](./resources/docker-compose.yaml) link to download `docker-compose.yaml`.

:::caution Attention

When downloading the file, please, ensure that it has the proper name: `docker-compose.yaml`.

:::

### Step 3: Download the configuration files

Download [storage.conf](./resources/storage.conf) and [rhea.config](./resources/rhea.config) using the links.

### Step 4: Set up the configs

You need to set up the configuration files you've downloaded on the previous step:

1. `/var/www/html;` in `storage.conf` and `{http_dir,"/opt/rhea/html"}.` should have the same value.
2. `temp_dir` and `http_dir` in `rhea.config` should be mounted into Docker using one mounting point and should exist without the same file system.
3. Fill your data into the following fields of `rhea.config`:

   ```nginx configuration
   {blockchain_node,"https://c1n2.thepower.io:1444/"}.
   {main_hostname,"storage12.thepower.io"}.
   {contract_address,"AA1000000016xxxxxx63"}.
   {my_address,"AA1000000016xxxxxx41"}.
   {my_privkey,"A5B277FCC00391D067A1C509EA96ExxxxxxxxxxxxxxxxxxxxxxxxxxxxxA79544"}.
   ```

### Step 5: Set up SSL

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

