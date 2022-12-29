# Downloading, building, and running the node using Docker

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Introduction](#introduction)
- [Step 1: Download the node](#step-1-download-the-node)
- [Step 2: Create directories and place the files](#step-2-create-directories-and-place-the-files)
- [Step 3: Start the node](#step-3-start-the-node)
- [Step 4: Get the certificate](#step-4-get-the-certificate)
- [Step 5 (optional): Automated updates for node with Watchtower](#step-5-optional-automated-updates-for-node-with-watchtower)
  - [Start a Watchtower container to automatically update node when a new version is available:](#start-a-watchtower-container-to-automatically-update-node-when-a-new-version-is-available)
- [How to stop the node?](#how-to-stop-the-node)
- [How to check, if my node works?](#how-to-check-if-my-node-works)
- [What do I need to do if something goes wrong?](#what-do-i-need-to-do-if-something-goes-wrong)
  - [Troubleshooting](#troubleshooting)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

We recommend you to use the simple way of building the node using the Docker image. Follow the steps below.

## Step 1: Download the node

To download the node using Docker:

1. Ensure you have Docker installed on your machine.
2. If not, refer to [Docker Installation Guide](https://docs.docker.com/engine/install/).

   > **Hint:**
   >
   > If you don't use `root` account, run the following command to ensure you belong the user group `docker`:
   >
   > ```bash
   > $ groups
   > ```
   >
   > If you don't belong to the user group `docker`, run the following command:
   >
   > ```bash
   > $ sudo usermod -aG docker
   > ```

## Step 2: Create directories and place the files

> **Hint**
>
> You can create an additional directory named `thepower`, for example, and place `db` and `log` as subdirectories there.

To create directories for files:

1. Go to your working directory using the following command:

   ```bash
   cd /opt/thepower
   ```

2. Create `db` and `log` directories in your working directory (`/opt/thepower`, for instance) using the following command:

   ```bash
   mkdir {db,log}
   ```

3. Place `genesis.txt` and `node.config` near these directories using the following commands:

   ```bash
   cp ~/tea_ceremony_directory/node.config /opt/thepower/node.config
   ```

   ```bash
   cp ~/tea_ceremony_directory/genesis.txt /opt/thepower/genesis.txt
   ```

:::note

Before the Tea Ceremony, the client listens to the ports that will be used on this particular chain and the server checks, if those ports are available. The Ceremony itself starts right after this check. If there will be only a ceremony token specified, without the personal one, you will not be able to participate in Tea Ceremony.

If you're connecting to the Ceremony that has already ended, the Tea Ceremony client will save the `node.config` file. If the `node.config` consisted only of a private key, the Tea Ceremony client will add an actual configuration right into this file. If there is something else specified in `node.config`, the configuration will be saved in `node_example.config`. After that you need to add your node private key to this file.

:::

:::warning

The private key you get with the `node.config` file cannot be restored, if you lose it. Please, store it securely.

:::

## Step 3: Start the node

To start the node from Docker, run:

```bash
docker run -d \
--name tpnode \
--restart unless-stopped \
--mount type=bind,source=/opt/thepower/db,target=/opt/thepower/db \
--mount type=bind,source=/opt/thepower/log,target=/opt/thepower/log \
--mount type=bind,source=/opt/thepower/node.config,target=/opt/thepower/node.config \
--mount type=bind,source=/opt/thepower/genesis.txt,target=/opt/thepower/genesis.txt \
-p 1800:1800 \
-p 1080:1080 \
-p 1443:1443 \
thepowerio/tpnode
```

:::tip

The commands

```bash
-p 1800:1800 \
-p 1080:1080 \
-p 1443:1443 \
```

specify all necessary local ports. In this example ports `api`, `apis`, and `tpic` are used. Specify the port of your chain from `node.config` file.

:::

where:

| Command                                                                          | Description                                                                                                                                                                                               |
|----------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `docker run -d`                                                                  | This command starts Docker in the background                                                                                                                                                              |
| `--name tpnode`                                                                  | This command specifies the name (optional)                                                                                                                                                                |
| `--restart unless-stopped\`                                                      | Similar to always, except that when the container is stopped (manually or otherwise), it is not restarted even after Docker daemon restarts                                                               |
| `--mount type=bind,source="$(pwd)"/db,target=/opt/thepower/db`                   | Path to the database. Bound to Docker. `/opt` here is mandatory, because it is the path inside the container.                                                                                             | 
| `--mount type=bind,source="$(pwd)"/log,target=/opt/thepower/log`                 | Path to log files. Bound to Docker. `/opt` here is mandatory, because it is the path inside the container.                                                                                                |
| `--mount type=bind,source="$(pwd)"/node.config,target=/opt/thepower/node.config` | Path to your `node.config` file. Bound to Docker. `/opt` here is mandatory, because it is the path inside the container.                                                                                  |
| `--mount type=bind,source="$(pwd)"/genesis.txt,target=/opt/thepower/genesis.txt` | Path to your `genesis.txt`. Bound to Docker. `/opt` here is mandatory, because it is the path inside the container.                                                                                       |
| `-p 1800:1800` <br/> `-p 1080:1080` <br/> `-p 1443:1443`                         | These commands specify all necessary local ports. In these examples ports `api`, `apis`, and `tpic` are used. You can specify any port in `node.config` file. |
| `thepowerio/tpnode`                                                              | Path to Docker image.                                                                                                                                                                                     |

## Step 4: Get the certificate

[Obtain the SSL certificate for your node](https://doc.thepower.io/docs/Maintain/build-and-start-a-node/ssl-certs-for-node) and place it into the `db` directory.

## Step 5 (optional): Automated updates for node with Watchtower

If configured, every 24 hours the [Watchtower](https://containrrr.dev/watchtower/) will check if a new version of The Power Node is available and update it if so.

:::warning

If you haven't configured automatic updates, DO NOT follow this step.

Use [this guide](./04-node-update.md) instead.

:::

### Start a Watchtower container to automatically update node when a new version is available:

```bash
docker run -d \
--name watchtower \
--restart unless-stopped \
-e WATCHTOWER_CLEANUP=true -e WATCHTOWER_TIMEOUT=60s \
-v /var/run/docker.sock:/var/run/docker.sock \
containrrr/watchtower
```

## How to stop the node?

To stop the node, run:

1. ```bash
   docker stop tpnode
   ```

2. ```bash
   docker rm tpnode
   ```

3. ```bash
   docker rmi thepowerio/tpnode
   ```

## How to check, if my node works?

To check, if your node works, run:

```bash
curl http://your_node.example.com:1080/api/node/status | jq
```

where:

- `your_node.example.com` — your node address;
- `1080` — port, that your node uses for `api`.

Replace the example parameters with the ones you need.

## What do I need to do if something goes wrong?

:::tip

If something goes wrong, go to the `log` folder, and read the logs. If there are errors, write to Power Ecosystem Telegram chat: `https://t.me/thepower_chat`.

:::

### Troubleshooting

1. You get the following error:

    ```bash
    ===> Failed to boot tpnode for reason {{{badmatch,undefined},
    [{nodekey,get_priv,0,
    [{file,
    "/home/thepower/tpnode/apps/tpnode/src/nodekey.erl"},
    {line,26}]},
    {tpic2,certificate,0,
    [{file,
    "/home/thepower/tpnode/apps/tpic2/src/tpic2.erl"},
    {line,196}]},
    {tpic2,
    '-childspec/0-fun-0-',2,
    [{file,
    "/home/thepower/tpnode/apps/tpic2/src/tpic2.erl"},
    {line,217}]},
    {tpic2,childspec,0,
    [{file,
    "/home/thepower/tpnode/apps/tpic2/src/tpic2.erl"},
    {line,229}]},
    {tpnode_sup,init,1,
    [{file,
    "/home/thepower/tpnode/apps/tpnode/src/tpnode_sup.erl"},
    {line,88}]},
    {supervisor,init,1,
    [{file,"supervisor.erl"},
    {line,295}]},
    {gen_server,init_it,2,
    [{file,"gen_server.erl"},
    {line,374}]},
    {gen_server,init_it,6,
    [{file,"gen_server.erl"},
    {line,342}]}]},
    {tpnode,start,[normal,[]]}}
    ```
   **Reason**

   You don't have `genesis.txt` and `node.config` files.

   **Solution**

   Start the Tea Ceremony client **BEFORE** starting the node. It will get proper `genesis.txt` and `node.config`.

2. You get the following error when starting the Tea Ceremony client:

   ```bash
    ~/tpnode# ./teaclient DEE570BD76F3
    -bash: ./teaclient: Permission denied
   ```

   **Reason**

   Probably, you haven't changed `teaclient` file mode to executable.

   **Solution**

   Change `teaclient` file mode to executable by running the following command:

   ```bash
   chmod +x tea*
   ```
3. You get the following error when starting the Tea Ceremony client:

   ```bash
   ~# ./teaclient -n demonode05 DEE570BD76F3
   ceremony client connecting to tea.thepower.io:443
   Server rejects connection, reason: bad_token
   ```

   **Reason**

   Token `DEE570BD76F3` has been used by another user.

   **Solution**

   Get the new token from the Telegram bot.

4. You get the following error when starting the Tea Ceremony client:

   ```bash
   ceremony client connecting to knuth.cleverfox.ru:1436
   =WARNING REPORT==== 19-Oct-2022::14:32:54.056133 ===
   Description: "Authenticity is not established by certificate path validation"
   Reason: "Option {verify, verify_peer} and cacertfile/cacerts is missing"

   Server rejects connection, reason: you_are_late
   ```

   **Reason**

   You are late for the tea ceremony.

   **Solution**

   Stick to the bot recommendations and don't be late.

5. You see different ports displayed in server control panel and written in firewall rules.

   **Reason**

   Problems with ports. 

   **Solution**

   Check your `iptables` rules:

   ```bash
   iptables -L -nv
   ```
   
   Find the rules for all three ports among the entries:

      1. If the rules are absent, please contact or tech support in our [Telegram chat](https://t.me/thepower_chat).
      2. If you've found a corrupted port, try to recreate rule using the server control panel.
   
      :::warning
   
      **The Power Ecosystem is not responsible for the result of actions described below!** These actions can lead to loss of access to the server.

      :::

   Another way of addressing the problem is to:

      1. Save the rules into a file using the following command:
      
         ```bash
         iptables-save -f iptables.save
         ```
      2. Edit the corrupted port:
         
         ```bash
         vim iptables.save
         ```
      
      3. Restore the rules from the file:
      
         ```bash
         iptables-restore iptables.save
         ```
         
6. You see the following error:

   ![erl_err](./resources/erl_error.jpeg)

   **Reason**

   Wrong Erlang version is installed.

   **Solution**

   Install the recommended Ubuntu version, or try to install right Erlang version using the third party repositories or the source code.
