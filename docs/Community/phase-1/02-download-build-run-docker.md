# Downloading, building, and running the node using Docker
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Introduction](#introduction)
- [Step 1: Download the node](#step-1-download-the-node)
- [Step 2: Set up your node](#step-2-set-up-your-node)
- [Step 3: Get Tea Ceremony client and token](#step-3-get-tea-ceremony-client-and-token)
- [Step 4: Start the Tea Ceremony client](#step-4-start-the-tea-ceremony-client)
- [Step 5: Create directories and place the files](#step-5-create-directories-and-place-the-files)
- [Step 6: Edit `node.config`](#step-6-edit-nodeconfig)
  - [How to edit `node.config`?](#how-to-edit-nodeconfig)
- [Step 7: Get the certificate](#step-7-get-the-certificate)
- [And, finally, step 8: Start the node](#and-finally-step-8-start-the-node)
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

3. Download The Power node using the link to Docker image here: [Docker image](https://hub.docker.com/r/thepowerio/tpnode).

## Step 2: Set up your node

To set up your node and get it ready to run install Erlang. You will need Erlang to run the Tea Ceremony client. You will not be able to start the node and connect to the chain without Tea Ceremony. To install Erlang, run:

   ```bash
   apt -y install erlang-base erlang-public-key erlang-ssl
   ```

   > **Note**
   > 
   > You need to install `erlang-public key` and `erlang-ssl`. Otherwise, Erlang will not operate properly!
   
## Step 3: Get Tea Ceremony client and token

1. Get the Tea Ceremony client by running the following command:

   ```bash
   wget https://tea.thepower.io/teaclient
   ```

2. Change the `teaclient` file mode to executable by running the following command:

   ```bash
   chmod +x teaclient
   ```

   Otherwise, you will NOT be able to start the client. See the [Troubleshooting](#troubleshooting) section for more details.

3. Get the Tea Ceremony token from the testnet administrators.

   > **Note**
   >
   > This and the following steps are crucial because you will NOT be able to start your node without `genesis.txt` and `node.config` files. You can find more information about these files [here](https://doc.thepower.io/docs/Maintain/build-and-start-a-node/tpNodeConfiguration).

## Step 4: Start the Tea Ceremony client

[Start the Tea Ceremony client](https://doc.thepower.io/docs/Maintain/get-and-start-tea-ceremony-client/#start-the-tea-ceremony-client) using the token you've got from the bot.

To start the client, run the following command:

```erlang
./teaclient -n nickname token
```

where

- `teaclient` — Tea Ceremony client,
- `nickname` - The name of your node. Maximum 10 characters.
- `token` — Tea Ceremony Token, you've got from the Tea Ceremony administrators.

After you have started the client, wait for other participants. Please, DON'T turn off the Tea Ceremony client for 24 hours.

> **Note**
>
> If the client is started without options, you will see a short reference on the command and options.

If you have successfully started the Tea Ceremony client, you will get `node.config` and `genesis.txt` files after the ceremony ends. You can find these files under the same directory where you have started the Tea Ceremony client.

> **Attention**
>
> After the tea ceremony ends, you need to edit the `node.config`. To do this, refer to the section below.

## Step 5: Create directories and place the files

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
   mkdir {db, log}
   ```

3. Place `genesis.txt` and `node.config` near these directories using the following commands:

   ```bash
   cp ~/example_directory/node.config /opt/thepower/node.config
   ```

   ```bash
   cp ~/example_directory/genesis.txt /opt/thepower/genesis.txt
   ```

## Step 6: Edit `node.config`

Edit `node.config` file. See the [example](https://doc.thepower.io/docs/Maintain/build-and-start-a-node/tpNodeConfiguration#nodeconfig-example) in [How to configure TP-Node?](https://doc.thepower.io/docs/Maintain/build-and-start-a-node/tpNodeConfiguration) guide, and then refer to the section below.

> **Note**
> 
> Before the Tea Ceremony, the client listens to the ports that will be used on this particular chain and the server checks, if those ports are available. The Ceremony itself starts right after this check. If there will be only a ceremony token specified, without the personal one, you will not be able to participate in Tea Ceremony.
> 
> If you're connecting to the Ceremony that has already ended, the Tea Ceremony client will save the `node.config` file. If the `node.config` consisted only of a private key, the Tea Ceremony client will add an actual configuration right into this file. If there is something else specified in `node.config`, the configuration will be saved in `node_example.config`. After that you need to add your node private key to this file.

### How to edit `node.config`?

Here is the example of a chain consisting of ten nodes:

```erlang
{tpic, #{
    peers => [
        {"powernode01.thepower.io", 41025},
        {"powernode02.thepower.io", 41025},
        {"powernode03.thepower.io", 41025},
        {"powernode04.thepower.io", 41025},
        {"powernode05.thepower.io", 41025},
        {"powernode06.thepower.io", 41025},
        {"powernode07.thepower.io", 41025},
        {"powernode08.thepower.io", 41025},
        {"powernode09.thepower.io", 41025},
        {"powernode10.thepower.io", 41025}
        ],
    port => 41025} }.
{discovery,
    #{
        addresses => [
            #{address => "<NODE_HOST_NAME>", port => 41025, proto => tpic},
            #{address => "<NODE_HOST_NAME>", port => 1080, proto => api},
            #{address => "<NODE_HOST_NAME>", port => 1443, proto => apis}
        ]
    }
}.

{hostname, "<NODE_HOST_NAME>"}.
{dbsuffix,""}.
{loglevel, info}.
{info_log, "log/info.log"}.
{error_log, "log/error.log"}.
{debug_log, "log/debug.log"}.
{rpcsport, 1443}.
{rpcport, 1080}.

{privkey, "<PRIVATE_KEY>"}.
```

Edit the file as follows:

1. Specify the node addresses and port numbers you've received from the bot. You don't need to specify your own node:

   ```erlang
   tpic, #{
    peers => [
        {"powernode01.thepower.io", 41025},
        {"powernode02.thepower.io", 41025},
        {"powernode03.thepower.io", 41025},
        {"powernode04.thepower.io", 41025},
        {"powernode05.thepower.io", 41025},
        {"powernode06.thepower.io", 41025},
        {"powernode07.thepower.io", 41025},
        {"powernode08.thepower.io", 41025},
        {"powernode09.thepower.io", 41025},
        {"powernode10.thepower.io", 41025}
        ],
   ```

2. Check the `allow_rfc1918` parameter to be `false`. If `true`, it allows nodes to work within a local network.
   3.Check the `port` parameter. The value of this parameter should be the same as the port value in `peers`:

   ```erlang
   port => 41025}
   ```

5. Specify your node and port to be used for `tpic`, `api`, and `apis` protocols in `addresses` parameter:

   ```erlang
   addresses => [
            #{address => "<NODE_HOST_NAME>", port => 41025, proto => tpic},
            #{address => "<NODE_HOST_NAME>", port => 1080, proto => api},
            #{address => "<NODE_HOST_NAME>", port => 1443, proto => apis}
        ]
   ```

6. Specify your node address in `hostname` parameter:

   ```erlang
   {hostname, "<NODE_HOST_NAME>"}.
   ```

7. Specify names of your nodes in `dbsuffix` parameter if you want to start multiple nodes on one machine. It creates different DB directories for each node. If you have only one node, `dbsuffix` must be empty:

   ```erlang
   {dbsuffix,""}.
   ```

8. Specify the `.log` files, where the logs for your node will be stored:

   ```erlang
   {loglevel, info}.
   {info_log, "log/info.log"}.
   {error_log, "log/error.log"}.
   {debug_log, "log/debug.log"}.
   ```

9. Specify the ports for `rpc` and `rpcs` protocols:

   ```erlang
   {rpcsport, 1443}.
   {rpcport, 1080}.
   ```

> **Warning**
>
> The private key you get with the `genesis.txt` file cannot be restored, if you lose it. Please, store it securely.

## Step 7: Get the certificate

[Obtain the SSL certificate for your node](https://doc.thepower.io/docs/Maintain/build-and-start-a-node/ssl-certs-for-node) and place it into the `db` directory.

## And, finally, step 8: Start the node

To start the node from Docker, run:

```bash
docker run -d \
--name tpnode \
--mount type=bind,source="$(pwd)"/db,target=/opt/thepower/db \
--mount type=bind,source="$(pwd)"/log,target=/opt/thepower/log \
--mount type=bind,source="$(pwd)"/node.config,target=/opt/thepower/node.config \
--mount type=bind,source="$(pwd)"/genesis.txt,target=/opt/thepower/genesis.txt \
-p 41025:41025 \
-p 1080:1080 \
-p 1443:1443 \
thepowerio/tpnode
```

where:

| Command                                                                          | Description                                                                                                                                                 |
|----------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `docker run -d`                                                                  | This command starts Docker in the background                                                                                                                |
| `--name tpnode`                                                                  | This command specifies the name (optional)                                                                                                                  |
| `--mount type=bind,source="$(pwd)"/db,target=/opt/thepower/db`                   | Path to the database. Bound to Docker. `/opt` here is mandatory, because it is the path inside the container.                                               | 
| `--mount type=bind,source="$(pwd)"/log,target=/opt/thepower/log`                 | Path to log files. Bound to Docker. `/opt` here is mandatory, because it is the path inside the container.                                                  |
| `--mount type=bind,source="$(pwd)"/node.config,target=/opt/thepower/node.config` | Path to your `node.config` file. Bound to Docker. `/opt` here is mandatory, because it is the path inside the container.                                    |
| `--mount type=bind,source="$(pwd)"/genesis.txt,target=/opt/thepower/genesis.txt` | Path to your `genesis.txt`. Bound to Docker. `/opt` here is mandatory, because it is the path inside the container.                                         |
| `-p 41025:41025` <br/> `-p 1080:1080` <br/> `-p 1443:1443`                       | These commands specify all necessary local ports. In this examples ports `api`, `apis`, and `tpic` are used. You can specify any port in `node.config` file |
| `thepowerio/tpnode`                                                              | Path to Docker image.                                                                                                                                       |

## How to check, if my node works?

To check, if your node works, run:

```bash
curl http://your_node.example.com:00000/api/node/status | jq
```

where:

- `your_node.example.com` — your node address;
- `00000` — port, that your node uses for `api`.

Replace the example parameters with the ones you need.

## What do I need to do if something goes wrong?

> **Attention**
>
> If something goes wrong, go to the `log` folder, and read the logs. If there are errors, write to Power Ecosystem Telegram chat: `https://t.me/thepower_chat`.

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

   Get the new token from the chain administrators.

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
